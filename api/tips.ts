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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 10/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '10/08/2026';

  return [
    {
      id: 8401,
      betNumber: '8401',
      betType: 'SINGLE',
      league: 'Carabao Cup',
      homeTeam: 'Plymouth',
      awayTeam: 'Exeter',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Plymouth',
      confidence: 70,
      odds: 1.36,
      market: 'Resultado Final',
      winner: 'Plymouth',
      analysis: `O Plymouth Argyle recebe o Exeter City como claro favorito nesta eliminatória da Taça da Liga. A cotação de 1.36 (4/11) na Sporting Life reflete o favoritismo caseiro, com a linha da ESPN a apontar -235. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
    },
    {
      id: 8402,
      betNumber: '8402',
      betType: 'SINGLE',
      league: 'Primeira Liga',
      homeTeam: 'Santa Clara',
      awayTeam: 'Nacional',
      date: dateStr,
      time: '20:15',
      prediction: 'Vitória Santa Clara',
      confidence: 52,
      odds: 1.83,
      market: 'Resultado Final',
      winner: 'Santa Clara',
      analysis: `No embate insular da Primeira Liga, o Santa Clara tem o fator casa a seu favor. A odd de 1.83 (5/6) sinaliza uma probabilidade implícita em torno dos 54%, sendo uma opção com valor interessante. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 52,
      drawPercent: 28,
      awayPercent: 20,
    },
    {
      id: 8403,
      betNumber: '8403',
      betType: 'SINGLE',
      league: 'Allsvenskan',
      homeTeam: 'Sirius',
      awayTeam: 'Brommapojkarna',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Sirius',
      confidence: 75,
      odds: 1.29,
      market: 'Resultado Final',
      winner: 'Sirius',
      analysis: `O Sirius (13V-2E-0D em casa segundo os registos da ESPN) é fortemente favorito contra o Brommapojkarna. A odd de 1.29 (2/7) espelha esta superioridade e a consistência da equipa da casa. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    {
      id: 8404,
      betNumber: '8404',
      betType: 'SINGLE',
      league: 'Allsvenskan',
      homeTeam: 'Västerås',
      awayTeam: 'Djurgården',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Djurgården',
      confidence: 55,
      odds: 1.70,
      market: 'Resultado Final',
      winner: 'Djurgården',
      analysis: `Apesar de jogar fora, o Djurgården defronta um Västerås com dificuldades de regularidade. A odd de 1.70 (7/10) representa um risco calculado com base na superioridade técnica dos visitantes. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 25,
      drawPercent: 20,
      awayPercent: 55,
    },
    {
      id: 8405,
      betNumber: '8405',
      betType: 'SINGLE',
      league: 'Brasileirão Série B',
      homeTeam: 'Goiás',
      awayTeam: 'Londrina',
      date: dateStr,
      time: '22:30',
      prediction: 'Vitória Goiás',
      confidence: 54,
      odds: 1.77,
      market: 'Resultado Final',
      winner: 'Goiás',
      analysis: `O Goiás recebe o Londrina e procura impor o fator casa na Série B. A linha da ESPN em -130 (aprox. 1.77) confere favoritismo à equipa da casa, numa liga tradicionalmente forte para os visitados. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 54,
      drawPercent: 28,
      awayPercent: 18,
    },
    {
      id: 8406,
      betNumber: '8406',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'Plymouth + Sirius',
      awayTeam: 'Dupla',
      date: dateStr,
      time: '18:00',
      prediction: 'Dupla: Plymouth & Sirius',
      confidence: 65,
      odds: 1.75,
      market: 'Acumulador (1X2)',
      winner: 'Ambos',
      analysis: `Combinar as vitórias de Plymouth (1.36) e Sirius (1.29) resulta numa odd acumulada de aproximadamente 1.75. Ambas as equipas são fortes favoritas nos respetivos jogos em casa, criando uma aposta dupla sólida. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 65,
      drawPercent: 0,
      awayPercent: 35,
    }
  ];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

  const tips = getFallbackTips();

  return res.status(200).json({
    source: "fallback",
    count: tips.length,
    updated: new Date().toISOString(),
    items: tips,
    tips: tips
  });
}
