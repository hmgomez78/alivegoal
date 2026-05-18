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

// Notícias curadas — atualizadas 18/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 XABI ALONSO CONFIRMADO NO CHELSEA! Contrato de 4 anos assinado — Liverpool em choque ao perder o seu ídolo para o rival londrino!",
    title_en: "🚨 XABI ALONSO CONFIRMED AT CHELSEA! Four-year contract signed — Liverpool in shock as they lose their idol to London rivals!",
    summary: "BOMBA TOTAL NO FUTEBOL INGLÊS! Xabi Alonso foi oficialmente confirmado como novo treinador do Chelsea com um contrato de 4 anos, numa das contratações mais surpreendentes da história recente do futebol europeu. O ex-médio espanhol, que fez história no Bayer Leverkusen ao ganhar a Bundesliga de forma invicta em 2023/24, torna-se agora o grande projeto do Chelsea para os próximos anos. O Liverpool, que estava na corrida para contratar Alonso como substituto de Arne Slot, vê o seu ídolo ir diretamente para o rival londrino — uma ironia cruel para os adeptos de Anfield. Alonso já terá pedido reforços de topo, com Morgan Rogers do Aston Villa e um novo guarda-redes no topo da sua lista de desejos. O Chelsea prepara-se para uma revolução total no plantel e na filosofia de jogo. Esta é, sem dúvida, a contratação de treinador do verão de 2026!",
    summary_en: "TOTAL BOMB IN ENGLISH FOOTBALL! Xabi Alonso has been officially confirmed as Chelsea's new manager on a four-year contract, in one of the most surprising appointments in recent European football history. The former Spanish midfielder, who made history at Bayer Leverkusen by winning the Bundesliga unbeaten in 2023/24, now becomes Chelsea's grand project for the coming years. Liverpool, who were in the race to sign Alonso as Arne Slot's replacement, see their idol go directly to their London rivals — a cruel irony for Anfield fans. Alonso has reportedly already requested top reinforcements, with Morgan Rogers from Aston Villa and a new goalkeeper at the top of his wishlist. Chelsea are set for a total revolution in squad and playing philosophy. This is, without doubt, the managerial signing of the summer of 2026!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "28.4M",
  },
  {
    id: "t2",
    title: "🔥 MOURINHO A HORAS DE SER ANUNCIADO NO REAL MADRID! Reunião com Florentino esta semana — Benfica em pânico total à procura de substituto urgente!",
    title_en: "🔥 MOURINHO HOURS AWAY FROM REAL MADRID ANNOUNCEMENT! Meeting with Florentino this week — Benfica in total panic searching for urgent replacement!",
    summary: "O SPECIAL ONE REGRESSA AO BERNABÉU! José Mourinho está a horas de ser confirmado como novo treinador do Real Madrid, segundo o The Athletic, Sky Sports e Fabrizio Romano em uníssono. O treinador português, que conduziu o Benfica a uma época histórica e invicta na Liga Portugal, vai reunir-se com o presidente Florentino Pérez ainda esta semana para finalizar os detalhes de um contrato de 3 anos. Mourinho terá exigido controlo total sobre as transferências e poder de veto sobre qualquer contratação — condições que o Real Madrid aceitou. O Benfica, que esperava renovar com o técnico, está agora em pânico e já contactou Rúben Amorim, Roger Schmidt e até Sérgio Conceição como alternativas de emergência. O Bernabéu, que o vaiou na sua primeira passagem, prepara-se para recebê-lo de volta como o 'salvador' após uma temporada de pesadelo. Mbappé e Vinicius, que foram vaiados pelos próprios adeptos, terão de se adaptar ao estilo pragmático do 'Special One'. O regresso mais esperado do futebol europeu está prestes a acontecer!",
    summary_en: "THE SPECIAL ONE RETURNS TO THE BERNABEU! José Mourinho is hours away from being confirmed as Real Madrid's new manager, according to The Athletic, Sky Sports and Fabrizio Romano in unison. The Portuguese manager, who led Benfica to a historic unbeaten season in the Portuguese league, will meet president Florentino Pérez this week to finalise details of a 3-year contract. Mourinho reportedly demanded full control over transfers and veto power over any signing — conditions Real Madrid accepted. Benfica, who hoped to renew with the manager, are now in panic and have already contacted Rúben Amorim, Roger Schmidt and even Sérgio Conceição as emergency alternatives. The Bernabeu, which once booed him, prepares to welcome him back as the 'saviour' after a nightmare season. Mbappé and Vinicius, who were booed by their own fans, will have to adapt to the 'Special One's' pragmatic style. The most anticipated return in European football is about to happen!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "23.1M",
  },
  {
    id: "t3",
    title: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 ARSENAL vs BURNLEY HOJE 19:00 — Gunners podem garantir Top 4 com vitória! Tudo em jogo na Premier League!",
    title_en: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 ARSENAL vs BURNLEY TODAY 19:00 — Gunners can secure Top 4 with win! Everything at stake in the Premier League!",
    summary: "DRAMA TOTAL NA PREMIER LEAGUE! O Arsenal recebe o Burnley hoje às 19:00 num jogo de enorme importância para a classificação final da Premier League 2025/26. Os Gunners, que tiveram uma temporada irregular, precisam desta vitória para garantir a sua vaga na UEFA Champions League da próxima época. O Burnley, já relegado, vai ao Emirates sem pressão mas com orgulho para defender. Arteta tem toda a equipa disponível e promete um Arsenal agressivo e determinado. Do outro lado, o Burnley vai tentar estragar a festa dos Gunners numa despedida digna da Premier League. A atmosfera no Emirates vai ser elétrica! Além deste jogo, a jornada de amanhã (19 de Maio) é o último dia da época com Chelsea vs Tottenham, Liverpool vs Brentford e Manchester City vs Aston Villa — tudo em jogo na luta pelo Top 4 e pela descida!",
    summary_en: "TOTAL DRAMA IN THE PREMIER LEAGUE! Arsenal host Burnley today at 19:00 in a hugely important game for the final Premier League 2025/26 standings. The Gunners, who had an inconsistent season, need this win to secure their place in next season's UEFA Champions League. Burnley, already relegated, head to the Emirates without pressure but with pride to defend. Arteta has the full squad available and promises an aggressive, determined Arsenal. On the other side, Burnley will try to spoil the Gunners' party in a worthy Premier League farewell. The atmosphere at the Emirates will be electric! Beyond this game, tomorrow's round (May 19) is the final day of the season with Chelsea vs Tottenham, Liverpool vs Brentford and Manchester City vs Aston Villa — everything at stake in the fight for Top 4 and relegation!",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "17.8M",
  },
  {
    id: "t4",
    title: "⚡ SPORTING CONTRATA PEDRO LIMA! Médio chega hoje a Lisboa para exames médicos — segundo reforço confirmado para 2026/27!",
    title_en: "⚡ SPORTING SIGN PEDRO LIMA! Midfielder arrives in Lisbon today for medical — second confirmed signing for 2026/27!",
    summary: "REFORÇO CONFIRMADO EM ALVALADE! O Sporting CP anunciou a contratação do médio Pedro Lima, que chega esta segunda-feira a Lisboa para realizar os exames médicos e formalizar a sua transferência para o clube leonino por cinco temporadas. Este é o segundo reforço do Sporting para a época 2026/27, confirmando a ambição do clube em manter-se competitivo na Liga Portugal e na Europa. Pedro Lima, que se destacou na época passada, é visto como uma peça fundamental para o sistema de jogo do treinador. A sua chegada é um sinal claro de que o Sporting não vai ficar parado no mercado de transferências de verão, apesar da ameaça de perder Viktor Gyökeres para o Manchester United. O Sporting está a construir uma equipa para lutar pelo título e pela Champions League 2026/27!",
    summary_en: "SIGNING CONFIRMED AT ALVALADE! Sporting CP have announced the signing of midfielder Pedro Lima, who arrives in Lisbon this Monday to undergo medical tests and formalise his transfer to the Lions for five seasons. This is Sporting's second signing for the 2026/27 season, confirming the club's ambition to remain competitive in the Portuguese league and in Europe. Pedro Lima, who stood out last season, is seen as a key piece in the manager's playing system. His arrival is a clear sign that Sporting will not stand still in the summer transfer market, despite the threat of losing Viktor Gyökeres to Manchester United. Sporting are building a team to fight for the title and the Champions League 2026/27!",
    tag: "TRANSFER",
    source: "@Sapo",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "12.6M",
  },
  {
    id: "t5",
    title: "🚨 ESCÂNDALO 'SPYGATE' NO SOUTHAMPTON! Tonda Eckert pode ser banido por longa temporada — clube enfrenta punição histórica!",
    title_en: "🚨 'SPYGATE' SCANDAL AT SOUTHAMPTON! Tonda Eckert could face lengthy ban — club faces historic punishment!",
    summary: "ESCÂNDALO CHOCA O FUTEBOL INGLÊS! O Southampton está envolvido num dos maiores escândalos da história recente do futebol inglês, apelidado de 'Spygate', e o jogador Tonda Eckert pode enfrentar uma suspensão de longa duração caso o clube seja considerado culpado pelas acusações. Segundo o FlashScore USA, o caso envolve alegações de espionagem de treinos adversários e recolha ilegal de informação táctica, práticas que violam gravemente os regulamentos da FA e da Premier League. A investigação está em curso e o Southampton, que já enfrenta problemas desportivos sérios, pode ver a sua situação agravar-se dramaticamente com punições que incluem deduções de pontos ou até exclusão de competições. O caso está a chocar o mundo do futebol inglês e pode ter implicações para toda a liga. Eckert, que é um dos jogadores mais importantes do clube, nega qualquer envolvimento pessoal nas alegadas práticas!",
    summary_en: "SCANDAL SHOCKS ENGLISH FOOTBALL! Southampton are embroiled in one of the biggest scandals in recent English football history, dubbed 'Spygate', and player Tonda Eckert could face a lengthy ban if the club is found guilty of the charges. According to FlashScore USA, the case involves allegations of spying on opponents' training sessions and illegal collection of tactical information, practices that seriously violate FA and Premier League regulations. The investigation is ongoing and Southampton, who already face serious sporting problems, could see their situation worsen dramatically with punishments including points deductions or even exclusion from competitions. The case is shocking the English football world and could have implications for the entire league. Eckert, one of the club's most important players, denies any personal involvement in the alleged practices!",
    tag: "SCANDAL",
    source: "@FlashScore",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "15.3M",
  },
  {
    id: "t6",
    title: "💰 HULK APRESENTADO NO FLUMINENSE! Lenda do futebol brasileiro assina e promete 'transparência total' — estreia pode ser já esta semana!",
    title_en: "💰 HULK UNVEILED AT FLUMINENSE! Brazilian football legend signs and promises 'total transparency' — debut could come this week!",
    summary: "A LENDA ESTÁ DE VOLTA! Hulk foi apresentado oficialmente pelo Fluminense no dia 16 de Maio de 2026, numa cerimónia emocionante que reuniu centenas de adeptos no Maracanã. O avançado brasileiro, que fez história no Porto, Zenit e Atlético Mineiro, revelou que a 'transparência e o respeito' na negociação foram decisivos para a sua escolha pelo Fluminense. Hulk, que recebeu apoio de vários ídolos do clube carioca, prometeu dar tudo pelo Flu e ajudar a equipa a conquistar títulos. A sua estreia pode acontecer já esta semana, com o Fluminense a preparar-se para jogos decisivos no Brasileirão Série A. A contratação de Hulk é vista como um sinal da ambição do Fluminense em voltar ao topo do futebol brasileiro após uma época difícil. O Maracanã vai vibrar com o regresso de uma das maiores lendas do futebol brasileiro!",
    summary_en: "THE LEGEND IS BACK! Hulk was officially unveiled by Fluminense on May 16, 2026, in an emotional ceremony that gathered hundreds of fans at the Maracanã. The Brazilian striker, who made history at Porto, Zenit and Atlético Mineiro, revealed that 'transparency and respect' in the negotiation were decisive in his choice of Fluminense. Hulk, who received support from several club legends, promised to give everything for Flu and help the team win titles. His debut could come as early as this week, with Fluminense preparing for decisive Brasileirão Série A games. Hulk's signing is seen as a sign of Fluminense's ambition to return to the top of Brazilian football after a difficult season. The Maracanã will vibrate with the return of one of the greatest legends of Brazilian football!",
    tag: "TRANSFER",
    source: "@Placar",
    url: "https://x.com/alivegoal",
    time: "18/05/2026",
    engagement: "11.9M",
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
