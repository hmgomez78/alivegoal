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

// Notícias curadas — atualizadas 18/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 SCANDAL: Elye Wahi preso antes do Mundial! Jogador da Costa do Marfim investigado por manipulação de apostas!",
    title_en: "🚨 SCANDAL: Elye Wahi arrested before the World Cup! Ivory Coast player investigated for match-fixing!",
    summary: "O avançado da Costa do Marfim, Elye Wahi, foi detido pela polícia francesa semanas antes do início do Mundial 2026. O jogador está a ser investigado por suspeita de ter recebido intencionalmente um cartão amarelo num jogo contra o Metz para beneficiar apostadores. Apesar da detenção, Wahi viajou para os EUA e está a disputar o torneio, o que levantou uma onda de indignação mundial.",
    summary_en: "Ivory Coast forward Elye Wahi was detained by French police weeks before the start of the 2026 World Cup. The player is being investigated on suspicion of deliberately receiving a yellow card in a match against Metz to benefit bettors. Despite the arrest, Wahi travelled to the US and is competing in the tournament, sparking worldwide outrage.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "94.7M",
  },
  {
    id: "t2",
    title: "💥 BREAKING: Liverpool rouba Víctor Muñoz ao Arsenal! Fabrizio Romano confirma: HERE WE GO!",
    title_en: "💥 BREAKING: Liverpool hijack Víctor Muñoz from Arsenal! Fabrizio Romano confirms: HERE WE GO!",
    summary: "Num golpe de mercado surpreendente, o Liverpool ativou a cláusula de rescisão de 40 milhões de euros de Víctor Muñoz, lateral espanhol do Crystal Palace, roubando o acordo ao Arsenal. O jogador formado no Real Madrid assina contrato de longa duração com os Reds e chega para competir com Frimpong na faixa direita. O Real Madrid pode ainda acionar uma cláusula de recompra.",
    summary_en: "In a stunning transfer coup, Liverpool activated the €40 million release clause of Spanish right-back Víctor Muñoz from Crystal Palace, hijacking a deal from Arsenal. The Real Madrid academy product signs a long-term contract with the Reds and arrives to compete with Frimpong on the right flank. Real Madrid may still trigger a buy-back clause.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "78.3M",
  },
  {
    id: "t3",
    title: "⚽ HOT: Messi faz hat-trick histórico no Mundial! Argentina 3-0 Argélia — O GOAT está de volta!",
    title_en: "⚽ HOT: Messi scores historic hat-trick at the World Cup! Argentina 3-0 Algeria — THE GOAT is back!",
    summary: "Lionel Messi protagonizou uma das noites mais mágicas da história do futebol ao marcar o seu primeiro hat-trick numa Copa do Mundo, na vitória da Argentina por 3-0 sobre a Argélia. Com este feito, Messi tornou-se o maior artilheiro de todos os tempos em Mundiais, ultrapassando a marca histórica. O campeão em título entra com o pé direito na defesa do título no Mundial 2026.",
    summary_en: "Lionel Messi delivered one of the most magical nights in football history by scoring his first-ever World Cup hat-trick in Argentina's 3-0 win over Algeria. With this feat, Messi became the all-time leading scorer in World Cup history, surpassing the historic record. The reigning champions start their title defence in the best possible way at the 2026 World Cup.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "112.5M",
  },
  {
    id: "t4",
    title: "🔥 TRANSFER: Arsenal em negociações por Morgan Rogers por 100M£! Arteta quer o médio do Aston Villa!",
    title_en: "🔥 TRANSFER: Arsenal in talks for Morgan Rogers for £100M! Arteta wants the Aston Villa midfielder!",
    summary: "O Arsenal está a preparar uma oferta recorde de 100 milhões de libras pelo médio inglês Morgan Rogers, do Aston Villa. Segundo Fabrizio Romano, Mikel Arteta considera Rogers o jogador ideal para liderar a próxima geração dos Gunners. O Aston Villa resiste à venda, mas a oferta milionária pode mudar tudo. Rogers é considerado por muitos o melhor jogador jovem da Premier League.",
    summary_en: "Arsenal are preparing a record £100 million bid for Aston Villa midfielder Morgan Rogers. According to Fabrizio Romano, Mikel Arteta considers Rogers the ideal player to lead the next generation of Gunners. Aston Villa are resisting the sale, but the huge offer could change everything. Rogers is considered by many to be the best young player in the Premier League.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "61.8M",
  },
  {
    id: "t5",
    title: "💥 BREAKING: Inglaterra 4-2 Croácia! Kane bisador, Bellingham e Rashford brilham no Mundial 2026!",
    title_en: "💥 BREAKING: England 4-2 Croatia! Kane scores twice, Bellingham and Rashford shine at the 2026 World Cup!",
    summary: "A Inglaterra entrou em grande no Mundial 2026 com uma vitória espetacular por 4-2 sobre a Croácia, numa partida de enorme qualidade em Dallas. Harry Kane marcou duas vezes (incluindo um penálti), Jude Bellingham foi decisivo e Marcus Rashford selou o resultado já perto do fim. A Croácia, apesar de ter reduzido para 2-2, acabou por ceder perante a qualidade inglesa.",
    summary_en: "England made a stunning start to the 2026 World Cup with a spectacular 4-2 victory over Croatia in a high-quality match in Dallas. Harry Kane scored twice (including a penalty), Jude Bellingham was decisive and Marcus Rashford sealed the result late on. Croatia, despite levelling at 2-2, ultimately succumbed to England's quality.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "85.2M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Manchester United quer Lewis Hall do Newcastle! Carrick prepara dupla contratação de 120M£!",
    title_en: "🔥 TRANSFER: Manchester United want Lewis Hall from Newcastle! Carrick prepares £120M double deal!",
    summary: "O Manchester United, sob o comando de Michael Carrick, está a preparar uma investida dupla no mercado de verão com um orçamento de 120 milhões de libras. Lewis Hall, lateral esquerdo do Newcastle, é o principal alvo, com contactos já estabelecidos entre os clubes. O United quer reforçar urgentemente a defesa e o meio-campo para regressar à luta pelos títulos na próxima temporada.",
    summary_en: "Manchester United, under Michael Carrick, are preparing a double summer transfer swoop with a £120 million budget. Newcastle left-back Lewis Hall is the primary target, with contacts already established between the clubs. United urgently want to strengthen their defence and midfield to return to title contention next season.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "18/06/2026",
    engagement: "53.6M",
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
