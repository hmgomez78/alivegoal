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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 06/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '06/08/2026';

  return [
    {
      id: 8101,
      betNumber: '8101',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'Benfica',
      awayTeam: 'Hearts',
      date: dateStr,
      time: '20:00',
      prediction: 'Benfica Handicap Asiático -2',
      confidence: 66,
      odds: 1.71,
      market: 'Handicap Asiático',
      winner: 'Benfica',
      analysis: `O Benfica é o favorito destacado nesta primeira mão, com a cotação 1x2 a refletir uma diferença relevante de qualidade e experiência europeia. O handicap asiático -2 a 1.71 é a referência de mercado consultada; uma vitória por exatamente dois golos devolve a aposta. Fonte da odd: RatingBet. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 79,
      drawPercent: 13,
      awayPercent: 8,
    },
    {
      id: 8102,
      betNumber: '8102',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'Maccabi Tel-Aviv',
      awayTeam: 'CSKA Sofia',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Maccabi Tel-Aviv',
      confidence: 58,
      odds: 2.04,
      market: 'Resultado Final',
      winner: 'Maccabi Tel-Aviv',
      analysis: `O Maccabi Tel-Aviv surge como ligeiro favorito nas cotações pré-jogo, apesar de o preço indicar uma eliminatória equilibrada. A equipa joga em casa e o mercado 1x2 consultado oferecia aproximadamente 2.04 para o triunfo. Fonte da odd: SportsGambler / FanDuel. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 49,
      drawPercent: 27,
      awayPercent: 24,
    },
    {
      id: 8103,
      betNumber: '8103',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'Jagiellonia Białystok',
      awayTeam: 'Rangers',
      date: dateStr,
      time: '17:00',
      prediction: 'Jagiellonia Białystok Handicap Asiático +0.25',
      confidence: 55,
      odds: 1.75,
      market: 'Handicap Asiático',
      winner: 'Jagiellonia Białystok',
      analysis: `O Rangers é favorito marginal no 1x2, mas a deslocação à Polónia tende a equilibrar a primeira mão. O +0.25 para o Jagiellonia divide a exposição entre vitória caseira e empate, oferecendo proteção parcial se o jogo terminar nivelado. Fonte da odd: Cloudbet via GoonersGuide. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 31,
      drawPercent: 28,
      awayPercent: 41,
    },
    {
      id: 8104,
      betNumber: '8104',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'Salzburg',
      awayTeam: 'Pafos',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Salzburg',
      confidence: 61,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Salzburg',
      analysis: `O Salzburg entra como favorito em casa e as referências de mercado atribuem-lhe cerca de 59% a 60% de probabilidade implícita de vitória. Perante um Pafos competitivo, a seleção é sustentada sobretudo pelo fator casa e pelo estatuto europeu dos austríacos. Fonte da odd: Tips.GG. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 59,
      drawPercent: 24,
      awayPercent: 17,
    },
    {
      id: 8105,
      betNumber: '8105',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'PAOK',
      awayTeam: 'Anderlecht',
      date: dateStr,
      time: '18:45',
      prediction: 'Vitória PAOK',
      confidence: 57,
      odds: 1.78,
      market: 'Resultado Final',
      winner: 'PAOK',
      analysis: `O PAOK beneficia do fator casa num duelo de equilíbrio teórico com o Anderlecht. A referência de 1.78 posiciona os gregos como favoritos moderados; trata-se de uma escolha dependente de concretizarem essa vantagem no ambiente de Salónica. Fonte da odd: Tips.GG. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 53,
      drawPercent: 26,
      awayPercent: 21,
    },
    {
      id: 8106,
      betNumber: '8106',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Maccabi Tel-Aviv + Salzburg',
      awayTeam: 'CSKA Sofia + Pafos',
      date: dateStr,
      time: 'Vários',
      prediction: 'Maccabi Tel-Aviv Vence + Salzburg Vence',
      confidence: 44,
      odds: 3.16,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A dupla combina as seleções de vitória do Maccabi Tel-Aviv (2.04) e do Salzburg (1.55), para uma odd combinada aproximada de 3.16. A atratividade do retorno é acompanhada por risco acrescido: ambas as seleções têm de vencer. Fontes das odds: SportsGambler / Tips.GG. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
