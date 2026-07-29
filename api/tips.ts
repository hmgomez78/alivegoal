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
  'Aposte com responsabilidade. Odds consultadas antes do pontapé de saída podem mudar e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '29/07/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Crvena Zvezda',
      awayTeam: 'Larne',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Crvena Zvezda',
      confidence: 88,
      odds: 1.06,
      market: 'Resultado final',
      winner: 'Crvena Zvezda',
      analysis: `O Crvena Zvezda chega a Belgrado com 4-0 de vantagem. Na primeira mão somou 69% de posse, 27 remates e 15 à baliza, enquanto o Larne só produziu um remate. A cotação 1.06 foi observada no mercado pré-jogo; depois de normalizar as probabilidades 1X2, o favoritismo caseiro ronda 88%. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 88,
      drawPercent: 8,
      awayPercent: 4,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Lech Poznań',
      awayTeam: 'Aarhus',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Lech Poznań',
      confidence: 58,
      odds: 1.73,
      market: 'Resultado final',
      winner: 'Lech Poznań',
      analysis: `O Lech venceu a primeira mão por 4-1 e recebe agora o Aarhus em Poznań. O mercado pré-jogo fixou a vitória do Lech em 1.73, equivalente a cerca de 58% de probabilidade implícita. A vantagem de três golos reduz a necessidade de risco, mas a solidez recente da equipa polaca sustenta o favoritismo. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 27,
      awayPercent: 15,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Kairat Almaty',
      awayTeam: 'Omonia',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Kairat Almaty',
      confidence: 45,
      odds: 2.23,
      market: 'Resultado final',
      winner: 'Kairat Almaty',
      analysis: `O Kairat perdeu 1-0 em Nicósia e precisa de vencer perante os seus adeptos. A cotação de mercado 2.23 torna os cazaques favoritos ligeiros em casa, com 45% de probabilidade implícita. A equipa tem de assumir a iniciativa, pelo que esta é uma seleção de valor e não uma escolha de baixa variância. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Kauno Žalgiris',
      awayTeam: 'Klaksvík',
      date: dateStr,
      time: '18:00',
      prediction: 'Klaksvík ou Empate (X2)',
      confidence: 61,
      odds: 2.20,
      market: 'Dupla hipótese',
      winner: 'Klaksvík',
      analysis: `A primeira mão terminou 0-0. O modelo de mercado consultado atribui 61% de probabilidade a Klaksvík evitar a derrota, com cotação 2.20 para o X2; a equipa das Ilhas Faroé chega com o empate da primeira mão e não precisa de se expor cedo. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 39,
      drawPercent: 25,
      awayPercent: 36,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Universitatea Craiova',
      awayTeam: 'Levski Sofia',
      date: dateStr,
      time: '19:30',
      prediction: 'Menos de 2.5 golos',
      confidence: 58,
      odds: 1.73,
      market: 'Total de golos',
      winner: '',
      analysis: `O Levski chega com vantagem de 1-0 e uma série de 12 jogos sem perder, enquanto o Craiova precisa de recuperar sem se desequilibrar. O Under 2.5 foi cotado a 1.73 no mercado pré-jogo, correspondente a aproximadamente 58% de probabilidade implícita. O contexto de eliminatória favorece um encontro controlado. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 42,
      drawPercent: 31,
      awayPercent: 27,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Crvena Zvezda + Lech Poznań',
      awayTeam: 'Larne + Aarhus',
      date: dateStr,
      time: '19:00',
      prediction: 'Crvena Zvezda vence + Lech Poznań vence',
      confidence: 55,
      odds: 1.83,
      market: 'Combinada',
      winner: '',
      analysis: `Dupla calculada a partir das odds de mercado Crvena Zvezda 1.06 e Lech Poznań 1.73 (1.06 × 1.73 = 1.83). A probabilidade implícita combinada é de cerca de 55%, e ambos os favoritos chegam às segundas mãos com vantagem clara. Uma múltipla aumenta a variância: a falha de uma seleção perde a aposta inteira. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
