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
    title: "🚨 BREAKING: Espanha na Final do Mundial Após Vitória Sobre a França",
    title_en: "🚨 BREAKING: Spain Reaches World Cup Final After Victory Over France",
    summary: "A Espanha garantiu a passagem à final do Mundial 2026 ao vencer a França por 2-0. Mikel Oyarzabal e Pedro Porro foram os autores dos golos que carimbaram a vitória espanhola, num jogo onde a defesa gaulesa não conseguiu travar a 'La Roja'.",
    summary_en: "Spain secured their passage to the 2026 World Cup final by beating France 2-0. Mikel Oyarzabal and Pedro Porro scored the goals that sealed the Spanish victory, in a match where the French defence failed to stop 'La Roja'.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "58.2M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Youri Tielemans Assina Pelo Manchester United por £36M",
    title_en: "⚡ TRANSFER: Youri Tielemans Signs for Manchester United for £36M",
    summary: "O Manchester United oficializou a contratação de Youri Tielemans ao Aston Villa por cerca de 36 milhões de libras (aprox. 42 milhões de euros). O médio belga assina um contrato válido por cinco anos e junta-se a Andrey Santos no meio-campo dos 'Red Devils'.",
    summary_en: "Manchester United have officially signed Youri Tielemans from Aston Villa for around £36 million. The Belgian midfielder signs a five-year contract and joins Andrey Santos in the 'Red Devils' midfield.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "34.5M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Inglaterra e Argentina Disputam Hoje Acesso à Final do Mundial",
    title_en: "🔥 HOT: England and Argentina Battle Today for a Place in the World Cup Final",
    summary: "A grande meia-final do Mundial 2026 entre Inglaterra e Argentina joga-se hoje, dia 15 de julho, às 20h00, no Mercedes-Benz Stadium em Atlanta. Um duelo histórico carregado de rivalidade, onde as duas seleções lutam pelo direito de defrontar a Espanha na final.",
    summary_en: "The highly anticipated 2026 World Cup semi-final between England and Argentina takes place today, July 15, at 20:00, at the Mercedes-Benz Stadium in Atlanta. A historic duel full of rivalry, where both teams fight for the right to face Spain in the final.",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "45.9M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Bruno Guimarães Perto de Trocar Newcastle Pelo Arsenal",
    title_en: "⚡ TRANSFER: Bruno Guimaraes Close to Swapping Newcastle for Arsenal",
    summary: "O médio brasileiro Bruno Guimarães deu 'luz verde' a uma transferência para o Arsenal, tendo já informado o Newcastle da sua vontade de sair. Os 'Gunners' intensificaram os contactos, mas o negócio esbarra na avaliação dos 'Magpies', que exigem perto de 100 milhões de libras.",
    summary_en: "Brazilian midfielder Bruno Guimaraes has given the 'green light' to a transfer to Arsenal, having already informed Newcastle of his desire to leave. The 'Gunners' have stepped up contacts, but the deal hinges on the 'Magpies' valuation, who are demanding close to £100 million.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "29.1M",
  },
  {
    id: "t5",
    title: "🚨 SCANDAL: Escândalo em Michigan Pode Custar Caro ao Programa de Futebol",
    title_en: "🚨 SCANDAL: Michigan Scandal Could Cost Football Program Dearly",
    summary: "O escândalo de roubo de sinais no futebol universitário da Universidade de Michigan continua a dar que falar. Novas alegações apontam para encobrimento por parte da direção, e o programa enfrenta possíveis sanções severas, incluindo quatro anos de suspensão e pesadas multas financeiras.",
    summary_en: "The sign-stealing scandal in the University of Michigan's college football program continues to make headlines. New allegations point to a cover-up by management, and the program faces potentially severe sanctions, including four years of probation and heavy financial fines.",
    tag: "SCANDAL",
    source: "@WSJ",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "18.4M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Roma Avança com Proposta por Alejandro Garnacho",
    title_en: "⚡ TRANSFER: Roma Make Bid for Alejandro Garnacho",
    summary: "A AS Roma, orientada por José Mourinho, apresentou uma proposta oficial ao Chelsea pelo extremo Alejandro Garnacho. O clube italiano propõe um empréstimo inicial com uma cláusula de compra obrigatória de 30 milhões de libras, dependente da qualificação para a Liga dos Campeões.",
    summary_en: "AS Roma have submitted an official bid to Chelsea for winger Alejandro Garnacho. The Italian club is proposing an initial loan with a mandatory £30 million buy clause, dependent on Champions League qualification.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "15/07/2026",
    engagement: "22.7M",
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
