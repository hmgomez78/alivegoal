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
    title: "⚡ BREAKING: PSG pede £145M por Barcola, Arsenal e Liverpool atentos",
    title_en: "⚡ BREAKING: PSG want £145M for Barcola, Arsenal and Liverpool alert",
    summary: "O Paris Saint-Germain definiu o preço de Bradley Barcola em 145 milhões de libras. O avançado francês de 23 anos atrai forte interesse de Arsenal e Liverpool, segundo relatórios divulgados hoje, podendo protagonizar uma das maiores transferências do verão.",
    summary_en: "Paris Saint-Germain have set an asking price of £145m for Bradley Barcola. The 23-year-old France forward is attracting strong interest from Arsenal and Liverpool, according to today's reports, potentially leading to one of the summer's biggest transfers.",
    tag: "BREAKING",
    source: "BBC Sport / The Times",
    url: "https://www.bbc.com/sport/football/articles/cly5189yjgdo",
    time: "27/07/2026",
    engagement: "~8.2M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Real Madrid exige €160M por Vinícius Júnior",
    title_en: "🚨 TRANSFER: Real Madrid demand €160M for Vinícius Júnior",
    summary: "O Real Madrid fixou o preço de venda de Vinícius Júnior em 160 milhões de euros. Embora o Arsenal ainda não tenha iniciado negociações formais, os merengues estabeleceram a fasquia para o avançado brasileiro, cuja prioridade continua a ser a renovação em Madrid.",
    summary_en: "Real Madrid have set a price of 160m euros (£137m) to sell Vinicius Jr. Although Arsenal have not yet opened formal talks, the Spanish giants have set the bar for the Brazilian forward, whose priority remains signing a new deal in Madrid.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cly5189yjgdo",
    time: "27/07/2026",
    engagement: "~7.5M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Inter de Milão negoceia Cristian Romero com o Tottenham",
    title_en: "🔥 HOT: Inter Milan in talks with Tottenham over Cristian Romero",
    summary: "O Inter de Milão iniciou conversações com o Tottenham para a possível contratação do capitão Cristian Romero. O defesa argentino surge como alvo prioritário para reforçar o eixo defensivo da equipa italiana na nova temporada.",
    summary_en: "Internazionale have entered talks with Tottenham over the potential signing of captain Cristian Romero. The Argentine defender has emerged as a priority target to bolster the Italian side's defence for the new season.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "27/07/2026",
    engagement: "~5.8M",
  },
  {
    id: "t4",
    title: "🚨 TRANSFER: Real Madrid perto de garantir Yan Diomande",
    title_en: "🚨 TRANSFER: Real Madrid close to securing Yan Diomande",
    summary: "O Real Madrid está preparado para fechar a contratação de Yan Diomande. O extremo costa-marfinense de 19 anos do RB Leipzig já terá acordado os termos pessoais, num negócio acelerado após a retirada formal do PSG da corrida.",
    summary_en: "Real Madrid are ready to seal the deal for Yan Diomande. The 19-year-old Ivory Coast winger from RB Leipzig has reportedly agreed personal terms, in a move accelerated after PSG formally withdrew from the race.",
    tag: "TRANSFER",
    source: "The Guardian / Sky Sports",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "27/07/2026",
    engagement: "~6.1M",
  },
  {
    id: "t5",
    title: "⚠️ SCANDAL: Olmo rejeita desculpas de Ayala após incidentes no Mundial",
    title_en: "⚠️ SCANDAL: Olmo rejects Ayala's apology after World Cup incidents",
    summary: "Dani Olmo rejeitou publicamente as desculpas do treinador-adjunto da Argentina, Roberto Ayala, acusando-o de mentir sobre o que desencadeou os confrontos no final do Mundial 2026. A FIFA mantém a investigação disciplinar à conduta da seleção sul-americana.",
    summary_en: "Dani Olmo has publicly rejected the apology of Argentina assistant coach Roberto Ayala, accusing him of lying about what triggered the clashes at the end of the 2026 World Cup. FIFA's disciplinary investigation into the South American team's conduct is ongoing.",
    tag: "SCANDAL",
    source: "Times of India / Diari de Terrassa",
    url: "https://timesofindia.indiatimes.com/sports/football/fifa-world-cup/hes-lying-isnt-sorry-at-all-spains-dani-olmo-refuses-to-accept-argentina-assistant-coachs-fake-apology/articleshow/132650198.cms",
    time: "27/07/2026",
    engagement: "~8.9M",
  },
  {
    id: "t6",
    title: "🚨 TRANSFER: Al-Hilal inicia conversações por Iliman Ndiaye",
    title_en: "🚨 TRANSFER: Al-Hilal open talks for Iliman Ndiaye",
    summary: "O Al-Hilal iniciou conversações formais para contratar Iliman Ndiaye ao Everton. O extremo senegalês de 26 anos é o mais recente alvo da liga saudita, mantendo a pressão financeira sobre os clubes da Premier League.",
    summary_en: "Al-Hilal have opened formal talks over signing Iliman Ndiaye from Everton. The 26-year-old Senegal winger is the latest target for the Saudi league, maintaining the financial pressure on Premier League clubs.",
    tag: "TRANSFER",
    source: "BBC Sport / Fabrizio Romano",
    url: "https://www.bbc.com/sport/football/articles/cly5189yjgdo",
    time: "27/07/2026",
    engagement: "~4.3M",
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
