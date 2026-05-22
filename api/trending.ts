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

// Notícias curadas — atualizadas 22/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ARSENAL CAMPEÃO DA PREMIER LEAGUE! Fim de um jejum de 22 anos para os Gunners!",
    title_en: "🚨 ARSENAL PREMIER LEAGUE CHAMPIONS! End of a 22-year drought for the Gunners!",
    summary: "HISTÓRICO! O Arsenal conquistou oficialmente o título da Premier League 2025/26, colocando um ponto final num jejum de 22 anos desde a lendária época dos 'Invincibles' em 2003/04. A equipa de Mikel Arteta mostrou uma consistência implacável e uma defesa de ferro para superar o Manchester City. As ruas do norte de Londres estão em festa e os adeptos celebram um momento que muitos esperavam há mais de duas décadas!",
    summary_en: "HISTORIC! Arsenal have officially won the 2025/26 Premier League title, putting an end to a 22-year drought since the legendary 'Invincibles' season in 2003/04. Mikel Arteta's team showed relentless consistency and an ironclad defense to overcome Manchester City. The streets of North London are partying and fans are celebrating a moment many have waited over two decades for!",
    tag: "BREAKING",
    source: "@PremierLeague",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "112.5M",
  },
  {
    id: "t2",
    title: "🚨 MOURINHO DE VOLTA AO REAL MADRID! 'The Special One' assina até 2029!",
    title_en: "🚨 MOURINHO BACK AT REAL MADRID! 'The Special One' signs until 2029!",
    summary: "HERE WE GO! José Mourinho é o novo treinador do Real Madrid! Segundo Fabrizio Romano, o acordo verbal foi alcançado e o técnico português vai assinar um contrato válido por três anos, até junho de 2029. A 'Operação Mourinho' já começou e o treinador já terá exigido contratações de peso para a próxima temporada. O regresso mais aguardado do futebol mundial é agora uma realidade!",
    summary_en: "HERE WE GO! José Mourinho is the new Real Madrid manager! According to Fabrizio Romano, a verbal agreement has been reached and the Portuguese coach will sign a three-year contract until June 2029. 'Operation Mourinho' has already begun and the manager has reportedly demanded major signings for next season. The most anticipated return in world football is now a reality!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "98.2M",
  },
  {
    id: "t3",
    title: "💰 CASEMIRO NO INTER MIAMI! Acordo de 3 anos fechado para se juntar a Messi!",
    title_en: "💰 CASEMIRO TO INTER MIAMI! 3-year deal agreed to join Messi!",
    summary: "BOMBA NA MLS! Casemiro está a caminho do Inter Miami. O médio brasileiro chegou a acordo para um contrato de três anos com a equipa norte-americana, rejeitando ofertas da Europa e da Arábia Saudita. Após a sua última aparição pelo Manchester United, Casemiro prepara-se para se juntar a Lionel Messi, Luis Suárez e Sergio Busquets num projeto ambicioso na Flórida.",
    summary_en: "MLS BOMBSHELL! Casemiro is on his way to Inter Miami. The Brazilian midfielder has agreed to a three-year contract with the North American team, rejecting offers from Europe and Saudi Arabia. After his final appearance for Manchester United, Casemiro is preparing to join Lionel Messi, Luis Suárez and Sergio Busquets in an ambitious project in Florida.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "75.4M",
  },
  {
    id: "t4",
    title: "🔥 ESCÂNDALO SPYGATE: Southampton expulso dos play-offs e dedução de pontos!",
    title_en: "🔥 SPYGATE SCANDAL: Southampton expelled from play-offs and points deduction!",
    summary: "CHOQUE NO CHAMPIONSHIP! O Southampton foi oficialmente expulso da final dos play-offs do Championship após ser considerado culpado no escândalo 'Spygate'. O clube admitiu ter espiado os treinos do Middlesbrough, Oxford United e Ipswich Town. Além da expulsão, que recoloca o Middlesbrough na final, os Saints sofreram uma dedução de quatro pontos para o início da próxima temporada. O recurso do clube foi rejeitado!",
    summary_en: "CHAMPIONSHIP SHOCK! Southampton have been officially expelled from the Championship play-off final after being found guilty in the 'Spygate' scandal. The club admitted to spying on Middlesbrough, Oxford United and Ipswich Town training sessions. In addition to the expulsion, which reinstates Middlesbrough in the final, the Saints suffered a four-point deduction for the start of next season. The club's appeal was dismissed!",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "88.1M",
  },
  {
    id: "t5",
    title: "🚨 CHOQUE NA SELEÇÃO INGLESA! Tuchel deixa Maguire, Foden e Palmer de fora do Mundial!",
    title_en: "🚨 SHOCK IN THE ENGLAND SQUAD! Tuchel leaves Maguire, Foden and Palmer out of the World Cup!",
    summary: "TERRAMOTO EM INGLATERRA! Thomas Tuchel anunciou a convocatória para o Mundial 2026 com ausências de peso. Harry Maguire, Phil Foden, Cole Palmer e Trent Alexander-Arnold ficaram de fora da lista final de 26 jogadores. Maguire confessou estar 'chocado e destroçado'. Em contrapartida, Ivan Toney foi chamado, juntamente com surpresas como Jarell Quansah e Eberechi Eze. Uma revolução total na equipa dos Três Leões!",
    summary_en: "EARTHQUAKE IN ENGLAND! Thomas Tuchel has announced the squad for the 2026 World Cup with major absences. Harry Maguire, Phil Foden, Cole Palmer and Trent Alexander-Arnold have been left out of the final 26-man list. Maguire confessed to being 'shocked and gutted'. On the other hand, Ivan Toney was called up, along with surprises like Jarell Quansah and Eberechi Eze. A total revolution in the Three Lions team!",
    tag: "BREAKING",
    source: "@talkSPORT",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "105.3M",
  },
  {
    id: "t6",
    title: "💰 MAN UNITED FECHA ACORDO DE 74 MILHÕES! Nova estrela a caminho de Old Trafford!",
    title_en: "💰 MAN UNITED AGREE £74M DEAL! New star on the way to Old Trafford!",
    summary: "MERCADO A MEXER! O Manchester United chegou a um acordo de 74 milhões de libras para a contratação de um novo reforço de peso. A direção dos Red Devils, agora sob nova gestão desportiva, está a agir rápido no mercado para reconstruir o plantel. Além disso, o clube está em negociações avançadas com a Atalanta por um médio brasileiro de 35 milhões de libras. O verão promete ser agitado em Manchester!",
    summary_en: "MARKET MOVING! Manchester United have reached a £74 million agreement for the signing of a major new reinforcement. The Red Devils' board, now under new sporting management, is acting fast in the market to rebuild the squad. In addition, the club is in advanced talks with Atalanta for a £35 million Brazilian midfielder. The summer promises to be busy in Manchester!",
    tag: "TRANSFER",
    source: "@GiveMeSport",
    url: "https://x.com/alivegoal",
    time: "22/05/2026",
    engagement: "62.8M",
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
