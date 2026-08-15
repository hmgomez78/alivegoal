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
  'Conteúdo informativo para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 15/08/2026, são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem aconselhamento garantido.';

function getFallbackTips(): Tip[] {
  const dateStr = '15/08/2026';

  return [
    {
      id: 8901,
      betNumber: '8901',
      betType: 'SINGLE',
      league: 'La Liga — Jornada 1',
      homeTeam: 'Deportivo Alavés',
      awayTeam: 'Getafe',
      date: dateStr,
      time: '18:30',
      prediction: 'Menos de 2,5 golos',
      confidence: 71,
      odds: 1.4,
      market: 'Total de Golos — Menos de 2,5',
      winner: 'Under 2.5 Goals',
      analysis: `A odd de referência para menos de 2,5 golos é 1,40, equivalente a cerca de 71% de probabilidade implícita. O enquadramento publicado pela Football Whispers aponta para seis dos últimos oito jogos de cada equipa abaixo desta linha e para um cenário de 1-1. É uma seleção de linha baixa, mas a primeira jornada e uma possível mudança de ritmo anulam a ideia de certeza. Fonte: Football Whispers, odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 71,
      drawPercent: 0,
      awayPercent: 29,
    },
    {
      id: 8902,
      betNumber: '8902',
      betType: 'SINGLE',
      league: 'La Liga — Jornada 1',
      homeTeam: 'Deportivo Alavés',
      awayTeam: 'Getafe',
      date: dateStr,
      time: '18:30',
      prediction: 'Mais de 4,5 cartões',
      confidence: 54,
      odds: 1.85,
      market: 'Total de Cartões — Mais de 4,5',
      winner: 'Over 4.5 Cards',
      analysis: `A linha de mais de 4,5 cartões está a 1,85, ou aproximadamente 54% de probabilidade implícita. Os cinco confrontos diretos mais recentes entre Alavés e Getafe ultrapassaram esse número de cartões, segundo a prévia consultada. O histórico torna o mercado interessante, mas não elimina o risco de arbitragem mais permissiva ou de um jogo menos físico no início da época. Fonte: Football Whispers, odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 54,
      drawPercent: 0,
      awayPercent: 46,
    },
    {
      id: 8903,
      betNumber: '8903',
      betType: 'SINGLE',
      league: 'La Liga — Jornada 1',
      homeTeam: 'Sevilla',
      awayTeam: 'Rayo Vallecano',
      date: dateStr,
      time: '20:30',
      prediction: 'Ambas as equipas marcam — Sim',
      confidence: 50,
      odds: 2,
      market: 'Ambas Marcam — Sim',
      winner: 'BTTS — Sim',
      analysis: `O mercado “ambas marcam — sim” está cotado a 2,00, o que corresponde a 50% de probabilidade implícita. Cinco dos últimos sete duelos entre Sevilla e Rayo Vallecano tiveram golos dos dois lados; a prévia também destaca a evolução ofensiva recente do Sevilla e a tendência de jogos abertos no histórico deste confronto. Por ser a jornada inaugural, a seleção é de risco equilibrado e não uma leitura conservadora. Fonte: Football Whispers, odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
    },
    {
      id: 8904,
      betNumber: '8904',
      betType: 'SINGLE',
      league: 'La Liga — Jornada 1',
      homeTeam: 'Sevilla',
      awayTeam: 'Rayo Vallecano',
      date: dateStr,
      time: '20:30',
      prediction: 'Vitória Sevilla',
      confidence: 42,
      odds: 2.4,
      market: 'Resultado Final (90 min)',
      winner: 'Sevilla',
      analysis: `A vitória do Sevilla é apresentada a 2,40, cerca de 42% em probabilidade implícita. A leitura apoia-se em sete confrontos sem derrota do Sevilla diante do Rayo e em três derrotas do adversário nos últimos quatro jogos de preparação. Contudo, o Rayo chega com continuidade em peças importantes e um bom histórico recente em estreias; a odd reflete um favoritismo real, mas limitado. Fonte: Football Whispers, odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 42,
      drawPercent: 28,
      awayPercent: 30,
    },
    {
      id: 8905,
      betNumber: '8905',
      betType: 'SINGLE',
      league: 'MLS — Conferência Este',
      homeTeam: 'Nashville SC',
      awayTeam: 'Inter Miami',
      date: dateStr,
      time: '01:30',
      prediction: 'Ambas as equipas marcam — Sim',
      confidence: 71,
      odds: 1.4,
      market: 'Ambas Marcam — Sim',
      winner: 'BTTS — Sim',
      analysis: `A odd de referência de 1,40 para ambas marcarem implica cerca de 71%. Nashville lidera o Este com 35 golos marcados e 14 sofridos em 18 jornadas, enquanto o Inter Miami marcou 45 e sofreu 32. O mercado reconhece a força ofensiva de ambos, mas o duelo opõe a solidez caseira de Nashville à produção visitante de Miami; alinhamentos e rotação após a Leagues Cup devem ser confirmados perto do jogo. Fontes: Transfermarkt e SportsGambler, odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 71,
      drawPercent: 0,
      awayPercent: 29,
    },
    {
      id: 8906,
      betNumber: '8906',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Sevilla + Nashville SC',
      awayTeam: 'Rayo Vallecano + Inter Miami',
      date: dateStr,
      time: '20:30 / 01:30',
      prediction: 'Sevilla–Rayo: Ambas marcam + Nashville–Inter Miami: Ambas marcam',
      confidence: 36,
      odds: 2.8,
      market: 'Acumulador — Ambas Marcam',
      winner: 'BTTS Sim + BTTS Sim',
      analysis: `A dupla combina “ambas marcam” em Sevilla–Rayo a 2,00 e Nashville–Inter Miami a 1,40, para uma odd acumulada de referência de 2,80. A probabilidade implícita conjunta aproxima-se de 36%, precisamente porque ambas as condições têm de ocorrer. Há suporte estatístico nos confrontos e nos perfis ofensivos, mas uma acumulada aumenta a variância: um único jogo sem golos de uma das equipas invalida a seleção. Fontes: Football Whispers, Transfermarkt e SportsGambler; odds verificadas em 15/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
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
