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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 14/08/2026, são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '14/08/2026';

  return [
    {
      id: 8801,
      betNumber: '8801',
      betType: 'SINGLE',
      league: 'EFL Championship — Jornada 1',
      homeTeam: 'Wolverhampton Wanderers',
      awayTeam: 'Blackburn Rovers',
      date: dateStr,
      time: '21:00',
      prediction: 'Vitória Wolverhampton Wanderers',
      confidence: 60,
      odds: 1.55,
      market: 'Resultado Final (90 min)',
      winner: 'Wolverhampton Wanderers',
      analysis: `O Wolverhampton é o favorito de mercado no arranque do Championship: a melhor cotação consultada foi 11/20, equivalente a 1,55, perante 7/2 para o empate e 11/2 para o Blackburn. A página da Oddschecker apresenta 60% para a vitória caseira no seu indicador de probabilidade; isso enquadra a seleção como favoritismo moderado, não como certeza. Em jogos inaugurais, a gestão do risco deve considerar a incerteza de forma e de alinhamentos. Fonte de odds: Oddschecker, consulta de 14/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 16,
    },
    {
      id: 8802,
      betNumber: '8802',
      betType: 'SINGLE',
      league: 'UEFA Europa League — 3.ª pré-eliminatória, 2.ª mão',
      homeTeam: 'KÍ Klaksvík',
      awayTeam: 'Lech Poznań',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Lech Poznań',
      confidence: 57,
      odds: 1.65,
      market: 'Resultado Final (90 min)',
      winner: 'Lech Poznań',
      analysis: `O Lech Poznań entra na visita ao KÍ com vantagem de 1-0 na eliminatória e é o favorito no mercado de resultado: 13/20, aproximadamente 1,65 em decimal. As referências da mesma grelha foram 4/1 para o KÍ e 3/1 para o empate. A vantagem mínima pede disciplina, pois o anfitrião pode aumentar o risco em casa; por isso a confiança fica abaixo de uma seleção de favoritismo forte. Fonte de odds: Oddschecker, consulta de 14/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 19,
      drawPercent: 24,
      awayPercent: 57,
    },
    {
      id: 8803,
      betNumber: '8803',
      betType: 'SINGLE',
      league: 'National League South — Jornada 1',
      homeTeam: 'Dagenham & Redbridge',
      awayTeam: 'Farnham Town',
      date: dateStr,
      time: '21:00',
      prediction: 'Vitória Dagenham & Redbridge',
      confidence: 58,
      odds: 1.67,
      market: 'Resultado Final (90 min)',
      winner: 'Dagenham & Redbridge',
      analysis: `O Dagenham & Redbridge é o favorito da receção ao Farnham Town, com a melhor odd de 4/6, aproximadamente 1,67 em decimal. O empate está a 29/10 e o triunfo visitante a 9/2. A cotação aponta para superioridade caseira, mas uma primeira jornada de liga reduz a previsibilidade do contexto competitivo; a seleção é uma leitura de mercado, não uma promessa de resultado. Fonte de odds: Oddschecker, atualização visível em 14/08 às 03:06. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 25,
      awayPercent: 17,
    },
    {
      id: 8804,
      betNumber: '8804',
      betType: 'SINGLE',
      league: 'National League South — Jornada 1',
      homeTeam: 'Dagenham & Redbridge',
      awayTeam: 'Farnham Town',
      date: dateStr,
      time: '21:00',
      prediction: 'Dagenham & Redbridge vence ao intervalo e no fim',
      confidence: 42,
      odds: 2.4,
      market: 'Intervalo / Resultado Final',
      winner: 'Dagenham & Redbridge / Dagenham & Redbridge',
      analysis: `Para quem aceita maior variância, o mercado intervalo/final oferece 7/5, ou 2,40 em decimal, para o Dagenham & Redbridge liderar ao intervalo e confirmar a vitória. Esta odd é bastante superior ao simples resultado final porque acrescenta a condição de começar forte; um empate ao intervalo invalida a seleção mesmo que os anfitriões ganhem depois. É, portanto, uma alternativa agressiva e de confiança moderada-baixa. Fonte de odds: Oddschecker, atualização visível em 14/08 às 03:06. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 42,
      drawPercent: 0,
      awayPercent: 58,
    },
    {
      id: 8805,
      betNumber: '8805',
      betType: 'SINGLE',
      league: 'National League South — Jornada 1',
      homeTeam: 'Dagenham & Redbridge',
      awayTeam: 'Farnham Town',
      date: dateStr,
      time: '21:00',
      prediction: 'Resultado correto: Dagenham & Redbridge 1-0',
      confidence: 20,
      odds: 7.5,
      market: 'Resultado Correto',
      winner: 'Dagenham & Redbridge 1-0',
      analysis: `O 1-0 para o Dagenham & Redbridge estava listado a 13/2, equivalente a 7,50. Trata-se de uma opção de longo alcance, inserida para distinguir claramente valor potencial de probabilidade: mesmo com favoritismo caseiro, exigir um marcador exato é muito mais difícil do que prever o vencedor. A probabilidade editorial é deliberadamente baixa e não deve ser tratada como uma seleção principal. Fonte de odds: Oddschecker, atualização visível em 14/08 às 03:06. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 20,
      drawPercent: 0,
      awayPercent: 80,
    },
    {
      id: 8806,
      betNumber: '8806',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Wolverhampton Wanderers + KÍ Klaksvík',
      awayTeam: 'Blackburn Rovers + Lech Poznań',
      date: dateStr,
      time: '21:00 / 20:00',
      prediction: 'Vitória Wolverhampton & Vitória Lech Poznań',
      confidence: 36,
      odds: 2.55,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'Wolverhampton Wanderers + Lech Poznań',
      analysis: `A dupla reúne dois favoritos de mercado: Wolverhampton a 1,55 (11/20) e Lech Poznań a 1,65 (13/20). O produto das cotações de referência é cerca de 2,55, mas uma acumulada não soma segurança: qualquer empate ou derrota elimina o cupão. A confiança é inferior às escolhas simples por depender de dois resultados independentes, apesar de ambas as seleções terem sido favoritas no momento da consulta. Fonte de odds: Oddschecker, consulta de 14/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 36,
      drawPercent: 0,
      awayPercent: 64,
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
