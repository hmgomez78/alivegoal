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
    title: "🚨 BREAKING: Inglaterra Elimina Noruega de Haaland no Prolongamento",
    title_en: "🚨 BREAKING: England Eliminates Haaland's Norway in Extra Time",
    summary: "Num jogo eletrizante dos quartos de final do Mundial 2026, a Inglaterra superou a Noruega por 2-1 no prolongamento. Jude Bellingham foi o herói da noite ao marcar os dois golos ingleses, garantindo a passagem às meias-finais, onde vão defrontar a Argentina ou a Suíça.",
    summary_en: "In an electrifying 2026 World Cup quarter-final match, England overcame Norway 2-1 in extra time. Jude Bellingham was the hero of the night, scoring both English goals to secure a place in the semi-finals, where they will face Argentina or Switzerland.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "25.4M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Liverpool Perto de Fechar Contratação de £38 Milhões",
    title_en: "⚡ TRANSFER: Liverpool Close to Sealing £38 Million Signing",
    summary: "O Liverpool está na iminência de anunciar uma contratação de £38 milhões, segundo Fabrizio Romano. A equipa de Arne Slot continua a reforçar o plantel para a nova época, juntando-se a outros clubes ingleses muito ativos no mercado de transferências de verão.",
    summary_en: "Liverpool is on the verge of announcing a £38 million signing, according to Fabrizio Romano. Arne Slot's team continues to strengthen their squad for the new season, joining other English clubs very active in the summer transfer window.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "12.8M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Argentina de Messi Supera Suíça e Marca Encontro com Inglaterra",
    title_en: "🔥 HOT: Messi's Argentina Overcomes Switzerland and Sets Up Clash with England",
    summary: "A Argentina confirmou o seu favoritismo ao vencer a Suíça, garantindo o apuramento para as meias-finais do Mundial 2026. Lionel Messi continua a sua caminhada de sonho rumo a mais um título mundial. O próximo adversário será a Inglaterra, num jogo que promete parar o mundo do futebol.",
    summary_en: "Argentina confirmed their favoritism by beating Switzerland, securing qualification for the 2026 World Cup semi-finals. Lionel Messi continues his dream journey towards another world title. The next opponent will be England, in a match that promises to stop the football world.",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "30.1M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Manchester City Contrata Marc Guehi por £20M",
    title_en: "⚡ TRANSFER: Manchester City Signs Marc Guehi for £20M",
    summary: "O Manchester City garantiu a contratação do capitão do Crystal Palace, Marc Guehi, por 20 milhões de libras. Pep Guardiola reforça a defesa dos Citizens com um jogador experiente na Premier League, num negócio considerado uma excelente oportunidade de mercado.",
    summary_en: "Manchester City has secured the signing of Crystal Palace captain Marc Guehi for £20 million. Pep Guardiola strengthens the Citizens' defense with an experienced Premier League player, in a deal considered an excellent market opportunity.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "15.3M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Espanha Elimina Uruguai e Avança para as Meias-Finais",
    title_en: "🚨 BREAKING: Spain Eliminates Uruguay and Advances to Semi-Finals",
    summary: "A Espanha derrotou o Uruguai por 1-0 e garantiu o seu lugar nas meias-finais do Campeonato do Mundo de 2026. A La Roja vai agora enfrentar a França num duelo de gigantes europeus, após os franceses terem superado a Noruega na sua caminhada.",
    summary_en: "Spain defeated Uruguay 1-0 and secured their place in the 2026 World Cup semi-finals. La Roja will now face France in a clash of European giants, after the French overcame Norway on their path.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "18.9M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Brasileirão Série B em Destaque Hoje com Jogos Decisivos",
    title_en: "🔥 HOT: Brasileirão Série B in Focus Today with Decisive Matches",
    summary: "O domingo de futebol destaca-se também pelos jogos da 17ª rodada do Brasileirão Série B. O São Bernardo enfrenta o Cuiabá, enquanto o Atlético-GO recebe o Fortaleza em jogos cruciais para as aspirações de subida das equipas envolvidas.",
    summary_en: "Football Sunday is also highlighted by the 17th round matches of the Brasileirão Série B. São Bernardo faces Cuiabá, while Atlético-GO hosts Fortaleza in crucial games for the promotion aspirations of the teams involved.",
    tag: "HOT",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "12/07/2026",
    engagement: "8.5M",
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
