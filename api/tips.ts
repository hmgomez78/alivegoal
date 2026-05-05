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

function confidenceToPercent(conf: string): number {
  switch (conf.toUpperCase()) {
    case 'MUITO ALTA': return 85;
    case 'ALTA': return 75;
    case 'MÉDIA-ALTA': return 68;
    case 'MÉDIA': return 60;
    case 'BAIXA': return 45;
    default: return 70;
  }
}

function parseTipsFromHTML(html: string): Tip[] {
  const tips: Tip[] = [];

  // Remove HTML tags but keep structure via newlines
  const textBlocks: string[] = [];
  
  // Split by message blocks
  const messageRegex = /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  
  while ((match = messageRegex.exec(html)) !== null) {
    const rawText = match[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();
    
    if (rawText.includes('BET') || rawText.includes('Mercado') || rawText.includes('MERCADO')) {
      textBlocks.push(rawText);
    }
  }

  // Parse each message block for tips
  for (const block of textBlocks) {
    // Match BET number and type
    const betMatch = block.match(/BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)/i);
    if (!betMatch) continue;

    const betNumber = betMatch[1];
    const betType = betMatch[2].toUpperCase();

    // Match teams - various patterns
    let homeTeam = '';
    let awayTeam = '';
    
    // Pattern: ⚽ Team1 vs Team2 or Team1 🆚 Team2
    const teamsMatch = block.match(/(?:⚽|🏟️|🎯)\s*(.+?)\s*(?:vs|🆚|x)\s*(.+?)(?:\n|$)/i) 
      || block.match(/JOGO:\s*(.+?)\s*(?:vs|🆚|x)\s*(.+?)(?:\n|$)/i)
      || block.match(/(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i);
    
    if (teamsMatch) {
      homeTeam = teamsMatch[1].replace(/[⚽🏟️🎯]/g, '').trim();
      awayTeam = teamsMatch[2].trim();
    }

    // Match market/mercado
    let market = 'Resultado Final';
    const marketMatch = block.match(/(?:MERCADO|Mercado|📊)\s*:?\s*(.+?)(?:\n|$)/i);
    if (marketMatch) {
      market = marketMatch[1].trim();
    }

    // Translate market names
    if (market.includes('BTTS') || market.includes('Both Teams') || market.includes('Ambas Marcam') || market.includes('Ambas marcam')) {
      market = 'Ambas Marcam';
    } else if (market.match(/Over\s*2\.5/i) || market.includes('Mais de 2.5')) {
      market = 'Mais de 2.5';
    } else if (market.match(/Over\s*1\.5/i) || market.includes('Mais de 1.5')) {
      market = 'Mais de 1.5';
    } else if (market.match(/Over\s*0\.5.*(?:HT|1st|First|1ª)/i)) {
      market = 'Golo 1ª Parte';
    } else if (market.includes('Win') || market.includes('Vitória') || market.includes('to win')) {
      market = 'Resultado Final';
    } else if (market.includes('Double Chance') || market.includes('Dupla')) {
      market = 'Dupla Hipótese';
    }

    // Check for combined/double bets
    if (betType === 'DOUBLE' && market === 'Resultado Final') {
      // Try to find combined market description
      if (block.includes('BTTS') && block.match(/Over/i)) {
        market = 'Combinada';
      }
    }

    // Match odds
    let odds = 1.50;
    const oddsMatch = block.match(/(?:ODD|Odd|💰)\s*:?\s*@?([\d.]+)/i);
    if (oddsMatch) {
      odds = parseFloat(oddsMatch[1]);
    }

    // Match confidence
    let confidence = 70;
    const confMatch = block.match(/(?:CONFIANÇA|Confiança|📈)\s*:?\s*(MUITO ALTA|ALTA|MÉDIA-ALTA|MÉDIA|BAIXA)/i);
    if (confMatch) {
      confidence = confidenceToPercent(confMatch[1]);
    }

    // Match league
    let league = 'Champions League';
    const leagueMatch = block.match(/(?:LIGA|Liga|🏆)\s*:?\s*(.+?)(?:\n|$)/i)
      || block.match(/(UEFA\s+Champions\s+League|Premier\s+League|La\s+Liga|Serie\s+A|Bundesliga|Ligue\s+1|Liga\s+Portugal|Moçambola|Europa\s+League|Brasileirão|CONMEBOL\s+Libertadores)/i);
    if (leagueMatch) {
      league = leagueMatch[1].trim();
    }

    // Match time
    let time = '20:00';
    const timeMatch = block.match(/(?:HORA|Hora|⏰|🕐)\s*:?\s*(\d{1,2}):(\d{2})\s*(?:BST|GMT|CET)?/i)
      || block.match(/(\d{1,2}):(\d{2})\s*(?:BST|GMT|CET)/i);
    if (timeMatch) {
      time = `${timeMatch[1]}:${timeMatch[2]}`;
    }

    // Match prediction text
    let prediction = market;
    const predMatch = block.match(/(?:APOSTA|Aposta|TIP|Tip|🎯)\s*:?\s*(.+?)(?:\n|$)/i);
    if (predMatch) {
      prediction = predMatch[1].trim();
    } else {
      // Use market as prediction
      if (market === 'Ambas Marcam') prediction = 'Ambas Marcam - Sim';
      else if (market === 'Mais de 2.5') prediction = 'Mais de 2.5 Golos';
      else if (market === 'Mais de 1.5') prediction = 'Mais de 1.5 Golos';
      else if (market === 'Resultado Final') {
        // Try to determine winner
        const winnerMatch = block.match(/(?:Vitória|Win)\s*(Casa|Home|Fora|Away|.+?)(?:\n|$)/i);
        if (winnerMatch) {
          prediction = `Vitória ${winnerMatch[1].includes('Casa') || winnerMatch[1].includes('Home') ? 'Casa' : 'Fora'}`;
        } else {
          prediction = `Vitória Casa`;
        }
      }
    }

    // Determine winner
    let winner = '';
    if (prediction.includes('Casa') || prediction.includes('Home')) {
      winner = homeTeam;
    } else if (prediction.includes('Fora') || prediction.includes('Away')) {
      winner = awayTeam;
    }

    if (homeTeam && awayTeam) {
      tips.push({
        id: parseInt(betNumber) || tips.length + 1,
        betNumber,
        betType,
        league,
        homeTeam,
        awayTeam,
        date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
        time,
        prediction,
        confidence,
        odds,
        market,
        winner,
        homePercent: winner === homeTeam ? 50 : 35,
        drawPercent: 25,
        awayPercent: winner === awayTeam ? 50 : 25,
      });
    }
  }

  return tips;
}

// Fallback tips for today (updated manually or via scheduled task)
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
      confidence: 75,
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
      prediction: 'Vitória Casa',
      confidence: 70,
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
      confidence: 68,
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

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    // Fetch the public Telegram channel page
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

    // If parsing found no tips, use fallback
    const fallback = getFallbackTips();
    return new Response(JSON.stringify({
      success: true,
      source: 'fallback',
      count: fallback.length,
      updatedAt: new Date().toISOString(),
      tips: fallback,
    }), { status: 200, headers });

  } catch (error) {
    // On error, return fallback tips
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
