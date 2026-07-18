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
    title: "🔥 HOT: Espanha e Argentina na Grande Final do Mundial 2026",
    title_en: "🔥 HOT: Spain and Argentina in the 2026 World Cup Final",
    summary: "A final do Mundial 2026 está definida para o dia 19 de julho em Nova Jérsia. A Argentina, atual campeã, defronta a Espanha, reeditando um confronto histórico e muito aguardado pelos fãs de futebol.",
    summary_en: "The 2026 World Cup final is set for July 19 in New Jersey. Defending champions Argentina face Spain, recreating a historic and highly anticipated clash for football fans.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "95.2M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Johan Manzambi no Aston Villa por £59.5M",
    title_en: "⚡ TRANSFER: Johan Manzambi to Aston Villa for £59.5M",
    summary: "O Aston Villa confirmou a contratação de Johan Manzambi ao Freiburg por 59.5 milhões de libras, um valor recorde para o clube. O jovem internacional suíço foi uma das grandes revelações do Mundial 2026.",
    summary_en: "Aston Villa have confirmed the signing of Johan Manzambi from Freiburg for a club-record £59.5 million. The young Swiss international was one of the breakout stars of the 2026 World Cup.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "62.4M",
  },
  {
    id: "t3",
    title: "🚨 SCANDAL: Escândalo de Viciação de Resultados na Turquia",
    title_en: "🚨 SCANDAL: Match-Fixing Scandal in Turkey",
    summary: "As autoridades turcas detiveram 17 dirigentes de clubes, incluindo de equipas de topo como Galatasaray e Besiktas, num escândalo massivo de apostas ilegais e viciação de resultados que abala o futebol do país.",
    summary_en: "Turkish authorities have detained 17 club officials, including from top teams like Galatasaray and Besiktas, in a massive illegal betting and match-fixing scandal rocking the country's football.",
    tag: "SCANDAL",
    source: "@TheIndependent",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "78.1M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Savinho no Tottenham por £65M",
    title_en: "⚡ TRANSFER: Savinho to Tottenham for £65M",
    summary: "O Tottenham está prestes a fechar a contratação do extremo Savinho ao Manchester City por cerca de 65 milhões de libras. O brasileiro chega para reforçar o ataque da equipa de Ange Postecoglou.",
    summary_en: "Tottenham are on the verge of completing the signing of winger Savinho from Manchester City for around £65 million. The Brazilian arrives to bolster Ange Postecoglou's attack.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "55.8M",
  },
  {
    id: "t5",
    title: "🔥 BREAKING: França e Inglaterra Disputam o 3º Lugar",
    title_en: "🔥 BREAKING: France and England Battle for 3rd Place",
    summary: "França e Inglaterra enfrentam-se hoje em Miami para decidir o 3º lugar do Mundial 2026. Um clássico europeu para fechar a participação de duas seleções que ambicionavam chegar à grande final.",
    summary_en: "France and England face off today in Miami to decide 3rd place in the 2026 World Cup. A European classic to conclude the campaign of two teams that aimed for the grand final.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "42.9M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Marc Guehi no Man City por £20M",
    title_en: "⚡ TRANSFER: Marc Guehi to Man City for £20M",
    summary: "O Manchester City garantiu a contratação do capitão do Crystal Palace, Marc Guehi, por 20 milhões de libras. Um negócio surpreendente que reforça a defesa dos citizens para a nova época.",
    summary_en: "Manchester City have secured the signing of Crystal Palace captain Marc Guehi for £20 million. A surprising deal that reinforces the Citizens' defense for the new season.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "18/07/2026",
    engagement: "48.5M",
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
