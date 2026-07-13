import { parseTipsFromHTML } from '../src/lib/telegramParser';

export interface BettingTip {
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
  winner: string;
  analysis?: string;
  homePercent?: number;
  drawPercent?: number;
  awayPercent?: number;
}

// Fallback data if Telegram fetch fails
function getFallbackTips(): BettingTip[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return [
    // ===== AMÉRICA-MG vs LONDRINA =====
    {
      id: 5040,
      betNumber: '5040',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'América-MG',
      awayTeam: 'Londrina',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória América-MG',
      confidence: 80,
      odds: 1.75,
      market: 'Resultado Final',
      winner: 'América-MG',
      analysis: '🇧🇷 Vitória América-MG @1.75 — O América-MG joga em casa no Estádio Independência e precisa de recuperar terreno na tabela. O Londrina tem tido dificuldades fora de portas. O fator casa deve ser decisivo.',
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 15,
    },
    // ===== CEARÁ vs ATHLETIC =====
    {
      id: 5041,
      betNumber: '5041',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Ceará',
      awayTeam: 'Athletic',
      date: dateStr,
      time: '20:30',
      prediction: 'Ambas Equipas Marcam',
      confidence: 75,
      odds: 1.90,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇧🇷 Ambas Marcam @1.90 — O Ceará no Castelão é sempre perigoso ofensivamente, mas tem mostrado lacunas defensivas. O Athletic é uma equipa aguerrida que costuma faturar mesmo fora. Cenário ideal para golos de ambos.',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
    },
    // ===== ITUANO vs FERROVIÁRIA =====
    {
      id: 5042,
      betNumber: '5042',
      betType: 'SINGLE',
      league: 'Brasileirão Série C',
      homeTeam: 'Ituano',
      awayTeam: 'Ferroviária',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 85,
      odds: 1.60,
      market: 'Golos',
      winner: '',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.60 — Clássico paulista na Série C, onde as equipas se conhecem bem. A Ferroviária tem uma das defesas mais sólidas da competição. Esperamos um jogo muito tático e de poucos golos no Novelli Júnior.',
      homePercent: 35,
      drawPercent: 40,
      awayPercent: 25,
    },
    // ===== TREZE vs CRAC =====
    {
      id: 5043,
      betNumber: '5043',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'Treze',
      awayTeam: 'CRAC',
      date: dateStr,
      time: '19:30',
      prediction: 'Vitória Treze',
      confidence: 70,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Treze',
      analysis: '🇧🇷 Vitória Treze @1.85 — Jogo decisivo da terceira fase da Série D. O Treze no Amigão é empurrado por uma claque fervorosa e precisa de se impor frente ao CRAC de Goiás. A força do fator casa é a nossa aposta.',
      homePercent: 55,
      drawPercent: 30,
      awayPercent: 15,
    },
    // ===== MEIAS-FINAIS MUNDIAL (Antecipação) =====
    {
      id: 5044,
      betNumber: '5044',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'França',
      awayTeam: 'Espanha',
      date: '14/07/2026',
      time: '20:00',
      prediction: 'Empate no Tempo Regulamentar',
      confidence: 65,
      odds: 3.10,
      market: 'Resultado Final (90 min)',
      winner: '',
      analysis: '🌍 Empate @3.10 — Antecipação para a meia-final de amanhã. Duas equipas de topo europeu, com a França mais pragmática e a Espanha de Pau Cubarsi focada na posse de bola. Um jogo que pode muito bem ir a prolongamento.',
      homePercent: 35,
      drawPercent: 35,
      awayPercent: 30,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5045,
      betNumber: '5045',
      betType: 'DOUBLE',
      league: 'Múltipla Brasileirão',
      homeTeam: 'América-MG/Londrina + Ituano/Ferroviária',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória América-MG + Menos 2.5 Golos (Ituano)',
      confidence: 80,
      odds: 2.80,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.80 — Combinamos a necessidade de vitória do América-MG em casa com a solidez defensiva esperada no duelo paulista da Série C entre Ituano e Ferroviária. Excelente valor para hoje.',
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
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
