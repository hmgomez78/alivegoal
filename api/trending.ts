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

// Conteúdo editorial verificado e atualizado em 09/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Infantino nega alegações sobre pagamento da UEFA",
    title_en: "SCANDAL: Infantino denies allegations over UEFA payment",
    summary: "Gianni Infantino negou de forma categórica alegações de que a UEFA efetuou um pagamento de saída a uma antiga colaboradora com quem teria mantido uma relação durante o seu período como secretário-geral. A UEFA confirmou que houve um pagamento de saída, mas a FIFA classificou quaisquer alegações de conduta imprópria como falsas.",
    summary_en: "Gianni Infantino has categorically denied allegations that UEFA made a departure payment to a former employee with whom he was alleged to have had a relationship during his time as general secretary. UEFA confirmed that a departure payment was made, while FIFA described any suggestion of improper conduct as untrue.",
    tag: "SCANDAL",
    source: "The Guardian / Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/8/8/fifa-president-gianni-infantino-denies-claims-uefa-paid-off-alleged-lover",
    time: "09/08/2026",
    engagement: "~52.3M estimado",
  },
  {
    id: "t2",
    title: "BREAKING: Arsenal confirma Bruno Guimarães por £75 milhões",
    title_en: "BREAKING: Arsenal confirm Bruno Guimaraes in £75m deal",
    summary: "O Arsenal confirmou a contratação de Bruno Guimarães ao Newcastle United. Segundo fontes da ESPN, o valor fixo é de 75 milhões de libras e o internacional brasileiro assinou por quatro épocas, com opção por mais uma.",
    summary_en: "Arsenal have confirmed the signing of Bruno Guimaraes from Newcastle United. According to ESPN sources, the fixed fee is £75m and the Brazil international has signed a four-year deal with an option for a further season.",
    tag: "BREAKING",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49559004/transfer-rumors-news-arsenal-manchester-united-inter-milan-pio-esposito",
    time: "09/08/2026",
    engagement: "~48.1M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Barcelona sobe a oferta por Rodri para £51,4 milhões",
    title_en: "TRANSFER: Barcelona raise Rodri offer to £51.4m",
    summary: "O Barcelona aumentou para 51,4 milhões de libras a proposta por Rodri e continua em conversações com o Manchester City. O clube inglês já recusou uma oferta anterior, pelo que o processo continua dependente de acordo entre os clubes.",
    summary_en: "Barcelona have raised their offer for Rodri to £51.4m and remain in talks with Manchester City. The English club already rejected an earlier bid, so the move still depends on an agreement between the clubs.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c05qvj0yj46o",
    time: "09/08/2026",
    engagement: "~44.8M estimado",
  },
  {
    id: "t4",
    title: "HOT: Liverpool prepara empréstimo de Ronald Araújo",
    title_en: "HOT: Liverpool prepare Ronald Araujo loan move",
    summary: "O Liverpool está perto de assegurar Ronald Araújo por empréstimo de uma época junto do Barcelona, segundo fontes da ESPN. A operação inclui uma opção de compra, mas deve ser tratada como acordo em desenvolvimento enquanto não houver anúncio oficial.",
    summary_en: "Liverpool are close to securing Ronald Araujo on a season-long loan from Barcelona, according to ESPN sources. The move includes an option to make the transfer permanent, but should be treated as a developing agreement until officially announced.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49559004/transfer-rumors-news-arsenal-manchester-united-inter-milan-pio-esposito",
    time: "09/08/2026",
    engagement: "~41.5M estimado",
  },
  {
    id: "t5",
    title: "TRANSFER: Ferran Torres pede ao Barcelona para negociar com o PSG",
    title_en: "TRANSFER: Ferran Torres asks Barcelona to negotiate with PSG",
    summary: "Ferran Torres informou o Barcelona de que pretende juntar-se ao Paris Saint-Germain, depois de alegadamente ter chegado a entendimento pessoal com o campeão europeu. A ESPN indica que o clube catalão não deverá bloquear a saída se surgir um acordo financeiro.",
    summary_en: "Ferran Torres has told Barcelona that he wants to join Paris Saint-Germain after reportedly agreeing personal terms with the European champions. ESPN reports that the Catalan club are not expected to stand in his way if a financial agreement is reached.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49559004/transfer-rumors-news-arsenal-manchester-united-inter-milan-pio-esposito",
    time: "09/08/2026",
    engagement: "~36.2M estimado",
  },
  {
    id: "t6",
    title: "HOT: Sergi Roberto assina pelos LA Galaxy até 2028",
    title_en: "HOT: Sergi Roberto signs for LA Galaxy through 2028",
    summary: "O LA Galaxy anunciou a contratação de Sergi Roberto, ex-Barcelona e Como, como jogador livre. O médio espanhol assinou até ao final de 2027-28, com opção para 2028-29, acrescentando experiência europeia a uma equipa que procura recuperar terreno na MLS.",
    summary_en: "LA Galaxy have announced the signing of Sergi Roberto, formerly of Barcelona and Como, as a free agent. The Spanish midfielder signed through the end of 2027-28 with an option for 2028-29, adding European experience to a side aiming to regain ground in MLS.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49559004/transfer-rumors-news-arsenal-manchester-united-inter-milan-pio-esposito",
    time: "09/08/2026",
    engagement: "~28.4M estimado",
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
