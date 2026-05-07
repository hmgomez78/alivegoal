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

// Notícias curadas manualmente — atualizadas 07/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "FINAL DOS SONHOS! Arsenal vs PSG em Budapeste — 30 de Maio",
    title_en: "DREAM FINAL! Arsenal vs PSG in Budapest — May 30",
    summary: "A final da UEFA Champions League 2025/26 está definida: Arsenal vs PSG no Puskás Aréna de Budapeste, a 30 de Maio. O Arsenal eliminou o Atlético de Madrid (5-1 no agregado) e o PSG afastou o Bayern de Munique num épico 6-5 no agregado. A primeira final europeia do Arsenal desde 2006 contra os campeões em título.",
    summary_en: "The 2025/26 UEFA Champions League final is set: Arsenal vs PSG at Puskás Aréna in Budapest on May 30. Arsenal eliminated Atletico Madrid (5-1 on aggregate) and PSG edged Bayern Munich in an epic 6-5 aggregate thriller. Arsenal's first European final since 2006 against the reigning champions.",
    tag: "BREAKING",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "07/05/2026",
    engagement: "312.4K",
  },
  {
    id: "t2",
    title: "ESCÂNDALO NA UCL: PSG beneficiou de dois penáltis não marcados — Bayern exige investigação",
    title_en: "UCL SCANDAL: PSG benefited from two unawarded penalties — Bayern demand investigation",
    summary: "O jornal alemão Bild classificou de 'escândalo' a atuação do árbitro na semi-final PSG vs Bayern. Michael Ballack, lenda do futebol alemão, afirmou que 'dois penáltis claros não foram marcados e isso mudou o jogo'. O Bayern exige uma investigação formal à UEFA. A BBC Sport também analisou as polémicas decisões arbitrais.",
    summary_en: "German newspaper Bild labelled the referee's performance in the PSG vs Bayern semi-final a 'scandal'. Bayern legend Michael Ballack said 'two clear penalties were not awarded and that changed the game'. Bayern are demanding a formal UEFA investigation. BBC Sport also analysed the controversial refereeing decisions.",
    tag: "SCANDAL",
    source: "@Bild",
    url: "https://x.com/alivegoal",
    time: "07/05/2026",
    engagement: "187.3K",
  },
  {
    id: "t3",
    title: "PIQUÉ SUSPENSO 6 JOGOS por 'violência leve' contra árbitro — escândalo no FC Andorra",
    title_en: "PIQUÉ BANNED 6 GAMES for 'minor violence' against referee — FC Andorra scandal",
    summary: "Gerard Piqué, dono do FC Andorra, foi suspenso por 6 jogos e proibido de qualquer atividade futebolística em Espanha por 2 meses após um confronto físico com o árbitro. A Federação Espanhola de Futebol classificou o incidente como 'violência leve'. O presidente do clube, Ferran Vilaseca, também foi punido.",
    summary_en: "Gerard Piqué, owner of FC Andorra, has been banned for 6 games and barred from all football activity in Spain for 2 months after a physical confrontation with a referee. The Spanish Football Federation classified the incident as 'minor violence'. Club president Ferran Vilaseca was also punished.",
    tag: "SCANDAL",
    source: "@marca",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "94.8K",
  },
  {
    id: "t4",
    title: "NEYMAR ESBOFETEIA colega de equipa no treino do Santos — pedido de desculpas público",
    title_en: "NEYMAR SLAPS teammate in Santos training — public apology issued",
    summary: "Neymar protagonizou um incidente chocante no treino do Santos ao esbofetear o jovem Robinho Júnior, filho do ex-internacional brasileiro Robinho. O incidente foi filmado e viralizou nas redes sociais. Neymar pediu desculpas publicamente, mas o Santos abriu uma investigação interna. O caso pode comprometer a convocatória do avançado para o Mundial 2026.",
    summary_en: "Neymar caused a shocking incident in Santos training by slapping young Robinho Júnior, son of former Brazil international Robinho. The incident was filmed and went viral on social media. Neymar issued a public apology, but Santos opened an internal investigation. The case could jeopardise the striker's World Cup 2026 call-up.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "156.2K",
  },
  {
    id: "t5",
    title: "RONALDO HOJE: Al-Nassr vs Al-Shabab — título da Saudi Pro League em jogo!",
    title_en: "RONALDO TODAY: Al-Nassr vs Al-Shabab — Saudi Pro League title on the line!",
    summary: "Cristiano Ronaldo e o Al-Nassr jogam hoje (18:00 GMT) contra o Al-Shabab numa partida decisiva para o título da Saudi Pro League. O Al-Nassr lidera com 5 pontos de vantagem sobre o Al-Hilal de Benzema, mas uma derrota reabre a corrida. CR7 tem 25 golos e 12 assistências esta época e está a um passo do seu primeiro título saudita.",
    summary_en: "Cristiano Ronaldo and Al-Nassr play today (18:00 GMT) against Al-Shabab in a decisive Saudi Pro League title match. Al-Nassr lead by 5 points over Benzema's Al-Hilal, but a defeat reopens the race. CR7 has 25 goals and 12 assists this season and is one step away from his first Saudi title.",
    tag: "HOT",
    source: "@AliveGoal",
    url: "https://x.com/alivegoal",
    time: "07/05/2026",
    engagement: "78.5K",
  },
  {
    id: "t6",
    title: "ARSENAL quer KVARATSKHELIA do PSG — 'O melhor extremo do mundo'",
    title_en: "ARSENAL want KVARATSKHELIA from PSG — 'The best winger in the world'",
    summary: "O Arsenal está a preparar uma proposta milionária para contratar Khvicha Kvaratskhelia do PSG no verão. O extremo georgiano, apelidado de 'o melhor extremo do mundo' por Steven Gerrard, foi fundamental na conquista da Champions League pelo PSG. Mikel Arteta quer reforçar o ataque para a próxima época, independentemente do resultado da final.",
    summary_en: "Arsenal are preparing a massive bid to sign Khvicha Kvaratskhelia from PSG in the summer. The Georgian winger, dubbed 'the best winger in the world' by Steven Gerrard, was key in PSG's Champions League triumph. Mikel Arteta wants to strengthen the attack for next season, regardless of the final result.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "07/05/2026",
    engagement: "112.7K",
  },
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
