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

// Notícias curadas — atualizadas 19/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 PEP GUARDIOLA DEIXA O MANCHESTER CITY! Treinador sai após o último jogo da época — Enzo Maresca é o sucessor escolhido!",
    title_en: "🚨 PEP GUARDIOLA LEAVES MANCHESTER CITY! Manager departs after final game of the season — Enzo Maresca chosen as successor!",
    summary: "BOMBA NO FUTEBOL MUNDIAL! Pep Guardiola vai deixar o comando técnico do Manchester City após o último jogo da Premier League contra o Aston Villa. O treinador catalão ativou uma cláusula no seu contrato que lhe permite sair um ano mais cedo. O City já tem o sucessor garantido: Enzo Maresca, ex-treinador do Chelsea, já chegou a acordo para assumir o comando dos 'Citizens'. Uma nova era começa no Etihad!",
    summary_en: "BOMB IN WORLD FOOTBALL! Pep Guardiola will leave Manchester City after the final Premier League game against Aston Villa. The Catalan manager activated a clause in his contract allowing him to leave a year early. City already have a successor lined up: Enzo Maresca, former Chelsea manager, has agreed to take charge of the 'Citizens'. A new era begins at the Etihad!",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "35.2M",
  },
  {
    id: "t2",
    title: "🔥 MOURINHO ASSINA PELO REAL MADRID! 'The Special One' regressa ao Bernabéu com contrato de 2 anos!",
    title_en: "🔥 MOURINHO SIGNS FOR REAL MADRID! 'The Special One' returns to the Bernabeu on a 2-year contract!",
    summary: "O REGRESSO DO REI! José Mourinho chegou a acordo verbal total com o Real Madrid para um contrato de dois anos. Fabrizio Romano confirmou o negócio com o seu famoso 'Here we go!'. Mourinho não colocou qualquer entrave nas negociações, pois o seu único desejo era regressar ao clube merengue. Florentino Pérez prepara-se para anunciar o português nos próximos dias.",
    summary_en: "THE RETURN OF THE KING! José Mourinho has reached a full verbal agreement with Real Madrid for a two-year contract. Fabrizio Romano confirmed the deal with his famous 'Here we go!'. Mourinho made no demands during negotiations, as his only desire was to return to the Spanish giants. Florentino Pérez is preparing to announce the Portuguese manager in the coming days.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "42.1M",
  },
  {
    id: "t3",
    title: "💰 XABI ALONSO CONFIRMADO NO CHELSEA! Espanhol assina por 4 anos e prepara revolução no plantel!",
    title_en: "💰 XABI ALONSO CONFIRMED AT CHELSEA! Spaniard signs for 4 years and prepares squad revolution!",
    summary: "OFICIAL! Xabi Alonso é o novo treinador do Chelsea para a temporada 2026/27. O técnico espanhol assinou um contrato de quatro anos e já está a trabalhar na reestruturação do plantel. Morgan Rogers, do Aston Villa, é um dos principais alvos de Alonso, que terá controlo total sobre as transferências. Os adeptos dos 'Blues' estão eufóricos com a chegada do ex-treinador do Bayer Leverkusen.",
    summary_en: "OFFICIAL! Xabi Alonso is the new Chelsea manager for the 2026/27 season. The Spanish coach has signed a four-year contract and is already working on restructuring the squad. Aston Villa's Morgan Rogers is one of Alonso's main targets, as he will have full control over transfers. 'Blues' fans are euphoric with the arrival of the former Bayer Leverkusen manager.",
    tag: "TRANSFER",
    source: "@TEAMtalk",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "28.5M",
  },
  {
    id: "t4",
    title: "🚨 ESCÂNDALO DE APOSTAS NO TEXAS TECH! Quarterback Brendan Sorsby processa NCAA após ser suspenso!",
    title_en: "🚨 BETTING SCANDAL AT TEXAS TECH! Quarterback Brendan Sorsby sues NCAA after being suspended!",
    summary: "ESCÂNDALO NOS EUA! O quarterback do Texas Tech, Brendan Sorsby, deu entrada numa clínica de reabilitação para vício em jogo após ter feito milhares de apostas desportivas. Sorsby foi declarado inelegível pela NCAA e decidiu processar a organização num tribunal do Texas, procurando uma providência cautelar. O caso está a abalar o desporto universitário americano.",
    summary_en: "SCANDAL IN THE USA! Texas Tech quarterback Brendan Sorsby has entered a gambling addiction treatment facility after reportedly placing thousands of sports bets. Sorsby was declared ineligible by the NCAA and has decided to sue the organization in a Texas state court, seeking a temporary injunction. The case is shaking American college sports.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "15.7M",
  },
  {
    id: "t5",
    title: "🏆 ARSENAL A UMA VITÓRIA DO TÍTULO! Gunners vencem Burnley e ficam a um passo da glória na Premier League!",
    title_en: "🏆 ARSENAL ONE WIN AWAY FROM TITLE! Gunners beat Burnley and are one step away from Premier League glory!",
    summary: "O TÍTULO ESTÁ PERTO! O Arsenal venceu o Burnley por 1-0, com um golo de Kai Havertz, e está agora a apenas uma vitória de conquistar a Premier League, 22 anos depois do último título. A equipa de Mikel Arteta lidera a tabela e pode até celebrar se o Manchester City não vencer o seu próximo jogo. A tensão é máxima na reta final do campeonato inglês!",
    summary_en: "THE TITLE IS CLOSE! Arsenal beat Burnley 1-0, with a goal from Kai Havertz, and are now just one win away from winning the Premier League, 22 years after their last title. Mikel Arteta's team leads the table and could even celebrate if Manchester City fail to win their next game. Tension is at its peak in the final stretch of the English championship!",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "31.4M",
  },
  {
    id: "t6",
    title: "🇧🇷 NEYMAR CONVOCADO PARA A COPA DO MUNDO 2026! Carlo Ancelotti surpreende e chama o craque para a seleção!",
    title_en: "🇧🇷 NEYMAR CALLED UP FOR 2026 WORLD CUP! Carlo Ancelotti surprises and calls the star to the national team!",
    summary: "ELE VOLTOU! O selecionador do Brasil, Carlo Ancelotti, anunciou a lista de 26 convocados para a Copa do Mundo de 2026 e a grande surpresa é o regresso de Neymar Jr. O craque brasileiro, que tem sofrido com lesões, recebeu um voto de confiança do técnico italiano. Os adeptos brasileiros celebraram a notícia nas ruas, sonhando com o tão desejado Hexa nos Estados Unidos, México e Canadá.",
    summary_en: "HE IS BACK! Brazil manager Carlo Ancelotti has announced the 26-man squad for the 2026 World Cup and the big surprise is the return of Neymar Jr. The Brazilian star, who has struggled with injuries, received a vote of confidence from the Italian coach. Brazilian fans celebrated the news in the streets, dreaming of the much-desired sixth World Cup title in the US, Mexico and Canada.",
    tag: "HOT",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "19/05/2026",
    engagement: "45.8M",
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
