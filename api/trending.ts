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
    summary: "A grande final do Mundial 2026 está definida! A Argentina venceu a Inglaterra por 2-1 com uma reviravolta dramática nos minutos finais, juntando-se à Espanha que já tinha eliminado a França (2-0). A final ibero-americana joga-se no dia 19 de julho em Nova Iorque.",
    summary_en: "The 2026 World Cup final is set! Argentina beat England 2-1 with a dramatic late comeback, joining Spain who had already eliminated France (2-0). The Ibero-American final will be played on July 19 in New York.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "78.4M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Elliot Anderson no Man City por £116M",
    title_en: "⚡ TRANSFER: Elliot Anderson to Man City for £116M",
    summary: "O Manchester City confirmou a contratação bombástica de Elliot Anderson ao Nottingham Forest por 116 milhões de libras. O médio inglês, que está em destaque no Mundial, torna-se uma das transferências mais caras da história da Premier League.",
    summary_en: "Manchester City have confirmed the blockbuster signing of Elliot Anderson from Nottingham Forest for £116 million. The English midfielder, who has been shining at the World Cup, becomes one of the most expensive transfers in Premier League history.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "45.2M",
  },
  {
    id: "t3",
    title: "🚨 SCANDAL: Escândalo de Bilhetes no Mundial 2026",
    title_en: "🚨 SCANDAL: Ticket Scandal at the 2026 World Cup",
    summary: "A Associação de Futebol do Gana enfrenta um embaraço internacional devido a um alegado escândalo de venda ilegal de bilhetes para o Mundial 2026. Entretanto, na Malásia, várias pessoas foram detidas por atividades de apostas ilegais relacionadas com a competição.",
    summary_en: "The Ghana Football Association faces international embarrassment over an alleged illegal ticket sales scandal for the 2026 World Cup. Meanwhile, in Malaysia, several people have been arrested for illegal betting activities related to the competition.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "22.8M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Sandro Tonali Perto do Tottenham por £92.5M",
    title_en: "⚡ TRANSFER: Sandro Tonali Close to Tottenham for £92.5M",
    summary: "O Tottenham chegou a um acordo com o Newcastle para a transferência de Sandro Tonali por um valor recorde de 92.5 milhões de libras, mais 7.5 milhões em bónus. O médio italiano prepara-se para ser a grande contratação dos Spurs neste verão.",
    summary_en: "Tottenham have reached an agreement with Newcastle for the transfer of Sandro Tonali for a club-record fee of £92.5 million, plus £7.5 million in add-ons. The Italian midfielder is set to be Spurs' marquee signing this summer.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "38.6M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Regresso do Brasileirão com Clássico Botafogo x Santos",
    title_en: "🔥 HOT: Return of the Brasileirão with Botafogo vs Santos Classic",
    summary: "O Brasileirão Série A está de volta! A 19ª rodada arranca hoje com grandes jogos, com destaque para o confronto entre Botafogo e Santos no Estádio Nilton Santos, e o duelo entre Vitória e Vasco da Gama no Barradão.",
    summary_en: "The Brasileirão Série A is back! The 19th round kicks off today with big games, highlighted by the clash between Botafogo and Santos at the Nilton Santos Stadium, and the duel between Vitória and Vasco da Gama at the Barradão.",
    tag: "HOT",
    source: "@geglobo",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "19.5M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Marc Guéhi no Man City por £20M",
    title_en: "⚡ TRANSFER: Marc Guehi to Man City for £20M",
    summary: "Numa surpreendente jogada de mercado, o Manchester City garantiu a contratação do capitão do Crystal Palace, Marc Guéhi, por cerca de 20 milhões de libras. O defesa central inglês reforça a equipa de Pep Guardiola para a nova época.",
    summary_en: "In a surprising market move, Manchester City have secured the signing of Crystal Palace captain Marc Guehi for around £20 million. The English centre-back reinforces Pep Guardiola's squad for the new season.",
    tag: "TRANSFER",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "16/07/2026",
    engagement: "31.4M",
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
