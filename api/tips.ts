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
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
}

function confidenceFromOdds(odds: number): number {
  // Higher odds = lower confidence, lower odds = higher confidence
  if (odds <= 1.30) return 85;
  if (odds <= 1.50) return 80;
  if (odds <= 1.70) return 75;
  if (odds <= 2.00) return 70;
  if (odds <= 2.50) return 65;
  return 60;
}

function parseMarket(marketLine: string): { market: string; prediction: string } {
  const line = marketLine.trim();
  
  if (line.includes('BTTS') && line.includes('Over')) {
    return { market: 'Combinada', prediction: 'BTTS + Over 1.5' };
  }
  if (line.includes('BTTS') || line.includes('Ambas Marcam') || line.includes('Ambas as Equipas Marcam')) {
    return { market: 'Ambas Marcam', prediction: 'Ambas Marcam - Sim' };
  }
  if (line.match(/Over\s*2\.5/i)) {
    return { market: 'Mais de 2.5', prediction: 'Mais de 2.5 Golos' };
  }
  if (line.match(/Over\s*1\.5/i)) {
    return { market: 'Mais de 1.5', prediction: 'Mais de 1.5 Golos' };
  }
  if (line.match(/Over\s*0\.5.*(?:1ª|First|HT)/i)) {
    return { market: 'Golo 1ª Parte', prediction: 'Golo na 1ª Parte' };
  }
  if (line.match(/Over\s*0\.5/i)) {
    return { market: 'Golo 1ª Parte', prediction: 'Over 0.5 Golos 1ª Parte' };
  }
  if (line.match(/to\s*Win/i) || line.match(/Vitória/i)) {
    // Try to extract team name
    const teamMatch = line.match(/(.+?)\s*(?:to\s*Win|Vitória)/i);
    if (teamMatch) {
      return { market: 'Resultado Final', prediction: `Vitória ${teamMatch[1].trim()}` };
    }
    return { market: 'Resultado Final', prediction: 'Vitória Casa' };
  }
  if (line.includes('Double Chance') || line.includes('Dupla')) {
    return { market: 'Dupla Hipótese', prediction: 'Dupla Hipótese' };
  }
  
  return { market: 'Resultado Final', prediction: line };
}

