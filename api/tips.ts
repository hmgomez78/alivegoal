import { VercelRequest, VercelResponse } from '@vercel/node';

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

const RESPONSIBLE_GAMBLING_NOTE =
  'Aposte com responsabilidade. As odds podem sofrer alterações.';

function getFallbackTips(): Tip[] {
  const dateStr = '27/07/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'WAFCON',
      homeTeam: 'África do Sul',
      awayTeam: 'Tanzânia',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória África do Sul',
      confidence: 79,
      odds: 1.17,
      market: 'Resultado final',
      winner: 'África do Sul',
      analysis: `Cotação consultada: 1.17. As probabilidades implícitas normalizadas pelas odds 1X2 apontam 79% para a África do Sul, 15% para o empate e 6% para a Tanzânia. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 79,
      drawPercent: 15,
      awayPercent: 6,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'WAFCON',
      homeTeam: 'Costa do Marfim',
      awayTeam: 'Burkina Faso',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Costa do Marfim',
      confidence: 60,
      odds: 1.50,
      market: 'Resultado final',
      winner: 'Costa do Marfim',
      analysis: `Cotação consultada: 1.50. As probabilidades implícitas normalizadas pelas odds 1X2 apontam 60% para a Costa do Marfim, 26% para o empate e 15% para o Burkina Faso. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 26,
      awayPercent: 15,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Sport Recife',
      awayTeam: 'Cuiabá',
      date: dateStr,
      time: '22:30',
      prediction: 'Vitória Sport Recife',
      confidence: 50,
      odds: 1.86,
      market: 'Resultado final',
      winner: 'Sport Recife',
      analysis: `Cotação consultada: 1.86. As probabilidades implícitas normalizadas pelas odds 1X2 apontam 50% para o Sport Recife, 30% para o empate e 21% para o Cuiabá. O Sport joga em casa e surge acima do Cuiabá na classificação mostrada na prévia. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 50,
      drawPercent: 30,
      awayPercent: 21,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'CRB',
      awayTeam: 'Vila Nova',
      date: dateStr,
      time: '22:30',
      prediction: 'Vitória CRB',
      confidence: 49,
      odds: 1.86,
      market: 'Resultado final',
      winner: 'CRB',
      analysis: `Cotação consultada: 1.86. As probabilidades implícitas normalizadas pelas odds 1X2 apontam 49% para o CRB, 26% para o empate e 24% para o Vila Nova. A seleção assume risco: o CRB joga no Estádio Rei Pelé, mas o Vila Nova aparece acima na classificação pré-jogo. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 49,
      drawPercent: 26,
      awayPercent: 24,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Atlético-GO',
      awayTeam: 'Operário-PR',
      date: dateStr,
      time: '22:30',
      prediction: 'Vitória Atlético-GO',
      confidence: 45,
      odds: 2.05,
      market: 'Resultado final',
      winner: 'Atlético-GO',
      analysis: `Cotação consultada: 2.05. As probabilidades implícitas normalizadas pelas odds 1X2 apontam 45% para o Atlético-GO, 29% para o empate e 26% para o Operário-PR. É uma seleção de valor mais agressiva, apesar do melhor momento classificativo do Operário-PR. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 45,
      drawPercent: 29,
      awayPercent: 26,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'WAFCON',
      homeTeam: 'África do Sul + Costa do Marfim',
      awayTeam: 'Tanzânia + Burkina Faso',
      date: dateStr,
      time: 'Múltipla',
      prediction: 'África do Sul vence + Costa do Marfim vence',
      confidence: 47,
      odds: 1.76,
      market: 'Combinada',
      winner: '',
      analysis: `Cotação combinada indicativa: 1.76, obtida pela multiplicação das odds individuais consultadas (1.17 × 1.50). A probabilidade implícita combinada é de aproximadamente 47%; a múltipla aumenta o risco, mesmo com duas favoritas. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
  ];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const channelId = process.env.TELEGRAM_CHANNEL_ID;

    if (!telegramToken || !channelId) {
      return res.status(200).json({
        source: 'fallback',
        count: 6,
        updated: new Date().toISOString(),
        items: getFallbackTips(),
      });
    }

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/getUpdates?limit=10`
    );

    if (!tgResponse.ok) {
      throw new Error(`Telegram API responded with status: ${tgResponse.status}`);
    }

    const data = await tgResponse.json();

    if (!data.ok || !data.result || data.result.length === 0) {
      return res.status(200).json({
        source: 'fallback',
        count: 6,
        updated: new Date().toISOString(),
        items: getFallbackTips(),
      });
    }

    return res.status(200).json({
      source: 'fallback',
      count: 6,
      updated: new Date().toISOString(),
      items: getFallbackTips(),
    });
  } catch (error) {
    console.error('Error fetching from Telegram:', error);
    return res.status(200).json({
      source: 'fallback',
      count: 6,
      updated: new Date().toISOString(),
      items: getFallbackTips(),
    });
  }
}
