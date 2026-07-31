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

// Conteúdo editorial verificado em 31/07/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "TRANSFER: John Stones assina pelo Inter de Milão a custo zero",
    title_en: "TRANSFER: John Stones joins Inter Milan on a free transfer",
    summary: "O defesa inglês John Stones foi confirmado como novo reforço do Inter de Milão, assinando um contrato de dois anos. O jogador de 32 anos deixa o Manchester City após uma década recheada de títulos, reforçando os campeões italianos na defesa do Scudetto.",
    summary_en: "English defender John Stones has been confirmed as Inter Milan's new signing, putting pen to paper on a two-year contract. The 32-year-old leaves Manchester City after a trophy-laden decade to bolster the Italian champions' Scudetto defence.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cp3rklgggn5o",
    time: "31/07/2026",
    engagement: "~15.2M",
  },
  {
    id: "t2",
    title: "BREAKING: Eddie Howe deixa o comando técnico do Newcastle",
    title_en: "BREAKING: Eddie Howe leaves Newcastle United head coach role",
    summary: "Eddie Howe abandonou o Newcastle com efeito imediato, após quase cinco anos e a conquista da Taça da Liga em 2025. O desgaste na política de transferências e as vendas de figuras-chave terão pesado na decisão; Matthias Jaissle, do Al-Ahli, é o sucessor esperado.",
    summary_en: "Eddie Howe has left Newcastle with immediate effect after almost five years and winning the 2025 League Cup. Friction over transfer policy and key player sales reportedly factored into the decision; Al-Ahli's Matthias Jaissle is expected to succeed him.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/30/eddie-howe-leaves-newcastle-united-premier-league",
    time: "31/07/2026",
    engagement: "~18.4M",
  },
  {
    id: "t3",
    title: "TRANSFER: Tonali no Tottenham por £100M em negócio recorde",
    title_en: "TRANSFER: Tonali to Tottenham for £100m in club-record deal",
    summary: "Sandro Tonali é o novo reforço do Tottenham numa transferência de 100 milhões de libras, a mais cara da história dos Spurs. O médio italiano revelou que bastaram dez minutos de conversa com Roberto De Zerbi para ser convencido pelo projeto londrino.",
    summary_en: "Sandro Tonali has joined Tottenham in a £100m transfer, the most expensive in Spurs' history. The Italian midfielder revealed it took just ten minutes of conversation with Roberto De Zerbi to be convinced by the London club's project.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cz7dlyq1qnwo",
    time: "31/07/2026",
    engagement: "~14.8M",
  },
  {
    id: "t4",
    title: "HOT: Arsenal avança com confiança por Bruno Guimarães",
    title_en: "HOT: Arsenal push forward with confidence for Bruno Guimaraes",
    summary: "A saída de Eddie Howe do Newcastle reforçou a confiança do Arsenal em garantir a contratação do capitão Bruno Guimarães. Fontes apontam para uma operação que poderá atingir os 80 milhões de libras, com o médio brasileiro desejoso de ingressar nos campeões ingleses.",
    summary_en: "Eddie Howe's departure from Newcastle has boosted Arsenal's confidence in securing captain Bruno Guimaraes. Sources point to a deal that could reach £80m, with the Brazilian midfielder reportedly keen to join the English champions.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49489371/arsenal-confident-signing-bruno-guimaraes-eddie-howe-leaves-newcastle",
    time: "31/07/2026",
    engagement: "~11.3M",
  },
  {
    id: "t5",
    title: "SCANDAL: UEFA ameaça boicotar Mundiais devido a planos da FIFA",
    title_en: "SCANDAL: UEFA threatens World Cup boycott over FIFA plans",
    summary: "A UEFA e as federações europeias ameaçaram boicotar todas as competições da FIFA, incluindo os Mundiais masculino e feminino. Em causa está a oposição frontal ao plano do presidente Gianni Infantino de vender participações comerciais dos torneios a investidores privados.",
    summary_en: "UEFA and European federations have threatened to boycott all FIFA competitions, including the men's and women's World Cups. At issue is their strong opposition to president Gianni Infantino's plan to sell commercial stakes in the tournaments to private investors.",
    tag: "SCANDAL",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c5y67zrrdddo",
    time: "31/07/2026",
    engagement: "~22.1M",
  },
  {
    id: "t6",
    title: "TRANSFER: Fulham perto de fechar Gonzalo García ao Real Madrid",
    title_en: "TRANSFER: Fulham close to sealing Gonzalo Garcia from Real Madrid",
    summary: "O Fulham terá chegado a acordo com o Real Madrid para a contratação do avançado Gonzalo García, num negócio avaliado em 40 milhões de euros (£34M). A mudança insere-se na renovação do ataque madrileno e promete reforçar a equipa londrina na Premier League.",
    summary_en: "Fulham have reportedly reached an agreement with Real Madrid for the signing of forward Gonzalo Garcia in a deal worth €40m (£34m). The move is part of Madrid's attacking reshuffle and promises to bolster the London side in the Premier League.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49488247/fulham-agree-deal-gonzalo-garcia-real-madrid-34-million-cesar-palacios",
    time: "31/07/2026",
    engagement: "~9.5M",
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
