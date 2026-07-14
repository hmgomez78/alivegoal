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
    title: "🚨 BREAKING: Investigação do FBI à AFA e Folarin Balogun Abalam o Mundial",
    title_en: "🚨 BREAKING: FBI Investigation into AFA and Folarin Balogun Shake the World Cup",
    summary: "O futebol mundial está em choque. O FBI investiga a Associação de Futebol da Argentina (AFA) por suspeitas de lavagem de dinheiro num esquema de 300 milhões de dólares. Em simultâneo, estalou a polémica sobre a anulação da suspensão de Folarin Balogun (EUA) por um único oficial da FIFA, contrariando todas as regras habituais do torneio.",
    summary_en: "World football is in shock. The FBI is investigating the Argentine Football Association (AFA) over suspected money laundering in a $300 million scheme. Simultaneously, controversy has erupted over the lifting of Folarin Balogun's (USA) suspension by a single FIFA official, contradicting all usual tournament rules.",
    tag: "BREAKING",
    source: "@TheTimes",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "52.4M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Mason Greenwood no Fenerbahçe por 40 Milhões de Euros",
    title_en: "⚡ TRANSFER: Mason Greenwood to Fenerbahçe for 40 Million Euros",
    summary: "Mason Greenwood deixa o Marselha e assina pelo Fenerbahçe de José Mourinho por 40 milhões de euros, tornando-se a venda recorde do clube francês. O Manchester United também lucra cerca de 10 milhões com a transferência. O extremo inglês assina até 2030.",
    summary_en: "Mason Greenwood leaves Marseille and signs for José Mourinho's Fenerbahçe for 40 million euros, becoming the French club's record sale. Manchester United also profits around 10 million from the transfer. The English winger signs until 2030.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "28.9M",
  },
  {
    id: "t3",
    title: "🔥 HOT: França e Espanha em Duelo de Titãs na Primeira Meia-Final do Mundial",
    title_en: "🔥 HOT: France and Spain in Clash of Titans in the First World Cup Semi-Final",
    summary: "O dia de hoje marca o início das meias-finais do Mundial 2026. A França, atual vice-campeã, defronta a talentosa Espanha em Dallas. Didier Deschamps atribui o favoritismo aos espanhóis, num jogo que promete parar o mundo do futebol.",
    summary_en: "Today marks the start of the 2026 World Cup semi-finals. France, the current runners-up, face a talented Spain side in Dallas. Didier Deschamps has labelled the Spaniards as favourites in a match that promises to bring the football world to a standstill.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "41.2M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Andrey Santos Troca Chelsea pelo Manchester United",
    title_en: "⚡ TRANSFER: Andrey Santos Swaps Chelsea for Manchester United",
    summary: "O Manchester United garantiu a contratação do médio brasileiro Andrey Santos ao Chelsea por cerca de 56 milhões de euros. O jogador de 22 anos assina até 2031 e junta-se aos portugueses Bruno Fernandes e Diogo Dalot em Old Trafford.",
    summary_en: "Manchester United has secured the signing of Brazilian midfielder Andrey Santos from Chelsea for around 56 million euros. The 22-year-old signs until 2031 and joins Portuguese players Bruno Fernandes and Diogo Dalot at Old Trafford.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "19.5M",
  },
  {
    id: "t5",
    title: "🚨 SCANDAL: Escândalo Sexual e Demissão Assombram Seleção do Senegal",
    title_en: "🚨 SCANDAL: Sex Scandal and Sacking Haunt Senegal National Team",
    summary: "O Senegal vive dias de caos após a eliminação do Mundial. O selecionador Pape Thiaw foi demitido, e o cozinheiro da equipa foi repatriado após acusações de assédio sexual nos Estados Unidos. Relatos de festas extravagantes durante o torneio agravam a crise na federação.",
    summary_en: "Senegal is experiencing days of chaos following their World Cup elimination. Manager Pape Thiaw has been sacked, and the team chef was repatriated following allegations of sexual harassment in the US. Reports of extravagant parties during the tournament worsen the crisis in the federation.",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "24.1M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Arsenal Muda Foco para Julian Alvarez do Atlético Madrid",
    title_en: "⚡ TRANSFER: Arsenal Switches Focus to Atletico Madrid's Julian Alvarez",
    summary: "Com Bradley Barcola (PSG) indisponível, o Arsenal ataca agora a contratação do avançado argentino Julian Alvarez. Mikel Arteta quer fechar o negócio com o Atlético de Madrid antes do início da pré-época para reforçar a frente de ataque dos Gunners.",
    summary_en: "With PSG's Bradley Barcola unavailable, Arsenal is now targeting the signing of Argentine striker Julian Alvarez. Mikel Arteta wants to close the deal with Atletico Madrid before pre-season begins to bolster the Gunners' attack.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "14/07/2026",
    engagement: "15.8M",
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
