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

// Notícias curadas — atualizadas 05/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Marrocos HUMILHA o Canadá 3-0 — Ounahi em Estado de Graça Envia Leões do Atlas aos Quartos!",
    title_en: "🚨 BREAKING: Morocco HUMILIATE Canada 3-0 — Ounahi on Fire Sends Atlas Lions to the Quarters!",
    summary: "Que exibição de Marrocos! Os Leões do Atlas destruíram o Canadá por 3-0 em Houston e avançaram para os quartos de final do Mundial 2026. Azzedine Ounahi foi o grande herói com dois golos no segundo tempo (54' e 71'), enquanto Soufiane Rahimi fechou a contagem (88'). O Canadá, que jogava em casa nos EUA, foi completamente anulado pela organização defensiva marroquina e pela qualidade individual dos seus jogadores. Marrocos repete o feito histórico do Qatar 2022 e volta a chegar aos quartos de final. Ounahi, que atua no OM, foi eleito o melhor jogador do jogo com uma exibição de nível mundial. O próximo adversário de Marrocos será o vencedor de Brasil vs Noruega.",
    summary_en: "What a display from Morocco! The Atlas Lions destroyed Canada 3-0 in Houston and advanced to the 2026 World Cup quarter-finals. Azzedine Ounahi was the hero with two second-half goals (54' and 71'), while Soufiane Rahimi sealed it (88'). Canada, playing on home soil in the USA, were completely nullified by Morocco's defensive organisation and individual quality. Morocco repeat their historic feat from Qatar 2022 and reach the quarter-finals again. Ounahi, who plays for OM, was named Man of the Match with a world-class performance. Morocco's next opponents will be the winner of Brazil vs Norway.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "3.5B",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Bastoni INVESTIGADO por Prostituição de Menores — Inter em Choque, Real Madrid Recua!",
    title_en: "💥 SCANDAL: Bastoni INVESTIGATED for Underage Prostitution — Inter in Shock, Real Madrid Back Off!",
    summary: "O escândalo que abalou o futebol italiano! Alessandro Bastoni, defesa central do Inter de Milão e da seleção italiana, está sob investigação da Procuradoria de Milão por prostituição de menores. Segundo o Corriere della Sera, o incidente terá ocorrido em 2020, quando Bastoni tinha 20 anos, e envolveu uma jovem de 17 anos num evento organizado por uma agência de acompanhantes. A rapariga negou ter tido relações sexuais com o defesa. Também envolvidos na investigação estão Riccardo Calafiori (Arsenal), Daniel Maldini e Kevin Bonifazi. O Real Madrid, que estava a preparar uma proposta de €60M para contratar Bastoni a pedido de José Mourinho, suspendeu as negociações. O Inter emitiu um comunicado de apoio ao jogador mas o clube está em choque. Bastoni recusou falar com os investigadores.",
    summary_en: "The scandal that rocked Italian football! Alessandro Bastoni, Inter Milan and Italy centre-back, is under investigation by the Milan Prosecutor's Office for underage prostitution. According to Corriere della Sera, the incident allegedly occurred in 2020, when Bastoni was 20, and involved a 17-year-old girl at an event organised by an escort agency. The girl denied having had sexual relations with the defender. Also involved in the investigation are Riccardo Calafiori (Arsenal), Daniel Maldini and Kevin Bonifazi. Real Madrid, who were preparing a €60M bid to sign Bastoni at José Mourinho's request, have suspended negotiations. Inter issued a statement of support for the player but the club is in shock. Bastoni refused to speak to investigators.",
    tag: "SCANDAL",
    source: "@CorrieredellaSera",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "2.8B",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Klopp CONFIRMA Negociações com a Alemanha — 'Estou Mais do que Recarregado, Estou Pronto!'",
    title_en: "⚡ TRANSFER: Klopp CONFIRMS Germany Negotiations — 'I'm More Than Recharged, I'm Ready!'",
    summary: "O regresso mais aguardado do futebol mundial está a tornar-se realidade! Jürgen Klopp confirmou ao canal alemão Magenta TV que está em negociações para assumir o comando da seleção alemã após a demissão de Julian Nagelsmann. 'Há dois anos parei no Liverpool e disse que me faltava energia. Desde então estou mais do que recarregado, estou pronto', declarou Klopp. A DFB (Federação Alemã de Futebol) abordou Klopp como candidato preferido após Nagelsmann ter resignado na sexta-feira, quatro dias depois da Alemanha ter sido eliminada pelo Paraguai nos penáltis. Klopp disse que precisa de 'conversas intensivas' com a federação para alinhar a visão de como transformar a equipa. O maior obstáculo é o seu contrato como Diretor Global de Futebol da rede de clubes Red Bull. Fabrizio Romano confirma que as negociações estão em curso.",
    summary_en: "The most anticipated return in world football is becoming reality! Jürgen Klopp confirmed to German channel Magenta TV that he is in negotiations to take over as Germany manager following Julian Nagelsmann's resignation. 'Two years ago I stopped at Liverpool and said I was running out of energy. Since then I'm more than recharged, I'm ready', Klopp declared. The DFB (German Football Federation) approached Klopp as their preferred candidate after Nagelsmann resigned on Friday, four days after Germany were eliminated by Paraguay on penalties. Klopp said he needs 'intensive talks' with the federation to align on the vision for transforming the team. The biggest obstacle is his contract as Global Director of Football for the Red Bull network of clubs. Fabrizio Romano confirms negotiations are underway.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "2.4B",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Man United Quer Tchouaméni e Summerville — INEOS Prepara Duplo Golpe de Verão!",
    title_en: "⚡ TRANSFER: Man United Want Tchouaméni and Summerville — INEOS Prepare Double Summer Swoop!",
    summary: "O Manchester United está a preparar um verão de grandes investimentos! Segundo a Sky Sports e o The Sun, o INEOS colocou Aurélien Tchouaméni (Real Madrid) e Crysencio Summerville (West Ham) no topo da lista de alvos. Tchouaméni é o 'sonho' do United para reconstruir o meio-campo — o Real Madrid está aberto à saída mas exige uma quantia elevada. Summerville, por sua vez, quer apenas o United e recusou outras propostas. O clube está também a analisar Ayyoub Bouaddi (Lille) e Felix Nmecha. O United precisa urgentemente de reforçar o meio-campo após uma época decepcionante. Fabrizio Romano confirma que o interesse no Summerville é real e que o West Ham pode aceitar uma proposta de £40M.",
    summary_en: "Manchester United are preparing a summer of major investment! According to Sky Sports and The Sun, INEOS have placed Aurélien Tchouaméni (Real Madrid) and Crysencio Summerville (West Ham) at the top of their target list. Tchouaméni is United's 'dream' signing to rebuild the midfield — Real Madrid are open to a sale but demand a high fee. Summerville, meanwhile, only wants United and has rejected other approaches. The club are also analysing Ayyoub Bouaddi (Lille) and Felix Nmecha. United urgently need to strengthen their midfield after a disappointing season. Fabrizio Romano confirms interest in Summerville is real and West Ham could accept a £40M bid.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "1.9B",
  },
  {
    id: "t5",
    title: "🔥 HOT: Brasil vs Noruega e México vs Inglaterra — Os Oitavos de Final do Mundial HOJE São ÉPICOS!",
    title_en: "🔥 HOT: Brazil vs Norway and Mexico vs England — Today's World Cup Round of 16 Matches Are EPIC!",
    summary: "Dois jogos absolutamente imperdíveis hoje nos oitavos de final do Mundial 2026! Às 21:00 UTC, o Brasil defronta a Noruega de Haaland no MetLife Stadium em East Rutherford, Nova Jersey. O Brasil venceu o Japão 2-1 mas mostrou fragilidades defensivas — Haaland marcou 6 golos contra Gabriel em 11 confrontos pela Premier League. As odds: Brasil -115, Noruega +300, Empate +250. Às 01:00 UTC (madrugada), o México recebe a Inglaterra no Estádio Banorte na Cidade do México — um caldeirão de 87.000 adeptos. A Inglaterra é favorita (+125) mas o México tem a vantagem da altitude e do apoio do público. Kane marcou 5 golos em 4 jogos neste Mundial. Um dia histórico para o futebol mundial!",
    summary_en: "Two absolutely unmissable matches today in the 2026 World Cup Round of 16! At 21:00 UTC, Brazil face Haaland's Norway at MetLife Stadium in East Rutherford, New Jersey. Brazil beat Japan 2-1 but showed defensive vulnerabilities — Haaland has scored 6 goals against Gabriel in 11 Premier League clashes. Odds: Brazil -115, Norway +300, Draw +250. At 01:00 UTC (early hours), Mexico host England at Estadio Banorte in Mexico City — a cauldron of 87,000 fans. England are favourites (+125) but Mexico have the altitude advantage and home support. Kane has scored 5 goals in 4 games at this World Cup. A historic day for world football!",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "2.1B",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Bernardo Silva ao Real Madrid de GRAÇA — Barça e Atlético Ficam a Ver, Florentino Vence!",
    title_en: "⚡ TRANSFER: Bernardo Silva to Real Madrid for FREE — Barça and Atlético Watch On, Florentino Wins!",
    summary: "Uma das transferências mais surpreendentes do verão! Bernardo Silva vai deixar o Manchester City em fim de contrato e assinar pelo Real Madrid de forma gratuita. O Atlético de Madrid e o Barcelona estavam em negociações avançadas com o jogador, mas o Real Madrid entrou de última hora com uma proposta irrecusável. Florentino Pérez, que tem Bernardo Silva como alvo há vários anos, ofereceu um contrato de 4 anos com um salário de €15M por época. O City não conseguiu convencer o português a renovar. Bernardo Silva, de 31 anos, chega ao Bernabéu como um dos melhores médios do mundo, capaz de jogar em várias posições. Uma contratação de luxo para o Real Madrid sem gastar um cêntimo em taxa de transferência.",
    summary_en: "One of the most surprising transfers of the summer! Bernardo Silva will leave Manchester City as a free agent and sign for Real Madrid at no cost. Atletico Madrid and Barcelona were in advanced negotiations with the player, but Real Madrid came in at the last minute with an irresistible offer. Florentino Pérez, who has had Bernardo Silva as a target for several years, offered a 4-year contract with a salary of €15M per season. City failed to convince the Portuguese to renew. Bernardo Silva, 31, arrives at the Bernabéu as one of the best midfielders in the world, capable of playing in multiple positions. A luxury signing for Real Madrid without spending a cent in transfer fees.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/07/2026",
    engagement: "1.7B",
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
