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

// Notícias curadas — atualizadas 25/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 MOURINHO DE VOLTA AO REAL MADRID EM RISCO! Eleições presidenciais travam anúncio histórico!",
    title_en: "🚨 MOURINHO'S REAL MADRID RETURN AT RISK! Presidential elections delay historic announcement!",
    summary: "DRAMA TOTAL EM MADRID! O regresso de José Mourinho ao Real Madrid, que estava previsto para ser anunciado esta segunda-feira, foi subitamente travado pelas eleições presidenciais do clube. Florentino Pérez, o grande impulsionador do acordo, enfrenta agora a candidatura de Enrique Riquelme. O problema: a cláusula de rescisão de Mourinho no Benfica, avaliada em €6 milhões, expira precisamente hoje. Se não for ativada antes de amanhã, o Real Madrid terá de pagar muito mais. O 'Special One' pode ficar sem o regresso mais aguardado da história do futebol espanhol!",
    summary_en: "TOTAL DRAMA IN MADRID! José Mourinho's return to Real Madrid, which was set to be announced this Monday, has been suddenly halted by the club's presidential elections. Florentino Pérez, the main driver of the deal, now faces the candidacy of Enrique Riquelme. The problem: Mourinho's release clause at Benfica, valued at €6 million, expires precisely today. If not activated before tomorrow, Real Madrid will have to pay much more. The 'Special One' may miss out on the most anticipated return in Spanish football history!",
    tag: "BREAKING",
    source: "@football-espana",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "187.4M",
  },
  {
    id: "t2",
    title: "🏆 ARSENAL CAMPEÃO! 22 ANOS DE ESPERA TERMINARAM — Arteta entra para a história!",
    title_en: "🏆 ARSENAL CHAMPIONS! 22 YEARS OF WAIT ARE OVER — Arteta enters the history books!",
    summary: "OS GUNNERS REINAM EM INGLATERRA! O Arsenal sagrou-se campeão da Premier League 2025/26, pondo fim a uma espera de 22 anos que torturou gerações de adeptos. Mikel Arteta, o treinador catalão que transformou o clube, é agora uma lenda de Highbury e do Emirates. A equipa terminou a época invicta em casa e com uma diferença de golos histórica. Bukayo Saka, Martin Ødegaard e Leandro Trossard foram os grandes heróis de uma temporada épica. Os adeptos invadiram as ruas de Londres numa festa que durou a noite toda!",
    summary_en: "THE GUNNERS REIGN IN ENGLAND! Arsenal have been crowned Premier League champions 2025/26, ending a 22-year wait that tortured generations of fans. Mikel Arteta, the Catalan manager who transformed the club, is now a legend of Highbury and the Emirates. The team finished the season unbeaten at home with a historic goal difference. Bukayo Saka, Martin Ødegaard and Leandro Trossard were the great heroes of an epic season. Fans flooded the streets of London in a celebration that lasted all night!",
    tag: "HOT",
    source: "@Arsenal",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "245.8M",
  },
  {
    id: "t3",
    title: "💰 NICO PAZ DE VOLTA AO REAL MADRID: Cláusula de €9M ativada — O prodígio regressa ao Bernabéu!",
    title_en: "💰 NICO PAZ BACK TO REAL MADRID: €9M clause activated — The prodigy returns to the Bernabeu!",
    summary: "HERE WE GO! O Real Madrid vai acionar a cláusula de recompra de Nico Paz junto do Como por apenas €9 milhões, numa das melhores negociações da história do futebol. O jovem espanhol, de apenas 20 anos, fez uma época sensacional em Itália com 13 golos e 8 assistências, tornando-se um dos jogadores mais cobiçados da Europa. Sob o comando do novo técnico (seja Mourinho ou outro), Nico Paz vai competir com Bellingham, Güler e Brahim Díaz por um lugar no onze. Uma contratação de luxo por um preço de saldo!",
    summary_en: "HERE WE GO! Real Madrid will activate Nico Paz's buy-back clause from Como for just €9 million, in one of the best deals in football history. The young Spaniard, just 20 years old, had a sensational season in Italy with 13 goals and 8 assists, becoming one of the most coveted players in Europe. Under the new manager (whether Mourinho or another), Nico Paz will compete with Bellingham, Güler and Brahim Díaz for a starting spot. A luxury signing at a bargain price!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "134.6M",
  },
  {
    id: "t4",
    title: "🔥 HULL CITY NA PREMIER LEAGUE! Promoção histórica após escândalo do Southampton!",
    title_en: "🔥 HULL CITY IN THE PREMIER LEAGUE! Historic promotion after Southampton scandal!",
    summary: "OS TIGERS RUGEM! O Hull City conquistou a promoção à Premier League ao derrotar o Middlesbrough por 1-0 em Wembley, com um golo de Oliver McBurnie nos descontos. A promoção é ainda mais dramática porque o clube só disputou esta final devido ao escândalo de espionagem do Southampton, que foi expulso dos play-offs. O dono turco Acun Ilıcalı, que tinha ameaçado processar a EFL, celebrou em lágrimas no relvado. O Hull City regressa à Premier League pela primeira vez em 9 anos!",
    summary_en: "THE TIGERS ROAR! Hull City secured promotion to the Premier League by defeating Middlesbrough 1-0 at Wembley, with Oliver McBurnie's stoppage-time goal. The promotion is even more dramatic because the club only played this final due to Southampton's spying scandal, which saw them expelled from the play-offs. Turkish owner Acun Ilıcalı, who had threatened to sue the EFL, celebrated in tears on the pitch. Hull City return to the Premier League for the first time in 9 years!",
    tag: "SCANDAL",
    source: "@HullCity",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "112.3M",
  },
  {
    id: "t5",
    title: "💰 ELLIOT ANDERSON AO MANCHESTER CITY: €120M em negociação — Guardiola deixa bomba de despedida!",
    title_en: "💰 ELLIOT ANDERSON TO MANCHESTER CITY: €120M in negotiation — Guardiola leaves farewell bomb!",
    summary: "BOMBA DE MERCADO! O Manchester City está em negociações avançadas para contratar Elliot Anderson do Nottingham Forest por um valor que pode atingir os €120 milhões. O médio inglês, de 22 anos, é considerado o futuro da seleção inglesa e o City quer garantir a sua assinatura antes do Mundial 2026. O Forest resiste e exige o valor máximo, mas os Citizens estão dispostos a pagar. Será este o legado de despedida de Pep Guardiola ao clube? A negociação pode ser concluída esta semana!",
    summary_en: "TRANSFER BOMB! Manchester City are in advanced negotiations to sign Elliot Anderson from Nottingham Forest for a fee that could reach €120 million. The English midfielder, 22, is considered the future of the England national team and City want to secure his signature before the 2026 World Cup. Forest are resisting and demanding the maximum fee, but the Citizens are willing to pay. Will this be Pep Guardiola's farewell legacy to the club? The negotiation could be completed this week!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "98.7M",
  },
  {
    id: "t6",
    title: "🚨 SPORTING DIRETO À CHAMPIONS! Torreense na Liga Europa — Famalicão fica de fora!",
    title_en: "🚨 SPORTING DIRECT TO CHAMPIONS LEAGUE! Torreense in Europa League — Famalicão misses out!",
    summary: "REVOLUÇÃO NO FUTEBOL PORTUGUÊS! A conquista histórica da Taça de Portugal pelo SCU Torreense reconfigura completamente a participação portuguesa nas competições europeias. O Sporting CP entra diretamente na fase de liga da Champions League. O Torreense, clube histórico mas de divisões inferiores, vai disputar a fase de qualificação da Liga Europa numa das maiores surpresas da história do futebol nacional. O Famalicão, que contava com uma vaga europeia, fica de fora. Uma noite histórica para o futebol português!",
    summary_en: "REVOLUTION IN PORTUGUESE FOOTBALL! SCU Torreense's historic Portuguese Cup conquest completely reconfigures Portugal's participation in European competitions. Sporting CP enter directly into the Champions League league phase. Torreense, a historic club from lower divisions, will compete in the Europa League qualifying rounds in one of the biggest surprises in national football history. Famalicão, who were counting on a European spot, miss out. A historic night for Portuguese football!",
    tag: "BREAKING",
    source: "@SportingCP",
    url: "https://x.com/alivegoal",
    time: "25/05/2026",
    engagement: "76.2M",
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
