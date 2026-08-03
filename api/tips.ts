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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds foram consultadas em 03/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '03/08/2026';

  return [
    {
      id: 8001,
      betNumber: '8001',
      betType: 'SINGLE',
      league: 'Scottish Premiership',
      homeTeam: 'Celtic',
      awayTeam: 'Dundee',
      date: dateStr,
      time: '19:30',
      prediction: 'Vitória Celtic',
      confidence: 75,
      odds: 1.22,
      market: 'Resultado Final',
      winner: 'Celtic',
      analysis: `O Celtic abre a defesa do título em casa contra um Dundee que venceu apenas duas das 19 deslocações da liga na época passada. Os campeões fecharam a campanha anterior com sete vitórias consecutivas, e a linha 1X2 observada colocava o Celtic em 1.22, com probabilidade de mercado próxima de 75%. É uma seleção de retorno baixo e depende da confirmação do favoritismo. Fonte da odd: Racing Post / Oddschecker. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    {
      id: 8002,
      betNumber: '8002',
      betType: 'SINGLE',
      league: 'Scottish Premiership',
      homeTeam: 'Celtic',
      awayTeam: 'Dundee',
      date: dateStr,
      time: '19:30',
      prediction: 'Mais de 3.5 Golos',
      confidence: 56,
      odds: 1.80,
      market: 'Mais de 3.5 Golos',
      winner: '',
      analysis: `A leitura de golos apoia-se no poder ofensivo caseiro: o Celtic marcou 43 golos em 19 jogos de liga no seu estádio na última época. Treze dos últimos 15 confrontos entre estes clubes superaram 2.5 golos, e a referência de pré-jogo para mais de 3.5 estava em 1.80. A exigência de quatro golos eleva a variância, pelo que a confiança é deliberadamente moderada. Fonte da odd: LiveScore Bet. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8003,
      betNumber: '8003',
      betType: 'SINGLE',
      league: 'Ukrainian Premier League',
      homeTeam: 'Shakhtar Donetsk',
      awayTeam: 'Kudrivka',
      date: dateStr,
      time: '16:00',
      prediction: 'Vitória Shakhtar Donetsk',
      confidence: 82,
      odds: 1.14,
      market: 'Resultado Final',
      winner: 'Shakhtar Donetsk',
      analysis: `O mercado pré-jogo atribui um favoritismo muito vincado ao Shakhtar: 1.14 para a vitória caseira, contra 7.80 no empate e 15.00 no triunfo do Kudrivka. A seleção segue essa leitura coletiva do mercado, mas a odd curta limita o retorno e não elimina o risco associado a um jogo de início de campeonato. Fonte da odd: BetKing. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 82,
      drawPercent: 12,
      awayPercent: 6,
    },
    {
      id: 8004,
      betNumber: '8004',
      betType: 'SINGLE',
      league: 'Veikkausliiga',
      homeTeam: 'SJK',
      awayTeam: 'HJK',
      date: dateStr,
      time: '17:00',
      prediction: 'HJK ou Empate',
      confidence: 63,
      odds: 1.33,
      market: 'Dupla Hipótese X2',
      winner: 'HJK ou Empate',
      analysis: `O HJK chega com quatro vitórias nos últimos cinco encontros, 11 golos marcados e apenas três sofridos no período indicado pela prévia de mercado. O SJK, por contraste, registou uma vitória, um empate e três derrotas nos cinco jogos anteriores. A dupla hipótese X2 protege contra o empate e estava cotada a 1.33; continua a perder se o SJK vencer. Fonte da odd e dados de forma: Oddslot / bet365. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 30,
      drawPercent: 27,
      awayPercent: 43,
    },
    {
      id: 8005,
      betNumber: '8005',
      betType: 'SINGLE',
      league: 'Swedish Allsvenskan',
      homeTeam: 'Djurgården',
      awayTeam: 'Västerås',
      date: dateStr,
      time: '18:00',
      prediction: 'Menos de 3.5 Golos',
      confidence: 57,
      odds: 1.75,
      market: 'Menos de 3.5 Golos',
      winner: '',
      analysis: `As duas equipas chegaram ao jogo depois de três partidas consecutivas sem sofrer golo, segundo a prévia estatística. O Djurgården ficou abaixo da linha de 3.5 golos em oito de 13 jogos de liga, e a cotação de referência para menos de 3.5 era 1.75. A seleção procura um encontro controlado, mas quatro ou mais golos anulam a aposta. Fonte da odd e análise: MightyTips. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 8006,
      betNumber: '8006',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Celtic + Shakhtar Donetsk',
      awayTeam: 'Dundee + Kudrivka',
      date: dateStr,
      time: 'Vários',
      prediction: 'Celtic Vence + Shakhtar Donetsk Vence',
      confidence: 62,
      odds: 1.39,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A acumulada une duas vitórias caseiras curtas: Celtic a 1.22 e Shakhtar Donetsk a 1.14, para uma odd combinada aproximada de 1.39 antes de possíveis alterações de preço. A confiança é inferior à de cada seleção individual porque ambas precisam de acontecer; qualquer surpresa invalida o cupão. Fontes das odds: Racing Post / Oddschecker e BetKing. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
