import { VercelRequest, VercelResponse } from "@vercel/node";

export interface TrendingNews {
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

// Fallback data
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "🔥 HOT: Final do Século — Espanha vs Argentina no MetLife Stadium",
    title_en: "🔥 HOT: Match of the Century — Spain vs Argentina at MetLife Stadium",
    summary: "A final do Mundial 2026 acontece HOJE, às 20h (Lisboa), no MetLife Stadium em Nova Jérsia. A Espanha, invicta há 37 jogos e com apenas 1 golo sofrido no torneio, defronta a Argentina de Messi, que marcou 14 golos e 11 deles após o minuto 75. O duelo de gerações entre Lamine Yamal e Lionel Messi promete ser o jogo do século.",
    summary_en: "The 2026 World Cup final takes place TODAY at 3pm ET at MetLife Stadium in New Jersey. Spain, unbeaten in 37 games and having conceded just 1 goal in the tournament, face Messi's Argentina, who scored 14 goals with 11 of them after the 75th minute. The generational duel between Lamine Yamal and Lionel Messi promises to be the match of the century.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "142.7M",
  },
  {
    id: "t2",
    title: "🔥 BREAKING: Inglaterra 6-4 França — Jogo Histórico de 10 Golos no 3º Lugar!",
    title_en: "🔥 BREAKING: England 6-4 France — Historic 10-Goal Third Place Match!",
    summary: "A Inglaterra conquistou o 3º lugar do Mundial 2026 ao vencer a França por 6-4 num jogo absolutamente louco! Bukayo Saka fez um hat-trick, enquanto Mbappé quebrou o recorde histórico de golos em Mundiais, superando Messi. A Inglaterra esteve a vencer 4-0 ao intervalo, mas a França reagiu para 4-4 antes dos ingleses fecharem o marcador.",
    summary_en: "England claimed 3rd place at the 2026 World Cup with a stunning 6-4 win over France in an absolutely wild match! Bukayo Saka scored a hat-trick, while Mbappé broke the all-time World Cup scoring record, surpassing Messi. England led 4-0 at half-time, France came back to 4-4, before England sealed it.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "98.3M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Morgan Rogers para o Chelsea por £117M — Negócio Confirmado!",
    title_en: "⚡ TRANSFER: Morgan Rogers to Chelsea for £117M — Deal Confirmed!",
    summary: "O Chelsea confirmou a contratação de Morgan Rogers ao Aston Villa por 117 milhões de libras, num negócio que chocou o Arsenal e o Manchester United, que também disputavam o extremo inglês. Rogers assinou contrato até 2032 e torna-se uma das transferências mais caras do verão europeu. O Aston Villa já tinha vendido Johan Manzambi por £59.5M e agora encaixa mais este valor recorde.",
    summary_en: "Chelsea have confirmed the signing of Morgan Rogers from Aston Villa for £117 million, in a deal that stunned Arsenal and Manchester United, who were also chasing the English winger. Rogers has signed until 2032 and becomes one of the most expensive transfers of the European summer. Aston Villa had already sold Johan Manzambi for £59.5M and now pocket this further record fee.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "74.5M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: Escândalo Massivo na Turquia — +100 Suspensos por Viciação de Resultados",
    title_en: "🚨 SCANDAL: Massive Scandal in Turkey — 100+ Suspended for Match-Fixing",
    summary: "O futebol turco está em colapso total. As autoridades detiveram 17 dirigentes de clubes em raids simultâneos em 10 províncias, e a Federação Turca (TFF) suspendeu mais de 100 jogadores, árbitros e oficiais ligados a um esquema massivo de apostas ilegais e viciação de resultados. Entre os visados estão figuras de topo do Galatasaray e Besiktas. A UEFA já abriu investigação.",
    summary_en: "Turkish football is in total collapse. Authorities detained 17 club officials in simultaneous raids across 10 provinces, and the Turkish Football Federation (TFF) suspended over 100 players, referees and officials linked to a massive illegal betting and match-fixing scheme. Top figures from Galatasaray and Besiktas are among those targeted. UEFA has already opened an investigation.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "85.2M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Savinho para o Tottenham por £65M — Fabrizio Romano Confirma",
    title_en: "⚡ TRANSFER: Savinho to Tottenham for £65M — Fabrizio Romano Confirms",
    summary: "O Tottenham está prestes a fechar a contratação do extremo Savinho ao Manchester City por 65 milhões de libras, segundo Fabrizio Romano. O brasileiro, que brilhou no Mundial 2026 com o Brasil, chega para reforçar o ataque de Ange Postecoglou. O Man City já procura substitutos para o extremo. O Tottenham já gastou mais de €267M esta janela, tornando-se o clube que mais investiu no mundo.",
    summary_en: "Tottenham are on the verge of completing the signing of winger Savinho from Manchester City for £65 million, according to Fabrizio Romano. The Brazilian, who shone at the 2026 World Cup, arrives to bolster Ange Postecoglou's attack. Man City are already looking for replacements. Spurs have already spent over €267M this window, making them the biggest spenders in world football.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "58.9M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Ismael Saibari no Bayern de Munique — Bem-vindo a Munique!",
    title_en: "⚡ TRANSFER: Ismael Saibari to Bayern Munich — Welcome to Munich!",
    summary: "O Bayern de Munique completou a contratação do médio marroquino Ismael Saibari ao PSV Eindhoven. O internacional marroquino, que foi uma das revelações da Liga dos Campeões, já chegou a Munique e foi apresentado oficialmente. O Bayern continua a reforçar o plantel para a nova época com contratações de qualidade após a saída de Kimmich.",
    summary_en: "Bayern Munich have completed the signing of Moroccan midfielder Ismael Saibari from PSV Eindhoven. The Moroccan international, who was one of the Champions League's standout performers, has already arrived in Munich and was officially presented. Bayern continue to strengthen their squad for the new season with quality signings following Kimmich's departure.",
    tag: "TRANSFER",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "19/07/2026",
    engagement: "41.3M",
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
