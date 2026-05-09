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

// Fallback tips — Premier League + Bundesliga 09/05/2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });

  return [
    // ===== PREMIER LEAGUE: LIVERPOOL vs CHELSEA =====
    {
      id: 192,
      betNumber: '192',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      date: dateStr,
      time: '08:30',
      prediction: 'Liverpool Vence',
      confidence: 78,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Liverpool',
      analysis: '🔴 Liverpool em casa é uma FORTALEZA! 8 vitórias nos últimos 10 jogos no Anfield. Arne Slot tem o melhor registo de treinador do Liverpool em casa desde Klopp. Alexander Isak regressa à convocatoria após lesão — mais uma arma ofensiva. Chelsea marcou em 7 jogos seguidos fora, mas a defesa do Liverpool é a mais sólida da Premier League (apenas 28 golos sofridos). Liverpool Vence @1.55 é VALOR SÓLIDO!',
      homePercent: 62,
      drawPercent: 20,
      awayPercent: 18,
    },
    {
      id: 193,
      betNumber: '193',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      date: dateStr,
      time: '08:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 74,
      odds: 1.75,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '⚽ Over 2.5 Golos — Chelsea marcou em TODOS os últimos 7 jogos fora. Liverpool tem 3.1 golos por jogo em casa nesta época. Os últimos 4 confrontos diretos Liverpool vs Chelsea tiveram Over 2.5 golos. Cole Palmer e Nkunku são ameaças constantes. Gravenberch e Salah no melhor momento da época. Jogo de GOLOS GARANTIDOS!',
      homePercent: 62,
      drawPercent: 20,
      awayPercent: 18,
    },
    {
      id: 194,
      betNumber: '194',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      date: dateStr,
      time: '08:30',
      prediction: 'Ambas Marcam - Sim',
      confidence: 72,
      odds: 1.70,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🎯 BTTS @1.70 — Chelsea marcou em 7 dos últimos 7 jogos fora. Liverpool marcou em TODOS os últimos 12 jogos em casa. Ambas as equipas têm os melhores ataques da Premier League. BTTS aconteceu em 5 dos últimos 6 jogos do Chelsea fora. Aposta de alta confiança!',
      homePercent: 62,
      drawPercent: 20,
      awayPercent: 18,
    },
    // ===== PREMIER LEAGUE: SUNDERLAND vs MANCHESTER UNITED =====
    {
      id: 195,
      betNumber: '195',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Sunderland',
      awayTeam: 'Manchester United',
      date: dateStr,
      time: '11:00',
      prediction: 'Manchester United Vence',
      confidence: 70,
      odds: 2.10,
      market: 'Resultado Final',
      winner: 'Manchester United',
      analysis: '🔴 Man United garantiu a Champions League na última jornada e quer terminar a época em alta. Sunderland é a equipa promovida da Championship com a pior defesa do top 10 (52 golos sofridos). United tem 15.6 remates por jogo vs 10.1 do Sunderland. Ruben Amorim quer os 3 pontos para consolidar o 4º lugar. Man United Vence @2.10 é VALOR REAL!',
      homePercent: 28,
      drawPercent: 30,
      awayPercent: 42,
    },
    {
      id: 196,
      betNumber: '196',
      betType: 'SINGLE',
      league: 'Premier League',
      homeTeam: 'Sunderland',
      awayTeam: 'Manchester United',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 68,
      odds: 1.85,
      market: 'Menos de 2.5',
      winner: '',
      analysis: '🔒 Under 2.5 Golos — Sunderland tem os últimos 4 jogos com Under 2.5 golos. Man United joga com cuidado fora de casa (3 dos últimos 5 jogos fora terminaram Under 2.5). Sunderland defende em bloco baixo. Resultado previsto: 0-1 ou 1-1. Under 2.5 @1.85 é SEGURO!',
      homePercent: 28,
      drawPercent: 30,
      awayPercent: 42,
    },
    // ===== BUNDESLIGA JORNADA 34: WOLFSBURG vs BAYERN MUNICH =====
    {
      id: 197,
      betNumber: '197',
      betType: 'SINGLE',
      league: 'Bundesliga',
      homeTeam: 'Wolfsburg',
      awayTeam: 'Bayern Munich',
      date: dateStr,
      time: '23:30',
      prediction: 'Bayern Munich Vence',
      confidence: 82,
      odds: 1.64,
      market: 'Resultado Final',
      winner: 'Bayern Munich',
      analysis: '⚽ Bayern Vence @1.64 — APOSTA MAIS SEGURA DO DIA! Bayern ganhou 7 jogos SEGUIDOS contra o Wolfsburg incluindo 8-1 na 1ª volta. Wolfsburg está no 3º lugar de baixo (zona de descida) com apenas 1 vitória nos últimos 5 jogos em casa. Bayern tem 8 vitórias nos últimos 10 jogos. Harry Kane marcou 7 golos nos últimos 10 jogos. Bayern Vence @1.64 é VALOR GARANTIDO!',
      homePercent: 15,
      drawPercent: 20,
      awayPercent: 65,
    },
    {
      id: 198,
      betNumber: '198',
      betType: 'SINGLE',
      league: 'Bundesliga',
      homeTeam: 'Wolfsburg',
      awayTeam: 'Bayern Munich',
      date: dateStr,
      time: '23:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 76,
      odds: 1.81,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🔥 Over 2.5 Golos @1.81 — Bayern marcou 3+ golos em 6 dos últimos 8 jogos fora. Wolfsburg sofreu 2.1 golos por jogo nos últimos 10 jogos. O último H2H foi 8-1 para o Bayern! Mesmo que Wolfsburg marque 1 golo, Bayern vai marcar 2+. Over 2.5 @1.81 é VALOR FORTE!',
      homePercent: 15,
      drawPercent: 20,
      awayPercent: 65,
    },
    // ===== ACUMULADOR DO DIA =====
    {
      id: 199,
      betNumber: '199',
      betType: 'DOUBLE',
      league: 'Premier League + Bundesliga',
      homeTeam: 'Liverpool + Bayern',
      awayTeam: 'Chelsea + Wolfsburg',
      date: dateStr,
      time: '08:30',
      prediction: 'Liverpool Vence + Bayern Vence',
      confidence: 72,
      odds: 2.55,
      market: 'Combinada',
      winner: '',
      analysis: '💥 ACUMULADOR DO DIA: Liverpool Vence @1.55 + Bayern Vence @1.64 = Odd combinada @2.55! Stake: 500 MZN → Retorno potencial: 1.275 MZN. Dois favoritos claros em casa e fora. COMBINADA DE ALTA CONFIANÇA!',
      homePercent: 55,
      drawPercent: 22,
      awayPercent: 23,
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
