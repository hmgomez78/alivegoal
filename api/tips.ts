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
  const dateStr = '01/08/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'MLS',
      homeTeam: 'Chicago Fire',
      awayTeam: 'Charlotte FC',
      date: dateStr,
      time: '01:30',
      prediction: 'Vitória Chicago Fire',
      confidence: 66,
      odds: 1.50,
      market: 'Resultado Final',
      winner: 'Chicago Fire',
      analysis: `O Chicago Fire assume claro favoritismo em casa frente a um Charlotte irregular fora de portas. A odd de 1.50 reflete a urgência do Fire em somar pontos na sua conferência e a linha de mercado sustenta esta forte probabilidade de triunfo caseiro. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 66,
      drawPercent: 20,
      awayPercent: 14,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'MLS',
      homeTeam: 'Inter Miami',
      awayTeam: 'Columbus Crew',
      date: dateStr,
      time: '00:30',
      prediction: 'Vitória Inter Miami',
      confidence: 61,
      odds: 1.63,
      market: 'Resultado Final',
      winner: 'Inter Miami',
      analysis: `Mesmo frente ao campeão em título, o Inter Miami demonstra um poderio ofensivo avassalador em casa. A linha aponta para um jogo de alta voltagem, onde a qualidade individual deverá ditar a vitória de Miami perante o seu público. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 61,
      drawPercent: 22,
      awayPercent: 17,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'MLS',
      homeTeam: 'Philadelphia Union',
      awayTeam: 'Atlanta United FC',
      date: dateStr,
      time: '00:30',
      prediction: 'Vitória Philadelphia Union',
      confidence: 60,
      odds: 1.67,
      market: 'Resultado Final',
      winner: 'Philadelphia Union',
      analysis: `O Subaru Park costuma ser uma fortaleza para o Union. Perante um Atlanta United que sofre defensivamente fora de casa, o Philadelphia tem a estrutura necessária para impor o seu ritmo e garantir os três pontos numa odd com valor sustentado. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 23,
      awayPercent: 17,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Club Friendly',
      homeTeam: 'Girona',
      awayTeam: 'Arsenal',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Arsenal',
      confidence: 54,
      odds: 1.83,
      market: 'Resultado Final',
      winner: 'Arsenal',
      analysis: `Em jogo de preparação, a rotação é esperada, mas a profundidade do plantel de Mikel Arteta dá clara vantagem aos londrinos. O Girona, apesar da excelente última época, está a reconstruir a equipa e deverá sentir a diferença de intensidade imposta pelo Arsenal. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 25,
      drawPercent: 21,
      awayPercent: 54,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'MLS',
      homeTeam: 'FC Cincinnati',
      awayTeam: 'San Jose Earthquakes',
      date: dateStr,
      time: '00:30',
      prediction: 'Vitória FC Cincinnati',
      confidence: 53,
      odds: 1.87,
      market: 'Resultado Final',
      winner: 'FC Cincinnati',
      analysis: `O FC Cincinnati procura cimentar a sua posição de topo na MLS. Enfrentando uns Earthquakes inconstantes, o fator casa no TQL Stadium é determinante. A linha de mercado sugere um jogo disputado, mas com favoritismo claro para a equipa local. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 53,
      drawPercent: 25,
      awayPercent: 22,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'MLS / Club Friendly',
      homeTeam: 'Vancouver Whitecaps + Man City',
      awayTeam: 'LAFC + Inter Milan',
      date: dateStr,
      time: 'Vários',
      prediction: 'Vitória Vancouver + Vitória Man City',
      confidence: 27,
      odds: 3.72,
      market: 'Combinada',
      winner: '',
      analysis: `Um acumulador que combina a solidez caseira dos Whitecaps contra o LAFC na MLS (1.91) e a supremacia tática do Manchester City no amigável contra o Inter (1.95). Ambos são favoritos nos seus embates, criando uma dupla atrativa para perfil de risco moderado. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
