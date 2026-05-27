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

// Notícias curadas — atualizadas 27/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 FINAL HISTÓRICA HOJE! Crystal Palace vs Rayo Vallecano disputam a Liga Conferência em Leipzig!",
    title_en: "🏆 HISTORIC FINAL TODAY! Crystal Palace vs Rayo Vallecano battle for the Conference League in Leipzig!",
    summary: "O DIA É HOJE! A grande final da UEFA Conference League 2025/26 acontece esta noite em Leipzig, na Alemanha, com o Crystal Palace a defrontar o Rayo Vallecano (21:00 CET). Dois clubes que disputam a sua primeira grande final europeia, numa noite que promete ser inesquecível. O Palace, liderado por Oliver Glasner na sua última partida no comando dos Eagles, tem em Ismaïla Sarr (9 golos na competição) a sua grande arma. O Rayo Vallecano, do bairro operário de Vallecas, chega com uma sequência de 4 jogos sem perder. Quem levantará o troféu?",
    summary_en: "TODAY IS THE DAY! The grand final of the 2025/26 UEFA Conference League takes place tonight in Leipzig, Germany, with Crystal Palace facing Rayo Vallecano (21:00 CET). Two clubs competing in their first major European final, in a night that promises to be unforgettable. Palace, led by Oliver Glasner in his last match in charge of the Eagles, have Ismaïla Sarr (9 goals in the competition) as their main weapon. Rayo Vallecano, from the working-class neighbourhood of Vallecas, arrive on a 4-game unbeaten run. Who will lift the trophy?",
    tag: "HOT",
    source: "@UEFAConferenceLeague",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "298.7M",
  },
  {
    id: "t2",
    title: "🚨 ESCÂNDALO NA INGLATERRA! Tuchel deixa fora Foden, Palmer, Alexander-Arnold e Maguire do Mundial 2026!",
    title_en: "🚨 ENGLAND SCANDAL! Tuchel leaves out Foden, Palmer, Alexander-Arnold and Maguire from the 2026 World Cup!",
    summary: "CHOQUE TOTAL EM INGLATERRA! Thomas Tuchel anunciou a lista de 26 jogadores da seleção inglesa para o Mundial 2026 e causou um terramoto. Phil Foden, Cole Palmer, Trent Alexander-Arnold e Harry Maguire são as grandes ausências. Palmer, furioso, declarou publicamente que acredita ter sido excluído por razões pessoais e não desportivas. Maguire ficou a saber da exclusão de forma indireta e escreveu nas redes sociais: 'Estou chocado e devastado'. Uma decisão que divide o país e coloca Tuchel sob enorme pressão antes do torneio.",
    summary_en: "TOTAL SHOCK IN ENGLAND! Thomas Tuchel announced the 26-man England squad for the 2026 World Cup and caused an earthquake. Phil Foden, Cole Palmer, Trent Alexander-Arnold and Harry Maguire are the major absentees. Palmer, furious, publicly declared he believes he was excluded for personal rather than sporting reasons. Maguire found out about his exclusion indirectly and wrote on social media: 'I am shocked and devastated'. A decision that divides the country and puts Tuchel under enormous pressure before the tournament.",
    tag: "SCANDAL",
    source: "@England",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "341.2M",
  },
  {
    id: "t3",
    title: "💰 AQUI VAMOS NÓS! Rüdiger renova com o Real Madrid até 2027 — confirmado por Fabrizio Romano!",
    title_en: "💰 HERE WE GO! Rüdiger renews with Real Madrid until 2027 — confirmed by Fabrizio Romano!",
    summary: "HERE WE GO! O defesa alemão Toni Rüdiger chegou a acordo verbal com o Real Madrid para renovar o seu contrato por mais um ano, até junho de 2027. O central de 33 anos, que chegou ao Bernabéu em 2022 vindo do Chelsea, mantém-se como pilar da defesa merengue. A renovação surge num momento em que o Real Madrid enfrenta uma crise de resultados, com o técnico José Mourinho sob pressão. Rüdiger, que não foi convocado por Espanha para o Mundial (zero jogadores do Real Madrid na lista de De la Fuente), continua a ser um dos melhores defesas do mundo.",
    summary_en: "HERE WE GO! German defender Toni Rüdiger has reached a verbal agreement with Real Madrid to extend his contract by one more year, until June 2027. The 33-year-old centre-back, who joined the Bernabéu from Chelsea in 2022, remains a pillar of the Merengue defence. The renewal comes at a time when Real Madrid are facing a crisis of results, with manager José Mourinho under pressure. Rüdiger, who was not called up by Germany for the World Cup, continues to be one of the best defenders in the world.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "187.4M",
  },
  {
    id: "t4",
    title: "🔥 ROBERTSON ENTRE TOTTENHAM E JUVENTUS! Fabrizio Romano revela: a decisão é do jogador!",
    title_en: "🔥 ROBERTSON BETWEEN TOTTENHAM AND JUVENTUS! Fabrizio Romano reveals: the decision is the player's!",
    summary: "O SUSPENSE CONTINUA! Andy Robertson, que vai deixar o Liverpool a custo zero no final de junho, tem duas propostas concretas em cima da mesa: o Tottenham Hotspur e a Juventus. Segundo Fabrizio Romano, os Spurs estão em 'negociações avançadas' mas o acordo ainda não está fechado, com a Juventus a tentar roubar o lateral escocês. Robertson, de 32 anos, tem de escolher entre manter-se em Inglaterra nos Spurs ou aventurar-se em Itália com o clube mais histórico de Turim. Uma decisão que pode mudar o rumo do mercado de verão.",
    summary_en: "THE SUSPENSE CONTINUES! Andy Robertson, who will leave Liverpool on a free transfer at the end of June, has two concrete offers on the table: Tottenham Hotspur and Juventus. According to Fabrizio Romano, Spurs are in 'advanced talks' but the deal is not yet closed, with Juventus trying to steal the Scottish left-back. Robertson, 32, must choose between staying in England at Spurs or venturing to Italy with Turin's most historic club. A decision that could change the course of the summer transfer market.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "156.8M",
  },
  {
    id: "t5",
    title: "🚨 LAMINE YAMAL EM DÚVIDA! Espanha teme lesão grave antes do Mundial 2026!",
    title_en: "🚨 LAMINE YAMAL IN DOUBT! Spain fear serious injury before the 2026 World Cup!",
    summary: "ALERTA VERMELHO EM ESPANHA! O prodígio do Barcelona, Lamine Yamal, sofreu uma lesão muscular que o afasta do futebol por pelo menos três semanas, colocando em risco a sua participação no início do Mundial 2026. O treinador Luis de la Fuente incluiu-o na lista de 26 jogadores mas admite que a sua presença nos primeiros jogos da fase de grupos é incerta. Sem nenhum jogador do Real Madrid na convocatória (uma situação sem precedentes), a Espanha depende mais do que nunca do jovem de 18 anos para chegar longe no torneio. O mundo do futebol aguarda com ansiedade as novidades médicas.",
    summary_en: "RED ALERT IN SPAIN! Barcelona prodigy Lamine Yamal has suffered a muscle injury that will keep him out of football for at least three weeks, putting his participation in the start of the 2026 World Cup at risk. Manager Luis de la Fuente included him in the 26-man squad but admits his presence in the first group stage games is uncertain. With no Real Madrid players in the squad (an unprecedented situation), Spain depend more than ever on the 18-year-old to go far in the tournament. The football world anxiously awaits medical updates.",
    tag: "BREAKING",
    source: "@SEFutbol",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "224.6M",
  },
  {
    id: "t6",
    title: "🏆 PSG vs ARSENAL — TUDO O QUE PRECISA DE SABER sobre a Final da Champions 2026 em Budapeste!",
    title_en: "🏆 PSG vs ARSENAL — EVERYTHING YOU NEED TO KNOW about the 2026 Champions League Final in Budapest!",
    summary: "A CONTAGEM DECRESCENTE COMEÇOU! Faltam apenas 3 dias para a grande final da Liga dos Campeões 2025/26, que colocará frente a frente o Paris Saint-Germain e o Arsenal no Estádio Puskás em Budapeste (30 de maio, 17:00 BST). O PSG, atual campeão, procura o bicampeonato inédito para o clube. O Arsenal, recém-coroado campeão da Premier League, sonha com uma dobradinha histórica. Declan Rice vs Vitinha no meio-campo, Saka vs a defesa do PSG — os duelos prometem ser épicos. As odds estão equilibradas: PSG @2.10, Arsenal @2.20, Empate @3.40.",
    summary_en: "THE COUNTDOWN HAS BEGUN! Just 3 days to go until the grand final of the 2025/26 Champions League, which will pit Paris Saint-Germain against Arsenal at the Puskás Stadium in Budapest (May 30, 5 p.m. BST). PSG, the current champions, are looking for an unprecedented back-to-back title for the club. Arsenal, the newly crowned Premier League champions, dream of a historic double. Declan Rice vs Vitinha in midfield, Saka vs the PSG defence — the duels promise to be epic. The odds are balanced: PSG @2.10, Arsenal @2.20, Draw @3.40.",
    tag: "HOT",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "27/05/2026",
    engagement: "312.9M",
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
