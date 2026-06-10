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

// Notícias curadas — atualizadas 10/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Mourinho deixa Benfica rumo ao Real Madrid por 15M€!",
    title_en: "🚨 BREAKING: Mourinho leaves Benfica for Real Madrid for €15M!",
    summary: "BOMBA NO FUTEBOL EUROPEU! O Benfica oficializou a saída de José Mourinho para o Real Madrid a troco de 15 milhões de euros. O treinador português deixa a Luz após uma época e assina pelos merengues, que preparam uma revolução no plantel. Marco Silva foi imediatamente anunciado como sucessor no Benfica até 2028.",
    summary_en: "BOMBSHELL IN EUROPEAN FOOTBALL! Benfica has officially announced the departure of José Mourinho to Real Madrid for 15 million euros. The Portuguese coach leaves Luz after one season and signs for the Merengues, who are preparing a squad revolution. Marco Silva was immediately announced as the successor at Benfica until 2028.",
    tag: "BREAKING",
    source: "@Publico",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "15.4M",
  },
  {
    id: "t2",
    title: "😱 SCANDAL: Árbitro somali barrado nos EUA a dias do Mundial 2026!",
    title_en: "😱 SCANDAL: Somali referee denied US entry days before 2026 World Cup!",
    summary: "CAOS E POLÉMICA! Omar Artan, o primeiro árbitro somali selecionado para um Mundial, viu o seu visto negado pelas autoridades de imigração dos EUA por 'preocupações de segurança'. A FIFA está sob fogo intenso, com figuras como Ian Wright a chamarem ao torneio o 'Mundial do Caos'. O escândalo mancha o arranque da competição na América do Norte.",
    summary_en: "CHAOS AND CONTROVERSY! Omar Artan, the first Somali referee selected for a World Cup, had his visa denied by US immigration authorities due to 'vetting concerns'. FIFA is under heavy fire, with figures like Ian Wright calling the tournament the 'World Cup of Chaos'. The scandal taints the start of the competition in North America.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "12.1M",
  },
  {
    id: "t3",
    title: "💥 TRANSFER: Atlético rejeita 150M€ do Real Madrid por Julián Álvarez!",
    title_en: "💥 TRANSFER: Atletico rejects €150M from Real Madrid for Julian Alvarez!",
    summary: "GUERRA EM MADRID! O Atlético de Madrid recusou uma proposta estratosférica de 150 milhões de euros do rival Real Madrid pelo avançado argentino Julián Álvarez. Os colchoneros exigem o pagamento integral da cláusula de rescisão, fixada em 500 milhões de euros. Com Mourinho ao leme, Florentino Pérez promete não desistir do craque.",
    summary_en: "WAR IN MADRID! Atletico Madrid has rejected a stratospheric €150 million offer from rival Real Madrid for Argentine striker Julian Alvarez. The Colchoneros demand full payment of the release clause, set at €500 million. With Mourinho at the helm, Florentino Perez promises not to give up on the star.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "18.7M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Messi com lesão na coxa esquerda gera pânico na Argentina!",
    title_en: "🔥 HOT: Messi's left thigh injury causes panic in Argentina!",
    summary: "ALARME NA ALBICELESTE! Lionel Messi foi diagnosticado com fadiga muscular e sobrecarga no tendão da coxa esquerda após o último jogo pelo Inter Miami. A poucos dias da estreia da Argentina no Mundial 2026, a presença do capitão está em risco. O departamento médico tenta recuperá-lo a tempo do primeiro jogo do grupo.",
    summary_en: "ALARM IN THE ALBICELESTE! Lionel Messi has been diagnosed with muscle fatigue and overload in his left hamstring after his last game for Inter Miami. Just days before Argentina's debut in the 2026 World Cup, the captain's presence is at risk. The medical staff is trying to recover him in time for the first group match.",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "22.3M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Platini avança com processo criminal contra Gianni Infantino!",
    title_en: "🚨 BREAKING: Platini files criminal lawsuit against Gianni Infantino!",
    summary: "TERREMOTO NA FIFA! Michel Platini, ex-presidente da UEFA, instaurou processos civis e criminais em França contra o presidente da FIFA, Gianni Infantino, acusando-o de tráfico de influências e falsas acusações. A bomba rebenta a escassas horas do apito inicial do Mundial 2026, ameaçando a estabilidade do órgão máximo do futebol.",
    summary_en: "EARTHQUAKE AT FIFA! Michel Platini, former UEFA president, has filed civil and criminal lawsuits in France against FIFA president Gianni Infantino, accusing him of influence peddling and false accusations. The bombshell drops just hours before the 2026 World Cup kickoff, threatening the stability of football's governing body.",
    tag: "BREAKING",
    source: "@YahooSports",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "10.5M",
  },
  {
    id: "t6",
    title: "💥 TRANSFER: Man Utd e Man City em guerra por Elliot Anderson!",
    title_en: "💥 TRANSFER: Man Utd and Man City at war over Elliot Anderson!",
    summary: "DÉRBI NO MERCADO! Manchester United e Manchester City estão numa autêntica guerra de licitações pelo médio inglês Elliot Anderson. Os responsáveis do United mostram-se confiantes em bater os rivais e garantir a contratação da jovem estrela neste mercado de verão, numa operação que pode quebrar recordes internos no clube de Old Trafford.",
    summary_en: "DERBY IN THE MARKET! Manchester United and Manchester City are in a bidding war for English midfielder Elliot Anderson. United officials are confident of beating their rivals and securing the signing of the young star in this summer market, in an operation that could break internal records at the Old Trafford club.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "10/06/2026",
    engagement: "9.2M",
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
