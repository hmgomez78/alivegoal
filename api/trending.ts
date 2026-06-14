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

// Notícias curadas — atualizadas 14/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 SCANDAL: Equipamento da Inglaterra ROUBADO a caminho de Kansas City! Chuteiras de Kane e Bellingham desaparecidas!",
    title_en: "🚨 SCANDAL: England's equipment STOLEN en route to Kansas City! Kane and Bellingham boots missing!",
    summary: "ESCÂNDALO NO MUNDIAL 2026! A seleção inglesa sofreu um roubo chocante durante a transferência do seu campo de treinos na Florida para Kansas City, onde vai disputar os jogos da fase de grupos. Entre os itens roubados estão as chuteiras personalizadas de Harry Kane e Jude Bellingham, bolas oficiais, material de análise tática e equipamentos técnicos essenciais para o staff de Thomas Tuchel. A polícia de Kansas City abriu uma investigação e deteve dois suspeitos. A federação inglesa está numa corrida contra o tempo para repor o material antes do jogo de estreia contra a Croácia na quarta-feira. O incidente reacende o debate sobre a segurança no maior Mundial de sempre, depois de seleções como o Irão, Senegal e Uzbequistão já terem reportado problemas nas fronteiras americanas. Tuchel, que sonha com o primeiro título mundial inglês em 60 anos, já tem um inimigo inesperado: os ladrões.",
    summary_en: "SCANDAL AT WORLD CUP 2026! The England national team suffered a shocking theft during their transfer from their Florida training camp to Kansas City, where they will play their group stage matches. Among the stolen items are the custom-made boots of Harry Kane and Jude Bellingham, official balls, tactical analysis material and technical equipment essential for Thomas Tuchel's staff. Kansas City police have opened an investigation and detained two suspects. The English federation is in a race against time to replace the equipment before their opening match against Croatia on Wednesday. The incident reignites the debate about security at the biggest World Cup ever, after teams like Iran, Senegal and Uzbekistan had already reported problems at US borders. Tuchel, who dreams of England's first World Cup title in 60 years, already has an unexpected enemy: thieves.",
    tag: "SCANDAL",
    source: "@DailyMail",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "47.3M",
  },
  {
    id: "t2",
    title: "🔥 BREAKING: Brasil 1-1 Marrocos — Vinícius salva o Brasil mas Saibari choca o mundo! Ancelotti em apuros!",
    title_en: "🔥 BREAKING: Brazil 1-1 Morocco — Vinícius saves Brazil but Saibari shocks the world! Ancelotti in trouble!",
    summary: "RESULTADO HISTÓRICO NO MUNDIAL 2026! O Brasil de Carlo Ancelotti empatou 1-1 com Marrocos no MetLife Stadium de Nova Iorque, num resultado que abalou o mundo do futebol. Ismael Saibari abriu o marcador para Marrocos com um contra-ataque clínico que deixou a defesa brasileira exposta, antes de Vinícius Júnior empatar com um golo brilhante. Apesar de várias oportunidades, nenhuma das equipas conseguiu o segundo golo. O Brasil sem Neymar (ainda a recuperar de lesão) mostrou fragilidades defensivas preocupantes. Ancelotti admitiu que a equipa precisa de melhorar para os próximos jogos. Marrocos prova novamente que é uma das seleções mais perigosas do mundo, depois das meias-finais em 2022. O Grupo C está completamente em aberto com Brasil e Marrocos empatados a 1 ponto.",
    summary_en: "HISTORIC RESULT AT WORLD CUP 2026! Carlo Ancelotti's Brazil drew 1-1 with Morocco at MetLife Stadium in New York, in a result that shook the football world. Ismael Saibari opened the scoring for Morocco with a clinical counter-attack that left the Brazilian defence exposed, before Vinícius Júnior equalised with a brilliant goal. Despite several opportunities, neither team could find a second goal. Brazil without Neymar (still recovering from injury) showed worrying defensive frailties. Ancelotti admitted the team needs to improve for the next games. Morocco once again prove they are one of the most dangerous teams in the world, after their 2022 semi-final run. Group C is completely open with Brazil and Morocco level on 1 point.",
    tag: "BREAKING",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "38.9M",
  },
  {
    id: "t3",
    title: "💥 TRANSFER: Liverpool prepara oferta RECORDE para substituir Salah! Barcola, Diomandé e Bazoumana Touré na lista!",
    title_en: "💥 TRANSFER: Liverpool prepare RECORD offer to replace Salah! Barcola, Diomandé and Bazoumana Touré on the list!",
    summary: "A MAIOR TRANSFERÊNCIA DO VERÃO? Fabrizio Romano confirmou que o Liverpool tem uma lista de três nomes para substituir Mohamed Salah, que deixou o clube no final da época: Bradley Barcola (PSG), Yan Diomandé (Sporting CP) e Bazoumana Touré. O Liverpool está disposto a gastar mais de 100 milhões de euros para garantir um substituto de qualidade para o egípcio, que foi o melhor marcador da Premier League nas últimas temporadas. Barcola é o favorito mas o PSG pede 120 milhões de euros. Yan Diomandé, que foi uma das revelações do Sporting CP esta época, pode ser a opção mais acessível a cerca de 70 milhões. O Arsenal também está interessado em Barcola, o que pode desencadear uma guerra de licitações entre os dois rivais de Londres. Uma das novelas de transferências mais emocionantes do verão.",
    summary_en: "THE BIGGEST TRANSFER OF THE SUMMER? Fabrizio Romano confirmed that Liverpool have a three-man shortlist to replace Mohamed Salah, who left the club at the end of the season: Bradley Barcola (PSG), Yan Diomandé (Sporting CP) and Bazoumana Touré. Liverpool are willing to spend over €100 million to secure a quality replacement for the Egyptian, who was the Premier League's top scorer in recent seasons. Barcola is the favourite but PSG are asking for €120 million. Yan Diomandé, who was one of Sporting CP's revelations this season, could be the more affordable option at around €70 million. Arsenal are also interested in Barcola, which could trigger a bidding war between the two London rivals. One of the most exciting transfer sagas of the summer.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "29.4M",
  },
  {
    id: "t4",
    title: "⚽ HOT: Alemanha vs Curaçao HOJE — Wirtz estreia-se no Mundial! O maior David vs Golias da história do torneio!",
    title_en: "⚽ HOT: Germany vs Curaçao TODAY — Wirtz makes World Cup debut! The biggest David vs Goliath in tournament history!",
    summary: "O JOGO MAIS DESEQUILIBRADO DO MUNDIAL 2026! A Alemanha de Julian Nagelsmann enfrenta hoje Curaçao no NRG Stadium de Houston, no que é provavelmente o maior desequilíbrio de toda a história dos Mundiais. Curaçao, com apenas 158.000 habitantes, é a menor nação a qualificar-se para um Mundial em termos de população e área. O treinador Dick Advocaat, de 78 anos, torna-se o mais velho da história do torneio. Florian Wirtz, o craque do Liverpool de 23 anos, faz a sua estreia num Mundial após uma época brilhante com 5 golos e 4 assistências na Premier League. A Alemanha, que falhou a fase de grupos em 2018 e 2022, quer mostrar que voltou ao topo. As odds colocam a Alemanha como favorita esmagadora (-2000). Mas Curaçao tem 25 dos 26 jogadores nascidos na Holanda e o capitão Leandro Bacuna com 15 golos internacionais.",
    summary_en: "THE MOST UNBALANCED MATCH AT WORLD CUP 2026! Julian Nagelsmann's Germany face Curaçao today at NRG Stadium in Houston, in what is probably the biggest mismatch in World Cup history. Curaçao, with only 158,000 inhabitants, is the smallest nation ever to qualify for a World Cup in terms of population and area. Manager Dick Advocaat, aged 78, becomes the oldest in tournament history. Florian Wirtz, Liverpool's 23-year-old star, makes his World Cup debut after a brilliant season with 5 goals and 4 assists in the Premier League. Germany, who failed to get out of the group stage in 2018 and 2022, want to show they are back at the top. The odds make Germany overwhelming favourites (-2000). But Curaçao have 25 of their 26 players born in the Netherlands and captain Leandro Bacuna with 15 international goals.",
    tag: "HOT",
    source: "@FoxSports",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "24.1M",
  },
  {
    id: "t5",
    title: "🚨 TRANSFER: Arsenal vs PSG pela joia Ayyoub Bouaddi! Gunners dispostos a pagar 80M€ pelo médio de 19 anos!",
    title_en: "🚨 TRANSFER: Arsenal vs PSG for jewel Ayyoub Bouaddi! Gunners willing to pay €80M for 19-year-old midfielder!",
    summary: "BATALHA DE GIGANTES POR BOUADDI! O Arsenal está a tentar bater o PSG na corrida por Ayyoub Bouaddi, o jovem médio marroquino de 19 anos do LOSC Lille, considerado um dos maiores talentos da Europa. Segundo o jornalista Sacha Tavolieri, o Arsenal está disposto a pagar 80 milhões de euros pelo jogador, que brilhou no Mundial 2026 com Marrocos ao lado de Hakimi e Saibari. O PSG também está interessado e pode oferecer mais dinheiro. Bouaddi, que joga como médio defensivo mas tem capacidade ofensiva impressionante, foi comparado a N'Golo Kanté pela imprensa francesa. O Lille não quer vender mas pode ser forçado a aceitar uma oferta acima de 75 milhões. Uma das transferências mais quentes do mercado de verão que está prestes a abrir.",
    summary_en: "BATTLE OF GIANTS FOR BOUADDI! Arsenal are trying to beat PSG in the race for Ayyoub Bouaddi, the 19-year-old Moroccan midfielder from LOSC Lille, considered one of Europe's biggest talents. According to journalist Sacha Tavolieri, Arsenal are willing to pay €80 million for the player, who shone at World Cup 2026 with Morocco alongside Hakimi and Saibari. PSG are also interested and could offer more money. Bouaddi, who plays as a defensive midfielder but has impressive offensive ability, has been compared to N'Golo Kanté by the French press. Lille don't want to sell but may be forced to accept an offer above €75 million. One of the hottest transfers of the summer market that is about to open.",
    tag: "TRANSFER",
    source: "@SachaTavolieri",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "21.8M",
  },
  {
    id: "t6",
    title: "💥 HOT: Holanda vs Japão HOJE — Van Dijk lidera os Laranja contra o Japão em forma! Grupo F em chamas!",
    title_en: "💥 HOT: Netherlands vs Japan TODAY — Van Dijk leads the Oranje against in-form Japan! Group F on fire!",
    summary: "O DUELO DO DIA NO MUNDIAL 2026! A Holanda de Ronald Koeman enfrenta o Japão no Dallas Stadium, num jogo do Grupo F que pode ser mais equilibrado do que as odds sugerem. A Holanda chega como favorita com Memphis Depay (33 anos) como principal goleador e Virgil van Dijk (34) como capitão. Mas o Japão, liderado por Ayase Ueda (25 golos no Feyenoord esta época) e Daizen Maeda (16 golos no Celtic), é uma equipa cheia de confiança após dominar a qualificação asiática com 54 golos marcados e apenas 3 sofridos. O guarda-redes Zion Suzuki, nascido em Newark (EUA) e filho de mãe japonesa e pai ganês, é a grande esperança nipónica. A Holanda, que nunca venceu o Mundial mas foi finalista 3 vezes, quer mostrar que pode ir longe neste torneio. As odds: Holanda -180, Empate +320, Japão +450.",
    summary_en: "THE MATCH OF THE DAY AT WORLD CUP 2026! Ronald Koeman's Netherlands face Japan at Dallas Stadium, in a Group F match that could be more balanced than the odds suggest. The Netherlands arrive as favourites with Memphis Depay (33 years old) as their main scorer and Virgil van Dijk (34) as captain. But Japan, led by Ayase Ueda (25 goals at Feyenoord this season) and Daizen Maeda (16 goals at Celtic), are a confident team after dominating Asian qualifying with 54 goals scored and only 3 conceded. Goalkeeper Zion Suzuki, born in Newark (USA) to a Japanese mother and Ghanaian father, is Japan's great hope. The Netherlands, who have never won the World Cup but have been finalists 3 times, want to show they can go far in this tournament. The odds: Netherlands -180, Draw +320, Japan +450.",
    tag: "HOT",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "14/06/2026",
    engagement: "19.7M",
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
