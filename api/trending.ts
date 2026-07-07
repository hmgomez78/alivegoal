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

// Notícias curadas — atualizadas 07/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Espanha Elimina Portugal (1-0) e Ronaldo Despede-se do Mundial!",
    title_en: "🚨 BREAKING: Spain Eliminate Portugal (1-0) and Ronaldo Says Goodbye to the World Cup!",
    summary: "Uma noite histórica e emotiva em Dallas! Mikel Merino entrou como suplente e marcou o golo decisivo no primeiro minuto de descontos, enviando Espanha para os Quartos de Final do Mundial 2026. A derrota de Portugal significa o fim da carreira de Cristiano Ronaldo, 41 anos, nos Mundiais. O astro português, que confirmou antes do jogo que seria o seu último, não conseguiu marcar e saiu de campo entre lágrimas e aplausos. A La Roja continua invicta e sem sofrer golos no torneio.",
    summary_en: "A historic and emotional night in Dallas! Substitute Mikel Merino scored the decisive goal in the first minute of injury time, sending Spain to the World Cup 2026 quarter-finals. Portugal's defeat marks the end of Cristiano Ronaldo's World Cup career at age 41. The Portuguese star, who confirmed before the game it would be his last, failed to score and left the pitch in tears to a standing ovation. La Roja remain unbeaten and have yet to concede a goal in the tournament.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "9.4M",
  },
  {
    id: "t2",
    title: "😱 SCANDAL: Bélgica Humilha EUA (4-1) Apesar da Polémica Balogun — Trump Furioso!",
    title_en: "😱 SCANDAL: Belgium Humiliate USA (4-1) Despite Balogun Controversy — Trump Furious!",
    summary: "Que noite de humilhação para os EUA! Apesar de toda a polémica em torno da reversão da suspensão de Folarin Balogun pela FIFA — que até mereceu agradecimentos do Presidente Trump — a Bélgica goleou os anfitriões por 4-1 em Seattle. A interferência política na decisão da FIFA gerou ainda mais escândalo com este resultado. Os Red Devils avançam para os Quartos de Final onde defrontarão Espanha em Los Angeles, enquanto os EUA saem do torneio em casa com enorme vergonha.",
    summary_en: "What a night of humiliation for the USA! Despite all the controversy surrounding FIFA's reversal of Folarin Balogun's suspension — which even earned thanks from President Trump — Belgium thrashed the co-hosts 4-1 in Seattle. The political interference in FIFA's decision generated even more scandal with this result. The Red Devils advance to the quarter-finals where they will face Spain in Los Angeles, while the USA exit the tournament at home in embarrassment.",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "7.8M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Tottenham Bate Recorde com Tonali por £100M — Revolução De Zerbi!",
    title_en: "⚡ TRANSFER: Tottenham Break Record with £100M Tonali Deal — De Zerbi Revolution!",
    summary: "Os Spurs estão em modo de revolução total! Roberto De Zerbi assinou Sandro Tonali por £100 milhões (£92.5M + £7.5M em bónus), tornando-o o transfer mais caro da história do Tottenham. O médio italiano, de 26 anos, chega de Newcastle para liderar o meio-campo dos Spurs. Isto já é o segundo recorde batido em quatro dias pelo clube londrino, que já gastou mais de £237 milhões neste verão. Uma declaração de intenções clara para a temporada 2026/27.",
    summary_en: "Spurs are in full revolution mode! Roberto De Zerbi has signed Sandro Tonali for £100 million (£92.5M + £7.5M in bonuses), making him the most expensive transfer in Tottenham's history. The 26-year-old Italian midfielder arrives from Newcastle to lead Spurs' midfield. This is already the second club record broken in four days by the London club, who have now spent over £237 million this summer. A clear statement of intent for the 2026/27 season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "5.2M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Argentina vs Egito — Messi Quer Quartos de Final Hoje em Atlanta!",
    title_en: "🔥 HOT: Argentina vs Egypt — Messi Wants Quarter-Finals Today in Atlanta!",
    summary: "O campeão do mundo entra em campo hoje! Argentina defronta o Egito de Mohamed Salah e Omar Marmoush nos Oitavos de Final do Mundial 2026, às 16:00 UTC, no Mercedes-Benz Stadium em Atlanta. Lionel Messi lidera uma equipa argentina que é clara favorita, mas o Egito tem surpreendido ao longo do torneio. Salah, em grande forma, pode ser a ameaça que desequilibra este jogo. Quem avança para os Quartos de Final?",
    summary_en: "The world champions take the field today! Argentina face Egypt's Mohamed Salah and Omar Marmoush in the World Cup 2026 Round of 16 at 16:00 UTC at the Mercedes-Benz Stadium in Atlanta. Lionel Messi leads an Argentine side that are clear favourites, but Egypt have surprised throughout the tournament. Salah, in great form, could be the threat that tips this game. Who advances to the quarter-finals?",
    tag: "HOT",
    source: "@GuardianSport",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "6.1M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Man United Quer Andrey Santos por £50M — Chelsea Exige Valor Total",
    title_en: "⚡ TRANSFER: Man United Want Andrey Santos for £50M — Chelsea Demand Full Price",
    summary: "O Manchester United identificou Andrey Santos, médio brasileiro de 22 anos do Chelsea, como um alvo prioritário para o verão. Segundo o The Guardian, o United está disposto a fazer uma oferta, mas o Chelsea valoriza o jogador em £50 milhões. Santos, que está atrás de Caicedo e Enzo Fernández na hierarquia do Chelsea, está aberto a sair. O United já perdeu Elliot Anderson e Mateus Fernandes para outros clubes e precisa urgentemente de reforçar o meio-campo para a nova temporada.",
    summary_en: "Manchester United have identified Andrey Santos, Chelsea's 22-year-old Brazilian midfielder, as a priority summer target. According to The Guardian, United are willing to make an offer, but Chelsea value the player at £50 million. Santos, who is behind Caicedo and Enzo Fernández in Chelsea's hierarchy, is open to leaving. United have already missed out on Elliot Anderson and Mateus Fernandes to other clubs and urgently need to strengthen their midfield for the new season.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "3.7M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Suíça vs Colômbia — Batalha Surpreendente nos Oitavos de Final!",
    title_en: "🔥 HOT: Switzerland vs Colombia — Surprise Battle in the Round of 16!",
    summary: "O segundo jogo de hoje promete ser uma surpresa! Suíça e Colômbia defrontam-se às 20:00 UTC nos Oitavos de Final do Mundial 2026. A Suíça, sempre organizada e difícil de bater, enfrenta uma Colômbia talentosa com James Rodríguez e Luis Díaz. Ambas as equipas chegam em boa forma e este pode ser um dos jogos mais equilibrados desta fase. Uma eliminatória que pode ir a prolongamento ou mesmo a grandes penalidades.",
    summary_en: "The second game today promises to be a surprise! Switzerland and Colombia face off at 20:00 UTC in the World Cup 2026 Round of 16. Switzerland, always organised and difficult to beat, face a talented Colombia side with James Rodríguez and Luis Díaz. Both teams arrive in good form and this could be one of the most balanced matches of this round. A tie that could go to extra time or even a penalty shootout.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "07/07/2026",
    engagement: "2.8M",
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
