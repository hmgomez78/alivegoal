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
    // ===== SÃO BERNARDO vs CUIABÁ =====
    {
      id: 5032,
      betNumber: '5032',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'São Bernardo',
      awayTeam: 'Cuiabá',
      date: dateStr,
      time: '16:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 75,
      odds: 1.65,
      market: 'Golos',
      winner: '',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.65 — O São Bernardo procura estabilidade defensiva após a derrota recente. O Cuiabá vem de uma vitória magra (1-0) e costuma ser conservador fora de casa. Esperamos um jogo fechado e de poucos golos.',
      homePercent: 35,
      drawPercent: 40,
      awayPercent: 25,
    },
    // ===== ATLÉTICO-GO vs FORTALEZA =====
    {
      id: 5033,
      betNumber: '5033',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Atlético-GO',
      awayTeam: 'Fortaleza',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Fortaleza ou Empate (X2)',
      confidence: 80,
      odds: 1.55,
      market: 'Dupla Hipótese',
      winner: 'Fortaleza',
      analysis: '🇧🇷 X2 Fortaleza @1.55 — O Fortaleza chega moralizado após vitória e ocupa o G4. O Atlético-GO vem de pesada derrota por 3-0. A solidez do Leão do Pici torna-o favorito mesmo jogando fora.',
      homePercent: 25,
      drawPercent: 35,
      awayPercent: 40,
    },
    // ===== CRB vs GOIÁS =====
    {
      id: 5034,
      betNumber: '5034',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'CRB',
      awayTeam: 'Goiás',
      date: dateStr,
      time: '19:00',
      prediction: 'Ambas Equipas Marcam',
      confidence: 70,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🇧🇷 Ambas Marcam @1.95 — O CRB no Rei Pelé costuma ser ofensivo, mas a defesa tem vacilado. O Goiás tem qualidade no ataque para explorar esses espaços. Jogo propício para golos de ambos os lados.',
      homePercent: 40,
      drawPercent: 30,
      awayPercent: 30,
    },
    // ===== CRICIÚMA vs SPORT =====
    {
      id: 5035,
      betNumber: '5035',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Criciúma',
      awayTeam: 'Sport',
      date: dateStr,
      time: '16:00',
      prediction: 'Vitória Criciúma',
      confidence: 75,
      odds: 2.10,
      market: 'Resultado Final',
      winner: 'Criciúma',
      analysis: '🇧🇷 Vitória Criciúma @2.10 — O Criciúma lidera a Série B e é muito forte no Heriberto Hülse. O Sport está sólido, mas a força caseira do líder deverá prevalecer num jogo muito tático.',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    // ===== MEIAS-FINAIS MUNDIAL (Antecipação) =====
    {
      id: 5036,
      betNumber: '5036',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'Inglaterra',
      awayTeam: 'Argentina',
      date: '15/07/2026',
      time: '20:00',
      prediction: 'Inglaterra a Qualificar-se',
      confidence: 65,
      odds: 1.85,
      market: 'Qualificação',
      winner: 'Inglaterra',
      analysis: '🌍 Inglaterra a Qualificar-se @1.85 — Antecipação para a grande meia-final. O embalo da reviravolta contra a Noruega com Bellingham em destaque dá ligeiro favoritismo aos ingleses contra a Argentina de Messi.',
      homePercent: 55,
      drawPercent: 0,
      awayPercent: 45,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5037,
      betNumber: '5037',
      betType: 'DOUBLE',
      league: 'Brasileirão Série B',
      homeTeam: 'S. Bernardo/Cuiabá + Atl-GO/Fortaleza',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '16:00',
      prediction: 'Menos 2.5 Golos + Fortaleza X2',
      confidence: 75,
      odds: 2.55,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.55 — Combinamos o jogo fechado esperado no Primeiro de Maio com a solidez do Fortaleza no Antônio Accioly. Uma aposta dupla de excelente valor para o domingo de Série B.',
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
