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

// Notícias curadas manualmente — atualizadas 09/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "ESCÂNDALO LIBERTADORES: JOGO FLAMENGO CANCELADO APÓS INVASÃO DE ADEPTOS DO MEDELLÍN!",
    title_en: "LIBERTADORES SCANDAL: FLAMENGO MATCH CANCELLED AFTER MEDELLIN FAN INVASION!",
    summary: "A CONMEBOL cancelou o jogo entre Independiente Medellín e Flamengo após adeptos colombianos invadirem o relvado do Estádio Atanasio Girardot. Cenas de caos total: seguranças superados, jogadores do Flamengo em fuga, staff agredido. A CONMEBOL anunciou que o Medellín pode ser ELIMINADO da competição e enfrenta multa milionária. Colombianos revoltados com a atitude do Flamengo: 'Gravíssimo!'",
    summary_en: "CONMEBOL cancelled the match between Independiente Medellín and Flamengo after Colombian fans invaded the pitch at Estadio Atanasio Girardot. Total chaos: overwhelmed security, Flamengo players fleeing, staff assaulted. CONMEBOL announced Medellín could be ELIMINATED from the competition and faces a million-dollar fine. Colombians outraged at Flamengo's attitude: 'Extremely serious!'",
    tag: "SCANDAL",
    source: "@CONMEBOL",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "623.4K",
  },
  {
    id: "t2",
    title: "VAN DIJK QUER SAIR DO LIVERPOOL! Galatasaray em negociações — Slot furioso!",
    title_en: "VAN DIJK WANTS TO LEAVE LIVERPOOL! Galatasaray in talks — Slot furious!",
    summary: "Virgil van Dijk, capitão do Liverpool, está 'frustrado' e quer rescindir o contrato para sair este verão. O Galatasaray está em negociações avançadas para contratar o defesa holandês de 34 anos. Arne Slot ficou furioso ao saber da notícia antes do jogo com o Chelsea: 'Não é o momento certo'. Liverpool pode perder o capitão e o melhor defesa da Premier League de graça.",
    summary_en: "Virgil van Dijk, Liverpool captain, is 'frustrated' and wants to terminate his contract to leave this summer. Galatasaray are in advanced negotiations to sign the 34-year-old Dutch defender. Arne Slot was furious upon learning the news before the Chelsea match: 'It's not the right time'. Liverpool could lose their captain and best Premier League defender for free.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "341.8K",
  },
  {
    id: "t3",
    title: "ARSENAL PODE CONTRATAR MBAPPÉ SE VENCER O PSG NA FINAL DA CHAMPIONS!",
    title_en: "ARSENAL COULD SIGN MBAPPE IF THEY BEAT PSG IN CHAMPIONS LEAGUE FINAL!",
    summary: "Emmanuel Petit, lenda do Arsenal, revelou que Kylian Mbappé está disposto a sair do Real Madrid se o Arsenal vencer a final da Champions League contra o PSG. 'Uma vitória sobre o PSG seria a prova de que o Arsenal é um projeto de topo mundial. Mbappé quer Champions League — e o Arsenal pode dar-lha', disse Petit. Os adeptos do Arsenal já estão em delírio com a possibilidade.",
    summary_en: "Arsenal legend Emmanuel Petit revealed that Kylian Mbappé is willing to leave Real Madrid if Arsenal beat PSG in the Champions League final. 'A win over PSG would prove Arsenal is a world-class project. Mbappé wants the Champions League — and Arsenal can give it to him', said Petit. Arsenal fans are already delirious at the possibility.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "512.9K",
  },
  {
    id: "t4",
    title: "LIVERPOOL 1-0 CHELSEA HOJE — Gravenberch decide! Premier League em chamas!",
    title_en: "LIVERPOOL 1-0 CHELSEA TODAY — Gravenberch decides! Premier League on fire!",
    summary: "Liverpool recebe o Chelsea hoje às 08h30 numa batalha decisiva da Premier League. Gravenberch marcou o único golo da partida ao minuto 6. Alexander Isak regressa à convocatória após lesão. Liverpool precisa de vencer para manter a pressão no topo da tabela. Chelsea luta por uma vaga na Champions. Arne Slot: 'Não há nada de errado com os nossos padrões!'",
    summary_en: "Liverpool host Chelsea today at 08:30 in a decisive Premier League battle. Gravenberch scored the only goal at minute 6. Alexander Isak returns to the squad after injury. Liverpool need to win to maintain pressure at the top of the table. Chelsea fighting for a Champions League spot. Arne Slot: 'There's nothing wrong with our standards!'",
    tag: "HOT",
    source: "@PremierLeague",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "289.1K",
  },
  {
    id: "t5",
    title: "DARWIN NÚÑEZ LIVRE! Chelsea e Newcastle em corrida — Ex-Liverpool disponível de graça!",
    title_en: "DARWIN NUNEZ FREE AGENT! Chelsea and Newcastle race — Ex-Liverpool available for free!",
    summary: "Darwin Núñez, avançado uruguaio que custou 100 milhões ao Liverpool, está livre após o fim do contrato. Chelsea e Newcastle estão a monitorizar a situação do jogador de 26 anos. O Liverpool optou por não renovar após uma época inconsistente. Núñez tem propostas de Espanha, Itália e Arábia Saudita. Quem vai fazer o negócio do verão?",
    summary_en: "Darwin Núñez, the Uruguayan striker who cost Liverpool £100 million, is a free agent after his contract expired. Chelsea and Newcastle are monitoring the 26-year-old. Liverpool chose not to renew after an inconsistent season. Núñez has offers from Spain, Italy and Saudi Arabia. Who will land the bargain of the summer?",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "178.6K",
  },
  {
    id: "t6",
    title: "BAYERN ELIMINADO DA CHAMPIONS PELO PSG — Kompany sob pressão máxima!",
    title_en: "BAYERN ELIMINATED FROM CHAMPIONS LEAGUE BY PSG — Kompany under maximum pressure!",
    summary: "O Bayern de Munique foi eliminado da Champions League após empatar 1-1 com o PSG em casa (derrota 6-5 no agregado). Vincent Kompany está sob enorme pressão — o Bayern perdeu o título alemão para o Leverkusen e agora sai da Champions nas meias-finais. Os adeptos do Bayern exigem explicações: 'Esta época é uma catástrofe!' Kompany pode ser despedido no final da época.",
    summary_en: "Bayern Munich were eliminated from the Champions League after drawing 1-1 with PSG at home (6-5 aggregate defeat). Vincent Kompany is under enormous pressure — Bayern lost the German title to Leverkusen and now exit the Champions League at the semi-final stage. Bayern fans demand answers: 'This season is a catastrophe!' Kompany could be sacked at the end of the season.",
    tag: "SCANDAL",
    source: "@Bundesliga",
    url: "https://x.com/alivegoal",
    time: "09/05/2026",
    engagement: "445.3K",
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
