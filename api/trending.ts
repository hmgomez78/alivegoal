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

// Notícias curadas — atualizadas 31/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 BICAMPEÕES! PSG vence Arsenal nos penáltis (4-3) e conquista a Champions League pela segunda vez consecutiva em Budapeste!",
    title_en: "🏆 BACK-TO-BACK CHAMPIONS! PSG beat Arsenal on penalties (4-3) to win the Champions League for the second year running in Budapest!",
    summary: "HISTÓRIA FEITA EM BUDAPESTE! O Paris Saint-Germain é bicampeão da UEFA Champions League após uma final épica contra o Arsenal na Puskás Aréna. O jogo terminou 1-1 ao fim do tempo regulamentar — Kai Havertz abriu o marcador ao minuto 6 para os Gunners, mas Ousmane Dembélé empatou de penálti na segunda parte. Nos penáltis, o PSG converteu 4 de 4 enquanto o Arsenal falhou dois — Eberechi Eze e Gabriel desperdiçaram as suas tentativas. Luis Enrique tornou-se o primeiro treinador a vencer consecutivamente a Champions com o PSG. Uma noite histórica para o futebol francês.",
    summary_en: "HISTORY MADE IN BUDAPEST! Paris Saint-Germain are back-to-back UEFA Champions League champions after an epic final against Arsenal at the Puskás Aréna. The match ended 1-1 after normal time — Kai Havertz opened the scoring on 6 minutes for the Gunners, but Ousmane Dembélé equalised from the penalty spot in the second half. In the shootout, PSG converted all 4 while Arsenal missed two — Eberechi Eze and Gabriel both wasted their attempts. Luis Enrique became the first manager to win back-to-back Champions Leagues with PSG. A historic night for French football.",
    tag: "BREAKING",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "1.2B",
  },
  {
    id: "t2",
    title: "🚨 BOMBA: Liverpool despede Arne Slot com efeito imediato após dois anos — Iraola é o favorito para o cargo!",
    title_en: "🚨 BOMBSHELL: Liverpool sack Arne Slot with immediate effect after two seasons — Iraola is the favourite to take over!",
    summary: "FIM DA LINHA PARA SLOT! O Liverpool anunciou a demissão de Arne Slot com efeito imediato, numa das decisões mais chocantes do futebol europeu. O treinador holandês, que venceu a Premier League na sua primeira temporada (2024/25), não conseguiu manter o nível na segunda época, com uma campanha europeia dececionante e resultados inconsistentes no campeonato. Andoni Iraola, do Bournemouth, surge como o grande favorito para assumir o comando de Anfield. A notícia deixou os adeptos dos Reds em choque — Slot saiu como campeão mas sem o apoio da direção para continuar.",
    summary_en: "END OF THE LINE FOR SLOT! Liverpool have announced the immediate dismissal of Arne Slot in one of the most shocking decisions in European football. The Dutch manager, who won the Premier League in his first season (2024/25), failed to maintain the level in his second campaign, with a disappointing European run and inconsistent league results. Andoni Iraola of Bournemouth emerges as the strong favourite to take charge at Anfield. The news left Reds fans in shock — Slot left as a champion but without the board's backing to continue.",
    tag: "BREAKING",
    source: "@LFC",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "734.5M",
  },
  {
    id: "t3",
    title: "⚡ OFICIAL: Bernardo Silva assina pelo Barcelona em FREE — Aceita reduzir salário para METADE para realizar o sonho do Camp Nou!",
    title_en: "⚡ OFFICIAL: Bernardo Silva signs for Barcelona for FREE — Accepts to HALVE his wages to fulfil his Camp Nou dream!",
    summary: "O PORTUGUÊS MAIS COBIÇADO ESCOLHEU O BARÇA! Bernardo Silva, que terminou contrato com o Manchester City, assinou pelo FC Barcelona numa transferência gratuita histórica. O médio português, de 31 anos, aceitou reduzir o seu salário de 16 milhões de euros para 8 milhões anuais para realizar o sonho de jogar no Camp Nou. Segundo a TV3, o acordo foi finalizado nas últimas horas após o Barcelona ter também contratado Anthony Gordon por 80 milhões ao Newcastle. A chegada de Bernardo Silva é um golpe de mestre do Barça no mercado de verão — um dos melhores médios do mundo chega a custo zero.",
    summary_en: "THE MOST COVETED PORTUGUESE PLAYER CHOSE BARCA! Bernardo Silva, who has left Manchester City as a free agent, has signed for FC Barcelona in a historic free transfer. The 31-year-old Portuguese midfielder accepted to halve his wages from €16m to €8m per year to fulfil his dream of playing at the Camp Nou. According to TV3, the deal was finalised in the last few hours after Barcelona also signed Anthony Gordon from Newcastle for €80m. Bernardo Silva's arrival is a masterstroke by Barca in the summer market — one of the world's best midfielders arrives at zero cost.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "521.8M",
  },
  {
    id: "t4",
    title: "💣 RASHFORD EM COLAPSO: Barcelona contrata Gordon por €80M e deixa o inglês sem futuro no Camp Nou — United exige €30M ou nada!",
    title_en: "💣 RASHFORD IN CRISIS: Barcelona sign Gordon for €80M leaving the Englishman with no future at Camp Nou — United demand €30M or nothing!",
    summary: "DRAMA TOTAL PARA RASHFORD! A contratação de Anthony Gordon pelo Barcelona por 80 milhões de euros ao Newcastle foi o golpe final nas esperanças de Marcus Rashford de ficar no Camp Nou. O avançado inglês, cedido pelo Manchester United, viu o seu sonho desmoronar-se com a chegada de Gordon, que joga na mesma posição. O United exige que o Barcelona ative a cláusula de compra de 30 milhões de euros ou devolva o jogador — e não aceita outro empréstimo. Com Bernardo Silva também a caminho, Rashford pode ter de regressar a Old Trafford sem clube definido. Uma situação caótica para um dos jogadores mais talentosos da sua geração.",
    summary_en: "TOTAL DRAMA FOR RASHFORD! Barcelona's €80m signing of Anthony Gordon from Newcastle was the final blow to Marcus Rashford's hopes of staying at Camp Nou. The English forward, on loan from Manchester United, saw his dream collapse with Gordon's arrival, who plays in the same position. United demand Barcelona activate the €30m buyout clause or return the player — and will not accept another loan. With Bernardo Silva also arriving, Rashford may have to return to Old Trafford without a club. A chaotic situation for one of the most talented players of his generation.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "389.2M",
  },
  {
    id: "t5",
    title: "⚖️ ESCÂNDALO: MP recorre da absolvição do Benfica e de Luís Filipe Vieira no caso 'Saco Azul' — processo volta ao tribunal!",
    title_en: "⚖️ SCANDAL: Portuguese prosecutors appeal Benfica and Luís Filipe Vieira's acquittal in 'Saco Azul' case — case returns to court!",
    summary: "O ESCÂNDALO QUE NÃO ACABA! O Ministério Público confirmou que vai recorrer da absolvição do Benfica SAD e do ex-presidente Luís Filipe Vieira no processo 'Saco Azul'. O tribunal tinha absolvido todos os arguidos em abril, alegando impossibilidade de realizar perícia técnica forense 10 anos após os factos. O MP discorda e tem 60 dias para interpor recurso. O caso envolve alegados contratos fictícios de consultoria informática entre 2015 e 2018, com mais de 1,8 milhões de euros alegadamente retirados do clube. O presidente Rui Costa, que tinha celebrado a absolvição, vê agora o processo reaberto.",
    summary_en: "THE SCANDAL THAT WON'T END! The Portuguese Public Ministry confirmed it will appeal the acquittal of Benfica SAD and former president Luís Filipe Vieira in the 'Saco Azul' case. The court had acquitted all defendants in April, citing the impossibility of conducting forensic technical analysis 10 years after the facts. The prosecutors disagree and have 60 days to file an appeal. The case involves alleged fictitious IT consultancy contracts between 2015 and 2018, with over €1.8 million allegedly taken from the club. President Rui Costa, who had celebrated the acquittal, now sees the case reopened.",
    tag: "SCANDAL",
    source: "@Publico",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "267.4M",
  },
  {
    id: "t6",
    title: "🇧🇷 BRASIL x PANAMÁ: Seleção Canarinha faz último ensaio antes do Mundial 2026 no Maracanã — Ancelotti testa novidades!",
    title_en: "🇧🇷 BRAZIL vs PANAMA: Seleção Canarinha makes final rehearsal before World Cup 2026 at Maracanã — Ancelotti tests new options!",
    summary: "O ÚLTIMO ENSAIO ANTES DA COPA! A Seleção Brasileira enfrenta o Panamá esta tarde no Maracanã (18h30 horário de Brasília) no último amistoso antes do Mundial 2026. Carlo Ancelotti aproveita o jogo para testar combinações táticas e dar minutos a jogadores que podem ser importantes na Copa, que começa a 11 de junho. Com o Brasil a estrear-se a 13 de junho contra Marrocos, o técnico italiano quer afinar os últimos detalhes. Rodrygo, Vini Jr. e Endrick são esperados no onze inicial. O Maracanã promete estar em festa numa noite de preparação para o maior torneio do mundo.",
    summary_en: "THE FINAL REHEARSAL BEFORE THE CUP! The Brazilian national team face Panama this afternoon at the Maracanã (18:30 Brasília time) in their final friendly before the 2026 World Cup. Carlo Ancelotti uses the match to test tactical combinations and give minutes to players who could be important at the Cup, which begins on June 11. With Brazil opening on June 13 against Morocco, the Italian manager wants to fine-tune the last details. Rodrygo, Vini Jr. and Endrick are expected in the starting lineup. The Maracanã promises to be in full celebration mode on a preparation night for the world's biggest tournament.",
    tag: "HOT",
    source: "@CBF_Futebol",
    url: "https://x.com/alivegoal",
    time: "31/05/2026",
    engagement: "198.6M",
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
