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

// Notícias curadas — atualizadas 24/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 O FIM DE UMA ERA: Pep Guardiola faz hoje o seu último jogo pelo Manchester City!",
    title_en: "🚨 THE END OF AN ERA: Pep Guardiola manages his final game for Manchester City today!",
    summary: "HISTÓRICO! Hoje é o último dia da era Pep Guardiola no Manchester City. O catalão, que conquistou 6 Premier Leagues e 1 Champions League, vai despedir-se do clube no jogo contra o Aston Villa no Etihad Stadium. A bancada Norte foi renomeada 'The Pep Guardiola Stand' em sua honra. Uma década de domínio absoluto no futebol inglês chega hoje ao fim. Guardiola afirmou que a sua 'energia e vibração estarão no clube para sempre'.",
    summary_en: "HISTORIC! Today marks the final day of the Pep Guardiola era at Manchester City. The Catalan, who won 6 Premier Leagues and 1 Champions League, will bid farewell to the club in the match against Aston Villa at the Etihad Stadium. The North Stand has been renamed 'The Pep Guardiola Stand' in his honour. A decade of absolute dominance in English football comes to an end today. Guardiola stated that his 'vibe and energy will be at the club forever'.",
    tag: "BREAKING",
    source: "@ManCity",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "154.2M",
  },
  {
    id: "t2",
    title: "🔥 ESCÂNDALO NO CHAMPIONSHIP: Hull City ameaça processo legal contra a EFL!",
    title_en: "🔥 CHAMPIONSHIP SCANDAL: Hull City threatens legal action against the EFL!",
    summary: "CAOS TOTAL! O dono do Hull City, Acun Ilicali, confirmou que o clube está pronto para avançar com um grande processo judicial se o Middlesbrough conseguir a promoção à Premier League. O escândalo surge após a exclusão do Southampton dos play-offs devido a espionagem, com o Hull City a exigir a promoção direta em vez de ter de disputar a final de emergência contra o Boro em Wembley. A FA já abriu uma investigação oficial!",
    summary_en: "TOTAL CHAOS! Hull City owner Acun Ilicali has confirmed the club is ready to launch a major lawsuit if Middlesbrough secure promotion to the Premier League. The scandal erupts following Southampton's exclusion from the play-offs due to spying, with Hull City demanding direct promotion instead of having to play the emergency final against Boro at Wembley. The FA has already launched an official investigation!",
    tag: "SCANDAL",
    source: "@DailySports",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "98.5M",
  },
  {
    id: "t3",
    title: "💰 EDERSON NO MANCHESTER UNITED: Acordo fechado por €50 Milhões!",
    title_en: "💰 EDERSON TO MANCHESTER UNITED: Deal done for €50 Million!",
    summary: "HERE WE GO! O Manchester United fechou a sua primeira grande contratação de verão: Éderson, médio da Atalanta. O acordo verbal foi alcançado e o brasileiro de 26 anos custará cerca de 50 milhões de euros aos cofres de Old Trafford. Éderson já deu luz verde à transferência, que será finalizada nos próximos dias. Um reforço de peso para o meio-campo dos Red Devils para a próxima temporada!",
    summary_en: "HERE WE GO! Manchester United have secured their first major summer signing: Éderson, Atalanta's midfielder. A verbal agreement has been reached and the 26-year-old Brazilian will cost around €50 million to the Old Trafford coffers. Éderson has already given the green light to the transfer, which will be finalized in the coming days. A massive reinforcement for the Red Devils' midfield for next season!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "112.3M",
  },
  {
    id: "t4",
    title: "🏆 BARCELONA FEMENÍ CAMPEÃO EUROPEU! 4ª Champions League conquistada com goleada!",
    title_en: "🏆 BARCELONA FEMENÍ EUROPEAN CHAMPIONS! 4th Champions League won with a thrashing!",
    summary: "RAINHAS DA EUROPA! O Barcelona Femení conquistou a sua 4ª UEFA Women's Champions League após destruir o Olympique Lyonnais por 4-0 na grande final em Oslo. Golos de Pajor e Paralluelo garantiram a vitória categórica da equipa catalã, que terminou a competição invicta. Uma época de sonho para o Barça, que confirmou mais uma vez a sua hegemonia absoluta no futebol feminino europeu!",
    summary_en: "QUEENS OF EUROPE! Barcelona Femení have won their 4th UEFA Women's Champions League after destroying Olympique Lyonnais 4-0 in the grand final in Oslo. Goals from Pajor and Paralluelo secured the categorical victory for the Catalan team, who finished the competition unbeaten. A dream season for Barça, who once again confirmed their absolute hegemony in European women's football!",
    tag: "HOT",
    source: "@UWCL",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "85.7M",
  },
  {
    id: "t5",
    title: "🚨 TENSÃO NO LIVERPOOL: Salah furioso com Arne Slot no adeus a Anfield!",
    title_en: "🚨 TENSION AT LIVERPOOL: Salah furious with Arne Slot in Anfield farewell!",
    summary: "CLIMA PESADO! A relação entre Mohamed Salah e Arne Slot atingiu o ponto de rutura. O astro egípcio ficou visivelmente furioso com o treinador holandês após decisões táticas recentes, num momento em que o seu contrato termina em 2026 e o seu adeus a Anfield parece iminente. Lendas do clube como Wayne Rooney chegaram a sugerir que Salah devia ser 'banido' do último jogo contra o Brentford. Um final amargo para o 'Rei do Egito'?",
    summary_en: "HEAVY ATMOSPHERE! The relationship between Mohamed Salah and Arne Slot has reached breaking point. The Egyptian star was visibly furious with the Dutch manager after recent tactical decisions, at a time when his contract ends in 2026 and his farewell to Anfield seems imminent. Club legends like Wayne Rooney even suggested Salah should be 'banned' from the final game against Brentford. A bitter end for the 'Egyptian King'?",
    tag: "SCANDAL",
    source: "@DailyMail",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "105.1M",
  },
  {
    id: "t6",
    title: "💰 CHELSEA GARANTE VALENTÍN BARCO: A primeira contratação da era Xabi Alonso!",
    title_en: "💰 CHELSEA SECURE VALENTÍN BARCO: The first signing of the Xabi Alonso era!",
    summary: "ACORDO FECHADO! O Chelsea garantiu a contratação do lateral argentino Valentín Barco junto do Strasbourg. Fabrizio Romano confirmou o 'Here We Go' para a transferência do talentoso jogador, que será a primeira contratação oficial da nova era sob o comando de Xabi Alonso. O novo treinador dos Blues assumirá o cargo a 1 de julho e já começou a moldar o plantel, tendo também bloqueado a saída de Marc Cucurella, apesar do interesse do Man City.",
    summary_en: "DEAL DONE! Chelsea have secured the signing of Argentine full-back Valentín Barco from Strasbourg. Fabrizio Romano confirmed the 'Here We Go' for the transfer of the talented player, who will be the first official signing of the new era under Xabi Alonso. The new Blues manager will take charge on July 1st and has already begun shaping the squad, having also blocked the departure of Marc Cucurella, despite interest from Man City.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "24/05/2026",
    engagement: "92.4M",
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
