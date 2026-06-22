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

// Notícias curadas — atualizadas 22/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Mourinho no comando do Real Madrid e com plenos poderes nas transferências!",
    title_en: "🚨 BREAKING: Mourinho in charge of Real Madrid with full power over transfers!",
    summary: "José Mourinho regressou ao Real Madrid e já dita as regras. Segundo fontes próximas do clube, o 'Special One' reuniu-se com a direção para orquestrar uma revolução no plantel com foco no sucesso imediato. O treinador português exige veteranos com provas dadas e as primeiras contratações, como Marc Cucurella e Bernardo Silva, refletem esta nova estratégia, aumentando a média de idades das contratações para quase 29 anos.",
    summary_en: "Jose Mourinho has returned to Real Madrid and is already calling the shots. According to sources close to the club, the 'Special One' met with the board to orchestrate a squad revolution focused on immediate success. The Portuguese coach demands proven veterans and the first signings, such as Marc Cucurella and Bernardo Silva, reflect this new strategy, raising the average age of signings to almost 29 years.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "215.4M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Enzo Fernández mais perto do Real Madrid! Chelsea exige €120M pelo argentino!",
    title_en: "🔥 TRANSFER: Enzo Fernandez closer to Real Madrid! Chelsea demands €120M for the Argentine!",
    summary: "A novela Enzo Fernández continua a aquecer o mercado! O médio argentino é um dos principais alvos de José Mourinho para reforçar o meio-campo do Real Madrid. Apesar de Fabrizio Romano ter desmentido que já existe acordo, o interesse é real e o Chelsea fixou o preço em 120 milhões de euros. O jogador já expressou o desejo de rumar a Madrid, mas o negócio promete ser uma das sagas mais longas deste verão.",
    summary_en: "The Enzo Fernandez soap opera continues to heat up the market! The Argentine midfielder is one of Jose Mourinho's main targets to bolster Real Madrid's midfield. Although Fabrizio Romano denied that an agreement is already in place, the interest is real and Chelsea has set the price at 120 million euros. The player has already expressed his desire to head to Madrid, but the deal promises to be one of the longest sagas of this summer.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "198.7M",
  },
  {
    id: "t3",
    title: "💥 HOT: Messi prepara-se para fazer história contra a Áustria no Mundial 2026!",
    title_en: "💥 HOT: Messi prepares to make history against Austria in the 2026 World Cup!",
    summary: "Lionel Messi volta a entrar em campo hoje frente à Áustria, no segundo jogo da Argentina no Mundial 2026. Depois de uma estreia convincente com vitória por 3-0 sobre a Argélia, os olhos do mundo estão postos no craque argentino. A jogar nos Estados Unidos, onde tem brilhado na MLS, Messi procura consolidar o estatuto de lenda e guiar a Albiceleste rumo à defesa do título mundial. A expectativa em Arlington é brutal!",
    summary_en: "Lionel Messi takes the field again today against Austria in Argentina's second game at the 2026 World Cup. After a convincing debut with a 3-0 win over Algeria, the eyes of the world are on the Argentine star. Playing in the United States, where he has shone in MLS, Messi seeks to consolidate his legendary status and guide La Albiceleste towards defending their world title. The expectation in Arlington is brutal!",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "185.2M",
  },
  {
    id: "t4",
    title: "⚽ TRANSFER: Bernardo Silva é o novo maestro do Real Madrid! Acordo fechado por duas épocas!",
    title_en: "⚽ TRANSFER: Bernardo Silva is Real Madrid's new maestro! Deal closed for two seasons!",
    summary: "É oficial: Bernardo Silva vai jogar no Real Madrid! O internacional português, que terminava contrato com o Manchester City, foi um pedido expresso de José Mourinho. O médio de 31 anos, cobiçado por Barcelona e Atlético de Madrid, assinou um contrato válido por duas temporadas com os merengues. A sua experiência e qualidade técnica vão ser fundamentais na nova equipa construída para vencer no imediato.",
    summary_en: "It's official: Bernardo Silva will play for Real Madrid! The Portuguese international, whose contract with Manchester City was ending, was an express request from Jose Mourinho. The 31-year-old midfielder, coveted by Barcelona and Atletico Madrid, signed a two-season contract with Los Blancos. His experience and technical quality will be fundamental in the new team built to win immediately.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "172.9M",
  },
  {
    id: "t5",
    title: "🚨 SCANDAL: Vinícius Júnior de saída do Real Madrid? Exigências salariais criam impasse!",
    title_en: "🚨 SCANDAL: Vinicius Junior leaving Real Madrid? Salary demands create an impasse!",
    summary: "O futuro de Vinícius Júnior no Real Madrid está envolto em incerteza. Com contrato até 2027, as negociações para a renovação estão suspensas até ao final do Mundial. As exigências salariais do astro brasileiro colidem com a nova política de contratações de Mourinho, e Florentino Pérez poderá considerar uma venda milionária este verão para evitar perder o jogador a custo zero. O balneário merengue está em ebulição!",
    summary_en: "Vinicius Junior's future at Real Madrid is shrouded in uncertainty. With a contract until 2027, renewal negotiations are suspended until the end of the World Cup. The Brazilian star's salary demands collide with Mourinho's new transfer policy, and Florentino Perez may consider a millionaire sale this summer to avoid losing the player for free. The Los Blancos dressing room is boiling!",
    tag: "SCANDAL",
    source: "@Marca",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "205.1M",
  },
  {
    id: "t6",
    title: "🔥 BREAKING: Mbappé lidera França contra o Iraque e deixa porta aberta à MLS no futuro!",
    title_en: "🔥 BREAKING: Mbappe leads France against Iraq and leaves the door open to MLS in the future!",
    summary: "Kylian Mbappé, que bisou na vitória da França sobre o Senegal (3-1), volta hoje à ação frente ao Iraque. O avançado francês, além de ser a principal figura do Mundial 2026, surpreendeu ao revelar que está aberto a jogar na MLS no final da carreira, após um convite de David Beckham. Por agora, o foco de Mbappé é total na conquista do seu segundo campeonato do mundo com os Les Bleus.",
    summary_en: "Kylian Mbappe, who scored twice in France's win over Senegal (3-1), returns to action today against Iraq. The French forward, in addition to being the main figure of the 2026 World Cup, surprised by revealing that he is open to playing in MLS at the end of his career, following an invitation from David Beckham. For now, Mbappe's focus is entirely on winning his second world championship with Les Bleus.",
    tag: "BREAKING",
    source: "@Lequipe",
    url: "https://x.com/alivegoal",
    time: "22/06/2026",
    engagement: "192.4M",
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
