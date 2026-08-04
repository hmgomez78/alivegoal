import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface TrendingNews {
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

// Conteúdo editorial verificado e atualizado em 04/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Revolta na FIFA trava plano financeiro de Gianni Infantino",
    title_en: "SCANDAL: FIFA revolt halts Gianni Infantino's financial plan",
    summary: "O presidente da FIFA, Gianni Infantino, abandonou o polémico plano de vender participações nos lucros do Mundial a investidores privados após forte contestação interna. Reportagens indicam a demissão do conselheiro sénior Carlos Cordeiro e acusações de ocultação de informação por parte da estrutura executiva.",
    summary_en: "FIFA president Gianni Infantino has abandoned a controversial plan to sell stakes in World Cup profits to private investors following intense internal backlash. Reports indicate the resignation of senior adviser Carlos Cordeiro and accusations of concealed information by the executive structure.",
    tag: "SCANDAL",
    source: "Forbes / Yahoo Sports",
    url: "https://sports.yahoo.com/articles/fifa-infantino-scrambles-save-job-171149962.html",
    time: "04/08/2026",
    engagement: "~34.1M",
  },
  {
    id: "t2",
    title: "BREAKING: Mercado da Premier League já ultrapassou a marca de £1 mil milhões",
    title_en: "BREAKING: Premier League market surpasses £1 billion mark",
    summary: "A janela de transferências do verão de 2026 na Premier League já registou mais de 1.000 milhões de libras em gastos. Chelsea e Manchester City lideram as operações de mercado com as aquisições milionárias de Morgan Rogers (£117M) e Elliot Anderson (£116M), quebrando recordes britânicos.",
    summary_en: "The 2026 summer transfer window in the Premier League has already seen over £1 billion in spending. Chelsea and Manchester City lead the market operations with the blockbuster acquisitions of Morgan Rogers (£117M) and Elliot Anderson (£116M), breaking British records.",
    tag: "BREAKING",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c87nxvyq4yqo",
    time: "04/08/2026",
    engagement: "~28.5M",
  },
  {
    id: "t3",
    title: "TRANSFER: Lewandowski assina pelo Chicago Fire após deixar o Barcelona",
    title_en: "TRANSFER: Lewandowski signs for Chicago Fire after leaving Barcelona",
    summary: "Robert Lewandowski é o novo reforço do Chicago Fire da MLS. O avançado internacional polaco assinou um contrato de dois anos a custo zero após terminar a sua ligação ao Barcelona, recusando ofertas do mercado europeu e saudita.",
    summary_en: "Robert Lewandowski is the new signing for MLS side Chicago Fire. The Polish international forward signed a two-year contract on a free transfer after his deal with Barcelona expired, rejecting offers from the European and Saudi markets.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c87nxvyq4yqo",
    time: "04/08/2026",
    engagement: "~25.2M",
  },
  {
    id: "t4",
    title: "HOT: Arsenal monitoriza Vinícius Júnior, mas salário trava investida",
    title_en: "HOT: Arsenal monitoring Vinícius Júnior, but wages halt move",
    summary: "O Arsenal mantém-se atento à situação contratual de Vinícius Júnior no Real Madrid, mas especialistas da Sky Sports indicam que as exigências salariais do internacional brasileiro obrigariam os Gunners a destruir a sua atual estrutura de pagamentos.",
    summary_en: "Arsenal remain attentive to Vinícius Júnior's contract situation at Real Madrid, but Sky Sports experts indicate that the Brazilian international's wage demands would force the Gunners to smash their current wage structure.",
    tag: "HOT",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/video/33744/13569520/transfer-latest-can-arsenal-afford-vinicius-juniors-wages-they-have-to-smash-their-wage-structure",
    time: "04/08/2026",
    engagement: "~21.9M",
  },
  {
    id: "t5",
    title: "BREAKING: Mauricio Pochettino renova com os Estados Unidos até 2030",
    title_en: "BREAKING: Mauricio Pochettino renews with United States until 2030",
    summary: "A U.S. Soccer confirmou a renovação de contrato do selecionador Mauricio Pochettino até ao Campeonato do Mundo de 2030. Apesar da eliminação frente à Bélgica no Mundial de 2026, a federação norte-americana decidiu manter a confiança na equipa técnica do argentino.",
    summary_en: "U.S. Soccer has confirmed the contract renewal of head coach Mauricio Pochettino until the 2030 World Cup. Despite the elimination against Belgium in the 2026 World Cup, the American federation decided to maintain trust in the Argentine's coaching staff.",
    tag: "BREAKING",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49519633/mauricio-pochettino-signs-deal-remain-usmnt-manager",
    time: "04/08/2026",
    engagement: "~16.4M",
  },
  {
    id: "t6",
    title: "TRANSFER: Bay FC assegura Jenna Nighswonger junto do Arsenal",
    title_en: "TRANSFER: Bay FC secures Jenna Nighswonger from Arsenal",
    summary: "O Bay FC da NWSL chegou a acordo para a contratação da lateral internacional norte-americana Jenna Nighswonger, proveniente do Arsenal. O negócio ronda os 200 mil dólares e marca o regresso da campeã olímpica ao campeonato dos Estados Unidos.",
    summary_en: "NWSL side Bay FC has agreed to sign USWNT full-back Jenna Nighswonger from Arsenal. The deal is worth around $200,000 and marks the Olympic champion's return to the United States league.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49522805/bay-fc-agree-sign-uswnt-winger-jenna-nighswonger-arsenal-sources",
    time: "04/08/2026",
    engagement: "~14.8M",
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
