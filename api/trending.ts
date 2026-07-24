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
    title: "⚡ BREAKING: Alemanha prepara anúncio de Jürgen Klopp",
    title_en: "⚡ BREAKING: Germany prepare Jürgen Klopp announcement",
    summary: "A federação alemã convocou uma conferência de imprensa e a cobertura internacional aponta Jürgen Klopp como o candidato esperado para assumir a seleção, depois da eliminação no Mundial 2026. Até ao anúncio, a nomeação deve ser tratada como expectativa, não como confirmação oficial.",
    summary_en: "The German federation has called a press conference and international coverage identifies Jürgen Klopp as the expected candidate to take over the national team after the 2026 World Cup exit. Until the announcement, the appointment should be treated as expected rather than officially confirmed.",
    tag: "BREAKING",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49430976/germany-calls-news-conference-klopp-expected-named-coach",
    time: "24/07/2026",
    engagement: "~3.5M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Alejandro Garnacho ruma ao Aston Villa por empréstimo",
    title_en: "🚨 TRANSFER: Alejandro Garnacho joins Aston Villa on loan",
    summary: "O extremo internacional argentino deixa o Chelsea por empréstimo para a temporada 2026/27, num negócio com cláusula de compra obrigatória mediante objetivos. A transferência é vista como um movimento de peso para as ambições europeias da equipa de Unai Emery.",
    summary_en: "The Argentina international winger leaves Chelsea on loan for the 2026/27 season, in a deal featuring an obligation to buy based on performance criteria. The move is seen as a major statement for Unai Emery's European ambitions.",
    tag: "TRANSFER",
    source: "BBC Sport / ESPN",
    url: "https://www.bbc.com/sport/football/articles/c1d1g6k51l7o",
    time: "24/07/2026",
    engagement: "~2.8M",
  },
  {
    id: "t3",
    title: "🚨 TRANSFER: Barcelona assegura contratação de Karim Adeyemi",
    title_en: "🚨 TRANSFER: Barcelona secure signing of Karim Adeyemi",
    summary: "O clube catalão confirmou a contratação do extremo internacional alemão ao Borussia Dortmund por cerca de €22M (£19M), mais bónus. A operação acrescenta velocidade e profundidade às opções ofensivas do clube para a nova temporada da La Liga.",
    summary_en: "The Catalan club has confirmed the signing of the German international winger from Borussia Dortmund for around €22M (£19M) plus add-ons. The deal adds pace and depth to the club's attacking options for the new La Liga season.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/23/transfer-roundup-barcelona-sign-karim-adeyemi-newcastle-aladji-bamba-monaco",
    time: "24/07/2026",
    engagement: "~2.1M",
  },
  {
    id: "t4",
    title: "🚨 TRANSFER: Arsenal fecha acordo de £34M por Christos Tzolis",
    title_en: "🚨 TRANSFER: Arsenal seal £34M deal for Christos Tzolis",
    summary: "O avançado internacional grego troca o Club Brugge pelos Gunners num contrato de longo prazo. A transferência reforça as opções ofensivas de Mikel Arteta na corrida pelo título da Premier League.",
    summary_en: "The Greek international forward swaps Club Brugge for the Gunners on a long-term contract. The transfer bolsters Mikel Arteta's attacking options in the Premier League title race.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cp8xk0x902do",
    time: "24/07/2026",
    engagement: "~1.9M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Newcastle em negociações avançadas por Aladji Bamba",
    title_en: "🔥 HOT: Newcastle in advanced talks for Aladji Bamba",
    summary: "Os Magpies estão perto de fechar um acordo de £34M com o Monaco pelo médio francês de 20 anos. O negócio é visto como uma peça fundamental na renovação do meio-campo da equipa inglesa.",
    summary_en: "The Magpies are close to agreeing a £34M deal with Monaco for the 20-year-old French midfielder. The move is seen as a key piece in the rebuilding of the English side's midfield.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/23/transfer-roundup-barcelona-sign-karim-adeyemi-newcastle-aladji-bamba-monaco",
    time: "24/07/2026",
    engagement: "~1.5M",
  },
  {
    id: "t6",
    title: "⚠️ SCANDAL: FA encerra caso de luta entre jogadores dos Sub-16",
    title_en: "⚠️ SCANDAL: FA close Under-16 player fight case",
    summary: "A Federação Inglesa afirmou que um confronto entre dois jogadores dos Sub-16, registado durante um estágio na Turquia em 2025, foi um “assunto interno” resolvido rapidamente. A FA declarou que não haverá novas medidas disciplinares no caso.",
    summary_en: "The Football Association said a confrontation between two England Under-16 players, filmed during a 2025 camp in Turkey, was an “internal matter” resolved quickly. The FA stated that no further disciplinary action will be taken.",
    tag: "SCANDAL",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c9d85v9n1n5o",
    time: "24/07/2026",
    engagement: "~2.4M",
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
