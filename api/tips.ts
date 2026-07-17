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
    // ===== BAHIA vs CHAPECOENSE =====
    {
      id: 5060,
      betNumber: '5060',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Bahia',
      awayTeam: 'Chapecoense',
      date: dateStr,
      time: '23:30',
      prediction: 'Bahia Vence',
      confidence: 88,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Bahia',
      analysis: '🔥 Bahia Vence @1.55 — O Bahia joga em casa na Arena Fonte Nova e tem feito uma excelente campanha, estando no 6º lugar. A Chapecoense é o lanterna-vermelha (20º) e tem tido muitas dificuldades fora de casa. Vitória clara para os baianos.',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    // ===== FLUMINENSE vs MIRASSOL =====
    {
      id: 5061,
      betNumber: '5061',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Fluminense',
      awayTeam: 'Mirassol',
      date: dateStr,
      time: '23:30',
      prediction: 'Fluminense Vence e Mais de 1.5 Golos',
      confidence: 82,
      odds: 1.85,
      market: 'Resultado Final + Total Golos',
      winner: 'Fluminense',
      analysis: '⚽ Fluminense + Mais 1.5 Golos @1.85 — O Fluminense (3º classificado) é muito forte no Maracanã e defronta um Mirassol que luta na parte inferior da tabela (19º). O ataque do Flu deve conseguir marcar pelo menos 2 golos nesta partida.',
      homePercent: 65,
      drawPercent: 25,
      awayPercent: 10,
    },
    // ===== BOTAFOGO vs VITÓRIA =====
    {
      id: 5062,
      betNumber: '5062',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Botafogo',
      awayTeam: 'Vitória',
      date: dateStr,
      time: '23:30',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇧🇷 Ambas Marcam @1.95 — O Botafogo tem um bom ataque mas a sua defesa tem sido permeável (31 golos sofridos em 17 jogos). O Vitória também tem capacidade para marcar golos. Jogo aberto e com boas probabilidades de golos para ambos os lados.',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
    },
    // ===== SHAMROCK ROVERS vs CORK CITY =====
    {
      id: 5063,
      betNumber: '5063',
      betType: 'SINGLE',
      league: 'Irish FAI Cup',
      homeTeam: 'Shamrock Rovers',
      awayTeam: 'Cork City',
      date: dateStr,
      time: '19:45',
      prediction: 'Shamrock Rovers Vence',
      confidence: 85,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Shamrock Rovers',
      analysis: '🇮🇪 Shamrock Rovers Vence @1.45 — O Shamrock Rovers é uma das equipas mais fortes da Irlanda e joga em casa para a Taça FAI contra o Cork City. A diferença de qualidade e o fator casa devem ser determinantes para o apuramento.',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    // ===== YUNNAN YUKUN vs SHANGHAI PORT =====
    {
      id: 5064,
      betNumber: '5064',
      betType: 'SINGLE',
      league: 'Chinese Super League',
      homeTeam: 'Yunnan Yukun',
      awayTeam: 'Shanghai Port',
      date: dateStr,
      time: '13:00',
      prediction: 'Shanghai Port Vence',
      confidence: 80,
      odds: 1.65,
      market: 'Resultado Final',
      winner: 'Shanghai Port',
      analysis: '🇨🇳 Shanghai Port Vence @1.65 — O Shanghai Port é uma das equipas mais fortes do campeonato chinês e tem qualidade suficiente para vencer fora de casa contra o recém-promovido Yunnan Yukun. Excelente valor nesta odd.',
      homePercent: 20,
      drawPercent: 25,
      awayPercent: 55,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5065,
      betNumber: '5065',
      betType: 'DOUBLE',
      league: 'Brasileirão + FAI Cup',
      homeTeam: 'Bahia + Shamrock',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória do Bahia + Vitória do Shamrock Rovers',
      confidence: 85,
      odds: 2.24,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.24 — Combinamos os dois grandes favoritos do dia a jogar em casa. O Bahia contra o último classificado do Brasileirão e o Shamrock Rovers para a Taça da Irlanda. Uma dupla muito segura para hoje.',
      homePercent: 70,
      drawPercent: 0,
      awayPercent: 30,
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
