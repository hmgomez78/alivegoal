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

const RESPONSIBLE_GAMBLING_NOTE =
  'Conteúdo informativo e não uma garantia de resultado. As odds são uma referência de mercado observada antes do jogo e podem variar; aposta apenas se tiveres idade legal e dentro de limites responsáveis.';

export function getFallbackTips(): Tip[] {
  const dateStr = '26/07/2026';

  return [
    {
      id: 6001,
      betNumber: '6001',
      betType: 'SINGLE',
      league: 'K League 1',
      homeTeam: 'FC Seoul',
      awayTeam: 'Ulsan Hyundai FC',
      date: dateStr,
      time: '10:30',
      prediction: 'Ambas as equipas marcam — Sim',
      confidence: 60,
      odds: 1.73,
      market: 'Ambas marcam',
      winner: '',
      analysis: `Cotação de referência: 1.73 (Bet365, via WinComparator). O FC Seoul chega com 13 pontos nos últimos cinco jogos e o Ulsan marcou em quatro dos cinco mais recentes; a prévia de mercado estimava 61,67% para ambas marcarem. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 45,
      drawPercent: 34,
      awayPercent: 21,
    },
    {
      id: 6002,
      betNumber: '6002',
      betType: 'SINGLE',
      league: 'K League 1',
      homeTeam: 'Incheon United',
      awayTeam: 'Bucheon FC 1995',
      date: dateStr,
      time: '10:30',
      prediction: 'Vitória Incheon United',
      confidence: 52,
      odds: 1.67,
      market: 'Resultado final',
      winner: 'Incheon United',
      analysis: `Cotação de referência: 1.67 (Bet365, via Oddslot). O Incheon venceu três dos últimos cinco encontros e marcou sete golos nesse período, enquanto o Bucheon sofreu nove. É uma seleção de favoritismo moderado, não de certeza. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 27,
      awayPercent: 18,
    },
    {
      id: 6003,
      betNumber: '6003',
      betType: 'SINGLE',
      league: 'Liga Profesional de Fútbol',
      homeTeam: 'Estudiantes L.P.',
      awayTeam: 'Independiente',
      date: dateStr,
      time: '20:15',
      prediction: 'Vitória Estudiantes L.P.',
      confidence: 52,
      odds: 2.1,
      market: 'Resultado final',
      winner: 'Estudiantes L.P.',
      analysis: `Cotação de referência: 2.10 (+110 na BetMGM, via SportsGambler). O Estudiantes soma 31 pontos em 16 jogos, sofreu apenas sete golos na liga e venceu três dos últimos cinco; o Independiente perdeu três dos últimos cinco fora. A fonte avalia o mercado perto de 47,6%, com projeção editorial de 50–55%. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 52,
      drawPercent: 25,
      awayPercent: 23,
    },
    {
      id: 6004,
      betNumber: '6004',
      betType: 'SINGLE',
      league: 'Liga Profesional de Fútbol',
      homeTeam: 'Deportivo Riestra',
      awayTeam: 'Boca Juniors',
      date: dateStr,
      time: '22:30',
      prediction: 'Vitória Boca Juniors',
      confidence: 53,
      odds: 1.93,
      market: 'Resultado final',
      winner: 'Boca Juniors',
      analysis: `Cotação de referência: 1.93 (-108 na BetMGM, via SportsGambler; sujeita a oscilação). O Boca venceu quatro deslocações seguidas e tem 22–9 em golos no campeonato, enquanto o Riestra tem cinco golos marcados em 16 jogos. A vantagem estatística não elimina o risco de um jogo fora. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 20,
      drawPercent: 27,
      awayPercent: 53,
    },
    {
      id: 6005,
      betNumber: '6005',
      betType: 'SINGLE',
      league: 'K League 1',
      homeTeam: 'Gwangju FC',
      awayTeam: 'Jeju United',
      date: dateStr,
      time: '10:30',
      prediction: 'Menos de 2,5 golos',
      confidence: 62,
      odds: 1.75,
      market: 'Total de golos',
      winner: '',
      analysis: `Cotação de referência: 1.75 (Bet365, via WinComparator). O modelo de comparação atribuiu 70,79% ao cenário de menos de 2,5 golos, apoiado na média ofensiva recente do Gwangju (0,5 golos) e em cinco dos últimos seis duelos diretos com no máximo dois golos. A confiança publicada é deliberadamente mais conservadora do que essa projeção. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 23,
      drawPercent: 33,
      awayPercent: 44,
    },
    {
      id: 6006,
      betNumber: '6006',
      betType: 'DOUBLE',
      league: 'K League 1',
      homeTeam: 'FC Seoul + FC Anyang',
      awayTeam: 'Ulsan Hyundai FC + Gangwon FC',
      date: dateStr,
      time: 'Múltipla',
      prediction: 'FC Seoul vence + Gangwon FC ou empate (X2)',
      confidence: 45,
      odds: 2.14,
      market: 'Combinada',
      winner: '',
      analysis: `Cotação combinada indicativa: 2.14, calculada a partir de FC Seoul vence a 1.75 e Gangwon X2 a 1.22 (linhas Bet365 consultadas via WinComparator e Oddslot). O Seoul lidera a K League com 42 pontos, e o Gangwon chega com apenas três derrotas em 19 jogos; numa dupla, ambas as condições precisam de se verificar e o risco é superior ao de uma seleção simples. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
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
