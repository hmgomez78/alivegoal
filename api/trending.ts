import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs",
};

interface TrendingItem {
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

// Notícias curadas — atualizadas 17/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "💥 BREAKING: Rúben Amorim no AC Milan e Manchester United poupa fortuna!",
    title_en: "💥 BREAKING: Rúben Amorim to AC Milan and Manchester United saves a fortune!",
    summary: "O Manchester United vai poupar mais de 10 milhões de euros em indemnizações após Rúben Amorim fechar acordo para ser o novo treinador do AC Milan. O técnico português assina até 2028 com os rossoneri.",
    summary_en: "Manchester United will save over 10 million euros in compensation after Rúben Amorim agreed to become the new AC Milan head coach. The Portuguese manager signs until 2028 with the Rossoneri.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "65.2M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Sandro Tonali no radar do Tottenham de Roberto De Zerbi!",
    title_en: "🔥 TRANSFER: Sandro Tonali on the radar of Roberto De Zerbi's Tottenham!",
    summary: "O Tottenham prepara uma investida de 85 milhões de libras por Sandro Tonali do Newcastle. O médio italiano é o principal alvo de Roberto De Zerbi para renovar o meio-campo dos Spurs neste verão.",
    summary_en: "Tottenham is preparing an £85 million bid for Newcastle's Sandro Tonali. The Italian midfielder is Roberto De Zerbi's top target to revamp Spurs' midfield this summer.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "48.1M",
  },
  {
    id: "t3",
    title: "🚨 SCANDAL: Carreira de Brendan Sorsby no futebol universitário chega ao fim após processo!",
    title_en: "🚨 SCANDAL: Brendan Sorsby's college football career ends after lawsuit!",
    summary: "O quarterback do Texas Tech, Brendan Sorsby, viu a sua carreira no futebol universitário terminada após um escândalo de apostas e um processo judicial movido pela Universidade de Cincinnati por quebra de contrato NIL.",
    summary_en: "Texas Tech quarterback Brendan Sorsby saw his college football career ended following a gambling scandal and a lawsuit filed by the University of Cincinnati for breach of NIL contract.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "35.8M",
  },
  {
    id: "t4",
    title: "⚽ HOT: Portugal vs RD Congo HOJE! Cristiano Ronaldo lidera as tropas!",
    title_en: "⚽ HOT: Portugal vs DR Congo TODAY! Cristiano Ronaldo leads the troops!",
    summary: "Portugal entra em campo hoje no Mundial 2026 contra a RD Congo no NRG Stadium em Houston. A equipa das quinas procura iniciar a caminhada rumo ao título inédito com uma vitória convincente no Grupo K.",
    summary_en: "Portugal takes the field today in the 2026 World Cup against DR Congo at NRG Stadium in Houston. The national team looks to start their journey towards a maiden title with a convincing win in Group K.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "89.5M",
  },
  {
    id: "t5",
    title: "💥 BREAKING: Josko Gvardiol renova com o Manchester City até 2031!",
    title_en: "💥 BREAKING: Josko Gvardiol renews with Manchester City until 2031!",
    summary: "Apesar do interesse do Real Madrid, o defesa croata Josko Gvardiol decidiu assinar um novo contrato de cinco anos com o Manchester City, garantindo o seu futuro no Etihad até 2031 com um aumento salarial.",
    summary_en: "Despite interest from Real Madrid, Croatian defender Josko Gvardiol has decided to sign a new five-year contract with Manchester City, securing his future at the Etihad until 2031 with a pay rise.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "52.4M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Barcelona falha prazo para Marcus Rashford e United pede 40M£!",
    title_en: "🔥 TRANSFER: Barcelona misses Marcus Rashford deadline and United demands £40M!",
    summary: "O Barcelona deixou expirar a opção de compra de 30M€ por Marcus Rashford após o empréstimo. O Manchester United fixou agora uma cláusula de rescisão de 40 milhões de libras para a venda do avançado inglês neste verão.",
    summary_en: "Barcelona let the €30M buy option for Marcus Rashford expire after his loan. Manchester United has now set a £40 million release clause for the sale of the English forward this summer.",
    tag: "TRANSFER",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "17/06/2026",
    engagement: "71.9M",
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
