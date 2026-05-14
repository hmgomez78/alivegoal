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

// Notícias curadas — atualizadas 14/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA! Florentino Pérez exige sanções severas ao Barcelona no 'Caso Negreira' e ameaça UEFA!",
    title_en: "🚨 BOMBSHELL! Florentino Pérez demands severe sanctions for Barcelona in the 'Negreira Case' and threatens UEFA!",
    summary: "GUERRA DECLARADA! O presidente do Real Madrid, Florentino Pérez, afirmou que a relação com o Barcelona está 'completamente quebrada' devido ao escândalo de corrupção de arbitragem. O Real Madrid exige que a UEFA aplique punições desportivas imediatas ao rival catalão, que por sua vez ameaça com processos legais contra Florentino. O maior escândalo da história do futebol espanhol atinge o ponto de ebulição!",
    summary_en: "WAR DECLARED! Real Madrid president Florentino Pérez stated that the relationship with Barcelona is 'completely broken' due to the refereeing corruption scandal. Real Madrid demands that UEFA apply immediate sporting punishments to their Catalan rivals, who in turn threaten legal action against Florentino. The biggest scandal in Spanish football history reaches boiling point!",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "15.2M",
  },
  {
    id: "t2",
    title: "😱 SPYGATE: Southampton arrisca expulsão dos Playoffs após analista ser apanhado a espiar o Middlesbrough!",
    title_en: "😱 SPYGATE: Southampton risks Playoff expulsion after analyst caught spying on Middlesbrough!",
    summary: "ESCÂNDALO EM INGLATERRA! O Southampton foi formalmente acusado pela EFL de má conduta após um analista do clube ter sido fotografado a espiar o treino do Middlesbrough, 48 horas antes da meia-final dos Playoffs. O Middlesbrough exige a expulsão imediata do Southampton da final, onde estão em jogo £140 milhões de acesso à Premier League. A decisão final da EFL está iminente!",
    summary_en: "SCANDAL IN ENGLAND! Southampton has been formally charged by the EFL with misconduct after a club analyst was photographed spying on Middlesbrough's training session, 48 hours before the Playoff semi-final. Middlesbrough demands Southampton's immediate expulsion from the final, where £140 million in Premier League promotion revenue is at stake. The EFL's final decision is imminent!",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "12.8M",
  },
  {
    id: "t3",
    title: "💰 ACORDO FECHADO! Anthony Gordon a caminho do Bayern Munique por £55M, mas Newcastle exige mais!",
    title_en: "💰 DEAL AGREED! Anthony Gordon on his way to Bayern Munich for £55M, but Newcastle demands more!",
    summary: "TRANSFERÊNCIA BOMBÁSTICA! Anthony Gordon chegou a acordo para um contrato de cinco anos com o Bayern Munique. O gigante alemão oferece cerca de £55 milhões pelo extremo inglês, mas o Newcastle mantém-se firme e exige pelo menos £75 milhões. As negociações continuam intensas, mas o jogador já deu o 'sim' aos bávaros. O Liverpool, que também estava na corrida, parece ter ficado para trás!",
    summary_en: "BOMBSHELL TRANSFER! Anthony Gordon has agreed to a five-year contract with Bayern Munich. The German giants are offering around £55 million for the English winger, but Newcastle stands firm and demands at least £75 million. Negotiations remain intense, but the player has already said 'yes' to the Bavarians. Liverpool, who were also in the race, seem to have fallen behind!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "9.5M",
  },
  {
    id: "t4",
    title: "🔥 CHOQUE NO REAL MADRID! Manchester United prepara oferta milionária por Federico Valverde após conflito!",
    title_en: "🔥 SHOCK AT REAL MADRID! Manchester United prepares a multi-million offer for Federico Valverde after conflict!",
    summary: "MERCADO AO RUBRO! O Manchester United está a monitorizar de perto a situação de Federico Valverde no Real Madrid. O médio uruguaio terá tido um desentendimento grave no centro de treinos com Aurélien Tchouaméni e perdeu espaço na equipa. Os 'Red Devils' estão prontos para avançar com uma proposta astronómica para resgatar o jogador, aproveitando a fúria de Florentino Pérez com a situação!",
    summary_en: "MARKET ON FIRE! Manchester United is closely monitoring Federico Valverde's situation at Real Madrid. The Uruguayan midfielder reportedly had a serious bust-up at the training ground with Aurélien Tchouaméni and has lost his place in the team. The 'Red Devils' are ready to move forward with an astronomical offer to rescue the player, taking advantage of Florentino Pérez's fury over the situation!",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "11.1M",
  },
  {
    id: "t5",
    title: "🚨 MOURINHO E BENFICA: Acordo de indemnização de 7 milhões de euros definido em caso de saída!",
    title_en: "🚨 MOURINHO AND BENFICA: €7 million compensation agreement set in case of departure!",
    summary: "CLÁUSULA MILIONÁRIA! José Mourinho e o Benfica chegaram a acordo sobre o valor final da indemnização caso o treinador decida abandonar o clube da Luz: 7 milhões de euros. Rui Costa já apresentou uma proposta de renovação de contrato para segurar o 'Special One', que tem sido fortemente assediado pelo Real Madrid. Mourinho reiterou o desejo de ficar, mas o mercado promete ser agitado!",
    summary_en: "MILLIONAIRE CLAUSE! José Mourinho and Benfica have reached an agreement on the final compensation amount if the manager decides to leave the club: 7 million euros. Rui Costa has already presented a contract renewal offer to keep the 'Special One', who has been heavily courted by Real Madrid. Mourinho reiterated his desire to stay, but the market promises to be hectic!",
    tag: "BREAKING",
    source: "@Record",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "8.9M",
  },
  {
    id: "t6",
    title: "💣 CHELSEA ATACA! 'Negócio do Verão' por Jonathan Rowe do Bologna para substituir Garnacho!",
    title_en: "💣 CHELSEA ATTACKS! 'Deal of the Summer' for Bologna's Jonathan Rowe to replace Garnacho!",
    summary: "MOVIMENTAÇÃO SURPRESA! O Chelsea identificou Jonathan Rowe, extremo do Bologna, como o alvo principal para substituir Alejandro Garnacho. Os 'Blues' estão a preparar uma oferta de 40 milhões de euros (£34.6M) pelo jogador de 22 anos, num negócio que está a ser apelidado de 'transferência do verão'. O Bologna teme não conseguir segurar a sua estrela perante o poderio financeiro dos londrinos!",
    summary_en: "SURPRISE MOVE! Chelsea has identified Bologna winger Jonathan Rowe as the main target to replace Alejandro Garnacho. The 'Blues' are preparing a €40 million (£34.6M) bid for the 22-year-old, in a deal being dubbed the 'transfer of the summer'. Bologna fears they won't be able to keep their star against the financial might of the Londoners!",
    tag: "TRANSFER",
    source: "@Gazzetta",
    url: "https://x.com/alivegoal",
    time: "14/05/2026",
    engagement: "7.4M",
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
