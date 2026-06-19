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

// Notícias curadas — atualizadas 19/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Brasil vs Haiti hoje à noite! Ancelotti estreia-se no Mundial 2026 — Vinicius e Rodrygo titulares!",
    title_en: "🚨 BREAKING: Brazil vs Haiti tonight! Ancelotti makes his World Cup 2026 debut — Vinicius and Rodrygo start!",
    summary: "O momento mais aguardado do Mundial 2026 chega esta noite: o Brasil de Carlo Ancelotti estreia-se no torneio frente ao Haiti, em Filadélfia (02:30 Lisboa). Após o empate dececionante de Portugal com o Congo, os olhos do mundo viram-se para a Seleção Canarinha. Vinicius Jr., Rodrygo e Raphinha formam o trio de ataque que promete encantar. Ancelotti, que assumiu o cargo após o Mundial, tem a pressão de mostrar resultados imediatos. O Brasil é o segundo favorito ao título e qualquer resultado que não seja uma vitória convincente será considerado um fracasso.",
    summary_en: "The most anticipated moment of the 2026 World Cup arrives tonight: Carlo Ancelotti's Brazil makes its tournament debut against Haiti in Philadelphia (01:30 ET). After Portugal's disappointing draw with Congo, the world's eyes turn to the Seleção. Vinicius Jr., Rodrygo and Raphinha form the attacking trio set to dazzle. Ancelotti, who took charge after the World Cup qualifying campaign, faces immediate pressure to deliver. Brazil are second favourites for the title and anything less than a convincing win will be seen as a failure.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "142.3M",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Canadá 6-0 Qatar — Maior goleada da história do Mundial! Qatar expulsa 2 jogadores e entra em colapso!",
    title_en: "💥 SCANDAL: Canada 6-0 Qatar — Biggest win in World Cup history! Qatar have 2 players sent off and collapse!",
    summary: "O Canadá protagonizou ontem a maior vitória de sempre numa Copa do Mundo ao golear o Qatar por 6-0 em Vancouver. Jonathan David marcou um hat-trick histórico, mas a partida ficou marcada pela vergonha do Qatar: dois jogadores expulsos, jogo completamente fora de controlo. É a maior goleada da história do torneio. O Qatar, que organizou o Mundial de 2022, saiu de campo com a cabeça baixa e praticamente eliminado. As celebrações canadianas foram, no entanto, ensombradas pela grave lesão de Ismaël Koné.",
    summary_en: "Canada produced the biggest win in World Cup history by thrashing Qatar 6-0 in Vancouver. Jonathan David scored a historic hat-trick, but the match was marred by Qatar's disgrace: two red cards, a completely out-of-control performance. It is the largest winning margin in tournament history. Qatar, who hosted the 2022 World Cup, left the pitch with their heads down and virtually eliminated. Canada's celebrations were, however, overshadowed by Ismaël Koné's serious injury.",
    tag: "SCANDAL",
    source: "@CBCSports",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "98.7M",
  },
  {
    id: "t3",
    title: "🔥 TRANSFER: Bernardo Silva assina pelo Real Madrid! Mourinho confirma: 'É o jogador que precisávamos!'",
    title_en: "🔥 TRANSFER: Bernardo Silva signs for Real Madrid! Mourinho confirms: 'He is the player we needed!'",
    summary: "Bernardo Silva deixa o Manchester City em fim de contrato e assina pelo Real Madrid de José Mourinho. O médio português, um dos melhores do mundo na sua posição, chega ao Santiago Bernabéu a custo zero numa das transferências mais impactantes do verão. Mourinho confirmou pessoalmente o acordo: 'Bernardo é o jogador que precisávamos para completar o nosso meio-campo.' O Real Madrid já tinha contratado Marc Cucurella ao Chelsea por 51,8 milhões de libras e continua a reforçar-se para a próxima temporada.",
    summary_en: "Bernardo Silva leaves Manchester City as a free agent and signs for José Mourinho's Real Madrid. The Portuguese midfielder, one of the best in the world in his position, arrives at the Santiago Bernabéu on a free transfer in one of the most impactful deals of the summer. Mourinho personally confirmed the agreement: 'Bernardo is the player we needed to complete our midfield.' Real Madrid had already signed Marc Cucurella from Chelsea for £51.8m and continue to strengthen for next season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "87.4M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: Irão ameaça abandonar o Mundial! EUA recusam vistos a árbitros e staff — FIFA em pânico!",
    title_en: "🚨 SCANDAL: Iran threaten to withdraw from the World Cup! USA refuse visas to referees and staff — FIFA in panic!",
    summary: "O Mundial 2026 está a ser sacudido por um escândalo político sem precedentes: os Estados Unidos recusaram vistos a vários membros do staff e árbitros iranianos, colocando em risco a participação do Irão no torneio. A seleção iraniana ameaçou retirar-se oficialmente, o que seria um golpe devastador para a FIFA. O México teve de intervir diplomaticamente para tentar resolver a situação. A FIFA está em pânico e Infantino reuniu-se de emergência com representantes dos governos envolvidos. O caso está a dominar as manchetes mundiais e levanta questões sobre a politização do desporto.",
    summary_en: "The 2026 World Cup is being rocked by an unprecedented political scandal: the United States refused visas to several Iranian staff members and referees, putting Iran's participation in the tournament at risk. The Iranian national team threatened to officially withdraw, which would be a devastating blow to FIFA. Mexico had to intervene diplomatically to try to resolve the situation. FIFA is in panic mode and Infantino held an emergency meeting with representatives of the governments involved. The case is dominating global headlines and raises questions about the politicisation of sport.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "76.1M",
  },
  {
    id: "t5",
    title: "⚽ HOT: Roberto Martínez abandona Portugal após o Mundial! Já negocia com o Al-Nassr para treinar Cristiano Ronaldo!",
    title_en: "⚽ HOT: Roberto Martínez leaves Portugal after the World Cup! Already negotiating with Al-Nassr to coach Cristiano Ronaldo!",
    summary: "Roberto Martínez confirmou que o seu contrato com Portugal termina após o Mundial 2026 e que não haverá renovação. Mais surpreendente ainda: o treinador espanhol já está em negociações avançadas com o Al-Nassr da Arábia Saudita, o que significaria que voltaria a trabalhar com Cristiano Ronaldo — desta vez no clube. A indefinição sobre o futuro do selecionador está a criar tensão no seio da equipa portuguesa, que empatou na estreia com a RD Congo (1-1) e precisa de reagir urgentemente.",
    summary_en: "Roberto Martínez has confirmed that his contract with Portugal ends after the 2026 World Cup and there will be no renewal. Even more surprising: the Spanish coach is already in advanced negotiations with Al-Nassr of Saudi Arabia, which would mean he returns to work with Cristiano Ronaldo — this time at club level. The uncertainty over the national team coach's future is creating tension within the Portuguese squad, who drew their opening match with DR Congo (1-1) and urgently need to respond.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "64.8M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Anthony Gordon ao Barcelona por 69M£! Newcastle aceita oferta — Winger inglês diz adeus à Premier League!",
    title_en: "🔥 TRANSFER: Anthony Gordon to Barcelona for £69M! Newcastle accept offer — English winger says goodbye to the Premier League!",
    summary: "O Barcelona fechou um dos negócios mais impactantes do verão ao garantir a contratação de Anthony Gordon ao Newcastle United por 69,3 milhões de libras. O extremo inglês, que brilhou na Premier League e foi convocado para o Mundial 2026 com a Inglaterra, vai jogar no Camp Nou na próxima temporada. O Newcastle, que já vendeu Gordon, está agora à procura de um substituto de qualidade. Esta transferência confirma o regresso do Barcelona às grandes contratações após anos de dificuldades financeiras.",
    summary_en: "Barcelona closed one of the summer's most impactful deals by securing Anthony Gordon from Newcastle United for £69.3 million. The English winger, who shone in the Premier League and was called up for the 2026 World Cup with England, will play at Camp Nou next season. Newcastle, having sold Gordon, are now searching for a quality replacement. This transfer confirms Barcelona's return to major signings after years of financial difficulties.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "19/06/2026",
    engagement: "58.2M",
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
