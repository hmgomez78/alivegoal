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

// Notícias curadas — atualizadas 21/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 XABI ALONSO É O NOVO TREINADOR DO CHELSEA! Espanhol assina por 4 anos e exige duas estrelas do Real Madrid!",
    title_en: "🚨 XABI ALONSO IS THE NEW CHELSEA MANAGER! Spaniard signs 4-year deal and demands two Real Madrid stars!",
    summary: "BOMBA EM LONDRES! O Chelsea confirmou Xabi Alonso como o seu novo treinador a partir de 1 de julho de 2026. O técnico espanhol assinou um contrato de quatro anos e terá um orçamento gigantesco de transferências. Segundo Fabrizio Romano, Alonso já exigiu a contratação de duas estrelas do Real Madrid para implementar o seu sistema de três centrais em Stamford Bridge. Uma nova era começa nos Blues!",
    summary_en: "BOMBSHELL IN LONDON! Chelsea have confirmed Xabi Alonso as their new manager starting July 1, 2026. The Spanish coach has signed a four-year contract and will have a gigantic transfer budget. According to Fabrizio Romano, Alonso has already demanded the signing of two Real Madrid stars to implement his back-three system at Stamford Bridge. A new era begins for the Blues!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "92.4M",
  },
  {
    id: "t2",
    title: "🚨 ESCÂNDALO DE APOSTAS ABALA O FUTEBOL! Brendan Sorsby suspenso por envolvimento em apostas ilegais!",
    title_en: "🚨 BETTING SCANDAL ROCKS FOOTBALL! Brendan Sorsby suspended for involvement in illegal gambling!",
    summary: "CHOQUE TOTAL! Um novo escândalo de apostas está a abalar o mundo do futebol. O jogador Brendan Sorsby foi apanhado num esquema de apostas ilegais que pode colocar em risco a sua carreira e a temporada da sua equipa. O atleta, que procurou tratamento para o vício do jogo, avançou com uma providência cautelar contra a suspensão. As autoridades prometem mão pesada neste caso que está a chocar os adeptos.",
    summary_en: "TOTAL SHOCK! A new betting scandal is rocking the football world. Player Brendan Sorsby has been caught in an illegal gambling scheme that could jeopardize his career and his team's season. The athlete, who sought treatment for gambling addiction, has filed for an injunction against the suspension. Authorities promise a heavy hand in this case that is shocking fans.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "65.1M",
  },
  {
    id: "t3",
    title: "💰 TRANSFERÊNCIA BOMBÁSTICA: Casemiro em negociações avançadas com o Inter Miami de Messi!",
    title_en: "💰 BOMBSHELL TRANSFER: Casemiro in advanced talks with Messi's Inter Miami!",
    summary: "O TRIO MS'C' ESTÁ A CHEGAR! O Inter Miami está em negociações muito avançadas para contratar o médio brasileiro Casemiro. O jogador está a ponderar seriamente a mudança para a MLS para se juntar a Lionel Messi, Luis Suárez e Sergio Busquets. As conversas prosseguem a bom ritmo e o anúncio oficial pode estar iminente. A liga norte-americana prepara-se para receber mais uma superestrela mundial!",
    summary_en: "THE MS'C' TRIO IS COMING! Inter Miami are in very advanced talks to sign Brazilian midfielder Casemiro. The player is seriously considering a move to the MLS to join Lionel Messi, Luis Suárez and Sergio Busquets. Conversations are progressing well and an official announcement could be imminent. The North American league is preparing to welcome another global superstar!",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "58.7M",
  },
  {
    id: "t4",
    title: "🔥 ITÁLIA FORA DO MUNDIAL 2026! O pesadelo repete-se para a Squadra Azzurra!",
    title_en: "🔥 ITALY OUT OF THE 2026 WORLD CUP! The nightmare repeats itself for the Squadra Azzurra!",
    summary: "TRAGÉDIA ITALIANA! Os sonhos da Itália de participar no Campeonato do Mundo da FIFA de 2026 chegaram ao fim. Num desfecho dramático e polémico envolvendo decisões da FIFA, a Squadra Azzurra falha mais uma vez a presença na maior competição de seleções do mundo. Os adeptos italianos estão em estado de choque e exigem mudanças profundas na federação. O futebol italiano vive um dos seus momentos mais sombrios.",
    summary_en: "ITALIAN TRAGEDY! Italy's dreams of participating in the 2026 FIFA World Cup are over. In a dramatic and controversial outcome involving FIFA decisions, the Squadra Azzurra once again misses out on the world's biggest national team competition. Italian fans are in a state of shock and demanding profound changes in the federation. Italian football is experiencing one of its darkest moments.",
    tag: "BREAKING",
    source: "@GuardianSport",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "81.2M",
  },
  {
    id: "t5",
    title: "💰 MAN CITY PREPARA OFERTA DE 32 MILHÕES! Mathys Detourbet e Kennet Eichhorn na mira de Guardiola!",
    title_en: "💰 MAN CITY PREPARE £32M BID! Mathys Detourbet and Kennet Eichhorn in Guardiola's sights!",
    summary: "A MÁQUINA NÃO PÁRA! O Manchester City está muito perto de garantir a contratação da dupla Mathys Detourbet e Kennet Eichhorn por cerca de 32 milhões de libras. Pep Guardiola quer reforçar o plantel para a próxima temporada e vê nestes dois jovens talentos o futuro do clube. As negociações estão na fase final e os Citizens esperam fechar o duplo negócio antes da abertura oficial do mercado.",
    summary_en: "THE MACHINE DOESN'T STOP! Manchester City are very close to securing the signing of duo Mathys Detourbet and Kennet Eichhorn for around £32 million. Pep Guardiola wants to strengthen the squad for next season and sees these two young talents as the future of the club. Negotiations are in the final stages and the Citizens hope to close the double deal before the official opening of the market.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "45.9M",
  },
  {
    id: "t6",
    title: "🔥 ASTON VILLA E PRÍNCIPE WILLIAM CELEBRAM! A festa da conquista da Europa League continua!",
    title_en: "🔥 ASTON VILLA AND PRINCE WILLIAM CELEBRATE! The Europa League triumph party continues!",
    summary: "A FESTA NÃO TEM FIM! O Aston Villa continua a celebrar a histórica conquista da Europa League, que pôs fim a uma seca de 30 anos sem troféus. O Príncipe William, adepto ferrenho dos Villans, juntou-se às celebrações da equipa de Unai Emery. O treinador espanhol consolidou o seu estatuto de 'Rei da Europa League' e já promete atacar a Champions League na próxima temporada com a mesma ambição.",
    summary_en: "THE PARTY NEVER ENDS! Aston Villa continue to celebrate their historic Europa League triumph, which ended a 30-year trophy drought. Prince William, a die-hard Villans fan, joined the celebrations of Unai Emery's team. The Spanish manager has consolidated his status as the 'Europa League King' and already promises to attack the Champions League next season with the same ambition.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "21/05/2026",
    engagement: "51.3M",
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
