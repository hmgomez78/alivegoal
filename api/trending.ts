import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs20.x",
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

// Notícias curadas manualmente — atualizadas quando o utilizador pede
// Formato: título PT, título EN, resumo PT, resumo EN, tag, url do X
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "ARSENAL NA FINAL DA CHAMPIONS LEAGUE! Gunners eliminam Atlético com golo de Saka",
    title_en: "ARSENAL IN THE CHAMPIONS LEAGUE FINAL! Gunners eliminate Atletico with Saka goal",
    summary: "O Arsenal garantiu o apuramento para a final da UEFA Champions League após vencer o Atlético de Madrid por 1-0 na 2ª mão da semi-final. Bukayo Saka marcou o único golo da partida. Os Gunners vão disputar a sua primeira final europeia desde 2006.",
    summary_en: "Arsenal secured their place in the UEFA Champions League final after beating Atletico Madrid 1-0 in the second leg of the semi-final. Bukayo Saka scored the only goal. The Gunners will play their first European final since 2006.",
    tag: "BREAKING",
    source: "@AliveGoal",
    url: "https://x.com/alivegoal",
    time: "05/05/2026",
    engagement: "47.2K",
  },
  {
    id: "t2",
    title: "ESCÂNDALO: Árbitro da UCL acusado de favorecer o PSG — UEFA abre investigação",
    title_en: "SCANDAL: UCL referee accused of favouring PSG — UEFA opens investigation",
    summary: "A UEFA abriu uma investigação formal ao árbitro da partida PSG vs Bayern München após polémicas decisões que beneficiaram o clube parisiense. Vários clubes e federações exigiram transparência. O caso pode resultar em suspensão.",
    summary_en: "UEFA has opened a formal investigation into the referee of the PSG vs Bayern München match following controversial decisions that benefited the Parisian club. Several clubs and federations demanded transparency. The case could result in a suspension.",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/05/2026",
    engagement: "89.1K",
  },
  {
    id: "t3",
    title: "BOMBA: Mbappé quer SAIR do Real Madrid ao fim da primeira época — reunião de emergência",
    title_en: "BOMB: Mbappé wants to LEAVE Real Madrid after first season — emergency meeting",
    summary: "Kylian Mbappé terá comunicado ao Real Madrid a sua intenção de explorar outras opções no final da época. O avançado francês estaria descontente com o papel que lhe foi atribuído no esquema tático de Ancelotti. O clube convocou uma reunião de emergência.",
    summary_en: "Kylian Mbappé reportedly communicated to Real Madrid his intention to explore other options at the end of the season. The French striker was said to be unhappy with the role assigned to him in Ancelotti's tactical system. The club called an emergency meeting.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "124.7K",
  },
  {
    id: "t4",
    title: "Bayern vs PSG ESTA NOITE: Quem vai à final? As odds estão LOUCAS",
    title_en: "Bayern vs PSG TONIGHT: Who goes to the final? The odds are CRAZY",
    summary: "O Bayern München recebe o PSG esta noite na Allianz Arena para a 2ª mão da semi-final da Champions League. O PSG venceu a 1ª mão por 5-4 num jogo épico. As odds apontam para um jogo com muitos golos — Over 2.5 está a @1.65.",
    summary_en: "Bayern München host PSG tonight at the Allianz Arena for the second leg of the Champions League semi-final. PSG won the first leg 5-4 in an epic match. Odds point to a high-scoring game — Over 2.5 is at @1.65.",
    tag: "HOT",
    source: "@AliveGoal",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "31.4K",
  },
  {
    id: "t5",
    title: "ESCÂNDALO na Moçambola: Jogador expulso por morder adversário — 6 meses de suspensão",
    title_en: "SCANDAL in Moçambola: Player expelled for biting opponent — 6-month ban",
    summary: "Um incidente insólito marcou a última jornada da Moçambola 2026. Um jogador do Ferroviário de Nampula foi expulso após morder um adversário do Costa do Sol durante uma disputa de bola. A Federação Moçambicana de Futebol anunciou uma suspensão de 6 meses.",
    summary_en: "An unusual incident marked the latest round of Moçambola 2026. A Ferroviário de Nampula player was sent off after biting a Costa do Sol opponent during a ball dispute. The Mozambican Football Federation announced a 6-month ban.",
    tag: "SCANDAL",
    source: "@AliveGoal",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "18.9K",
  },
  {
    id: "t6",
    title: "OFICIAL: Cristiano Ronaldo anuncia data de reforma — 'Ainda tenho 2 anos'",
    title_en: "OFFICIAL: Cristiano Ronaldo announces retirement date — 'I still have 2 years'",
    summary: "Cristiano Ronaldo concedeu uma entrevista exclusiva onde revelou que planeia retirar-se do futebol profissional em 2028, após o término do contrato com o Al-Nassr. O português, com 41 anos, afirmou estar em 'melhor forma do que nunca' e com ambições de conquistar mais títulos.",
    summary_en: "Cristiano Ronaldo gave an exclusive interview where he revealed he plans to retire from professional football in 2028, after his Al-Nassr contract expires. The Portuguese, aged 41, claimed to be in 'better shape than ever' with ambitions to win more titles.",
    tag: "BREAKING",
    source: "@Cristiano",
    url: "https://x.com/alivegoal",
    time: "06/05/2026",
    engagement: "203.5K",
  },
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
