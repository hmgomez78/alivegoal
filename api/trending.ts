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

// Notícias curadas — atualizadas 12/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 FC PORTO CAMPEÃO! Villas-Boas conquista o título no seu segundo ano como presidente!",
    title_en: "🏆 FC PORTO CHAMPIONS! Villas-Boas wins the title in his second year as president!",
    summary: "HISTÓRICO! O FC Porto sagrou-se campeão da Liga Portugal 2025/26! André Villas-Boas conquista o seu primeiro título de campeão nacional como presidente do clube, um feito notável aos 48 anos. A equipa dominou a época e celebrou a conquista do 31º título da sua história. Festa rija na Invicta! Benfica empata com o Braga (2-2) e é ultrapassado pelo Sporting na tabela.",
    summary_en: "HISTORIC! FC Porto are crowned champions of Liga Portugal 2025/26! André Villas-Boas wins his first national championship title as club president, a remarkable feat at 48 years old. The team dominated the season and celebrated winning the 31st title in their history. Massive party in Porto! Benfica draw with Braga (2-2) and are overtaken by Sporting in the table.",
    tag: "BREAKING",
    source: "@FCPorto",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.5M",
  },
  {
    id: "t2",
    title: "🚨 XABI ALONSO ABRE A PORTA AO CHELSEA! Romano confirma: 'Abriu as portas à Premier League'!",
    title_en: "🚨 XABI ALONSO OPENS THE DOOR TO CHELSEA! Romano confirms: 'He opened the doors to the Premier League'!",
    summary: "BOMBA NO MERCADO! Fabrizio Romano confirmou que Xabi Alonso 'abriu as portas' à Premier League e está disposto a assumir o comando do Chelsea. O treinador espanhol deu um ultimato aos donos do clube londrino para encontrarem um projeto viável. O Chelsea explora agora um acordo para o nomear como novo treinador principal. Liverpool também está atento!",
    summary_en: "TRANSFER BOMB! Fabrizio Romano confirmed that Xabi Alonso has 'opened the doors' to the Premier League and is willing to take charge of Chelsea. The Spanish manager gave an ultimatum to the London club's owners to find a viable project. Chelsea are now exploring a deal to appoint him as the new head coach. Liverpool are also watching!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.1M",
  },
  {
    id: "t3",
    title: "😱 MOURINHO DE SAÍDA DO BENFICA? Real Madrid oferece contrato até 2028 ao 'Special One'!",
    title_en: "😱 MOURINHO LEAVING BENFICA? Real Madrid offers contract until 2028 to the 'Special One'!",
    summary: "CHOQUE NA LUZ! Após o empate do Benfica com o Sp. Braga (2-2), os rumores da saída de José Mourinho intensificaram-se. Florentino Pérez terá apresentado uma proposta de contrato até 2028 para o regresso do 'Special One' ao Real Madrid. Mourinho recusou renovar com o Benfica. Marco Silva (Fulham) é o favorito para suceder ao português na Luz!",
    summary_en: "SHOCK AT DA LUZ! After Benfica's draw with Sp. Braga (2-2), rumors of José Mourinho's departure have intensified. Florentino Pérez has reportedly presented a contract offer until 2028 for the 'Special One's' return to Real Madrid. Mourinho refused to renew with Benfica. Marco Silva (Fulham) is the favourite to succeed the Portuguese at Da Luz!",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.2M",
  },
  {
    id: "t4",
    title: "💣 RASHFORD NO BARCELONA EM DEFINITIVO? Koeman diz que seria 'insanidade' não pagar €30M!",
    title_en: "💣 RASHFORD TO BARCELONA PERMANENTLY? Koeman says it would be 'insane' not to pay €30M!",
    summary: "Marcus Rashford quer ficar no Barcelona após uma época de empréstimo fantástica e a conquista da La Liga. O clube catalão tem uma opção de compra de 30 milhões de euros válida até 15 de junho. Ronald Koeman já avisou que seria uma 'insanidade' o Barça não acionar a cláusula. O Manchester United aguarda a decisão. Rashford marcou na vitória do El Clásico!",
    summary_en: "Marcus Rashford wants to stay at Barcelona after a fantastic loan season and winning La Liga. The Catalan club has a 30 million euro buy option valid until June 15. Ronald Koeman has already warned that it would be 'insane' for Barça not to trigger the clause. Manchester United awaits the decision. Rashford scored in the El Clasico victory!",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "1.9M",
  },
  {
    id: "t5",
    title: "🔥 ARSENAL vs MAN CITY: Corrida pelo título ao rubro! Gunners lideram com 5 pontos!",
    title_en: "🔥 ARSENAL vs MAN CITY: Title race heats up! Gunners lead by 5 points!",
    summary: "A Premier League está a ferver! O Arsenal lidera a tabela com 79 pontos, mais 5 que o Manchester City, mas a equipa de Pep Guardiola tem um jogo a menos. A luta pelo título vai até à última jornada. O City precisa de vencer todos os jogos e esperar um deslize dos Gunners. Tottenham empatou 1-1 com o Leeds e luta contra a descida!",
    summary_en: "The Premier League is boiling! Arsenal leads the table with 79 points, 5 more than Manchester City, but Pep Guardiola's team has a game in hand. The title race will go down to the final day. City needs to win all their games and hope for a Gunners slip-up. Tottenham drew 1-1 with Leeds and are fighting relegation!",
    tag: "HOT",
    source: "@PremierLeague",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.8M",
  },
  {
    id: "t6",
    title: "🏆 FINAL DA CHAMPIONS CONFIRMADA: Arsenal vs PSG a 30 de Maio em Budapeste!",
    title_en: "🏆 CHAMPIONS FINAL CONFIRMED: Arsenal vs PSG on May 30 in Budapest!",
    summary: "Está confirmada a grande final da UEFA Champions League 2025/26! O Arsenal vai defrontar o Paris Saint-Germain (atual detentor do título) no dia 30 de maio no Puskás Aréna, em Budapeste. O PSG eliminou o Bayern Munique, enquanto o Arsenal deixou o Atlético de Madrid pelo caminho. Primeira final europeia do Arsenal desde 2006. Uma final de sonho!",
    summary_en: "The grand final of the 2025/26 UEFA Champions League is confirmed! Arsenal will face Paris Saint-Germain (current title holders) on May 30 at the Puskás Aréna in Budapest. PSG eliminated Bayern Munich, while Arsenal knocked out Atletico Madrid. Arsenal's first European final since 2006. A dream final!",
    tag: "BREAKING",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.5M",
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
