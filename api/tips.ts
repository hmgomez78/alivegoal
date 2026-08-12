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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 12/08/2026, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '12/08/2026';

  return [
    {
      id: 8601,
      betNumber: '8601',
      betType: 'SINGLE',
      league: 'Supertaça Europeia',
      homeTeam: 'Paris Saint-Germain',
      awayTeam: 'Aston Villa',
      date: dateStr,
      time: '21:00',
      prediction: 'Vitória Paris Saint-Germain',
      confidence: 58,
      odds: 1.73,
      market: 'Resultado Final (90 min)',
      winner: 'Paris Saint-Germain',
      analysis: `O PSG é favorito no mercado para a final de Salzburgo e chega como campeão europeu. A equipa marcou em cada um dos seus seis jogos recentes, enquanto o Aston Villa apresenta uma série positiva e capacidade para tornar o jogo competitivo. A seleção privilegia a qualidade individual e a experiência do PSG em jogos de troféu, mas reconhece um risco real de equilíbrio. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 23,
      awayPercent: 19,
    },
    {
      id: 8602,
      betNumber: '8602',
      betType: 'SINGLE',
      league: 'Supertaça Europeia',
      homeTeam: 'Paris Saint-Germain',
      awayTeam: 'Aston Villa',
      date: dateStr,
      time: '21:00',
      prediction: 'Ambas as Equipas Marcam — Sim',
      confidence: 57,
      odds: 1.75,
      market: 'Ambas Marcam',
      winner: 'Ambas',
      analysis: `A final reúne duas equipas com argumentos ofensivos. O PSG marcou em todos os seis encontros mais recentes, e os últimos seis jogos do Aston Villa tiveram pelo menos três golos, segundo a prévia de mercado consultada. Com Villa motivado pela primeira Supertaça desde 1982, o cenário de um golo visitante aumenta o interesse deste mercado, embora uma final possa impor maior cautela tática. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 57,
      drawPercent: 0,
      awayPercent: 43,
    },
    {
      id: 8603,
      betNumber: '8603',
      betType: 'SINGLE',
      league: 'CONMEBOL Libertadores — Oitavos, 1.ª mão',
      homeTeam: 'Palmeiras',
      awayTeam: 'Cerro Porteño',
      date: dateStr,
      time: '22:00',
      prediction: 'Vitória Palmeiras',
      confidence: 63,
      odds: 1.30,
      market: 'Resultado Final (90 min)',
      winner: 'Palmeiras',
      analysis: `O Palmeiras lidera o Brasileirão e recebe a primeira mão no Allianz Parque, fatores que sustentam o favoritismo de mercado. Ainda assim, o Cerro Porteño venceu os brasileiros fora na fase de grupos e sofreu apenas dois golos na campanha continental; por isso, a odd curta exige disciplina de stake. A confiança reflete a vantagem caseira, não uma expectativa de jogo fácil. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 63,
      drawPercent: 22,
      awayPercent: 15,
    },
    {
      id: 8604,
      betNumber: '8604',
      betType: 'SINGLE',
      league: 'CONMEBOL Libertadores — Oitavos, 1.ª mão',
      homeTeam: 'Palmeiras',
      awayTeam: 'Cerro Porteño',
      date: dateStr,
      time: '22:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 52,
      odds: 1.95,
      market: 'Total de Golos',
      winner: 'Mais de 2.5',
      analysis: `O mercado oferece uma cotação próxima de par para três ou mais golos. O Palmeiras registou jogos com três ou mais golos em cinco dos últimos seis confrontos, mas o perfil defensivo do Cerro Porteño adiciona volatilidade e impede que esta seja uma escolha conservadora. É uma seleção de valor moderado, adequada apenas a uma exposição controlada. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 52,
      drawPercent: 0,
      awayPercent: 48,
    },
    {
      id: 8605,
      betNumber: '8605',
      betType: 'SINGLE',
      league: 'CONMEBOL Libertadores — Oitavos, 1.ª mão',
      homeTeam: 'Platense',
      awayTeam: 'Coquimbo Unido',
      date: dateStr,
      time: '22:00',
      prediction: 'Vitória Platense',
      confidence: 53,
      odds: 1.90,
      market: 'Resultado Final (90 min)',
      winner: 'Platense',
      analysis: `O Platense joga em Buenos Aires depois de vencer o Independiente fora no torneio argentino. O Coquimbo Unido tem criado ocasiões, mas sofreu golos em cinco dos últimos seis jogos; a escolha favorece o fator casa e a necessidade de construir margem antes da deslocação ao Chile. A odd de 1.90 traduz um duelo equilibrado, pelo que a probabilidade estimada permanece moderada. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 53,
      drawPercent: 26,
      awayPercent: 21,
    },
    {
      id: 8606,
      betNumber: '8606',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'PSG + Palmeiras',
      awayTeam: 'Aston Villa + Cerro Porteño',
      date: dateStr,
      time: '21:00 / 22:00',
      prediction: 'Vitória PSG & Vitória Palmeiras',
      confidence: 46,
      odds: 2.25,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'PSG + Palmeiras',
      analysis: `A dupla combina os dois favoritos de mercado consultados: PSG a 1.73 e Palmeiras a 1.30, para uma odd combinada aproximada de 2.25. É importante que os mercados se resolvem nos 90 minutos: um empate em qualquer encontro invalida a seleção. A acumulação amplifica a remuneração, mas também reduz substancialmente a probabilidade de sucesso face às apostas simples. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
