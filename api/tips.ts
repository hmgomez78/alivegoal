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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-07-04"

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

// Fallback tips — 11/07/2026 — Quartos de Final Mundial 2026: Noruega vs Inglaterra
function getFallbackTips(): Tip[] {
  const dateStr = '11/07/2026';
  
  return [
    // ===== MUNDIAL 2026: NORUEGA vs INGLATERRA =====
    {
      id: 5026,
      betNumber: '5026',
      betType: 'SINGLE',
      league: 'Mundial 2026 - Quartos de Final',
      homeTeam: 'Noruega',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '22:00',
      prediction: 'Ambas as Equipas Marcam',
      confidence: 85,
      odds: 1.95,
      market: 'Golos',
      winner: '',
      analysis: '⭐ Ambas as Equipas Marcam @1.95 — A Noruega tem um ataque demolidor com Erling Haaland em grande forma, mas a sua defesa tem mostrado fragilidades. A Inglaterra tem qualidade ofensiva com Kane e Bellingham, mas sofreu golos em quase todos os jogos. Num jogo a eliminar, esperamos oportunidades para ambos os lados.',
      homePercent: 30,
      drawPercent: 30,
      awayPercent: 40,
    },
    {
      id: 5027,
      betNumber: '5027',
      betType: 'SINGLE',
      league: 'Mundial 2026 - Quartos de Final',
      homeTeam: 'Noruega',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '22:00',
      prediction: 'Erling Haaland a Marcar',
      confidence: 75,
      odds: 2.20,
      market: 'Marcadores',
      winner: 'Noruega',
      analysis: '🔥 Haaland a Marcar @2.20 — O avançado norueguês conhece perfeitamente os defesas ingleses da Premier League. Com a motivação em alta após eliminar o Brasil, Haaland será o alvo principal de todos os ataques da Noruega. A odd tem imenso valor para o melhor marcador da equipa nórdica.',
      homePercent: 35,
      drawPercent: 25,
      awayPercent: 40,
    },
    // ===== BRASILEIRÃO SÉRIE B: SPORT vs BOTAFOGO-SP =====
    {
      id: 5028,
      betNumber: '5028',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Sport',
      awayTeam: 'Botafogo-SP',
      date: dateStr,
      time: '21:30',
      prediction: 'Vitória Sport',
      confidence: 80,
      odds: 1.65,
      market: 'Resultado Final',
      winner: 'Sport',
      analysis: '🇧🇷 Vitória Sport @1.65 — O Sport Recife é tradicionalmente muito forte a jogar em casa na Ilha do Retiro. O Botafogo-SP tem tido dificuldades como visitante na Série B. Acreditamos numa vitória caseira sólida para o Sport manter a perseguição aos lugares de subida.',
      homePercent: 65,
      drawPercent: 25,
      awayPercent: 10,
    },
    // ===== CONFERENCE LEAGUE: HEGELMANN vs PAIDE =====
    {
      id: 5029,
      betNumber: '5029',
      betType: 'SINGLE',
      league: 'Conference League - Qualificação',
      homeTeam: 'Hegelmann',
      awayTeam: 'Paide',
      date: dateStr,
      time: '17:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 70,
      odds: 1.85,
      market: 'Golos',
      winner: '',
      analysis: '🇪🇺 Mais de 2.5 Golos @1.85 — Ambas as equipas costumam ter jogos com muitos golos nos seus campeonatos locais. O Hegelmann a jogar em casa vai procurar a vantagem na eliminatória, abrindo espaços para os contra-ataques do Paide. O jogo terminou 1-1 na realidade, mas as expectativas eram de golos.',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    // ===== CONFERENCE LEAGUE: DINAMO MINSK vs SILEKS =====
    {
      id: 5030,
      betNumber: '5030',
      betType: 'SINGLE',
      league: 'Conference League - Qualificação',
      homeTeam: 'Dinamo Minsk',
      awayTeam: 'Sileks',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Dinamo Minsk',
      confidence: 75,
      odds: 1.50,
      market: 'Resultado Final',
      winner: 'Dinamo Minsk',
      analysis: '🇪🇺 Vitória Dinamo Minsk @1.50 — O Dinamo Minsk tem mais experiência europeia e qualidade individual superior ao Sileks da Macedónia do Norte. Jogando a primeira mão em casa, os bielorrussos são claros favoritos para ganhar vantagem na eliminatória.',
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 15,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5031,
      betNumber: '5031',
      betType: 'DOUBLE',
      league: 'Mundial + Brasileirão B',
      homeTeam: 'Noruega/Inglaterra (Golos) + Sport',
      awayTeam: 'Multipla',
      date: dateStr,
      time: '21:30',
      prediction: 'Ambas Marcam (Noruega/Inglaterra) + Vitória Sport',
      confidence: 70,
      odds: 3.21,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @3.21 — Combinamos o mercado de golos no grande jogo do Mundial com a vitória caseira do Sport na Série B. A expectativa de golos no duelo de Haaland e Kane junta-se à força do Sport na Ilha do Retiro para uma dupla de excelente valor.',
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
    }
  ];
}

export default async function handler(req: Request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const channelId = process.env.TELEGRAM_CHANNEL_ID || 'alivegoal_tips';
    const response = await fetch(`https://t.me/s/${channelId}`);
    
    if (!response.ok) {
      console.warn('Failed to fetch from Telegram, using fallback tips');
      return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'fallback' }), {
        status: 200,
        headers,
      });
    }

    const html = await response.text();
    const tips = parseTipsFromHTML(html);

    if (tips.length > 0) {
      return new Response(JSON.stringify({ tips, source: 'telegram' }), {
        status: 200,
        headers,
      });
    }

    // Fallback if no tips found for today
    return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'fallback_no_tips_today' }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error in tips API:', error);
    return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'error_fallback' }), {
      status: 200,
      headers,
    });
  }
}
