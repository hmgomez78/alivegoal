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
// Notícias curadas — atualizadas 10/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Espanha vs Bélgica — Quartos de Final do Mundial 2026 HOJE às 20h!",
    title_en: "🚨 BREAKING: Spain vs Belgium — World Cup 2026 Quarter-Final TODAY at 20h!",
    summary: "O segundo duelo dos quartos de final do Mundial 2026 acontece HOJE! Espanha, que não sofreu um único golo neste torneio, enfrenta uma Bélgica em chamas que eliminou os EUA nos oitavos. Lamine Yamal e Rodri são os protagonistas espanhóis, enquanto Kevin De Bruyne lidera os Diables Rouges numa última dança antes da sua provável retirada internacional. O jogo disputa-se no Los Angeles Stadium às 20h00 (hora de Lisboa). O vencedor defronta a França nas meias-finais a 14 de julho.",
    summary_en: "The second quarter-final clash of the 2026 World Cup happens TODAY! Spain, who have not conceded a single goal in this tournament, face a Belgium side on fire who eliminated the USA in the round of 16. Lamine Yamal and Rodri are the Spanish protagonists, while Kevin De Bruyne leads the Red Devils in what could be his last international dance before likely retirement. The match takes place at Los Angeles Stadium at 20h00 (Lisbon time). The winner faces France in the semi-finals on July 14.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "14.8M",
  },
  {
    id: "t2",
    title: "😱 SCANDAL: Trump Ligou a Infantino e Forçou a FIFA a Anular Cartão Vermelho de Balogun — UE Furiosa!",
    title_en: "😱 SCANDAL: Trump Called Infantino and Forced FIFA to Overturn Balogun's Red Card — EU Furious!",
    summary: "O maior escândalo do Mundial 2026 explodiu! O presidente dos EUA, Donald Trump, admitiu ter ligado pessoalmente ao presidente da FIFA, Gianni Infantino, para pressionar a anulação do cartão vermelho de Folarin Balogun contra a Bósnia. A FIFA cedeu — algo sem precedentes na história moderna do futebol — e Balogun jogou contra a Bélgica. A UEFA classificou a decisão como 'sem precedentes, incompreensível e injustificável'. Parlamentares europeus pediram uma investigação formal. Trump disse que 'não sabia o que era um cartão vermelho' mas que era 'muito injusto'.",
    summary_en: "The biggest scandal of the 2026 World Cup has exploded! US President Donald Trump admitted to personally calling FIFA president Gianni Infantino to pressure the overturning of Folarin Balogun's red card against Bosnia. FIFA caved — something unprecedented in modern football history — and Balogun played against Belgium. UEFA classified the decision as 'unprecedented, incomprehensible and unjustifiable'. European lawmakers called for a formal investigation. Trump said he 'didn't know what a red card was' but that it was 'very unfair'.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "18.4M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: HERE WE GO! Bruno Guimarães Assina pelo Arsenal por £70M — Acordo de 5 Anos!",
    title_en: "⚡ TRANSFER: HERE WE GO! Bruno Guimarães Signs for Arsenal for £70M — 5-Year Deal!",
    summary: "É oficial! Fabrizio Romano confirmou o 'Here We Go' para a transferência de Bruno Guimarães do Newcastle United para o Arsenal por £70 milhões. O médio brasileiro de 27 anos, considerado um dos melhores da Premier League, assinou um contrato de 5 anos com os Gunners. O Arsenal confirma também a contratação do guarda-redes Illan Meslier. Mikel Arteta reforça o meio-campo com uma das peças mais cobiçadas do mercado. O Newcastle usará o dinheiro para contratar Bazoumana Toure do Hoffenheim por €50M.",
    summary_en: "It's official! Fabrizio Romano has confirmed the 'Here We Go' for Bruno Guimarães' transfer from Newcastle United to Arsenal for £70 million. The 27-year-old Brazilian midfielder, considered one of the best in the Premier League, has signed a 5-year contract with the Gunners. Arsenal also confirms the signing of goalkeeper Illan Meslier. Mikel Arteta strengthens the midfield with one of the most coveted players on the market. Newcastle will use the money to sign Bazoumana Toure from Hoffenheim for €50M.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "11.2M",
  },
  {
    id: "t4",
    title: "🔥 HOT: França 2-0 Marrocos — Mbappé Marca o 8º Golo e Vai às Meias-Finais pela 3ª Vez!",
    title_en: "🔥 HOT: France 2-0 Morocco — Mbappé Scores 8th Goal and Reaches Semi-Finals for 3rd Time!",
    summary: "A França confirmou o favoritismo e eliminou Marrocos por 2-0 nos quartos de final do Mundial 2026, repetindo exatamente o resultado da semifinal de 2022. Kylian Mbappé, após falhar um penálti, marcou o seu 8º golo do torneio — igualando o recorde de Just Fontaine de 1958. Ousmane Dembélé fez o segundo. Mbappé torna-se o primeiro jogador a chegar às meias-finais nos seus três primeiros Mundiais. Marrocos saiu de cabeça erguida, com Hakimi em lágrimas. A França aguarda o vencedor de Espanha vs Bélgica.",
    summary_en: "France confirmed their favouritism and eliminated Morocco 2-0 in the 2026 World Cup quarter-finals, repeating exactly the result of the 2022 semi-final. Kylian Mbappé, after missing a penalty, scored his 8th goal of the tournament — equalling Just Fontaine's 1958 record. Ousmane Dembélé scored the second. Mbappé becomes the first player to reach the semi-finals in each of his first three World Cups. Morocco left with their heads held high, with Hakimi in tears. France awaits the winner of Spain vs Belgium.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "13.6M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Sandro Tonali para o Tottenham por €100M — De Zerbi Influenciou a Decisão!",
    title_en: "⚡ TRANSFER: Sandro Tonali to Tottenham for €100M — De Zerbi Influenced the Decision!",
    summary: "Uma das maiores transferências do verão está fechada! Sandro Tonali vai deixar o Newcastle United para se juntar ao Tottenham Hotspur numa operação de €100 milhões. O médio italiano, que cumpriu suspensão por apostas ilegais, está em grande forma e revelou que a influência de Roberto De Zerbi foi decisiva na sua escolha. O Tottenham já tinha contratado Mateus Fernandes do West Ham por €98M. O Manchester City tentou entrar na corrida, mas Tonali escolheu o projeto de De Zerbi. O Newcastle usa o dinheiro para contratar Bazoumana Toure.",
    summary_en: "One of the summer's biggest transfers is done! Sandro Tonali will leave Newcastle United to join Tottenham Hotspur in a €100 million deal. The Italian midfielder, who served a suspension for illegal betting, is in great form and revealed that Roberto De Zerbi's influence was decisive in his choice. Tottenham had already signed Mateus Fernandes from West Ham for €98M. Manchester City tried to enter the race, but Tonali chose De Zerbi's project. Newcastle will use the money to sign Bazoumana Toure.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "9.7M",
  },
  {
    id: "t6",
    title: "😱 SCANDAL: Karim Adeyemi ONLY Barcelona — Dortmund Recebe Oferta Oficial, Jogador Recusa Tudo!",
    title_en: "😱 SCANDAL: Karim Adeyemi ONLY Barcelona — Dortmund Receives Official Bid, Player Refuses Everything!",
    summary: "O caso Adeyemi está a criar um escândalo no Borussia Dortmund! O extremo alemão de 24 anos informou o clube que Barcelona é o seu único destino e recusou todas as outras propostas. O Barça enviou uma oferta oficial ao Dortmund, que tem contrato com o jogador até 2027. O BVB está furioso com a atitude do jogador e ameaça não vender. Fabrizio Romano confirmou: 'ONLY Barcelona'. O Dortmund pede €60M, o Barça oferece €45M. Joan Laporta também confirmou uma oferta formal por Julian Alvarez ao Atlético de Madrid.",
    summary_en: "The Adeyemi case is creating a scandal at Borussia Dortmund! The 24-year-old German winger has informed the club that Barcelona is his only destination and refused all other proposals. Barça sent an official offer to Dortmund, who have the player under contract until 2027. BVB is furious with the player's attitude and threatens not to sell. Fabrizio Romano confirmed: 'ONLY Barcelona'. Dortmund demands €60M, Barça offers €45M. Joan Laporta also confirmed a formal bid for Julian Alvarez from Atletico Madrid.",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/07/2026",
    engagement: "8.9M",
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
