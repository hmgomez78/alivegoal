import { VercelRequest, VercelResponse } from '@vercel/node';

export interface BettingTip {
  id: number;
  betNumber: string;
  betType: 'SINGLE' | 'DOUBLE' | 'TREBLE' | 'ACCUMULATOR';
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  prediction: string;
  confidence: number;
  odds: number;
  market: string;
  winner: string;
  analysis: string;
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
}

const RESPONSIBLE_GAMBLING_NOTE = "Apostas envolvem risco financeiro. Jogue com responsabilidade (+18).";

function getFallbackTips(): BettingTip[] {
  const dateStr = '21/08/2026';
  
  return [
    {
      id: 9307,
      betNumber: '9307',
      betType: 'SINGLE',
      league: 'La Liga',
      homeTeam: 'Villarreal',
      awayTeam: 'Celta Vigo',
      date: dateStr,
      time: '20:30',
      prediction: 'Villarreal Vence',
      confidence: 55,
      odds: 1.80,
      market: 'Resultado Final (90 min)',
      winner: 'Villarreal',
      analysis: `O Villarreal joga em casa e procura impor o seu favoritismo perante o Celta Vigo. Com base nas odds de mercado em torno de 1.80, a probabilidade implícita de vitória caseira ronda os 55%. O fator casa e a necessidade de somar pontos no início da liga justificam a aposta. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 9308,
      betNumber: '9308',
      betType: 'SINGLE',
      league: 'Bundesliga',
      homeTeam: 'Borussia M.Gladbach',
      awayTeam: 'Bayer Leverkusen',
      date: dateStr,
      time: '19:30',
      prediction: 'Bayer Leverkusen Vence',
      confidence: 60,
      odds: 1.65,
      market: 'Resultado Final (90 min)',
      winner: 'Bayer Leverkusen',
      analysis: `O atual campeão alemão arranca a defesa do título fora de portas, mas mantém um favoritismo claro. Com odds a 1.65, a probabilidade de vitória forasteira situa-se nos 60%. O poder de fogo do Leverkusen deve ser suficiente para superar a equipa da casa. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 20,
      drawPercent: 20,
      awayPercent: 60,
    },
    {
      id: 9309,
      betNumber: '9309',
      betType: 'SINGLE',
      league: 'Ligue 1',
      homeTeam: 'PSG',
      awayTeam: 'Montpellier',
      date: dateStr,
      time: '19:45',
      prediction: 'PSG -1.5 Handicap Asiático',
      confidence: 65,
      odds: 1.75,
      market: 'Handicap Asiático',
      winner: 'PSG',
      analysis: `O PSG joga em casa e é largamente favorito contra o Montpellier. Apostar no handicap asiático -1.5 oferece melhor valor (1.75) face à vitória simples. Espera-se um domínio completo dos parisienses e uma vitória por dois ou mais golos de margem. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    {
      id: 9310,
      betNumber: '9310',
      betType: 'SINGLE',
      league: 'La Liga',
      homeTeam: 'Getafe',
      awayTeam: 'Real Sociedad',
      date: dateStr,
      time: '18:00',
      prediction: 'Menos de 2,5 golos',
      confidence: 58,
      odds: 1.55,
      market: 'Total de golos — Menos de 2,5',
      winner: 'Menos de 2,5 golos',
      analysis: `Historicamente, os jogos do Getafe em casa são fechados e táticos. A Real Sociedad também apresenta solidez defensiva. A linha de menos de 2,5 golos a 1.55 reflete a expectativa de um jogo com poucas oportunidades de golo. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 30,
      drawPercent: 40,
      awayPercent: 30,
    },
    {
      id: 9311,
      betNumber: '9311',
      betType: 'SINGLE',
      league: 'Championship',
      homeTeam: 'Sheffield Wednesday',
      awayTeam: 'Leeds United',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas as Equipas Marcam (Sim)',
      confidence: 52,
      odds: 1.85,
      market: 'Ambas Marcam',
      winner: 'Ambas Marcam (Sim)',
      analysis: `Um clássico de Yorkshire na Championship onde ambas as equipas têm demonstrado capacidade ofensiva mas também fragilidades defensivas. O mercado de BTTS (Sim) a 1.85 apresenta valor num jogo que se prevê aberto e disputado. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 35,
      drawPercent: 25,
      awayPercent: 40,
    },
    {
      id: 9312,
      betNumber: '9312',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Villarreal + PSG',
      awayTeam: 'Celta Vigo + Montpellier',
      date: dateStr,
      time: '20:30 / 19:45',
      prediction: 'Villarreal Vence + PSG Vence',
      confidence: 48,
      odds: 2.16,
      market: 'Acumulador — 2 seleções',
      winner: 'Villarreal + PSG',
      analysis: `A dupla junta a vitória do Villarreal em casa (1.80) à vitória simples do PSG (1.20), resultando numa odd combinada de 2.16. É uma aposta que combina um claro favorito (PSG) com um favorito caseiro na La Liga. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 48,
      drawPercent: 0,
      awayPercent: 52,
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
    source: 'fallback',
    count: tips.length,
    updated: new Date().toISOString(),
    items: tips,
    tips
  });
}
