import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs",
};

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source: string;
  url: string;
}

// Notícias curadas — atualizadas 11/05/2026
const CURATED_NEWS: NewsArticle[] = [
  {
    id: 1,
    category: "ANÁLISE TÁTICA",
    title: "Como Hansi Flick transformou o Barcelona em Campeão da La Liga",
    excerpt: "O Barcelona conquistou a La Liga com uma vitória por 2-0 no El Clásico. Analisamos a revolução tática de Hansi Flick: pressão alta, intensidade constante e a reinvenção de jogadores chave como Rashford e Ferran Torres.",
    readTime: "8 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 2,
    category: "TIPS DE APOSTAS",
    title: "Arsenal na luta pelo título após vitória sobre o West Ham (0-1)",
    excerpt: "Arsenal venceu o West Ham 0-1 com polémica do VAR no último minuto. A equipa de Arteta mantém a pressão na liderança. Análise das próximas apostas no Arsenal para a reta final da Premier League.",
    readTime: "5 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 3,
    category: "ANÁLISE TÁTICA",
    title: "FINAL DA CHAMPIONS: PSG vs Arsenal a 30 de Maio em Budapeste!",
    excerpt: "A final da UEFA Champions League 2025/26 está confirmada: PSG vs Arsenal a 30 de maio no Puskás Aréna. PSG eliminou o Bayern Munich 6-5 no agregado. Arsenal eliminou o Inter de Milão. Análise completa das duas equipas.",
    readTime: "7 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 4,
    category: "PRÉ-JOGO",
    title: "BENFICA vs BRAGA: Mourinho precisa de vencer para garantir a Champions!",
    excerpt: "José Mourinho enfrenta o Braga numa batalha crucial pelo 2º lugar e a qualificação para a Champions League. Benfica invicto há 47 jogos na Liga Portugal. Pavlidis com 24 golos é imbatível em casa.",
    readTime: "5 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 5,
    category: "ANÁLISE TÁTICA",
    title: "FINAL DA EUROPA LEAGUE: Aston Villa vs Freiburg — 27 de Maio em Bilbau!",
    excerpt: "A final da UEFA Europa League 2025/26 está confirmada: Aston Villa vs Freiburg a 27 de maio no Estádio San Mamés, Bilbau. Primeira final europeia do Villa desde 1982. Análise das odds e previsões.",
    readTime: "5 min",
    date: "Ontem",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 6,
    category: "TRANSFERÊNCIAS",
    title: "Ederson → Man United: O que muda no meio-campo dos Red Devils",
    excerpt: "Com Casemiro a sair e Ugarte a decepcionar, o Manchester United aposta em Ederson do Atalanta por £40M num contrato de 5 anos. Analisamos o impacto tático desta contratação para a temporada 2026/27.",
    readTime: "6 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 7,
    category: "ESCÂNDALO",
    title: "SPYGATE: Southampton apanhado a espiar treino do Middlesbrough nos arbustos!",
    excerpt: "Um funcionário do Southampton foi apanhado a filmar o treino do Middlesbrough escondido nos arbustos antes da meia-final do play-off da Championship! A EFL abriu processo disciplinar por 'má conduta'. O escândalo mais bizarro do futebol inglês em anos.",
    readTime: "4 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
  {
    id: 8,
    category: "PRÉ-JOGO",
    title: "SPORTING vs RIO AVE: Gyökeres (32 golos) quer bater recorde da Liga Portugal",
    excerpt: "Viktor Gyökeres, com 32 golos na Liga Portugal, está a dois golos do recorde histórico de Mário Jardel. O Sporting visita o Rio Ave esta noite às 19:15 numa partida que pode ser histórica para o avançado sueco.",
    readTime: "4 min",
    date: "Hoje",
    source: "AliveGoal",
    url: "https://alivegoal.com",
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    source: "curated",
    count: CURATED_NEWS.length,
    updatedAt: new Date().toISOString(),
    articles: CURATED_NEWS,
  });
}
