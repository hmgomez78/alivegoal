export const config = {
  runtime: 'edge',
};

interface Tip {
  id: number;
  betNumber: string;
  betType: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  prediction: string;
  confidence: number;
  odds: number;
  market: string;
  winner: string;
  analysis: string;
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
}

function confidenceFromText(text: string): number {
  if (/MUITO ALTA|VERY HIGH/i.test(text)) return 90;
  if (/ALTA|HIGH/i.test(text)) return 82;
  if (/MÉDIA|MEDIUM|MODERATE/i.test(text)) return 68;
  if (/BAIXA|LOW/i.test(text)) return 55;
  return 70;
}

function confidenceFromOdds(odds: number): number {
  if (odds <= 1.30) return 85;
  if (odds <= 1.50) return 80;
  if (odds <= 1.70) return 75;
  if (odds <= 2.00) return 70;
  if (odds <= 2.50) return 65;
  return 60;
}

function parseMarket(marketLine: string): { market: string; prediction: string } {
  const line = marketLine.trim();

  if (/ACUMULAD|ACUMUL/i.test(line)) {
    return { market: 'Combinada', prediction: line.replace(/^ACUMULAD[OR]*:?\s*/i, '').trim() || 'Acumulador' };
  }
  if (/BTTS.*Over|Over.*BTTS/i.test(line)) {
    return { market: 'Combinada', prediction: 'BTTS + Over 1.5' };
  }
  if (/BTTS|Ambas Marcam|Ambas as Equipas/i.test(line)) {
    return { market: 'Ambas Marcam', prediction: 'Ambas Marcam - Sim' };
  }
  if (/Over\s*2\.5/i.test(line)) {
    return { market: 'Mais de 2.5', prediction: 'Mais de 2.5 Golos' };
  }
  if (/Over\s*1\.5/i.test(line)) {
    return { market: 'Mais de 1.5', prediction: 'Mais de 1.5 Golos' };
  }
  if (/Over\s*0\.5.*(1ª|First|HT|Half)/i.test(line) || /First\s*Half|1ª\s*Part/i.test(line)) {
    return { market: 'Golo 1ª Parte', prediction: 'Golo na 1ª Parte' };
  }
  if (/Over\s*0\.5/i.test(line)) {
    return { market: 'Golo 1ª Parte', prediction: 'Over 0.5 Golos' };
  }
  if (/to\s*Win|Vitória/i.test(line)) {
    const teamMatch = line.match(/(.+?)\s*(?:to\s*Win|Vitória)/i);
    if (teamMatch) {
      return { market: 'Resultado Final', prediction: `Vitória ${teamMatch[1].trim()}` };
    }
    return { market: 'Resultado Final', prediction: 'Vitória Casa' };
  }
  if (/Double Chance|Dupla Hipótese/i.test(line)) {
    return { market: 'Dupla Hipótese', prediction: 'Dupla Hipótese' };
  }
  return { market: 'Resultado Final', prediction: line };
}

function cleanText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#33;/g, '!')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

interface MessageWithDate {
  text: string;
  date: string;
  pos: number;
}

