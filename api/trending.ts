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

// Notícias curadas — atualizadas 04/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA: Denzel Dumfries de saída para o Real Madrid! Acordo fechado",
    title_en: "🚨 BOMBSHELL: Denzel Dumfries leaving for Real Madrid! Deal closed",
    summary: "NEGÓCIO FECHADO! Fabrizio Romano confirmou que Denzel Dumfries vai juntar-se ao Real Madrid. O lateral neerlandês tem um acordo para assinar com os merengues, condicionado à vitória de Florentino Pérez nas próximas eleições do clube. O Inter de Milão já foi informado do negócio!",
    summary_en: "DONE DEAL! Fabrizio Romano confirmed that Denzel Dumfries will join Real Madrid. The Dutch full-back has an agreement to sign with Los Blancos, pending Florentino Pérez's victory in the upcoming club elections. Inter Milan has already been informed of the deal!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "3.5M",
  },
  {
    id: "t2",
    title: "🔥 CAOS: José Mourinho confirmado como novo treinador do Real Madrid!",
    title_en: "🔥 CHAOS: José Mourinho confirmed as new Real Madrid manager!",
    summary: "O REGRESSO DO SPECIAL ONE! Florentino Pérez confirmou que José Mourinho será o próximo treinador do Real Madrid, com um contrato de três anos. Mourinho está totalmente envolvido no mercado de transferências, incluindo as contratações de Konaté e Dumfries. O anúncio oficial está para breve!",
    summary_en: "THE RETURN OF THE SPECIAL ONE! Florentino Pérez confirmed that José Mourinho will be the next Real Madrid manager, with a three-year contract. Mourinho is fully involved in the transfer market, including the signings of Konaté and Dumfries. The official announcement is coming soon!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "4.2M",
  },
  {
    id: "t3",
    title: "⚖️ ESCÂNDALO: Mandado de detenção emitido para Brandon Aiyuk!",
    title_en: "⚖️ SCANDAL: Arrest warrant issued for Brandon Aiyuk!",
    summary: "PROBLEMAS COM A JUSTIÇA! Um mandado de detenção foi emitido para o wide receiver dos San Francisco 49ers, Brandon Aiyuk, devido a um incidente de excesso de velocidade que surgiu em dezembro passado. O mundo do desporto está em choque com esta revelação!",
    summary_en: "LEGAL TROUBLE! An arrest warrant has been issued for San Francisco 49ers wide receiver Brandon Aiyuk over a speeding incident that surfaced last December. The sports world is in shock with this revelation!",
    tag: "SCANDAL",
    source: "@KRON4",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "2.1M",
  },
  {
    id: "t4",
    title: "💣 TRANSFERÊNCIA: Éderson é o primeiro reforço do Manchester United!",
    title_en: "💣 TRANSFER: Éderson is Manchester United's first signing!",
    summary: "REFORÇO DE PESO! O Manchester United fechou a contratação do médio Éderson, da Atalanta, por cerca de 40 milhões de euros mais bónus. O jogador brasileiro já tinha um acordo verbal com os Red Devils e rejeitou propostas de Espanha e Alemanha para jogar em Old Trafford.",
    summary_en: "MAJOR SIGNING! Manchester United has closed the signing of midfielder Éderson from Atalanta for around €40 million plus add-ons. The Brazilian player already had a verbal agreement with the Red Devils and rejected offers from Spain and Germany to play at Old Trafford.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "2.8M",
  },
  {
    id: "t5",
    title: "⚡ REVELAÇÃO: Ismael Saibari muito perto de assinar pelo Bayern Munique",
    title_en: "⚡ REVELATION: Ismael Saibari very close to signing for Bayern Munich",
    summary: "REFORÇO SURPRESA! O Bayern Munique chegou a acordo com o internacional marroquino Ismael Saibari. O jogador do PSV teve uma conversa positiva com o treinador Vincent Kompany e os detalhes do contrato já estão fechados. Falta apenas o acordo entre os clubes sobre o valor da transferência.",
    summary_en: "SURPRISE SIGNING! Bayern Munich has reached an agreement with Moroccan international Ismael Saibari. The PSV player had a positive conversation with manager Vincent Kompany and the contract details are already settled. Only the agreement between the clubs regarding the transfer fee is missing.",
    tag: "TRANSFER",
    source: "@FootMercato",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "1.7M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: Bernardo Silva decide futuro apenas após o Mundial 2026",
    title_en: "🚨 BREAKING: Bernardo Silva to decide future only after the 2026 World Cup",
    summary: "DECISÃO ADIADA! O agente de Bernardo Silva confirmou que o internacional português só vai decidir o seu próximo clube após o Campeonato do Mundo. Barcelona e Atlético de Madrid já enviaram propostas oficiais, mas o jogador prefere concentrar-se totalmente na seleção nacional por agora.",
    summary_en: "DECISION POSTPONED! Bernardo Silva's agent confirmed that the Portuguese international will only decide his next club after the World Cup. Barcelona and Atlético Madrid have already sent official proposals, but the player prefers to focus entirely on the national team for now.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "04/06/2026",
    engagement: "1.9M",
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
