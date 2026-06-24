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

// Notícias curadas — atualizadas 24/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Cristiano Ronaldo bisa e Portugal esmaga o Uzbequistão por 5-0!",
    title_en: "🚨 BREAKING: Cristiano Ronaldo scores a brace as Portugal crush Uzbekistan 5-0!",
    summary: "Cristiano Ronaldo calou os críticos de forma categórica! O capitão português, aos 41 anos, marcou dois golos na primeira parte e liderou Portugal numa vitória demolidora por 5-0 contra o Uzbequistão no Mundial 2026. Após o empate na estreia, a seleção das quinas reagiu com força e dominou completamente a partida. Ronaldo até comentou que um confronto com Messi na fase a eliminar seria 'incrível'.",
    summary_en: "Cristiano Ronaldo silenced his critics emphatically! The 41-year-old Portuguese captain scored twice in the first half, leading Portugal to a crushing 5-0 victory over Uzbekistan at the 2026 World Cup. After a draw in their opener, the national team bounced back strongly and completely dominated the match. Ronaldo even commented that a knockout stage clash with Messi would be 'awesome'.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "450.2M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Julián Álvarez a caminho do Barcelona? Atlético rejeita venda!",
    title_en: "🔥 TRANSFER: Julian Alvarez heading to Barcelona? Atletico rejects sale!",
    summary: "O mercado está ao rubro com o possível 'bombástico' negócio de Julián Álvarez! Rumores indicam que o Barcelona terá enviado uma oferta astronómica de €150M pelo avançado argentino para substituir Lewandowski. No entanto, o Atlético de Madrid está furioso com a abordagem e recusa-se a vender a sua estrela. O jogador já teria chegado a um acordo verbal de 5 anos com os catalães. A novela promete!",
    summary_en: "The transfer market is on fire with the possible 'blockbuster' deal for Julian Alvarez! Rumors suggest Barcelona have sent an astronomical €150M bid for the Argentine forward to replace Lewandowski. However, Atletico Madrid are furious with the approach and refuse to sell their star. The player has reportedly already reached a 5-year verbal agreement with the Catalans. The saga continues!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "320.5M",
  },
  {
    id: "t3",
    title: "🚨 SCANDAL: Escândalo de apostas afasta Brendan Sorsby da NFL em 2026!",
    title_en: "🚨 SCANDAL: Betting scandal bans Brendan Sorsby from the NFL in 2026!",
    summary: "Um enorme escândalo abalou o futebol americano e o desporto universitário! A NFL negou o pedido do ex-quarterback de Texas Tech, Brendan Sorsby, para entrar no draft suplementar, cancelando-o por completo. Sorsby tinha sido banido do futebol universitário devido a um enorme escândalo de apostas (mais de 9.000 apostas totalizando ~$90K). Os seus sonhos de jogar na NFL estão agora suspensos.",
    summary_en: "A massive scandal has rocked American football and college sports! The NFL denied former Texas Tech quarterback Brendan Sorsby's application for the supplemental draft, canceling it altogether. Sorsby had been banned from college football due to a huge gambling scandal (over 9,000 bets totaling ~$90K). His dreams of playing in the NFL are now on hold indefinitely.",
    tag: "SCANDAL",
    source: "@WSJ",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "185.9M",
  },
  {
    id: "t4",
    title: "⚽ TRANSFER: Chelsea foca-se em Lacroix e Arsenal aproxima-se de Morgan Rogers!",
    title_en: "⚽ TRANSFER: Chelsea focus on Lacroix and Arsenal close in on Morgan Rogers!",
    summary: "O mercado londrino está muito ativo! O Chelsea está fortemente interessado em contratar o defesa Maxence Lacroix, tornando-o uma das suas prioridades defensivas, com o novo treinador Maresca a aprovar a contratação. Entretanto, o Arsenal está muito perto de garantir Morgan Rogers, com propostas oficiais já apresentadas. O verão de transferências em Inglaterra promete ser histórico.",
    summary_en: "The London transfer market is highly active! Chelsea are strongly interested in signing defender Maxence Lacroix, making him one of their defensive priorities, with new manager Maresca approving the move. Meanwhile, Arsenal are very close to securing Morgan Rogers, with official bids already submitted. The summer transfer window in England promises to be historic.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "210.4M",
  },
  {
    id: "t5",
    title: "💥 HOT: Inglaterra empata 0-0 com o Gana num jogo frustrante!",
    title_en: "💥 HOT: England draw 0-0 with Ghana in a frustrating match!",
    summary: "A seleção inglesa sofreu um choque de realidade no Mundial 2026! Após uma vitória emocionante sobre a Croácia, a equipa de Thomas Tuchel não conseguiu passar de um empate a zeros contra o Gana, em Boston. Apesar de dominar a posse de bola, a Inglaterra teve enormes dificuldades em criar oportunidades claras contra uma defesa ganesa inspirada e sólida. Um resultado histórico para o Gana!",
    summary_en: "The English national team suffered a reality check at the 2026 World Cup! After a thrilling win over Croatia, Thomas Tuchel's side could only manage a goalless draw against Ghana in Boston. Despite dominating possession, England struggled immensely to create clear-cut chances against an inspired and solid Ghanaian defense. A historic result for Ghana!",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "275.8M",
  },
  {
    id: "t6",
    title: "🔥 BREAKING: Fluminense anuncia regresso bombástico de Thiago Silva aos 41 anos!",
    title_en: "🔥 BREAKING: Fluminense announces blockbuster return of Thiago Silva at 41!",
    summary: "O 'Monstro' está de volta a casa! O Fluminense anunciou de forma bombástica a contratação do defesa central Thiago Silva. Aos 41 anos, o experiente internacional brasileiro regressa para a sua terceira passagem pelo clube do coração, assinando um contrato válido até ao final de 2026. A contratação teve forte envolvimento nos bastidores e gera enorme entusiasmo entre os adeptos tricolores.",
    summary_en: "The 'Monster' is back home! Fluminense have sensationally announced the signing of centre-back Thiago Silva. At 41 years old, the experienced Brazilian international returns for his third spell at his boyhood club, signing a contract valid until the end of 2026. The signing involved significant behind-the-scenes lobbying and has generated massive excitement among the Tricolor fans.",
    tag: "BREAKING",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "24/06/2026",
    engagement: "198.3M",
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
