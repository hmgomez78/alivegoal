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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-07-02"

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

// Fallback tips — 02/07/2026 — 16 Avos de Final (Espanha, Portugal, Suíça)
function getFallbackTips(): Tip[] {
  const dateStr = '02/07/2026';
  return [
    // ===== 16 AVOS DE FINAL: ESPANHA vs ÁUSTRIA =====
    {
      id: 2001,
      betNumber: '2001',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — 16 Avos de Final',
      homeTeam: 'Espanha',
      awayTeam: 'Áustria',
      date: dateStr,
      time: '20:00',
      prediction: 'Espanha Vence',
      confidence: 87,
      odds: 1.40,
      market: 'Resultado Final',
      winner: 'Espanha',
      analysis: '🇪🇸 Espanha vs Áustria 🇦🇹 Vitória Espanha @1.40 — A Espanha de Lamine Yamal e Pedri é uma das equipas mais dominantes do torneio, com 3 jogos sem sofrer golos na fase de grupos. O seu estilo de posse de bola (65%+ de posse média) é demasiado para qualquer adversário. A Áustria surpreendeu ao qualificar-se com um golo no último minuto contra a Argélia, mas a diferença de qualidade é enorme. Espanha venceu os últimos 4 confrontos com a Áustria. Uma vitória espanhola é o resultado mais seguro do dia.',
      homePercent: 72,
      drawPercent: 17,
      awayPercent: 11,
    },
    // ===== 16 AVOS DE FINAL: PORTUGAL vs CROÁCIA =====
    {
      id: 2002,
      betNumber: '2002',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — 16 Avos de Final',
      homeTeam: 'Portugal',
      awayTeam: 'Croácia',
      date: dateStr,
      time: '00:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 74,
      odds: 1.95,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🇵🇹 Portugal vs Croácia 🇭🇷 Mais de 2.5 Golos @1.95 — Portugal tem um ataque devastador com Cristiano Ronaldo (já marcou em 6 Mundiais consecutivos) e Bruno Fernandes. A Croácia de Modric prefere jogar em transição mas tem capacidade ofensiva com Kramarić e Pašalić. Os últimos 3 confrontos entre estas equipas produziram pelo menos 3 golos. Portugal marcou em todos os jogos do torneio. Esperamos um jogo aberto e emocionante com golos de ambos os lados neste duelo épico de lendas.',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
    },
    // ===== 16 AVOS DE FINAL: SUÍÇA vs ARGÉLIA =====
    {
      id: 2003,
      betNumber: '2003',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — 16 Avos de Final',
      homeTeam: 'Suíça',
      awayTeam: 'Argélia',
      date: dateStr,
      time: '04:00',
      prediction: 'Suíça Vence ou Empate',
      confidence: 76,
      odds: 1.55,
      market: 'Dupla Hipótese',
      winner: '',
      analysis: '🇨🇭 Suíça vs Argélia 🇩🇿 Dupla Hipótese Suíça @1.55 — A Suíça ganhou o seu grupo pela primeira vez desde 2006 e tem o jovem Johan Manzambi (20 anos) em grande forma com 3 golos no torneio. A Argélia de Riyad Mahrez qualificou-se como terceiro classificado e tem capacidade para surpreender. No entanto, a Suíça tem uma defesa muito sólida e joga de forma organizada. A Dupla Hipótese Suíça (vitória ou empate) oferece excelente valor a @1.55.',
      homePercent: 52,
      drawPercent: 24,
      awayPercent: 24,
    },
    // ===== ANÁLISE: ESPANHA — GOLO NA 1ª PARTE =====
    {
      id: 2004,
      betNumber: '2004',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — 16 Avos de Final',
      homeTeam: 'Espanha',
      awayTeam: 'Áustria',
      date: dateStr,
      time: '20:00',
      prediction: 'Golo na 1ª Parte',
      confidence: 78,
      odds: 1.65,
      market: 'Golo 1ª Parte',
      winner: '',
      analysis: '🇪🇸 Espanha vs Áustria — Golo na 1ª Parte @1.65 — A Espanha marcou na 1ª parte em todos os seus jogos na fase de grupos. Lamine Yamal e Pedri criam constantemente oportunidades desde o início. A Áustria tem tendência para sofrer golos cedo quando enfrenta equipas de qualidade superior. A pressão espanhola desde o apito inicial torna muito provável que haja pelo menos um golo antes do intervalo. Excelente valor para apostadores que querem uma alternativa ao resultado final.',
      homePercent: 72,
      drawPercent: 17,
      awayPercent: 11,
    },
    // ===== ANÁLISE: PORTUGAL — RONALDO MARCA =====
    {
      id: 2005,
      betNumber: '2005',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — 16 Avos de Final',
      homeTeam: 'Portugal',
      awayTeam: 'Croácia',
      date: dateStr,
      time: '00:00',
      prediction: 'Portugal Vence & Mais de 1.5 Golos',
      confidence: 70,
      odds: 2.10,
      market: 'Resultado & Golos',
      winner: 'Portugal',
      analysis: '🇵🇹 Portugal vs Croácia — Vitória Portugal & +1.5 Golos @2.10 — Portugal é favorito claro contra uma Croácia envelhecida. Ronaldo (41 anos) está motivado para deixar uma marca histórica no seu último Mundial. Bruno Fernandes, Bernardo Silva e Vitinha formam um trio criativo de enorme qualidade. A Croácia tem dificuldades defensivas e a sua geração dourada está no fim. Portugal venceu 4 dos últimos 5 confrontos com a Croácia. Uma vitória portuguesa com pelo menos 2 golos é o cenário mais provável.',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
    },
    // ===== ACUMULADOR DO DIA =====
    {
      id: 2006,
      betNumber: '2006',
      betType: 'DOUBLE',
      league: 'Acumulador Mundial 2026 — 16 Avos',
      homeTeam: 'Múltiplos',
      awayTeam: 'Jogos',
      date: dateStr,
      time: '20:00',
      prediction: 'Espanha Vence + Mais de 2.5 Golos em Portugal vs Croácia',
      confidence: 80,
      odds: 2.73,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA 🔥\n\n1️⃣ Espanha Vence vs Áustria @1.40\n2️⃣ Mais de 2.5 Golos em Portugal vs Croácia @1.95\n\nOdd Total: @2.73 💰\n\nA Espanha é a equipa mais dominante do torneio e não sofreu um único golo na fase de grupos. Uma vitória espanhola é quase certa. Portugal vs Croácia é o duelo das lendas — Ronaldo vs Modric — e ambas as equipas têm atacantes de qualidade. Os últimos confrontos entre estas seleções produziram sempre golos de ambos os lados. Dois resultados muito prováveis combinados num acumulador com excelente valor!',
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
