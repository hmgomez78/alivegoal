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

// Notícias curadas — atualizadas 04/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Argentina SOBREVIVE ao Susto — Messi e Campeões Vencem Cabo Verde 3-2 em Prolongamento!",
    title_en: "🚨 BREAKING: Argentina SURVIVE Scare — Messi and Champions Beat Cape Verde 3-2 in Extra Time!",
    summary: "Que noite em Miami! A Argentina foi ao limite para vencer Cabo Verde por 3-2 em prolongamento e avançar para os oitavos de final do Mundial 2026. Messi abriu o marcador com um remate sensacional (32'), mas Deroy Duarte empatou para Cabo Verde (67'). Lisandro Martínez restaurou a vantagem argentina logo no início do prolongamento (93'), mas Cabo Verde voltou a empatar (105'). Foi Messi, já com 38 anos, a decidir com um golo no segundo tempo do prolongamento (117'). Final: Argentina 3-2 Cabo Verde. Os campeões do mundo avançam mas ficaram muito assustados. Nos oitavos, a Argentina defronta o vencedor de Austrália vs Egito.",
    summary_en: "What a night in Miami! Argentina went to the limit to beat Cape Verde 3-2 in extra time and advance to the World Cup 2026 Round of 16. Messi opened the scoring with a sensational strike (32'), but Deroy Duarte equalised for Cape Verde (67'). Lisandro Martínez restored Argentina's lead early in extra time (93'), but Cape Verde levelled again (105'). It was Messi, now 38, who decided it with a goal in the second period of extra time (117'). Final: Argentina 3-2 Cape Verde. The world champions advance but were given a massive scare. In the Round of 16, Argentina face the winner of Australia vs Egypt.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "3.2B",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Escândalo TOTAL no Senegal — Festas Privadas, Álcool e Assédio Sexual no Mundial!",
    title_en: "💥 SCANDAL: TOTAL Scandal in Senegal — Private Parties, Alcohol and Sexual Harassment at the World Cup!",
    summary: "O escândalo da seleção do Senegal no Mundial 2026 continua a crescer e atingiu proporções chocantes. Após a eliminação frente à Bélgica, vieram a público graves denúncias: membros da delegação organizaram festas privadas com álcool e gastos extravagantes, enquanto os jogadores se preparavam para os jogos. O chef da seleção foi acusado de assédio sexual a uma funcionária do hotel. O selecionador Pape Thiaw não tinha contrato válido horas antes do jogo com a Noruega e foi forçado a assinar momentos antes de partir para o estádio. O capitão Pape Gueye anunciou a retirada da seleção. Os adeptos senegaleses estão furiosos e a federação promete investigação.",
    summary_en: "The scandal surrounding Senegal's national team at the 2026 World Cup continues to grow and has reached shocking proportions. Following their elimination against Belgium, serious allegations emerged: delegation members organised private parties with alcohol and extravagant spending while players were preparing for matches. The team's head chef was accused of sexually harassing a hotel employee. Head coach Pape Thiaw did not have a valid contract hours before the match against Norway and was forced to sign it moments before leaving for the stadium. Captain Pape Gueye announced his retirement from the national team. Senegalese fans are furious and the federation has promised an investigation.",
    tag: "SCANDAL",
    source: "@AS_Football",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "1.8B",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Tonali para o Tottenham por £100M — Romano Confirma 'Here We Go'! Newcastle Planeia Reinvestir Tudo",
    title_en: "⚡ TRANSFER: Tonali to Tottenham for £100M — Romano Confirms 'Here We Go'! Newcastle Plan to Reinvest Everything",
    summary: "Uma das maiores transferências do verão está confirmada! Fabrizio Romano confirmou 'Here We Go' para a transferência de Sandro Tonali do Newcastle United para o Tottenham Hotspur por £100 milhões. O médio italiano, que foi influenciado pela filosofia de Roberto De Zerbi para aceitar a mudança, assinou um contrato de longa duração até 2032. O Newcastle planeia reinvestir a totalidade dos £100 milhões em reforços para várias posições. O Tottenham, que já tinha contratado Mateus Fernandes do West Ham por €98 milhões, está a construir um plantel de elite para a próxima época. Tonali estará disponível para a pré-época dos Spurs.",
    summary_en: "One of the summer's biggest transfers is confirmed! Fabrizio Romano confirmed 'Here We Go' for the transfer of Sandro Tonali from Newcastle United to Tottenham Hotspur for £100 million. The Italian midfielder, who was influenced by Roberto De Zerbi's philosophy to accept the move, signed a long-term contract until 2032. Newcastle plan to reinvest the full £100 million in reinforcements across multiple positions. Tottenham, who had already signed Mateus Fernandes from West Ham for €98 million, are building an elite squad for next season. Tonali will be available for Spurs' pre-season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "1.6B",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Alemanha Despede Nagelsmann — Klopp em Negociações para Regressar ao Futebol!",
    title_en: "🚨 BREAKING: Germany Sack Nagelsmann — Klopp in Talks to Return to Football!",
    summary: "A Federação Alemã de Futebol (DFB) confirmou a demissão de Julian Nagelsmann após a humilhante eliminação frente ao Paraguai nos penáltis. Nagelsmann queria ficar mas o DFB foi inflexível. Jürgen Klopp, que estava a trabalhar no grupo Red Bull, confirmou que está aberto ao desafio de treinar a Mannschaft e já sinalizou disponibilidade geral à federação. O ex-treinador do Liverpool e Borussia Dortmund seria o regresso mais aguardado ao futebol mundial. O DFB está a preparar uma proposta formal para apresentar a Klopp. Com o Euro 2028 e o Mundial 2030 no horizonte, a Alemanha precisa urgentemente de uma revolução. Fabrizio Romano confirma que as negociações estão em curso.",
    summary_en: "The German Football Federation (DFB) confirmed the dismissal of Julian Nagelsmann following the humiliating penalty shootout elimination against Paraguay. Nagelsmann wanted to stay but the DFB was inflexible. Jürgen Klopp, who was working within the Red Bull group, confirmed he is open to the challenge of managing the Mannschaft and has already signalled his general willingness to the federation. The former Liverpool and Borussia Dortmund manager would be the most anticipated return to world football. The DFB is preparing a formal proposal to present to Klopp. With Euro 2028 and the 2030 World Cup on the horizon, Germany urgently needs a revolution. Fabrizio Romano confirms negotiations are underway.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "2.0B",
  },
  {
    id: "t5",
    title: "🔥 HOT: Canadá vs Marrocos e Paraguai vs França — Os Oitavos de Final do Mundial Arrancam HOJE!",
    title_en: "🔥 HOT: Canada vs Morocco and Paraguay vs France — World Cup Round of 16 Kicks Off TODAY!",
    summary: "Os oitavos de final do Mundial 2026 arrancam hoje com dois jogos eletrizantes! Às 18:00 UTC, o Canadá defronta Marrocos em Houston num duelo imprevisível — o Canadá surpreendeu ao eliminar a África do Sul (1-0) e Marrocos venceu os Países Baixos nos penáltis. Às 22:00 UTC, o Paraguai (que eliminou a Alemanha!) enfrenta uma França que goleou a Suécia 3-0. A França é favorita mas o Paraguai mostrou que pode surpreender qualquer equipa. Amanhã (5 jul): Brasil vs Noruega e México vs Inglaterra. O torneio está a entrar na fase mais emocionante!",
    summary_en: "The 2026 World Cup Round of 16 kicks off today with two electrifying matches! At 18:00 UTC, Canada face Morocco in Houston in an unpredictable duel — Canada surprised by eliminating South Africa (1-0) and Morocco beat the Netherlands on penalties. At 22:00 UTC, Paraguay (who eliminated Germany!) face a France side that thrashed Sweden 3-0. France are favourites but Paraguay showed they can surprise any team. Tomorrow (5 Jul): Brazil vs Norway and Mexico vs England. The tournament is entering its most exciting phase!",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "1.9B",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Man City Rouba Monga ao Arsenal — Barcola Abre Porta à Saída do PSG para Liverpool!",
    title_en: "⚡ TRANSFER: Man City Hijack Monga from Arsenal — Barcola Opens Door to PSG Exit Towards Liverpool!",
    summary: "Dois grandes movimentos no mercado de transferências confirmados por Fabrizio Romano! O Manchester City roubou Jeremy Monga ao Arsenal por £10 milhões — o Arsenal estava em negociações avançadas mas o City entrou com uma proposta superior e convenceu o jovem prodígio inglês com um projeto de desenvolvimento a longo prazo apresentado por Enzo Maresca. Em paralelo, Bradley Barcola do PSG abriu a porta à saída ao não garantir a permanência numa conferência de imprensa. O Liverpool tem o francês no topo da lista de alvos e está a preparar uma proposta milionária. O PSG pode aceitar se chegar uma oferta certa. Dois movimentos que podem mudar o mercado.",
    summary_en: "Two major transfer moves confirmed by Fabrizio Romano! Manchester City hijacked Jeremy Monga from Arsenal for £10 million — Arsenal were in advanced negotiations but City came in with a superior proposal and convinced the young English prodigy with a long-term development project presented by Enzo Maresca. In parallel, PSG's Bradley Barcola opened the door to a departure by not guaranteeing his stay at a press conference. Liverpool have the Frenchman at the top of their target list and are preparing a multi-million pound proposal. PSG may accept if the right offer arrives. Two moves that could reshape the market.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "04/07/2026",
    engagement: "1.2B",
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
