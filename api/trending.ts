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

// Notícias curadas — atualizadas 11/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 BARCELONA CAMPEÃO! Barça vence El Clásico 2-0 e conquista o 29º título da La Liga!",
    title_en: "🏆 BARCELONA CHAMPIONS! Barça beat El Clasico 2-0 and win their 29th La Liga title!",
    summary: "HISTÓRICO! O Barcelona goleou o Real Madrid por 2-0 no Camp Nou e sagrou-se campeão da La Liga! Rashford abriu o marcador com um livre direto espetacular e Ferran Torres fez o 2-0. Real Madrid humilhado em casa do rival. Hansi Flick conquista a La Liga no seu primeiro ano no Barcelona. Festa épica no Camp Nou e crise profunda no Real Madrid!",
    summary_en: "HISTORIC! Barcelona thrashed Real Madrid 2-0 at Camp Nou and were crowned La Liga champions! Rashford opened the scoring with a spectacular direct free-kick and Ferran Torres made it 2-0. Real Madrid humiliated at their rivals' ground. Hansi Flick wins La Liga in his first year at Barcelona. Epic celebrations at Camp Nou and deep crisis at Real Madrid!",
    tag: "BREAKING",
    source: "@LaLiga",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "3.2M",
  },
  {
    id: "t2",
    title: "😱 ESCÂNDALO NO REAL MADRID: Mbappé excluído do El Clásico após férias em iate! Petição com 73M de assinaturas!",
    title_en: "😱 REAL MADRID SCANDAL: Mbappé excluded from El Clasico after yacht holiday! Petition with 73M signatures!",
    summary: "O caos instalou-se no Real Madrid! Kylian Mbappé foi excluído da convocatória para o El Clásico após ter ido de férias num iate enquanto recuperava de lesão. Os adeptos estão furiosos e uma petição a exigir a sua saída já conta com 73 milhões de assinaturas! A crise no clube merengue agrava-se após a perda do título para o Barcelona.",
    summary_en: "Chaos has taken over Real Madrid! Kylian Mbappé was excluded from the squad for El Clasico after going on a yacht holiday while recovering from injury. Fans are furious and a petition demanding his departure already has 73 million signatures! The crisis at the Merengue club deepens after losing the title to Barcelona.",
    tag: "SCANDAL",
    source: "@Marca",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "4.5M",
  },
  {
    id: "t3",
    title: "💣 BOMBA: Ederson do Atalanta já disse SIM ao Manchester United! Acordo pessoal fechado por £43M!",
    title_en: "💣 BOMB: Atalanta's Ederson has said YES to Manchester United! Personal terms agreed for £43M!",
    summary: "Segundo Fabrizio Romano, o médio brasileiro Ederson Dos Santos, 26 anos, já acordou os termos pessoais com o Manchester United. O jogador custará entre £35-43 milhões ao clube inglês. Ederson é considerado um dos melhores médios defensivos da Europa. O United quer fechar o negócio rapidamente para reforçar o meio-campo.",
    summary_en: "According to Fabrizio Romano, Brazilian midfielder Ederson Dos Santos, 26, has already agreed personal terms with Manchester United. The player will cost between £35-43 million. Ederson is considered one of the best defensive midfielders in Europe. United want to close the deal quickly to strengthen their midfield.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.8M",
  },
  {
    id: "t4",
    title: "🚨 XABI ALONSO NO CHELSEA? Conversas 'positivas' confirmadas por Fabrizio Romano!",
    title_en: "🚨 XABI ALONSO TO CHELSEA? 'Positive' talks confirmed by Fabrizio Romano!",
    summary: "O Chelsea abriu negociações com Xabi Alonso para assumir o comando técnico da equipa na próxima temporada. Fabrizio Romano confirmou que as primeiras conversas foram 'muito positivas'. O treinador espanhol é o alvo principal dos Blues para substituir o atual comando técnico e liderar um novo projeto em Stamford Bridge.",
    summary_en: "Chelsea have opened negotiations with Xabi Alonso to take over as head coach next season. Fabrizio Romano confirmed that the first talks were 'very positive'. The Spanish manager is the Blues' main target to replace the current coaching staff and lead a new project at Stamford Bridge.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "2.1M",
  },
  {
    id: "t5",
    title: "🔥 SPORTING PERTO DE ZALAZAR: Negócio de €30M com o Braga quase fechado!",
    title_en: "🔥 SPORTING CLOSE TO ZALAZAR: €30M deal with Braga almost done!",
    summary: "O Sporting CP está muito perto de garantir a contratação de Rodrigo Zalazar ao SC Braga. O negócio deverá rondar os 30 milhões de euros, tornando-se numa das maiores transferências internas do futebol português. O médio uruguaio tem sido uma das figuras da Liga Portugal e é um pedido expresso da equipa técnica leonina.",
    summary_en: "Sporting CP are very close to securing the signing of Rodrigo Zalazar from SC Braga. The deal is expected to be around 30 million euros, making it one of the biggest domestic transfers in Portuguese football. The Uruguayan midfielder has been one of the stars of Liga Portugal and is a specific request from the Lions' coaching staff.",
    tag: "TRANSFER",
    source: "@Record",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "950K",
  },
  {
    id: "t6",
    title: "😱 POLÉMICA NO ARSENAL vs WEST HAM: Golo anulado pelo VAR no último minuto gera revolta!",
    title_en: "😱 CONTROVERSY IN ARSENAL vs WEST HAM: Last-minute VAR disallowed goal sparks outrage!",
    summary: "O Arsenal venceu o West Ham por 1-0, mas o jogo ficou marcado por enorme polémica. O West Ham viu um golo de Callum Wilson ser anulado pelo VAR aos 90+5' por uma suposta falta sobre David Raya. Nuno Espírito Santo ficou furioso e a decisão está a gerar um enorme debate sobre a influência do VAR na corrida pelo título da Premier League.",
    summary_en: "Arsenal beat West Ham 1-0, but the game was marked by huge controversy. West Ham had a Callum Wilson goal disallowed by VAR at 90+5' for an alleged foul on David Raya. Nuno Espírito Santo was furious and the decision is generating a huge debate about VAR's influence on the Premier League title race.",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.5M",
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
