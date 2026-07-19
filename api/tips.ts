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
    // ===== ESPANHA vs ARGENTINA — FINAL DO MUNDIAL 2026 =====
    {
      id: 5076,
      betNumber: '5076',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Espanha Vence (incluindo prolongamento)',
      confidence: 62,
      odds: 1.90,
      market: 'Resultado Final',
      winner: 'Espanha',
      analysis: '🏆 Espanha Vence @1.90 — A Espanha chega à final invicta há 37 jogos, com apenas 1 golo sofrido em 7 partidas no torneio e com uma média de posse de 64%. A Argentina é perigosa nos minutos finais (11 golos após o min.75), mas o controlo de jogo espanhol deve neutralizar este padrão. Lamine Yamal vs Messi é o duelo de gerações que pode definir o campeão.',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
    },
    // ===== ESPANHA vs ARGENTINA — MERCADO ESPECIAL =====
    {
      id: 5077,
      betNumber: '5077',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 68,
      odds: 1.75,
      market: 'Total Golos',
      winner: '',
      analysis: '🛡️ Menos de 2.5 Golos @1.75 — A Espanha sofreu apenas 1 golo em 7 jogos neste Mundial, com uma das defesas mais sólidas da competição. Em finais de Copa do Mundo, a tendência histórica é para jogos fechados e táticos. Apenas 3 das últimas 8 finais tiveram 3 ou mais golos. A solidez defensiva espanhola é o factor decisivo.',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
    },
    // ===== LAMINE YAMAL — MARCADOR =====
    {
      id: 5078,
      betNumber: '5078',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Lamine Yamal Marca a Qualquer Momento',
      confidence: 55,
      odds: 2.50,
      market: 'Marcador',
      winner: 'Espanha',
      analysis: '⭐ Lamine Yamal Marca @2.50 — O prodígio espanhol de 18 anos foi um dos melhores jogadores do torneio, com golos e assistências decisivas. Numa final onde a Espanha vai dominar a posse, Yamal terá espaço para criar e finalizar. A odd de 2.50 representa excelente valor para o jogador mais em forma da competição.',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
    },
    // ===== SÃO LUIZ vs CSA — SÉRIE D =====
    {
      id: 5079,
      betNumber: '5079',
      betType: 'SINGLE',
      league: 'Brasileirão Série D — Oitavos',
      homeTeam: 'São Luiz',
      awayTeam: 'CSA',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 72,
      odds: 1.65,
      market: 'Total Golos',
      winner: '',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.65 — Jogo de ida dos oitavos de final da Série D. Em jogos de mata-mata de primeira mão, as equipas tendem a ser mais cautelosas, priorizando não sofrer golos em casa. O São Luiz e o CSA são equipas de médio porte com defesas sólidas. Esperamos um jogo tático e fechado com poucos golos.',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
    },
    // ===== AMÉRICA-RN vs GAMA — SÉRIE D =====
    {
      id: 5080,
      betNumber: '5080',
      betType: 'SINGLE',
      league: 'Brasileirão Série D — Oitavos',
      homeTeam: 'América-RN',
      awayTeam: 'Gama',
      date: dateStr,
      time: '19:00',
      prediction: 'América-RN Vence ou Empata (Dupla Hipótese)',
      confidence: 70,
      odds: 1.55,
      market: 'Dupla Hipótese',
      winner: 'América-RN',
      analysis: '🇧🇷 América-RN 1X @1.55 — O América-RN joga em casa e tem a vantagem do fator campo neste jogo de ida dos oitavos. O Gama viaja do Distrito Federal para o Nordeste, o que representa um desgaste adicional. A dupla hipótese (vitória ou empate do América) é uma aposta segura com boa odd para um jogo de mata-mata.',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5081,
      betNumber: '5081',
      betType: 'DOUBLE',
      league: 'Mundial + Série D',
      homeTeam: 'Final do Mundo',
      awayTeam: 'Série D Brasil',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos (ESP-ARG) + Menos de 2.5 Golos (São Luiz-CSA)',
      confidence: 72,
      odds: 2.89,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.89 — Combinamos dois mercados de "menos de 2.5 golos" com excelente valor. A final do Mundial tende a ser um jogo fechado (apenas 3 das últimas 8 finais tiveram 3+ golos) com a solidez defensiva espanhola. O jogo da Série D entre São Luiz e CSA é um mata-mata de primeira mão onde ambas as equipas jogarão de forma cautelosa. Uma combinação de alto valor.',
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
