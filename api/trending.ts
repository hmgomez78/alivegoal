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

// Notícias curadas — atualizadas 03/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA: Ibrahima Konaté de saída para o Real Madrid! Acordo fechado por 4 anos",
    title_en: "🚨 BOMBSHELL: Ibrahima Konaté leaving for Real Madrid! 4-year deal closed",
    summary: "NEGÓCIO FECHADO! Fabrizio Romano confirmou que Ibrahima Konaté vai juntar-se ao Real Madrid como agente livre após o término do seu contrato com o Liverpool. O defesa-central francês tem um acordo verbal para assinar um contrato de quatro anos com os merengues, condicionado à vitória de Florentino Pérez nas próximas eleições do clube. Uma perda gigante para o Liverpool!",
    summary_en: "DONE DEAL! Fabrizio Romano confirmed that Ibrahima Konaté will join Real Madrid as a free agent after his contract with Liverpool expires. The French centre-back has a verbal agreement to sign a four-year contract with Los Blancos, pending Florentino Pérez's victory in the upcoming club elections. A massive loss for Liverpool!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "3.2M",
  },
  {
    id: "t2",
    title: "⚖️ ESCÂNDALO: Novo caso de manipulação de apostas abala o Mundial 2026! Jogadores sob suspeita",
    title_en: "⚖️ SCANDAL: New match-fixing case rocks World Cup 2026! Players under suspicion",
    summary: "A COPA EM RISCO! Uma investigação do The Athletic revelou um novo escândalo de 'spot-fixing' envolvendo dois jogadores que estão prestes a participar no Mundial 2026. Os atletas foram reportados às suas federações por suspeitas de terem recebido cartões amarelos de forma deliberada em jogos recentes para beneficiar apostadores. A FIFA reiterou a sua política de 'tolerância zero' contra a manipulação de resultados.",
    summary_en: "THE WORLD CUP AT RISK! An investigation by The Athletic revealed a new spot-fixing scandal involving two players who are about to participate in the 2026 World Cup. The athletes were reported to their federations on suspicion of deliberately receiving yellow cards in recent matches to benefit bettors. FIFA reiterated its 'zero tolerance' policy against match manipulation.",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "2.5M",
  },
  {
    id: "t3",
    title: "🔥 CAOS: Motins em Paris após a final da Champions League! Governo francês prepara lei de segurança",
    title_en: "🔥 CHAOS: Riots in Paris after Champions League final! French government prepares security bill",
    summary: "VIOLÊNCIA NAS RUAS! A celebração da vitória do Paris Saint-Germain na final da Liga dos Campeões contra o Arsenal rapidamente se transformou em caos e violência nas ruas de Paris e outras 70 cidades francesas. Em resposta aos graves distúrbios, o governo francês anunciou que vai acelerar a aprovação de uma nova e rigorosa lei de segurança. O presidente Macron está a ser fortemente criticado pela gestão da crise.",
    summary_en: "VIOLENCE IN THE STREETS! The celebration of Paris Saint-Germain's victory in the Champions League final against Arsenal quickly turned into chaos and violence in the streets of Paris and 70 other French cities. In response to the severe riots, the French government announced it will fast-track the approval of a strict new security bill. President Macron is facing heavy criticism for his crisis management.",
    tag: "HOT",
    source: "@AlJazeera",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "1.9M",
  },
  {
    id: "t4",
    title: "💣 TRANSFERÊNCIA: Marco Silva é o novo treinador do Benfica! Acordo alcançado até 2028",
    title_en: "💣 TRANSFER: Marco Silva is the new Benfica manager! Agreement reached until 2028",
    summary: "REGRESSO A PORTUGAL! Marco Silva deixou o Fulham e tem um princípio de acordo para ser o novo treinador do Sport Lisboa e Benfica. O técnico português, que orientava a equipa londrina desde 2021, assinará um contrato válido por duas temporadas (até junho de 2028), com mais um ano de opção. Uma mudança surpreendente que promete agitar o futebol português na próxima época!",
    summary_en: "RETURN TO PORTUGAL! Marco Silva has left Fulham and has an agreement in principle to become the new manager of Sport Lisboa e Benfica. The Portuguese coach, who managed the London team since 2021, will sign a two-year contract (until June 2028), with an option for an additional year. A surprising move that promises to shake up Portuguese football next season!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "1.5M",
  },
  {
    id: "t5",
    title: "⚡ REVELAÇÃO: Barcelona bate Real Madrid e Man City na contratação de Enzo Pérez",
    title_en: "⚡ REVELATION: Barcelona beats Real Madrid and Man City to sign Enzo Pérez",
    summary: "A MASIA REFORÇADA! O Barcelona superou a forte concorrência do Real Madrid, Atlético de Madrid e Manchester City para garantir a contratação de Enzo Pérez. O jovem médio de 14 anos, que brilhou pelo Girona e os guiou à glória no campeonato de sub-14, decidiu regressar ao Barça, o seu clube do coração, rejeitando propostas milionárias de outros gigantes europeus.",
    summary_en: "LA MASIA REINFORCED! Barcelona overcame stiff competition from Real Madrid, Atlético Madrid, and Manchester City to secure the signing of Enzo Pérez. The 14-year-old midfielder, who shone for Girona and led them to U14 league glory, decided to return to Barça, his boyhood club, rejecting lucrative offers from other European giants.",
    tag: "TRANSFER",
    source: "@DiarioSport",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "1.1M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: Tonda Eckert pede desculpa no escândalo 'Spygate' mas mantém cargo no Southampton",
    title_en: "🚨 BREAKING: Tonda Eckert apologizes in 'Spygate' scandal but keeps job at Southampton",
    summary: "PERDÃO DOS DONOS! O treinador do Southampton, Tonda Eckert, assumiu total responsabilidade pelo escândalo 'Spygate', onde o clube foi apanhado a espiar três adversários, resultando na expulsão dos play-offs e numa dedução de quatro pontos na próxima época do Championship. Apesar de pedir desculpa aos adeptos e jogadores, Eckert recebeu o apoio do presidente Dragon Solak e continuará no cargo.",
    summary_en: "OWNERS' FORGIVENESS! Southampton head coach Tonda Eckert has taken full responsibility for the 'Spygate' scandal, where the club was caught spying on three opponents, resulting in expulsion from the play-offs and a four-point deduction next Championship season. Despite apologizing to fans and players, Eckert received backing from chairman Dragon Solak and will remain in charge.",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "03/06/2026",
    engagement: "1.4M",
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
