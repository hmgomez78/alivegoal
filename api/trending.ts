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

// Conteúdo editorial verificado e atualizado em 08/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Manchester City rejeita primeira proposta do Barcelona por Rodri",
    title_en: "BREAKING: Manchester City reject Barcelona's initial bid for Rodri",
    summary: "O Manchester City rejeitou uma primeira oferta do Barcelona por Rodri, avaliada em cerca de 40 milhões de libras. A Sky Sports indica que o City procura mais de 60 milhões pelo médio espanhol, que entrou no último ano de contrato; as conversações ficaram suspensas, embora o Barcelona prepare uma nova abordagem.",
    summary_en: "Manchester City have rejected Barcelona's initial offer for Rodri, valued at around £40m. Sky Sports reports that City want more than £60m for the Spain midfielder, who is in the final year of his contract; talks are currently on hold, although Barcelona are preparing a further approach.",
    tag: "BREAKING",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11095/13570585/rodri-transfer-news-man-city-reject-initial-barcelona-off-for-spain-midfielder-with-bid-considered-far-too-low",
    time: "08/08/2026",
    engagement: "~46.0M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Acordo Liverpool–PSG por Barcola enfrenta entraves",
    title_en: "TRANSFER: Liverpool–PSG deal for Barcola faces complications",
    summary: "As conversações entre Liverpool e Paris Saint-Germain por Bradley Barcola tornaram-se difíceis de concluir. A atualização da Sky Sports mantém a operação em aberto, mas sublinha que o entendimento entre clubes ainda não está assegurado, num dos dossiers mais acompanhados da janela.",
    summary_en: "Talks between Liverpool and Paris Saint-Germain over Bradley Barcola have become difficult to complete. Sky Sports' update keeps the move alive but stresses that an agreement between the clubs is not yet secured, making it one of the window's most closely watched files.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11669/13570766/bradley-barcola-transfer-news-liverpool-deal-for-psg-winger-difficult-to-complete-after-talks",
    time: "08/08/2026",
    engagement: "~39.8M estimado",
  },
  {
    id: "t3",
    title: "HOT: Arsenal pode entrar na corrida por Bradley Barcola",
    title_en: "HOT: Arsenal could enter the race for Bradley Barcola",
    summary: "A imprensa inglesa, resumida pela Sky Sports no seu Paper Talk, aponta para a possibilidade de o Arsenal tentar antecipar-se ao Liverpool na corrida por Bradley Barcola. Trata-se de uma informação de mercado e não de uma transferência confirmada, mas o potencial duelo entre rivais da Premier League elevou a atenção sobre o extremo do PSG.",
    summary_en: "The English press, as reviewed by Sky Sports' Paper Talk, suggests Arsenal could attempt to move ahead of Liverpool in the race for Bradley Barcola. This remains a market report rather than a confirmed transfer, but the prospect of a Premier League rivalry has raised the spotlight on the PSG winger.",
    tag: "HOT",
    source: "Sky Sports Paper Talk",
    url: "https://www.skysports.com/football/transfer-paper-talk/12709/13570879/bradley-barcola-transfer-news-arsenal-could-hijack-liverpools-move-for-psg-winger-paper-talk",
    time: "08/08/2026",
    engagement: "~35.6M estimado",
  },
  {
    id: "t4",
    title: "TRANSFER: Agente de Gabriel Jesus é visto no centro de treinos do Nápoles",
    title_en: "TRANSFER: Gabriel Jesus' agent spotted at Napoli training ground",
    summary: "A atualização de mercado do Arsenal da Sky Sports relata que o agente de Gabriel Jesus foi visto no centro de treinos do Nápoles, num momento em que cresce o interesse pelo avançado. A presença não confirma uma proposta ou acordo, mas acrescenta um novo elemento ao futuro do brasileiro nesta janela.",
    summary_en: "Sky Sports' Arsenal transfer update reports that Gabriel Jesus' agent was spotted at Napoli's training ground as interest in the forward grows. The sighting does not confirm a bid or an agreement, but it adds a fresh element to the Brazilian's future in this window.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/live-blog/41711/13025486/arsenal-transfer-news-rumours-and-gossip-live-updates-and-latest-on-deals-signings-loans-and-contracts",
    time: "08/08/2026",
    engagement: "~27.4M estimado",
  },
  {
    id: "t5",
    title: "HOT: Leeds fecha James Trafford por valor recorde do clube",
    title_en: "HOT: Leeds complete club-record James Trafford deal",
    summary: "O Leeds United confirmou a contratação do guarda-redes inglês James Trafford ao Manchester City por um valor inicial de 40 milhões de libras, com contrato de cinco anos. O negócio é um recorde para o clube e coloca Trafford no centro da reconstrução do Leeds para a nova temporada.",
    summary_en: "Leeds United have completed the signing of England goalkeeper James Trafford from Manchester City for an initial £40m on a five-year contract. The deal is a club record and places Trafford at the centre of Leeds' rebuild for the new campaign.",
    tag: "HOT",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/12691/13567585/leeds-united-transfer-news-james-trafford-agrees-deal-for-club-record-move-from-man-city",
    time: "08/08/2026",
    engagement: "~25.1M estimado",
  },
  {
    id: "t6",
    title: "BREAKING: Vinícius Júnior prolonga vínculo com o Real Madrid",
    title_en: "BREAKING: Vinicius Junior extends his Real Madrid contract",
    summary: "Vinícius Júnior assinou uma extensão de contrato com o Real Madrid, encerrando a incerteza em torno do seu futuro e o interesse atribuído ao Arsenal. A renovação fixa a continuidade de uma das figuras decisivas do ataque merengue e retira do mercado um dos nomes mais mediáticos do verão.",
    summary_en: "Vinicius Junior has signed a contract extension with Real Madrid, ending uncertainty around his future and reported Arsenal interest. The renewal secures the continuity of one of Madrid's key attacking figures and removes one of the summer's most high-profile names from the market.",
    tag: "BREAKING",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11095/13570470/vinicius-junior-arsenal-target-signs-real-madrid-contract-extension-to-end-uncertainty-over-future",
    time: "08/08/2026",
    engagement: "~31.9M estimado",
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    source: "curated",
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING,
  });
}
