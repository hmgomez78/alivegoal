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
    // ===== INGLATERRA vs ARGENTINA =====
    {
      id: 5052,
      betNumber: '5052',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'Inglaterra',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas Marcam',
      confidence: 80,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🌍 Ambas Marcam @1.95 — A segunda meia-final promete golos. A Inglaterra tem marcado consistentemente com Bellingham e Kane em grande forma. A Argentina de Scaloni tem talento ofensivo de sobra mas a defesa tem vacilado. Jogo aberto e com oportunidades para ambos os lados.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== NÁUTICO vs JUVENTUDE =====
    {
      id: 5053,
      betNumber: '5053',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Náutico',
      awayTeam: 'Juventude',
      date: dateStr,
      time: '20:30',
      prediction: 'Juventude Vence (Empate Anula Aposta)',
      confidence: 75,
      odds: 1.85,
      market: 'Empate Anula',
      winner: 'Juventude',
      analysis: '🇧🇷 Juventude DNB @1.85 — O Juventude tem feito uma campanha sólida na Série B e defronta um Náutico muito irregular. A proteção do Empate Anula Aposta (Draw No Bet) oferece valor numa partida onde os visitantes são ligeiramente favoritos.',
      homePercent: 30,
      drawPercent: 30,
      awayPercent: 40,
    },
    // ===== YPIRANGA-RS vs PAYSANDU =====
    {
      id: 5054,
      betNumber: '5054',
      betType: 'SINGLE',
      league: 'Brasileirão Série C',
      homeTeam: 'Ypiranga-RS',
      awayTeam: 'Paysandu',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 85,
      odds: 1.60,
      market: 'Menos de 2.5',
      winner: '',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.60 — Confronto matinal na Série C. O Ypiranga é forte em casa mas costuma protagonizar jogos de poucos golos. O Paysandu vai tentar controlar o ritmo e jogar no erro. Tendência clara para um jogo fechado.',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
    },
    // ===== SABAH FC vs THE NEW SAINTS =====
    {
      id: 5055,
      betNumber: '5055',
      betType: 'SINGLE',
      league: 'Qualificação Champions',
      homeTeam: 'Sabah FC',
      awayTeam: 'The New Saints',
      date: dateStr,
      time: '19:00',
      prediction: 'Sabah FC Vence (Handicap Asiático -1)',
      confidence: 80,
      odds: 1.75,
      market: 'Resultado Final',
      winner: 'Sabah FC',
      analysis: '🇪🇺 Sabah AH -1 @1.75 — Na qualificação para a Champions League, a equipa do Azerbaijão é amplamente superior ao campeão galês. A jogar em casa, o Sabah deve conseguir uma vitória confortável por mais de um golo de diferença.',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    // ===== AMÉRICA-RN vs TREM-AP (Análise de Resultado Recente) =====
    {
      id: 5056,
      betNumber: '5056',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'América-RN',
      awayTeam: 'Trem-AP',
      date: dateStr,
      time: '19:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 70,
      odds: 1.90,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🇧🇷 Mais de 2.5 Golos @1.90 — Com base nos últimos jogos do América-RN em casa, a equipa tem mostrado grande capacidade ofensiva mas também sofre golos. O Trem-AP precisa de arriscar, o que deve resultar num jogo com pelo menos 3 golos.',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5057,
      betNumber: '5057',
      betType: 'DOUBLE',
      league: 'Mundial + Champions',
      homeTeam: 'Inglaterra/Argentina + Sabah',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '19:00',
      prediction: 'Ambas Marcam (ING-ARG) + Sabah Vence',
      confidence: 85,
      odds: 2.55,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.55 — Combinamos a expectativa de golos na meia-final do Mundial entre Inglaterra e Argentina com o favoritismo claro do Sabah FC na qualificação da Champions League. Uma aposta dupla de excelente valor.',
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
