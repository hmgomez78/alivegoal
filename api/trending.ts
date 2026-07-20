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
    title: "🔥 BREAKING: Espanha Conquista o Mundial 2026 Após Final com Polémica",
    title_en: "🔥 BREAKING: Spain Wins 2026 World Cup After Controversial Final",
    summary: "A Espanha venceu a Argentina por 1-0 na final do Mundial 2026, com um golo de Ferran Torres nos descontos, conquistando o seu segundo título mundial. O jogo terminou com cenas lamentáveis de confrontos entre jogadores após o apito final, e polémica com um golo anulado à Espanha no início do prolongamento. Rodri foi eleito o melhor jogador do torneio.",
    summary_en: "Spain defeated Argentina 1-0 in the 2026 World Cup final, with an injury-time goal from Ferran Torres, claiming their second world title. The match ended with regrettable scenes of player clashes after the final whistle, and controversy over a disallowed Spanish goal early in extra time. Rodri was named player of the tournament.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "185.2M",
  },
  {
    id: "t2",
    title: "🚨 SCANDAL: Confrontos e Polémica na Final do Mundial",
    title_en: "🚨 SCANDAL: Clashes and Controversy at World Cup Final",
    summary: "O final do jogo entre Espanha e Argentina ficou marcado por uma enorme confusão. O argentino Leandro Paredes derrubou Eric García após o apito final, desencadeando confrontos generalizados. Além disso, a Argentina protestou contra a arbitragem, com o Egito a apresentar mesmo uma queixa formal à FIFA alegando injustiça.",
    summary_en: "The end of the match between Spain and Argentina was marred by massive confusion. Argentine Leandro Paredes knocked down Eric García after the final whistle, triggering widespread clashes. Furthermore, Argentina protested the refereeing, with Egypt even filing a formal complaint to FIFA alleging injustice.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "120.5M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Morgan Rogers no Chelsea por £117M (Recorde)",
    title_en: "⚡ TRANSFER: Morgan Rogers to Chelsea for £117M (Record)",
    summary: "O Chelsea protagonizou o maior 'hijack' do verão ao roubar Morgan Rogers ao Arsenal. Os Blues pagaram £117 milhões ao Aston Villa, garantindo o jogador com um contrato de 6 anos. O Arsenal preparava-se para negociar na próxima semana, mas o Chelsea antecipou-se e fechou o negócio em 24 horas, num autêntico golpe de mercado.",
    summary_en: "Chelsea pulled off the biggest 'hijack' of the summer by stealing Morgan Rogers from Arsenal. The Blues paid £117 million to Aston Villa, securing the player on a 6-year deal. Arsenal were preparing to negotiate next week, but Chelsea swooped in and closed the deal in 24 hours, in a true market coup.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "95.8M",
  },
  {
    id: "t4",
    title: "🔥 HOT: O 'Último Tango' de Lionel Messi?",
    title_en: "🔥 HOT: Lionel Messi's 'Last Tango'?",
    summary: "Após a derrota na final do Mundial 2026, Lionel Messi publicou uma mensagem enigmática ('Last Tango') nas redes sociais, sugerindo que este terá sido o seu último jogo pela seleção argentina. Aos 39 anos e após 6 Mundiais, o astro argentino poderá anunciar a sua reforma internacional nas próximas semanas.",
    summary_en: "Following the defeat in the 2026 World Cup final, Lionel Messi posted a cryptic message ('Last Tango') on social media, suggesting this may have been his last game for the Argentine national team. At 39 and after 6 World Cups, the Argentine star could announce his international retirement in the coming weeks.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "210.4M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Rafael Leão Cada Vez Mais Perto do Barcelona",
    title_en: "⚡ TRANSFER: Rafael Leão Closer to Barcelona",
    summary: "O Barcelona está a tentar um empréstimo de €210 milhões para financiar a contratação de Rafael Leão. O extremo português rejeitou renovar com o AC Milan e o Fabrizio Romano confirmou que as negociações estão a aquecer, com o Barça a preparar uma investida final, apesar dos seus problemas de 'cash-flow'.",
    summary_en: "Barcelona are seeking a €210 million loan to finance the signing of Rafael Leão. The Portuguese winger refused to renew with AC Milan and Fabrizio Romano confirmed that negotiations are heating up, with Barça preparing a final push, despite their cash-flow problems.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "88.2M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Arsenal Vira Agulhas para Yan Diomande e Julián Álvarez",
    title_en: "⚡ TRANSFER: Arsenal Turn Focus to Yan Diomande and Julián Álvarez",
    summary: "Após perder Morgan Rogers para o Chelsea, o Arsenal reagiu rápido no mercado. Os Gunners iniciaram contactos por Yan Diomande (RB Leipzig) e mantêm Julián Álvarez (Atlético Madrid) no topo da lista. O Atlético recusa vender, mas o Arsenal está atento a uma possível rutura entre o avançado argentino e o clube espanhol.",
    summary_en: "After losing Morgan Rogers to Chelsea, Arsenal reacted quickly in the market. The Gunners initiated contacts for Yan Diomande (RB Leipzig) and keep Julián Álvarez (Atlético Madrid) top of their list. Atlético refuses to sell, but Arsenal are monitoring a possible rift between the Argentine forward and the Spanish club.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/07/2026",
    engagement: "72.1M",
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
