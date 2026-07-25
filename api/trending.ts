import { VercelRequest, VercelResponse } from "@vercel/node";

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

const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "⚡ BREAKING: Jürgen Klopp nomeado selecionador da Alemanha até 2030",
    title_en: "⚡ BREAKING: Jürgen Klopp appointed Germany head coach until 2030",
    summary: "O ex-treinador do Liverpool assinou um contrato de quatro anos para liderar a renovação da 'Mannschaft'. Na apresentação, Klopp prometeu transformar o futebol do país, mas deixou um aviso contundente de que abandonará o cargo se a sua família for alvo de devassa por parte da comunicação social.",
    summary_en: "The former Liverpool manager has signed a four-year deal to lead the rebuilding of the 'Mannschaft'. At his unveiling, Klopp promised to transform the country's football but delivered a stark warning that he will walk away if the media intrudes on his family's privacy.",
    tag: "BREAKING",
    source: "BBC Sport / The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/24/germany-confirm-jurgen-klopp-new-head-coach",
    time: "25/07/2026",
    engagement: "~4.8M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Chelsea fecha contratação de Maxence Lacroix por £60M",
    title_en: "🚨 TRANSFER: Chelsea agree £60M deal for Maxence Lacroix",
    summary: "Os Blues chegaram a acordo com o Crystal Palace para a transferência do defesa-central internacional francês, num negócio que eleva os gastos de verão do clube para lá dos £200M. O jogador de 26 anos é esperado nas próximas 24 horas para exames médicos.",
    summary_en: "The Blues have reached an agreement with Crystal Palace for the transfer of the French international centre-back, in a deal that pushes the club's summer spending past £200M. The 26-year-old is expected to undergo a medical in the next 24 hours.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cp9eyz14y7jo",
    time: "25/07/2026",
    engagement: "~3.1M",
  },
  {
    id: "t3",
    title: "⚠️ SCANDAL: Comportamento da Argentina na final do Mundial rotulado de 'intolerável'",
    title_en: "⚠️ SCANDAL: Argentina's World Cup final behaviour labelled 'intolerable'",
    summary: "O selecionador espanhol, Luis de la Fuente, criticou duramente os atos de agressão e provocação dos jogadores argentinos após a final do Mundial 2026. A FIFA abriu uma investigação disciplinar aos incidentes que envolveram confrontos físicos no relvado.",
    summary_en: "Spain head coach Luis de la Fuente has strongly criticised the acts of aggression and provocation by Argentine players following the 2026 World Cup final. FIFA has opened a disciplinary investigation into the incidents that involved physical confrontations on the pitch.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/24/argentina-behaviour-world-cup-final-intolerable-de-la-fuente",
    time: "25/07/2026",
    engagement: "~5.2M",
  },
  {
    id: "t4",
    title: "🚨 TRANSFER: Newcastle assegura Aladji Bamba por £34M",
    title_en: "🚨 TRANSFER: Newcastle secure Aladji Bamba for £34M",
    summary: "Os Magpies confirmaram a contratação do promissor médio de 20 anos ao Monaco. O internacional jovem francês assinou um contrato de cinco anos e torna-se a quarta aquisição de peso de Eddie Howe para atacar o topo da Premier League.",
    summary_en: "The Magpies have confirmed the signing of the promising 20-year-old midfielder from Monaco. The French youth international has signed a five-year contract and becomes Eddie Howe's fourth major acquisition to challenge at the top of the Premier League.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c4gdl72zpvno",
    time: "25/07/2026",
    engagement: "~2.4M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Rodri forçado a cirurgia às costas após Mundial",
    title_en: "🔥 HOT: Rodri forced into back surgery following World Cup",
    summary: "Enzo Maresca, o novo treinador do Manchester City, confirmou que o médio espanhol recém-coroado campeão do mundo vai ser operado na segunda-feira. A intervenção afasta Rodri do arranque da temporada, num momento em que surgem rumores de interesse do Real Madrid.",
    summary_en: "Enzo Maresca, the new Manchester City manager, has confirmed that the newly crowned Spanish World Cup-winning midfielder will undergo surgery on Monday. The procedure rules Rodri out of the start of the season amid emerging rumours of interest from Real Madrid.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cp3rywwrd14o",
    time: "25/07/2026",
    engagement: "~3.8M",
  },
  {
    id: "t6",
    title: "🚨 TRANSFER: Crysencio Summerville troca West Ham pelo Al-Hilal",
    title_en: "🚨 TRANSFER: Crysencio Summerville swaps West Ham for Al-Hilal",
    summary: "O extremo neerlandês deixou o futebol inglês para se juntar ao Al-Hilal da Arábia Saudita, num negócio avaliado em cerca de €70M (£59.8M). A transferência representa mais um golpe do mercado saudita na Premier League.",
    summary_en: "The Dutch winger has left English football to join Saudi Arabia's Al-Hilal in a deal valued at around €70M (£59.8M). The transfer represents yet another strike by the Saudi market on the Premier League.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/24/transfers-newcastle-sign-aladji-bamba-monaco",
    time: "25/07/2026",
    engagement: "~2.1M",
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
