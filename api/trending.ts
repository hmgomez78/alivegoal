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

// Notícias curadas — atualizadas 13/05/2026 (Manhã)
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 OFICIAL! MOURINHO É O NOVO TREINADOR DO REAL MADRID! O 'Special One' regressa ao Bernabéu 13 anos depois!",
    title_en: "🚨 OFFICIAL! MOURINHO IS REAL MADRID'S NEW MANAGER! The 'Special One' returns to the Bernabéu 13 years later!",
    summary: "BOMBA HISTÓRICA! O Real Madrid confirmou esta manhã o regresso de José Mourinho como treinador principal. O técnico português, de 63 anos, assinou contrato e regressa ao clube onde venceu a Liga dos Campeões em 2011/12. Mourinho exigiu três contratações específicas: Michael Olise (€175M), Kenan Yıldız e um médio defensivo. Florentino Pérez convocou conferência de imprensa onde também atacou o Barcelona pelo 'Caso Negreira'. O futebol europeu está em ebulição!",
    summary_en: "HISTORIC BOMB! Real Madrid confirmed this morning the return of José Mourinho as head coach. The 63-year-old Portuguese manager signed a contract and returns to the club where he won the Champions League in 2011/12. Mourinho demanded three specific signings: Michael Olise (€175M), Kenan Yıldız and a top defensive midfielder. Florentino Pérez called a press conference where he also attacked Barcelona over the 'Negreira Case'. European football is in turmoil!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "11.4M",
  },
  {
    id: "t2",
    title: "⚔️ GUERRA TOTAL! Florentino acusa Barcelona de corrupção histórica — Barça ameaça processo legal contra Real Madrid!",
    title_en: "⚔️ TOTAL WAR! Florentino accuses Barcelona of historic corruption — Barça threatens legal action against Real Madrid!",
    summary: "EL CLÁSICO FORA DE CAMPO! Na mesma conferência de imprensa em que anunciou Mourinho, Florentino Pérez chamou o 'Caso Negreira' o maior escândalo de corrupção na história do futebol. O Barcelona respondeu de imediato com um comunicado oficial a estudar ação legal contra o presidente do Real Madrid. A UEFA pode ser chamada a intervir. A guerra entre os dois maiores clubes do mundo atingiu um novo patamar!",
    summary_en: "EL CLASICO OFF THE PITCH! At the same press conference where he announced Mourinho, Florentino Pérez called the 'Negreira Case' the biggest corruption scandal in football history. Barcelona immediately responded with an official statement studying legal action against the Real Madrid president. UEFA may be called to intervene. The war between the two biggest clubs in the world has reached a new level!",
    tag: "SCANDAL",
    source: "@CBSSports",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "8.7M",
  },
  {
    id: "t3",
    title: "🏆 PSG PODE SER CAMPEÃO HOJE! Lens vs PSG: um empate basta para os parisienses conquistarem a Ligue 1!",
    title_en: "🏆 PSG CAN BE CHAMPIONS TODAY! Lens vs PSG: a draw is enough for the Parisians to win Ligue 1!",
    summary: "TÍTULO À VISTA! O PSG lidera a Ligue 1 com 6 pontos de vantagem sobre o Lens e joga HOJE em casa do rival direto. Um simples empate é suficiente para os parisienses serem coroados campeões de França. Luis Enrique deve poupar alguns titulares com a final da Champions League em mente, mas Dembélé e Kvaratskhelia deverão jogar. O Lens precisa de vencer para manter viva a esperança. Jogo às 20h00!",
    summary_en: "TITLE IN SIGHT! PSG leads Ligue 1 with a 6-point advantage over Lens and plays TODAY at their direct rival's ground. A simple draw is enough for the Parisians to be crowned French champions. Luis Enrique should rest some starters with the Champions League final in mind, but Dembélé and Kvaratskhelia are expected to play. Lens need to win to keep their hopes alive. Kick-off at 8pm!",
    tag: "HOT",
    source: "@Ligue1",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "5.9M",
  },
  {
    id: "t4",
    title: "💣 ARSENAL A 2 VITÓRIAS DO TÍTULO! Man City vs Crystal Palace HOJE — Guardiola precisa de vencer ou o Arsenal é campeão!",
    title_en: "💣 ARSENAL 2 WINS FROM THE TITLE! Man City vs Crystal Palace TODAY — Guardiola must win or Arsenal are champions!",
    summary: "CORRIDA ÉPICA AO TÍTULO! O Arsenal lidera a Premier League com 4 pontos de vantagem sobre o Man City, que tem um jogo a menos. Esta noite, o City recebe o Crystal Palace (20h00 BST) e uma derrota ou empate pode ser fatal para as esperanças de Guardiola. O Arsenal joga no sábado e pode ser campeão antes mesmo de entrar em campo. A Premier League está a decidir-se nas últimas jornadas!",
    summary_en: "EPIC TITLE RACE! Arsenal leads the Premier League with a 4-point advantage over Man City, who have a game in hand. Tonight, City host Crystal Palace (8pm BST) and a defeat or draw could be fatal for Guardiola's title hopes. Arsenal play on Saturday and could be champions before even taking the field. The Premier League is being decided in the final rounds!",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "7.2M",
  },
  {
    id: "t5",
    title: "😱 SPYGATE: Southampton na final dos Playoffs mas pode ser EXPULSO! EFL decide hoje o futuro do clube!",
    title_en: "😱 SPYGATE: Southampton in the Playoff final but could be EXPELLED! EFL decides the club's fate today!",
    summary: "DRAMA TOTAL! O Southampton venceu o Middlesbrough e está na final dos Playoffs do Championship, mas a EFL pode expulsá-los da competição por espionagem. O clube pediu mais tempo para investigação interna, mas a decisão pode cair hoje. Em jogo estão £140 milhões em receitas de promoção à Premier League. O Middlesbrough já apresentou queixa formal e exige sanções severas. O caso é sem precedentes no futebol inglês!",
    summary_en: "TOTAL DRAMA! Southampton beat Middlesbrough and are in the Championship Playoff final, but the EFL could expel them from the competition for spying. The club asked for more time for an internal investigation, but the decision could come today. At stake is £140 million in Premier League promotion revenue. Middlesbrough has already filed a formal complaint and demands severe sanctions. The case is unprecedented in English football!",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "5.1M",
  },
  {
    id: "t6",
    title: "🔥 FINAL DA COPPA ITALIA HOJE! Lazio vs Inter — Simone Inzaghi regressa ao seu ex-clube para conquistar o troféu!",
    title_en: "🔥 COPPA ITALIA FINAL TODAY! Lazio vs Inter — Simone Inzaghi returns to his former club to lift the trophy!",
    summary: "NOITE DE GRANDE FUTEBOL EM ITÁLIA! A final da Coppa Italia opõe o Lazio ao Inter de Milão, num duelo especial: Simone Inzaghi, que treinou o Lazio durante anos, regressa ao Olímpico de Roma para tentar conquistar o troféu com o Inter. Os Nerazzurri são favoritos após vencerem o Lazio 3-0 na Serie A recentemente. O Lazio precisa de uma reviravolta épica. Jogo às 20h00 (hora portuguesa)!",
    summary_en: "GREAT FOOTBALL NIGHT IN ITALY! The Coppa Italia final pits Lazio against Inter Milan, in a special duel: Simone Inzaghi, who coached Lazio for years, returns to the Olympic Stadium in Rome to try to lift the trophy with Inter. The Nerazzurri are favourites after beating Lazio 3-0 in Serie A recently. Lazio need an epic comeback. Kick-off at 8pm (Portuguese time)!",
    tag: "HOT",
    source: "@SerieA",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "4.6M",
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
