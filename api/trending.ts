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

// Notícias curadas — atualizadas 28/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA: Barcelona fecha contratação de Anthony Gordon por €70M!",
    title_en: "🚨 BREAKING: Barcelona complete €70M signing of Anthony Gordon!",
    summary: "O MERCADO ESTÁ AO RUBRO! O Barcelona chegou a acordo com o Newcastle United para a transferência de Anthony Gordon por cerca de 70 milhões de euros. O extremo inglês, que já está em Espanha para realizar exames médicos, era um dos alvos principais do clube catalão. Esta transferência bombástica confirma a capacidade financeira do Barça para o mercado de verão e deixa os adeptos do Newcastle em choque.",
    summary_en: "THE MARKET IS ON FIRE! Barcelona have reached an agreement with Newcastle United for the transfer of Anthony Gordon for around €70 million. The English winger, who is already in Spain for a medical, was one of the Catalan club's main targets. This blockbuster transfer confirms Barça's financial capacity for the summer market and leaves Newcastle fans in shock.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "450.2M",
  },
  {
    id: "t2",
    title: "🔥 O REI VOLTOU! Neymar chega de helicóptero à concentração do Brasil para o Mundial 2026!",
    title_en: "🔥 THE KING IS BACK! Neymar arrives by helicopter at Brazil's camp for the 2026 World Cup!",
    summary: "UMA ENTRADA EM GRANDE ESTILO! Neymar Jr. juntou-se oficialmente à seleção brasileira na Granja Comary, chegando no seu próprio helicóptero. O regresso do camisola 10, agora sob o comando de Carlo Ancelotti, marca um dos momentos mais aguardados antes do Mundial 2026. A presença de Neymar eleva o moral da equipa e as expectativas dos adeptos brasileiros que sonham com o hexa.",
    summary_en: "A GRAND ENTRANCE! Neymar Jr. has officially joined the Brazilian national team at Granja Comary, arriving in his own helicopter. The return of the number 10, now under the command of Carlo Ancelotti, marks one of the most anticipated moments before the 2026 World Cup. Neymar's presence raises the team's morale and the expectations of Brazilian fans dreaming of their sixth title.",
    tag: "HOT",
    source: "@CBF_Futebol",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "385.6M",
  },
  {
    id: "t3",
    title: "🏆 HISTÓRICO! Crystal Palace conquista a Conference League após vencer o Rayo Vallecano!",
    title_en: "🏆 HISTORIC! Crystal Palace win the Conference League after beating Rayo Vallecano!",
    summary: "A GLÓRIA EUROPEIA É DOS EAGLES! O Crystal Palace venceu o Rayo Vallecano por 1-0 na final da UEFA Conference League em Leipzig, conquistando o seu primeiro grande troféu europeu. Um golo oportuno de Jean-Philippe Mateta no início da segunda parte selou a vitória para a equipa inglesa. Uma noite inesquecível para os adeptos do Palace e um marco histórico para o clube.",
    summary_en: "EUROPEAN GLORY BELONGS TO THE EAGLES! Crystal Palace beat Rayo Vallecano 1-0 in the UEFA Conference League final in Leipzig to win their first major European trophy. An opportunistic goal from Jean-Philippe Mateta early in the second half sealed the victory for the English side. An unforgettable night for Palace fans and a historic milestone for the club.",
    tag: "BREAKING",
    source: "@europacnfleague",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "298.4M",
  },
  {
    id: "t4",
    title: "⚠️ ESCÂNDALO NA INGLATERRA! Kyle Walker reage com fúria à convocatória de Tuchel para o Mundial!",
    title_en: "⚠️ SCANDAL IN ENGLAND! Kyle Walker reacts furiously to Tuchel's World Cup squad!",
    summary: "CRISE NA SELEÇÃO INGLESA! A decisão de Thomas Tuchel de deixar de fora vários jogadores de renome, incluindo Kyle Walker, da convocatória para o Mundial 2026 gerou uma enorme polémica. Walker reagiu publicamente com choque e fúria, criticando a escolha do treinador. A tensão aumenta em Inglaterra a poucas semanas do torneio, dividindo adeptos e comentadores sobre as reais hipóteses da equipa.",
    summary_en: "CRISIS IN THE ENGLISH NATIONAL TEAM! Thomas Tuchel's decision to leave out several big-name players, including Kyle Walker, from the 2026 World Cup squad has generated huge controversy. Walker reacted publicly with shock and fury, criticizing the manager's choice. Tension is rising in England just weeks before the tournament, dividing fans and commentators over the team's real chances.",
    tag: "SCANDAL",
    source: "@talkSPORT",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "315.7M",
  },
  {
    id: "t5",
    title: "🚨 SUSPENSÃO PESADA! Joia do Palmeiras punida pela Conmebol após imitar macaco!",
    title_en: "🚨 HEAVY SUSPENSION! Palmeiras gem punished by Conmebol after imitating a monkey!",
    summary: "POLÉMICA NA LIBERTADORES! Eduardo Conceição, avançado de 16 anos do Palmeiras, foi suspenso por 4 meses pela Conmebol. O jovem marcou o golo da vitória contra a Argentina e comemorou imitando um macaco, alegando ter sido um protesto contra insultos racistas que sofreu. A Conmebol interpretou o gesto como discriminação e aplicou uma punição severa, gerando um debate intenso sobre racismo no futebol sul-americano.",
    summary_en: "CONTROVERSY IN THE LIBERTADORES! Eduardo Conceição, Palmeiras' 16-year-old forward, has been suspended for 4 months by Conmebol. The youngster scored the winning goal against Argentina and celebrated by imitating a monkey, claiming it was a protest against racist insults he suffered. Conmebol interpreted the gesture as discrimination and applied a severe punishment, sparking an intense debate about racism in South American football.",
    tag: "SCANDAL",
    source: "@CONMEBOL",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "275.1M",
  },
  {
    id: "t6",
    title: "🚨 ALERTA MESSI! Lesão muscular preocupa a Argentina antes do Mundial 2026!",
    title_en: "🚨 MESSI ALERT! Muscle injury worries Argentina before the 2026 World Cup!",
    summary: "PREOCUPAÇÃO MÁXIMA PARA A ALBICELESTE! Lionel Messi sofreu uma fadiga muscular na coxa esquerda durante um jogo do Inter Miami. O selecionador Lionel Scaloni tentou acalmar os ânimos, afirmando que a lesão não é grave, mas admitiu que o capitão não se juntará à equipa na sua melhor forma física. Com o Mundial à porta, a condição física do melhor jogador do mundo é o assunto do momento na Argentina.",
    summary_en: "MAXIMUM CONCERN FOR LA ALBICELESTE! Lionel Messi suffered muscle fatigue in his left hamstring during an Inter Miami match. Manager Lionel Scaloni tried to calm things down, stating that the injury is not serious, but admitted that the captain will not join the squad fully fit. With the World Cup just around the corner, the physical condition of the best player in the world is the main topic in Argentina.",
    tag: "BREAKING",
    source: "@AFA",
    url: "https://x.com/alivegoal",
    time: "28/05/2026",
    engagement: "410.9M",
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
