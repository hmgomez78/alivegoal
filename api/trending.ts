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

// Notícias curadas — atualizadas 15/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO! Southampton apanhado a espiar treinos do Middlesbrough — Final do Championship pode ser CANCELADA!",
    title_en: "🚨 SCANDAL! Southampton caught spying on Middlesbrough training — Championship Final could be CANCELLED!",
    summary: "SPYGATE 2.0! Um analista do Southampton, William Salt, foi fotografado escondido nos arbustos junto ao centro de treinos do Middlesbrough com equipamento de vigilância profissional, apenas 48 horas antes do jogo das meias-finais dos play-offs. A EFL abriu um processo disciplinar independente e a final de Wembley, marcada para 23 de maio, pode ser adiada ou o Southampton pode ser EXPULSO da competição. O escândalo mais chocante do futebol inglês em décadas!",
    summary_en: "SPYGATE 2.0! A Southampton analyst, William Salt, was photographed hiding in bushes near Middlesbrough's training ground with professional surveillance equipment, just 48 hours before the play-off semi-final. The EFL has opened an independent disciplinary hearing and the Wembley final, scheduled for May 23, could be postponed or Southampton could be EXPELLED from the competition. The most shocking scandal in English football in decades!",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "14.2M",
  },
  {
    id: "t2",
    title: "💥 CAOS NO BERNABÉU! Florentino Pérez discute com adeptos e Mbappé é VAIADO — 'Florentino demite-se!' gritam as bancadas!",
    title_en: "💥 CHAOS AT THE BERNABEU! Florentino Pérez argues with fans and Mbappé is BOOED — 'Florentino resign!' chant the stands!",
    summary: "MOTIM NO REAL MADRID! Na vitória por 2-0 sobre o já despromovido Real Oviedo, Kylian Mbappé e Vinicius Júnior foram sistematicamente vaiados pelos próprios adeptos do Bernabéu. Florentino Pérez foi filmado a discutir com adeptos nas bancadas e seguranças confiscaram uma faixa com a mensagem 'Florentino é o culpado'. O presidente reagiu furioso numa conferência de imprensa, alegando ser vítima de uma 'campanha organizada'. A crise no Real Madrid é total!",
    summary_en: "MUTINY AT REAL MADRID! In a 2-0 win over already-relegated Real Oviedo, Kylian Mbappé and Vinicius Junior were systematically booed by their own Bernabeu fans. Florentino Pérez was filmed arguing with fans in the stands and security confiscated a banner reading 'Florentino is to blame'. The president reacted furiously at a press conference, claiming to be the victim of an 'organised campaign'. The crisis at Real Madrid is total!",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "16.8M",
  },
  {
    id: "t3",
    title: "🔥 ACORDO IMINENTE! Xabi Alonso a dias de assinar pelo Chelsea — exige garantias sobre contratações milionárias!",
    title_en: "🔥 IMMINENT DEAL! Xabi Alonso days away from signing for Chelsea — demands guarantees over multi-million signings!",
    summary: "REVOLUÇÃO NO CHELSEA! O ex-treinador do Real Madrid, Xabi Alonso, está em negociações avançadas com o Chelsea para se tornar o novo treinador principal. Segundo o The Times, estão a ser feitos 'progressos positivos', mas o espanhol exige garantias sobre o controlo do mercado de transferências e a política de contratações. O Chelsea prepara-se para investir £160 milhões em quatro reforços de topo para a próxima temporada. Acordo de 3 anos praticamente fechado!",
    summary_en: "CHELSEA REVOLUTION! Former Real Madrid manager Xabi Alonso is in advanced negotiations with Chelsea to become their new head coach. According to The Times, 'positive progress' is being made, but the Spaniard is demanding guarantees over transfer market control and signing policy. Chelsea is preparing to invest £160 million in four top signings for next season. Three-year deal practically sealed!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "12.5M",
  },
  {
    id: "t4",
    title: "💣 GUERRA DE GIGANTES! Manchester United e Arsenal disputam Viktor Gyökeres — Sporting exige €80M e Amorim insiste!",
    title_en: "💣 GIANTS AT WAR! Manchester United and Arsenal battle for Viktor Gyökeres — Sporting demands €80M and Amorim insists!",
    summary: "MERCADO EM EBULIÇÃO! Ruben Amorim está a pressionar o conselho do Manchester United para fechar a contratação de Viktor Gyökeres do Sporting CP por €80 milhões. O avançado sueco marcou 80 golos em 7 épocas e é o alvo número 1 de Amorim para o ataque. Mas o Arsenal entrou na corrida e está a monitorizar de perto a situação. O Sporting mantém-se firme no preço e recusa negociar abaixo do valor da cláusula. Quem vai ganhar esta batalha de gigantes?",
    summary_en: "MARKET BOILING! Ruben Amorim is pressuring the Manchester United board to close the signing of Viktor Gyökeres from Sporting CP for €80 million. The Swedish striker scored 80 goals in 7 seasons and is Amorim's number one target for attack. But Arsenal have entered the race and are closely monitoring the situation. Sporting stands firm on the price and refuses to negotiate below the release clause. Who will win this battle of giants?",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "11.3M",
  },
  {
    id: "t5",
    title: "🌟 BOMBA DE TRANSFERÊNCIA! Barcelona quer João Pedro do Chelsea para substituir Lewandowski — negócio financeiramente viável!",
    title_en: "🌟 TRANSFER BOMBSHELL! Barcelona want João Pedro from Chelsea to replace Lewandowski — deal financially viable!",
    summary: "OPERAÇÃO JOÃO PEDRO! O Barcelona identificou o avançado brasileiro João Pedro, do Chelsea, como o substituto ideal para Robert Lewandowski. Segundo fontes próximas do clube catalão, a transferência é vista como 'financeiramente viável' e os esforços do Barça concentram-se agora em garantir esta contratação. O Chelsea, que pagou £30M pelo jogador, pode agora lucrar significativamente. O jogador de 23 anos tem sido uma das revelações da Premier League esta temporada!",
    summary_en: "OPERATION JOÃO PEDRO! Barcelona has identified Brazilian striker João Pedro from Chelsea as the ideal replacement for Robert Lewandowski. According to sources close to the Catalan club, the transfer is seen as 'financially viable' and Barça's efforts are now focused on securing this signing. Chelsea, who paid £30M for the player, could now profit significantly. The 23-year-old has been one of the Premier League's standout performers this season!",
    tag: "TRANSFER",
    source: "@Sapo",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "9.7M",
  },
  {
    id: "t6",
    title: "🏆 NOITE DECISIVA! Aston Villa vs Liverpool — batalha pelo Top 4 da Premier League com o futuro europeu em jogo!",
    title_en: "🏆 DECISIVE NIGHT! Aston Villa vs Liverpool — battle for Premier League Top 4 with European future at stake!",
    summary: "JOGO DO ANO! Esta sexta-feira às 20h00 (BST), Villa Park recebe um duelo épico entre Aston Villa e Liverpool que pode definir quem joga na Champions League na próxima temporada. O Liverpool, após uma temporada de pesadelo, precisa desesperadamente dos 3 pontos. O Aston Villa quer confirmar o lugar europeu. As odds favorecem ligeiramente o Liverpool (7/5), mas o Villa Park é um caldeirão. Jogo com VAR, árbitro Chris Kavanagh e transmissão na Sky Sports!",
    summary_en: "MATCH OF THE YEAR! This Friday at 8pm BST, Villa Park hosts an epic duel between Aston Villa and Liverpool that could define who plays in the Champions League next season. Liverpool, after a nightmare season, desperately needs the 3 points. Aston Villa wants to confirm their European spot. Odds slightly favour Liverpool (7/5), but Villa Park is a cauldron. Game with VAR, referee Chris Kavanagh and broadcast on Sky Sports!",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "15/05/2026",
    engagement: "13.1M",
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
