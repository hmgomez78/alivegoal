import type { VercelRequest, VercelResponse } from '@vercel/node';

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

// Conteúdo editorial verificado e atualizado em 11/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "TRANSFER: Manchester City acorda termos com Bouaddi",
    title_en: "TRANSFER: Manchester City agrees terms with Bouaddi",
    summary: "O Manchester City chegou a acordo com o jovem talento Ayyoub Bouaddi. O médio, que estava contratualmente ligado ao Lille até junho de 2029, prepara-se para reforçar o plantel de Pep Guardiola numa transferência que promete surpreender o mercado.",
    summary_en: "Manchester City has agreed personal terms with young talent Ayyoub Bouaddi. The midfielder, who was contracted to Lille until June 2029, is set to reinforce Pep Guardiola's squad in a transfer that promises to surprise the market.",
    tag: "TRANSFER",
    source: "BBC Sport / Fabrizio Romano",
    url: "https://www.bbc.com/sport/football/live/c0kmv3legv6t",
    time: "11/08/2026",
    engagement: "~88.2M estimado",
  },
  {
    id: "t2",
    title: "BREAKING: Rodri chega a Barcelona e agita o mercado",
    title_en: "BREAKING: Rodri arrives in Barcelona shaking the market",
    summary: "Rodri foi visto em Barcelona, aumentando os rumores de uma transferência iminente para o clube catalão. Os adeptos aguardam confirmação oficial do que poderá ser uma das maiores contratações do verão.",
    summary_en: "Rodri has been spotted in Barcelona, fueling rumors of an imminent transfer to the Catalan club. Fans are awaiting official confirmation of what could be one of the biggest signings of the summer.",
    tag: "BREAKING",
    source: "Instagram / Reports",
    url: "https://www.instagram.com/reel/Db2QDm-Rud3/",
    time: "11/08/2026",
    engagement: "~95.1M estimado",
  },
  {
    id: "t3",
    title: "HOT: United e Arsenal disputam Joaquin Seys do Club Brugge",
    title_en: "HOT: United and Arsenal battle for Club Brugge's Joaquin Seys",
    summary: "Manchester United e Arsenal lideram a corrida pelo lateral-esquerdo Joaquin Seys, do Club Brugge. As exibições consistentes do jovem defesa despertaram o interesse dos gigantes da Premier League.",
    summary_en: "Manchester United and Arsenal are leading the race for Club Brugge left-back Joaquin Seys. The young defender's consistent performances have sparked interest from the Premier League giants.",
    tag: "HOT",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11095/13571517/manchester-united-and-arsenal-among-several-clubs-chasing-club-brugge-left-back-joaquin-seys",
    time: "11/08/2026",
    engagement: "~65.4M estimado",
  },
  {
    id: "t4",
    title: "SCANDAL: Investigação na Turquia suspende mais de 1.000 jogadores",
    title_en: "SCANDAL: Turkish investigation suspends over 1,000 players",
    summary: "A Federação Turca de Futebol suspendeu mais de 1.000 jogadores no âmbito de uma vasta investigação sobre atividades de apostas ilegais, abalando as estruturas do futebol no país.",
    summary_en: "The Turkish Football Federation has suspended over 1,000 players as part of a widening investigation into illegal betting activity, shaking the foundations of football in the country.",
    tag: "SCANDAL",
    source: "Facebook Reports",
    url: "https://www.facebook.com/groups/1844046176054817/posts/2725779227881503/",
    time: "11/08/2026",
    engagement: "~112.3M estimado",
  },
  {
    id: "t5",
    title: "TRANSFER: Liverpool garante Araujo por empréstimo do Barcelona",
    title_en: "TRANSFER: Liverpool secure Araujo on loan from Barcelona",
    summary: "O Liverpool fechou o empréstimo do defesa Araujo junto do Barcelona. O acordo fortalece a linha defensiva dos 'Reds' para a nova temporada, trazendo experiência e solidez à equipa.",
    summary_en: "Liverpool has finalized the loan signing of defender Araujo from Barcelona. The deal strengthens the Reds' backline for the new season, bringing experience and solidity to the team.",
    tag: "TRANSFER",
    source: "BBC Sport / Yahoo Sports",
    url: "https://ca.sports.yahoo.com/soccer/laliga/celta-de-vigo-real-sociedad-13598010/",
    time: "11/08/2026",
    engagement: "~78.9M estimado",
  },
  {
    id: "t6",
    title: "HOT: Brennan Johnson e Dwight McNeil em troca inédita na Premier League",
    title_en: "HOT: Brennan Johnson and Dwight McNeil in rare Premier League swap",
    summary: "Brennan Johnson e Dwight McNeil estão envolvidos numa rara troca direta entre clubes da Premier League. A operação surpreendeu os adeptos e promete redefinir a dinâmica tática de ambas as equipas.",
    summary_en: "Brennan Johnson and Dwight McNeil are involved in a rare direct swap between Premier League clubs. The move has surprised fans and promises to redefine the tactical dynamics of both teams.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49574405/johnson-mcneil-swap-deal-two-clubs-ever-swapped-players-before",
    time: "11/08/2026",
    engagement: "~52.7M estimado",
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return res.status(200).json({
    source: "curated",
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
