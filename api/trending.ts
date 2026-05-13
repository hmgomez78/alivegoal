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

// Notícias curadas — atualizadas 13/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 MOURINHO DE VOLTA AO REAL MADRID! Acordo fechado — o 'Special One' regressa ao Bernabéu 13 anos depois!",
    title_en: "🚨 MOURINHO BACK TO REAL MADRID! Deal done — the 'Special One' returns to the Bernabéu 13 years later!",
    summary: "BOMBA HISTÓRICA! José Mourinho chegou a acordo com o Real Madrid para assumir o cargo de treinador principal a partir da próxima temporada. Florentino Pérez convocou uma conferência de imprensa e o clube confirmou o regresso do técnico português, 13 anos após a sua primeira passagem. Mourinho exigiu três contratações específicas e já tem alvos definidos: Michael Olise, Kenan Yıldız e um médio defensivo de topo. O mundo do futebol está em choque!",
    summary_en: "HISTORIC BOMB! José Mourinho has reached an agreement with Real Madrid to take over as head coach from next season. Florentino Pérez called a press conference and the club confirmed the return of the Portuguese manager, 13 years after his first spell. Mourinho demanded three specific signings and already has targets in mind: Michael Olise, Kenan Yıldız, and a top defensive midfielder. The football world is in shock!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "9.2M",
  },
  {
    id: "t2",
    title: "⚔️ GUERRA TOTAL REAL MADRID vs BARCELONA! Florentino acusa Barça de corrupção — Barcelona ameaça processo legal!",
    title_en: "⚔️ TOTAL WAR REAL MADRID vs BARCELONA! Florentino accuses Barça of corruption — Barcelona threatens legal action!",
    summary: "CLÁSSICO FORA DE CAMPO! Numa conferência de imprensa explosiva, Florentino Pérez acusou o Barcelona de ser o maior escândalo de corrupção na história do futebol, referindo-se ao 'Caso Negreira' — pagamentos ilegais a árbitros durante mais de 20 anos. O Barcelona respondeu de imediato, estudando ação legal contra o presidente do Real Madrid. A LaLiga é palco de uma guerra institucional sem precedentes que pode chegar à UEFA!",
    summary_en: "CLASICO OFF THE PITCH! In an explosive press conference, Florentino Pérez accused Barcelona of being the biggest corruption scandal in football history, referring to the 'Negreira Case' — illegal payments to referees for over 20 years. Barcelona immediately responded, studying legal action against the Real Madrid president. LaLiga is the stage for an unprecedented institutional war that could reach UEFA!",
    tag: "SCANDAL",
    source: "@CBSSports",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "7.8M",
  },
  {
    id: "t3",
    title: "🏆 ARSENAL A DOIS PASSOS DO TÍTULO! Vitória dramática no West Ham com golo de Trossard aos 83'!",
    title_en: "🏆 ARSENAL TWO STEPS FROM THE TITLE! Dramatic win at West Ham with Trossard goal in the 83rd minute!",
    summary: "QUE DRAMA! O Arsenal venceu o West Ham por 1-0 com um golo de Trossard aos 83 minutos, mantendo uma vantagem de 4 pontos sobre o Manchester City, que ainda tem um jogo a menos. Os Gunners estão a dois jogos de conquistar o título da Premier League pela primeira vez em décadas. O VAR anulou um golo do West Ham numa decisão polémica que deixou o estádio em fúria. Arteta foi filmado em êxtase no banco de suplentes!",
    summary_en: "WHAT DRAMA! Arsenal beat West Ham 1-0 with a Trossard goal in the 83rd minute, maintaining a 4-point lead over Manchester City, who still have a game in hand. The Gunners are two games away from winning the Premier League title for the first time in decades. VAR disallowed a West Ham goal in a controversial decision that left the stadium furious. Arteta was filmed in ecstasy on the bench!",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "6.4M",
  },
  {
    id: "t4",
    title: "💣 MOURINHO QUER ROUBAR JOGADORES AO ARSENAL! Martinelli, Alisson e Kenan Yıldız na lista de €175M!",
    title_en: "💣 MOURINHO WANTS TO RAID ARSENAL! Martinelli, Alisson and Kenan Yıldız on the €175M list!",
    summary: "MERCADO EXPLOSIVO! Após confirmar o acordo com o Real Madrid, Mourinho já tem a lista de reforços definida. O técnico português quer Gabriel Martinelli e Alisson do Arsenal/Liverpool, e está disposto a pagar €175 milhões por Michael Olise ao Bayern Munich. O Real Madrid também submeteu uma proposta formal à Juventus por Kenan Yıldız, oferecendo dois jogadores como parte do negócio. O verão de 2026 promete ser o mais movimentado da história!",
    summary_en: "EXPLOSIVE TRANSFER MARKET! After confirming the deal with Real Madrid, Mourinho already has his transfer list ready. The Portuguese manager wants Gabriel Martinelli and Alisson from Arsenal/Liverpool, and is willing to pay €175 million for Michael Olise from Bayern Munich. Real Madrid also submitted a formal proposal to Juventus for Kenan Yıldız, offering two players as part of the deal. The summer of 2026 promises to be the most active in history!",
    tag: "TRANSFER",
    source: "@SIFootball",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "5.6M",
  },
  {
    id: "t5",
    title: "😱 SPYGATE! Southampton arrisca EXPULSÃO dos Playoffs e perda de £140M após escândalo de espionagem!",
    title_en: "😱 SPYGATE! Southampton risks EXPULSION from Playoffs and loss of £140M after spying scandal!",
    summary: "CAOS TOTAL NO CHAMPIONSHIP! O Southampton avançou para a final dos Playoffs após vencer o Middlesbrough 2-1, mas a vitória está ensombrada pelo escândalo de espionagem. A EFL acusou formalmente o clube de espiar os treinos do Middlesbrough antes da meia-final. Se condenados, o Southampton pode ser expulso dos Playoffs e perder £140 milhões em receitas de promoção à Premier League. O caso pode ser o maior escândalo do futebol inglês em décadas!",
    summary_en: "TOTAL CHAOS IN THE CHAMPIONSHIP! Southampton advanced to the Playoff final after beating Middlesbrough 2-1, but the victory is overshadowed by the spying scandal. The EFL formally charged the club with spying on Middlesbrough's training sessions before the semi-final. If found guilty, Southampton could be expelled from the Playoffs and lose £140 million in Premier League promotion revenue. The case could be the biggest scandal in English football in decades!",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "4.9M",
  },
  {
    id: "t6",
    title: "🔥 XABI ALONSO NO CHELSEA OU ESPERA PELO LIVERPOOL? O dilema do treinador mais cobiçado da Europa!",
    title_en: "🔥 XABI ALONSO TO CHELSEA OR WAIT FOR LIVERPOOL? The dilemma of Europe's most coveted manager!",
    summary: "NOVELA DO VERÃO! Xabi Alonso está no centro de uma das maiores novelas de treinadores do futebol europeu. O Chelsea intensificou as negociações e as conversações iniciais são descritas como 'encorajadoras'. No entanto, Alonso tem o Liverpool como o seu 'sonho' e pode esperar por uma vaga nos Reds. Jamie Carragher diz que seria o 'casamento perfeito' com o Chelsea, enquanto os adeptos do Liverpool estão em pânico. Decisão esperada nas próximas semanas!",
    summary_en: "SUMMER SOAP OPERA! Xabi Alonso is at the center of one of the biggest managerial sagas in European football. Chelsea intensified negotiations and initial talks are described as 'encouraging'. However, Alonso has Liverpool as his 'dream' and may wait for a vacancy at the Reds. Jamie Carragher says it would be the 'perfect marriage' with Chelsea, while Liverpool fans are in panic. Decision expected in the coming weeks!",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "13/05/2026",
    engagement: "4.3M",
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
