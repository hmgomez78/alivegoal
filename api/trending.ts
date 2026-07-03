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

// Notícias curadas — atualizadas 03/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Portugal DERROTA Croácia 2-1 em Drama — Ronaldo de Penálti, Ramos no Último Suspiro!",
    title_en: "🚨 BREAKING: Portugal BEAT Croatia 2-1 in Drama — Ronaldo Penalty, Ramos Last-Gasp Winner!",
    summary: "Uma noite histórica em Toronto! Portugal eliminou a Croácia por 2-1 nos 16 avos de final do Mundial 2026 num jogo de loucos. Ivan Perišić colocou a Croácia na frente (53'), mas Cristiano Ronaldo igualou de penálti (68') — o primeiro golo de Ronaldo numa fase a eliminar de um Mundial, aos 41 anos! Quando parecia que ia para prolongamento, Gonçalo Ramos cabeceou de assistência de Rafael Leão no último minuto de descontos (90+4') para sentenciar. Luka Modric, 40 anos, saiu de campo em lágrimas. O duelo das lendas terminou com Portugal a avançar para os oitavos de final, onde defronta o vencedor de Espanha vs Áustria.",
    summary_en: "A historic night in Toronto! Portugal eliminated Croatia 2-1 in the World Cup 2026 Round of 32 in a crazy match. Ivan Perišić put Croatia ahead (53'), but Cristiano Ronaldo equalised from the penalty spot (68') — Ronaldo's first ever knockout round World Cup goal, aged 41! When extra time seemed certain, Gonçalo Ramos headed in from Rafael Leão's assist in the last minute of stoppage time (90+4') to seal it. Luka Modric, 40, left the pitch in tears. The legend duel ended with Portugal advancing to the Round of 16, where they face the winner of Spain vs Austria.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "2.1B",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Escândalo EXPLODE na Arbitragem Portuguesa — FPF Envia Caso ao Ministério Público!",
    title_en: "💥 SCANDAL: Scandal EXPLODES in Portuguese Refereeing — FPF Sends Case to Public Prosecutor!",
    summary: "O futebol português está em choque! A demissão de Duarte Gomes como Diretor Técnico de Arbitragem da FPF transformou-se num escândalo de proporções históricas. Duarte Gomes fez graves denúncias sobre manipulação de resultados e favorecimento de clubes nas decisões arbitrais. A FPF remeteu os factos para o Ministério Público. Frederico Varandas, presidente do Sporting, exigiu provas e declarou que 'é muito pior que o Apito Dourado'. O presidente do Benfica e do Porto também reagiram. A Liga Portugal convocou reunião de emergência. O caso promete abalar as estruturas do futebol português durante meses.",
    summary_en: "Portuguese football is in shock! The resignation of Duarte Gomes as FPF's Technical Director of Refereeing turned into a scandal of historic proportions. Duarte Gomes made serious allegations about match-fixing and favouring clubs in refereeing decisions. The FPF referred the facts to the Public Prosecutor. Sporting president Frederico Varandas demanded proof and declared it 'is much worse than the Golden Whistle'. Benfica and Porto presidents also reacted. Liga Portugal called an emergency meeting. The case threatens to shake Portuguese football's foundations for months.",
    tag: "SCANDAL",
    source: "@Record_Portugal",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "1.3B",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Camavinga QUER FICAR no Real Madrid — Mourinho Decide o Futuro do Francês!",
    title_en: "⚡ TRANSFER: Camavinga WANTS TO STAY at Real Madrid — Mourinho Decides Frenchman's Future!",
    summary: "Eduardo Camavinga está no centro de uma das maiores novelas do mercado de verão. O médio francês, que perdeu o Mundial por lesão, comunicou aos seus agentes que quer ficar no Real Madrid e lutar pelo seu lugar sob as ordens de José Mourinho. O Manchester City está atento e sabe que o Real Madrid estaria disposto a vender se chegasse uma proposta certa. Fabrizio Romano esclareceu que não há negociações avançadas com o City. O Real Madrid tem 8 semanas para decidir: ou Camavinga convence Mourinho, ou é vendido. Entretanto, Michael Olise continua a ser a obsessão de Florentino Pérez, mas o Bayern recusa vender.",
    summary_en: "Eduardo Camavinga is at the centre of one of the biggest transfer sagas of the summer window. The French midfielder, who missed the World Cup through injury, told his agents he wants to stay at Real Madrid and fight for his place under José Mourinho. Manchester City are watching and know Real Madrid would be open to selling if the right proposal arrived. Fabrizio Romano clarified there are no advanced negotiations with City. Real Madrid have 8 weeks to decide: either Camavinga convinces Mourinho, or he is sold. Meanwhile, Michael Olise remains Florentino Pérez's obsession, but Bayern refuse to sell.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "1.05B",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Klopp FAVORITO para Substituir Nagelsmann na Alemanha — DFB Pede Demissão!",
    title_en: "🚨 BREAKING: Klopp FAVOURITE to Replace Nagelsmann as Germany Boss — DFB Demands Resignation!",
    summary: "A crise do futebol alemão atingiu o ponto de rutura. Após a eliminação humilhante frente ao Paraguai nos penáltis, a Federação Alemã de Futebol (DFB) pediu a demissão de Julian Nagelsmann. Jürgen Klopp emerge como o candidato número um para assumir o comando da Mannschaft. O ex-treinador do Liverpool e Borussia Dortmund estaria aberto ao desafio. Nagelsmann recusou sair voluntariamente e ameaça com ação judicial. O DFB foi ainda alvo de investigação policial por suspeitas de corrupção ligadas ao Euro 2024. A Alemanha vive a sua pior crise futebolística em décadas, com o Mundial de 2030 no horizonte.",
    summary_en: "The German football crisis has reached breaking point. After the humiliating elimination against Paraguay on penalties, the German Football Federation (DFB) demanded Julian Nagelsmann's resignation. Jürgen Klopp emerges as the number one candidate to take charge of the Mannschaft. The former Liverpool and Borussia Dortmund manager would be open to the challenge. Nagelsmann refused to leave voluntarily and threatened legal action. The DFB was also targeted by a police investigation over suspected corruption linked to Euro 2024. Germany is experiencing its worst football crisis in decades, with the 2030 World Cup on the horizon.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "1.18B",
  },
  {
    id: "t5",
    title: "🔥 HOT: Argentina vs Cabo Verde HOJE — Messi e os Campeões do Mundo em Ação em Miami!",
    title_en: "🔥 HOT: Argentina vs Cape Verde TODAY — Messi and World Champions in Action in Miami!",
    summary: "Os campeões do mundo entram em campo hoje! Argentina defronta Cabo Verde nos 16 avos de final do Mundial 2026 em Miami (23:00 Lisboa). Lionel Messi lidera uma equipa que é favorita esmagadora (-667 nas casas de apostas). Cabo Verde surpreendeu ao qualificar-se com 3 empates na fase de grupos e tem sido a equipa mais trabalhadora do torneio. Mas a diferença de qualidade é enorme: Argentina cobriu -1.5 em 8 dos últimos 9 jogos. Também hoje: Austrália vs Egito (19:00 Lisboa) e Colômbia vs Gana (02:30 Lisboa de sexta para sábado). O Mundial 2026 está a entrar na sua fase mais emocionante!",
    summary_en: "The world champions take the field today! Argentina face Cape Verde in the World Cup 2026 Round of 32 in Miami (11pm Lisbon). Lionel Messi leads a team that is the overwhelming favourite (-667 at bookmakers). Cape Verde surprised by qualifying with 3 draws in the group stage and have been the tournament's hardest-working team. But the quality gap is enormous: Argentina covered -1.5 in 8 of their last 9 matches. Also today: Australia vs Egypt (7pm Lisbon) and Colombia vs Ghana (2:30am Lisbon Friday-Saturday). The 2026 World Cup is entering its most exciting phase!",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "1.45B",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Hjulmand do Sporting para o Atlético de Madrid — Romano Confirma Acordo com o Jogador!",
    title_en: "⚡ TRANSFER: Sporting's Hjulmand to Atletico Madrid — Romano Confirms Agreement with Player!",
    summary: "Bomba no mercado de transferências com impacto direto no futebol português! Fabrizio Romano confirmou que o Atlético de Madrid está a empurrar forte para contratar Morten Hjulmand do Sporting CP. O médio dinamarquês, um dos mais valorizados da Europa, já tem acordo de princípio com os representantes do jogador e o próprio Hjulmand quer mudar-se para La Liga. O Atlético já contratou Alejandro Grimaldo e está a negociar Kang-in Lee do PSG. O Sporting pode receber uma verba superior a €50 milhões pelo dinamarquês. Há também interesse da Premier League e da Serie A, mas o Atlético está na frente da corrida.",
    summary_en: "Transfer bomb with direct impact on Portuguese football! Fabrizio Romano confirmed that Atletico Madrid are pushing hard to sign Morten Hjulmand from Sporting CP. The Danish midfielder, one of the most valued in Europe, already has an agreement in principle with the player's representatives and Hjulmand himself wants to move to La Liga. Atletico have already signed Alejandro Grimaldo and are negotiating Kang-in Lee from PSG. Sporting could receive more than €50 million for the Dane. There is also interest from the Premier League and Serie A, but Atletico are leading the race.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "03/07/2026",
    engagement: "875.4M",
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
