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

// Fallback data
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "🔥 HOT: Espanha e Argentina na Final do Mundial 2026",
    title_en: "🔥 HOT: Spain and Argentina in the 2026 World Cup Final",
    summary: "A grande final do Mundial 2026 está definida! A Argentina de Lionel Messi venceu a Inglaterra por 2-1 com uma reviravolta dramática nos minutos finais, juntando-se à Espanha que eliminou a França (2-0). A final ibero-americana joga-se no dia 19 de julho em Nova Iorque.",
    summary_en: "The 2026 World Cup final is set! Lionel Messi's Argentina beat England 2-1 with a dramatic late comeback, joining Spain who eliminated France (2-0). The Ibero-American final will be played on July 19 in New York.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "85.4M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Elliot Anderson no Man City por £116M",
    title_en: "⚡ TRANSFER: Elliot Anderson to Man City for £116M",
    summary: "O Manchester City confirmou a contratação bombástica de Elliot Anderson ao Nottingham Forest por 116 milhões de libras. O médio inglês torna-se uma das transferências mais caras da história da Premier League e reforça a equipa de Guardiola.",
    summary_en: "Manchester City have confirmed the blockbuster signing of Elliot Anderson from Nottingham Forest for £116 million. The English midfielder becomes one of the most expensive transfers in Premier League history and reinforces Guardiola's squad.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "52.2M",
  },
  {
    id: "t3",
    title: "🚨 SCANDAL: Escândalo de Viciação de Resultados na República Checa",
    title_en: "🚨 SCANDAL: Match-Fixing Scandal in the Czech Republic",
    summary: "A polícia checa, em colaboração com a Europol, executou dezenas de detenções num escândalo de viciação de resultados envolvendo o MFK Karviná. O clube foi despromovido e banido das competições da UEFA por suborno a árbitros.",
    summary_en: "Czech police, in collaboration with Europol, executed dozens of arrests in a match-fixing scandal involving MFK Karviná. The club was relegated and banned from UEFA competitions for bribing referees.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "28.8M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Luka Vuskovic no Brighton por £50M",
    title_en: "⚡ TRANSFER: Luka Vuskovic to Brighton for £50M",
    summary: "O Brighton garantiu a contratação do defesa Luka Vuskovic ao Tottenham por um valor recorde para o clube de 50 milhões de libras. Uma jogada ousada no mercado de transferências da Premier League.",
    summary_en: "Brighton have secured the signing of defender Luka Vuskovic from Tottenham for a club-record fee of £50 million. A bold move in the Premier League transfer market.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "31.6M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Brasileirão com Bahia x Chapecoense e Clássicos",
    title_en: "🔥 HOT: Brasileirão with Bahia vs Chapecoense and Classics",
    summary: "A 19ª rodada do Brasileirão Série A promete grandes emoções hoje! Destaque para o confronto entre Bahia e Chapecoense, além dos embates Fluminense x Mirassol e Botafogo x Vitória.",
    summary_en: "The 19th round of the Brasileirão Série A promises great emotions today! Highlight for the clash between Bahia and Chapecoense, plus Fluminense vs Mirassol and Botafogo vs Vitória.",
    tag: "HOT",
    source: "@geglobo",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "21.5M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Andrey Santos no Man Utd por £48M",
    title_en: "⚡ TRANSFER: Andrey Santos to Man Utd for £48M",
    summary: "O Manchester United surpreendeu o mercado ao garantir o médio brasileiro Andrey Santos ao rival Chelsea por cerca de 48 milhões de libras, reforçando o meio-campo de Michael Carrick.",
    summary_en: "Manchester United surprised the market by securing Brazilian midfielder Andrey Santos from rivals Chelsea for around £48 million, reinforcing Michael Carrick's midfield.",
    tag: "TRANSFER",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "17/07/2026",
    engagement: "41.4M",
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
