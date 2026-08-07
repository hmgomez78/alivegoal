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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 07/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '07/08/2026';

  return [
    {
      id: 8101,
      betNumber: '8101',
      betType: 'SINGLE',
      league: 'Irish Premier Division',
      homeTeam: 'Derry City',
      awayTeam: 'Sligo Rovers',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória Derry City',
      confidence: 63,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Derry City',
      analysis: `O Derry City é apontado como favorito claro no encontro caseiro com o Sligo Rovers, com a melhor cotação 1x2 observada em 1.45. O mercado reconhece a vantagem da equipa anfitriã, mas o empate continua a ser um risco relevante num derby da liga irlandesa. Fonte da odd: SportyTrader. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 61,
      drawPercent: 22,
      awayPercent: 17,
    },
    {
      id: 8102,
      betNumber: '8102',
      betType: 'SINGLE',
      league: 'Irish Premier Division',
      homeTeam: 'Shamrock Rovers',
      awayTeam: 'Dundalk',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Shamrock Rovers',
      confidence: 60,
      odds: 1.62,
      market: 'Resultado Final',
      winner: 'Shamrock Rovers',
      analysis: `O Shamrock Rovers parte como favorito frente ao Dundalk, com o mercado 1x2 a colocar os anfitriões em cerca de 1.62. A seleção depende de os Rovers transformarem a superioridade de mercado numa vitória, pelo que a gestão de risco é essencial. Fonte da odd: Oddslot / Oddspedia. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 23,
      awayPercent: 17,
    },
    {
      id: 8103,
      betNumber: '8103',
      betType: 'SINGLE',
      league: 'Norwegian Eliteserien',
      homeTeam: 'Sandefjord',
      awayTeam: 'KFUM',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Sandefjord',
      confidence: 49,
      odds: 2.07,
      market: 'Resultado Final',
      winner: 'Sandefjord',
      analysis: `O Sandefjord é um favorito curto diante do KFUM, com a referência de +107 equivalente a 2.07 em formato decimal. A odd confirma um jogo equilibrado e oferece retorno superior, mas também traduz uma probabilidade de falha considerável. Fonte da odd: SportsGambler. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 43,
      drawPercent: 28,
      awayPercent: 29,
    },
    {
      id: 8104,
      betNumber: '8104',
      betType: 'SINGLE',
      league: 'Belgian Pro League',
      homeTeam: 'Club Brugge',
      awayTeam: 'Kortrijk',
      date: dateStr,
      time: '19:45',
      prediction: 'Club Brugge Handicap Asiático -1.5',
      confidence: 67,
      odds: 1.65,
      market: 'Handicap Asiático',
      winner: 'Club Brugge',
      analysis: `O Club Brugge entra como enorme favorito no 1x2 contra o Kortrijk. A linha -1.5, referenciada a -155 (1.65 decimal), procura capturar uma vitória por dois ou mais golos e oferece uma alternativa ao preço reduzido da vitória simples. Fonte da odd: FanDuel. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 78,
      drawPercent: 14,
      awayPercent: 8,
    },
    {
      id: 8105,
      betNumber: '8105',
      betType: 'SINGLE',
      league: 'Liga Portugal',
      homeTeam: 'Estoril',
      awayTeam: 'Famalicão',
      date: dateStr,
      time: '20:15',
      prediction: 'Vitória Famalicão',
      confidence: 47,
      odds: 2.1,
      market: 'Resultado Final',
      winner: 'Famalicão',
      analysis: `O Famalicão é identificado pelo mercado como ligeiro favorito na visita ao Estoril, com uma odd de referência de 2.10. É uma escolha de risco moderado: o preço sugere equilíbrio, pelo que o resultado não deve ser tratado como previsível. Fonte da odd: Oddspedia. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 30,
      drawPercent: 29,
      awayPercent: 41,
    },
    {
      id: 8106,
      betNumber: '8106',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Derry City + Club Brugge',
      awayTeam: 'Sligo Rovers + Kortrijk',
      date: dateStr,
      time: 'Vários',
      prediction: 'Derry City Vence + Club Brugge Handicap Asiático -1.5',
      confidence: 42,
      odds: 2.39,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A dupla combina a vitória do Derry City (1.45) com o handicap asiático -1.5 do Club Brugge (1.65), produzindo uma odd combinada de 2.39. Embora reúna duas equipas favoritas, exige que as duas seleções sejam bem-sucedidas e, por isso, tem risco significativamente maior do que uma aposta simples. Fontes das odds: SportyTrader e FanDuel. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
