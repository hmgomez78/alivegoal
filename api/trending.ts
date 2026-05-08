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

// Notícias curadas manualmente — atualizadas 08/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "ASTON VILLA 4-0 FOREST! Emery leva Villa à Final da Europa League — Braga também avança!",
    title_en: "ASTON VILLA 4-0 FOREST! Emery takes Villa to Europa League Final — Braga also through!",
    summary: "Noite histórica na Europa League! Aston Villa goleou o Nottingham Forest por 4-0 (4-1 no agregado) no Villa Park e está na final pela primeira vez. Ollie Watkins marcou dois golos. Na outra semi-final, o Freiburg venceu o Braga por 3-1 mas o Braga avançou pelo agregado (4-3). A final será Aston Villa vs Sporting Braga!",
    summary_en: "Historic Europa League night! Aston Villa thrashed Nottingham Forest 4-0 (4-1 on aggregate) at Villa Park and are in the final for the first time. Ollie Watkins scored twice. In the other semi, Freiburg beat Braga 3-1 but Braga advanced on aggregate (4-3). The final: Aston Villa vs Sporting Braga!",
    tag: "BREAKING",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "487.2K",
  },
  {
    id: "t2",
    title: "CRYSTAL PALACE E RAYO VALLECANO NA FINAL DA CONFERENCE LEAGUE EM LEIPZIG!",
    title_en: "CRYSTAL PALACE AND RAYO VALLECANO IN CONFERENCE LEAGUE FINAL IN LEIPZIG!",
    summary: "Crystal Palace venceu o Shakhtar Donetsk por 2-1 (5-2 no agregado) e Rayo Vallecano eliminou o Strasbourg por 1-0 (2-0 no agregado). A final da UEFA Conference League 2025/26 será disputada no Leipzig Stadium, na Alemanha. Rayo Vallecano torna-se o primeiro clube espanhol de 'segunda linha' a chegar a uma final europeia em décadas.",
    summary_en: "Crystal Palace beat Shakhtar Donetsk 2-1 (5-2 on aggregate) and Rayo Vallecano eliminated Strasbourg 1-0 (2-0 on aggregate). The 2025/26 UEFA Conference League final will be played at Leipzig Stadium in Germany. Rayo Vallecano become the first Spanish 'smaller' club to reach a European final in decades.",
    tag: "BREAKING",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "234.8K",
  },
  {
    id: "t3",
    title: "BAYERN OFERECE £80M A ANTHONY GORDON — Newcastle em choque!",
    title_en: "BAYERN OFFER £80M FOR ANTHONY GORDON — Newcastle in shock!",
    summary: "O Bayern de Munique fez uma proposta de 80 milhões de libras ao Newcastle por Anthony Gordon, oferecendo ao extremo inglês um contrato de 5 anos. O jogador de 24 anos, que foi convocado para a seleção inglesa, é visto como o substituto ideal para Gnabry. O Newcastle está relutante em vender mas a oferta é difícil de recusar.",
    summary_en: "Bayern Munich have made an £80 million offer to Newcastle for Anthony Gordon, offering the English winger a five-year contract. The 24-year-old, who has been called up to the England squad, is seen as the ideal replacement for Gnabry. Newcastle are reluctant to sell but the offer is hard to refuse.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "198.4K",
  },
  {
    id: "t4",
    title: "RASHFORD NO BARCELONA? Debate aceso — 'Deve ficar ou ir embora?'",
    title_en: "RASHFORD TO BARCELONA? Heated debate — 'Should he stay or go?'",
    summary: "O futuro de Marcus Rashford no Barcelona está em debate. O clube catalão tem opção de compra pelo avançado inglês do Manchester United, mas os analistas dividem-se: uns defendem que Rashford não justifica o investimento, outros argumentam que a sua velocidade e capacidade de driblar são exatamente o que o Barça precisa. A decisão tem de ser tomada até junho.",
    summary_en: "Marcus Rashford's future at Barcelona is under debate. The Catalan club has a buy option for the Manchester United forward, but analysts are divided: some argue Rashford doesn't justify the investment, others say his pace and dribbling are exactly what Barça needs. The decision must be made by June.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "145.6K",
  },
  {
    id: "t5",
    title: "ESCÂNDALO ITÁLIA: 60+ JOGADORES ligados a rede de prostituição — Rafael Leão na lista!",
    title_en: "ITALY SCANDAL: 60+ PLAYERS linked to prostitution ring — Rafael Leão on the list!",
    summary: "A imprensa italiana revelou que mais de 60 jogadores da Serie A estão ligados a uma rede de prostituição de luxo em Milão. Entre os nomes citados estão Rafael Leão (AC Milan) e Nuno Tavares (Lazio). A investigação judicial está em curso e a FIFA já pediu esclarecimentos. O escândalo pode comprometer a participação de vários jogadores no Mundial 2026.",
    summary_en: "Italian media revealed that more than 60 Serie A players are linked to a luxury prostitution ring in Milan. Among the names cited are Rafael Leão (AC Milan) and Nuno Tavares (Lazio). A judicial investigation is underway and FIFA has already requested clarifications. The scandal could jeopardise several players' participation in the 2026 World Cup.",
    tag: "SCANDAL",
    source: "@CorrieredelloSport",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "389.7K",
  },
  {
    id: "t6",
    title: "ARSENAL vs PSG: FINAL DA CHAMPIONS EM BUDAPESTE — Bilhetes esgotados em 8 minutos!",
    title_en: "ARSENAL vs PSG: CHAMPIONS LEAGUE FINAL IN BUDAPEST — Tickets sold out in 8 minutes!",
    summary: "A final da UEFA Champions League 2025/26 entre Arsenal e PSG no Puskás Aréna de Budapeste (30 de maio) esgotou em apenas 8 minutos. Os adeptos do Arsenal expressaram indignação com a alocação de bilhetes da UEFA — apenas 20.000 para cada clube num estádio de 68.000 lugares. A UEFA defende-se dizendo que 'os critérios são os mesmos para todos'.",
    summary_en: "The 2025/26 UEFA Champions League final between Arsenal and PSG at Puskás Aréna in Budapest (May 30) sold out in just 8 minutes. Arsenal fans expressed outrage at UEFA's ticket allocation — only 20,000 per club in a 68,000-seat stadium. UEFA defended itself saying 'the criteria are the same for everyone'.",
    tag: "HOT",
    source: "@ArsenalFC",
    url: "https://x.com/alivegoal",
    time: "08/05/2026",
    engagement: "276.3K",
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
