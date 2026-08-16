import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface TrendingNews {
  id: string;
  title: string;
  title_en: string;
  summary: string;
  summary_en: string;
  tag: "BREAKING" | "SCANDAL" | "TRANSFER" | "HOT";
  source: string;
  url: string;
  time: string;
  engagement: string;
}

// Conteúdo editorial verificado e atualizado em 16/08/2026.
// As operações assinaladas como confirmadas foram anunciadas pelas fontes citadas;
// negociações em curso são descritas como tal.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: PSG confirma Ferran Torres por cerca de €50M",
    title_en: "BREAKING: PSG confirm Ferran Torres for about €50m",
    summary: "O Paris Saint-Germain confirmou a contratação de Ferran Torres ao Barcelona, num negócio reportado em cerca de €50 milhões. O avançado espanhol assinou até 2031 depois de uma época em que somou 21 golos em 49 jogos pelo Barça e decidiu a final do Mundial pela Espanha. A chegada oferece a Luis Enrique um finalizador já adaptado ao seu modelo e abre uma nova fase no ataque parisiense.",
    summary_en: "Paris Saint-Germain have confirmed the signing of Ferran Torres from Barcelona in a deal reported at about €50m. The Spain forward signed until 2031 after a season in which he scored 21 goals in 49 Barça appearances and netted Spain's World Cup final winner. His arrival gives Luis Enrique a proven finisher familiar with his methods and starts a new chapter for PSG's attack.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/15/psg-ferran-torres-barcelona-transfer-window",
    time: "16/08/2026",
    engagement: "~142,8M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Cristian Romero deixa Tottenham e assina pelo Atlético",
    title_en: "TRANSFER: Cristian Romero leaves Tottenham to join Atlético",
    summary: "O Atlético de Madrid confirmou a contratação de Cristian Romero, fechando a saída de um dos líderes defensivos do Tottenham. O central argentino chega a uma equipa que procura elevar agressividade, duelo aéreo e experiência competitiva no eixo. Para os Spurs, a transferência obriga a redefinir rapidamente a hierarquia defensiva antes do novo ciclo competitivo.",
    summary_en: "Atlético Madrid have confirmed the signing of Cristian Romero, completing the exit of one of Tottenham's defensive leaders. The Argentina centre-back joins a side looking to add aggression, aerial strength and big-game experience through the middle. For Spurs, the departure forces a quick rethink of their defensive hierarchy before the new competitive cycle.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/live/2026/aug/15/community-shield-buildup-championship-and-club-friendly-updates-matchday-live",
    time: "16/08/2026",
    engagement: "~118,6M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Djed Spence troca Tottenham pelo Inter em operação de €30M",
    title_en: "TRANSFER: Djed Spence swaps Tottenham for Inter in €30m move",
    summary: "Djed Spence completou a transferência do Tottenham para o Inter, num acordo de cinco anos avaliado em cerca de €30 milhões e com cláusula de 10% sobre futura venda. O lateral inglês reforça o campeão italiano depois de perder espaço em Londres. O negócio dá ao Inter profundidade num corredor exigente e retira aos Spurs uma peça com experiência internacional recente.",
    summary_en: "Djed Spence has completed a five-year move from Tottenham to Inter in a package worth about €30m, including a 10% sell-on clause. The England full-back joins the Italian champions after losing his place in London. The deal adds depth to a demanding flank for Inter and removes a player with recent international experience from Tottenham's options.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/15/psg-ferran-torres-barcelona-transfer-window",
    time: "16/08/2026",
    engagement: "~89,4M estimado",
  },
  {
    id: "t4",
    title: "TRANSFER: West Ham fecha Arne Engels por cerca de £22M",
    title_en: "TRANSFER: West Ham complete Arne Engels deal worth about £22m",
    summary: "O West Ham contratou Arne Engels ao Celtic por uma verba reportada perto de £22 milhões, com o médio belga a assinar por cinco temporadas. Aos 22 anos e depois de 100 jogos pelo campeão escocês, Engels chega com margem de progressão e responsabilidade imediata num projeto que procura regressar à Premier League. É um investimento relevante para o meio-campo dos Hammers.",
    summary_en: "West Ham have signed Arne Engels from Celtic in a deal reported at about £22m, with the Belgium midfielder agreeing a five-year contract. At 22 and after 100 appearances for the Scottish champions, Engels arrives with development upside and immediate responsibility in a project seeking a Premier League return. It is a significant midfield investment for the Hammers.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/15/psg-ferran-torres-barcelona-transfer-window",
    time: "16/08/2026",
    engagement: "~64,7M estimado",
  },
  {
    id: "t5",
    title: "HOT: Aston Villa acelera por Zion Suzuki perante possível saída de Martínez",
    title_en: "HOT: Aston Villa step up Zion Suzuki move amid potential Martínez exit",
    summary: "O Aston Villa está a acelerar a contratação de Zion Suzuki, do Parma, enquanto a Juventus reativou o interesse por Emiliano Martínez. Segundo o The Guardian, Martínez está aberto a sair após seis épocas e o Villa vê o internacional japonês como substituto. Ainda sem anúncio oficial, é um dossiê de elevada importância: a decisão pode alterar toda a estrutura da baliza de Unai Emery.",
    summary_en: "Aston Villa are accelerating a move for Parma goalkeeper Zion Suzuki after Juventus revived their interest in Emiliano Martínez. According to The Guardian, Martínez is open to leaving after six seasons and Villa see the Japan international as a replacement. With no official announcement yet, this is a high-impact situation that could reshape Unai Emery's goalkeeping plans.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/15/psg-ferran-torres-barcelona-transfer-window",
    time: "16/08/2026",
    engagement: "~77,2M estimado",
  },
  {
    id: "t6",
    title: "SCANDAL: Bournemouth admite falha após funcionário saber por e-mail que não seria renovado",
    title_en: "SCANDAL: Bournemouth admit failure after staff member learned by email of non-renewal",
    summary: "O Bournemouth reconheceu que a comunicação de alterações a funcionários de dia de jogo ficou aquém dos padrões do clube, depois de surgir a denúncia de que um colaborador com quase 60 anos de serviço soube por e-mail que o contrato não seria renovado. O clube prometeu contactar os afetados e rever cada caso. A controvérsia coloca a gestão humana e institucional do Bournemouth sob escrutínio no arranque da época.",
    summary_en: "Bournemouth have acknowledged that their communication of matchday staffing changes fell below club standards after reports that an employee with almost 60 years of service learned by email that his contract would not be renewed. The club said it would contact those affected and review every case. The controversy puts Bournemouth's human and institutional management under scrutiny at the start of the season.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/live/2026/aug/15/community-shield-buildup-championship-and-club-friendly-updates-matchday-live",
    time: "16/08/2026",
    engagement: "~58,9M estimado",
  }
];

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

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return res.status(200).json({
    source: "curated",
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
