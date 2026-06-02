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

// Notícias curadas — atualizadas 02/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA: Savinho muito perto do Tottenham! Manchester City aceita negociar por valor mais baixo",
    title_en: "🚨 BOMBSHELL: Savinho very close to Tottenham! Manchester City agrees to negotiate for lower fee",
    summary: "NEGÓCIO IMINENTE! Fabrizio Romano confirmou que as negociações entre o Tottenham e o Manchester City por Savinho estão em andamento. O extremo brasileiro de 22 anos, que ficou de fora da convocatória para o Mundial, está aberto à mudança em busca de mais tempo de jogo. O City pode aceitar vender por £50 milhões, um valor £10 milhões abaixo do pedido no verão passado. Uma contratação de peso para o sistema de Roberto De Zerbi!",
    summary_en: "DEAL IMMINENT! Fabrizio Romano confirmed that negotiations between Tottenham and Manchester City for Savinho are ongoing. The 22-year-old Brazilian winger, who missed out on the World Cup squad, is open to the move in search of regular playing time. City could accept £50 million, £10 million less than last summer's asking price. A massive signing for Roberto De Zerbi's system!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "1.2M",
  },
  {
    id: "t2",
    title: "⚖️ ESCÂNDALO: Novos detalhes no caso de apostas de Brendan Sorsby! Documentos revelam histórico chocante",
    title_en: "⚖️ SCANDAL: New details in Brendan Sorsby betting case! Documents reveal shocking history",
    summary: "O CASO SORSBY AGRAVA-SE! O quarterback do Texas Tech, Brendan Sorsby, submeteu o seu histórico de apostas aos tribunais no caso contra a suspensão indefinida da NCAA. Relatórios indicam que Sorsby 'fez um Pete Rose', apostando nos jogos da sua própria equipa. A batalha legal continua, com o jogador a tentar recuperar a elegibilidade e as suas aspirações à NFL. Um escândalo que continua a abalar o desporto universitário americano!",
    summary_en: "SORSBY CASE WORSENS! Texas Tech quarterback Brendan Sorsby has submitted his betting history to the courts in the case against the NCAA's indefinite suspension. Reports indicate Sorsby 'pulled a Pete Rose', betting on his own team's matches. The legal battle continues, with the player trying to regain eligibility and his NFL aspirations. A scandal that continues to rock American college sports!",
    tag: "SCANDAL",
    source: "@USAToday",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "950K",
  },
  {
    id: "t3",
    title: "⚡ REVELAÇÃO: Arsenal prepara investimento brutal! Várias contratações a caminho após o título",
    title_en: "⚡ REVELATION: Arsenal prepares massive investment! Several signings on the way after title",
    summary: "OS CAMPEÕES QUEREM MAIS! Após a conquista da Premier League e a impressionante parada de vitória em Londres, o Arsenal não vai abrandar. Fabrizio Romano revelou que os 'Gunners' estão preparados para investir fortemente em várias contratações este verão para melhorar ainda mais o plantel. Mikel Arteta quer garantir que a equipa continua a dominar o futebol inglês e ataca a Liga dos Campeões na próxima época.",
    summary_en: "THE CHAMPIONS WANT MORE! After winning the Premier League and the impressive victory parade in London, Arsenal won't slow down. Fabrizio Romano revealed that the 'Gunners' are set to invest heavily in several signings this summer to further improve the squad. Mikel Arteta wants to ensure the team continues to dominate English football and challenges for the Champions League next season.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "2.1M",
  },
  {
    id: "t4",
    title: "🔥 CAOS: Seleção Brasileira a caminho do Mundial 2026! Vini Jr e Neymar lideram a equipa de Ancelotti",
    title_en: "🔥 CHAOS: Brazil national team on the way to World Cup 2026! Vini Jr and Neymar lead Ancelotti's team",
    summary: "RUMO AO HEXA! A Seleção Brasileira já embarcou num avião temático rumo aos Estados Unidos para a preparação final do Mundial 2026. Com Carlo Ancelotti no comando e estrelas como Neymar Jr. (recém-convocado após lesão) e Vini Jr., o Brasil é um dos grandes favoritos. Ancelotti confessou ter 'dúvidas positivas' após as boas exibições dos reservas no último amigável contra o Panamá. A nação inteira sonha com o título!",
    summary_en: "ROAD TO THE HEXA! The Brazilian national team has boarded a themed plane heading to the United States for the final preparation of the 2026 World Cup. With Carlo Ancelotti in charge and stars like Neymar Jr. (recently called up after injury) and Vini Jr., Brazil is one of the top favorites. Ancelotti confessed having 'positive doubts' after good performances from the reserves in the last friendly against Panama. The whole nation dreams of the title!",
    tag: "HOT",
    source: "@CBF_Futebol",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "3.5M",
  },
  {
    id: "t5",
    title: "💣 TRANSFERÊNCIA: AS Monaco garante Ansu Fati em definitivo! Acordo fechado por 11 milhões de euros",
    title_en: "💣 TRANSFER: AS Monaco secures Ansu Fati permanently! Deal closed for 11 million euros",
    summary: "FIM DA LINHA NO BARÇA! Fabrizio Romano confirmou o 'Here We Go' para a transferência de Ansu Fati. O AS Monaco chegou a acordo total para manter o extremo espanhol a título definitivo, pagando cerca de 11 milhões de euros ao Barcelona. Após o acordo verbal no mês passado, tudo está pronto para a assinatura do contrato. Uma nova oportunidade para Fati relançar a sua carreira na Ligue 1!",
    summary_en: "END OF THE LINE AT BARÇA! Fabrizio Romano confirmed the 'Here We Go' for Ansu Fati's transfer. AS Monaco has reached a full agreement to keep the Spanish winger permanently, paying around 11 million euros to Barcelona. After the verbal agreement last month, everything is set for the contract signing. A new opportunity for Fati to relaunch his career in Ligue 1!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "1.8M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: Eagles trocam A.J. Brown para os Patriots! Negócio bombástico na NFL",
    title_en: "🚨 BREAKING: Eagles trade A.J. Brown to the Patriots! Blockbuster deal in the NFL",
    summary: "CHOQUE NA NFL! Numa troca surpreendente que abalou o mundo do desporto americano, os Philadelphia Eagles enviaram o Pro-Bowl Wide Receiver A.J. Brown para os New England Patriots em troca de uma escolha de primeira ronda de 2028. Esta movimentação altera significativamente o equilíbrio de forças na liga e dá aos Patriots uma arma ofensiva de elite que procuravam há muito tempo.",
    summary_en: "NFL SHOCKER! In a surprising trade that shook the American sports world, the Philadelphia Eagles sent Pro-Bowl Wide Receiver A.J. Brown to the New England Patriots in exchange for a 2028 first-round pick. This move significantly alters the balance of power in the league and gives the Patriots an elite offensive weapon they have long been looking for.",
    tag: "BREAKING",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "02/06/2026",
    engagement: "2.8M",
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
