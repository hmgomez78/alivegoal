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

// Notícias curadas — atualizadas 11/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Mundial 2026 COMEÇA HOJE! México vs África do Sul abre o torneio no Azteca!",
    title_en: "🚨 BREAKING: World Cup 2026 STARTS TODAY! Mexico vs South Africa opens the tournament at Azteca!",
    summary: "HISTÓRIA A ACONTECER! O maior Mundial de sempre arranca HOJE no lendário Estádio Azteca, na Cidade do México. México enfrenta África do Sul às 20:00 (hora de Lisboa) no jogo de abertura desta edição histórica com 48 seleções e 104 jogos. Trump confirmou presença no torneio e prometeu entregar o troféu na final de 19 de julho. A cerimónia de abertura contará com atuações de Madonna, Shakira e BTS, curada por Chris Martin dos Coldplay.",
    summary_en: "HISTORY IN THE MAKING! The biggest World Cup ever kicks off TODAY at the legendary Estadio Azteca in Mexico City. Mexico faces South Africa at 8pm (Lisbon time) in the opening match of this historic 48-team, 104-game edition. Trump confirmed his presence at the tournament and promised to hand over the trophy at the July 19 final. The opening ceremony will feature performances by Madonna, Shakira and BTS, curated by Coldplay's Chris Martin.",
    tag: "BREAKING",
    source: "@FIFA",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "45.2M",
  },
  {
    id: "t2",
    title: "🔥 SCANDAL: FIFA investigada em 4 estados dos EUA por fraude em bilhetes do Mundial!",
    title_en: "🔥 SCANDAL: FIFA investigated in 4 US states for World Cup ticket fraud!",
    summary: "ESCÂNDALO ANTES DO APITO INICIAL! O procurador-geral do Texas, Ken Paxton, lançou uma investigação criminal à FIFA por práticas enganosas na venda de bilhetes para o Mundial 2026. Adeptos compraram lugares de Categoria 1 e viram-nos reclassificados para Categoria 2 sem aviso. Os estados da Califórnia, Nova Iorque e Nova Jérsia abriram investigações similares. A FIFA recusa-se a comentar enquanto o torneio arranca em meio a uma crise de credibilidade sem precedentes.",
    summary_en: "SCANDAL BEFORE KICKOFF! Texas Attorney General Ken Paxton has launched a criminal investigation into FIFA for deceptive ticketing practices at the 2026 World Cup. Fans purchased Category 1 seats only to have them reclassified as Category 2 without notice. California, New York and New Jersey have opened similar investigations. FIFA refuses to comment as the tournament kicks off amid an unprecedented credibility crisis.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "19.8M",
  },
  {
    id: "t3",
    title: "💥 TRANSFER: Arsenal em pole position para contratar Julián Álvarez após Real e Barça falharem!",
    title_en: "💥 TRANSFER: Arsenal in pole position to sign Julian Alvarez after Real and Barca fail!",
    summary: "BOMBA NO MERCADO! O Arsenal tornou-se o principal candidato a contratar Julián Álvarez do Atlético de Madrid, segundo o jornal AS. O Real Madrid viu uma proposta de 150 milhões de euros rejeitada com desdém, e o Barcelona recusou-se a ir além dos 100 milhões. Com os rivais espanhóis fora da corrida, os Gunners preparam-se para apresentar uma oferta próxima do recorde mundial. Arteta quer o avançado argentino como peça central do seu projeto para dominar a Premier League.",
    summary_en: "TRANSFER BOMB! Arsenal has become the leading candidate to sign Julian Alvarez from Atletico Madrid, according to AS. Real Madrid had a €150 million bid rejected with derision, while Barcelona refused to go beyond €100 million. With the Spanish rivals out of the race, the Gunners are preparing to submit a near world-record offer. Arteta wants the Argentine striker as the centrepiece of his project to dominate the Premier League.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "16.4M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Irão ameaça boicotar jogos se bandeiras LGBTQ+ forem exibidas no Mundial!",
    title_en: "🔥 HOT: Iran threatens to boycott matches if LGBTQ+ flags are displayed at the World Cup!",
    summary: "TENSÃO POLÍTICA NO MUNDIAL! A Federação de Futebol do Irão exigiu à FIFA a proibição de bandeiras LGBTQ+ durante os jogos do torneio, ameaçando retirar a equipa se a organização não cumprir. Entretanto, adeptos iranianos viram os seus bilhetes cancelados pelos EUA e a seleção só recebeu vistos para entrar no país nos dias dos jogos. A ONU pediu uma 'revisão massiva' das políticas de imigração norte-americanas que estão a ensombrar o início do maior Mundial de sempre.",
    summary_en: "POLITICAL TENSION AT THE WORLD CUP! The Iranian Football Federation demanded FIFA ban LGBTQ+ flags during tournament matches, threatening to withdraw the team if the organisation does not comply. Meanwhile, Iranian fans had their tickets cancelled by the US and the national team only received visas to enter the country on match days. The UN called for a 'massive rethink' of US immigration policies that are overshadowing the start of the biggest World Cup ever.",
    tag: "HOT",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "14.7M",
  },
  {
    id: "t5",
    title: "💥 TRANSFER: Manchester City oferece 120M£ por Elliot Anderson mas Forest quer 150M€!",
    title_en: "💥 TRANSFER: Manchester City offer £120M for Elliot Anderson but Forest want €150M!",
    summary: "GUERRA DE VALORES! O Manchester City escalou a sua proposta por Elliot Anderson para mais de 120 milhões de libras, mas o Nottingham Forest rejeitou liminarmente e exige um valor próximo dos 150 milhões de euros pelo médio inglês. Em paralelo, o PSG entrou na corrida por Michael Olise, apesar da resistência do Bayern Munique. O mercado de verão promete ser o mais caro de sempre, com o Mundial a servir de montra para os melhores jogadores do planeta.",
    summary_en: "BATTLE OF VALUES! Manchester City escalated their bid for Elliot Anderson to over £120 million, but Nottingham Forest flatly rejected it and are demanding a fee close to €150 million for the English midfielder. Meanwhile, PSG have entered the race for Michael Olise, despite Bayern Munich's resistance. The summer transfer window promises to be the most expensive ever, with the World Cup serving as a showcase for the planet's best players.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "11.3M",
  },
  {
    id: "t6",
    title: "🚨 BREAKING: Lamine Yamal 'desesperado' para jogar — Espanha aguarda milagre médico!",
    title_en: "🚨 BREAKING: Lamine Yamal 'desperate' to play — Spain awaits medical miracle!",
    summary: "DRAMA NA ROJA! Lamine Yamal, a maior estrela de 18 anos do futebol mundial, está 'desesperado' para regressar a tempo do primeiro jogo da Espanha contra Cabo Verde, na segunda-feira. O prodígio do Barcelona não joga desde 22 de abril, quando sofreu uma lesão no tendão. O diretor técnico Aitor Karanka confirmou que a decisão final cabe ao selecionador Luis de la Fuente e à equipa médica. A Espanha, candidata ao título, pode ter de começar o Mundial sem o seu maior talento.",
    summary_en: "DRAMA IN LA ROJA! Lamine Yamal, the biggest 18-year-old star in world football, is 'desperate' to return in time for Spain's first game against Cape Verde on Monday. The Barcelona prodigy has not played since April 22, when he suffered a hamstring injury. Technical director Aitor Karanka confirmed the final decision rests with coach Luis de la Fuente and the medical team. Spain, a title contender, may have to start the World Cup without their greatest talent.",
    tag: "BREAKING",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "11/06/2026",
    engagement: "13.9M",
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