function parseTipsFromHTML(html: string): Tip[] {
  const tips: Tip[] = [];

  // Extract all message text blocks
  const messageRegex = /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  const messages: string[] = [];
  let match;
  
  while ((match = messageRegex.exec(html)) !== null) {
    let text = match[1]
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
    messages.push(text);
  }

  // Process messages in reverse (newest first)
  for (const msg of messages.reverse()) {
    // Skip messages without BET
    if (!msg.includes('BET')) continue;

    // Extract title info for teams and league
    let defaultHomeTeam = '';
    let defaultAwayTeam = '';
    let defaultLeague = 'Champions League';
    let defaultTime = '20:00';

    // Title pattern: "TIPS Team1 vs Team2 — Competition"
    const titleMatch = msg.match(/TIPS\s+(.+?)\s*(?:vs|🆚)\s*(.+?)\s*(?:—|–|-)\s*(.+?)(?:\n|$)/i);
    if (titleMatch) {
      defaultHomeTeam = titleMatch[1].replace(/[⚽🎯🔥]/g, '').trim();
      defaultAwayTeam = titleMatch[2].trim();
      defaultLeague = titleMatch[3].trim();
    }

    // Also check for time in the announcement message before tips
    const timeMatch = msg.match(/(\d{1,2}):(\d{2})\s*BST/i);
    if (timeMatch) {
      defaultTime = `${timeMatch[1]}:${timeMatch[2]}`;
    }

    // Split by separator lines (━━━)
    const sections = msg.split(/━+/);

    for (const section of sections) {
      // Match BET line: "BET 169 | SINGLE" or "BET 172 | DOUBLE"
      const betMatch = section.match(/BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)/i);
      if (!betMatch) continue;

      const betNumber = betMatch[1];
      const betType = betMatch[2].toUpperCase();

      // Match odds: "Odd: @1.95" or "ODD: @1.95"
      const oddsMatch = section.match(/(?:Odd|ODD)\s*:?\s*@?([\d.]+)/i);
      const odds = oddsMatch ? parseFloat(oddsMatch[1]) : 1.50;

      // Match market line: "⚽ BTTS (Ambas Marcam) — Arsenal vs Atlético"
      // or "⚽ Over 1.5 Golos — Arsenal vs Atlético"
      // or "⚽ Arsenal to Win"
      const marketLineMatch = section.match(/⚽️?\s*(.+?)(?:\n|$)/);
      let marketLine = marketLineMatch ? marketLineMatch[1].trim() : '';

      // Extract teams from market line if present
      let homeTeam = defaultHomeTeam;
      let awayTeam = defaultAwayTeam;
      
      const teamsInLine = marketLine.match(/(?:—|–|-)\s*(.+?)\s*(?:vs|🆚)\s*(.+?)$/i);
      if (teamsInLine) {
        homeTeam = teamsInLine[1].trim();
        awayTeam = teamsInLine[2].trim();
        // Remove teams part from market line
        marketLine = marketLine.replace(/\s*(?:—|–|-)\s*.+$/, '').trim();
      }

      // Also check for individual tip format: "🏟️ Team1 vs Team2"
      const altTeamsMatch = section.match(/🏟️\s*(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i);
      if (altTeamsMatch) {
        homeTeam = altTeamsMatch[1].trim();
        awayTeam = altTeamsMatch[2].trim();
      }

      // Check for MERCADO line (alternative format)
      const mercadoMatch = section.match(/(?:MERCADO|📊\s*MERCADO)\s*:?\s*(.+?)(?:\n|$)/i);
      if (mercadoMatch && !marketLine) {
        marketLine = mercadoMatch[1].trim();
      }

      // Check for time in individual tip
      const tipTimeMatch = section.match(/🕒\s*(\d{1,2}):(\d{2})\s*BST/i);
      const time = tipTimeMatch ? `${tipTimeMatch[1]}:${tipTimeMatch[2]}` : defaultTime;

      // Check for league in individual tip
      const tipLeagueMatch = section.match(/(?:TIP\s*#\d+\s*\|\s*\w+\s*\|\s*)(.+?)(?:\n|$)/i);
      const league = tipLeagueMatch ? tipLeagueMatch[1].trim() : defaultLeague;

      // Parse the market
      const { market, prediction } = parseMarket(marketLine);

      // Determine confidence
      const confidence = confidenceFromOdds(odds);

      // Determine winner
      let winner = '';
      if (prediction.includes('Vitória') || prediction.includes('Win')) {
        if (prediction.includes('Casa') || prediction.includes(homeTeam)) {
          winner = homeTeam;
        } else if (prediction.includes('Fora') || prediction.includes(awayTeam)) {
          winner = awayTeam;
        } else {
          // Check if team name is in prediction
          const teamInPred = prediction.match(/Vitória\s+(.+)/i);
          if (teamInPred) winner = teamInPred[1].trim();
        }
      }

      if (homeTeam && awayTeam) {
        const today = new Date();
        tips.push({
          id: parseInt(betNumber) || tips.length + 1,
          betNumber,
          betType,
          league: league.replace(/UCL/i, 'UEFA Champions League').replace(/SEMI-FINAL/i, '').trim() || 'UEFA Champions League',
          homeTeam,
          awayTeam,
          date: today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
          time,
          prediction,
          confidence,
          odds,
          market,
          winner,
          homePercent: winner === homeTeam ? 50 : 40,
          drawPercent: 25,
          awayPercent: winner === awayTeam ? 50 : 30,
        });
      }
    }

    // If we found tips in this message, stop (we only want the latest tips)
    if (tips.length > 0) break;
  }

  // Also check for individual TIP format (older messages)
  if (tips.length === 0) {
    for (const msg of messages) {
      const tipMatch = msg.match(/TIP\s*#(\d+)\s*\|\s*(SINGLE|DOUBLE)\s*\|\s*(.+?)(?:\n|$)/i);
      if (!tipMatch) continue;

      const betNumber = tipMatch[1];
      const betType = tipMatch[2].toUpperCase();
      const league = tipMatch[3].trim();

      const teamsMatch = msg.match(/🏟️\s*(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i);
      const oddsMatch = msg.match(/(?:ODD|Odd)\s*:?\s*@?([\d.]+)/i);
      const mercadoMatch = msg.match(/(?:MERCADO|📊\s*MERCADO)\s*:?\s*(.+?)(?:\n|$)/i);
      const timeMatch = msg.match(/🕒\s*(\d{1,2}):(\d{2})\s*BST/i);

      if (teamsMatch && oddsMatch) {
        const marketLine = mercadoMatch ? mercadoMatch[1].trim() : '';
        const { market, prediction } = parseMarket(marketLine);
        const odds = parseFloat(oddsMatch[1]);
        const today = new Date();

        tips.push({
          id: parseInt(betNumber),
          betNumber,
          betType,
          league,
          homeTeam: teamsMatch[1].trim(),
          awayTeam: teamsMatch[2].trim(),
          date: today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
          time: timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '20:00',
          prediction,
          confidence: confidenceFromOdds(odds),
          odds,
          market,
          winner: '',
          homePercent: 40,
          drawPercent: 30,
          awayPercent: 30,
        });
      }
    }
  }

  return tips;
}

// Fallback tips
function getFallbackTips(): Tip[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  
  return [
    {
      id: 169,
      betNumber: '169',
      betType: 'SINGLE',
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 70,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    {
      id: 170,
      betNumber: '170',
      betType: 'SINGLE',
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 80,
      odds: 1.45,
      market: 'Mais de 1.5',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    {
      id: 171,
      betNumber: '171',
      betType: 'SINGLE',
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Arsenal',
      confidence: 75,
      odds: 1.70,
      market: 'Resultado Final',
      winner: 'Arsenal',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
    },
    {
      id: 172,
      betNumber: '172',
      betType: 'DOUBLE',
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'BTTS + Over 1.5',
      confidence: 65,
      odds: 2.83,
      market: 'Combinada',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
  ];
}

export default async function handler(request: Request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
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
