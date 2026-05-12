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

// Notícias curadas — atualizadas 12/05/2026 (Tarde)
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 FESTA NO DRAGÃO! FC Porto esgota estádio para a consagração do 31º título!",
    title_en: "🏆 PARTY AT THE DRAGÃO! FC Porto sells out stadium for 31st title celebration!",
    summary: "LOUCURA NA INVICTA! Os bilhetes para o jogo de consagração do FC Porto contra o Santa Clara esgotaram em tempo recorde. A equipa de André Villas-Boas vai celebrar a conquista do 31º título da Liga Portugal num Estádio do Dragão completamente lotado. A Avenida dos Aliados já se prepara para a grande festa no sábado, dia 16!",
    summary_en: "MADNESS IN PORTO! Tickets for FC Porto's title celebration match against Santa Clara sold out in record time. André Villas-Boas' team will celebrate winning their 31st Liga Portugal title in a completely packed Estádio do Dragão. Avenida dos Aliados is already preparing for the massive party on Saturday, the 16th!",
    tag: "BREAKING",
    source: "@FCPorto",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.2M",
  },
  {
    id: "t2",
    title: "😱 CRISE TOTAL NO REAL MADRID! Adeptos exigem saída de Mbappé após época sem títulos!",
    title_en: "😱 TOTAL CRISIS AT REAL MADRID! Fans demand Mbappé's exit after trophyless season!",
    summary: "CAOS NO BERNABÉU! O Real Madrid vive a pior crise da última década. Após perder a La Liga para o Barcelona e ser eliminado da Champions, os adeptos perderam a paciência com Kylian Mbappé. Há relatos de discussões no balneário entre jogadores. O ESPN confirma: Florentino Pérez pondera mudanças drásticas. Liverpool e Arsenal já contactaram os agentes do francês!",
    summary_en: "CHAOS AT THE BERNABÉU! Real Madrid is experiencing its worst crisis in a decade. After losing La Liga to Barcelona and being eliminated from the Champions League, fans have lost patience with Kylian Mbappé. There are reports of dressing room arguments between players. ESPN confirms: Florentino Pérez is considering drastic changes. Liverpool and Arsenal have already contacted the French star's agents!",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "5.1M",
  },
  {
    id: "t3",
    title: "🚨 NEYMAR NA COPA 2026! Ancelotti inclui o craque na pré-convocatória do Brasil!",
    title_en: "🚨 NEYMAR AT THE 2026 WORLD CUP! Ancelotti includes the star in Brazil's preliminary squad!",
    summary: "BOMBA NO BRASIL! Carlo Ancelotti enviou a lista de 55 pré-convocados para o Mundial 2026 e Neymar está incluído! O camisola 10 do Santos, que tem brilhado no Brasileirão, pode ser a grande surpresa na convocatória final. O debate está aceso: Neymar merece ir ao Mundial mais caro da história, que se realiza nos EUA, México e Canadá?",
    summary_en: "BOMB IN BRAZIL! Carlo Ancelotti has sent the 55-man preliminary squad for the 2026 World Cup and Neymar is included! The Santos number 10, who has been shining in the Brasileirão, could be the big surprise in the final squad. The debate is raging: does Neymar deserve to go to the most expensive World Cup in history, held in the USA, Mexico and Canada?",
    tag: "HOT",
    source: "@geglobo",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.8M",
  },
  {
    id: "t4",
    title: "💣 XABI ALONSO NO CHELSEA! Romano confirma: agentes contactados, negociações avançadas!",
    title_en: "💣 XABI ALONSO TO CHELSEA! Romano confirms: agents contacted, talks advanced!",
    summary: "MERCADO A FERVER! Fabrizio Romano confirmou esta manhã que os agentes de Xabi Alonso foram contactados pelo Chelsea. O clube londrino reduziu a lista de treinadores a 5 nomes, com o espanhol no topo. Jamie Carragher afirmou na Sky Sports que seria o 'casamento perfeito'. Alonso está sem clube desde que deixou o Real Madrid e quer a Premier League!",
    summary_en: "TRANSFER MARKET BOILING! Fabrizio Romano confirmed this morning that Xabi Alonso's agents were contacted by Chelsea. The London club has narrowed the managerial shortlist to 5 names, with the Spaniard at the top. Jamie Carragher stated on Sky Sports it would be the 'perfect marriage'. Alonso has been without a club since leaving Real Madrid and wants the Premier League!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.9M",
  },
  {
    id: "t5",
    title: "🏆 BARCELONA EM FESTA! Lamine Yamal levanta bandeira da Palestina no desfile do título!",
    title_en: "🏆 BARCELONA CELEBRATES! Lamine Yamal raises Palestinian flag at title parade!",
    summary: "IMAGENS VIRAIS! O Barcelona desfilou pelas ruas da cidade para celebrar a dobradinha (La Liga e Supertaça). Durante a festa, o jovem Lamine Yamal surpreendeu ao exibir uma bandeira da Palestina, gerando uma onda de reações nas redes sociais. Hansi Flick também confirmou a renovação de contrato até 2028 com opção até 2029!",
    summary_en: "VIRAL IMAGES! Barcelona paraded through the city streets to celebrate their double (La Liga and Super Cup). During the party, youngster Lamine Yamal surprised everyone by displaying a Palestinian flag, generating a wave of reactions on social media. Hansi Flick also confirmed his contract renewal until 2028 with option until 2029!",
    tag: "HOT",
    source: "@FCBarcelona",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.7M",
  },
  {
    id: "t6",
    title: "🔥 SPORTING ULTRAPASSA BENFICA! Leões goleiam Rio Ave 4-1 e assumem o 2º lugar!",
    title_en: "🔥 SPORTING OVERTAKES BENFICA! Lions thrash Rio Ave 4-1 and take 2nd place!",
    summary: "REVIRAVOLTA NA LIGA! O Sporting goleou o Rio Ave por 4-1 e aproveitou o empate do Benfica com o Braga (2-2) para subir ao 2º lugar da Liga Portugal. A uma jornada do fim, os leões têm 2 pontos de vantagem sobre as águias e estão muito perto de garantir o acesso direto à Champions League. Final de época dramático!",
    summary_en: "TURNAROUND IN THE LEAGUE! Sporting thrashed Rio Ave 4-1 and took advantage of Benfica's draw with Braga (2-2) to climb to 2nd place in Liga Portugal. With one matchday left, the Lions have a 2-point lead over the Eagles and are very close to securing direct access to the Champions League. Dramatic end to the season!",
    tag: "BREAKING",
    source: "@SportingCP",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.1M",
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
