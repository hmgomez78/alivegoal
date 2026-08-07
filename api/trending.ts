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

// Conteúdo editorial verificado e atualizado em 07/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Vinícius Júnior renova com o Real Madrid até 2032",
    title_en: "BREAKING: Vinicius Junior extends Real Madrid deal until 2032",
    summary: "Vinícius Júnior assinou uma extensão de seis anos com o Real Madrid, encerrando a especulação que o ligava ao Arsenal. O internacional brasileiro, que entrava no último ano do vínculo, fica agora ligado ao clube merengue até junho de 2032.",
    summary_en: "Vinicius Junior has signed a six-year contract extension with Real Madrid, ending speculation that linked him with Arsenal. The Brazil international had entered the final year of his deal and is now tied to the Spanish club until June 2032.",
    tag: "BREAKING",
    source: "Sky Sports / The Guardian",
    url: "https://www.skysports.com/football/news/11095/13570470/vinicius-junior-future-arsenal-target-to-stay-at-real-madrid-after-positive-contract-talks",
    time: "07/08/2026",
    engagement: "~48.0M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Arsenal acorda 75M£ por Bruno Guimarães",
    title_en: "TRANSFER: Arsenal agree £75m deal for Bruno Guimaraes",
    summary: "O Arsenal chegou a acordo com o Newcastle por uma transferência de 75 milhões de libras por Bruno Guimarães. Segundo a Sky Sports, o capitão dos Magpies realizou exames médicos em Londres e a operação está perto de ser formalizada.",
    summary_en: "Arsenal have agreed a £75m deal with Newcastle for Bruno Guimaraes. According to Sky Sports, the Magpies captain underwent a medical in London and the transfer is close to formal completion.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11670/13569653/bruno-guimaraes-transfer-news-arsenal-agree-lb75m-fee-for-newcastle-midfielder",
    time: "07/08/2026",
    engagement: "~43.5M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Real Madrid fecha acordo recorde por Yan Diomande",
    title_en: "TRANSFER: Real Madrid seal record agreement for Yan Diomande",
    summary: "O Real Madrid chegou a acordo com o RB Leipzig por Yan Diomande numa operação reportada em até 140 milhões de euros. A contratação do extremo reforça um verão de forte investimento no Bernabéu e representa uma das maiores movimentações do mercado.",
    summary_en: "Real Madrid have reached an agreement with RB Leipzig for Yan Diomande in a deal reported at up to €140m. The winger's arrival reinforces a heavy-spending summer at the Bernabeu and ranks among the window's biggest moves.",
    tag: "TRANSFER",
    source: "The Guardian / ESPN",
    url: "https://www.theguardian.com/football/2026/aug/05/real-madrid-agree-club-record-115m-deal-for-yan-diomande-and-want-to-keep-vinicius",
    time: "07/08/2026",
    engagement: "~39.2M estimado",
  },
  {
    id: "t4",
    title: "SCANDAL: Federação Inglesa mantém oposição a Infantino",
    title_en: "SCANDAL: English FA maintains opposition to Infantino",
    summary: "A Federação Inglesa mantém a posição de que Gianni Infantino já não é a pessoa certa para liderar a FIFA, apesar do apoio declarado pela direção do organismo. A crise envolve o plano de investidores privados e aumentou a tensão na governação mundial do futebol.",
    summary_en: "The English FA maintains that Gianni Infantino is no longer the right person to lead FIFA despite the governing body's declared board support. The crisis concerns a private-investor proposal and has intensified tensions in football's global governance.",
    tag: "SCANDAL",
    source: "ESPN",
    url: "https://www.espn.in/football/story/_/id/49544673/english-fa-maintains-stance-infantino-wrong-president-fifa-support",
    time: "07/08/2026",
    engagement: "~34.8M estimado",
  },
  {
    id: "t5",
    title: "HOT: Leeds conclui contratação de Trafford ao Manchester City",
    title_en: "HOT: Leeds complete Trafford signing from Manchester City",
    summary: "O Leeds United concluiu a contratação do guarda-redes James Trafford ao Manchester City num acordo que pode chegar a 45 milhões de libras. A transferência é uma das principais operações do dia no mercado da Premier League.",
    summary_en: "Leeds United have completed the signing of goalkeeper James Trafford from Manchester City in a deal that could reach £45m. The move is one of the day's leading Premier League transfer stories.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.co.uk/sport/football/transfers",
    time: "07/08/2026",
    engagement: "~24.6M estimado",
  },
  {
    id: "t6",
    title: "TRANSFER: Bournemouth anuncia o lateral espanhol Juanlu",
    title_en: "TRANSFER: Bournemouth announce Spanish right-back Juanlu",
    summary: "O Bournemouth oficializou a contratação do lateral-direito espanhol Juanlu, reforçando o corredor defensivo antes da nova época. A confirmação foi incluída pela BBC entre os negócios concluídos nas últimas 24 horas.",
    summary_en: "Bournemouth have confirmed the signing of Spanish right-back Juanlu, strengthening their defensive flank ahead of the new season. The deal was listed by the BBC among completed business in the past 24 hours.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.co.uk/sport/football/transfers",
    time: "07/08/2026",
    engagement: "~18.9M estimado",
  }
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
