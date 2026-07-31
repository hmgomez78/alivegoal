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
  const dateStr = '31/07/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'Scottish Premiership',
      homeTeam: 'Dundee United',
      awayTeam: 'Rangers',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Rangers',
      confidence: 65,
      odds: 1.53,
      market: 'Resultado Final',
      winner: 'Rangers',
      analysis: `A abrir a nova temporada escocesa, o Rangers desloca-se ao terreno do Dundee United. O mercado pré-jogo fixou a vitória visitante em cerca de 1.53 (implícito ~65%), refletindo o favoritismo natural da equipa de Ibrox, mesmo fora de casa, perante a diferença estrutural entre os plantéis. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 18,
      drawPercent: 17,
      awayPercent: 65,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'Norwegian Eliteserien',
      homeTeam: 'Bodø/Glimt',
      awayTeam: 'Lillestrøm',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Bodø/Glimt',
      confidence: 60,
      odds: 1.60,
      market: 'Resultado Final',
      winner: 'Bodø/Glimt',
      analysis: `Com uma notável taxa de vitórias caseiras no campeonato (86% segundo o modelo estatístico consultado), o Bodø/Glimt é o favorito natural na receção ao Lillestrøm. A odd de mercado ronda 1.60 (probabilidade implícita ~60%), o que oferece um valor interessante dado o forte registo da equipa da casa. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 22,
      awayPercent: 18,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'Austrian Bundesliga',
      homeTeam: 'LASK',
      awayTeam: 'Grazer AK',
      date: dateStr,
      time: '18:30',
      prediction: 'Vitória LASK',
      confidence: 58,
      odds: 1.66,
      market: 'Resultado Final',
      winner: 'LASK',
      analysis: `O LASK recebe o Grazer AK no arranque da liga austríaca. O mercado de referência aponta o favoritismo caseiro a 1.66, traduzindo uma probabilidade de vitória de cerca de 58%. O fator casa e a experiência competitiva do LASK justificam esta posição frente ao adversário de Graz. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 26,
      awayPercent: 16,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Sporting CP',
      awayTeam: 'Nottingham Forest',
      date: dateStr,
      time: '19:00',
      prediction: 'Sporting CP ou Empate (1X)',
      confidence: 72,
      odds: 1.36,
      market: 'Dupla Hipótese',
      winner: 'Sporting CP',
      analysis: `Neste teste de pré-época para ambas as equipas, o Sporting apresenta-se como favorito. A vitória leonina está cotada acima do par, mas a dupla hipótese (1X) a 1.36 oferece uma segurança sólida (probabilidade implícita >70%) num jogo amigável, onde as rotações podem nivelar a partida na segunda parte. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 50,
      drawPercent: 22,
      awayPercent: 28,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'Amigável de Clubes',
      homeTeam: 'Juventus',
      awayTeam: 'Nice',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Juventus',
      confidence: 64,
      odds: 1.57,
      market: 'Resultado Final',
      winner: 'Juventus',
      analysis: `A Juventus defronta o Nice num encontro de preparação. A vitória italiana foi listada perto de 1.57 nas cotações de referência, equivalente a aproximadamente 64% de probabilidade implícita antes da margem. Mesmo em pré-época, a qualidade individual e o fator de favoritismo colocam a equipa italiana como seleção principal, embora as rotações aconselhem prudência. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 64,
      drawPercent: 21,
      awayPercent: 15,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'Scottish Prem / Norwegian Elit',
      homeTeam: 'Rangers + Bodø/Glimt',
      awayTeam: 'Dundee Utd + Lillestrøm',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Rangers + Vitória Bodø/Glimt',
      confidence: 39,
      odds: 2.45,
      market: 'Combinada',
      winner: '',
      analysis: `Uma dupla baseada em dois favoritos sólidos em competições oficiais de hoje: Rangers (1.53) fora de portas e Bodø/Glimt (1.60) em casa. A cotação combinada ronda 2.45 (probabilidade implícita de ~39%). Como em qualquer aposta múltipla, a variância aumenta substancialmente. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
