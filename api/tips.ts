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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-06-18"

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

// Fallback tips — 18/06/2026 — Dia 8 do Mundial 2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  return [
    // ===== MUNDIAL 2026 GRUPO A: REPÚBLICA CHECA vs ÁFRICA DO SUL =====
    {
      id: 950,
      betNumber: '950',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo A',
      homeTeam: 'República Checa',
      awayTeam: 'África do Sul',
      date: dateStr,
      time: '17:00',
      prediction: 'Ambas as Equipas Marcam',
      confidence: 72,
      odds: 1.90,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ Ambas Marcam @1.90 — A República Checa perdeu com a Coreia do Sul e precisa urgentemente de pontos. A África do Sul também não pode perder e vai atacar. A defesa checa tem revelado fragilidades (5 jogos sem clean sheet). Lyle Foster e os avançados sul-africanos têm qualidade para faturar, enquanto os checos com Soucek e Schick são perigosos.',
      homePercent: 40,
      drawPercent: 30,
      awayPercent: 30,
    },
    // ===== MUNDIAL 2026 GRUPO B: SUÍÇA vs BÓSNIA E HERZEGOVINA =====
    {
      id: 951,
      betNumber: '951',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo B',
      homeTeam: 'Suíça',
      awayTeam: 'Bósnia e Herzegovina',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Suíça',
      confidence: 82,
      odds: 1.65,
      market: 'Resultado Final',
      winner: 'Suíça',
      analysis: '🇨🇭 Vitória Suíça @1.65 — A Suíça é claramente superior e precisa de vencer para garantir a qualificação. Criou 3.28 xG contra o Qatar e dominou completamente. A Bósnia, apesar de ter Dzeko, é uma das equipas mais fracas do torneio. Xhaka, Akanji e Embolo fazem a diferença. Esperamos uma vitória confortável dos helvéticos.',
      homePercent: 62,
      drawPercent: 22,
      awayPercent: 16,
    },
    // ===== MUNDIAL 2026 GRUPO B: CANADÁ vs QATAR =====
    {
      id: 952,
      betNumber: '952',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo B',
      homeTeam: 'Canadá',
      awayTeam: 'Qatar',
      date: dateStr,
      time: '23:00',
      prediction: 'Vitória Canadá (-1.5)',
      confidence: 80,
      odds: 1.85,
      market: 'Handicap',
      winner: 'Canadá',
      analysis: '🇨🇦 Canadá -1.5 @1.85 — O Canadá é favorito claro com Jonathan David, Oluwaseyi e Larin no ataque. O Qatar concedeu 26 remates e 3.22 xG na derrota com a Suíça — é uma das equipas mais fracas do torneio. O Canadá precisa de uma vitória convincente e tem qualidade para vencer por 2+ golos. Jonathan David como marcador é uma excelente aposta adicional.',
      homePercent: 70,
      drawPercent: 18,
      awayPercent: 12,
    },
    // ===== MUNDIAL 2026 GRUPO A: MÉXICO vs COREIA DO SUL =====
    {
      id: 953,
      betNumber: '953',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo A',
      homeTeam: 'México',
      awayTeam: 'Coreia do Sul',
      date: dateStr,
      time: '02:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 75,
      odds: 1.75,
      market: 'Menos de 2.5',
      winner: '',
      analysis: '🇲🇽🇰🇷 Under 2.5 @1.75 — O grande jogo do dia! México e Coreia do Sul são duas equipas muito organizadas taticamente. O México joga em casa (Guadalajara) e tem Jiménez em forma. A Coreia do Sul, com Son e Hwang, é perigosa em contra-ataque. Ambas as equipas preferem controlar o jogo e não se expõem. Esperamos um jogo equilibrado e com poucos golos — 1-1 é o resultado mais provável.',
      homePercent: 38,
      drawPercent: 32,
      awayPercent: 30,
    },
    // ===== MUNDIAL 2026 GRUPO B: SUÍÇA — MARCADOR =====
    {
      id: 954,
      betNumber: '954',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo B',
      homeTeam: 'Suíça',
      awayTeam: 'Bósnia e Herzegovina',
      date: dateStr,
      time: '20:00',
      prediction: 'Breel Embolo Marcador',
      confidence: 70,
      odds: 2.20,
      market: 'Marcador',
      winner: '',
      analysis: '🎯 Embolo Marcador @2.20 — Breel Embolo é o principal avançado da Suíça e tem estado em excelente forma. Contra uma defesa da Bósnia que concedeu golos no primeiro jogo, o avançado do Monaco tem excelentes probabilidades de faturar. A odds de 2.20 representa um valor excecional para um jogador desta qualidade num jogo em que a Suíça deve dominar.',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    // ===== ACUMULADOR (DOUBLE) — DIA 8 DO MUNDIAL =====
    {
      id: 955,
      betNumber: '955',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'Suíça + Canadá',
      awayTeam: 'Dupla Vitória',
      date: dateStr,
      time: 'Vários',
      prediction: 'Vitória Suíça + Vitória Canadá',
      confidence: 78,
      odds: 2.72,
      market: 'Acumulador',
      winner: '',
      analysis: '💰 ACUMULADOR DO DIA @2.72 — Combinamos as duas vitórias mais seguras do dia. A Suíça (@1.65) enfrenta uma Bósnia claramente inferior e precisa de vencer para garantir a qualificação. O Canadá (@1.85 -1.5) enfrenta o Qatar, a equipa mais fraca do torneio. Ambas as vitórias têm alta probabilidade e a combinação oferece uma odd atrativa de 2.72.',
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
