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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-06-22"

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

// Fallback tips — 22/06/2026 — Dia 12 do Mundial 2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  return [
    // ===== MUNDIAL 2026 GRUPO J: ARGENTINA vs ÁUSTRIA =====
    {
      id: 981,
      betNumber: '981',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo J',
      homeTeam: 'Argentina',
      awayTeam: 'Áustria',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Argentina',
      confidence: 85,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Argentina',
      analysis: '🇦🇷 Argentina Vitória @1.45 — A Albiceleste entrou forte no Mundial com uma vitória clara sobre a Argélia por 3-0. Com Messi em excelente forma e um meio-campo dominador liderado por De Paul, a Argentina é claramente favorita contra uma Áustria que venceu a Jordânia (3-1) mas mostrou algumas debilidades defensivas. A experiência e qualidade técnica dos campeões do mundo devem garantir os 3 pontos.',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    // ===== MUNDIAL 2026 GRUPO I: FRANÇA vs IRAQUE =====
    {
      id: 982,
      betNumber: '982',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo I',
      homeTeam: 'França',
      awayTeam: 'Iraque',
      date: dateStr,
      time: '22:00',
      prediction: 'França Handicap Asiático -1.5',
      confidence: 82,
      odds: 1.65,
      market: 'Handicap',
      winner: 'França',
      analysis: '🇫🇷 França AH -1.5 @1.65 — A França demonstrou o seu poderio ofensivo ao bater o Senegal por 3-1, com Mbappé em grande destaque (bisou). O Iraque vem de uma pesada derrota contra a Noruega (1-4) e terá enormes dificuldades para conter o ataque veloz dos Les Bleus. Esperamos uma vitória confortável da equipa de Didier Deschamps por dois ou mais golos de diferença.',
      homePercent: 85,
      drawPercent: 10,
      awayPercent: 5,
    },
    // ===== MUNDIAL 2026 GRUPO G: NOVA ZELÂNDIA vs EGITO =====
    {
      id: 983,
      betNumber: '983',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo G',
      homeTeam: 'Nova Zelândia',
      awayTeam: 'Egito',
      date: dateStr,
      time: '02:00',
      prediction: 'Ambas as Equipas Marcam',
      confidence: 75,
      odds: 1.85,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇳🇿🇪🇬 Ambas Marcam @1.85 — Jogo decisivo no Grupo G. A Nova Zelândia empatou 2-2 com o Irão, mostrando eficácia ofensiva mas fragilidades na defesa. O Egito, que empatou 1-1 com a Bélgica, precisa de vencer e vai procurar o ataque com Salah. Ambas as equipas precisam de arriscar, o que deve resultar num jogo aberto e com golos nas duas balizas.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== MUNDIAL 2026 GRUPO J: ARGENTINA — OVER 2.5 =====
    {
      id: 984,
      betNumber: '984',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo J',
      homeTeam: 'Argentina',
      awayTeam: 'Áustria',
      date: dateStr,
      time: '18:00',
      prediction: 'Over 2.5 Golos',
      confidence: 78,
      odds: 1.75,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '⚽ Over 2.5 @1.75 — A Argentina marcou 3 golos no primeiro jogo e a Áustria também apontou 3 tentos e sofreu 1. Ambas as equipas têm ataques concretizadores e a Áustria não costuma fechar-se na defesa. Esperamos um jogo dinâmico, com a Argentina a criar muitas oportunidades e a Áustria a poder contribuir com um golo, ultrapassando facilmente a linha de 2.5 golos.',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    // ===== MUNDIAL 2026 GRUPO I: FRANÇA — OVER 1.5 HT =====
    {
      id: 985,
      betNumber: '985',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo I',
      homeTeam: 'França',
      awayTeam: 'Iraque',
      date: dateStr,
      time: '22:00',
      prediction: 'Mais de 1.5 Golos na 1ª Parte',
      confidence: 72,
      odds: 2.10,
      market: 'Golos 1ª Parte',
      winner: '',
      analysis: '⏱️ Over 1.5 HT @2.10 — A França costuma entrar forte nos jogos para resolver cedo, especialmente contra equipas teoricamente mais fracas. O Iraque mostrou debilidades na primeira parte contra a Noruega. Com Mbappé e companhia focados em garantir a qualificação rapidamente, acreditamos que haverá pelo menos dois golos antes do intervalo.',
      homePercent: 85,
      drawPercent: 10,
      awayPercent: 5,
    },
    // ===== ACUMULADOR (DOUBLE) — DIA 12 DO MUNDIAL =====
    {
      id: 986,
      betNumber: '986',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'Argentina + França',
      awayTeam: 'Dupla Vitória',
      date: dateStr,
      time: 'Vários',
      prediction: 'Vitória Argentina + Vitória França',
      confidence: 88,
      odds: 1.74,
      market: 'Acumulador',
      winner: '',
      analysis: '💰 ACUMULADOR DO DIA @1.74 — Juntamos os dois grandes favoritos do dia. A Argentina (@1.45) tem qualidade superior para bater a Áustria e garantir o apuramento, enquanto a França (@1.20) não deverá ter problemas para superar o Iraque. É uma aposta segura em duas das seleções mais fortes do torneio, com uma odd combinada muito interessante para dobrar o investimento.',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    }
  ];
}

export default async function handler(req: Request) {
  try {
    const response = await fetch('https://t.me/s/alivegoal');
    if (!response.ok) {
      throw new Error(`Failed to fetch Telegram: ${response.status}`);
    }

    const html = await response.text();
    const tips = parseTipsFromHTML(html);

    if (tips.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        source: 'telegram',
        count: tips.length,
        updatedAt: new Date().toISOString(),
        tips,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600'
        }
      });
    }

    const fallbackTips = getFallbackTips();
    return new Response(JSON.stringify({
      success: true,
      source: 'fallback',
      count: fallbackTips.length,
      updatedAt: new Date().toISOString(),
      tips: fallbackTips,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching tips:', error);
    const fallbackTips = getFallbackTips();
    return new Response(JSON.stringify({
      success: false,
      source: 'fallback_error',
      count: fallbackTips.length,
      updatedAt: new Date().toISOString(),
      tips: fallbackTips,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
