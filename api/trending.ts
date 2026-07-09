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
// Notícias curadas — atualizadas 09/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: França vs Marrocos — Quartos de Final do Mundial 2026 HOJE!",
    title_en: "🚨 BREAKING: France vs Morocco — World Cup 2026 Quarter-Final TODAY!",
    summary: "O duelo mais aguardado dos quartos de final está aqui! França e Marrocos voltam a encontrar-se num Campeonato do Mundo, quatro anos depois da semifinal de 2022 em que os franceses venceram por 2-0. Desta vez, os Leões do Atlas chegam mais fortes e com o apoio de todo o mundo árabe e africano. Mbappé e Hakimi são os protagonistas mais aguardados neste confronto épico que se disputa hoje às 17h (hora de Brasília) no Gillette Stadium. O vencedor enfrenta o vencedor de Espanha vs Bélgica nas meias-finais.",
    summary_en: "The most anticipated quarter-final clash is here! France and Morocco meet again at a World Cup, four years after the 2022 semi-final where the French won 2-0. This time, the Atlas Lions arrive stronger and with the support of the entire Arab and African world. Mbappé and Hakimi are the most anticipated protagonists in this epic clash taking place today at 17h (Brasília time) at Gillette Stadium. The winner faces the winner of Spain vs Belgium in the semi-finals.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "15.2M",
  },
  {
    id: "t2",
    title: "😱 SCANDAL: FBI Investiga Associação Argentina de Futebol por Lavagem de Dinheiro de $300M!",
    title_en: "😱 SCANDAL: FBI Investigates Argentine Football Association for $300M Money Laundering!",
    summary: "Um escândalo colossal abalou o Mundial 2026! O FBI abriu uma investigação formal contra a Associação de Futebol Argentino (AFA) por suspeitas de lavagem de dinheiro e fraude bancária nos Estados Unidos, num caso que envolve alegadamente $300 milhões. A investigação analisa tanto a vitória argentina no Mundial 2022 como a atual campanha de 2026. A notícia surgiu imediatamente após a vitória dramática da Argentina por 3-2 sobre o Egito, levantando suspeitas sobre a integridade do torneio. A FIFA e a AFA negam qualquer irregularidade.",
    summary_en: "A colossal scandal has rocked the 2026 World Cup! The FBI has opened a formal investigation into the Argentine Football Association (AFA) for suspected money laundering and bank fraud in the United States, in a case allegedly involving $300 million. The investigation analyses both Argentina's 2022 World Cup victory and the current 2026 campaign. The news emerged immediately after Argentina's dramatic 3-2 win over Egypt, raising suspicions about the tournament's integrity. FIFA and the AFA deny any wrongdoing.",
    tag: "SCANDAL",
    source: "@Independent",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "11.8M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: HERE WE GO! Andrey Santos Assina pelo Manchester United por £50M!",
    title_en: "⚡ TRANSFER: HERE WE GO! Andrey Santos Signs for Manchester United for £50M!",
    summary: "É oficial! Fabrizio Romano confirmou o 'Here We Go' para a transferência de Andrey Santos do Chelsea para o Manchester United por um pacote de £50 milhões (£48M + £2M em variáveis e cláusula de revenda). O médio brasileiro de 21 anos, que nunca chegou a jogar regularmente pelos Blues, vai finalmente ter a sua oportunidade de brilhar na Premier League sob as ordens de Ruben Amorim. Uma aposta clara do United no talento jovem brasileiro para resolver os problemas no meio-campo.",
    summary_en: "It's official! Fabrizio Romano has confirmed the 'Here We Go' for Andrey Santos' transfer from Chelsea to Manchester United for a £50 million package (£48M + £2M in variables and sell-on clause). The 21-year-old Brazilian midfielder, who never managed to play regularly for the Blues, will finally get his chance to shine in the Premier League under Ruben Amorim. A clear bet by United on young Brazilian talent to solve their midfield problems.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "9.3M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Mohamed Salah Livre! Inter Milan, MLS e Arábia Saudita na Corrida pelo Egípcio!",
    title_en: "🔥 HOT: Mohamed Salah Free Agent! Inter Milan, MLS and Saudi Arabia Race for Egyptian Star!",
    summary: "O mercado de transferências está em ebulição com o futuro de Mohamed Salah! O lendário avançado egípcio, de 34 anos, está livre após o fim do seu contrato com o Liverpool e as propostas estão a chegar de todo o lado. O Inter Milan está a explorar ativamente a possibilidade de contratação, mas precisaria de libertar espaço salarial. A MLS também contactou o entourage do jogador, enquanto o Al-Ittihad da Arábia Saudita mantém interesse de longa data. Salah, focado no Mundial com o Egito, prometeu decidir o seu futuro após o torneio.",
    summary_en: "The transfer market is boiling with Mohamed Salah's future! The legendary 34-year-old Egyptian forward is a free agent after his Liverpool contract expired and offers are arriving from everywhere. Inter Milan is actively exploring the possibility of signing him, but would need to free up wage space. MLS has also contacted the player's entourage, while Al-Ittihad from Saudi Arabia maintains long-standing interest. Salah, focused on the World Cup with Egypt, has promised to decide his future after the tournament.",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "8.7M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Arsenal 'Muito Perto' de Morgan Rogers — Aston Villa Pede €130M!",
    title_en: "⚡ TRANSFER: Arsenal 'Very Close' to Morgan Rogers — Aston Villa Demand €130M!",
    summary: "A novela do verão na Premier League! Fabrizio Romano confirmou que o Arsenal está 'muito perto' de chegar a acordo com Morgan Rogers sobre os termos pessoais do contrato. O extremo inglês é a prioridade máxima dos Gunners para o mercado de verão. O problema? O Aston Villa exige €130 milhões pela joia da coroa. O Arsenal está a negociar para baixar o valor, enquanto o jogador já terá dado o seu aval à mudança para o Emirates. Leandro Trossard pode sair para o Besiktas por €20M para financiar a operação.",
    summary_en: "The summer soap opera in the Premier League! Fabrizio Romano confirmed that Arsenal are 'very close' to reaching an agreement with Morgan Rogers on personal contract terms. The English winger is the Gunners' top priority for the summer market. The problem? Aston Villa demand €130 million for their crown jewel. Arsenal are negotiating to bring the fee down, while the player has reportedly already given his approval for the move to the Emirates. Leandro Trossard may leave for Besiktas for €20M to help fund the deal.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "7.1M",
  },
  {
    id: "t6",
    title: "😱 SCANDAL: Egito Furioso com Arbitragem Contra Argentina — Pedido Formal à FIFA!",
    title_en: "😱 SCANDAL: Egypt Furious with Refereeing Against Argentina — Formal Complaint to FIFA!",
    summary: "O Egito não ficou calado! Após a derrota por 3-2 frente à Argentina nos oitavos de final, a Federação Egípcia de Futebol apresentou uma queixa formal à FIFA contra a arbitragem do jogo. Os egípcios alegam que vários lances decisivos foram incorretamente julgados a favor dos sul-americanos, incluindo um penálti não assinalado e um golo que deveria ter sido anulado por fora de jogo. Mohamed Salah, visivelmente transtornado no final, afirmou que 'todos viram o que aconteceu'. A FIFA diz estar a analisar o caso.",
    summary_en: "Egypt is not staying silent! Following the 3-2 defeat against Argentina in the round of 16, the Egyptian Football Federation has filed a formal complaint with FIFA against the match refereeing. The Egyptians allege that several decisive moments were incorrectly judged in favour of the South Americans, including an unawarded penalty and a goal that should have been disallowed for offside. Mohamed Salah, visibly distraught at the end, stated that 'everyone saw what happened'. FIFA says it is analysing the case.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "09/07/2026",
    engagement: "10.4M",
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
