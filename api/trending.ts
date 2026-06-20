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

// Notícias curadas — atualizadas 20/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Brasil goleia Haiti 3-0! Matheus Cunha e Vinicius Jr. brilham — Endrick estreia-se no Mundial!",
    title_en: "🚨 BREAKING: Brazil thrash Haiti 3-0! Matheus Cunha and Vinicius Jr. shine — Endrick makes his World Cup debut!",
    summary: "O Brasil respondeu à pressão com uma vitória convincente por 3-0 sobre o Haiti em Filadélfia, no Dia 9 do Mundial 2026. Matheus Cunha foi o grande destaque, marcando o primeiro golo e sendo decisivo em toda a partida. Vinicius Jr. também marcou e confirmou o seu estatuto de estrela mundial. O momento mais esperado foi a entrada de Endrick, o prodígio do Real Madrid, que estreou no maior palco do futebol mundial. Carlo Ancelotti pode respirar de alívio — o Brasil está no bom caminho no Grupo C e enfrenta agora a Escócia na última jornada.",
    summary_en: "Brazil responded to the pressure with a convincing 3-0 victory over Haiti in Philadelphia on Day 9 of the 2026 World Cup. Matheus Cunha was the standout performer, scoring the opening goal and being decisive throughout. Vinicius Jr. also scored and confirmed his world-class status. The most anticipated moment was the introduction of Endrick, the Real Madrid prodigy, who made his debut on football's biggest stage. Carlo Ancelotti can breathe a sigh of relief — Brazil are on track in Group C and now face Scotland in the final group stage match.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "156.8M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Real Madrid oferece €220M por Michael Olise! Bayern recusa — Guerra de transferências do verão!",
    title_en: "🔥 TRANSFER: Real Madrid offer €220M for Michael Olise! Bayern refuse — Summer transfer war erupts!",
    summary: "O Real Madrid de José Mourinho está disposto a pagar até 220 milhões de euros por Michael Olise, o extremo francês do Bayern de Munique, segundo a Marca. O Bayern recusou a oferta inicial de 150 milhões e está a tentar segurar o jogador com um aumento salarial brutal — de 13 para 22 milhões de libras por temporada. Olise, que brilhou na Copa do Mundo com a França, tornou-se o alvo número um do mercado de verão. O Real Madrid, que já contratou Marc Cucurella ao Chelsea por 50 milhões, está determinado a construir um ataque de sonho para a próxima temporada.",
    summary_en: "José Mourinho's Real Madrid are willing to pay up to €220 million for Bayern Munich and France winger Michael Olise, according to Marca. Bayern rejected the initial €150m offer and are trying to keep the player with a massive salary increase — from £13m to £22m per season. Olise, who shone at the World Cup with France, has become the summer transfer market's number one target. Real Madrid, who already signed Marc Cucurella from Chelsea for £50m, are determined to build a dream attack for next season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "118.4M",
  },
  {
    id: "t3",
    title: "💥 SCANDAL: Ronaldo sem remate a gol em 10 jogos de torneios! Portugal em crise — Dias tenta defender o capitão!",
    title_en: "💥 SCANDAL: Ronaldo without a shot on target in 10 tournament games! Portugal in crisis — Dias tries to defend the captain!",
    summary: "Cristiano Ronaldo está no centro da maior polémica do Mundial 2026: o capitão de Portugal não registou um único remate enquadrado em 10 jogos consecutivos de torneios internacionais, uma estatística devastadora para um jogador que se apresenta como o melhor da história. O empate na estreia com a RD Congo (1-1) foi amplamente criticado, com muitos a pedir a saída de Ronaldo do onze inicial. Rúben Dias tentou defender o companheiro: 'É ruído, insignificante.' Mas o debate está instalado: deve Roberto Martínez poupar Ronaldo contra o Uzbequistão? O futuro do capitão no Mundial está em jogo.",
    summary_en: "Cristiano Ronaldo is at the centre of the biggest controversy of the 2026 World Cup: Portugal's captain has not registered a single shot on target in 10 consecutive international tournament games, a devastating statistic for a player who presents himself as the greatest of all time. The opening draw with DR Congo (1-1) was widely criticised, with many calling for Ronaldo to be dropped. Rúben Dias tried to defend his teammate: 'It's noise, insignificant.' But the debate is set: should Roberto Martínez rest Ronaldo against Uzbekistan? The captain's World Cup future is on the line.",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "134.2M",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Real Madrid DESISTE de Julián Álvarez! Atlético rejeita €150M — Barcelona entra na corrida!",
    title_en: "🚨 BREAKING: Real Madrid GIVE UP on Julián Álvarez! Atlético reject €150M — Barcelona enter the race!",
    summary: "Num dos maiores dramas de transferências do verão, o Real Madrid desistiu oficialmente da contratação de Julián Álvarez após o Atlético de Madrid rejeitar uma proposta recorde de 150 milhões de euros. Fabrizio Romano confirmou que o Real Madrid não voltou às negociações e que os Colchoneros não aceitam menos do que a cláusula de rescisão de 500 milhões. Agora o Barcelona entra em cena: os catalães estão em 'conversações diárias' com o Atlético para tentar fechar o negócio. Álvarez, em grande forma no Mundial com a Argentina, tornou-se o avançado mais cobiçado do planeta.",
    summary_en: "In one of the summer's biggest transfer dramas, Real Madrid have officially given up on signing Julián Álvarez after Atlético Madrid rejected a record €150 million offer. Fabrizio Romano confirmed that Real Madrid have not returned to negotiations and that Los Colchoneros will not accept less than the €500m release clause. Now Barcelona enter the picture: the Catalans are in 'daily talks' with Atlético to try to close the deal. Álvarez, in superb form at the World Cup with Argentina, has become the most coveted striker on the planet.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "97.6M",
  },
  {
    id: "t5",
    title: "⚽ HOT: Renato Gaúcho demitido do Vasco! Clube sem treinador em plena Copa do Mundo — Quem será o substituto?",
    title_en: "⚽ HOT: Renato Gaúcho sacked by Vasco! Club without a manager during the World Cup — Who will replace him?",
    summary: "O Vasco da Gama despediu Renato Gaúcho em plena pausa para a Copa do Mundo, numa decisão que chocou o futebol brasileiro. O treinador gaúcho, que chegou ao clube com grande pompa, não conseguiu os resultados esperados e a diretoria decidiu agir durante a paragem do campeonato. O Vasco está agora à procura urgente de um novo técnico, com vários nomes a circular nos bastidores. A demissão acontece num momento delicado para o clube, que precisa de reagir na segunda metade do Brasileirão. Os adeptos estão divididos sobre a decisão.",
    summary_en: "Vasco da Gama have sacked Renato Gaúcho during the World Cup break, in a decision that shocked Brazilian football. The manager, who arrived at the club with great fanfare, failed to deliver the expected results and the board decided to act during the league's pause. Vasco are now urgently searching for a new manager, with several names circulating behind the scenes. The dismissal comes at a delicate moment for the club, who need to bounce back in the second half of the Brasileirão. Fans are divided over the decision.",
    tag: "HOT",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "72.3M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Arsenal na corrida por Bradley Barcola do PSG! Gunners podem vender Havertz para financiar negócio!",
    title_en: "🔥 TRANSFER: Arsenal in the race for PSG's Bradley Barcola! Gunners may sell Havertz to fund the deal!",
    summary: "O Arsenal de Mikel Arteta está a preparar uma oferta pelo extremo francês do PSG, Bradley Barcola, num negócio que pode revolucionar o ataque dos Gunners. Segundo o Football.London, o Arsenal pode precisar de vender Kai Havertz antes de avançar com a proposta pelo internacional francês. Barcola, que está a brilhar no Mundial com a França, é visto como a peça que falta para o Arsenal finalmente ganhar a Premier League. O Liverpool também estava interessado, mas os Gunners parecem ter ganho a corrida. A odd de Arteta para o título da Premier League 2026/27 já desceu para 3.50.",
    summary_en: "Mikel Arteta's Arsenal are preparing an offer for PSG French winger Bradley Barcola, in a deal that could revolutionise the Gunners' attack. According to Football.London, Arsenal may need to sell Kai Havertz before advancing with a proposal for the French international. Barcola, who is shining at the World Cup with France, is seen as the missing piece for Arsenal to finally win the Premier League. Liverpool were also interested, but the Gunners appear to have won the race. Arteta's odds for the 2026/27 Premier League title have already dropped to 3.50.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "20/06/2026",
    engagement: "63.9M",
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
