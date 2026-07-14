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
// Fallback data if Telegram fetch fails
function getFallbackTips(): BettingTip[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return [
    // ===== FRANÇA vs ESPANHA =====
    {
      id: 5046,
      betNumber: '5046',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'França',
      awayTeam: 'Espanha',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 85,
      odds: 1.65,
      market: 'Menos de 2.5',
      winner: '',
      analysis: '🌍 Menos de 2.5 Golos @1.65 — A meia-final do Mundial coloca frente a frente duas potências. A França de Deschamps tem-se mostrado incrivelmente sólida a defender e pragmática a atacar. A Espanha gosta de ter a bola mas terá dificuldades em penetrar o bloco gaulês. Jogo de muita tática e poucos golos.',
      homePercent: 35,
      drawPercent: 35,
      awayPercent: 30,
    },
    // ===== INGLATERRA vs ARGENTINA (Antecipação) =====
    {
      id: 5047,
      betNumber: '5047',
      betType: 'SINGLE',
      league: 'FIFA Mundial 2026',
      homeTeam: 'Inglaterra',
      awayTeam: 'Argentina',
      date: '15/07/2026',
      time: '20:00',
      prediction: 'Ambas Equipas Marcam',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🌍 Ambas Marcam @1.95 — Antecipação da segunda meia-final. A Inglaterra de Thomas Tuchel tem marcado consistentemente desde a fase de grupos. A Argentina tem o talento ofensivo de Messi e Alvarez. Ambas as defesas têm mostrado algumas fragilidades sob pressão.',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
    },
    // ===== DJURGARDENS IF vs HALMSTADS BK =====
    {
      id: 5048,
      betNumber: '5048',
      betType: 'SINGLE',
      league: 'Allsvenskan',
      homeTeam: 'Djurgardens IF',
      awayTeam: 'Halmstads BK',
      date: dateStr,
      time: '18:00',
      prediction: 'Djurgardens IF Vence (Handicap Asiático -1.5)',
      confidence: 80,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Djurgardens IF',
      analysis: '🇸🇪 Djurgardens AH -1.5 @1.85 — O Djurgardens está em excelente forma no campeonato sueco e defronta um Halmstads que tem tido muitas dificuldades defensivas. Jogando em casa, o Djurgardens tem todas as condições para vencer por uma margem confortável.',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    // ===== AMÉRICA-RN vs TREM-AP =====
    {
      id: 5049,
      betNumber: '5049',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'América-RN',
      awayTeam: 'Trem-AP',
      date: dateStr,
      time: '19:00',
      prediction: 'América-RN Vence',
      confidence: 90,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'América-RN',
      analysis: '🇧🇷 Vitória América-RN @1.45 — Jogo decisivo na Série D onde o América-RN tem uma vantagem clara jogando em casa. O Trem-AP é uma equipa inferior tecnicamente e o fator casa na Arena das Dunas será fundamental para a vitória.',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    // ===== CSA vs BETIM =====
    {
      id: 5050,
      betNumber: '5050',
      betType: 'SINGLE',
      league: 'Brasileirão Série D',
      homeTeam: 'CSA',
      awayTeam: 'Betim',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 70,
      odds: 1.80,
      market: 'Mais de 2.5',
      winner: '',
      analysis: '🇧🇷 Mais de 2.5 Golos @1.80 — O CSA precisa de resolver a eliminatória em casa e tem um ataque forte para o nível da Série D. O Betim tentará jogar no erro, o que pode abrir espaços. Esperamos um jogo aberto com oportunidades de golo.',
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 15,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5051,
      betNumber: '5051',
      betType: 'DOUBLE',
      league: 'Mundial + Allsvenskan',
      homeTeam: 'França/Espanha + Djurgardens',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '18:00',
      prediction: 'Menos 2.5 (FRA-ESP) + Vitória Djurgardens',
      confidence: 85,
      odds: 2.30,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.30 — Combinamos a tendência de poucos golos no duelo tático entre França e Espanha com o favoritismo claro do Djurgardens em casa no campeonato sueco. Uma aposta dupla de alto valor para esta terça-feira.',
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
