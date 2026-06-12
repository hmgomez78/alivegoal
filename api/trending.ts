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

// Notícias curadas — atualizadas 12/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Mourinho CONFIRMA regresso ao Real Madrid após 13 anos! Contrato de 3 anos assinado!",
    title_en: "🚨 BREAKING: Mourinho CONFIRMED back at Real Madrid after 13 years! Three-year contract signed!",
    summary: "O SPECIAL ONE ESTÁ DE VOLTA! O Real Madrid confirmou oficialmente o regresso de José Mourinho como treinador principal, 13 anos depois de deixar o Bernabéu. O técnico português, de 63 anos, assina um contrato de 3 anos até junho de 2029 e inicia funções a 13 de julho. Mourinho chega depois de uma época caótica: Xabi Alonso foi despedido em janeiro, Valverde foi hospitalizado após confronto com Tchouaméni, e o Barça venceu a Liga. Florentino Pérez, reeleito presidente, apostou no 'Special One' para restaurar a ordem e o sucesso.",
    summary_en: "THE SPECIAL ONE IS BACK! Real Madrid officially confirmed José Mourinho's return as head coach, 13 years after leaving the Bernabéu. The 63-year-old Portuguese manager signs a three-year contract until June 2029 and starts on July 13. Mourinho arrives after a chaotic season: Xabi Alonso was sacked in January, Valverde was hospitalised after a confrontation with Tchouaméni, and Barcelona won La Liga. Florentino Pérez, re-elected as president, bet on the 'Special One' to restore order and success.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "38.7M",
  },
  {
    id: "t2",
    title: "💥 TRANSFER: Bernardo Silva ao Real Madrid — Mourinho pediu pessoalmente e negócio está avançado!",
    title_en: "💥 TRANSFER: Bernardo Silva to Real Madrid — Mourinho personally requested and deal is advanced!",
    summary: "BOMBA DE TRANSFERÊNCIA! Mal foi confirmado como treinador do Real Madrid, José Mourinho fez o seu primeiro pedido ao clube: Bernardo Silva. O médio português do Manchester City é o alvo número 1 do novo treinador merengue, e a ESPN confirma que as negociações estão avançadas. O Barça esteve muito perto de fechar o acordo, mas a preferência de Bernardo é o Real Madrid. O City pede cerca de 80 milhões de euros pelo internacional português. Uma parceria Mourinho-Bernardo no Bernabéu pode ser devastadora para a concorrência.",
    summary_en: "TRANSFER BOMB! No sooner was he confirmed as Real Madrid manager, José Mourinho made his first request to the club: Bernardo Silva. The Portuguese Manchester City midfielder is the new Merengue coach's number one target, and ESPN confirms talks are advanced. Barcelona came very close to closing the deal, but Bernardo's preference is Real Madrid. City are asking around €80 million for the Portuguese international. A Mourinho-Bernardo partnership at the Bernabéu could be devastating for the competition.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "22.4M",
  },
  {
    id: "t3",
    title: "🔥 SCANDAL: 3 CARTÕES VERMELHOS no jogo de abertura do Mundial! VAR em polêmica histórica no Azteca!",
    title_en: "🔥 SCANDAL: 3 RED CARDS in the World Cup opener! VAR in historic controversy at the Azteca!",
    summary: "CAOS NO JOGO DE ABERTURA! O México venceu a África do Sul por 2-0 no Azteca, mas o jogo ficou marcado por 3 cartões vermelhos — um recorde para um jogo de abertura de Mundial. Sphephelo Sithole foi expulso por falta sobre o último defesa no primeiro tempo. No segundo tempo, mais dois jogadores sul-africanos foram expulsos, deixando a África do Sul com 8 jogadores. O VAR foi chamado múltiplas vezes em decisões polémicas, e a Fox Sports foi criticada por cortar para publicidade durante o jogo, perdendo momentos de ação. Um arranque histórico mas caótico para o maior Mundial de sempre.",
    summary_en: "CHAOS IN THE OPENING MATCH! Mexico beat South Africa 2-0 at the Azteca, but the game was marked by 3 red cards — a record for a World Cup opening match. Sphephelo Sithole was sent off for a foul on the last defender in the first half. In the second half, two more South African players were sent off, leaving them with 8 men. VAR was called multiple times in controversial decisions, and Fox Sports was criticised for cutting to adverts during the game, missing moments of action. A historic but chaotic start to the biggest World Cup ever.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "29.1M",
  },
  {
    id: "t4",
    title: "⚽ HOT: Raúl Jiménez marca o PRIMEIRO GOL da sua carreira no Mundial — 6 anos após fratura no crânio!",
    title_en: "⚽ HOT: Raúl Jiménez scores his FIRST EVER World Cup goal — 6 years after near-fatal skull fracture!",
    summary: "MOMENTO DE PURA EMOÇÃO! Raúl Jiménez, o avançado mexicano que quase morreu em 2020 após uma fratura no crânio, marcou o segundo golo do México contra a África do Sul com um cabeceamento sublime. Após 6 aparições em 3 Mundiais sem marcar, o veterano de 35 anos finalmente abriu a conta no maior palco do futebol. Jiménez usa um capacete especial desde a lesão e disse que 'é um milagre estar aqui'. O Azteca explodiu em emoção com o golo do herói nacional. Julián Quiñones tinha marcado o primeiro golo do torneio ao minuto 9.",
    summary_en: "A MOMENT OF PURE EMOTION! Raúl Jiménez, the Mexican striker who nearly died in 2020 after a skull fracture, scored Mexico's second goal against South Africa with a sublime header. After 6 appearances at 3 World Cups without scoring, the 35-year-old veteran finally opened his account on football's biggest stage. Jiménez has worn a special headguard since the injury and said it is 'a miracle to be here'. The Azteca exploded with emotion at the national hero's goal. Julián Quiñones had scored the tournament's first goal in the 9th minute.",
    tag: "HOT",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "18.3M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Alphonso Davies FORA do jogo de abertura do Canadá! Lesão no tendão preocupa seleção!",
    title_en: "🚨 BREAKING: Alphonso Davies OUT of Canada's opening match! Hamstring injury worries national team!",
    summary: "DRAMA NO CANADÁ! Alphonso Davies, capitão e maior estrela da seleção canadiana, foi confirmado como ausente para o jogo de abertura contra a Bósnia-Herzegovina esta sexta-feira em Toronto. O lateral do Bayern Munique está a recuperar de uma lesão no tendão e treina separadamente. O selecionador Jesse Marsch disse que uma ressonância magnética mostrou 'sinais positivos' e que Davies tem um fisioterapeuta privado a acompanhá-lo. O Canadá, que joga em casa no BMO Field, terá de defrontar a Bósnia sem o seu jogador mais valioso nesta estreia histórica no Mundial.",
    summary_en: "DRAMA IN CANADA! Alphonso Davies, captain and biggest star of the Canadian national team, has been confirmed as absent for the opening match against Bosnia-Herzegovina on Friday in Toronto. The Bayern Munich full-back is recovering from a hamstring injury and is training separately. Coach Jesse Marsch said an MRI showed 'positive signs' and that Davies has a private physio helping him. Canada, playing at home at BMO Field, will have to face Bosnia without their most valuable player in this historic World Cup debut.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "14.6M",
  },
  {
    id: "t6",
    title: "💥 TRANSFER: Man City lança oferta recorde de 106M£ por Elliot Anderson — Forest exige 150M€!",
    title_en: "💥 TRANSFER: Man City launch record £106M bid for Elliot Anderson — Forest demand €150M!",
    summary: "GUERRA DE VALORES! O Manchester City escalou a sua proposta por Elliot Anderson para 106 milhões de libras, mas o Nottingham Forest rejeitou liminarmente a oferta e mantém a exigência de 150 milhões de euros pelo médio inglês. O jovem de 22 anos foi a grande revelação da Premier League esta época e Pep Guardiola considera-o o substituto ideal para Rodri. Em paralelo, o Real Madrid entrou na corrida por Michael Olise, apesar da resistência do Bayern Munique. O mercado de verão promete ser o mais caro de sempre, com o Mundial a servir de montra para os melhores talentos.",
    summary_en: "BATTLE OF VALUES! Manchester City escalated their bid for Elliot Anderson to £106 million, but Nottingham Forest flatly rejected the offer and maintain their demand of €150 million for the English midfielder. The 22-year-old was the Premier League's standout player this season and Pep Guardiola considers him the ideal replacement for Rodri. Meanwhile, Real Madrid have entered the race for Michael Olise, despite Bayern Munich's resistance. The summer transfer window promises to be the most expensive ever, with the World Cup serving as a showcase for the best talents.",
    tag: "TRANSFER",
    source: "@DailyMail",
    url: "https://x.com/alivegoal",
    time: "12/06/2026",
    engagement: "12.8M",
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
