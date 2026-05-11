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
    title: "😱 ESCÂNDALO TOTAL: Southampton apanhado a espiar treino do Middlesbrough nos arbustos! EFL abre processo!",
    title_en: "😱 TOTAL SCANDAL: Southampton caught spying on Middlesbrough training from the bushes! EFL opens proceedings!",
    summary: "Um funcionário do Southampton foi apanhado a filmar o treino do Middlesbrough escondido nos arbustos antes da meia-final do play-off da Championship! A EFL já abriu um processo disciplinar por 'má conduta'. Vários clubes da Championship exigem a expulsão do Southampton dos play-offs. O escândalo mais bizarro do futebol inglês em anos!",
    summary_en: "A Southampton employee was caught filming Middlesbrough's training session hidden in the bushes before the Championship play-off semi-final! The EFL has already opened disciplinary proceedings for 'misconduct breach'. Several Championship clubs are demanding their expulsion from the play-offs. The most bizarre scandal in English football in years!",
    tag: "SCANDAL",
    source: "@EFL",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.9M",
  },
  {
    id: "t3",
    title: "💣 BOMBA: Ederson do Atalanta já disse SIM ao Manchester United! Acordo pessoal fechado por £43M!",
    title_en: "💣 BOMB: Atalanta's Ederson has said YES to Manchester United! Personal terms agreed for £43M!",
    summary: "Segundo Fabrizio Romano, o médio brasileiro Ederson Dos Santos, 26 anos, já acordou os termos pessoais com o Manchester United num contrato de 5 anos. O jogador custará cerca de £40 milhões ao clube inglês. Ederson é considerado um dos melhores médios defensivos da Europa. O United quer fechar o negócio rapidamente para substituir Casemiro.",
    summary_en: "According to Fabrizio Romano, Brazilian midfielder Ederson Dos Santos, 26, has already agreed personal terms with Manchester United on a 5-year contract. The player will cost around £40 million. Ederson is considered one of the best defensive midfielders in Europe. United want to close the deal quickly to replace Casemiro.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.8M",
  },
  {
    id: "t4",
    title: "🚨 ARNE SLOT FICA NO LIVERPOOL: Fabrizio Romano confirma que FSG mantém confiança no treinador!",
    title_en: "🚨 ARNE SLOT STAYS AT LIVERPOOL: Fabrizio Romano confirms FSG keeps faith in the manager!",
    summary: "Apesar da época difícil e da revolta dos adeptos em Anfield, Fabrizio Romano confirmou que o Liverpool planeia continuar com Arne Slot na próxima temporada. A direção da FSG mantém a confiança no projeto a longo prazo do treinador neerlandês, rejeitando os rumores de uma possível contratação de Xabi Alonso.",
    summary_en: "Despite a difficult season and fan mutiny at Anfield, Fabrizio Romano confirmed that Liverpool plan to continue with Arne Slot next season. The FSG board maintains faith in the Dutch manager's long-term project, rejecting rumors of a possible move for Xabi Alonso.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.2M",
  },
  {
    id: "t5",
    title: "🔥 HANSI FLICK PROMETE CHAMPIONS: Treinador do Barcelona aponta à glória europeia após título!",
    title_en: "🔥 HANSI FLICK PROMISES CHAMPIONS LEAGUE: Barcelona manager aims for European glory after title!",
    summary: "Após conquistar a La Liga, Hansi Flick já pensa no futuro: 'Sei que todos aqui querem ganhar a Champions League. Vamos tentar na próxima época. Precisamos de reforçar o plantel para levantar a taça'. O treinador alemão promete um Barcelona ainda mais forte para a temporada 2026/27, com o objetivo claro de dominar a Europa.",
    summary_en: "After winning La Liga, Hansi Flick is already thinking about the future: 'I know everyone here wants to win the Champions League. We will try next season. We need to strengthen the squad to lift the cup'. The German manager promises an even stronger Barcelona for the 2026/27 season, with the clear goal of dominating Europe.",
    tag: "HOT",
    source: "@FCBarcelona",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.5M",
  },
  {
    id: "t6",
    title: "😱 POLÉMICA NO ARSENAL vs WEST HAM: Golo anulado pelo VAR no último minuto gera revolta!",
    title_en: "😱 CONTROVERSY IN ARSENAL vs WEST HAM: Last-minute VAR disallowed goal sparks outrage!",
    summary: "O Arsenal venceu o West Ham por 0-1 (fora), mas o jogo ficou marcado por enorme polémica. O West Ham viu um golo de empate ser anulado pelo VAR aos 90+5' por uma suposta falta sobre David Raya. A decisão está a gerar um enorme debate sobre a influência do VAR na corrida pelo título da Premier League, com o Arsenal a manter a pressão no topo.",
    summary_en: "Arsenal beat West Ham 0-1 (away), but the game was marked by huge controversy. West Ham had an equalizer disallowed by VAR at 90+5' for an alleged foul on David Raya. The decision is generating a huge debate about VAR's influence on the Premier League title race, with Arsenal keeping the pressure at the top.",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "11/05/2026",
    engagement: "1.7M",
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
