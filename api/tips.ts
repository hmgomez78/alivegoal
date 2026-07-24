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
  const dateStr = '24/07/2026';

  return [
    // ===== ST. PATRICK'S vs DUNDALK =====
    {
      id: 6001,
      betNumber: '6001',
      betType: 'SINGLE',
      league: 'Irish Premier Division',
      homeTeam: "St Patrick's",
      awayTeam: 'Dundalk',
      date: dateStr,
      time: '20:00',
      prediction: "Vitória St Patrick's",
      confidence: 65,
      odds: 1.59,
      market: 'Resultado Final',
      winner: "St Patrick's",
      analysis: "🟢 Vitória St Patrick's @1.59 — O mercado atribui favoritismo claro à equipa da casa na receção ao Dundalk. O St Patrick's apresenta um registo caseiro mais sólido e os indicadores estatísticos sustentam a cotação oferecida pelas casas de referência para um triunfo nos 90 minutos.",
      homePercent: 62,
      drawPercent: 21,
      awayPercent: 17,
    },
    // ===== VIBORG vs OB =====
    {
      id: 6002,
      betNumber: '6002',
      betType: 'SINGLE',
      league: 'Danish Superligaen',
      homeTeam: 'Viborg',
      awayTeam: 'OB',
      date: dateStr,
      time: '18:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 70,
      odds: 1.57,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ Ambas Marcam @1.57 — O histórico de confrontos entre Viborg e OB aponta para golos em ambas as balizas, uma tendência que se verificou nos últimos seis encontros diretos. A vocação ofensiva e as fragilidades defensivas documentadas de ambos os lados justificam esta perspetiva.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== VÄSTERÅS vs ÖRGRYTE =====
    {
      id: 6003,
      betNumber: '6003',
      betType: 'SINGLE',
      league: 'Swedish Allsvenskan',
      homeTeam: 'Västerås SK',
      awayTeam: 'Örgryte IS',
      date: dateStr,
      time: '18:00',
      prediction: 'Menos de 3.5 Golos',
      confidence: 75,
      odds: 1.58,
      market: 'Total Golos',
      winner: '',
      analysis: '🛡️ Menos de 3.5 Golos @1.58 — O histórico recente entre estas equipas tem sido marcado pelo rigor defensivo e placares curtos. Os últimos seis embates terminaram abaixo dos 2.5 golos, tornando a margem de 3.5 uma opção estatisticamente suportada pelas tendências das duas formações.',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
    },
    // ===== POGOŃ SZCZECIN vs LEGIA WARSZAWA =====
    {
      id: 6004,
      betNumber: '6004',
      betType: 'SINGLE',
      league: 'Polish Ekstraklasa',
      homeTeam: 'Pogoń Szczecin',
      awayTeam: 'Legia Warszawa',
      date: dateStr,
      time: '19:30',
      prediction: 'Menos de 2.5 Golos',
      confidence: 68,
      odds: 1.70,
      market: 'Total Golos',
      winner: '',
      analysis: '📉 Menos de 2.5 Golos @1.70 — Os últimos quatro confrontos entre Pogoń e Legia terminaram com dois golos ou menos e apenas uma equipa a faturar. Ambas as equipas iniciam a temporada com algumas indefinições ofensivas, sugerindo um jogo tático e de margens mínimas.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== GALATASARAY vs MONZA =====
    {
      id: 6005,
      betNumber: '6005',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Galatasaray',
      awayTeam: 'Monza',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Galatasaray',
      confidence: 60,
      odds: 1.38,
      market: 'Resultado Final',
      winner: 'Galatasaray',
      analysis: '🇹🇷 Vitória Galatasaray @1.38 — Num contexto de preparação onde a rotação é garantida, o Galatasaray apresenta um plantel com maior profundidade e experiência. O favoritismo nas cotações reflete o peso do campeão turco perante uma equipa italiana ainda a ajustar as suas peças.',
      homePercent: 72,
      drawPercent: 18,
      awayPercent: 10,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 6006,
      betNumber: '6006',
      betType: 'DOUBLE',
      league: 'Irish Premier & Amigáveis',
      homeTeam: "St Patrick's & Galatasaray",
      awayTeam: 'Opositores',
      date: dateStr,
      time: '19:00',
      prediction: "Vitória St Patrick's + Vitória Galatasaray",
      confidence: 55,
      odds: 2.19,
      market: 'Combinada',
      winner: '',
      analysis: "🔥 ACUMULADOR @2.19 — Combinamos o favoritismo caseiro do St Patrick's na liga irlandesa com a perspetiva de vitória do Galatasaray no seu amigável. A combinação dos dois cenários estatisticamente prováveis cria uma odd de valor para quem procura abordagens conjuntas.",
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
