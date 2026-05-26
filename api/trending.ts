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

// Notícias curadas — atualizadas 26/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 PREOCUPAÇÃO MUNDIAL COM MESSI! Astro argentino sai lesionado e assusta adeptos antes do Mundial 2026!",
    title_en: "🚨 WORLDWIDE CONCERN FOR MESSI! Argentine star comes off injured, scaring fans before the 2026 World Cup!",
    summary: "ALERTA VERMELHO NA ARGENTINA! Lionel Messi sofreu uma aparente lesão muscular na coxa esquerda durante a vitória do Inter Miami por 6-4 sobre o Philadelphia Union. O craque de 38 anos pediu para ser substituído aos 73 minutos, gerando pânico global a menos de dois meses do Campeonato do Mundo de 2026. A gravidade da lesão ainda é desconhecida, mas o mundo do futebol sustém a respiração. Estará em risco a presença do 'D10S' na sua última grande competição internacional?",
    summary_en: "RED ALERT IN ARGENTINA! Lionel Messi suffered an apparent left thigh muscle injury during Inter Miami's 6-4 win over Philadelphia Union. The 38-year-old star asked to be substituted in the 73rd minute, causing global panic less than two months before the 2026 World Cup. The severity of the injury is still unknown, but the football world holds its breath. Is the 'D10S' at risk of missing his last major international competition?",
    tag: "BREAKING",
    source: "@InterMiamiCF",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "312.5M",
  },
  {
    id: "t2",
    title: "🏆 FINAL DE LOUCOS NA CHAMPIONS! PSG e Arsenal preparam-se para o duelo do ano em Budapeste!",
    title_en: "🏆 CRAZY CHAMPIONS LEAGUE FINAL! PSG and Arsenal prepare for the duel of the year in Budapest!",
    summary: "O PALCO ESTÁ MONTADO! A grande final da Liga dos Campeões 2025/26 colocará frente a frente o Paris Saint-Germain, atual detentor do troféu, e o Arsenal, recém-coroado campeão da Premier League. O duelo marcado para 30 de maio em Budapeste promete ser épico. O PSG de Luis Enrique procura o bicampeonato inédito para o clube, enquanto os Gunners de Mikel Arteta, ainda a celebrar o fim de um jejum de 22 anos em Inglaterra, sonham com uma dobradinha histórica. Um embate de titãs que vai parar o mundo!",
    summary_en: "THE STAGE IS SET! The grand final of the 2025/26 Champions League will pit Paris Saint-Germain, the current trophy holders, against Arsenal, the newly crowned Premier League champions. The duel scheduled for May 30 in Budapest promises to be epic. Luis Enrique's PSG are looking for an unprecedented back-to-back title for the club, while Mikel Arteta's Gunners, still celebrating the end of a 22-year drought in England, dream of a historic double. A clash of titans that will stop the world!",
    tag: "HOT",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "285.4M",
  },
  {
    id: "t3",
    title: "💰 BOMBA DE MERCADO: Andy Robertson a caminho do Tottenham a custo zero!",
    title_en: "💰 TRANSFER BOMB: Andy Robertson on his way to Tottenham on a free transfer!",
    summary: "HERE WE GO! O Tottenham Hotspur chegou a um acordo verbal para a contratação de Andy Robertson. O capitão da seleção escocesa vai deixar o Liverpool a custo zero no final de junho e os Spurs anteciparam-se à concorrência, incluindo a Juventus. Após garantirem a manutenção na Premier League, o clube londrino inicia a sua grande reconstrução de verão com uma contratação de peso. Uma mudança surpreendente que promete agitar a hierarquia do futebol inglês na próxima temporada!",
    summary_en: "HERE WE GO! Tottenham Hotspur have reached a verbal agreement to sign Andy Robertson. The Scotland captain will leave Liverpool on a free transfer at the end of June and Spurs have beaten the competition, including Juventus. After securing their Premier League survival, the London club begins its major summer rebuild with a massive signing. A surprising move that promises to shake up the hierarchy of English football next season!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "198.2M",
  },
  {
    id: "t4",
    title: "🔥 DESPEDIDA EM LÁGRIMAS: Salah faz o último jogo pelo Liverpool e sai lesionado!",
    title_en: "🔥 TEARFUL FAREWELL: Salah plays his last game for Liverpool and goes off injured!",
    summary: "FIM DE UMA ERA EM ANFIELD! Mohamed Salah fez a sua última aparição com a camisola do Liverpool no empate 1-1 contra o Brentford. O 'Rei Egípcio' despediu-se dos adeptos num ambiente de forte emoção, mas a tarde ficou marcada por uma lesão que o obrigou a sair mais cedo. Apesar do susto, a federação egípcia já garantiu que Salah estará apto para o Mundial 2026. Anfield despede-se de uma verdadeira lenda que marcou uma geração de ouro no clube!",
    summary_en: "END OF AN ERA AT ANFIELD! Mohamed Salah made his last appearance in a Liverpool shirt in the 1-1 draw against Brentford. The 'Egyptian King' said goodbye to the fans in a highly emotional atmosphere, but the afternoon was marred by an injury that forced him off early. Despite the scare, the Egyptian FA has already guaranteed that Salah will be fit for the 2026 World Cup. Anfield bids farewell to a true legend who marked a golden generation at the club!",
    tag: "HOT",
    source: "@LFC",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "241.7M",
  },
  {
    id: "t5",
    title: "💰 MANCHESTER UNITED ATACA FORTE: Acordo verbal por Ederson da Atalanta!",
    title_en: "💰 MANCHESTER UNITED STRIKES HARD: Verbal agreement for Atalanta's Ederson!",
    summary: "NOVO REFORÇO A CAMINHO DE OLD TRAFFORD! O Manchester United, agora sob o comando permanente de Michael Carrick, chegou a um acordo verbal com o médio Ederson, estrela da Atalanta. O brasileiro de 26 anos recusou renovar com o clube italiano e os Red Devils estão prontos para avançar com uma proposta a rondar os 50 a 60 milhões de euros. Ederson é visto como o substituto ideal para a vaga deixada por Casemiro. A nova era do United no mercado começa a ganhar forma!",
    summary_en: "NEW SIGNING ON THE WAY TO OLD TRAFFORD! Manchester United, now under the permanent command of Michael Carrick, have reached a verbal agreement with midfielder Ederson, Atalanta's star. The 26-year-old Brazilian refused to renew with the Italian club and the Red Devils are ready to submit a bid around 50 to 60 million euros. Ederson is seen as the ideal replacement for the gap left by Casemiro. United's new era in the transfer market is taking shape!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "176.9M",
  },
  {
    id: "t6",
    title: "🚨 DESASTRE PARA ESPANHA: Lamine Yamal falha início do Mundial 2026 por lesão!",
    title_en: "🚨 DISASTER FOR SPAIN: Lamine Yamal to miss the start of the 2026 World Cup due to injury!",
    summary: "GOLPE DURO PARA LA ROJA! A jovem estrela do Barcelona e da seleção espanhola, Lamine Yamal, sofreu uma lesão nos isquiotibiais que o vai afastar do início do Campeonato do Mundo de 2026. O prodígio falhará certamente o jogo de abertura da fase de grupos contra Cabo Verde e a sua presença no resto do torneio está em sério risco. Uma baixa de peso para a equipa de Luis de la Fuente, que perde um dos seus jogadores mais desequilibradores a poucas semanas da grande competição.",
    summary_en: "HEAVY BLOW FOR LA ROJA! The young star of Barcelona and the Spanish national team, Lamine Yamal, has suffered a hamstring injury that will rule him out of the start of the 2026 World Cup. The prodigy will certainly miss the opening group stage match against Cape Verde and his presence in the rest of the tournament is at serious risk. A massive loss for Luis de la Fuente's team, who lose one of their most dangerous players just weeks before the big competition.",
    tag: "BREAKING",
    source: "@SEFutbol",
    url: "https://x.com/alivegoal",
    time: "26/05/2026",
    engagement: "215.3M",
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
