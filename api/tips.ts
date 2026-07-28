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
  'Aposte com responsabilidade. As odds podem sofrer alterações e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '28/07/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'Riga FC',
      awayTeam: 'Vardar',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Riga FC',
      confidence: 77,
      odds: 1.29,
      market: 'Resultado final',
      winner: 'Riga FC',
      analysis: `O Riga FC lidera a eliminatória por 3-2 após a primeira mão. A odd indicativa (1.29) sugere uma probabilidade implícita de cerca de 77%. A equipa da casa apresenta claro favoritismo para fechar o apuramento. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 77,
      drawPercent: 15,
      awayPercent: 8,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'Apollon Limassol',
      awayTeam: 'Dila Gori',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Apollon Limassol',
      confidence: 75,
      odds: 1.32,
      market: 'Resultado final',
      winner: 'Apollon Limassol',
      analysis: `Com uma vantagem confortável de 4-0 na primeira mão, o Apollon Limassol joga em casa para gerir o resultado. A odd indicativa (1.32) aponta para 75% de probabilidade implícita de vitória na partida. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 75,
      drawPercent: 18,
      awayPercent: 7,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'Dinamo Zagreb',
      awayTeam: 'FC Thun',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Dinamo Zagreb',
      confidence: 72,
      odds: 1.38,
      market: 'Resultado final',
      winner: 'Dinamo Zagreb',
      analysis: `Após um empate (1-1) na primeira mão, o Dinamo Zagreb decide em casa. O fator campo e a experiência europeia sustentam a odd indicativa (1.38), traduzindo-se numa probabilidade implícita de 72%. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 72,
      drawPercent: 18,
      awayPercent: 10,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'NK Celje',
      awayTeam: 'Egnatia',
      date: dateStr,
      time: '18:15',
      prediction: 'Vitória NK Celje',
      confidence: 71,
      odds: 1.40,
      market: 'Resultado final',
      winner: 'NK Celje',
      analysis: `O nulo (0-0) do primeiro jogo deixa tudo em aberto. O NK Celje joga perante os seus adeptos e assume o favoritismo com uma odd indicativa de 1.40 (71% de probabilidade implícita) para assegurar o apuramento no tempo regulamentar. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 71,
      drawPercent: 18,
      awayPercent: 11,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'Lincoln Red Imps',
      awayTeam: 'Mjällby AIF',
      date: dateStr,
      time: '16:00',
      prediction: 'Vitória Mjällby AIF',
      confidence: 64,
      odds: 1.54,
      market: 'Resultado final',
      winner: 'Mjällby AIF',
      analysis: `A equipa sueca já resolveu praticamente a eliminatória (3-0 na primeira mão), mas continua a ser favorita para o encontro fora de casa. A odd indicativa (1.54) reflete uma probabilidade implícita de 64% para um novo triunfo. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 15,
      drawPercent: 21,
      awayPercent: 64,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'Liga dos Campeões (Q)',
      homeTeam: 'Riga FC + Apollon Limassol',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '17:00',
      prediction: 'Riga FC vence + Apollon Limassol vence',
      confidence: 58,
      odds: 1.71,
      market: 'Combinada',
      winner: '',
      analysis: `Acumulador com as duas equipas mais favoritas do dia a jogarem em casa. A odd combinada indicativa de 1.71 traduz uma probabilidade implícita aproximada de 58%. A aposta múltipla acrescenta sempre variância. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
