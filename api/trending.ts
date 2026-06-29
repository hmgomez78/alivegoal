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

// Notícias curadas — atualizadas 29/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Canadá CHOCA o Mundo! Golo aos 92' elimina África do Sul!",
    title_en: "🚨 BREAKING: Canada SHOCKS the World! 92nd-minute goal eliminates South Africa!",
    summary: "O Canadá fez história ao qualificar-se para os oitavos de final do Mundial 2026 de forma dramática! Stephen Eustáquio marcou um golo espetacular aos 92 minutos para selar a vitória por 1-0 sobre a África do Sul no Los Angeles Stadium. Alphonso Davies fez a sua estreia no torneio como capitão, entrando aos 75 minutos após lesão. O Canadá avança para enfrentar o vencedor do Holanda vs Marrocos.",
    summary_en: "Canada made history by qualifying for the Round of 16 of the 2026 World Cup in dramatic fashion! Stephen Eustáquio scored a spectacular 92nd-minute goal to seal a 1-0 victory over South Africa at the Los Angeles Stadium. Alphonso Davies made his tournament debut as captain, coming on in the 75th minute after injury. Canada advances to face the winner of Netherlands vs Morocco.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "542.1M",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Ugarte com Lesão GRAVE — Manchester United confirma rotura de ligamentos!",
    title_en: "💥 SCANDAL: Ugarte SERIOUS Injury — Manchester United confirms ligament tear!",
    summary: "O pesadelo confirmou-se para Manuel Ugarte e o Manchester United. O clube inglês confirmou que o médio uruguaio sofreu uma lesão grave nos ligamentos do joelho esquerdo durante o jogo do Mundial contra a Espanha. A lesão arruína completamente os planos de transferência do United para este verão e deixa o jogador fora dos relvados por vários meses. Uma reviravolta trágica na carreira do jogador de 25 anos.",
    summary_en: "The nightmare has been confirmed for Manuel Ugarte and Manchester United. The English club confirmed that the Uruguayan midfielder suffered a serious left knee ligament injury during the World Cup match against Spain. The injury completely ruins United's transfer plans for this summer and leaves the player sidelined for several months. A tragic turn in the 25-year-old's career.",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "489.3M",
  },
  {
    id: "t3",
    title: "🔥 TRANSFER: Revolução no Real Madrid! 4 Reforços de Peso Confirmados!",
    title_en: "🔥 TRANSFER: Revolution at Real Madrid! 4 Major Signings Confirmed!",
    summary: "O Real Madrid não brinca em serviço! Fabrizio Romano confirmou que os merengues já garantiram quatro reforços de luxo antes de julho: Marc Cucurella (55M€), Bernardo Silva (Custo Zero), Ibrahima Konaté e Denzel Dumfries. Com Kylian Mbappé já no plantel, a equipa madrilena está a montar um verdadeiro 'Super Plantel' para dominar a Europa. As casas de apostas já os colocam como favoritos à Champions!",
    summary_en: "Real Madrid is not playing around! Fabrizio Romano confirmed that Los Blancos have already secured four luxury signings before July: Marc Cucurella (€55M), Bernardo Silva (Free Transfer), Ibrahima Konaté, and Denzel Dumfries. With Kylian Mbappé already in the squad, the Madrid team is building a true 'Super Squad' to dominate Europe. Bookmakers already have them as Champions League favorites!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "612.8M",
  },
  {
    id: "t4",
    title: "⚡ HOT: Inglaterra Avança sem Brilhar — Bellingham e Kane Salvam a Pátria!",
    title_en: "⚡ HOT: England Advances without Shining — Bellingham and Kane Save the Day!",
    summary: "A Inglaterra venceu o Panamá por 2-0 e garantiu o primeiro lugar do Grupo L, mas a exibição deixou muito a desejar. Jude Bellingham abriu o marcador e Harry Kane selou a vitória com um golo histórico, tornando-se o melhor marcador de sempre da Inglaterra em Mundiais (11 golos), ultrapassando Gary Lineker. A equipa de Thomas Tuchel vai agora defrontar a surpreendente RD Congo nos oitavos de final.",
    summary_en: "England beat Panama 2-0 and secured first place in Group L, but the performance left much to be desired. Jude Bellingham opened the scoring and Harry Kane sealed the victory with a historic goal, becoming England's all-time top scorer in World Cups (11 goals), surpassing Gary Lineker. Thomas Tuchel's team will now face the surprising DR Congo in the Round of 16.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "385.4M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Oitavos de Final ESCALDANTES! Brasil vs Japão e Alemanha vs Paraguai Hoje!",
    title_en: "🚨 BREAKING: SIZZLING Round of 16! Brazil vs Japan and Germany vs Paraguay Today!",
    summary: "O Mundial 2026 entra na fase do mata-mata com jogos imperdíveis! Hoje, o Brasil defronta o Japão no NRG Stadium em Houston, procurando confirmar o seu favoritismo. Mais tarde, a Alemanha enfrenta o Paraguai. As odds apontam para o Brasil e a Alemanha, mas neste Mundial as surpresas têm sido uma constante!",
    summary_en: "The 2026 World Cup enters the knockout stage with unmissable games! Today, Brazil faces Japan at the NRG Stadium in Houston, looking to confirm their favoritism. Later, Germany faces Paraguay. Odds point to Brazil and Germany, but in this World Cup, surprises have been a constant!",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "420.1M",
  },
  {
    id: "t6",
    title: "💥 SCANDAL: Golo Anulado à Colômbia Gera Polémica — Portugal Passa em Segundo!",
    title_en: "💥 SCANDAL: Disallowed Goal for Colombia Sparks Controversy — Portugal Advances in Second!",
    summary: "O empate 0-0 entre Colômbia e Portugal ficou marcado por uma enorme polémica de arbitragem. Davinson Sánchez marcou o que seria o golo da vitória no último minuto, mas o VAR anulou o lance por um fora de jogo milimétrico que está a gerar revolta nas redes sociais. Com este resultado, a Colômbia vence o grupo e Portugal passa em segundo, marcando encontro com a Croácia nos oitavos de final.",
    summary_en: "The 0-0 draw between Colombia and Portugal was marked by a huge refereeing controversy. Davinson Sánchez scored what would have been the winning goal in the last minute, but VAR disallowed the play for a millimeter offside that is generating outrage on social media. With this result, Colombia wins the group and Portugal advances in second, setting up a clash with Croatia in the Round of 16.",
    tag: "SCANDAL",
    source: "@Record_Portugal",
    url: "https://x.com/alivegoal",
    time: "29/06/2026",
    engagement: "315.7M",
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
