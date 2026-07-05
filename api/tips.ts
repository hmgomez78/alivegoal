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

// Fallback tips — 04/07/2026 — Oitavos de Final (Canadá vs Marrocos, Paraguai vs França)
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  return [
    // ===== OITAVOS DE FINAL: BRASIL vs NORUEGA — AMBAS MARCAM =====
    {
      id: 3001,
      betNumber: '3001',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Brasil',
      awayTeam: 'Noruega',
      date: dateStr,
      time: '22:00',
      prediction: 'Ambas as Equipas Marcam',
      confidence: 78,
      odds: 1.85,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ Brasil vs Noruega — Ambas Marcam @1.85 — O Brasil tem um ataque devastador com Vini Jr., Rayan e Rodrygo, mas a defesa mostrou fragilidades contra o Japão. A Noruega tem Haaland, que marcou 6 golos contra Gabriel em 11 confrontos pela Premier League. A Noruega marcou em 4 dos últimos 5 jogos internacionais e o Brasil sofreu golos em 3 dos últimos 4. Com dois ataques de qualidade e defesas que podem ser exploradas, Ambas Marcam é a aposta de maior valor neste jogo. Odd de 1.85 oferece excelente retorno para uma probabilidade real de ~65%.',
      homePercent: 54,
      drawPercent: 23,
      awayPercent: 23,
    },
    // ===== OITAVOS DE FINAL: BRASIL vs NORUEGA — MAIS DE 2.5 GOLOS =====
    {
      id: 3002,
      betNumber: '3002',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Brasil',
      awayTeam: 'Noruega',
      date: dateStr,
      time: '22:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 72,
      odds: 1.90,
      market: 'Mais/Menos Golos',
      winner: '',
      analysis: '⚽ Brasil vs Noruega — Mais de 2.5 Golos @1.90 — Em 4 dos últimos 5 jogos do Brasil no Mundial 2026, o total de golos foi Over 2.5. A Noruega tem Haaland como máquina de golos e o Brasil tem um ataque de nível mundial. Os especialistas do Yahoo Sports e BetMGM apontam para um jogo com golos de ambos os lados. A Noruega tem um registo histórico notável contra o Brasil e vai criar oportunidades. Com dois ataques de elite e defesas que podem ser exploradas, Over 2.5 é uma aposta sólida a uma odd atrativa.',
      homePercent: 54,
      drawPercent: 23,
      awayPercent: 23,
    },
    // ===== OITAVOS DE FINAL: MÉXICO vs INGLATERRA — DUPLA HIPÓTESE INGLATERRA =====
    {
      id: 3003,
      betNumber: '3003',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'México',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '02:00',
      prediction: 'Dupla Hipótese — Empate ou Inglaterra',
      confidence: 74,
      odds: 1.55,
      market: 'Dupla Hipótese',
      winner: 'Inglaterra',
      analysis: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 México vs Inglaterra — Dupla Hipótese (Empate ou Inglaterra) @1.55 — A Inglaterra é favorita (+125) com 42.6% de probabilidade de vitória segundo o Dimers. O México joga em casa na Cidade do México com vantagem de altitude, mas a qualidade individual inglesa é superior. Kane marcou 5 golos em 4 jogos neste Mundial. A Inglaterra tem a melhor defesa do torneio europeu. A Dupla Hipótese protege contra a surpresa da altitude mexicana enquanto mantém o retorno. Uma aposta segura com odd atrativa.',
      homePercent: 28,
      drawPercent: 30,
      awayPercent: 42,
    },
    // ===== OITAVOS DE FINAL: MÉXICO vs INGLATERRA — KANE MARCA =====
    {
      id: 3004,
      betNumber: '3004',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'México',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '02:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 75,
      odds: 1.75,
      market: 'Mais/Menos Golos',
      winner: '',
      analysis: '⚽ México vs Inglaterra — Mais de 1.5 Golos @1.75 — O México marcou pelo menos 2 golos em 3 dos últimos 4 jogos do Mundial. A Inglaterra tem Kane em grande forma (5 golos em 4 jogos) e Saka, Bellingham e Foden como criadores. Mesmo com a altitude da Cidade do México a dificultar o ritmo, a qualidade ofensiva de ambas as equipas deve produzir pelo menos 2 golos. Em 7 dos últimos 10 jogos da Inglaterra, o total foi Over 1.5. Uma aposta de alta probabilidade a uma odd razoável.',
      homePercent: 28,
      drawPercent: 30,
      awayPercent: 42,
    },
    // ===== BRASIL vs NORUEGA — BRASIL VENCE =====
    {
      id: 3005,
      betNumber: '3005',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Brasil',
      awayTeam: 'Noruega',
      date: dateStr,
      time: '22:00',
      prediction: 'Brasil Vence',
      confidence: 70,
      odds: 2.05,
      market: 'Resultado Final',
      winner: 'Brasil',
      analysis: '🇧🇷 Brasil Vence vs Noruega @2.05 — O Brasil é ligeiro favorito (-115 no moneyline americano, equivalente a ~1.87 europeu) mas a odd de 2.05 oferece valor. O Brasil tem Vini Jr., Rayan e Rodrygo em grande forma e o apoio de 80% dos adeptos no MetLife Stadium. A Noruega tem Haaland mas o resto do ataque é limitado. O Brasil venceu os últimos 3 jogos do torneio e tem a melhor média de posse de bola. Com o apoio do público e a qualidade individual, o Brasil deve avançar para os quartos. Uma aposta de valor a uma odd superior ao esperado.',
      homePercent: 54,
      drawPercent: 23,
      awayPercent: 23,
    },
    // ===== ACUMULADOR DO DIA =====
    {
      id: 3006,
      betNumber: '3006',
      betType: 'DOUBLE',
      league: 'Acumulador Mundial 2026 — Oitavos de Final',
      homeTeam: 'Múltiplos',
      awayTeam: 'Jogos',
      date: dateStr,
      time: '22:00',
      prediction: 'Ambas Marcam (Brasil/Noruega) + Dupla Hipótese Inglaterra (México/Inglaterra)',
      confidence: 76,
      odds: 2.87,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA 🔥

1️⃣ Brasil vs Noruega — Ambas Marcam @1.85
2️⃣ México vs Inglaterra — Dupla Hipótese (Empate ou Inglaterra) @1.55

Odd Total: @2.87 💰

Haaland é uma ameaça constante para a defesa brasileira e o Brasil tem um ataque de nível mundial — Ambas Marcam é altamente provável. A Inglaterra é favorita contra o México e a Dupla Hipótese protege contra a surpresa da altitude. Dois resultados muito prováveis combinados num acumulador com retorno de quase 3x. A melhor aposta do dia!',
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