function parseTipsFromHTML(html: string): Tip[] {
  const tips: Tip[] = [];

  // Extract messages with their dates
  const dateRegex = /datetime="([^"]+)"/g;
  const datePositions: { pos: number; date: string }[] = [];
  let dm;
  while ((dm = dateRegex.exec(html)) !== null) {
    datePositions.push({ pos: dm.index, date: dm[1] });
  }

  const messageRegex = /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  const messages: MessageWithDate[] = [];
  let match;
  while ((match = messageRegex.exec(html)) !== null) {
    const pos = match.index;
    const text = cleanText(match[1]);
    let msgDate = '';
    for (const dp of datePositions) {
      if (dp.pos < pos) msgDate = dp.date;
    }
    messages.push({ text, date: msgDate, pos });
  }

  // Sort ALL messages by date descending (newest first)
  const sortedMessages = [...messages].sort((a, b) => b.date.localeCompare(a.date));

  // Get today's date string for filtering
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-06-07"

  // ONLY process messages from TODAY — if no tips today, return empty so fallback is used
  const todayMessages = sortedMessages.filter(m => m.date.startsWith(todayStr));
  const allMessagesToProcess = todayMessages;

  for (const { text: msg } of allMessagesToProcess) {
    // --- FORMAT 1: New format "TIP 1: OVER 2.5 GOALS" ---
    if (/TIP\s+\d+\s*:/i.test(msg) || (/✅\s*TIP/i.test(msg))) {
      const teamsMatch = msg.match(/(?:⚽|🏟️)\s*(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i);
      const homeTeam = teamsMatch ? teamsMatch[1].replace(/[⚽🎯🔥🏆]/g, '').trim() : '';
      const awayTeam = teamsMatch ? teamsMatch[2].replace(/[⚽🎯🔥🏆]/g, '').trim() : '';

      let league = 'UEFA Champions League';
      if (/Premier League/i.test(msg)) league = 'Premier League';
      else if (/La Liga/i.test(msg)) league = 'La Liga';
      else if (/Bundesliga/i.test(msg)) league = 'Bundesliga';
      else if (/Serie A/i.test(msg)) league = 'Serie A';
      else if (/Libertadores/i.test(msg)) league = 'CONMEBOL Libertadores';
      else if (/Conference/i.test(msg)) league = 'UEFA Conference League';
      else if (/Europa League/i.test(msg)) league = 'UEFA Europa League';
      else if (/Moçambola/i.test(msg)) league = 'Moçambola';
      else if (/Champions|UCL/i.test(msg)) league = 'UEFA Champions League';

      const analysisMatch = msg.match(/(?:🧠\s*ANÁLISE|🧠\s*ANALYSIS)\s*:?\s*(.+?)(?:\n━|$)/is);
      const globalAnalysis = analysisMatch ? analysisMatch[1].replace(/\n/g, ' ').trim() : '';

      const sections = msg.split(/━+/);
      let tipCounter = 0;

      for (const section of sections) {
        const tipMatch = section.match(/(?:✅\s*)?TIP\s+(\d+)\s*:\s*(.+?)(?:\n|$)/i);
        if (!tipMatch) continue;

        tipCounter++;
        const tipNum = parseInt(tipMatch[1]);
        const marketRaw = tipMatch[2].trim();

        const confMatch = section.match(/(?:Confiança|Confidence)\s*:\s*(.+?)(?:\n|$)/i);
        const confidence = confMatch ? confidenceFromText(confMatch[1]) : 75;

        const oddsMatch = section.match(/(?:Odd|ODD|@)\s*:?\s*@?([\d.]+)/i);
        const odds = oddsMatch ? parseFloat(oddsMatch[1]) : 0;

        const tipAnalysisMatch = section.match(/📊\s*(.+?)(?:\n📊|\n💰|\n━|$)/is);
        const tipAnalysis = tipAnalysisMatch
          ? tipAnalysisMatch[0].replace(/📊\s*/g, '').replace(/\n/g, ' | ').trim()
          : globalAnalysis;

        const { market, prediction } = parseMarket(marketRaw);

        if (homeTeam && awayTeam) {
          tips.push({
            id: 170 + tipCounter,
            betNumber: String(170 + tipCounter),
            betType: tipCounter > 3 ? 'DOUBLE' : 'SINGLE',
            league,
            homeTeam,
            awayTeam,
            date: today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
            time: '20:00',
            prediction,
            confidence,
            odds: odds || (confidence >= 80 ? 1.65 : confidence >= 70 ? 1.85 : 2.10),
            market,
            winner: prediction.includes('Vitória') ? homeTeam : '',
            analysis: tipAnalysis,
            homePercent: 55,
            drawPercent: 20,
            awayPercent: 25,
          });
        }
      }

      if (tips.length > 0) break;
    }

    // --- FORMAT 2: "BET 174: Over 2.5 Goals @1.80" (inline format) ---
    if (/🎯\s*BET\s+\d+\s*:/i.test(msg)) {
      // Extract teams from the message
      const teamsMatch = msg.match(/⚽\s*(.+?)\s*vs\s*(.+?)(?:\n|🏟️)/i);
      const homeTeam = teamsMatch ? teamsMatch[1].replace(/[⚽🎯🔥🏆]/g, '').trim() : '';
      const awayTeam = teamsMatch ? teamsMatch[2].replace(/[⚽🎯🔥🏆]/g, '').trim() : '';

      // Determine league
      let league = 'UEFA Conference League';
      if (/Europa League/i.test(msg)) league = 'UEFA Europa League';
      else if (/Champions|UCL/i.test(msg)) league = 'UEFA Champions League';
      else if (/Premier League/i.test(msg)) league = 'Premier League';
      else if (/Libertadores/i.test(msg)) league = 'CONMEBOL Libertadores';
      else if (/Moçambola/i.test(msg)) league = 'Moçambola';

      // Extract time
      const timeMatch = msg.match(/(\d{1,2}):(\d{2})\s*(?:GMT|BST|UTC)/i);
      const time = timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '20:00';

      // Extract all BET lines: "🎯 BET 174: Over 2.5 Goals @1.80"
      const betLineRegex = /🎯\s*BET\s+(\d+)\s*:\s*(.+?)\s*@([\d.]+)/gi;
      let betMatch;
      let betCounter = 0;

      while ((betMatch = betLineRegex.exec(msg)) !== null) {
        betCounter++;
        const betNumber = betMatch[1];
        const marketRaw = betMatch[2].trim();
        const odds = parseFloat(betMatch[3]);

        const { market, prediction } = parseMarket(marketRaw);
        const confidence = confidenceFromOdds(odds);

        // Extract analysis from 💡 line
        const analysisMatch = msg.match(/💡\s*(.+?)(?:\n━|$)/is);
        const analysis = analysisMatch ? analysisMatch[1].replace(/\n/g, ' ').trim() : '';

        if (homeTeam && awayTeam) {
          tips.push({
            id: parseInt(betNumber) || tips.length + 1,
            betNumber,
            betType: betCounter > 2 ? 'DOUBLE' : 'SINGLE',
            league,
            homeTeam,
            awayTeam,
            date: today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
            time,
            prediction,
            confidence,
            odds,
            market,
            winner: prediction.includes('Vitória') ? homeTeam : '',
            analysis,
            homePercent: 45,
            drawPercent: 25,
            awayPercent: 30,
          });
        }
      }

      if (tips.length > 0) break;
    }

    // --- FORMAT 3: Old format "BET 169 | SINGLE" ---
    if (msg.includes('BET') && /BET\s+\d+\s*\|\s*(SINGLE|DOUBLE)/i.test(msg)) {
      let defaultHomeTeam = '';
      let defaultAwayTeam = '';
      let defaultLeague = 'Champions League';
      let defaultTime = '20:00';

      const titleMatch = msg.match(/TIPS\s+(.+?)\s*(?:vs|🆚)\s*(.+?)\s*(?:—|–|-)\s*(.+?)(?:\n|$)/i);
      if (titleMatch) {
        defaultHomeTeam = titleMatch[1].replace(/[⚽🎯🔥]/g, '').trim();
        defaultAwayTeam = titleMatch[2].trim();
        defaultLeague = titleMatch[3].trim();
      }

      const timeMatch = msg.match(/(\d{1,2}):(\d{2})\s*BST/i);
      if (timeMatch) defaultTime = `${timeMatch[1]}:${timeMatch[2]}`;

      const sections = msg.split(/━+/);
      for (const section of sections) {
        const betMatch = section.match(/BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)/i);
        if (!betMatch) continue;

        const betNumber = betMatch[1];
        const betType = betMatch[2].toUpperCase();
        const oddsMatch = section.match(/(?:Odd|ODD)\s*:?\s*@?([\d.]+)/i);
        const odds = oddsMatch ? parseFloat(oddsMatch[1]) : 1.50;
        const analysisMatch = section.match(/📌\s*(.+?)(?:\n|$)/);
        const analysis = analysisMatch ? analysisMatch[1].trim() : '';
        const marketLineMatch = section.match(/⚽️?\s*(.+?)(?:\n|$)/);
        let marketLine = marketLineMatch ? marketLineMatch[1].trim() : '';

        let homeTeam = defaultHomeTeam;
        let awayTeam = defaultAwayTeam;
        const teamsInLine = marketLine.match(/(?:—|–|-)\s*(.+?)\s*(?:vs|🆚)\s*(.+?)$/i);
        if (teamsInLine) {
          homeTeam = teamsInLine[1].trim();
          awayTeam = teamsInLine[2].trim();
          marketLine = marketLine.replace(/\s*(?:—|–|-)\s*.+$/, '').trim();
        }
        const altTeamsMatch = section.match(/🏟️\s*(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i);
        if (altTeamsMatch) {
          homeTeam = altTeamsMatch[1].trim();
          awayTeam = altTeamsMatch[2].trim();
        }

        const { market, prediction } = parseMarket(marketLine);
        const confidence = confidenceFromOdds(odds);

        if (homeTeam && awayTeam) {
          tips.push({
            id: parseInt(betNumber) || tips.length + 1,
            betNumber,
            betType,
            league: defaultLeague.replace(/UCL/i, 'UEFA Champions League').replace(/SEMI-FINAL/i, '').trim() || 'UEFA Champions League',
            homeTeam,
            awayTeam,
            date: today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
            time: defaultTime,
            prediction,
            confidence,
            odds,
            market,
            winner: prediction.includes('Vitória') || prediction.includes('Win') ? homeTeam : '',
            analysis,
            homePercent: 45,
            drawPercent: 25,
            awayPercent: 30,
          });
        }
      }

      if (tips.length > 0) break;
    }
  }

  return tips;
}

