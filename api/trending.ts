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

const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🔥 HOT: Espanha 2-1 Bélgica — Merino Marca aos 88' e Espanha Vai às Meias-Finais!",
    title_en: "🔥 HOT: Spain 2-1 Belgium — Merino Scores at 88' and Spain Reaches Semi-Finals!",
    summary: "Num jogo emocionante dos quartos de final do Mundial 2026, a Espanha derrotou a Bélgica por 2-1. Fabián Ruiz abriu o marcador aos 30', mas Charles De Ketelaere empatou aos 41'. Quando o jogo parecia destinado ao prolongamento, Mikel Merino, saído do banco, marcou o golo da vitória aos 88 minutos após um erro do guarda-redes belga Senne Lammens. A Espanha avança para as meias-finais onde defrontará a França num duelo de gigantes europeus.",
    summary_en: "In a thrilling 2026 World Cup quarter-final, Spain defeated Belgium 2-1. Fabián Ruiz opened the scoring at 30', but Charles De Ketelaere equalised at 41'. When the match seemed destined for extra time, substitute Mikel Merino scored the winning goal at the 88th minute following a mistake by Belgian goalkeeper Senne Lammens. Spain advances to the semi-finals where they will face France in a clash of European giants.",
    tag: "HOT",
    source: "@AlJazeera",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "15.2M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Andrey Santos no Manchester United por £50M — Novo Reforço de Peso!",
    title_en: "⚡ TRANSFER: Andrey Santos to Manchester United for £50M — Huge New Signing!",
    summary: "O Manchester United está prestes a anunciar a contratação do médio brasileiro Andrey Santos ao Chelsea por £50 milhões. A transferência é vista como um sinal claro da nova abordagem do clube no mercado. O jovem internacional brasileiro de 22 anos vai reforçar o meio-campo de Michael Carrick para a época 2026/27. Rio Ferdinand elogiou a contratação, afirmando que é exatamente o tipo de jogador que o clube precisava há anos.",
    summary_en: "Manchester United is set to announce the signing of Brazilian midfielder Andrey Santos from Chelsea for £50 million. The transfer is seen as a clear sign of the club's new approach in the market. The 22-year-old Brazilian international will bolster Michael Carrick's midfield for the 2026/27 season. Rio Ferdinand praised the signing, stating it is exactly the type of player the club has needed for years.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "12.8M",
  },
  {
    id: "t3",
    title: "😱 SCANDAL: Escândalo do Relvado da Final do Mundial 2026 — FIFA Vende Pedaços por $647!",
    title_en: "😱 SCANDAL: 2026 World Cup Final Pitch Scandal — FIFA Sells Pieces for $647!",
    summary: "A FIFA está no centro de uma nova polémica após ser revelado que está a vender pedaços do relvado do estádio de Nova Iorque/Nova Jérsia, palco da final do Mundial 2026, por 647 dólares (cerca de 600 euros) aos fãs. Esta iniciativa tem gerado fortes críticas, juntando-se às queixas sobre o preço exorbitante dos bilhetes e os atrasos nos vistos. O Presidente Gianni Infantino desvalorizou as críticas numa conferência de imprensa desafiadora.",
    summary_en: "FIFA is at the centre of a new controversy after it was revealed they are selling pieces of the pitch from the New York/New Jersey stadium, host of the 2026 World Cup final, for $647 to fans. This initiative has generated strong criticism, adding to complaints about exorbitant ticket prices and visa delays. President Gianni Infantino dismissed the criticism in a defiant press conference.",
    tag: "SCANDAL",
    source: "@FoxSports",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "10.5M",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Eurodeputados Exigem Investigação a Trump e Infantino por Caso Balogun",
    title_en: "🚨 BREAKING: MEPs Demand Investigation into Trump and Infantino over Balogun Case",
    summary: "O escândalo do cartão vermelho de Folarin Balogun continua a escalar. 72 membros do Parlamento Europeu exigiram formalmente uma investigação a Gianni Infantino após alegações de que a FIFA cedeu a pressões diretas de Donald Trump para anular a suspensão do avançado norte-americano durante o Mundial 2026. A interferência política sem precedentes na governação do futebol mundial ameaça criar uma crise institucional de grandes proporções.",
    summary_en: "The Folarin Balogun red card scandal continues to escalate. 72 Members of the European Parliament have formally demanded an investigation into Gianni Infantino following allegations that FIFA bowed to direct pressure from Donald Trump to overturn the US striker's suspension during the 2026 World Cup. The unprecedented political interference in global football governance threatens to create a major institutional crisis.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "14.1M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Arsenal Prepara Oferta por Christos Tzolis para Substituir Trossard",
    title_en: "⚡ TRANSFER: Arsenal Prepares Bid for Christos Tzolis to Replace Trossard",
    summary: "O Arsenal está a avançar com uma proposta de £35 milhões pelo extremo grego Christos Tzolis, do Club Brugge. O jogador de 24 anos, que marcou 17 golos e fez 23 assistências na última época, é visto por Mikel Arteta como o substituto ideal para Leandro Trossard, que está a ser associado ao Besiktas. Os Gunners continuam muito ativos no mercado, tendo também garantido Bruno Guimarães e aguardando a chegada de Jurrien Timber.",
    summary_en: "Arsenal is moving forward with a £35 million bid for Greek winger Christos Tzolis from Club Brugge. The 24-year-old, who scored 17 goals and provided 23 assists last season, is seen by Mikel Arteta as the ideal replacement for Leandro Trossard, who is being linked with Besiktas. The Gunners remain very active in the market, having also secured Bruno Guimarães and awaiting the arrival of Jurrien Timber.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "9.2M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Noruega vs Inglaterra — Haaland e Kane no Duelo Mais Aguardado dos Quartos!",
    title_en: "🔥 HOT: Norway vs England — Haaland and Kane in the Most Anticipated Quarter-Final Clash!",
    summary: "O mundo do futebol para hoje às 21:00 (GMT) para o confronto titânico entre a Noruega de Erling Haaland e a Inglaterra de Harry Kane nos quartos de final do Mundial 2026, em Miami. A Noruega chega motivada após eliminar o Brasil por 2-1, enquanto a Inglaterra superou o anfitrião México por 3-2 com apenas 10 jogadores. Haaland já avisou que a pressão está toda do lado inglês num jogo que promete ser histórico.",
    summary_en: "The football world stops today at 21:00 (GMT) for the titanic clash between Erling Haaland's Norway and Harry Kane's England in the 2026 World Cup quarter-finals in Miami. Norway arrives motivated after eliminating Brazil 2-1, while England overcame hosts Mexico 3-2 with just 10 men. Haaland has already warned that all the pressure is on the English side in a match that promises to be historic.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "11/07/2026",
    engagement: "18.5M",
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
