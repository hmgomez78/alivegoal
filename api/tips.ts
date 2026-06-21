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
  const todayStr = today.toISOString().split('T')[0]; // e.g. "2026-06-21"

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

// Fallback tips — 21/06/2026 — Dia 11 do Mundial 2026
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  return [
    // ===== MUNDIAL 2026 GRUPO H: ESPANHA vs ARÁBIA SAUDITA =====
    {
      id: 972,
      betNumber: '972',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo H',
      homeTeam: 'Espanha',
      awayTeam: 'Arábia Saudita',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Espanha',
      confidence: 85,
      odds: 1.35,
      market: 'Resultado Final',
      winner: 'Espanha',
      analysis: '🇪🇸 Espanha Vitória @1.35 — A Espanha desiludiu no primeiro jogo com um empate (0-0) frente a Cabo Verde. A equipa de Luis de la Fuente tem agora a obrigação de vencer para não complicar as contas. A Arábia Saudita empatou com o Uruguai e mostrou ser uma equipa organizada, mas a qualidade técnica de jogadores como Lamine Yamal e Pedri deverá fazer a diferença. A Espanha dominará a posse de bola e, com maior eficácia, garantirá os 3 pontos.',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    // ===== MUNDIAL 2026 GRUPO G: BÉLGICA vs IRÃO =====
    {
      id: 973,
      betNumber: '973',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo G',
      homeTeam: 'Bélgica',
      awayTeam: 'Irão',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Bélgica',
      confidence: 80,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Bélgica',
      analysis: '🇧🇪 Bélgica Vitória @1.55 — Após um empate frustrante (1-1) com o Egito, a Bélgica de Tedesco precisa de dar uma resposta. O Irão vem de um empate a 2-2 com a Nova Zelândia e demonstrou debilidades defensivas que Kevin De Bruyne e Lukaku podem explorar. A superioridade individual dos belgas é evidente e este é um jogo de "tudo ou nada" para as aspirações belgas no torneio.',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
    },
    // ===== MUNDIAL 2026 GRUPO H: URUGUAI vs CABO VERDE =====
    {
      id: 974,
      betNumber: '974',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo H',
      homeTeam: 'Uruguai',
      awayTeam: 'Cabo Verde',
      date: dateStr,
      time: '23:00',
      prediction: 'Vitória Uruguai',
      confidence: 78,
      odds: 1.60,
      market: 'Resultado Final',
      winner: 'Uruguai',
      analysis: '🇺🇾 Uruguai Vitória @1.60 — O Uruguai de Marcelo Bielsa desiludiu no empate com a Arábia Saudita e enfrenta agora a grande surpresa do grupo, Cabo Verde, que travou a Espanha. A "garra charrúa" e a intensidade de Valverde e Darwin Núñez no meio-campo serão fundamentais. Apesar de Cabo Verde estar motivado, a experiência uruguaia em grandes palcos deverá prevalecer num jogo muito físico.',
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 15,
    },
    // ===== MUNDIAL 2026 GRUPO G: NOVA ZELÂNDIA vs EGITO =====
    {
      id: 975,
      betNumber: '975',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo G',
      homeTeam: 'Nova Zelândia',
      awayTeam: 'Egito',
      date: dateStr,
      time: '02:00',
      prediction: 'Ambas as Equipas Marcam',
      confidence: 72,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇳🇿🇪🇬 Ambas Marcam @1.95 — O Egito de Salah surpreendeu a Bélgica (1-1) e a Nova Zelândia esteve num jogo aberto com o Irão (2-2). O Egito é ligeiramente favorito, mas a Nova Zelândia tem mostrado capacidade para ferir defesas contrárias. Com ambas as equipas a precisarem de vencer para sonhar com a qualificação, perspetiva-se um jogo aberto e com golos de parte a parte.',
      homePercent: 30,
      drawPercent: 30,
      awayPercent: 40,
    },
    // ===== MUNDIAL 2026 GRUPO H: ESPANHA — OVER 2.5 =====
    {
      id: 976,
      betNumber: '976',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Grupo H',
      homeTeam: 'Espanha',
      awayTeam: 'Arábia Saudita',
      date: dateStr,
      time: '17:00',
      prediction: 'Over 2.5 Golos',
      confidence: 75,
      odds: 1.80,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '⚽ Over 2.5 @1.80 — A Espanha não marcou no primeiro jogo e precisa de fazer golos para recuperar a confiança e a diferença de golos. A Arábia Saudita poderá não aguentar a pressão ofensiva constante de La Roja. Esperamos uma Espanha dominadora a tentar resolver o jogo cedo e a construir um resultado confortável.',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    // ===== ACUMULADOR (DOUBLE) — DIA 11 DO MUNDIAL =====
    {
      id: 977,
      betNumber: '977',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'Espanha + Bélgica',
      awayTeam: 'Dupla Vitória',
      date: dateStr,
      time: 'Vários',
      prediction: 'Vitória Espanha + Vitória Bélgica',
      confidence: 82,
      odds: 2.09,
      market: 'Acumulador',
      winner: '',
      analysis: '💰 ACUMULADOR DO DIA @2.09 — Combinamos as duas potências europeias que escorregaram na primeira jornada. A Espanha (@1.35) tem obrigação de vencer a Arábia Saudita e a Bélgica (@1.55) não pode falhar frente ao Irão. Ambas as equipas têm plantéis vastamente superiores aos seus adversários e a necessidade imperiosa de vitória garante que entrarão com máxima intensidade. Uma dupla com odd superior a 2.00 de enorme valor.',
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