// Fallback tips — 12/06/2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  return [
    // ===== MUNDIAL 2026 GRUPO B: CANADÁ vs BÓSNIA-HERZEGOVINA =====
    {
      id: 911,
      betNumber: '911',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo B',
      homeTeam: 'Canadá',
      awayTeam: 'Bósnia',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 78,
      odds: 1.60,
      market: 'Mais de 1.5',
      winner: '',
      analysis: '🇨🇦 Mais de 1.5 Golos @1.60 — O Canadá recebe a Bósnia em Toronto sem Alphonso Davies (lesão no tendão), mas Jonathan David e Tajon Buchanan são suficientes para criar perigo. A Bósnia, que eliminou a Itália no qualifying, tem Edin Džeko como referência ofensiva. Ambas as equipas precisam de pontos e deverão jogar de forma aberta. O BMO Field estará repleto de adeptos canadianos. Boa odd para um jogo com golos.',
      homePercent: 48,
      drawPercent: 26,
      awayPercent: 26,
    },
    // ===== MUNDIAL 2026 GRUPO B: CANADÁ vs BÓSNIA — RESULTADO =====
    {
      id: 912,
      betNumber: '912',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo B',
      homeTeam: 'Canadá',
      awayTeam: 'Bósnia',
      date: dateStr,
      time: '20:00',
      prediction: 'Dupla Hipótese: Canadá ou Empate',
      confidence: 72,
      odds: 1.50,
      market: 'Dupla Hipótese',
      winner: 'Canadá',
      analysis: '🇨🇦 Dupla Hipótese Canadá/Empate @1.50 — O Canadá joga em casa no BMO Field de Toronto com um ambiente extraordinário. Apesar da ausência de Davies, a equipa tem Jonathan David (Lille) e Tajon Buchanan como armas ofensivas. A Bósnia é uma equipa competente mas o fator casa do Canadá e o apoio dos adeptos deverão ser determinantes. Apostamos que o Canadá não perde.',
      homePercent: 48,
      drawPercent: 26,
      awayPercent: 26,
    },
    // ===== MUNDIAL 2026 GRUPO D: EUA vs PARAGUAI =====
    {
      id: 913,
      betNumber: '913',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo D',
      homeTeam: 'EUA',
      awayTeam: 'Paraguai',
      date: dateStr,
      time: '02:00',
      prediction: 'Vitória EUA',
      confidence: 75,
      odds: 1.70,
      market: 'Resultado Final',
      winner: 'EUA',
      analysis: '🇺🇸 Vitória EUA @1.70 — Os EUA estreiam-se no Mundial 2026 em Los Angeles (SoFi Stadium) com o apoio de 70 mil adeptos. Mauricio Pochettino tem uma equipa jovem e motivada, com Christian Pulisic e Gio Reyna como principais armas. O Paraguai (°39º no ranking FIFA) é uma equipa organizada mas inferior. Os EUA são favoritos claros em casa e Pochettino prometeu uma estratégia agressiva. Boa odd para a vitória do anfitrião.',
      homePercent: 55,
      drawPercent: 24,
      awayPercent: 21,
    },
    // ===== MUNDIAL 2026 GRUPO D: EUA vs PARAGUAI — GOLOS =====
    {
      id: 914,
      betNumber: '914',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo D',
      homeTeam: 'EUA',
      awayTeam: 'Paraguai',
      date: dateStr,
      time: '02:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 68,
      odds: 2.05,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '⚽ Mais de 2.5 Golos @2.05 — Os EUA têm um ataque dinâmico e jogam em casa com pressão para vencer. O Paraguai, apesar de organizado defensivamente, pode sofrer com a velocidade de Pulisic e Reyna. Nos últimos 5 jogos dos EUA, 4 tiveram mais de 2.5 golos. Uma odd interessante para um jogo que os EUA precisam de vencer de forma convincente.',
      homePercent: 55,
      drawPercent: 24,
      awayPercent: 21,
    },
    // ===== MUNDIAL 2026 GRUPO A: COREIA DO SUL vs CHÉQUIA (AO VIVO) =====
    {
      id: 915,
      betNumber: '915',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo A',
      homeTeam: 'Coreia do Sul',
      awayTeam: 'Chéquia',
      date: dateStr,
      time: '03:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 70,
      odds: 1.90,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇰🇷 Ambas Marcam - Sim @1.90 — A Coreia do Sul, liderada por Son Heung-min (PSG), tem um ataque de qualidade mas pode sofrer na defesa. A Chéquia, que se qualificou por playoff, tem Patrik Schick (Leverkusen) como grande ameaça. Ambas as seleções precisam de pontos no Grupo A e deverão jogar de forma aberta. O Estadio Akron em Guadalajara recebe este confronto. Boa odd para o mercado BTTS.',
      homePercent: 42,
      drawPercent: 28,
      awayPercent: 30,
    },
    // ===== ACUMULADOR (DOUBLE) — DIA 2 DO MUNDIAL =====
    {
      id: 916,
      betNumber: '916',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'EUA + Canadá',
      awayTeam: 'Anfitriões',
      date: dateStr,
      time: 'Vários',
      prediction: 'Vitória EUA + Mais de 1.5 Golos Canadá vs Bósnia',
      confidence: 74,
      odds: 2.72,
      market: 'Combinada',
      winner: '',
      analysis: '💰 ACUMULADOR DO DIA @2.72 — Combinamos as duas apostas mais sólidas do dia: A vitória dos EUA em casa em Los Angeles contra o Paraguai (1.70) com o mercado de Mais de 1.5 Golos no jogo Canadá vs Bósnia (1.60). Dois anfitriões norte-americanos a jogar em casa com o apoio dos seus adeptos. Uma combinação lógica para o segundo dia de jogo do maior Mundial de sempre.',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    }
  ];
}

export default async function handler(request: Request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const response = await fetch('https://t.me/s/alivegoal', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`Telegram fetch failed: ${response.status}`);
    }

    const html = await response.text();
    const tips = parseTipsFromHTML(html);

    if (tips.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        source: 'telegram_live',
        count: tips.length,
        updatedAt: new Date().toISOString(),
        tips,
      }), { status: 200, headers });
    }

    const fallback = getFallbackTips();
    return new Response(JSON.stringify({
      success: true,
      source: 'fallback',
      count: fallback.length,
      updatedAt: new Date().toISOString(),
      tips: fallback,
    }), { status: 200, headers });

  } catch (error) {
    const fallback = getFallbackTips();
    return new Response(JSON.stringify({
      success: true,
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
      count: fallback.length,
      updatedAt: new Date().toISOString(),
      tips: fallback,
    }), { status: 200, headers });
  }
}
