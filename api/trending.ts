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
    title: "⚡ BREAKING: Arsenal faz abordagem-surpresa por Vinícius Júnior",
    title_en: "⚡ BREAKING: Arsenal make shock approach for Vinícius Júnior",
    summary: "O Arsenal perguntou ao Real Madrid pelas condições para contratar Vinícius Júnior, que entra no último ano de contrato no Bernabéu. O movimento ainda está numa fase inicial, mas coloca o brasileiro entre os alvos de luxo de Mikel Arteta depois do título inglês.",
    summary_en: "Arsenal have asked Real Madrid about the conditions for signing Vinícius Júnior, who is entering the final year of his Bernabéu contract. The move remains at an early stage, but it places the Brazilian among Mikel Arteta's marquee targets after the English title.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/25/arsenal-inquiry-transfer-vinicius-junior-real-madrid",
    time: "26/07/2026",
    engagement: "~8.4M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Salah perto de trocar o Liverpool pelo Besiktas",
    title_en: "🚨 TRANSFER: Salah nearing Liverpool exit for Besiktas",
    summary: "Mohamed Salah está cada vez mais perto de assinar pelo Besiktas a custo zero. Segundo a ESPN, já existe um acordo de princípio para 12 meses, com opção por mais uma época, depois de o egípcio ter deixado o Liverpool no mês passado.",
    summary_en: "Mohamed Salah is edging closer to joining Besiktas on a free transfer. ESPN reports that there is already an agreement in principle for 12 months with an option for another season, after the Egyptian left Liverpool last month.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49445331/transfer-rumors-news-arsenal-viktor-gyokeres-atletico-madrid-julian-alvarez-swap-move",
    time: "26/07/2026",
    engagement: "~7.1M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Arsenal surge como destino possível para Julián Álvarez",
    title_en: "🔥 HOT: Arsenal emerge as possible destination for Julián Álvarez",
    summary: "O Atlético de Madrid só estará disposto a negociar Julián Álvarez com o Arsenal caso o avançado argentino queira sair. Os colchoneros priorizam reforços e veem Viktor Gyökeres como possível substituto numa operação que pode dominar o mercado.",
    summary_en: "Atlético Madrid would reportedly only be willing to negotiate Julián Álvarez's departure with Arsenal if the Argentine striker wants to leave. The club are prioritising incoming players and see Viktor Gyökeres as a possible replacement in a move that could dominate the window.",
    tag: "HOT",
    source: "ESPN / Cadena SER",
    url: "https://www.espn.com/soccer/story/_/id/49445331/transfer-rumors-news-arsenal-viktor-gyokeres-atletico-madrid-julian-alvarez-swap-move",
    time: "26/07/2026",
    engagement: "~5.6M",
  },
  {
    id: "t4",
    title: "🚨 TRANSFER: Real Madrid vê proposta de €100M por Yan Diomande rejeitada",
    title_en: "🚨 TRANSFER: Real Madrid see €100M bid for Yan Diomande rejected",
    summary: "O RB Leipzig rejeitou uma oferta do Real Madrid avaliada em €100M por Yan Diomande. A proposta igualava a tentativa anterior do Liverpool, mas ficou abaixo da avaliação dos alemães, enquanto o PSG continua atento ao avançado.",
    summary_en: "RB Leipzig have rejected a €100M bid from Real Madrid for Yan Diomande. The proposal matched Liverpool's previous attempt but fell below the German club's valuation, while PSG remain interested in the forward.",
    tag: "TRANSFER",
    source: "ESPN / Sky Germany",
    url: "https://www.espn.com/soccer/story/_/id/49445331/transfer-rumors-news-arsenal-viktor-gyokeres-atletico-madrid-julian-alvarez-swap-move",
    time: "26/07/2026",
    engagement: "~4.9M",
  },
  {
    id: "t5",
    title: "🚨 TRANSFER: Lacroix conclui exames médicos antes de transferência para o Chelsea",
    title_en: "🚨 TRANSFER: Lacroix completes medical ahead of Chelsea move",
    summary: "Maxence Lacroix concluiu os exames médicos antes de uma transferência de cerca de £52M do Crystal Palace para o Chelsea. A operação, avançada por Fabrizio Romano e reproduzida pela ESPN, aproxima o defesa francês de Stamford Bridge.",
    summary_en: "Maxence Lacroix has completed his medical ahead of a reported £52M move from Crystal Palace to Chelsea. The deal, reported by Fabrizio Romano and carried by ESPN, brings the French defender closer to Stamford Bridge.",
    tag: "TRANSFER",
    source: "ESPN / Fabrizio Romano",
    url: "https://www.espn.com/soccer/story/_/id/49445331/transfer-rumors-news-arsenal-viktor-gyokeres-atletico-madrid-julian-alvarez-swap-move",
    time: "26/07/2026",
    engagement: "~4.2M",
  },
  {
    id: "t6",
    title: "⚠️ SCANDAL: FIFA investiga confrontos da Argentina após final do Mundial",
    title_en: "⚠️ SCANDAL: FIFA investigates Argentina after World Cup final clashes",
    summary: "A FIFA ainda não aplicou sanções após os confrontos entre jogadores da Argentina e de Espanha no final do Mundial. Luis de la Fuente classificou as ações de Nahuel Molina e Leandro Paredes como intoleráveis, enquanto a investigação disciplinar continua.",
    summary_en: "FIFA have yet to impose sanctions after the clashes between Argentina and Spain players at the end of the World Cup final. Luis de la Fuente described the actions of Nahuel Molina and Leandro Paredes as intolerable while the disciplinary investigation continues.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/24/argentina-behaviour-world-cup-final-intolerable-de-la-fuente",
    time: "26/07/2026",
    engagement: "~6.8M",
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
