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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-05-08"

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

// Fallback tips — El Clásico + Premier League + Serie A 10/05/2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });

  return [
    // ===== LIGA PORTUGAL: BENFICA vs BRAGA =====
    {
      id: 209,
      betNumber: '209',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Benfica',
      awayTeam: 'Braga',
      date: dateStr,
      time: '21:15',
      prediction: 'Benfica Vence',
      confidence: 80,
      odds: 1.39,
      market: 'Resultado Final',
      winner: 'Benfica',
      analysis: '🦅 Benfica Vence @1.39 — Mourinho precisa desta vitória para garantir o 2º lugar e a Champions League! Benfica está invicto há 47 jogos na Liga Portugal (recorde histórico). Em casa no Estádio da Luz, o Benfica venceu 8 dos últimos 9 jogos. Braga vem de derrota pesada (1-3) na Europa League contra o Freiburg e sem moral. Pavlidis (24 golos) é imbatível em casa. APOSTA SEGURA!',
      homePercent: 69,
      drawPercent: 21,
      awayPercent: 10,
    },
    {
      id: 210,
      betNumber: '210',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Benfica',
      awayTeam: 'Braga',
      date: dateStr,
      time: '21:15',
      prediction: 'Ambas Marcam - Sim',
      confidence: 82,
      odds: 1.80,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ BTTS @1.80 — Os últimos 3 confrontos Benfica vs Braga tiveram golos dos dois lados! Benfica marcou em 11 dos últimos 12 jogos da liga. Braga marcou em 6 dos últimos 7 jogos em todas as competições. Mesmo cansado da Europa, o Braga tem qualidade ofensiva suficiente para marcar. BTTS é a nossa aposta HOT desta semana!',
      homePercent: 69,
      drawPercent: 21,
      awayPercent: 10,
    },
    {
      id: 211,
      betNumber: '211',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Benfica',
      awayTeam: 'Braga',
      date: dateStr,
      time: '21:15',
      prediction: 'Mais de 2.5 Golos',
      confidence: 76,
      odds: 1.65,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🔥 Over 2.5 Golos @1.65 — Benfica marcou 2+ golos em 11 dos últimos 12 jogos em casa! Braga marcou e sofreu em 5 dos últimos 7 jogos. Os últimos 5 jogos do Braga fora tiveram Over 2.5 golos. Jogo de alto risco para o Braga = jogo aberto = GOLOS GARANTIDOS!',
      homePercent: 69,
      drawPercent: 21,
      awayPercent: 10,
    },
    // ===== LIGA PORTUGAL: RIO AVE vs SPORTING =====
    {
      id: 212,
      betNumber: '212',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Rio Ave',
      awayTeam: 'Sporting CP',
      date: dateStr,
      time: '21:15',
      prediction: 'Sporting CP Vence',
      confidence: 78,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Sporting CP',
      analysis: '🟢 Sporting CP Vence @1.55 — O Sporting precisa de vencer para manter a pressão no Benfica pela luta pelo 2º lugar! Sporting está em forma excelente: 7 vitórias nos últimos 9 jogos. Rio Ave está na luta pela sobrevivência — pressão enorme. Gyökeres (32 golos na época!) é o melhor avançado da Liga Portugal. Sporting venceu os últimos 4 jogos fora. APOSTA SÓLIDA!',
      homePercent: 22,
      drawPercent: 23,
      awayPercent: 55,
    },
    {
      id: 213,
      betNumber: '213',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Rio Ave',
      awayTeam: 'Sporting CP',
      date: dateStr,
      time: '21:15',
      prediction: 'Mais de 2.5 Golos',
      confidence: 72,
      odds: 1.80,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '⚽ Over 2.5 Golos @1.80 — Rio Ave joga em casa com necessidade de pontos para evitar a descida = jogo aberto. Sporting tem média de 2.9 golos por jogo fora. Os últimos 4 jogos do Sporting fora tiveram Over 2.5 golos. Gyökeres vai marcar — é uma certeza estatística!',
      homePercent: 22,
      drawPercent: 23,
      awayPercent: 55,
    },
    // ===== PREMIER LEAGUE: TOTTENHAM vs LEEDS =====
    {
      id: 214,
      betNumber: '214',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Tottenham',
      awayTeam: 'Leeds United',
      date: dateStr,
      time: '16:00',
      prediction: 'Tottenham Vence',
      confidence: 75,
      odds: 1.72,
      market: 'Resultado Final',
      winner: 'Tottenham',
      analysis: '⚪ Tottenham Vence @1.72 — Tottenham em casa no Tottenham Hotspur Stadium é forte: 9 vitórias em 13 jogos. Leeds acaba de subir da Championship e está a adaptar-se à Premier League — 3 derrotas nos últimos 4 jogos. Son e Maddison em forma. Leeds tem a pior defesa dos recém-promovidos (62 golos sofridos). Vitória Spurs é aposta de valor!',
      homePercent: 58,
      drawPercent: 22,
      awayPercent: 20,
    },
    {
      id: 215,
      betNumber: '215',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Tottenham',
      awayTeam: 'Leeds United',
      date: dateStr,
      time: '16:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 74,
      odds: 1.85,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🔥 Over 2.5 Golos @1.85 — Tottenham marcou 3+ golos em 6 dos últimos 8 jogos em casa. Leeds sofreu 3+ golos em 5 dos últimos 7 jogos fora. Os últimos 3 H2H Tottenham vs Leeds tiveram Over 2.5 golos. Jogo de GOLOS GARANTIDOS!',
      homePercent: 58,
      drawPercent: 22,
      awayPercent: 20,
    },
    // ===== ACUMULADOR DO DIA =====
    {
      id: 216,
      betNumber: '216',
      betType: 'DOUBLE',
      league: 'Liga Portugal + Premier League',
      homeTeam: 'Benfica + Sporting',
      awayTeam: 'Braga + Rio Ave',
      date: dateStr,
      time: '21:15',
      prediction: 'Benfica Vence + Sporting Vence',
      confidence: 76,
      odds: 2.15,
      market: 'Combinada',
      winner: '',
      analysis: '💥 ACUMULADOR LIGA PORTUGAL: Benfica Vence @1.39 + Sporting Vence @1.55 = Odd combinada @2.15! Stake: 500 MZN → Retorno potencial: 1.075 MZN. Os dois grandes de Lisboa em casa e fora — ambos com motivação máxima para o 2º lugar. COMBINADA SEGURA!',
      homePercent: 60,
      drawPercent: 20,
      awayPercent: 20,
    },
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
