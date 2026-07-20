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
    // ===== FENERBAHCE vs GORNIK ZABRZE — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5082,
      betNumber: '5082',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Fenerbahce',
      awayTeam: 'Gornik Zabrze',
      date: dateStr,
      time: '19:00',
      prediction: 'Fenerbahce Vence e Mais de 1.5 Golos',
      confidence: 75,
      odds: 1.65,
      market: 'Resultado e Total de Golos',
      winner: 'Fenerbahce',
      analysis: '🇹🇷 Fenerbahce & Over 1.5 @1.65 — O Fenerbahce joga em casa, no inferno de Istambul, onde é historicamente muito forte. Com um plantel superior ao do Gornik Zabrze e a motivação de chegar à fase de grupos, a equipa turca deve vencer confortavelmente num jogo com golos.',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
    },
    // ===== STURM GRAZ vs HEARTS — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5083,
      betNumber: '5083',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Sturm Graz',
      awayTeam: 'Hearts',
      date: dateStr,
      time: '19:30',
      prediction: 'Sturm Graz Vence',
      confidence: 68,
      odds: 1.80,
      market: 'Resultado Final',
      winner: 'Sturm Graz',
      analysis: '🇦🇹 Sturm Graz Vence @1.80 — O Sturm Graz tem estado sólido nas competições europeias nas últimas épocas. A jogar em casa contra um Hearts que tem dificuldades fora da Escócia, os austríacos têm vantagem clara para garantir a vitória na primeira mão.',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    // ===== RANGERS vs MAN UNITED — AMIGÁVEL =====
    {
      id: 5084,
      betNumber: '5084',
      betType: 'SINGLE',
      league: 'Amigáveis de Clubes',
      homeTeam: 'Rangers',
      awayTeam: 'Man United',
      date: dateStr,
      time: '15:00',
      prediction: 'Ambas as Equipas Marcam (Sim)',
      confidence: 70,
      odds: 1.60,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ Ambas Marcam @1.60 — Jogos de pré-época são propícios a rotação de planteis e erros defensivos. O Man United tem poder de fogo, mas a defesa ainda se está a ajustar. O Rangers a jogar em casa num amigável de prestígio vai procurar marcar. Excelente valor para o mercado BTTS.',
      homePercent: 30,
      drawPercent: 25,
      awayPercent: 45,
    },
    // ===== ASTON VILLA vs ESPANYOL — AMIGÁVEL =====
    {
      id: 5085,
      betNumber: '5085',
      betType: 'SINGLE',
      league: 'Amigáveis de Clubes',
      homeTeam: 'Aston Villa',
      awayTeam: 'Espanyol',
      date: dateStr,
      time: '18:00',
      prediction: 'Aston Villa Vence',
      confidence: 65,
      odds: 1.75,
      market: 'Resultado Final',
      winner: 'Aston Villa',
      analysis: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Aston Villa Vence @1.75 — Apesar das vendas recentes (Rogers e Manzambi), o Aston Villa de Unai Emery continua com um plantel forte e taticamente evoluído. Num teste contra o Espanyol, a equipa da Premier League tem qualidade superior para sair com a vitória neste amigável.',
      homePercent: 52,
      drawPercent: 28,
      awayPercent: 20,
    },
    // ===== ARARAT ARMENIA vs SHAMROCK ROVERS — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5086,
      betNumber: '5086',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Ararat Armenia',
      awayTeam: 'Shamrock Rovers',
      date: dateStr,
      time: '17:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 72,
      odds: 1.55,
      market: 'Total Golos',
      winner: '',
      analysis: '🛡️ Menos de 2.5 Golos @1.55 — Um duelo equilibrado onde ambas as equipas vão privilegiar não sofrer golos na primeira mão. O Shamrock Rovers é conhecido pela sua organização defensiva, e o Ararat em casa tentará controlar o jogo sem correr grandes riscos.',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5087,
      betNumber: '5087',
      betType: 'DOUBLE',
      league: 'Liga dos Campeões Qualificação',
      homeTeam: 'Fenerbahce & Sturm Graz',
      awayTeam: 'Opositores',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Fenerbahce + Vitória Sturm Graz',
      confidence: 68,
      odds: 2.55,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.55 — Juntamos os dois favoritos claros nas qualificações da Liga dos Campeões a jogar em casa. O Fenerbahce tem a obrigação de vencer o Gornik Zabrze, e o Sturm Graz é superior ao Hearts. Uma dupla sólida para a noite europeia.',
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
