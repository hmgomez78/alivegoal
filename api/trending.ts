import { VercelRequest, VercelResponse } from "@vercel/node";

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

const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "⚡ BREAKING: Phil Foden Renova com o Manchester City até 2030",
    title_en: "⚡ BREAKING: Phil Foden Signs New Manchester City Deal Until 2030",
    summary: "O Manchester City confirmou que Phil Foden assinou um novo contrato de quatro anos, prolongando a ligação ao clube até 2030. Aos 26 anos, o médio ofensivo formado no City já soma 369 jogos e seis títulos de Premier League; a renovação dá a Enzo Maresca uma referência central para o próximo ciclo da equipa.",
    summary_en: "Manchester City have confirmed that Phil Foden has signed a new four-year contract, extending his stay until 2030. The 26-year-old academy graduate has already made 369 appearances and won six Premier League titles; the renewal gives Enzo Maresca a key reference point for the club's next cycle.",
    tag: "BREAKING",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cg4dz410ld6o",
    time: "23/07/2026",
    engagement: "~2.8M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Arsenal Fecha Misa Rodríguez, Sexta Contratação do Verão",
    title_en: "🚨 TRANSFER: Arsenal Complete Misa Rodríguez Deal as Sixth Summer Signing",
    summary: "O Arsenal confirmou a chegada de Misa Rodríguez a custo zero, depois de a guarda-redes espanhola ter terminado o vínculo ao Real Madrid. A internacional de 27 anos, que acumulou 215 jogos pelo clube madrileno, reforça uma baliza onde também estão Daphne van Domselaar e Anneke Borbe.",
    summary_en: "Arsenal have confirmed the free signing of Misa Rodríguez after the Spanish goalkeeper's Real Madrid contract ended. The 27-year-old, who made 215 appearances for the Madrid club, joins a goalkeeping group that also includes Daphne van Domselaar and Anneke Borbe.",
    tag: "TRANSFER",
    source: "BBC Sport / The Guardian",
    url: "https://www.bbc.com/sport/football/articles/cz7dq8wrzwjo",
    time: "23/07/2026",
    engagement: "~1.6M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Liverpool Confiante na Corrida por Bradley Barcola",
    title_en: "🔥 HOT: Liverpool Reportedly Confident in Bradley Barcola Pursuit",
    summary: "Segundo a ronda de imprensa da BBC Sport, o Liverpool acredita poder superar Arsenal e Bayern Munique na disputa por Bradley Barcola, extremo do Paris Saint-Germain. A informação é tratada como reporte de mercado: não existe anúncio de acordo, nem confirmação pública de proposta aceite.",
    summary_en: "According to BBC Sport's transfer round-up, Liverpool believe they can beat Arsenal and Bayern Munich to Paris Saint-Germain winger Bradley Barcola. This remains a reported market development: there has been no announcement of an agreement or a publicly confirmed accepted bid.",
    tag: "TRANSFER",
    source: "BBC Sport — Gossip",
    url: "https://www.bbc.com/sport/football/articles/c78gx10d9n4o",
    time: "23/07/2026",
    engagement: "~3.2M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Fulham Abre Conversações por Gonzalo García do Real Madrid",
    title_en: "⚡ TRANSFER: Fulham Open Talks for Real Madrid Forward Gonzalo García",
    summary: "O Fulham abriu negociações por Gonzalo García, avançado do Real Madrid, segundo informação do The Athletic repercutida pela BBC. O potencial negócio ainda está em fase de conversações, mas colocaria o jogador de 22 anos no projeto de Álvaro Arbeloa em Craven Cottage.",
    summary_en: "Fulham have opened talks for Real Madrid forward Gonzalo García, according to The Athletic in a report also carried by the BBC. The potential move remains at the negotiation stage, but it could reunite the 22-year-old with Álvaro Arbeloa's project at Craven Cottage.",
    tag: "TRANSFER",
    source: "The Athletic / BBC Sport",
    url: "https://www.nytimes.com/athletic/7461888/2026/07/22/fulham-real-madrid-gonzalo-garcia-transfer/",
    time: "23/07/2026",
    engagement: "~1.3M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Ajax, Benfica e Panathinaikos Entram em Ação na Noite Europeia",
    title_en: "🔥 HOT: Ajax, Benfica and Panathinaikos Take Centre Stage in Europe",
    summary: "A segunda ronda de qualificação europeia concentra jogos de enorme tradição: a BBC lista Vojvodina-Ajax e Paks-Panathinaikos na Conference League, enquanto o Benfica visita o St. Gallen na Europa League. A UEFA confirma que a ronda da Conference League decorre entre 21 e 23 de julho.",
    summary_en: "Europe's second qualifying round brings several high-profile fixtures: the BBC lists Vojvodina-Ajax and Paks-Panathinaikos in the Conference League, while Benfica visit St. Gallen in the Europa League. UEFA confirms that the Conference League round runs from 21 to 23 July.",
    tag: "HOT",
    source: "UEFA / BBC Sport",
    url: "https://www.uefa.com/uefaconferenceleague/news/02a6-20e5e911587f-cc10425958b3-1000--conference-league-qualifying-fixtures-results-dates-how-it-/",
    time: "23/07/2026",
    engagement: "~1.9M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Flamengo Aplica 4-0 à Chapecoense no Brasileirão",
    title_en: "🔥 HOT: Flamengo Hit Chapecoense for Four in Brasileirão Statement",
    summary: "O feed de resultados da BBC Sport registou uma vitória do Flamengo por 4-0 sobre a Chapecoense no Brasileirão. O resultado reforça o peso ofensivo da equipa carioca e fecha uma das exibições mais expressivas da jornada no futebol brasileiro.",
    summary_en: "BBC Sport's results feed recorded Flamengo's 4-0 Brasileirão win over Chapecoense. The result underlines the Rio side's attacking strength and stands as one of the most emphatic performances of the Brazilian matchday.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/scores-fixtures/2026-07-23",
    time: "23/07/2026",
    engagement: "~1.7M",
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
