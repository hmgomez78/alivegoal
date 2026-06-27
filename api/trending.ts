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
// Notícias curadas — atualizadas 27/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Dembélé faz hat-trick histórico em 32 minutos! França 4-1 Noruega no Mundial 2026!",
    title_en: "🚨 BREAKING: Dembélé scores historic hat-trick in 32 minutes! France 4-1 Norway at World Cup 2026!",
    summary: "Ousmane Dembélé, vencedor do Bola de Ouro 2025, protagonizou uma das maiores exibições individuais da história dos Mundiais ao marcar três golos em apenas 32 minutos contra a Noruega. O avançado do PSG tornou-se o segundo jogador de sempre a fazer um hat-trick em menos de 30 minutos numa fase de grupos do Mundial, igualando o recorde de Erich Probst em 1954. A França terminou o Grupo I com 9 pontos e 9 golos marcados, enquanto a Noruega — que poupou Haaland — seguiu como segunda classificada. Dembélé lidera agora a corrida à Bota de Ouro com 4 golos no torneio.",
    summary_en: "Ousmane Dembélé, the 2025 Ballon d'Or winner, delivered one of the greatest individual performances in World Cup history by scoring three goals in just 32 minutes against Norway. The PSG forward became only the second player ever to score a World Cup hat-trick in under 30 minutes in the group stage, equalling Erich Probst's record from 1954. France finished Group I with 9 points and 9 goals scored, while Norway — who rested Haaland — advanced as runners-up. Dembélé now leads the Golden Boot race with 4 goals in the tournament.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "512.3M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Arsenal faz oferta de £55M por Bruno Guimarães — Newcastle recusa e exige mais!",
    title_en: "🔥 TRANSFER: Arsenal make £55M bid for Bruno Guimarães — Newcastle reject and demand more!",
    summary: "O Arsenal submeteu uma proposta formal de £55 milhões ao Newcastle United pelo médio brasileiro Bruno Guimarães, capitão dos Magpies. A oferta foi recusada de imediato pelo Newcastle, que insiste que o jogador não está à venda. Segundo fontes do ESPN Brasil e David Ornstein, os Gunners estão dispostos a melhorar a proposta e o jogador estará receptivo a uma mudança para o Emirates. O Newcastle, que falhou a qualificação europeia, está a explorar alternativas no mercado, com Felix Nmecha do Borussia Dortmund identificado como possível substituto. Uma das transferências mais explosivas do verão está a ganhar forma.",
    summary_en: "Arsenal submitted a formal £55 million offer to Newcastle United for Brazilian midfielder Bruno Guimarães, the Magpies' captain. The offer was immediately rejected by Newcastle, who insist the player is not for sale. According to ESPN Brasil sources and David Ornstein, the Gunners are willing to improve their offer and the player is reportedly open to a move to the Emirates. Newcastle, who missed out on European qualification, are exploring alternatives in the market, with Borussia Dortmund's Felix Nmecha identified as a potential replacement. One of the summer's most explosive transfers is taking shape.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "389.7M",
  },
  {
    id: "t3",
    title: "💥 HOT: Man City fecha acordo de £116M por Elliot Anderson — O médio faz exame médico HOJE!",
    title_en: "💥 HOT: Man City close £116M deal for Elliot Anderson — Midfielder undergoes medical TODAY!",
    summary: "O Manchester City chegou a acordo com o Nottingham Forest pela contratação do médio inglês Elliot Anderson por um valor que pode atingir £116 milhões, tornando-se uma das transferências mais caras da história do futebol inglês. Fabrizio Romano confirmou que Anderson realizará o exame médico esta sexta-feira e assinará um contrato de 5 anos com opção de extensão, com um salário de cerca de £300.000 por semana. O jovem de 22 anos, considerado um dos maiores talentos do futebol inglês, será uma peça central no projeto de Pep Guardiola para a próxima temporada. O City continua a dominar o mercado de transferências.",
    summary_en: "Manchester City have reached an agreement with Nottingham Forest for the signing of English midfielder Elliot Anderson for a fee that could reach £116 million, making it one of the most expensive transfers in English football history. Fabrizio Romano confirmed that Anderson will undergo his medical this Friday and will sign a 5-year contract with an extension option, on a salary of around £300,000 per week. The 22-year-old, considered one of the greatest talents in English football, will be a central piece in Pep Guardiola's project for next season. City continue to dominate the transfer market.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "298.4M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: Uruguai eliminado em escândalo — Muslera erra, Canobbio expulso e Bielsa em fúria!",
    title_en: "🚨 SCANDAL: Uruguay eliminated in chaos — Muslera error, Canobbio red card and Bielsa furious!",
    summary: "A eliminação do Uruguai do Mundial 2026 foi marcada por cenas dramáticas e polémicas. Fernando Muslera, lendário guarda-redes de 40 anos, cometeu um erro imperdoável ao deixar escapar um remate de Alex Baena para o único golo do jogo (1-0 para a Espanha). O veterano foi substituído ao intervalo numa cena que pode marcar o fim da sua carreira internacional. Nos descontos, Agustín Canobbio foi expulso por uma entrada brutal em Pau Cubarsí e por contacto com o árbitro, com Marcelo Bielsa a protestar furiosamente. A Cabo Verde, com um empate 0-0 frente à Arábia Saudita, avançou como segunda do grupo, eliminando o Uruguai numa das maiores surpresas do torneio.",
    summary_en: "Uruguay's elimination from the 2026 World Cup was marked by dramatic and controversial scenes. Fernando Muslera, the legendary 40-year-old goalkeeper, made an unforgivable error by letting Alex Baena's shot slip through for the only goal of the game (1-0 to Spain). The veteran was substituted at half-time in a scene that may mark the end of his international career. In stoppage time, Agustín Canobbio was sent off for a brutal challenge on Pau Cubarsí and contact with the referee, with Marcelo Bielsa protesting furiously. Cape Verde, with a 0-0 draw against Saudi Arabia, advanced as group runners-up, eliminating Uruguay in one of the tournament's biggest surprises.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "441.2M",
  },
  {
    id: "t5",
    title: "💥 HOT: Inglaterra vs Panamá e Portugal vs Colômbia — Os duelos decisivos do Grupo K e L hoje!",
    title_en: "💥 HOT: England vs Panama and Portugal vs Colombia — The decisive Group K and L clashes today!",
    summary: "O dia 17 do Mundial 2026 traz confrontos de enorme qualidade. A Inglaterra, liderada por Jude Bellingham, enfrenta o Panamá às 22h00 (Lisboa) no MetLife Stadium, precisando de confirmar a liderança do Grupo L. Ao mesmo tempo, a Croácia defronta o Gana. Mais tarde, às 00h30, Portugal de Cristiano Ronaldo joga contra a Colômbia de James Rodríguez no Hard Rock Stadium de Miami, num duelo de gigantes pelo topo do Grupo K. O Congo-DR enfrenta o Uzbequistão no outro jogo do grupo. Seis jogos em dois grupos que podem definir o quadro dos oitavos de final.",
    summary_en: "Day 17 of the 2026 World Cup brings clashes of enormous quality. England, led by Jude Bellingham, face Panama at 10pm (Lisbon) at MetLife Stadium, needing to confirm their leadership of Group L. At the same time, Croatia face Ghana. Later, at 00:30, Cristiano Ronaldo's Portugal play against James Rodríguez's Colombia at the Hard Rock Stadium in Miami, in a clash of giants for the top of Group K. DR Congo face Uzbekistan in the other group game. Six games in two groups that could define the Round of 32 bracket.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "367.8M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Tottenham fecha acordo com Sandro Tonali por £85M — De Zerbi quer o italiano!",
    title_en: "🔥 TRANSFER: Tottenham reach agreement for Sandro Tonali at £85M — De Zerbi wants the Italian!",
    summary: "O Tottenham Hotspur chegou a um acordo de princípio com o Newcastle United para a contratação do médio italiano Sandro Tonali por um valor estimado em £85 milhões. Roberto De Zerbi, treinador dos Spurs, identificou Tonali como a peça fundamental para a reconstrução do meio-campo da equipa londrina. O italiano, que cumpriu suspensão por apostas ilegais na época passada, está de volta ao melhor nível e é um dos médios mais completos da Premier League. O Newcastle, que pode perder também Bruno Guimarães para o Arsenal, está a preparar uma renovação profunda do plantel com Felix Nmecha e outros alvos no radar.",
    summary_en: "Tottenham Hotspur have reached a preliminary agreement with Newcastle United for the signing of Italian midfielder Sandro Tonali for an estimated £85 million. Roberto De Zerbi, the Spurs manager, has identified Tonali as the key piece for rebuilding the London club's midfield. The Italian, who served a suspension for illegal betting last season, is back to his best and is one of the most complete midfielders in the Premier League. Newcastle, who could also lose Bruno Guimarães to Arsenal, are preparing a major squad overhaul with Felix Nmecha and other targets in their sights.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "27/06/2026",
    engagement: "256.1M",
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
