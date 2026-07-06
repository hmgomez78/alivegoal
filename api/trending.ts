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

// Notícias curadas — atualizadas 06/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Klopp é o Novo Selecionador da Alemanha!",
    title_en: "🚨 BREAKING: Klopp is the New Germany Head Coach!",
    summary: "A Federação Alemã de Futebol confirmou hoje que Jurgen Klopp aceitou tornar-se o novo selecionador nacional da Alemanha, sucedendo a Julian Nagelsmann após a desilusão no Mundial 2026. Klopp regressa ao ativo mais cedo do que o previsto, deixando o seu cargo no grupo Red Bull. Uma notícia fantástica para os fãs alemães que procuram reconstruir a equipa para o Euro 2028.",
    summary_en: "The German Football Association confirmed today that Jurgen Klopp has agreed to become the new head coach of the Germany national team, succeeding Julian Nagelsmann after their World Cup 2026 disappointment. Klopp returns to management earlier than expected, leaving his role with the Red Bull group. Fantastic news for German fans looking to rebuild for Euro 2028.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "4.2M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Chelsea Fecha Dupla Contratação de Peso",
    title_en: "⚡ TRANSFER: Chelsea Complete Major Double Signing",
    summary: "O Chelsea continua a sua revolução no mercado de verão! Os Blues estão a fechar a contratação do lateral-esquerdo Pep Chavarria (Rayo Vallecano) e do central Maxence Lacroix (Crystal Palace). Paralelamente, Tyrique George foi vendido ao Everton por 28 milhões de euros. A equipa londrina prepara uma renovação total do plantel para a temporada 2026/27.",
    summary_en: "Chelsea continue their summer market revolution! The Blues are closing in on the signings of left-back Pep Chavarria (Rayo Vallecano) and centre-back Maxence Lacroix (Crystal Palace). Meanwhile, Tyrique George has been sold to Everton for €28 million. The London club is preparing a total squad overhaul for the 2026/27 season.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "3.1M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Inglaterra Vence México (3-2) Num Jogo Épico e Vai aos Quartos!",
    title_en: "🔥 HOT: England Beat Mexico (3-2) in Epic Clash to Reach Quarter-Finals!",
    summary: "Que jogo inacreditável no Estádio Azteca! A Inglaterra venceu o México por 3-2 num duelo frenético dos Oitavos de Final do Mundial 2026. Jude Bellingham foi o herói ao bisar rapidamente, enquanto Julián Quiñones marcou para os mexicanos. A Inglaterra sobreviveu à pressão e altitude para marcar encontro com a Noruega nos Quartos de Final.",
    summary_en: "What an unbelievable match at the Estadio Azteca! England beat Mexico 3-2 in a frantic World Cup 2026 Round of 16 clash. Jude Bellingham was the hero with a quick brace, while Julián Quiñones scored for the Mexicans. England survived the pressure and altitude to set up a Quarter-Final tie against Norway.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "5.8M",
  },
  {
    id: "t4",
    title: "😱 SCANDAL: FIFA Suspende Castigo de Balogun e Causa Polémica",
    title_en: "😱 SCANDAL: FIFA Suspends Balogun's Ban Causing Outrage",
    summary: "Escândalo no Mundial! A FIFA tomou a decisão sem precedentes de suspender o castigo de um jogo a Folarin Balogun, permitindo que o avançado dos EUA jogue hoje contra a Bélgica nos Oitavos de Final. A decisão, que até motivou agradecimentos do Presidente Trump, está a gerar enorme revolta e acusações de favorecimento à equipa da casa.",
    summary_en: "World Cup scandal! FIFA has made the unprecedented decision to suspend Folarin Balogun's one-match ban, allowing the US striker to play against Belgium today in the Round of 16. The decision, which even prompted thanks from President Trump, is generating massive outrage and accusations of favoritism towards the host nation.",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "6.5M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Noruega Choca o Mundo e Elimina o Brasil (2-1)",
    title_en: "🚨 BREAKING: Norway Shocks the World and Eliminates Brazil (2-1)",
    summary: "A maior surpresa do Mundial 2026! A Noruega eliminou o Brasil por 2-1 com um bis espetacular de Erling Haaland. Os noruegueses fizeram história no MetLife Stadium e avançam para os Quartos de Final, onde defrontarão a Inglaterra. O Brasil, um dos grandes favoritos, despede-se precocemente da competição.",
    summary_en: "The biggest shock of the 2026 World Cup! Norway eliminated Brazil 2-1 with a spectacular brace from Erling Haaland. The Norwegians made history at the MetLife Stadium and advance to the Quarter-Finals, where they will face England. Brazil, one of the huge favorites, say an early goodbye to the competition.",
    tag: "BREAKING",
    source: "@GuardianSport",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "8.2M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Rashford Adia Decisão Sobre o Man United",
    title_en: "⚡ TRANSFER: Rashford Delays Decision on Man United Future",
    summary: "Marcus Rashford confirmou que não tomará qualquer decisão sobre o seu futuro no Manchester United até ao final do Mundial 2026. O avançado inglês está focado na seleção e recusa negociar transferências agora. O United espera reintegrá-lo na pré-época, mas a sua saída ainda é uma forte possibilidade.",
    summary_en: "Marcus Rashford has confirmed he will not make any decision regarding his future at Manchester United until after the 2026 World Cup. The English forward is focused on the national team and refuses to negotiate transfers now. United hope to reintegrate him in pre-season, but his departure remains a strong possibility.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "06/07/2026",
    engagement: "2.9M",
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
