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

// Notícias curadas manualmente — atualizadas 10/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🔥 EL CLÁSICO HOJE! Barcelona vs Real Madrid — TÍTULO DA LA LIGA EM JOGO no Camp Nou!",
    title_en: "🔥 EL CLASICO TODAY! Barcelona vs Real Madrid — LA LIGA TITLE ON THE LINE at Camp Nou!",
    summary: "O maior jogo do futebol mundial acontece HOJE às 21:00 no Camp Nou! Barcelona (forma: WWWWW) recebe o Real Madrid (forma: DLWDW) na jornada 35 da La Liga. O Barcelona pode confirmar o título esta noite com uma vitória. Real Madrid chega em crise: escândalo interno com Valverde e Tchouameni, Arbeloa chamou de 'traição absoluta'. Mbappé em dúvida. Yamal vs Mbappé — o duelo do século!",
    summary_en: "The biggest match in world football happens TODAY at 21:00 at Camp Nou! Barcelona (form: WWWWW) host Real Madrid (form: DLWDW) on La Liga Matchday 35. Barcelona can confirm the title tonight with a win. Real Madrid arrive in crisis: internal scandal with Valverde and Tchouameni, Arbeloa called it an 'absolute betrayal'. Mbappé in doubt. Yamal vs Mbappé — the duel of the century!",
    tag: "HOT",
    source: "@LaLiga",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "1.2M",
  },
  {
    id: "t2",
    title: "ESCÂNDALO REAL MADRID! Valverde e Tchouameni abrem processos disciplinares — 'UMA TRAIÇÃO ABSOLUTA'!",
    title_en: "REAL MADRID SCANDAL! Valverde and Tchouameni face disciplinary proceedings — 'AN ABSOLUTE BETRAYAL'!",
    summary: "O Real Madrid abriu processos disciplinares contra Fede Valverde e Aurélien Tchouameni após uma alegada agressão no balneário. Arbeloa, treinador do Real Madrid Castilla, foi enfático: 'Parece-me uma traição absoluta ao Real Madrid.' Foram vazados prints de conversas internas. A notícia chega na véspera do El Clásico — o pior timing possível para Florentino Pérez.",
    summary_en: "Real Madrid have opened disciplinary proceedings against Fede Valverde and Aurélien Tchouameni following an alleged altercation in the dressing room. Arbeloa, Real Madrid Castilla manager, was emphatic: 'It seems like an absolute betrayal of Real Madrid.' Screenshots of internal conversations were leaked. The news comes on the eve of El Clásico — the worst possible timing for Florentino Pérez.",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "876.5K",
  },
  {
    id: "t3",
    title: "ESCÂNDALO DE ARBITRAGEM EM ITÁLIA! Mourinho elogia 'capacidade de limpeza' — Série A em chamas!",
    title_en: "REFEREEING SCANDAL IN ITALY! Mourinho praises 'cleaning capacity' — Serie A on fire!",
    summary: "O futebol italiano está mergulhado num novo escândalo de arbitragem. José Mourinho, treinador do Benfica, comentou sarcasticamente: 'Os italianos têm uma grande capacidade de fazer limpeza.' O Milan vs Atalanta de hoje pode ser afetado. Vários árbitros estão sob investigação por suspeita de manipulação de resultados. A UEFA está a monitorizar a situação de perto.",
    summary_en: "Italian football is engulfed in a new refereeing scandal. José Mourinho, Benfica manager, commented sarcastically: 'The Italians have a great capacity for cleaning up.' Tonight's Milan vs Atalanta could be affected. Several referees are under investigation for suspected match-fixing. UEFA is monitoring the situation closely.",
    tag: "SCANDAL",
    source: "@Record",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "534.2K",
  },
  {
    id: "t4",
    title: "WEST HAM vs ARSENAL às 15:30 — Arteta pode confirmar 2º lugar da Premier League HOJE!",
    title_en: "WEST HAM vs ARSENAL at 15:30 — Arteta can confirm 2nd place in Premier League TODAY!",
    summary: "Arsenal visita o West Ham hoje às 15:30 numa partida decisiva para a Premier League. Uma vitória confirma o 2º lugar e a qualificação direta para a Champions League. Arteta tem Saka, Martinelli e Havertz disponíveis. West Ham luta para evitar a descida. Após a vitória sobre o Atlético na UCL, o Arsenal está em forma brilhante. Pode ser o dia de festejar duas vezes!",
    summary_en: "Arsenal visit West Ham today at 15:30 in a decisive Premier League match. A win confirms 2nd place and direct Champions League qualification. Arteta has Saka, Martinelli and Havertz available. West Ham are fighting to avoid relegation. After the UCL win over Atletico, Arsenal are in brilliant form. It could be a day to celebrate twice!",
    tag: "BREAKING",
    source: "@PremierLeague",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "423.7K",
  },
  {
    id: "t5",
    title: "MOURINHO PODE DEIXAR O BENFICA! Real Madrid e Galatasaray em fila — Rui Costa quer saída!",
    title_en: "MOURINHO COULD LEAVE BENFICA! Real Madrid and Galatasaray in queue — Rui Costa wants him out!",
    summary: "José Mourinho está disponível para renovar com o Benfica, mas o presidente Rui Costa não quer que o treinador fique. Mourinho não descarta ir para o Real Madrid se Arbeloa for despedido. O Galatasaray também está interessado. A situação é explosiva: o Benfica está em 3º lugar na Liga e sem título europeu. A decisão vai ser tomada no final da época.",
    summary_en: "José Mourinho is available to renew with Benfica, but president Rui Costa does not want the manager to stay. Mourinho does not rule out going to Real Madrid if Arbeloa is sacked. Galatasaray are also interested. The situation is explosive: Benfica are 3rd in the league with no European title. The decision will be made at the end of the season.",
    tag: "TRANSFER",
    source: "@Record",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "312.8K",
  },
  {
    id: "t6",
    title: "MILAN vs ATALANTA às 18:45 — Final da Serie A! Quem vai à Champions League?",
    title_en: "MILAN vs ATALANTA at 18:45 — Serie A finale! Who goes to the Champions League?",
    summary: "AC Milan recebe a Atalanta hoje às 18:45 numa batalha épica pelo 3º lugar da Serie A e uma vaga na Champions League. A Atalanta, campeã da Europa League em 2024, quer regressar à Champions. O Milan precisa de vencer para garantir o lugar. Lazio vs Inter já terminou 0-3 para o Inter — a pressão está máxima. Gasperini vs Conceição: o duelo dos treinadores!",
    summary_en: "AC Milan host Atalanta today at 18:45 in an epic battle for 3rd place in Serie A and a Champions League spot. Atalanta, Europa League champions in 2024, want to return to the Champions League. Milan need a win to secure their place. Lazio vs Inter ended 0-3 to Inter — the pressure is at maximum. Gasperini vs Conceição: the managers' duel!",
    tag: "HOT",
    source: "@SerieA",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "267.4K",
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
