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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds foram consultadas em 05/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '05/08/2026';

  return [
    {
      id: 8101,
      betNumber: '8101',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Sturm Graz',
      date: dateStr,
      time: '19:00',
      prediction: 'Ambas Marcam: Sim',
      confidence: 65,
      odds: 1.88,
      market: 'Ambas Marcam',
      winner: '',
      analysis: `José Mourinho tenta carimbar a passagem à próxima fase com um Fenerbahçe que marcou e sofreu em 8 dos últimos 10 jogos caseiros. O Sturm Graz também mostra propensão para golos, tendo ambas marcado em 4 das suas últimas 5 saídas. A expectativa de um jogo aberto justifica o mercado de ambas marcam. Fonte da odd: BetMGM / Oddschecker. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8102,
      betNumber: '8102',
      betType: 'SINGLE',
      league: 'UEFA Champions League (Q)',
      homeTeam: 'AGF Aarhus',
      awayTeam: 'Sabah',
      date: dateStr,
      time: '18:00',
      prediction: 'Ambas Marcam: Sim',
      confidence: 62,
      odds: 1.80,
      market: 'Ambas Marcam',
      winner: '',
      analysis: `O AGF Aarhus tem mostrado permeabilidade, marcando e sofrendo nas últimas quatro partidas. O Sabah chega motivado por quatro vitórias consecutivas em eliminatórias, mas sem clean sheet em quatro dos últimos cinco jogos fora. Este padrão aponta para golos nas duas balizas. Fonte da odd: Football Whispers. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8103,
      betNumber: '8103',
      betType: 'SINGLE',
      league: 'UEFA Europa League (Q)',
      homeTeam: 'Ferencváros',
      awayTeam: 'Górnik Zabrze',
      date: dateStr,
      time: '19:00',
      prediction: 'Ambas Marcam: Sim',
      confidence: 60,
      odds: 1.75,
      market: 'Ambas Marcam',
      winner: '',
      analysis: `O Ferencváros marcou em todos os quatro jogos de qualificação disputados até ao momento, mas sofreu golos em três deles. O Górnik Zabrze, por sua vez, vem de dois jogos consecutivos a faturar e a consentir. O mercado reflete esta tendência de resultados com golos para os dois lados. Fonte da odd: Football Whispers. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8104,
      betNumber: '8104',
      betType: 'SINGLE',
      league: 'UEFA Conference League (Q)',
      homeTeam: 'Panathinaikos',
      awayTeam: 'CSKA 1948',
      date: dateStr,
      time: '18:00',
      prediction: 'CSKA 1948 Handicap +1.75',
      confidence: 58,
      odds: 1.77,
      market: 'Handicap Asiático',
      winner: 'CSKA 1948',
      analysis: `O Panathinaikos é favorito em casa, mas o CSKA 1948 tem coberto o handicap +1.75 com notável consistência recente. Após superar o Spartak Trnava, os búlgaros têm argumentos para manter o jogo equilibrado e evitar uma derrota por margem alargada em Atenas. Fonte da odd: BetMGM. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    {
      id: 8105,
      betNumber: '8105',
      betType: 'SINGLE',
      league: 'UEFA Conference League (Q)',
      homeTeam: 'SK Brann',
      awayTeam: 'Apollon Limassol',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória SK Brann',
      confidence: 68,
      odds: 1.63,
      market: 'Resultado Final',
      winner: 'SK Brann',
      analysis: `O Brann apresenta um registo muito forte no seu estádio, com um rácio de golos de 11-9 nos últimos cinco jogos em casa e vitórias consistentes. O Apollon Limassol vacilou em duas das últimas cinco saídas (2V-1E-2D). O fator casa deve ser decisivo para a formação norueguesa. Fonte da odd: Oddschecker. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 8106,
      betNumber: '8106',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Fenerbahçe + SK Brann',
      awayTeam: 'Sturm Graz + Apollon',
      date: dateStr,
      time: 'Vários',
      prediction: 'Fenerbahçe Vence + Brann Vence',
      confidence: 55,
      odds: 2.22,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `Esta dupla combina a vitória do Fenerbahçe em casa (aprox. 1.36) com o triunfo do SK Brann (aprox. 1.63), perfazendo uma odd conjunta de valor. Ambas as equipas são fortes nos seus domínios e procuram resolver as eliminatórias perante os seus adeptos. Como em todas as múltiplas, o risco é acrescido. Fontes das odds: Oddschecker. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
