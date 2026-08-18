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
  'Conteúdo editorial para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 18/08/2026, são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem garantia de resultado.';

function getFallbackTips(): Tip[] {
  const dateStr = '18/08/2026';

  return [
    {
      id: 9201,
      betNumber: '9201',
      betType: 'SINGLE',
      league: 'Superliga Chinesa',
      homeTeam: 'Shanghai Shenhua',
      awayTeam: 'Beijing Guoan',
      date: dateStr,
      time: '12:35',
      prediction: 'Vitória Shanghai Shenhua',
      confidence: 46,
      odds: 2.05,
      market: 'Resultado Final (90 min)',
      winner: 'Shanghai Shenhua',
      analysis: `A FanDuel listava Shanghai Shenhua a +105 (2,05 em decimal), empate a +320 e Beijing Guoan a +200 na consulta de 18/08. Ao converter os três preços em probabilidades implícitas e normalizar a margem, o mercado sugere aproximadamente 46% para o Shenhua, 22% para o empate e 31% para o Beijing. A vantagem do anfitrião é curta, pelo que a selecção reflecte preço e factor-casa, não uma expectativa de domínio. Confirme escalações e a cotação disponível antes de considerar qualquer aposta. Fontes: BBC Sport para agenda e FanDuel para a cotação de referência. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 46,
      drawPercent: 22,
      awayPercent: 32,
    },
    {
      id: 9202,
      betNumber: '9202',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off',
      homeTeam: 'Dinamo Zagreb',
      awayTeam: 'Viking',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Dinamo Zagreb',
      confidence: 55,
      odds: 1.70,
      market: 'Resultado Final (90 min)',
      winner: 'Dinamo Zagreb',
      analysis: `A Legalbet publicava Dinamo Zagreb a -142 (cerca de 1,70 decimal), empate a +300 e Viking a +320. Depois de remover a margem desses preços, a leitura 1X2 fica em torno de 55% para o Dinamo, 23% para o empate e 22% para o Viking. O favoritismo é apoiado pelo percurso recente do Dinamo na qualificação, com vitórias por 5-0 e 2-1 sobre o Kauno Žalgiris, mas um play-off de primeira mão exige prudência porque o visitante pode aceitar um jogo de baixa exposição. Fontes: BBC Sport / Legalbet, consultadas em 18/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 55,
      drawPercent: 23,
      awayPercent: 22,
    },
    {
      id: 9203,
      betNumber: '9203',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off',
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Olympique Lyonnais',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Fenerbahçe',
      confidence: 48,
      odds: 1.95,
      market: 'Resultado Final (90 min)',
      winner: 'Fenerbahçe',
      analysis: `A FanDuel apresentava Fenerbahçe a -105 (1,95 decimal), empate a +250 e Lyon a +260 no mercado 1X2. A normalização das probabilidades implícitas aponta para 48% para o Fenerbahçe, 27% para o empate e 26% para o Lyon. A primeira mão em Istambul valoriza o lado da casa, mas a probabilidade está abaixo de 50%, pelo que esta não é uma selecção de elevada segurança. Uma derrota pela margem mínima, um empate ou uma vitória francesa continuam plenamente compatíveis com o preço. Fontes: BBC Sport / FanDuel, consultadas em 18/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 48,
      drawPercent: 27,
      awayPercent: 25,
    },
    {
      id: 9204,
      betNumber: '9204',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off',
      homeTeam: 'Levski Sofia',
      awayTeam: 'AEK Athens',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória AEK Athens',
      confidence: 38,
      odds: 2.45,
      market: 'Resultado Final (90 min)',
      winner: 'AEK Athens',
      analysis: `A cotação de referência da FanDuel era +145 para a AEK Athens (2,45 decimal), +195 para o Levski e +200 para o empate. Após o ajuste à margem do mercado, as probabilidades estimadas são próximas de 38% para a AEK, 31% para o Levski e 31% para o empate. O preço torna claro que se trata de um confronto equilibrado: a escolha no visitante procura a ligeira preferência da casa de apostas, não uma superioridade estatística conclusiva. É indispensável rever as equipas iniciais antes do apito inicial. Fontes: BBC Sport / FanDuel, consultadas em 18/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 31,
      drawPercent: 31,
      awayPercent: 38,
    },
    {
      id: 9205,
      betNumber: '9205',
      betType: 'SINGLE',
      league: 'CONMEBOL Libertadores — Oitavos-de-final',
      homeTeam: 'Independiente Rivadavia',
      awayTeam: 'Fluminense',
      date: dateStr,
      time: '23:00',
      prediction: 'Vitória Independiente Rivadavia',
      confidence: 39,
      odds: 2.42,
      market: 'Resultado Final (90 min)',
      winner: 'Independiente Rivadavia',
      analysis: `A Legalbet mostrava Independiente Rivadavia a 2,42, empate a 3,00 e Fluminense a 3,25. A conversão para probabilidades implícitas, já normalizada, deixa cerca de 39% para os argentinos, 32% para o empate e 29% para o Fluminense. A cotação dá ao anfitrião uma preferência pequena num confronto que chega a 0-0 no agregado; o histórico recente inclui também 1-1 e vitória de 2-1 do Rivadavia. Em jogos tão curtos de preço, uma selecção simples deve ser entendida como exposição de risco elevado, não como certeza. Fontes: BBC Sport / Legalbet, consultadas em 18/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 39,
      drawPercent: 32,
      awayPercent: 29,
    },
    {
      id: 9206,
      betNumber: '9206',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Dinamo Zagreb + Fenerbahçe',
      awayTeam: 'Viking + Olympique Lyonnais',
      date: dateStr,
      time: '20:00 / 20:00',
      prediction: 'Dinamo Zagreb vence + Fenerbahçe vence',
      confidence: 26,
      odds: 3.32,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'Dinamo Zagreb + Fenerbahçe',
      analysis: `A dupla combina Dinamo Zagreb a 1,70 e Fenerbahçe a 1,95, gerando uma odd acumulada de referência de 3,32 (1,70 × 1,95). Ao multiplicar as probabilidades de mercado normalizadas das duas selecções, a probabilidade indicativa do conjunto ronda 26%; trata-se de uma aproximação de preço e não assume independência perfeita entre todos os factores. Ambas as equipas jogam em casa na primeira mão dos play-offs, mas a acumulada só é vencedora se os dois resultados ocorrerem. Uma falha invalida todo o bilhete, pelo que a variância é substancialmente maior do que nas singles. Fontes: BBC Sport, Legalbet e FanDuel, consultadas em 18/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 26,
      drawPercent: 0,
      awayPercent: 74,
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
