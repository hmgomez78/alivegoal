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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds foram consultadas em 04/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '04/08/2026';

  return [
    {
      id: 8001,
      betNumber: '8001',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'Sparta Prague',
      awayTeam: 'Lyon',
      date: dateStr,
      time: '19:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 62,
      odds: 1.93,
      market: 'Mais de 2.5 Golos',
      winner: '',
      analysis: `As previsões apontam para um encontro equilibrado mas com capacidade ofensiva de ambos os lados. A linha de mercado para mais de 2.5 golos situava-se em 1.93, refletindo uma probabilidade próxima dos 50%. A aposta exige que as equipas marquem pelo menos três golos no conjunto. Fonte da odd: SportyTrader / Bet365. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8002,
      betNumber: '8002',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'Union SG',
      awayTeam: 'Bodø/Glimt',
      date: dateStr,
      time: '19:00',
      prediction: 'Union SG ou Empate',
      confidence: 70,
      odds: 1.30,
      market: 'Dupla Hipótese 1X',
      winner: 'Union SG ou Empate',
      analysis: `A análise estatística dá vantagem ligeira à equipa da casa, que tenta construir um resultado positivo antes da viagem à Noruega. A dupla hipótese (1X) estava cotada a 1.30, oferecendo proteção caso o Bodø/Glimt consiga arrancar um empate, mas o retorno financeiro é baixo. Fonte da odd: OddsSlot / bet365. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 47,
      drawPercent: 28,
      awayPercent: 25,
    },
    {
      id: 8003,
      betNumber: '8003',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'Dinamo Zagreb',
      awayTeam: 'Kauno Žalgiris',
      date: dateStr,
      time: '19:00',
      prediction: 'Dinamo Zagreb Handicap -1.5',
      confidence: 65,
      odds: 1.47,
      market: 'Handicap Asiático',
      winner: 'Dinamo Zagreb',
      analysis: `O Dinamo Zagreb é amplo favorito no mercado 1X2 (cotações a rondar 1.14). Para encontrar valor, o mercado de handicap -1.5, cotado a 1.47, exige que os croatas vençam por dois ou mais golos de diferença. É uma abordagem que reflete o desnível competitivo esperado, mas aumenta o risco. Fonte da odd: YesPlay. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 82,
      drawPercent: 12,
      awayPercent: 6,
    },
    {
      id: 8004,
      betNumber: '8004',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: "Hapoel Be'er Sheva",
      awayTeam: 'Red Star',
      date: dateStr,
      time: '18:30',
      prediction: 'Vitória Red Star',
      confidence: 58,
      odds: 1.88,
      market: 'Resultado Final',
      winner: 'Red Star',
      analysis: `A equipa sérvia entra como favorita mesmo jogando fora de portas, refletindo uma maior experiência e profundidade de plantel a este nível europeu. A vitória do Estrela Vermelha apresentava cotações na ordem de 1.88, o que traduz um mercado equilibrado mas inclinado para os visitantes. Fonte da odd: SportyTrader / LSbet. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 23,
      drawPercent: 27,
      awayPercent: 50,
    },
    {
      id: 8005,
      betNumber: '8005',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'Levski Sofia',
      awayTeam: 'Kairat',
      date: dateStr,
      time: '18:30',
      prediction: 'Vitória Levski Sofia',
      confidence: 60,
      odds: 1.57,
      market: 'Resultado Final',
      winner: 'Levski Sofia',
      analysis: `O Levski Sofia apresenta-se em boa forma caseira e o mercado reconhece esse momento, cotando a vitória da equipa búlgara a 1.57. O Kairat demonstrou fragilidades recentes, mas as pré-eliminatórias europeias comportam sempre variância. Fonte da odd: OddsSlot / bet365. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 26,
      awayPercent: 16,
    },
    {
      id: 8006,
      betNumber: '8006',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Dinamo Zagreb + Levski Sofia',
      awayTeam: 'Kauno Žalgiris + Kairat',
      date: dateStr,
      time: 'Vários',
      prediction: 'Dinamo Vence + Levski Vence',
      confidence: 55,
      odds: 1.79,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A acumulada une o claro favoritismo do Dinamo Zagreb (1.14) com a probabilidade favorável do Levski Sofia (1.57), perfazendo uma cotação conjunta de aproximadamente 1.79. Como em todas as apostas múltiplas, a falha de apenas uma equipa resulta na perda total. Fontes das odds: YesPlay e OddsSlot / bet365. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
