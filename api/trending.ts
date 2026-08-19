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

// Conteúdo editorial verificado e atualizado em 19/08/2026.
// A redação distingue transferências concluídas, acordos de princípio e rumores.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "TRANSFER: Dortmund tem acordo de princípio por Joey Veerman",
    title_en: "TRANSFER: Dortmund reach agreement in principle for Joey Veerman",
    summary: "O Borussia Dortmund chegou a um acordo de princípio para contratar Joey Veerman ao PSV. Segundo o The Athletic, o internacional neerlandês realizou os exames médicos na segunda-feira e deve formalizar a transferência esta semana. Até à assinatura e ao anúncio dos clubes, o negócio deve ser tratado como acordo avançado — não como transferência oficialmente concluída.",
    summary_en: "Borussia Dortmund have reached an agreement in principle to sign Joey Veerman from PSV. According to The Athletic, the Netherlands international completed his medical on Monday and is expected to finalise the transfer this week. Until contracts are signed and the clubs announce the deal, it should be treated as an advanced agreement rather than a completed transfer.",
    tag: "TRANSFER",
    source: "The Athletic",
    url: "https://www.nytimes.com/athletic/7518612/2026/08/18/transfer-latest-summer-window-2026-man-utd-arsenal-real-madrid/",
    time: "19/08/2026",
    engagement: "~18,6M estimado",
  },
  {
    id: "t2",
    title: "BREAKING: United trava saída de Bruno apesar de proposta do Galatasaray",
    title_en: "BREAKING: United resist Bruno exit despite Galatasaray proposal",
    summary: "O Galatasaray apresentou a Bruno Fernandes uma proposta salarial de €20 milhões por ano, mas o Manchester United não está aberto a vender o capitão e mantém conversas para renovar o contrato. O The Athletic diz que o português quer ficar em Old Trafford; o acordo atual vai até 2027, com opção do clube para mais 12 meses. É uma negociação de enorme peso desportivo e financeiro, não uma saída confirmada.",
    summary_en: "Galatasaray have made Bruno Fernandes a salary proposal worth €20m a year, but Manchester United are not open to selling their captain and remain in contract talks. The Athletic report that the Portugal international wants to stay at Old Trafford; his current deal runs to 2027 with a further 12-month club option. It is a major sporting and financial negotiation, not a confirmed exit.",
    tag: "BREAKING",
    source: "The Athletic",
    url: "https://www.nytimes.com/athletic/7518612/2026/08/18/transfer-latest-summer-window-2026-man-utd-arsenal-real-madrid/",
    time: "19/08/2026",
    engagement: "~24,1M estimado",
  },
  {
    id: "t3",
    title: "HOT: Bayern e Harry Kane abrem negociações para renovar",
    title_en: "HOT: Bayern and Harry Kane open extension talks",
    summary: "Fabrizio Romano indica que Bayern Munique e o círculo de Harry Kane iniciaram conversas para prolongar o vínculo do avançado inglês, atualmente válido até 2027. Há otimismo para um acordo, mas ainda estão em discussão a duração e uma eventual cláusula de saída. A informação aponta para uma renovação em negociação, e não para um contrato já assinado.",
    summary_en: "Fabrizio Romano reports that Bayern Munich and Harry Kane's camp have begun talks over an extension to the England striker's contract, which currently runs to 2027. There is optimism about an agreement, but the length and any possible exit clause are still being discussed. This is a renewal under negotiation, not a signed contract.",
    tag: "HOT",
    source: "FootballTransfers, citando Fabrizio Romano",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/fabrizio-romano-transfer-news-viktor-gyokeres-arsenal-barcelona-gavi-man-utd-rafael-leao-ac-milan",
    time: "19/08/2026",
    engagement: "~16,8M estimado",
  },
  {
    id: "t4",
    title: "SCANDAL: Romano chama de “fake news” ao rumor Gavi–Manchester United",
    title_en: "SCANDAL: Romano calls Gavi-to-Manchester United story 'fake news'",
    summary: "Fabrizio Romano rejeitou de forma inequívoca as informações que ligavam Gavi ao Manchester United, classificando-as como “fake news”. A posição relatada é que o Barcelona não planeia vender o médio e que o jogador está satisfeito no clube; conversas futuras sobre renovação são uma possibilidade, mas não são iminentes. O caso expõe como um rumor de alto alcance pode ganhar tração sem negociação real por trás.",
    summary_en: "Fabrizio Romano has unequivocally dismissed reports linking Gavi with Manchester United, calling them 'fake news'. The reported position is that Barcelona do not plan to sell the midfielder and that the player is happy at the club; future extension talks are possible but not imminent. The case shows how a high-reach rumour can gain momentum without a real negotiation behind it.",
    tag: "SCANDAL",
    source: "FootballTransfers, citando Fabrizio Romano",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/fabrizio-romano-transfer-news-viktor-gyokeres-arsenal-barcelona-gavi-man-utd-rafael-leao-ac-milan",
    time: "19/08/2026",
    engagement: "~20,4M estimado",
  },
  {
    id: "t5",
    title: "HOT: Barcelona–Gyökeres não tem conversas nem proposta, diz Romano",
    title_en: "HOT: Barcelona–Gyökeres has no talks or bid, says Romano",
    summary: "Os relatos de uma possível mudança de Viktor Gyökeres do Arsenal para o Barcelona foram arrefecidos por Fabrizio Romano. Segundo a atualização, não existem conversas, negociações ou operação concreta em curso, e o Arsenal continua a contar com o avançado. A história é relevante pelo perfil dos clubes, mas o estado atual é de especulação negada — não de transferência iminente.",
    summary_en: "Reports of a potential Viktor Gyökeres move from Arsenal to Barcelona have been cooled by Fabrizio Romano. According to the update, there are no talks, negotiations or concrete operation under way, and Arsenal still count on the striker. The story is significant because of the clubs involved, but its current status is denied speculation rather than an imminent transfer.",
    tag: "HOT",
    source: "FootballTransfers, citando Fabrizio Romano",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/fabrizio-romano-transfer-news-viktor-gyokeres-arsenal-barcelona-gavi-man-utd-rafael-leao-ac-milan",
    time: "19/08/2026",
    engagement: "~17,3M estimado",
  },
  {
    id: "t6",
    title: "TRANSFER: Martinelli rejeita proposta de €45M do Galatasaray",
    title_en: "TRANSFER: Martinelli rejects €45m Galatasaray approach",
    summary: "Gabriel Martinelli informou o Arsenal de que não pretende aceitar uma mudança para o Galatasaray, depois de o clube turco ter apresentado uma proposta de €45 milhões. O The Athletic acrescenta que o Arsenal continua a procurar um defesa e um avançado antes do fecho do mercado, pelo que a decisão do brasileiro também pesa no desenho do plantel. Não houve transferência: trata-se de uma abordagem recusada pelo jogador.",
    summary_en: "Gabriel Martinelli has told Arsenal he does not intend to accept a move to Galatasaray after the Turkish club made a €45m offer. The Athletic add that Arsenal are still seeking a defender and an attacker before the deadline, so the Brazilian's decision also affects the squad plan. No transfer has taken place: this was an approach rejected by the player.",
    tag: "TRANSFER",
    source: "The Athletic",
    url: "https://www.nytimes.com/athletic/7518612/2026/08/18/transfer-latest-summer-window-2026-man-utd-arsenal-real-madrid/",
    time: "19/08/2026",
    engagement: "~14,9M estimado",
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
    source: 'curated',
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
