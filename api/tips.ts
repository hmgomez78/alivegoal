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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 11/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '11/08/2026';

  return [
    {
      id: 8501,
      betNumber: '8501',
      betType: 'SINGLE',
      league: 'Carabao Cup',
      homeTeam: 'Sheffield Wednesday',
      awayTeam: 'Wrexham',
      date: dateStr,
      time: '19:45',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 65,
      odds: 1.85,
      market: 'Ambas Marcam',
      winner: 'Ambas',
      analysis: `Um embate intrigante na Taça da Liga onde o Sheffield Wednesday do Championship recebe o ambicioso Wrexham. Espera-se um jogo aberto com oportunidades de parte a parte. A cotação de 1.85 para Ambas Marcam apresenta valor, considerando o historial recente das equipas na competição. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    {
      id: 8502,
      betNumber: '8502',
      betType: 'SINGLE',
      league: 'Carabao Cup',
      homeTeam: 'Stoke City',
      awayTeam: 'Hull City',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória Stoke City',
      confidence: 55,
      odds: 2.10,
      market: 'Resultado Final',
      winner: 'Stoke City',
      analysis: `Confronto entre equipas do mesmo escalão, onde o fator casa pode ser determinante. O Stoke City tem mostrado solidez defensiva no seu reduto, o que justifica a ligeira preferência nas probabilidades. A odd de 2.10 reflete o equilíbrio, mas oferece uma oportunidade atrativa para os visitados. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 8503,
      betNumber: '8503',
      betType: 'SINGLE',
      league: 'Carabao Cup',
      homeTeam: 'Swansea City',
      awayTeam: 'Preston',
      date: dateStr,
      time: '19:45',
      prediction: 'Menos de 2.5 Golos',
      confidence: 70,
      odds: 1.65,
      market: 'Total de Golos',
      winner: 'Menos de 2.5',
      analysis: `Historicamente, os encontros entre Swansea e Preston tendem a ser muito disputados e com poucos golos. Ambas as equipas valorizam a organização tática em jogos a eliminar. A linha de Menos de 2.5 golos a 1.65 é a nossa escolha mais segura para este encontro. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
    },
    {
      id: 8504,
      betNumber: '8504',
      betType: 'SINGLE',
      league: 'Carabao Cup',
      homeTeam: 'Cardiff City',
      awayTeam: 'Bristol City',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória Cardiff City',
      confidence: 52,
      odds: 2.30,
      market: 'Resultado Final',
      winner: 'Cardiff City',
      analysis: `Um clássico confronto regional onde a intensidade será máxima. O Cardiff joga em casa e procura impor-se perante o seu público. A cotação de 2.30 indica um risco moderado, mas o histórico recente de confrontos diretos no País de Gales favorece a equipa da casa. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 52,
      drawPercent: 28,
      awayPercent: 20,
    },
    {
      id: 8505,
      betNumber: '8505',
      betType: 'SINGLE',
      league: 'Amigável',
      homeTeam: 'Fluminense RJ',
      awayTeam: 'Independiente Rivadavia',
      date: dateStr,
      time: '23:00',
      prediction: 'Vitória Fluminense RJ',
      confidence: 75,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Fluminense RJ',
      analysis: `Neste encontro particular, a superioridade técnica e a profundidade do plantel do Fluminense deverão fazer a diferença frente ao conjunto argentino. A odd de 1.45 reflete o favoritismo claro dos brasileiros, sendo uma excelente opção para compor múltiplas. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
    },
    {
      id: 8506,
      betNumber: '8506',
      betType: 'DOUBLE',
      league: 'Múltipla',
      homeTeam: 'Fluminense + Swansea/Preston',
      awayTeam: 'Dupla',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória Fluminense & Menos de 2.5 (Swansea)',
      confidence: 60,
      odds: 2.39,
      market: 'Acumulador',
      winner: 'Ambos',
      analysis: `Combinando a provável vitória do Fluminense (1.45) com a tendência de poucos golos no jogo do Swansea (1.65), obtemos uma dupla de valor a rondar os 2.39. Uma estratégia equilibrada que junta um claro favorito a um padrão estatístico forte. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 0,
      awayPercent: 40,
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
