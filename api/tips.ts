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
  'Aposte com responsabilidade. As odds indicadas foram consultadas em 02/08/2026, podem mudar antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '02/08/2026';

  return [
    {
      id: 7001,
      betNumber: '7001',
      betType: 'SINGLE',
      league: 'Club Friendly',
      homeTeam: 'FC Volendam',
      awayTeam: 'Ajax',
      date: dateStr,
      time: '13:30',
      prediction: 'Vitória Ajax',
      confidence: 75,
      odds: 1.33,
      market: 'Resultado Final',
      winner: 'Ajax',
      analysis: `O Ajax entra como favorito claro no mercado para o amigável em Volendam, com odd decimal 1.33 verificada antes do jogo. A probabilidade implícita ronda 75%, mas a natureza de pré-época exige prudência por causa da rotação e da gestão de minutos. Fonte de odd: Oddslot. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 12,
      drawPercent: 13,
      awayPercent: 75,
    },
    {
      id: 7002,
      betNumber: '7002',
      betType: 'SINGLE',
      league: 'Club Friendly',
      homeTeam: 'Feyenoord',
      awayTeam: 'Atalanta',
      date: dateStr,
      time: '14:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 65,
      odds: 1.53,
      market: 'Mais de 2.5',
      winner: '',
      analysis: `Feyenoord e Atalanta oferecem um duelo de pré-época entre equipas com vocação ofensiva. O mercado de mais de 2.5 golos estava cotado a 1.53, equivalente a uma probabilidade implícita próxima de 65%, e surge como alternativa ao resultado num contexto em que as substituições podem alterar o equilíbrio do jogo. Fonte de odd: Scores24. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 7003,
      betNumber: '7003',
      betType: 'SINGLE',
      league: 'Club Friendly',
      homeTeam: 'Feyenoord',
      awayTeam: 'Atalanta',
      date: dateStr,
      time: '14:00',
      prediction: 'Ambas Marcam',
      confidence: 62,
      odds: 1.61,
      market: 'Ambas Marcam',
      winner: '',
      analysis: `No mesmo encontro, o mercado de ambas marcam era negociado a -163, convertido para 1.61 em odds decimais. A seleção evita escolher um vencedor num amigável equilibrado e assume que as duas equipas encontrarão pelo menos uma oportunidade clara para marcar. Fonte de odd: FootballPredictions. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
    {
      id: 7004,
      betNumber: '7004',
      betType: 'SINGLE',
      league: 'Club Friendly',
      homeTeam: 'Liverpool',
      awayTeam: 'Leeds United',
      date: dateStr,
      time: '21:00',
      prediction: 'Vitória Liverpool',
      confidence: 62,
      odds: 1.62,
      market: 'Resultado Final',
      winner: 'Liverpool',
      analysis: `O Liverpool é apontado como favorito no amigável com o Leeds, com 8/13 (1.62) para vencer. A seleção apoia-se no favoritismo de mercado, não numa certeza de escalações: em jogos de preparação, alterações ao intervalo podem aumentar significativamente a variância. Fonte de odd: Football Whispers. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 62,
      drawPercent: 20,
      awayPercent: 18,
    },
    {
      id: 7005,
      betNumber: '7005',
      betType: 'SINGLE',
      league: 'Scottish Premiership',
      homeTeam: 'Hibernian',
      awayTeam: 'Motherwell',
      date: dateStr,
      time: '16:30',
      prediction: 'Vitória Hibernian',
      confidence: 41,
      odds: 2.30,
      market: 'Resultado Final',
      winner: 'Hibernian',
      analysis: `A odd mais alta observada para uma vitória do Hibernian foi 13/10, ou 2.30 em formato decimal. O mercado apresentado pela Oddschecker atribui cerca de 41% ao triunfo caseiro, perante 26% para o empate e 32% para o Motherwell; é, por isso, uma seleção de valor potencial e não uma escolha de baixa variância. Fonte de odd: Oddschecker. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 41,
      drawPercent: 26,
      awayPercent: 32,
    },
    {
      id: 7006,
      betNumber: '7006',
      betType: 'DOUBLE',
      league: 'Club Friendly',
      homeTeam: 'FC Volendam + Liverpool',
      awayTeam: 'Ajax + Leeds United',
      date: dateStr,
      time: 'Vários',
      prediction: 'Ajax Vence + Liverpool Vence',
      confidence: 46,
      odds: 2.15,
      market: 'Combinada',
      winner: '',
      analysis: `A dupla combina Ajax a 1.33 frente ao Volendam e Liverpool a 1.62 contra o Leeds, resultando numa odd composta de 2.15. A probabilidade teórica conjunta é mais baixa do que a de cada perna isolada, por isso esta opção é destinada apenas a perfis que aceitem maior risco. Fontes de odds: Oddslot e Football Whispers. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
