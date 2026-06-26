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

// Notícias curadas — atualizadas 26/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Equador humilha a Alemanha 2-1 num dos maiores choques do Mundial 2026!",
    title_en: "🚨 BREAKING: Ecuador stun Germany 2-1 in one of the biggest World Cup 2026 upsets!",
    summary: "O inacreditável aconteceu! O Equador, que ainda não tinha vencido no grupo E, derrubou a poderosa Alemanha por 2-1 num jogo épico no estádio de Nova Iorque/Nova Jérsia. Os alemães, que tinham goleado o Curaçao por 7-1 na estreia, foram surpreendidos por uma equipa equatoriana determinada e guerreira. O resultado deixou a Costa do Marfil como segunda classificada e enviou a Alemanha para os oitavos como segunda do grupo, num resultado que abalou o futebol mundial.",
    summary_en: "The unbelievable happened! Ecuador, who had yet to win in Group E, toppled the mighty Germany 2-1 in an epic game at the New York/New Jersey Stadium. The Germans, who had crushed Curaçao 7-1 in their opener, were stunned by a determined and combative Ecuadorian side. The result left Ivory Coast as runners-up and sent Germany into the Round of 32 as group runners-up, in a result that shocked world football.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "512.7M",
  },
  {
    id: "t2",
    title: "🔥 BREAKING: Mbappé vs Haaland hoje! França enfrenta a Noruega numa batalha de titãs!",
    title_en: "🔥 BREAKING: Mbappe vs Haaland today! France face Norway in a battle of titans!",
    summary: "O duelo mais esperado do Mundial 2026 está prestes a acontecer! Kylian Mbappé e Erling Haaland, ambos com 4 golos cada no torneio, defrontam-se hoje no Grupo I. França e Noruega já estão apuradas, mas o jogo decide quem lidera o grupo. Mbappé tem estado em forma devastadora, enquanto Haaland tem sido imparável. Os adeptos de todo o mundo aguardam com ansiedade este confronto histórico entre os dois melhores jogadores do mundo.",
    summary_en: "The most anticipated duel of the 2026 World Cup is about to happen! Kylian Mbappe and Erling Haaland, both with 4 goals each in the tournament, face off today in Group I. France and Norway have already qualified, but the game decides who tops the group. Mbappe has been in devastating form, while Haaland has been unstoppable. Fans around the world eagerly await this historic clash between the two best players in the world.",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "489.3M",
  },
  {
    id: "t3",
    title: "⚽ TRANSFER: Chelsea confirma contratação de Marco Palestra da Atalanta!",
    title_en: "⚽ TRANSFER: Chelsea confirm signing of Marco Palestra from Atalanta!",
    summary: "O Chelsea oficializou a contratação de Marco Palestra, jovem lateral da Atalanta, num negócio que inclui um pacote de valores com bónus. Fabrizio Romano confirmou que os documentos formais foram assinados entre Chelsea, Atalanta e o jogador. Os blues continuam ativos no mercado e ainda pretendem contratar pelo menos um defesa central, com Maxence Lacroix como principal alvo. O Chelsea está a construir uma equipa para a próxima temporada sob as ordens de Enzo Maresca.",
    summary_en: "Chelsea have officially confirmed the signing of Marco Palestra, the young Atalanta wing-back, in a deal that includes a package with bonuses. Fabrizio Romano confirmed that formal documents were signed between Chelsea, Atalanta and the player. The Blues remain active in the market and still intend to sign at least one centre-back, with Maxence Lacroix as the primary target. Chelsea are building a squad for next season under Enzo Maresca.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "267.4M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: Carro atropela adeptos em Guadalajara durante o Mundial 2026!",
    title_en: "🚨 SCANDAL: Car ploughs into fans in Guadalajara during World Cup 2026!",
    summary: "Cenas chocantes e perturbadoras foram registadas nas imediações do estádio de Guadalajara, no México, durante as celebrações do Mundial 2026. Um veículo embateu numa multidão de adeptos, causando feridos. As autoridades mexicanas ativaram de imediato os protocolos de emergência e a FIFA emitiu um comunicado a condenar o incidente. A segurança nos arredores dos estádios voltou a ser posta em causa, gerando um debate aceso sobre as medidas de proteção dos adeptos.",
    summary_en: "Shocking and disturbing scenes were recorded near the Guadalajara stadium in Mexico during the 2026 World Cup celebrations. A vehicle ploughed into a crowd of fans, causing injuries. Mexican authorities immediately activated emergency protocols and FIFA issued a statement condemning the incident. Security around stadiums was once again called into question, sparking a heated debate about fan protection measures.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "398.1M",
  },
  {
    id: "t5",
    title: "💥 HOT: Espanha vs Uruguai — A batalha decisiva pelo topo do Grupo H!",
    title_en: "💥 HOT: Spain vs Uruguay — The decisive battle for the top of Group H!",
    summary: "A seleção espanhola, liderada pelo prodígio Lamine Yamal, enfrenta esta madrugada um Uruguai desesperado que precisa de vencer para garantir a qualificação. A Espanha já está apurada mas joga o primeiro lugar do grupo. Federico Valverde e Darwin Núñez são as armas do Uruguai para tentar surpreender a campeã europeia. Um jogo com tudo para ser um clássico sul-americano vs europeu de enorme intensidade e qualidade técnica.",
    summary_en: "The Spanish national team, led by prodigy Lamine Yamal, faces a desperate Uruguay side tonight that needs to win to secure qualification. Spain are already through but are playing for top spot in the group. Federico Valverde and Darwin Nunez are Uruguay's weapons to try and surprise the European champions. A game that has all the ingredients to be a classic South American vs European clash of enormous intensity and technical quality.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "341.6M",
  },
  {
    id: "t6",
    title: "🔥 TRANSFER: Man City fecha acordo por Elliot Anderson do Nottingham Forest!",
    title_en: "🔥 TRANSFER: Man City close in on Elliot Anderson deal from Nottingham Forest!",
    summary: "O Manchester City está a finalizar a contratação do médio inglês Elliot Anderson, do Nottingham Forest, por um valor estimado em €63M. Fabrizio Romano confirmou que as duas equipas realizaram uma reunião direta e que o acordo está nas fases finais. O City quer concluir a transferência o mais rapidamente possível. Anderson, de 22 anos, é visto como um dos talentos mais promissores do futebol inglês e será uma peça fundamental no projeto de Pep Guardiola para a próxima temporada.",
    summary_en: "Manchester City are finalising the signing of English midfielder Elliot Anderson from Nottingham Forest for an estimated €63M. Fabrizio Romano confirmed that the two clubs held a direct meeting and that the deal is in its final stages. City want to complete the transfer as quickly as possible. Anderson, 22, is seen as one of the most promising talents in English football and will be a key piece in Pep Guardiola's project for next season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "26/06/2026",
    engagement: "223.8M",
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
