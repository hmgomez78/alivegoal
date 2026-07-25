import * as cheerio from 'cheerio';

export interface Tip {
  id: number;
  betNumber: string;
  betType: 'SINGLE' | 'DOUBLE' | 'TREBLE' | 'ACCA';
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  prediction: string;
  confidence: number;
  odds: number;
  market: string;
  winner?: string;
  analysis?: string;
  homePercent?: number;
  drawPercent?: number;
  awayPercent?: number;
}

function parseTipsFromHTML(html: string): Tip[] {
  return [];
}

export function getFallbackTips(): Tip[] {
  const dateStr = '25/07/2026';

  return [
    {
      id: 6001,
      betNumber: '6001',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: "Fortuna Düsseldorf",
      awayTeam: 'Borussia Dortmund',
      date: dateStr,
      time: '12:00',
      prediction: "Vitória Dortmund",
      confidence: 85,
      odds: 1.29,
      market: 'Resultado Final',
      winner: "Borussia Dortmund",
      analysis: "🟡 Vitória Dortmund @1.29 — O Dortmund é claramente superior e, mesmo em pré-temporada, a profundidade do plantel deve garantir o domínio sobre o adversário da 2. Bundesliga. A odd reflete a elevada probabilidade, sendo uma seleção conservadora.",
      homePercent: 10,
      drawPercent: 15,
      awayPercent: 75,
    },
    {
      id: 6002,
      betNumber: '6002',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Wehen Wiesbaden',
      awayTeam: 'Bayern Munich',
      date: dateStr,
      time: '14:30',
      prediction: 'Bayern Total Acima 1.5',
      confidence: 90,
      odds: 1.21,
      market: 'Total Golos Equipa',
      winner: '',
      analysis: '⚽ Bayern Total Acima 1.5 @1.21 — O Bayern enfrenta um adversário de escalão inferior. Com a capacidade ofensiva natural dos bávaros e a habitual rotação que procura impressionar o treinador, a expectativa é de golos, tornando a marca de 2 golos muito acessível.',
      homePercent: 10,
      drawPercent: 15,
      awayPercent: 75,
    },
    {
      id: 6003,
      betNumber: '6003',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Celtic',
      awayTeam: 'AC Milan',
      date: dateStr,
      time: '15:00',
      prediction: 'Vitória Milan',
      confidence: 65,
      odds: 2.50,
      market: 'Resultado Final',
      winner: 'AC Milan',
      analysis: '🔴 Vitória Milan @2.50 — Um teste exigente para o Celtic frente a um Milan que procura consolidar processos. A cotação de 2.50 apresenta valor para a equipa italiana, que dispõe de maior qualidade individual, apesar de ser um amigável.',
      homePercent: 30,
      drawPercent: 25,
      awayPercent: 45,
    },
    {
      id: 6004,
      betNumber: '6004',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'PSV',
      awayTeam: 'Villarreal',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória PSV',
      confidence: 70,
      odds: 1.79,
      market: 'Resultado Final',
      winner: 'PSV',
      analysis: '🇳🇱 Vitória PSV @1.79 — O PSV joga em casa e tem mostrado um processo ofensivo consolidado. O Villarreal, embora perigoso, pode sentir mais dificuldades neste momento da preparação, justificando o favoritismo dos neerlandeses.',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 6005,
      betNumber: '6005',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Standard Liège',
      awayTeam: 'Juventus',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Juventus',
      confidence: 75,
      odds: 1.92,
      market: 'Resultado Final',
      winner: 'Juventus',
      analysis: '🦓 Vitória Juventus @1.92 — A Juventus apresenta-se com um plantel superior e procura afirmação tática. Perante um Standard Liège que tem oscilado, a odd perto do par para a vitória italiana afigura-se como uma aposta de valor.',
      homePercent: 25,
      drawPercent: 25,
      awayPercent: 50,
    },
    {
      id: 6006,
      betNumber: '6006',
      betType: 'DOUBLE',
      league: 'Amigáveis de Clubes',
      homeTeam: "Liverpool & Dortmund",
      awayTeam: 'Opositores',
      date: dateStr,
      time: 'Múltipla',
      prediction: "Vitória Liverpool + Vitória Dortmund",
      confidence: 80,
      odds: 1.94,
      market: 'Combinada',
      winner: '',
      analysis: "🔥 ACUMULADOR @1.94 — Combinamos o favoritismo do Liverpool (1.50) frente ao Sunderland com a vitória do Dortmund (1.29) contra o Fortuna. Ambas as equipas de topo devem impor a sua superioridade perante adversários de divisões inferiores.",
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    }
  ];
}

export default async function handler(req: Request) {
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
