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
  'Conteúdo editorial para maiores de 18 anos. Aposte apenas o que pode perder; odds de referência recolhidas em 19/08/2026 são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem garantia de resultado.';

function getFallbackTips(): Tip[] {
  const dateStr = '19/08/2026';

  return [
    {
      id: 9301,
      betNumber: '9301',
      betType: 'SINGLE',
      league: 'La Liga',
      homeTeam: 'Atlético de Madrid',
      awayTeam: 'Málaga',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Atlético de Madrid',
      confidence: 73,
      odds: 1.35,
      market: 'Resultado Final (90 min)',
      winner: 'Atlético de Madrid',
      analysis: `A comparação SportyTrader listava 1,35 para a vitória do Atlético, 5,38 para o empate e 11,10 para o Málaga na 1xBet. A conversão das três odds implícitas e a normalização da margem apontam para cerca de 73% Atlético, 18% empate e 9% Málaga. O preço torna o anfitrião favorito claro, mas deixa uma probabilidade material para os restantes resultados; confirme as equipas iniciais e a cotação disponível. Fontes: Sky Sports para agenda e SportyTrader/1xBet para o preço de referência. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 73,
      drawPercent: 18,
      awayPercent: 9,
    },
    {
      id: 9302,
      betNumber: '9302',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Celtic',
      awayTeam: 'LASK',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas as equipas marcam — Sim',
      confidence: 52,
      odds: 1.78,
      market: 'Ambas as equipas marcam',
      winner: 'BTTS — Sim',
      analysis: `A linha BTTS Sim estava a -128 na BetMGM, equivalente a 1,78 em decimal; o Não estava a -111. Ao remover a margem entre os dois lados do mercado, a seleção Sim fica perto de 52%. Como contexto, o SportsGambler regista BTTS em sete dos últimos dez jogos de cada equipa no recorte apresentado, mas trata-se de uma primeira mão europeia e a intensidade pode ser diferente. A página também avisa que os preços podem alterar-se. Fonte: SportsGambler/BetMGM. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 59,
      drawPercent: 24,
      awayPercent: 17,
    },
    {
      id: 9303,
      betNumber: '9303',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'NEC Nijmegen',
      awayTeam: 'Bodø/Glimt',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 3,5 golos',
      confidence: 53,
      odds: 1.78,
      market: 'Total de golos — Menos de 3,5',
      winner: 'Menos de 3,5 golos',
      analysis: `A FOX Sports apresentava Menos de 3,5 a -129, cerca de 1,78 em decimal, contra -104 no Mais de 3,5. Depois do ajuste simples à margem, o mercado dá aproximadamente 53% ao cenário de no máximo três golos. Com a eliminatória a abrir em Nijmegen, a escolha privilegia o preço do total e não uma previsão de vencedor. A distribuição 1X2 da mesma página é equilibrada, com NEC 38%, Bodø/Glimt 38% e empate implícito no restante. Fonte: FOX Sports. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 38,
      drawPercent: 24,
      awayPercent: 38,
    },
    {
      id: 9304,
      betNumber: '9304',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Hapoel Beer-Sheva',
      awayTeam: 'Sabah FK',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 2,5 golos',
      confidence: 50,
      odds: 1.95,
      market: 'Total de golos — Mais de 2,5',
      winner: 'Mais de 2,5 golos',
      analysis: `A 1xBet era listada a 1,95 para Mais de 2,5 e a 1,96 para Menos de 2,5 na comparação SportyTrader. As probabilidades implícitas, depois de normalizadas, deixam o mercado praticamente dividido: cerca de 50% para o Mais e 50% para o Menos. O Hapoel é favorito moderado no 1X2, sem ser dominante, pelo que a aposta assume risco equilibrado e não uma expectativa de jogo unilateral. Fonte: SportyTrader/1xBet. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 43,
      drawPercent: 30,
      awayPercent: 27,
    },
    {
      id: 9305,
      betNumber: '9305',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Slovan Bratislava',
      awayTeam: 'Celje',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Slovan Bratislava',
      confidence: 57,
      odds: 1.67,
      market: 'Resultado Final (90 min)',
      winner: 'Slovan Bratislava',
      analysis: `A ESPN/DraftKings mostrava o Slovan a -150, ou 1,67 decimal, com empate a +300 e Celje a +370. A normalização da margem coloca a vitória caseira em aproximadamente 57%, o empate em 23% e o visitante em 20%. A FOX Sports também identifica o Slovan como favorito, mas o número não elimina o risco de uma eliminatória de primeira mão. Fonte: ESPN/DraftKings e FOX Sports. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 57,
      drawPercent: 23,
      awayPercent: 20,
    },
    {
      id: 9306,
      betNumber: '9306',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Atlético de Madrid + Shanghai Port',
      awayTeam: 'Málaga + Dalian Yingbo',
      date: dateStr,
      time: '12:35 / 20:00',
      prediction: 'Atlético de Madrid vence + Ambas marcam em Shanghai Port–Dalian Yingbo',
      confidence: 42,
      odds: 2.19,
      market: 'Acumulador — 2 seleções',
      winner: 'Atlético de Madrid + BTTS Sim',
      analysis: `A dupla reúne Atlético de Madrid para vencer a 1,35 e Ambas Marcam Sim em Shanghai Port–Dalian Yingbo a 1,62, resultando numa odd composta de referência de 2,19 (1,35 × 1,62). A estimativa indicativa da dupla é cerca de 42%, obtida pela multiplicação de probabilidades de mercado normalizadas: aproximadamente 73% para o Atlético e 58% para BTTS Sim em Shanghai. O WinComparator lista 1,62 para BTTS Sim e regista jogos recentes abertos das duas equipas, mas cada seleção continua dependente de mercado dinâmico. Como qualquer acumulador, falhar uma perna invalida o bilhete. Fontes: SportyTrader/1xBet; WinComparator/Bet365; Sky Sports. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 42,
      drawPercent: 0,
      awayPercent: 58,
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
