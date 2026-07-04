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
  const dateStr = '04/07/2026';
  return [
    // ===== OITAVOS DE FINAL: CANADÁ vs MARROCOS =====
    {
      id: 2007,
      betNumber: '2007',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Canadá',
      awayTeam: 'Marrocos',
      date: dateStr,
      time: '19:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 74,
      odds: 1.75,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🇨🇦 Canadá vs Marrocos 🇲🇦 Under 2.5 Golos @1.75 — Este é um dos jogos mais equilibrados dos oitavos de final. Marrocos tem a melhor defesa do torneio (apenas 1 golo sofrido em 4 jogos) e é especialista em jogos de baixa pontuação. O Canadá eliminou a África do Sul por 1-0 e tem um estilo de jogo pragmático. Em 4 dos últimos 5 jogos de Marrocos em fases a eliminar, o total de golos foi Under 2.5. A probabilidade de um jogo fechado com poucos golos é muito alta. Excelente valor a @1.75.',
      homePercent: 38,
      drawPercent: 30,
      awayPercent: 32,
    },
    // ===== OITAVOS DE FINAL: CANADÁ vs MARROCOS — MARROCOS NÃO PERDE =====
    {
      id: 2008,
      betNumber: '2008',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Canadá',
      awayTeam: 'Marrocos',
      date: dateStr,
      time: '19:00',
      prediction: 'Dupla Hipótese - Marrocos ou Empate',
      confidence: 72,
      odds: 1.60,
      market: 'Dupla Hipótese',
      winner: 'Marrocos',
      analysis: '🇲🇦 Marrocos ou Empate vs Canadá @1.60 — Marrocos é uma das equipas mais sólidas do torneio. Eliminaram os Países Baixos nos penáltis após um empate 1-1. A sua defesa é excecional e Sofiane Boufal e Hakim Ziyech têm qualidade para decidir o jogo. O Canadá joga em casa (Houston) e tem o apoio do público, mas a qualidade técnica de Marrocos é superior. A dupla hipótese Marrocos ou Empate oferece segurança a uma odd atrativa. Marrocos não perdeu nenhum dos últimos 6 jogos internacionais.',
      homePercent: 38,
      drawPercent: 30,
      awayPercent: 32,
    },
    // ===== OITAVOS DE FINAL: PARAGUAI vs FRANÇA =====
    {
      id: 2009,
      betNumber: '2009',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Paraguai',
      awayTeam: 'França',
      date: dateStr,
      time: '23:00',
      prediction: 'França Vence',
      confidence: 80,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'França',
      analysis: '🇫🇷 França Vence vs Paraguai @1.55 — A França é uma das favoritas ao título e goleou a Suécia 3-0 na fase anterior. Mbappé, Griezmann e Dembélé formam um trio devastador. O Paraguai surpreendeu ao eliminar a Alemanha nos penáltis, mas a diferença de qualidade face à França é enorme. A França tem a melhor média de xG do torneio (2.8 por jogo) e Mbappé está em forma excepcional. O Paraguai vai defender em bloco baixo mas a qualidade francesa deve ser suficiente para vencer. A vitória da França é o resultado mais provável.',
      homePercent: 18,
      drawPercent: 22,
      awayPercent: 60,
    },
    // ===== OITAVOS DE FINAL: PARAGUAI vs FRANÇA — MAIS DE 1.5 GOLOS =====
    {
      id: 2010,
      betNumber: '2010',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Paraguai',
      awayTeam: 'França',
      date: dateStr,
      time: '23:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 82,
      odds: 1.45,
      market: 'Mais de 1.5',
      winner: '',
      analysis: '⚽ Paraguai vs França — Mais de 1.5 Golos @1.45 — A França marcou pelo menos 2 golos em 4 dos últimos 5 jogos internacionais. Mbappé está em grande forma e Griezmann é o melhor criador de jogo do torneio. Mesmo que o Paraguai defenda bem, a qualidade ofensiva francesa deve produzir pelo menos 2 golos. O Paraguai também precisa de marcar para avançar, o que torna o jogo mais aberto. Em 8 dos últimos 10 jogos da França, o total de golos foi Over 1.5. Uma aposta de alta confiança a uma odd segura.',
      homePercent: 18,
      drawPercent: 22,
      awayPercent: 60,
    },
    // ===== ANÁLISE: MBAPPÉ MARCA EM QUALQUER ALTURA =====
    {
      id: 2011,
      betNumber: '2011',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Oitavos de Final',
      homeTeam: 'Paraguai',
      awayTeam: 'França',
      date: dateStr,
      time: '23:00',
      prediction: 'França Vence & Mais de 1.5 Golos',
      confidence: 76,
      odds: 1.80,
      market: 'Combinada',
      winner: 'França',
      analysis: '🇫🇷 França Vence & Over 1.5 Golos @1.80 — A combinação de vitória francesa com pelo menos 2 golos no total oferece excelente valor. A França goleou a Suécia 3-0 e tem a melhor defesa do torneio europeu. O Paraguai vai defender mas não tem qualidade para manter um clean sheet contra Mbappé e Griezmann. A França marcou em todos os jogos do torneio e venceu os últimos 4 jogos internacionais. Esta combinada tem uma probabilidade implícita de 55% mas a odd real deveria ser mais baixa. Excelente valor para quem quer maximizar o retorno com segurança.',
      homePercent: 18,
      drawPercent: 22,
      awayPercent: 60,
    },
    // ===== ACUMULADOR DO DIA =====
    {
      id: 2012,
      betNumber: '2012',
      betType: 'DOUBLE',
      league: 'Acumulador Mundial 2026 — Oitavos de Final',
      homeTeam: 'Múltiplos',
      awayTeam: 'Jogos',
      date: dateStr,
      time: '19:00',
      prediction: 'França Vence + Under 2.5 (Canadá vs Marrocos)',
      confidence: 78,
      odds: 2.71,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA 🔥\n\n1️⃣ França Vence vs Paraguai @1.55\n2️⃣ Under 2.5 Golos — Canadá vs Marrocos @1.75\n\nOdd Total: @2.71 💰\n\nA França é uma das favoritas ao título e tem qualidade muito superior ao Paraguai. Uma vitória francesa é o resultado mais provável (60% de probabilidade). Marrocos tem a melhor defesa do torneio e os jogos com Marrocos tendem a ter poucos golos — Under 2.5 em 4 dos últimos 5 jogos de Marrocos em fases a eliminar. Dois resultados muito prováveis combinados num acumulador com retorno de quase 3x. A melhor aposta do dia!',
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
