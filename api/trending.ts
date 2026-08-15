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

// Conteúdo editorial verificado e atualizado em 15/08/2026.
// Desenvolvimentos de mercado sem comunicado oficial são identificados como negociações ou operações próximas.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Liverpool confirma venda de 30% a consórcio com Bezos",
    title_en: "BREAKING: Liverpool confirm sale of 30% stake to consortium including Bezos",
    summary: "O Fenway Sports Group confirmou a venda de uma participação de 30% do Liverpool a um consórcio que inclui Amit Bhatia, Jeff Bezos e Eduardo Saverin. Segundo o The Guardian, o negócio é avaliado em £1,65 mil milhões, valoriza o clube em cerca de £5,5 mil milhões e coloca Bhatia como novo vice-presidente num conselho alargado. É uma mudança de propriedade com impacto direto na governação e na capacidade estratégica do clube.",
    summary_en: "Fenway Sports Group have confirmed the sale of a 30% Liverpool stake to a consortium including Amit Bhatia, Jeff Bezos and Eduardo Saverin. According to The Guardian, the £1.65bn deal values the club at about £5.5bn and makes Bhatia a new vice-chair on an expanded board. It is an ownership shift with direct implications for Liverpool's governance and strategic capacity.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/14/liverpool-fc-ownership-stake-sale-jeff-bezos-consortium",
    time: "15/08/2026",
    engagement: "~128,4M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: City falha prazo de Enzo Fernández e negócio arrefece",
    title_en: "TRANSFER: City miss Enzo Fernández deadline as deal cools",
    summary: "A possível mudança de Enzo Fernández para o Manchester City perdeu força depois de o clube não cumprir o prazo reportado pelo Chelsea. BBC Sport, Sky Sports e The Guardian enquadram o episódio como um dossiê negocial travado, e não como transferência concluída. Sem anúncio oficial, o ponto decisivo é que a janela de decisão apertou e a situação continua em aberto.",
    summary_en: "Enzo Fernández's potential move to Manchester City has lost momentum after the club failed to meet the deadline reportedly set by Chelsea. BBC Sport, Sky Sports and The Guardian frame the episode as a stalled negotiation rather than a completed transfer. With no official announcement, the key point is that the decision window has tightened and the situation remains open.",
    tag: "TRANSFER",
    source: "BBC Sport / Sky Sports / The Guardian",
    url: "https://www.bbc.com/sport/football/videos/c1w1ygj925jo",
    time: "15/08/2026",
    engagement: "~112,7M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Arsenal em conversações por Jarell Quansah num negócio de €50M",
    title_en: "TRANSFER: Arsenal in talks for Jarell Quansah in €50m move",
    summary: "O Arsenal está em conversações com o Bayer Leverkusen por Jarell Quansah, numa operação reportada perto dos €50 milhões. O The Guardian descreve os Gunners como esperançosos de fechar o defesa inglês, mas não existe confirmação de acordo entre os clubes. A dimensão da avaliação torna esta uma das negociações defensivas mais relevantes do arranque da janela.",
    summary_en: "Arsenal are in talks with Bayer Leverkusen over Jarell Quansah in a reported deal worth about €50m. The Guardian says the Gunners are hopeful of signing the England defender, but there is no confirmation of an agreement between the clubs. The valuation makes it one of the window's most significant defensive negotiations.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/live/2026/aug/14/championship-kicks-off-fifa-latest-and-community-shield-buildup-football-live",
    time: "15/08/2026",
    engagement: "~96,1M estimado",
  },
  {
    id: "t4",
    title: "HOT: Raúl Jiménez salva Wolves aos 90+3 no regresso à liga",
    title_en: "HOT: Raúl Jiménez rescues Wolves at 90+3 on league return",
    summary: "Raúl Jiménez entrou no segundo tempo e marcou de penálti aos 90+3 para garantir o 2-2 do Wolves frente ao Blackburn na abertura do Championship. A ESPN relata que o mexicano regressou ao primeiro jogo de liga do clube em três anos após transferência livre do Fulham. O empate evita uma derrota inaugural e coloca o avançado no centro imediato do novo projeto de César Peixoto.",
    summary_en: "Raúl Jiménez came on in the second half and scored a 90+3 penalty to secure Wolves' 2-2 draw with Blackburn in the Championship opener. ESPN reports that the Mexico forward was making his first league appearance for the club in three years after joining on a free transfer from Fulham. The draw avoids an opening defeat and puts him straight at the heart of César Peixoto's new project.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49612383/raul-jimenez-goal-wolves-blackburn-championship",
    time: "15/08/2026",
    engagement: "~83,9M estimado",
  },
  {
    id: "t5",
    title: "SCANDAL: Crise de confiança na FIFA aumenta pressão sobre Infantino",
    title_en: "SCANDAL: FIFA confidence crisis raises pressure on Infantino",
    summary: "A tensão institucional em torno de Gianni Infantino intensificou-se: ESPN e The Guardian relatam que várias confederações e federações retiraram apoio à sua reeleição após o plano abandonado de vender uma participação comercial nos torneios da FIFA. Andrew Giuliani respondeu publicamente, classificando os críticos como movidos por inveja. O confronto já ultrapassou o debate desportivo e expõe uma disputa de poder na governação global do futebol.",
    summary_en: "Institutional tension around Gianni Infantino has intensified: ESPN and The Guardian report that several confederations and federations have withdrawn support for his re-election following the abandoned plan to sell a commercial stake in FIFA competitions. Andrew Giuliani publicly responded by calling critics jealous. The clash has moved beyond a sporting debate and exposes a power struggle in global football governance.",
    tag: "SCANDAL",
    source: "ESPN / The Guardian",
    url: "https://www.espn.com/soccer/story/_/id/49610097/andrew-giuliani-backs-fifa-gianni-infantino-calls-critics-jealous",
    time: "15/08/2026",
    engagement: "~104,6M estimado",
  },
  {
    id: "t6",
    title: "TRANSFER: Djed Spence chega a Itália e saída do Tottenham aproxima-se",
    title_en: "TRANSFER: Djed Spence lands in Italy as Tottenham exit nears",
    summary: "Djed Spence chegou a Itália com uma saída do Tottenham cada vez mais próxima, segundo a atualização de mercado do The Guardian. O desenvolvimento sinaliza uma fase avançada da operação, mas não substitui o comunicado oficial dos clubes. Para os Spurs, a provável saída do lateral abre espaço na reorganização do plantel e mantém o foco no equilíbrio do corredor direito.",
    summary_en: "Djed Spence has landed in Italy with a Tottenham exit appearing increasingly close, according to The Guardian's transfer update. The development points to an advanced stage of the operation, but it does not replace an official club announcement. For Spurs, the likely departure opens room in the squad rebuild and keeps the focus on balance down the right flank.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/live/2026/aug/14/championship-kicks-off-fifa-latest-and-community-shield-buildup-football-live",
    time: "15/08/2026",
    engagement: "~72,8M estimado",
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return res.status(200).json({
    source: "curated",
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
