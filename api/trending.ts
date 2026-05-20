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
// Notícias curadas — atualizadas 20/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 ARSENAL CAMPEÃO DA PREMIER LEAGUE APÓS 22 ANOS! Os Gunners conquistam o título histórico com Man City a empatar com o Bournemouth!",
    title_en: "🏆 ARSENAL PREMIER LEAGUE CHAMPIONS AFTER 22 YEARS! The Gunners clinch the historic title as Man City draw with Bournemouth!",
    summary: "HISTÓRIA ESCRITA EM LETRAS DE OURO! O Arsenal é campeão da Premier League pela primeira vez em 22 anos! Após o Manchester City empatar 1-1 com o Bournemouth na jornada 37, os Gunners de Mikel Arteta garantiram matematicamente o título, encerrando um jejum que durava desde a temporada dos Invencíveis de 2003/04. As celebrações explodiram no Emirates Stadium e pelas ruas de Londres. Kai Havertz, Bukayo Saka e toda a equipa foram ovacionados pelos adeptos em delírio. Um momento que ficará para sempre na história do futebol inglês!",
    summary_en: "HISTORY WRITTEN IN GOLDEN LETTERS! Arsenal are Premier League champions for the first time in 22 years! After Manchester City drew 1-1 with Bournemouth in matchweek 37, Mikel Arteta's Gunners mathematically secured the title, ending a drought dating back to the Invincibles season of 2003/04. Celebrations erupted at the Emirates Stadium and across the streets of London. Kai Havertz, Bukayo Saka and the entire squad were cheered by delirious fans. A moment that will forever remain in English football history!",
    tag: "BREAKING",
    source: "@PremierLeague",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "89.4M",
  },
  {
    id: "t2",
    title: "🚨 ESCÂNDALO! SOUTHAMPTON EXPULSO DOS PLAY-OFFS DO CHAMPIONSHIP POR ESPIONAGEM! Middlesbrough enfrenta Hull City na final de Wembley!",
    title_en: "🚨 SCANDAL! SOUTHAMPTON EXPELLED FROM CHAMPIONSHIP PLAY-OFFS FOR SPYING! Middlesbrough to face Hull City in Wembley final!",
    summary: "CHOQUE NO FUTEBOL INGLÊS! O Southampton foi expulso dos play-offs do Championship pela EFL após ser declarado culpado de espionagem ilegal a múltiplos adversários durante a época 2025/26. O clube admitiu ter filmado ilegalmente treinos do Middlesbrough e de outros clubes antes dos jogos dos play-offs. A sanção inclui a expulsão imediata e uma multa pesada. O Middlesbrough avança agora para a final de Wembley contra o Hull City no sábado. Os adeptos do Southampton estão furiosos e o clube anunciou recurso imediato da decisão.",
    summary_en: "SHOCK IN ENGLISH FOOTBALL! Southampton have been expelled from the Championship play-offs by the EFL after being found guilty of illegally spying on multiple opponents during the 2025/26 season. The club admitted to illegally filming Middlesbrough's and other clubs' training sessions ahead of play-off matches. The sanction includes immediate expulsion and a heavy fine. Middlesbrough now advance to the Wembley final against Hull City on Saturday. Southampton fans are furious and the club announced an immediate appeal.",
    tag: "SCANDAL",
    source: "@EFL",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "52.7M",
  },
  {
    id: "t3",
    title: "🏟️ FINAL DA EUROPA LEAGUE HOJE! Aston Villa vs Freiburg em Istambul — Villa tenta acabar com 30 anos de espera por um troféu europeu!",
    title_en: "🏟️ EUROPA LEAGUE FINAL TONIGHT! Aston Villa vs Freiburg in Istanbul — Villa attempt to end 30-year wait for a European trophy!",
    summary: "A NOITE MAIS IMPORTANTE DA HISTÓRIA RECENTE DO ASTON VILLA! Os Villans de Unai Emery enfrentam o SC Freiburg na final da UEFA Europa League no Beşiktaş Park, em Istambul, às 20:00 (hora de Lisboa). O Villa não conquista um troféu europeu desde 1982, quando venceu a Taça dos Campeões Europeus. O capitão John McGinn disse que é o 'momento mais orgulhoso' da sua carreira. O Freiburg, surpreendente finalista, chega motivado para criar a maior surpresa da sua história. Emery, o 'Rei da Europa League', vai tentar o seu quarto título na competição.",
    summary_en: "THE MOST IMPORTANT NIGHT IN RECENT ASTON VILLA HISTORY! Unai Emery's Villans face SC Freiburg in the UEFA Europa League final at Beşiktaş Park in Istanbul at 20:00 (Lisbon time). Villa have not won a European trophy since 1982, when they won the European Cup. Captain John McGinn said it is the 'proudest moment' of his career. Freiburg, the surprise finalists, arrive motivated to create the biggest shock in their history. Emery, the 'Europa League King', will attempt to win his fourth title in the competition.",
    tag: "HOT",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "44.3M",
  },
  {
    id: "t4",
    title: "🇧🇷 NEYMAR EM LÁGRIMAS AO SER CONVOCADO PARA O MUNDIAL 2026! Carlo Ancelotti surpreende o mundo com o regresso do craque!",
    title_en: "🇧🇷 NEYMAR IN TEARS AFTER WORLD CUP 2026 CALL-UP! Carlo Ancelotti surprises the world with the return of the Brazilian star!",
    summary: "ELE VOLTOU! O momento em que Neymar Jr. soube que foi convocado por Carlo Ancelotti para a Copa do Mundo de 2026 correu o mundo: o craque brasileiro rompeu em lágrimas ao ouvir o seu nome na lista dos 26 convocados. Após anos de lesões e críticas, o melhor marcador de sempre da Seleção Canarinha vai disputar o que será provavelmente o seu último Mundial. O Brasil sonha com o Hexa nos Estados Unidos, México e Canadá, e Neymar pode ser o fator decisivo.",
    summary_en: "HE IS BACK! The moment Neymar Jr. found out he was called up by Carlo Ancelotti for the 2026 World Cup went viral worldwide: the Brazilian star burst into tears upon hearing his name in the 26-man squad. After years of injuries and criticism, Brazil's all-time top scorer will compete in what will likely be his final World Cup. Brazil dreams of a sixth World Cup title in the United States, Mexico and Canada, and Neymar could be the decisive factor.",
    tag: "HOT",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "67.2M",
  },
  {
    id: "t5",
    title: "💰 MOURINHO ASSINA PELO REAL MADRID! 'The Special One' regressa ao Bernabéu com contrato de 2 anos — Salah no radar!",
    title_en: "💰 MOURINHO SIGNS FOR REAL MADRID! 'The Special One' returns to the Bernabeu on a 2-year deal — Salah in his sights!",
    summary: "O REGRESSO DO REI! José Mourinho chegou a acordo total com o Real Madrid para um contrato de dois anos. Fabrizio Romano confirmou o negócio com o seu famoso 'Here we go!'. Mourinho já terá pedido reforços de peso para o mercado de verão, incluindo Mohamed Salah, que está a ponderar uma mudança para La Liga após a saída do Liverpool. Florentino Pérez prepara-se para anunciar o português nos próximos dias. Uma nova era começa no Bernabéu!",
    summary_en: "THE RETURN OF THE KING! José Mourinho has reached a full agreement with Real Madrid for a two-year contract. Fabrizio Romano confirmed the deal with his famous 'Here we go!'. Mourinho has reportedly already requested high-profile reinforcements for the summer market, including Mohamed Salah, who is considering a move to La Liga after leaving Liverpool. Florentino Pérez is preparing to announce the Portuguese manager in the coming days. A new era begins at the Bernabeu!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "42.1M",
  },
  {
    id: "t6",
    title: "🔥 BOCA JUNIORS vs CRUZEIRO NA LIBERTADORES HOJE! Xeneize em jogo decisivo na Bombonera — tudo ou nada no Grupo D!",
    title_en: "🔥 BOCA JUNIORS vs CRUZEIRO IN LIBERTADORES TODAY! Xeneize in decisive clash at La Bombonera — all or nothing in Group D!",
    summary: "NOITE DE FOGO NA BOMBONERA! O Boca Juniors recebe o Cruzeiro esta noite às 21:30 (hora de Lisboa) num jogo decisivo da fase de grupos da Copa Libertadores 2026. O Cruzeiro lidera o Grupo D e uma derrota pode praticamente eliminar o Boca da competição. A atmosfera na Bombonera promete ser elétrica, com mais de 50.000 adeptos a encher o estádio. O duelo entre duas das maiores potências do futebol sul-americano é um dos jogos mais aguardados da semana na Libertadores.",
    summary_en: "FIRE NIGHT AT LA BOMBONERA! Boca Juniors host Cruzeiro tonight at 21:30 (Lisbon time) in a decisive Copa Libertadores 2026 group stage match. Cruzeiro lead Group D and a defeat could virtually eliminate Boca from the competition. The atmosphere at La Bombonera promises to be electric, with over 50,000 fans filling the stadium. The clash between two of South America's biggest football powers is one of the most anticipated matches of the week in the Libertadores.",
    tag: "HOT",
    source: "@Libertadores",
    url: "https://x.com/alivegoal",
    time: "20/05/2026",
    engagement: "29.8M",
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
