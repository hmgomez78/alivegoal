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

// Notícias curadas manualmente — atualizadas 10/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🔥 EL CLÁSICO HOJE! Barcelona vs Real Madrid — Barça pode ser CAMPEÃO esta noite com empate!",
    title_en: "🔥 EL CLASICO TODAY! Barcelona vs Real Madrid — Barça can be CHAMPIONS tonight with a draw!",
    summary: "O maior jogo do futebol mundial acontece HOJE às 21:00 no Camp Nou! Barcelona lidera com 88 pontos vs Real Madrid com 77. Um simples empate dá o 29º título ao Barça. Real Madrid chega em crise total: escândalo interno com Valverde e Tchouameni, Arbeloa chamou de 'traição absoluta'. Yamal vs Mbappé — o duelo do século! Odds: Barça @2.10, Empate @3.40, Real Madrid @3.60.",
    summary_en: "The biggest match in world football happens TODAY at 21:00 at Camp Nou! Barcelona lead with 88 points vs Real Madrid with 77. A simple draw gives Barça their 29th title. Real Madrid arrive in total crisis: internal scandal with Valverde and Tchouameni, Arbeloa called it an 'absolute betrayal'. Yamal vs Mbappé — the duel of the century! Odds: Barça @2.10, Draw @3.40, Real Madrid @3.60.",
    tag: "HOT",
    source: "@LaLiga",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "1.4M",
  },
  {
    id: "t2",
    title: "😱 ESCÂNDALO TOTAL: Southampton apanhado a espiar treino do Middlesbrough nos arbustos! EFL abre processo!",
    title_en: "😱 TOTAL SCANDAL: Southampton caught spying on Middlesbrough training from the bushes! EFL opens proceedings!",
    summary: "Um funcionário do Southampton foi apanhado a filmar o treino do Middlesbrough escondido nos arbustos antes da semi-final dos play-offs do Championship! O EFL já abriu processo disciplinar por 'violação de conduta'. O treinador do Southampton, Tonda Eckert, saiu furioso da conferência de imprensa. Vários clubes do Championship exigem a expulsão dos play-offs. O escândalo mais bizarro do futebol inglês em anos!",
    summary_en: "A Southampton employee was caught filming Middlesbrough's training session hidden in the bushes before the Championship play-off semi-final! The EFL has already opened disciplinary proceedings for 'misconduct breach'. Southampton manager Tonda Eckert stormed out of the press conference. Several Championship clubs are demanding their expulsion from the play-offs. The most bizarre scandal in English football in years!",
    tag: "SCANDAL",
    source: "@EFL",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "934.7K",
  },
  {
    id: "t3",
    title: "🚨 FILIPE LUÍS CANDIDATO FORTE ao cargo de treinador do CHELSEA! Fabrizio Romano confirma!",
    title_en: "🚨 FILIPE LUÍS STRONG CANDIDATE for CHELSEA head coach job! Fabrizio Romano confirms!",
    summary: "Fabrizio Romano confirmou que Filipe Luís é um 'nome a vigiar' para o cargo de treinador do Chelsea no verão. O ex-defesa do Chelsea e do Atlético de Madrid foi despedido pelo Flamengo após uma derrota por 8-0 em março. O Chelsea está à procura de um novo treinador após a má temporada de Liam Rosenior. Filipe Luís tem apenas 39 anos e surpreendeu com o seu trabalho no Flamengo. Uma história de regresso épica!",
    summary_en: "Fabrizio Romano confirmed that Filipe Luís is 'a name to watch' for the Chelsea head coach role this summer. The former Chelsea and Atletico Madrid defender was sacked by Flamengo after an 8-0 defeat in March. Chelsea are looking for a new manager after Liam Rosenior's poor season. Filipe Luís is only 39 years old and impressed with his work at Flamengo. An epic comeback story!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "678.3K",
  },
  {
    id: "t4",
    title: "💣 BOMBA: Ederson do Atalanta já disse SIM ao Manchester United! Acordo pessoal fechado por £43M!",
    title_en: "💣 BOMB: Atalanta's Ederson has said YES to Manchester United! Personal terms agreed for £43M!",
    summary: "Segundo o TEAMtalk e confirmado por Fabrizio Romano, o médio brasileiro Ederson Dos Santos, 26 anos, já acordou os termos pessoais com o Manchester United. O jogador custará entre £35-43 milhões ao clube inglês. Ederson tem 15 golos em 178 jogos pelo Atalanta e é considerado um dos melhores médios defensivos da Europa. O United quer fechar o negócio antes do Mundial de Clubes. Parceria com Kobbie Mainoo!",
    summary_en: "According to TEAMtalk and confirmed by Fabrizio Romano, Brazilian midfielder Ederson Dos Santos, 26, has already agreed personal terms with Manchester United. The player will cost between £35-43 million. Ederson has 15 goals in 178 games for Atalanta and is considered one of the best defensive midfielders in Europe. United want to close the deal before the Club World Cup. Partnership with Kobbie Mainoo!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "512.9K",
  },
  {
    id: "t5",
    title: "⚠️ ESCÂNDALO SPORTRADAR: Empresa de integridade do desporto acusada de trabalhar com apostadores ilegais!",
    title_en: "⚠️ SPORTRADAR SCANDAL: Sports integrity company accused of working with illegal betting operators!",
    summary: "A Muddy Waters Research publicou um relatório explosivo acusando a Sportradar — empresa que monitoriza a integridade de ligas como a NBA e MLB — de trabalhar secretamente com operadores de apostas ilegais. As ações da empresa despencaram. A UEFA, FIFA e várias ligas europeias que contratam a Sportradar estão em pânico. O maior escândalo da indústria das apostas desportivas em décadas. 'Quando a integridade é o maior bluff' — Público.",
    summary_en: "Muddy Waters Research published an explosive report accusing Sportradar — the company that monitors integrity for leagues including the NBA and MLB — of secretly working with illegal betting operators. The company's shares plummeted. UEFA, FIFA and several European leagues that hire Sportradar are in panic. The biggest scandal in the sports betting industry in decades. 'When integrity is the biggest bluff' — Público.",
    tag: "SCANDAL",
    source: "@MuddyWatersRes",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "423.1K",
  },
  {
    id: "t6",
    title: "🏆 Champions League: PSG vs Arsenal e Inter vs Atlético — Meias-Finais 2ª Mão TERÇA-FEIRA!",
    title_en: "🏆 Champions League: PSG vs Arsenal and Inter vs Atletico — Semi-Final 2nd Legs TUESDAY!",
    summary: "A semana mais emocionante do futebol europeu está a chegar! PSG (detentores do título) recebe o Arsenal na 2ª mão da semi-final na terça-feira. Arsenal ganhou 1-0 em casa. PSG eliminou o Bayern 6-5 no agregado numa épica. Inter de Milão recebe o Atlético de Madrid após empate 1-1. Quatro questões-chave: Mbappé joga? Saka está em forma? Oblak vs Lautaro? A final em Budapeste está a ser decidida!",
    summary_en: "The most exciting week in European football is coming! PSG (title holders) host Arsenal in the semi-final 2nd leg on Tuesday. Arsenal won 1-0 at home. PSG eliminated Bayern 6-5 on aggregate in an epic tie. Inter Milan host Atletico Madrid after a 1-1 draw. Four key questions: Does Mbappé play? Is Saka fit? Oblak vs Lautaro? The final in Budapest is being decided!",
    tag: "HOT",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "10/05/2026",
    engagement: "867.4K",
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
