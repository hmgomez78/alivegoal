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

// Notícias curadas — atualizadas 16/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "💥 BREAKING: Suécia 5-1 Tunísia! Isak e Gyokeres brilham na estreia no Mundial!",
    title_en: "💥 BREAKING: Sweden 5-1 Tunisia! Isak and Gyokeres shine in World Cup debut!",
    summary: "A Suécia entrou a matar no Mundial 2026 com uma goleada de 5-1 sobre a Tunísia. Yasin Ayari marcou dois golos fantásticos, enquanto Alexander Isak e Viktor Gyokeres também faturaram. Um arranque demolidor que coloca os suecos no topo do Grupo F e envia um aviso às restantes seleções.",
    summary_en: "Sweden made a killer start to the 2026 World Cup with a 5-1 thrashing of Tunisia. Yasin Ayari scored two fantastic goals, while Alexander Isak and Viktor Gyokeres also found the net. A devastating start that puts the Swedes at the top of Group F and sends a warning to the other teams.",
    tag: "BREAKING",
    source: "@AlJazeera",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "42.1M",
  },
  {
    id: "t2",
    title: "🚨 SCANDAL: Gesto racista de adepto no Mundial gera indignação global e investigação da FIFA!",
    title_en: "🚨 SCANDAL: Fan's racist gesture at World Cup sparks global outrage and FIFA investigation!",
    summary: "Um vídeo viral mostrou um espectador a fazer um gesto racista (olhos puxados) atrás de um adepto sul-coreano durante o jogo México vs Coreia do Sul. A FIFA já abriu uma investigação e promete banir o indivíduo de todos os estádios. O incidente mancha o arranque do torneio e gerou uma onda de condenação nas redes sociais.",
    summary_en: "A viral video showed a spectator making a racist gesture (slant eyes) behind a South Korean fan during the Mexico vs South Korea match. FIFA has opened an investigation and promises to ban the individual from all stadiums. The incident taints the start of the tournament and sparked a wave of condemnation on social media.",
    tag: "SCANDAL",
    source: "@DailyMail",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "55.3M",
  },
  {
    id: "t3",
    title: "🔥 TRANSFER: Anthony Gordon assina pelo Barcelona por 80M€! Newcastle surpreende o mercado!",
    title_en: "🔥 TRANSFER: Anthony Gordon signs for Barcelona for €80M! Newcastle surprises the market!",
    summary: "BOMBA DE MERCADO! O Barcelona confirmou a contratação de Anthony Gordon ao Newcastle por 80 milhões de euros. O extremo inglês, que fez uma época fantástica na Premier League, vai reforçar o ataque catalão. Uma transferência que apanhou muitos de surpresa e mostra a ambição do Barça para a nova época.",
    summary_en: "MARKET BOMB! Barcelona confirmed the signing of Anthony Gordon from Newcastle for €80 million. The English winger, who had a fantastic season in the Premier League, will bolster the Catalan attack. A transfer that caught many by surprise and shows Barça's ambition for the new season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "61.2M",
  },
  {
    id: "t4",
    title: "⚽ HOT: França vs Senegal HOJE! Mbappé e companhia entram em ação no Grupo I!",
    title_en: "⚽ HOT: France vs Senegal TODAY! Mbappé and company in action in Group I!",
    summary: "O grande jogo do dia! A França, uma das grandes favoritas ao título, defronta o Senegal em Nova Jérsia. Kylian Mbappé lidera os gauleses contra uma equipa senegalesa sempre perigosa e física. Espera-se casa cheia e muito espetáculo neste embate do Grupo I.",
    summary_en: "The big game of the day! France, one of the top favorites for the title, faces Senegal in New Jersey. Kylian Mbappé leads the Gauls against an always dangerous and physical Senegalese team. A full house and a great show are expected in this Group I clash.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "38.9M",
  },
  {
    id: "t5",
    title: "🚨 TRANSFER: Rafael Leão confirma saída do AC Milan! Rúben Amorim não consegue segurar o craque!",
    title_en: "🚨 TRANSFER: Rafael Leão confirms AC Milan exit! Rúben Amorim fails to keep the star!",
    summary: "Rafael Leão confirmou publicamente que vai deixar o AC Milan neste verão. Apesar da chegada do novo treinador Rúben Amorim, o extremo português procura um novo desafio, com Arsenal e Manchester United muito atentos. O Milan exige uma verba astronómica pelo seu melhor jogador.",
    summary_en: "Rafael Leão has publicly confirmed he will leave AC Milan this summer. Despite the arrival of new manager Rúben Amorim, the Portuguese winger is looking for a new challenge, with Arsenal and Manchester United keeping a close eye. Milan demands an astronomical fee for their best player.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "47.5M",
  },
  {
    id: "t6",
    title: "💥 BREAKING: Irão 0-1 Nova Zelândia! Elijah Just marca golo histórico no arranque do Grupo G!",
    title_en: "💥 BREAKING: Iran 0-1 New Zealand! Elijah Just scores historic goal in Group G opener!",
    summary: "Surpresa no Grupo G! A Nova Zelândia venceu o Irão por 1-0 no SoFi Stadium em Los Angeles. Elijah Just marcou o único golo da partida cedo no jogo, e os 'All Whites' seguraram a vantagem com uma defesa de ferro. Um resultado que baralha as contas do grupo.",
    summary_en: "Surprise in Group G! New Zealand beat Iran 1-0 at SoFi Stadium in Los Angeles. Elijah Just scored the only goal of the match early on, and the 'All Whites' held onto the lead with an iron defense. A result that shakes up the group standings.",
    tag: "BREAKING",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "16/06/2026",
    engagement: "29.4M",
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
