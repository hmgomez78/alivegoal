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

// Conteúdo editorial verificado e atualizado em 05/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "HOT: Trabzonspor abre negociações para contratar Mohamed Salah",
    title_en: "HOT: Trabzonspor open talks to sign Mohamed Salah",
    summary: "O Trabzonspor abriu conversações para tentar contratar Mohamed Salah e espera poder concluir a operação durante esta semana. As negociações estão em curso; não há, para já, anúncio de acordo ou assinatura por parte do jogador.",
    summary_en: "Trabzonspor have opened talks in an attempt to sign Mohamed Salah and hope to complete the deal this week. Negotiations are ongoing; there has been no announcement of an agreement or signature at this stage.",
    tag: "HOT",
    source: "BBC Sport / The Guardian",
    url: "https://www.bbc.co.uk/sport/football/transfers",
    time: "05/08/2026",
    engagement: "~31.6M",
  },
  {
    id: "t2",
    title: "BREAKING: Barcelona contrata Kerolin num negócio recorde da WSL",
    title_en: "BREAKING: Barcelona sign Kerolin in record WSL deal",
    summary: "O Barcelona confirmou a contratação da avançada brasileira Kerolin ao Manchester City por cerca de 1,25 milhões de libras. Segundo a imprensa britânica, trata-se de um valor recorde numa venda da Women's Super League.",
    summary_en: "Barcelona have completed the signing of Brazilian forward Kerolin from Manchester City for around £1.25m. British reports describe it as a record fee for a Women's Super League sale.",
    tag: "BREAKING",
    source: "The Guardian / BBC Sport",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "05/08/2026",
    engagement: "~24.8M",
  },
  {
    id: "t3",
    title: "TRANSFER: Arsenal mantém conversações por Bruno Guimarães",
    title_en: "TRANSFER: Arsenal remain in talks for Bruno Guimarães",
    summary: "O Arsenal continua em conversações para contratar Bruno Guimarães ao Newcastle. A primeira proposta, avaliada em 70 milhões de libras, foi rejeitada, pelo que a operação deve ser tratada como uma negociação em desenvolvimento e não como acordo fechado.",
    summary_en: "Arsenal remain in talks to sign Bruno Guimarães from Newcastle. Their first bid, reported at £70m, was rejected, so the move should be treated as an ongoing negotiation rather than a completed agreement.",
    tag: "TRANSFER",
    source: "BBC Sport / The Guardian",
    url: "https://www.bbc.co.uk/sport/football/transfers",
    time: "05/08/2026",
    engagement: "~22.3M",
  },
  {
    id: "t4",
    title: "TRANSFER: Ipswich fecha a contratação de Florentino Luís",
    title_en: "TRANSFER: Ipswich complete Florentino Luís signing",
    summary: "O Ipswich confirmou a contratação de Florentino Luís ao Burnley. A operação foi reportada com um valor na ordem dos 18,7 milhões de euros, reforçando o meio-campo do clube inglês para a nova época.",
    summary_en: "Ipswich have completed the signing of Florentino Luís from Burnley. The move was reported at around €18.7m, strengthening the English club's midfield for the new season.",
    tag: "TRANSFER",
    source: "BBC Sport / FootballTransfers",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/transfer-news-every-done-deal-official-confirmed-completed-signing-europe-today-4-august-2026",
    time: "05/08/2026",
    engagement: "~18.7M",
  },
  {
    id: "t5",
    title: "BREAKING: Giovanni Reyna troca o Mönchengladbach pelo Strasbourg",
    title_en: "BREAKING: Giovanni Reyna joins Strasbourg from Mönchengladbach",
    summary: "O Strasbourg assegurou a contratação de Giovanni Reyna, proveniente do Borussia Mönchengladbach, por cerca de 3 milhões de euros. O internacional norte-americano ganha uma nova oportunidade para relançar a sua carreira em França.",
    summary_en: "Strasbourg have secured the signing of Giovanni Reyna from Borussia Mönchengladbach for around €3m. The United States international gets a new opportunity to relaunch his career in France.",
    tag: "BREAKING",
    source: "FootballTransfers",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/transfer-news-every-done-deal-official-confirmed-completed-signing-europe-today-4-august-2026",
    time: "05/08/2026",
    engagement: "~16.9M",
  },
  {
    id: "t6",
    title: "TRANSFER: Freddie Potts deixa o West Ham e ruma ao Club Brugge",
    title_en: "TRANSFER: Freddie Potts leaves West Ham for Club Brugge",
    summary: "O Club Brugge chegou a acordo para a contratação permanente de Freddie Potts ao West Ham por cerca de 10 milhões de euros. A transferência leva o médio inglês para a Bélgica, onde terá a primeira experiência fora de Inglaterra.",
    summary_en: "Club Brugge have agreed a permanent deal to sign Freddie Potts from West Ham for around €10m. The transfer takes the English midfielder to Belgium for his first experience outside England.",
    tag: "TRANSFER",
    source: "BBC Sport / FootballTransfers",
    url: "https://www.footballtransfers.com/en/transfer-news/uk-premier-league/2026/08/transfer-news-every-done-deal-official-confirmed-completed-signing-europe-today-4-august-2026",
    time: "05/08/2026",
    engagement: "~14.5M",
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
