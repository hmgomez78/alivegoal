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

// Notícias curadas — atualizadas 12/05/2026 (Noite)
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO NA SERIE A! Theo Hernández acusado de organizar 'escort parties' no AC Milan!",
    title_en: "🚨 SERIE A SCANDAL! Theo Hernández accused of organizing 'escort parties' at AC Milan!",
    summary: "BOMBA EM ITÁLIA! Fabrizio Corona revelou detalhes chocantes sobre o 'Calciocaos'. Theo Hernández é apontado como o organizador de festas secretas com acompanhantes de luxo e uso de gás do riso, envolvendo várias estrelas do AC Milan. O escândalo ameaça abalar o clube numa altura em que a equipa luta por um lugar na Champions League!",
    summary_en: "BOMB IN ITALY! Fabrizio Corona revealed shocking details about the 'Calciocaos'. Theo Hernández is named as the organizer of secret parties with luxury escorts and laughing gas, involving several AC Milan stars. The scandal threatens to shake the club at a time when the team is fighting for a Champions League spot!",
    tag: "SCANDAL",
    source: "@FabrizioCorona",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "5.8M",
  },
  {
    id: "t2",
    title: "😱 SPYGATE NO CHAMPIONSHIP! Southampton arrisca expulsão dos Playoffs!",
    title_en: "😱 SPYGATE IN THE CHAMPIONSHIP! Southampton risks expulsion from the Playoffs!",
    summary: "CAOS NO FUTEBOL INGLÊS! O Southampton foi formalmente acusado pela EFL após o Middlesbrough apresentar queixa por espionagem no seu centro de treinos. O clube pediu mais tempo para uma revisão interna, mas arrisca sanções desportivas severas, incluindo a expulsão dos Playoffs de subida à Premier League. A tensão é máxima antes da final!",
    summary_en: "CHAOS IN ENGLISH FOOTBALL! Southampton has been formally charged by the EFL after Middlesbrough complained about spying at their training ground. The club asked for more time for an internal review but risks severe sporting sanctions, including expulsion from the Premier League promotion Playoffs. Tension is at its peak before the final!",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.2M",
  },
  {
    id: "t3",
    title: "🇵🇸 LAMINE YAMAL VIRAL! Jovem do Barcelona exibe bandeira da Palestina no desfile do título!",
    title_en: "🇵🇸 LAMINE YAMAL VIRAL! Barcelona youngster displays Palestinian flag at title parade!",
    summary: "IMAGENS QUE CORREM O MUNDO! Durante o desfile de celebração do título da La Liga do Barcelona, Lamine Yamal, de 18 anos, pegou numa bandeira da Palestina atirada pelos adeptos e exibiu-a no autocarro da equipa. O gesto gerou uma onda massiva de reações nas redes sociais, com muitos a elogiarem a coragem do jovem talento espanhol.",
    summary_en: "IMAGES TRAVELING THE WORLD! During Barcelona's La Liga title celebration parade, 18-year-old Lamine Yamal picked up a Palestinian flag thrown by fans and displayed it on the team bus. The gesture generated a massive wave of reactions on social media, with many praising the courage of the young Spanish talent.",
    tag: "HOT",
    source: "@FCBarcelona",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "6.5M",
  },
  {
    id: "t4",
    title: "🏥 DESASTRE PARA O ARSENAL! Ben White falha final da Champions League contra o PSG!",
    title_en: "🏥 DISASTER FOR ARSENAL! Ben White misses Champions League final against PSG!",
    summary: "GOLPE DURO PARA ARTETA! O Arsenal confirmou que Ben White sofreu uma lesão grave e está fora da final da Champions League contra o PSG, marcada para o final do mês. A ausência do lateral-direito titular é uma dor de cabeça enorme para os Gunners, que procuram o seu primeiro título europeu. O PSG de Luis Enrique ganha vantagem teórica!",
    summary_en: "HEAVY BLOW FOR ARTETA! Arsenal confirmed that Ben White suffered a serious injury and is out of the Champions League final against PSG, scheduled for the end of the month. The absence of the starting right-back is a huge headache for the Gunners, who are seeking their first European title. Luis Enrique's PSG gains a theoretical advantage!",
    tag: "BREAKING",
    source: "@Arsenal",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.9M",
  },
  {
    id: "t5",
    title: "💣 XABI ALONSO NO CHELSEA! Romano confirma: agentes contactados, negociações avançadas!",
    title_en: "💣 XABI ALONSO TO CHELSEA! Romano confirms: agents contacted, talks advanced!",
    summary: "MERCADO A FERVER! Fabrizio Romano confirmou esta manhã que os agentes de Xabi Alonso foram contactados pelo Chelsea. O clube londrino reduziu a lista de treinadores a 5 nomes, com o espanhol no topo. Jamie Carragher afirmou na Sky Sports que seria o 'casamento perfeito'. Alonso está sem clube desde que deixou o Real Madrid e quer a Premier League!",
    summary_en: "TRANSFER MARKET BOILING! Fabrizio Romano confirmed this morning that Xabi Alonso's agents were contacted by Chelsea. The London club has narrowed the managerial shortlist to 5 names, with the Spaniard at the top. Jamie Carragher stated on Sky Sports it would be the 'perfect marriage'. Alonso has been without a club since leaving Real Madrid and wants the Premier League!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.9M",
  },
  {
    id: "t6",
    title: "🔥 EXAUSTÃO TOTAL! Jorge Jesus revela que Cristiano Ronaldo vomitou após o último jogo!",
    title_en: "🔥 TOTAL EXHAUSTION! Jorge Jesus reveals Cristiano Ronaldo threw up after last game!",
    summary: "MÁQUINA NO LIMITE! Antes do grande clássico contra o Al Hilal, Jorge Jesus revelou que Cristiano Ronaldo estava tão fatigado que vomitou após o último jogo do Al Nassr. Aos 41 anos, CR7 continua a dar tudo em campo, mas o esforço físico extremo está a cobrar o seu preço. O Al Nassr precisa de vencer hoje para manter vivas as esperanças de título!",
    summary_en: "MACHINE AT THE LIMIT! Before the big classic against Al Hilal, Jorge Jesus revealed that Cristiano Ronaldo was so fatigued he threw up after Al Nassr's last game. At 41, CR7 continues to give everything on the pitch, but the extreme physical effort is taking its toll. Al Nassr needs to win today to keep their title hopes alive!",
    tag: "HOT",
    source: "@AlNassrFC",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.1M",
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
