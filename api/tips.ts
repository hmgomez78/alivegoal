import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 09/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '09/08/2026';

  return [
    {
      id: 8301,
      betNumber: '8301',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Cruzeiro',
      awayTeam: 'Mirassol',
      date: dateStr,
      time: '10:00',
      prediction: 'Vitória Cruzeiro',
      confidence: 58,
      odds: 1.72,
      market: 'Resultado Final',
      winner: 'Cruzeiro',
      analysis: `O Cruzeiro é favorito em casa contra o Mirassol. A referência de 1.72 equivale a uma probabilidade implícita próxima de 58%, antes da margem da casa, e é coerente com a linha -150 apresentada na agenda da ESPN. Fonte da odd: Tips.GG; calendário: ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 25,
      awayPercent: 17,
    },
    {
      id: 8302,
      betNumber: '8302',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Palmeiras',
      awayTeam: 'Internacional',
      date: dateStr,
      time: '15:00',
      prediction: 'Vitória Palmeiras',
      confidence: 64,
      odds: 1.57,
      market: 'Resultado Final',
      winner: 'Palmeiras',
      analysis: `O Palmeiras surge como o favorito mais claro da jornada entre as seleções publicadas. A linha -175 disponível na agenda da ESPN corresponde a cerca de 1.57 em formato decimal e a uma probabilidade implícita de 64%. Mesmo em casa, continua a existir risco de empate ou surpresa visitante. Fonte da odd e do calendário: ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 64,
      drawPercent: 22,
      awayPercent: 14,
    },
    {
      id: 8303,
      betNumber: '8303',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Bahia',
      awayTeam: 'Vasco da Gama',
      date: dateStr,
      time: '15:00',
      prediction: 'Vitória Bahia',
      confidence: 51,
      odds: 1.95,
      market: 'Resultado Final',
      winner: 'Bahia',
      analysis: `O Bahia joga na Arena Fonte Nova e a linha -105 listada pela ESPN traduz-se em aproximadamente 1.95 decimal, com probabilidade implícita próxima de 51%. É uma seleção de equilíbrio moderado, não uma aposta de elevada segurança; a cotação deixa espaço material para empate ou vitória do Vasco. Fonte da odd e do calendário: ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 51,
      drawPercent: 27,
      awayPercent: 22,
    },
    {
      id: 8304,
      betNumber: '8304',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Santos',
      awayTeam: 'Athletico Paranaense',
      date: dateStr,
      time: '17:30',
      prediction: 'Vitória Santos',
      confidence: 47,
      odds: 2.12,
      market: 'Resultado Final',
      winner: 'Santos',
      analysis: `O Santos é apontado como favorito marginal no mercado 1X2 para receber o Athletico Paranaense, com +112 (cerca de 2.12) e uma probabilidade implícita de 47%. A cotação evidencia um encontro competitivo, pelo que esta é uma seleção de risco mais elevado do que Cruzeiro ou Palmeiras. Fonte da odd: SportsGambler; calendário: ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 47,
      drawPercent: 28,
      awayPercent: 25,
    },
    {
      id: 8305,
      betNumber: '8305',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Flamengo',
      awayTeam: 'Vitória',
      date: dateStr,
      time: '18:30',
      prediction: 'Flamengo -1.0 Handicap Asiático',
      confidence: 54,
      odds: 1.70,
      market: 'Handicap Asiático',
      winner: 'Flamengo',
      analysis: `O Flamengo recebe o Vitória no Maracanã e a linha -1.0 oferece devolução da aposta se vencer por exatamente um golo. A odd de referência de 1.70 foi publicada para esse handicap; a seleção vence integralmente apenas com triunfo por dois ou mais golos. Fonte da odd: RatingBet; calendário: ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 54,
      drawPercent: 0,
      awayPercent: 46,
    },
    {
      id: 8306,
      betNumber: '8306',
      betType: 'DOUBLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Cruzeiro + Palmeiras',
      awayTeam: 'Mirassol + Internacional',
      date: dateStr,
      time: 'Vários',
      prediction: 'Cruzeiro vence + Palmeiras vence',
      confidence: 37,
      odds: 2.70,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A dupla combina as vitórias de Cruzeiro (1.72) e Palmeiras (1.57), produzindo uma odd combinada aproximada de 2.70. As duas equipas são favoritas nos respetivos mercados, mas a acumuladora perde se uma delas não vencer; por isso, o risco é superior ao de cada seleção simples. Fontes das odds: Tips.GG e ESPN. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
  ];
}

function fallbackResponse() {
  const tips = getFallbackTips();
  return {
    source: 'curated-pre-match',
    count: tips.length,
    updated: new Date().toISOString(),
    items: tips,
    tips,
  };
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

  return res.status(200).json(fallbackResponse());
}
