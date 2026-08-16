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
  'Conteúdo editorial para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 16/08/2026, são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem garantia de resultado.';

function getFallbackTips(): Tip[] {
  const dateStr = '16/08/2026';

  return [
    {
      id: 9001,
      betNumber: '9001',
      betType: 'SINGLE',
      league: 'FA Community Shield — Final',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      date: dateStr,
      time: '15:00',
      prediction: 'Vitória Arsenal',
      confidence: 41,
      odds: 2.45,
      market: 'Resultado Final (90 min)',
      winner: 'Arsenal',
      analysis: `A odd de referência +145 para o Arsenal equivale a 2,45 em formato decimal e a cerca de 41% de probabilidade implícita. A prévia da DraftKings Network destaca a continuidade do Arsenal e a chegada de Bruno Guimarães, enquanto o City inicia o primeiro jogo competitivo sem Pep Guardiola, com Bernardo Silva já fora e Rodri em dúvida física. É uma seleção de preço competitivo, não de segurança: um jogo de taça entre equipas de topo pode ser decidido por detalhes e o empate também é um desfecho plausível. Fonte da odd e enquadramento: DraftKings Network, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 41,
      drawPercent: 29,
      awayPercent: 30,
    },
    {
      id: 9002,
      betNumber: '9002',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Atlético-MG',
      awayTeam: 'Grêmio',
      date: dateStr,
      time: '00:00',
      prediction: 'Vitória Atlético-MG',
      confidence: 55,
      odds: 1.83,
      market: 'Resultado Final (90 min)',
      winner: 'Atlético-MG',
      analysis: `A linha de referência -120 para o Atlético-MG corresponde a uma odd decimal de 1,83 e a aproximadamente 55% de probabilidade implícita. O jogo é disputado na Arena MRV, em Belo Horizonte, e o preço coloca os anfitriões como favoritos moderados, não dominantes. A leitura editorial acompanha esse sinal de mercado: proteger a vantagem de jogar em casa é a tese central, mas a margem entre os lados recomenda atenção a escalações e notícias de última hora. Fonte da odd e agenda: ESPN / DraftKings, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 0,
      awayPercent: 45,
    },
    {
      id: 9003,
      betNumber: '9003',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Vasco da Gama',
      awayTeam: 'Santos',
      date: dateStr,
      time: '00:00',
      prediction: 'Vitória Vasco da Gama',
      confidence: 51,
      odds: 1.95,
      market: 'Resultado Final (90 min)',
      winner: 'Vasco da Gama',
      analysis: `A odd de referência -105 para o Vasco da Gama traduz-se em 1,95 em formato decimal e cerca de 51% de probabilidade implícita. Trata-se de um favoritismo mínimo para o anfitrião em São Januário, pelo que esta não é uma seleção para tratar como ampla vantagem. A análise privilegia o fator casa, mas mantém uma leitura prudente: num mercado tão equilibrado, uma alteração de onze inicial ou um momento de jogo pode deslocar rapidamente a avaliação. Fonte da odd e agenda: ESPN / DraftKings, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 51,
      drawPercent: 0,
      awayPercent: 49,
    },
    {
      id: 9004,
      betNumber: '9004',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Mirassol',
      awayTeam: 'Flamengo',
      date: dateStr,
      time: '02:30',
      prediction: 'Vitória Flamengo',
      confidence: 53,
      odds: 1.87,
      market: 'Resultado Final (90 min)',
      winner: 'Flamengo',
      analysis: `O Flamengo aparece a -115 no mercado de referência para a visita ao Mirassol: odd decimal de 1,87 e probabilidade implícita próxima de 53%. O preço concede favoritismo curto ao visitante, deixando claro que a deslocação não é isenta de risco. A seleção segue o sinal do mercado, mas a confiança é deliberadamente moderada; confirme disponibilidade dos jogadores e condições pré-jogo, porque qualquer rotação pode alterar uma linha tão apertada. Fonte da odd e agenda: ESPN / DraftKings, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 53,
      drawPercent: 0,
      awayPercent: 47,
    },
    {
      id: 9005,
      betNumber: '9005',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Corinthians',
      awayTeam: 'Cruzeiro',
      date: dateStr,
      time: '03:30',
      prediction: 'Vitória Corinthians',
      confidence: 44,
      odds: 2.25,
      market: 'Resultado Final (90 min)',
      winner: 'Corinthians',
      analysis: `A cotação +125 para o Corinthians equivale a 2,25 em decimal e apenas 44% de probabilidade implícita. É a seleção mais agressiva da lista, mesmo com o jogo a realizar-se na Neo Química Arena: a odd posiciona o Corinthians como lado de valor potencial, não como favorito. Por isso, a análise deve ser entendida como exposição controlada a um cenário de vitória em casa, com risco superior às escolhas de Atlético-MG, Vasco e Flamengo. Fonte da odd e agenda: ESPN / DraftKings, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 44,
      drawPercent: 0,
      awayPercent: 56,
    },
    {
      id: 9006,
      betNumber: '9006',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Atlético-MG + Mirassol',
      awayTeam: 'Grêmio + Flamengo',
      date: dateStr,
      time: '00:00 / 02:30',
      prediction: 'Atlético-MG vence + Flamengo vence',
      confidence: 29,
      odds: 3.43,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'Atlético-MG + Flamengo',
      analysis: `A dupla combina Atlético-MG a 1,83 (-120) e Flamengo a 1,87 (-115), produzindo uma odd acumulada de referência de 3,43. A probabilidade implícita conjunta baixa para cerca de 29%, porque os dois resultados têm de acontecer. A construção segue dois favoritos moderados apontados pelo mercado da ESPN/DraftKings, mas aumenta materialmente a variância: um empate ou derrota em qualquer um dos jogos invalida toda a seleção. É, por definição, uma opção de risco mais elevado do que as singles. Fontes das odds e agenda: ESPN / DraftKings, consultado em 16/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 29,
      drawPercent: 0,
      awayPercent: 71,
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
