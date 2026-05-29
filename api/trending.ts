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

// Notícias curadas — atualizadas 29/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO: Procuradores de Nova Iorque e Nova Jérsia investigam a FIFA por preços abusivos dos bilhetes do Mundial 2026!",
    title_en: "🚨 SCANDAL: NY and NJ Attorneys General investigate FIFA over sky-high 2026 World Cup ticket prices!",
    summary: "A FIFA ESTÁ SOB INVESTIGAÇÃO! Os procuradores-gerais de Nova Iorque e Nova Jérsia emitiram intimações à FIFA devido aos preços exorbitantes dos bilhetes para o Mundial 2026. A investigação foca-se em práticas de preços variáveis, alterações no mapa de lugares e reclamações dos adeptos, que acusam a organização de manipulação. A pressão aumenta sobre a FIFA a poucas semanas do início do torneio.",
    summary_en: "FIFA IS UNDER INVESTIGATION! The Attorneys General of New York and New Jersey have issued subpoenas to FIFA over the exorbitant ticket prices for the 2026 World Cup. The probe focuses on variable pricing practices, seat map changes, and fan complaints accusing the organization of manipulation. Pressure mounts on FIFA just weeks before the tournament begins.",
    tag: "SCANDAL",
    source: "@NYAG",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "512.4M",
  },
  {
    id: "t2",
    title: "🔥 BOMBA: Bernardo Silva com 'acordo verbal' para rumar ao Barcelona a custo zero!",
    title_en: "🔥 BREAKING: Bernardo Silva reaches 'verbal agreement' to join Barcelona on a free transfer!",
    summary: "O MERCADO DE TRANSFERÊNCIAS EXPLODE! Relatos indicam que Bernardo Silva está a 90% de fechar a sua transferência para o Barcelona. O internacional português estaria disposto a mudar-se para a Catalunha, com o seu agente Jorge Mendes a finalizar os detalhes do contrato. O salário não será um problema e Bernardo está apaixonado pela ideia de jogar no Barça.",
    summary_en: "THE TRANSFER MARKET EXPLODES! Reports indicate that Bernardo Silva is 90% close to finalizing his transfer to Barcelona. The Portuguese international is reportedly willing to move to Catalonia, with his agent Jorge Mendes finalizing the contract details. Salary will not be an issue, and Bernardo is in love with the idea of playing for Barça.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "480.1M",
  },
  {
    id: "t3",
    title: "🚨 OFICIAL: Pedro Lima é o novo reforço do Sporting CP para o meio-campo!",
    title_en: "🚨 OFFICIAL: Pedro Lima is Sporting CP's new midfield signing!",
    summary: "A NOVA ESTRELA DE ALVALADE! O Sporting Clube de Portugal oficializou a contratação do médio brasileiro Pedro Lima, de 23 anos. O jogador, formado na academia do Palmeiras, assinou contrato por cinco temporadas e é visto como uma peça fundamental para a renovação do meio-campo leonino, perante as possíveis saídas de Hjulmand e Morita.",
    summary_en: "THE NEW STAR OF ALVALADE! Sporting Clube de Portugal has officially announced the signing of 23-year-old Brazilian midfielder Pedro Lima. The player, formed in the Palmeiras academy, has signed a five-year contract and is seen as a key piece for the renewal of the Lions' midfield, given the possible departures of Hjulmand and Morita.",
    tag: "TRANSFER",
    source: "@SportingCP",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "250.8M",
  },
  {
    id: "t4",
    title: "⚠️ ALERTA MUNDIAL: Neymar sofre lesão na perna e vai falhar o jogo de abertura do Brasil!",
    title_en: "⚠️ WORLD ALERT: Neymar suffers calf injury and will miss Brazil's opening match!",
    summary: "PÂNICO NO BRASIL! Neymar Jr. sofreu uma lesão de grau dois na perna e deverá ficar afastado dos relvados por duas a três semanas. O craque brasileiro vai falhar os próximos jogos amigáveis contra o Panamá e o Egito, e é quase certo que não estará disponível para a partida de abertura do Brasil no Mundial 2026. A seleção de Carlo Ancelotti perde a sua principal estrela.",
    summary_en: "PANIC IN BRAZIL! Neymar Jr. has suffered a grade two calf injury and is expected to be sidelined for two to three weeks. The Brazilian star will miss the upcoming friendly matches against Panama and Egypt, and is almost certain to miss Brazil's opening match at the 2026 World Cup. Carlo Ancelotti's team loses its main star.",
    tag: "BREAKING",
    source: "@CBF_Futebol",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "610.5M",
  },
  {
    id: "t5",
    title: "🔥 RUMO À FINAL: Arsenal e PSG preparam-se para a grande decisão da Champions League em Budapeste!",
    title_en: "🔥 ROAD TO THE FINAL: Arsenal and PSG prepare for the grand Champions League decider in Budapest!",
    summary: "O CLÍMAX DA TEMPORADA EUROPEIA! A Puskás Aréna, em Budapeste, será o palco da aguardada final da UEFA Champions League amanhã, dia 30 de maio, entre Arsenal e Paris Saint-Germain. O PSG procura o bicampeonato europeu, enquanto o Arsenal tenta a glória máxima 20 anos após a sua última final. As ruas de Budapeste já estão repletas de adeptos num ambiente de pura tensão e festa.",
    summary_en: "THE CLIMAX OF THE EUROPEAN SEASON! The Puskás Aréna in Budapest will host the highly anticipated UEFA Champions League final tomorrow, May 30th, between Arsenal and Paris Saint-Germain. PSG seeks back-to-back European titles, while Arsenal aims for ultimate glory 20 years after their last final. The streets of Budapest are already full of fans in an atmosphere of pure tension and celebration.",
    tag: "HOT",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "395.2M",
  },
  {
    id: "t6",
    title: "🚨 REVIRAVOLTA EM NÁPOLES: Massimiliano Allegri chega a acordo para suceder a Antonio Conte!",
    title_en: "🚨 TWIST IN NAPLES: Massimiliano Allegri reaches agreement to succeed Antonio Conte!",
    summary: "MUDANÇA DE CADEIRAS NA SERIE A! Massimiliano Allegri chegou a um acordo verbal para se tornar o novo treinador do Napoli, assinando um contrato válido até junho de 2027. O ex-treinador da Juventus e AC Milan regressa ao ativo para substituir Antonio Conte no Stadio Diego Armando Maradona. A direção napolitana aposta na experiência de Allegri para reconquistar o título italiano.",
    summary_en: "MUSICAL CHAIRS IN SERIE A! Massimiliano Allegri has reached a verbal agreement to become the new head coach of Napoli, signing a contract valid until June 2027. The former Juventus and AC Milan manager returns to action to replace Antonio Conte at the Stadio Diego Armando Maradona. The Neapolitan board bets on Allegri's experience to regain the Italian title.",
    tag: "BREAKING",
    source: "@sscnapoli",
    url: "https://x.com/alivegoal",
    time: "29/05/2026",
    engagement: "215.7M",
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
