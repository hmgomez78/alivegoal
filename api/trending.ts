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

// Notícias curadas — atualizadas 13/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Barcelona processa Florentino Pérez por difamação! Guerra judicial entre os dois gigantes espanhóis!",
    title_en: "🚨 BREAKING: Barcelona sue Florentino Pérez for slander! Legal war between Spanish giants erupts!",
    summary: "GUERRA TOTAL ENTRE BARÇA E REAL MADRID! O FC Barcelona confirmou oficialmente que instaurou um processo judicial contra o presidente do Real Madrid, Florentino Pérez, por difamação. O clube catalão apresentou o pedido de conciliação obrigatório antes de avançar com uma queixa-crime ao abrigo do Artigo 205.º do Código Penal espanhol. A razão: as declarações de Florentino na conferência de imprensa de 12 de maio e numa entrevista no dia seguinte, onde afirmou que o Barça 'roubou' títulos da Liga ao Real Madrid através de favoritismo arbitral no caso Negreira. O Barça exige uma retratação pública. Se Florentino não recuar, o clube avança com queixa-crime. O Real Madrid, por sua vez, já preparou um dossier de 500 páginas para enviar à UEFA com alegadas provas de tratamento favorável ao Barça. As relações entre os dois clubes estão completamente destruídas.",
    summary_en: "TOTAL WAR BETWEEN BARÇA AND REAL MADRID! FC Barcelona officially confirmed it has initiated legal proceedings against Real Madrid president Florentino Pérez for slander. The Catalan club filed the mandatory conciliation request before proceeding with a criminal complaint under Article 205 of the Spanish Penal Code. The reason: Florentino's statements at a press conference on May 12 and in an interview the following day, claiming Barça 'stole' La Liga titles from Real Madrid through referee favouritism in the Negreira case. Barça demands a public retraction. If Florentino does not back down, the club will file a criminal complaint. Real Madrid, meanwhile, has prepared a 500-page dossier to send to UEFA with alleged evidence of favourable treatment for Barça. Relations between the two clubs are completely broken down.",
    tag: "SCANDAL",
    source: "@Athletic_ES",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "41.2M",
  },
  {
    id: "t2",
    title: "💥 TRANSFER: Lewandowski a caminho de Chicago! Agente Pini Zahavi nos EUA para fechar contrato com o Chicago Fire!",
    title_en: "💥 TRANSFER: Lewandowski heading to Chicago! Agent Pini Zahavi in USA to finalise Chicago Fire deal!",
    summary: "BOMBA DE TRANSFERÊNCIA! Robert Lewandowski, o lendário avançado polaco de 37 anos, está a caminho dos Estados Unidos para explorar uma transferência para o Chicago Fire da MLS. Fabrizio Romano confirmou que o agente de Lewandowski, Pini Zahavi, viajou para Chicago para negociar um contrato de 2 a 3 anos com o clube da MLS. O Chicago Fire está 'all in' para fechar o negócio, que seria uma transferência gratuita após o término do contrato com o Barcelona. Lewandowski, que marcou 26 golos na última época no Barça, pode tornar-se a maior contratação da história da MLS. O jogador quer continuar a jogar a alto nível e a MLS oferece-lhe visibilidade e um salário competitivo. Uma decisão final é esperada nos próximos dias.",
    summary_en: "TRANSFER BOMB! Robert Lewandowski, the legendary 37-year-old Polish striker, is heading to the United States to explore a transfer to Chicago Fire in MLS. Fabrizio Romano confirmed that Lewandowski's agent, Pini Zahavi, has travelled to Chicago to negotiate a 2 to 3-year contract with the MLS club. Chicago Fire are 'all in' to get the deal done, which would be a free transfer after his contract with Barcelona expires. Lewandowski, who scored 26 goals last season at Barça, could become the biggest signing in MLS history. The player wants to continue playing at a high level and MLS offers him visibility and a competitive salary. A final decision is expected in the coming days.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "28.9M",
  },
  {
    id: "t3",
    title: "🔥 SCANDAL: Mundial 2026 em crise! Estádios com MILHARES de lugares vazios e FIFA sob pressão política nos EUA!",
    title_en: "🔥 SCANDAL: World Cup 2026 in crisis! Stadiums with THOUSANDS of empty seats and FIFA under political pressure in the USA!",
    summary: "ESCÂNDALO NO MAIOR MUNDIAL DE SEMPRE! O Mundial 2026 começou envolvido em polémica: os jogos de abertura registaram milhares de lugares vazios, apesar da FIFA afirmar que os estádios estavam quase cheios. Os estados de Nova Iorque e Massachusetts emitiram intimações judiciais à FIFA por alegada 'escassez artificial' de bilhetes, preços exorbitantes e táticas de venda enganosas. Além disso, a FIFA foi apanhada a reduzir preços de bilhetes para muitos dos 104 jogos, contradizendo as suas próprias declarações sobre procura recorde. Um erro no sistema de checkout da FIFA chegou a disponibilizar bilhetes a 0 dólares, com cerca de 60 adeptos a 'comprar' bilhetes gratuitos antes do erro ser corrigido. Trump anunciou que não estará presente na cerimónia de abertura. E Thomas Partey foi impedido de entrar no Canadá e não poderá jogar pelo Gana.",
    summary_en: "SCANDAL AT THE BIGGEST WORLD CUP EVER! The 2026 World Cup began mired in controversy: opening matches saw thousands of empty seats, despite FIFA claiming stadiums were nearly full. The states of New York and Massachusetts issued legal subpoenas to FIFA for alleged 'artificial scarcity' of tickets, exorbitant prices and misleading sales tactics. Furthermore, FIFA was caught reducing ticket prices for many of the 104 matches, contradicting its own statements about record demand. A FIFA checkout system error even made tickets available at $0, with around 60 fans 'buying' free tickets before the error was corrected. Trump announced he will not attend the opening ceremony. And Thomas Partey was barred from entering Canada and will miss Ghana's matches.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "35.7M",
  },
  {
    id: "t4",
    title: "⚽ HOT: EUA 3-0 Paraguai AO INTERVALO! Pulisic brilha no SoFi Stadium e os EUA estão a fazer história no Mundial!",
    title_en: "⚽ HOT: USA 3-0 Paraguay AT HALF-TIME! Pulisic shines at SoFi Stadium as USA make World Cup history!",
    summary: "NOITE MÁGICA EM LOS ANGELES! Os Estados Unidos chegaram ao intervalo a vencer o Paraguai por 3-0 no SoFi Stadium de Inglewood, numa exibição que deixou 70 mil adeptos em delírio. Christian Pulisic foi o grande protagonista da primeira parte, envolvido em dois dos três golos. O primeiro golo foi um autogolo do Paraguai após uma jogada de Pulisic. Os EUA dominaram completamente os primeiros 45 minutos com uma intensidade impressionante. O selecionador Mauricio Pochettino apostou numa estratégia de pressão alta que desorganizou completamente a equipa paraguaia. É a maior vantagem dos EUA ao intervalo num jogo de Mundial. O SoFi Stadium, com capacidade para 70 mil pessoas, estava esgotado e o ambiente foi descrito como 'o melhor da história do futebol americano'.",
    summary_en: "MAGICAL NIGHT IN LOS ANGELES! The United States reached half-time leading Paraguay 3-0 at SoFi Stadium in Inglewood, in a display that sent 70,000 fans into delirium. Christian Pulisic was the star of the first half, involved in two of the three goals. The first goal was a Paraguay own goal following a Pulisic run. The USA completely dominated the first 45 minutes with impressive intensity. Coach Mauricio Pochettino bet on a high-press strategy that completely disorganised the Paraguayan side. It is the USA's biggest half-time lead in a World Cup match. SoFi Stadium, with a capacity of 70,000, was sold out and the atmosphere was described as 'the best in American football history'.",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "22.4M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Man United lança oferta de 99M€ por Mateus Fernandes! Arsenal e Real Madrid também na corrida!",
    title_en: "🚨 BREAKING: Man United launch €99M bid for Mateus Fernandes! Arsenal and Real Madrid also in the race!",
    summary: "GUERRA DE GIGANTES POR MATEUS FERNANDES! O Manchester United quer agir rapidamente para contratar o médio português do West Ham, Mateus Fernandes, avaliado em 99 milhões de euros. O jogador de 21 anos, compatriota de Bruno Fernandes, foi uma das revelações da Premier League esta época e quer seguir os passos do seu homónimo em Old Trafford. O Sky Sports confirma que Mateus Fernandes está 'ansioso' por uma mudança para o Manchester United, apesar do interesse do Arsenal. O Real Madrid também está a observar o jogador, o que complica as negociações. O West Ham não quer vender mas pode ser forçado a aceitar uma oferta superior a 90 milhões de euros. Uma das transferências mais quentes do mercado de verão.",
    summary_en: "GIANTS' WAR FOR MATEUS FERNANDES! Manchester United want to move quickly to sign West Ham's Portuguese midfielder Mateus Fernandes, valued at €99 million. The 21-year-old, compatriot of Bruno Fernandes, was one of the Premier League's revelations this season and wants to follow in his namesake's footsteps at Old Trafford. Sky Sports confirms Mateus Fernandes is 'keen' on a move to Manchester United despite Arsenal's interest. Real Madrid are also monitoring the player, complicating negotiations. West Ham don't want to sell but may be forced to accept an offer above €90 million. One of the hottest transfers of the summer market.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "18.6M",
  },
  {
    id: "t6",
    title: "💥 BREAKING: Brasil vs Marrocos HOJE — Ancelotti estreia-se no Mundial sem Neymar! A maior surpresa possível?",
    title_en: "💥 BREAKING: Brazil vs Morocco TODAY — Ancelotti debuts at World Cup without Neymar! Could the biggest upset happen?",
    summary: "O JOGO DO DIA NO MUNDIAL 2026! O Brasil de Carlo Ancelotti enfrenta Marrocos hoje às 23:00 (Lisboa) no MetLife Stadium de Nova Iorque, no que pode ser o jogo mais imprevisível da fase de grupos. Ancelotti estreia-se num Mundial sem Neymar, que está em dúvida para toda a fase de grupos. O Brasil chega em boa forma (3 vitórias consecutivas em amigáveis), mas Marrocos é um adversário perigoso: chegou às meias-finais em 2022, venceu Bélgica e Portugal, e chega invicto nas últimas 5 partidas. As odds colocam o Brasil como favorito (-145) mas Marrocos tem valor apostador enorme (+440). Vinícius Júnior e Raphinha são as grandes armas do Brasil. Sofiane Boufal e Ayoub El Kaabi lideram o ataque marroquino. Um empate é o resultado mais provável segundo os analistas.",
    summary_en: "THE MATCH OF THE DAY AT WORLD CUP 2026! Carlo Ancelotti's Brazil face Morocco today at 11 p.m. (Lisbon time) at MetLife Stadium in New York, in what could be the most unpredictable group stage match. Ancelotti makes his World Cup debut without Neymar, who is a doubt for the entire group stage. Brazil arrive in good form (3 consecutive friendly wins), but Morocco are a dangerous opponent: they reached the 2022 semi-finals, beat Belgium and Portugal, and arrive unbeaten in their last 5 matches. The odds make Brazil favourites (-145) but Morocco have enormous betting value (+440). Vinícius Júnior and Raphinha are Brazil's main weapons. Sofiane Boufal and Ayoub El Kaabi lead the Moroccan attack. A draw is the most likely result according to analysts.",
    tag: "BREAKING",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "13/06/2026",
    engagement: "31.5M",
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
