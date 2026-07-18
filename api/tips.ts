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
  // ... existing implementation ...
  return [];
}

export function getFallbackTips(): Tip[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return [
    // ===== FRANÇA vs INGLATERRA =====
    {
      id: 5070,
      betNumber: '5070',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'França',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '22:00',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 82,
      odds: 1.75,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🔥 Ambas Marcam @1.75 — Num jogo de atribuição do 3º lugar, as equipas costumam jogar de forma mais aberta e descontraída. Com o talento ofensivo de Mbappé e Bellingham em campo, esperamos golos de ambos os lados num jogo com pouca pressão defensiva.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== MAN UTD vs WREXHAM =====
    {
      id: 5071,
      betNumber: '5071',
      betType: 'SINGLE',
      league: 'Amigáveis de Clubes',
      homeTeam: 'Man Utd',
      awayTeam: 'Wrexham',
      date: dateStr,
      time: '16:00',
      prediction: 'Man Utd Vence e Mais de 2.5 Golos',
      confidence: 85,
      odds: 1.65,
      market: 'Resultado Final + Total Golos',
      winner: 'Man Utd',
      analysis: '⚽ Man Utd + Mais 2.5 Golos @1.65 — No primeiro jogo da pré-época, o Manchester United defronta o Wrexham. A diferença abismal de qualidade entre os plantéis, mesmo com os Red Devils a rodarem a equipa, deve resultar numa vitória confortável com vários golos.',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    // ===== AJAX vs OLYMPIAKOS =====
    {
      id: 5072,
      betNumber: '5072',
      betType: 'SINGLE',
      league: 'Amigáveis de Clubes',
      homeTeam: 'Ajax',
      awayTeam: 'Olympiakos',
      date: dateStr,
      time: '14:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 78,
      odds: 1.80,
      market: 'Total Golos',
      winner: '',
      analysis: '🇳🇱 Mais de 2.5 Golos @1.80 — O Ajax continua a sua preparação com o seu habitual estilo ofensivo que deixa muitos espaços na defesa. O Olympiakos tem qualidade para explorar essas debilidades. Prevemos um jogo muito aberto e com pelo menos 3 golos.',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    // ===== NACIONAL vs IGUATU =====
    {
      id: 5073,
      betNumber: '5073',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'Nacional',
      awayTeam: 'Iguatu',
      date: dateStr,
      time: '16:00',
      prediction: 'Nacional Vence',
      confidence: 80,
      odds: 1.95,
      market: 'Resultado Final',
      winner: 'Nacional',
      analysis: '🇧🇷 Nacional Vence @1.95 — No arranque dos oitavos de final da Série D, o fator casa é crucial. O Nacional tem sido muito forte no seu estádio e defronta um Iguatu que baixa bastante de rendimento fora de portas. Excelente odd para a vitória caseira.',
      homePercent: 55,
      drawPercent: 30,
      awayPercent: 15,
    },
    // ===== SÃO JOSÉ vs TREZE =====
    {
      id: 5074,
      betNumber: '5074',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'São José',
      awayTeam: 'Treze',
      date: dateStr,
      time: '16:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 75,
      odds: 1.60,
      market: 'Total Golos',
      winner: '',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.60 — Jogo da primeira mão dos oitavos de final da Série D. Esperamos uma partida muito tática e fechada, com ambas as equipas a não quererem cometer erros que comprometam a eliminatória logo no primeiro jogo.',
      homePercent: 35,
      drawPercent: 40,
      awayPercent: 25,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5075,
      betNumber: '5075',
      betType: 'DOUBLE',
      league: 'Mundial + Amigáveis',
      homeTeam: 'Golos no Mundial',
      awayTeam: 'Vitória do United',
      date: dateStr,
      time: '16:00',
      prediction: 'Ambas Marcam (FRA-ING) + Man Utd Vence',
      confidence: 80,
      odds: 2.27,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.27 — Combinamos a tendência histórica de golos para ambos os lados nos jogos de 3º lugar do Mundial com uma vitória natural do Manchester United no seu amigável contra o Wrexham. Uma aposta dupla de grande valor.',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
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
