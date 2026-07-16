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
    // ===== BOTAFOGO vs SANTOS =====
    {
      id: 5052,
      betNumber: '5052',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Botafogo',
      awayTeam: 'Santos',
      date: dateStr,
      time: '23:30',
      prediction: 'Botafogo Vence',
      confidence: 85,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Botafogo',
      analysis: '🔥 Botafogo Vence @1.85 — O Botafogo regressa ao Brasileirão no seu estádio (Nilton Santos) onde tem sido muito forte. O Santos tem mostrado inconsistências defensivas fora de casa. Com o apoio dos adeptos, o Botafogo é o claro favorito para somar os três pontos neste clássico.',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    // ===== VITÓRIA vs VASCO =====
    {
      id: 5053,
      betNumber: '5053',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Vitória',
      awayTeam: 'Vasco da Gama',
      date: dateStr,
      time: '23:30',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 80,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '⚽ Ambas Marcam @1.95 — O Vitória no Barradão costuma ser muito ofensivo e marcar golos, mas a sua defesa permite oportunidades. O Vasco precisa pontuar e tem qualidade no ataque para ferir o adversário. Espera-se um jogo aberto com golos para os dois lados.',
      homePercent: 40,
      drawPercent: 30,
      awayPercent: 30,
    },
    // ===== SABAH FC vs THE NEW SAINTS =====
    {
      id: 5054,
      betNumber: '5054',
      betType: 'SINGLE',
      league: 'Qualificação Champions',
      homeTeam: 'Sabah FC',
      awayTeam: 'The New Saints',
      date: dateStr,
      time: '17:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 75,
      odds: 1.70,
      market: 'Total de Golos',
      winner: '',
      analysis: '🇪🇺 Mais de 2.5 Golos @1.70 — O Sabah joga em casa e precisa de assumir o jogo nesta qualificação para a Champions League. O TNS é uma equipa que sofre golos na Europa mas que também consegue marcar em contra-ataque. Tendência para um jogo com 3 ou mais golos.',
      homePercent: 60,
      drawPercent: 20,
      awayPercent: 20,
    },
    // ===== LINCOLN RED IMPS vs INTER CLUB D'ESCALDES =====
    {
      id: 5055,
      betNumber: '5055',
      betType: 'SINGLE',
      league: 'Qualificação Champions',
      homeTeam: 'Lincoln Red Imps',
      awayTeam: "Inter Club d'Escaldes",
      date: dateStr,
      time: '17:00',
      prediction: 'Lincoln Red Imps Vence',
      confidence: 85,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Lincoln Red Imps',
      analysis: '🇪🇺 Lincoln Red Imps Vence @1.55 — A equipa de Gibraltar tem muito mais experiência nas competições europeias do que o seu adversário de Andorra. A jogar no seu terreno sintético habitual, o Lincoln tem uma vantagem significativa.',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
    },
    // ===== ARARAT-ARMENIA vs RIGA FC =====
    {
      id: 5056,
      betNumber: '5056',
      betType: 'SINGLE',
      league: 'Qualificação Champions',
      homeTeam: 'Ararat-Armenia',
      awayTeam: 'Riga FC',
      date: dateStr,
      time: '17:00',
      prediction: 'Riga FC Vence ou Empata',
      confidence: 75,
      odds: 1.65,
      market: 'Dupla Hipótese',
      winner: '',
      analysis: '🇪🇺 Riga FC ou Empate @1.65 — O Riga FC tem investido muito no seu plantel e apresenta uma equipa superior no papel. Apesar de jogar fora na Arménia ser sempre difícil, os letões têm qualidade suficiente para, pelo menos, não perder a primeira mão.',
      homePercent: 30,
      drawPercent: 35,
      awayPercent: 35,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5057,
      betNumber: '5057',
      betType: 'DOUBLE',
      league: 'Brasileirão + Champions',
      homeTeam: 'Botafogo + Lincoln',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória do Botafogo + Vitória do Lincoln Red Imps',
      confidence: 80,
      odds: 2.86,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @2.86 — Combinamos os dois grandes favoritos do dia. O Botafogo em casa no regresso do Brasileirão e a experiência europeia do Lincoln Red Imps frente a um adversário inferior. Uma dupla com excelente valor.',
      homePercent: 60,
      drawPercent: 0,
      awayPercent: 40,
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
