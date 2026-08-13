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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 13/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '13/08/2026';

  return [
    {
      id: 8701,
      betNumber: '8701',
      betType: 'SINGLE',
      league: 'UEFA Conference League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'FC Midtjylland',
      awayTeam: 'Bohemians',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória FC Midtjylland',
      confidence: 72,
      odds: 1.22,
      market: 'Resultado Final (90 min)',
      winner: 'FC Midtjylland',
      analysis: `O Midtjylland chega à segunda mão com vantagem de 2-0 construída em Dublin e joga no MCH Arena. A referência de mercado consultada aponta 1,22 para a vitória caseira, com Bohemians a 10,00; a diferença está alinhada com a eficácia dinamarquesa na primeira mão e com a necessidade de risco dos irlandeses. A equipa visitante marcou seis golos na qualificação, pelo que uma reação é plausível, mas o cenário-base continua a favorecer os anfitriões. Fonte de odds: Betshoot, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 72,
      drawPercent: 20,
      awayPercent: 8,
    },
    {
      id: 8702,
      betNumber: '8702',
      betType: 'SINGLE',
      league: 'UEFA Conference League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'FC Midtjylland',
      awayTeam: 'Bohemians',
      date: dateStr,
      time: '18:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 64,
      odds: 1.4,
      market: 'Total de Golos',
      winner: 'Mais de 2.5',
      analysis: `A linha de mais de 2,5 golos estava cotada a 1,40 na consulta de mercado. O 2-0 da primeira mão obriga o Bohemians a atacar, algo que pode abrir espaço para as transições do Midtjylland; os irlandeses também vêm de uma derrota por 3-1 frente ao Waterford. Há, contudo, um risco tático relevante: os anfitriões não precisam de forçar o ritmo enquanto protegem a eliminatória. Fonte de odds: Betshoot, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 64,
      drawPercent: 0,
      awayPercent: 36,
    },
    {
      id: 8703,
      betNumber: '8703',
      betType: 'SINGLE',
      league: 'UEFA Conference League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'FC Nordsjælland',
      awayTeam: 'Valur Reykjavík',
      date: dateStr,
      time: '18:00',
      prediction: 'Nordsjælland vence e Ambas Marcam',
      confidence: 45,
      odds: 2.75,
      market: 'Resultado + Ambas Marcam',
      winner: 'FC Nordsjælland + Ambas',
      analysis: `O Nordsjælland venceu por 2-0 na Islândia e marcou oito golos nos três jogos desta qualificação. O Valur precisa de reduzir a desvantagem e chega após vencer o Breidablik por 3-1, um contexto que favorece um encontro mais aberto. A odd de 2,75 remunera precisamente o risco adicional de exigir golo visitante; é uma seleção de valor moderado, não uma escolha conservadora. Fonte de odds: LeagueLane, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 45,
      drawPercent: 0,
      awayPercent: 55,
    },
    {
      id: 8704,
      betNumber: '8704',
      betType: 'SINGLE',
      league: 'UEFA Conference League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'Hammarby IF',
      awayTeam: 'Raków Częstochowa',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Hammarby IF',
      confidence: 57,
      odds: 1.67,
      market: 'Resultado Final (90 min)',
      winner: 'Hammarby IF',
      analysis: `A eliminatória está a 0-0, mas o Hammarby regressa a Estocolmo depois de bater o Häcken por 3-0 e com um registo caseiro recente muito forte. A cotação americana -149 da BetMGM corresponde a aproximadamente 1,67 em decimal e sugere favoritismo, não certeza. O Raków preparou a deslocação sem jogo de liga e tem capacidade para dificultar a partida, pelo que o empate permanece o principal risco. Fonte de odds: SportsGambler/BetMGM, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 57,
      drawPercent: 24,
      awayPercent: 19,
    },
    {
      id: 8705,
      betNumber: '8705',
      betType: 'SINGLE',
      league: 'UEFA Conference League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'Hammarby IF',
      awayTeam: 'Raków Częstochowa',
      date: dateStr,
      time: '18:00',
      prediction: 'Menos de 3.5 Golos',
      confidence: 64,
      odds: 1.42,
      market: 'Total de Golos',
      winner: 'Menos de 3.5',
      analysis: `Depois do 0-0 na Polónia, o total abaixo de 3,5 golos foi publicado a 1,42. Ambas as equipas têm incentivo para não oferecer uma desvantagem precoce numa eliminatória em aberto, e as tendências recentes da competição apontadas na prévia mantêm cinco jogos consecutivos de cada lado abaixo desta linha. Um golo cedo alteraria por completo o perfil do encontro, pelo que a exposição deve refletir essa volatilidade. Fonte de odds: Scores24, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 64,
      drawPercent: 0,
      awayPercent: 36,
    },
    {
      id: 8706,
      betNumber: '8706',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'FC Midtjylland + Hammarby IF',
      awayTeam: 'Bohemians + Raków Częstochowa',
      date: dateStr,
      time: '18:00 / 18:00',
      prediction: 'Vitória Midtjylland & Vitória Hammarby',
      confidence: 46,
      odds: 2.04,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'FC Midtjylland + Hammarby IF',
      analysis: `A dupla combina os dois favoritos caseiros: Midtjylland a 1,22 e Hammarby a aproximadamente 1,67, resultando numa odd combinada indicativa de 2,04. O primeiro protege uma vantagem de 2-0, enquanto o segundo decide uma eliminatória nivelada perante o seu público. Cada seleção tem riscos próprios — sobretudo empate em Herning ou em Estocolmo — e, por serem acumuladas, uma falha invalida todo o cupão. Odds de referência: Betshoot e SportsGambler/BetMGM, consulta de 13/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 46,
      drawPercent: 0,
      awayPercent: 54,
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
