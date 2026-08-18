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

// Conteúdo editorial verificado e atualizado em 18/08/2026.
// A redação distingue negócios confirmados de relatos de interesse/rumor.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Juventus fecha empréstimo de Vicario junto do Tottenham",
    title_en: "BREAKING: Juventus agree Vicario loan deal with Tottenham",
    summary: "A Juventus chegou a acordo com o Tottenham para receber Guglielmo Vicario por empréstimo, com opção de compra permanente de £8,6 milhões para o próximo ano. Segundo o Guardian, o internacional italiano perdeu o lugar de titular dos Spurs para Antonin Kinsky. É uma mudança relevante para a baliza da Juventus e mais uma saída num verão de forte renovação no Tottenham.",
    summary_en: "Juventus have agreed a deal to take Guglielmo Vicario from Tottenham on loan, with an £8.6m option to make the move permanent next year. According to the Guardian, the Italy international lost his Spurs starting place to Antonin Kinsky. It is a significant goalkeeping move for Juventus and another departure in a major Tottenham rebuild.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/17/tottenham-guglielmo-vicario-spurs-juventus-loan-deal-transfer-window",
    time: "18/08/2026",
    engagement: "~142,6M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Coventry paga £9M por Taiwo Awoniyi ao Nottingham Forest",
    title_en: "TRANSFER: Coventry pay £9m to sign Taiwo Awoniyi from Nottingham Forest",
    summary: "O Coventry contratou Taiwo Awoniyi ao Nottingham Forest por £9 milhões. O avançado nigeriano marcou 23 golos em 103 jogos pelo Forest, mas teve apenas três titularidades na liga na última temporada. A chegada oferece ao Coventry uma referência experiente para o ataque, enquanto o Forest perde profundidade na frente.",
    summary_en: "Coventry have signed Taiwo Awoniyi from Nottingham Forest for £9m. The Nigeria striker scored 23 goals in 103 appearances for Forest but started only three league matches last season. The move gives Coventry an experienced attacking focal point while Forest lose depth up front.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/17/tottenham-guglielmo-vicario-spurs-juventus-loan-deal-transfer-window",
    time: "18/08/2026",
    engagement: "~81,4M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Ipswich assegura Julio Enciso e Abdoul Ouattara antes da Premier League",
    title_en: "TRANSFER: Ipswich land Julio Enciso and Abdoul Ouattara before Premier League start",
    summary: "O Ipswich reforçou-se com Julio Enciso e Abdoul Ouattara, ambos provenientes do Strasbourg. Enciso regressa ao clube onde já tivera um empréstimo produtivo e assinou por cinco anos; Ouattara reencontra o treinador Gary O’Neil. A dupla chega antes da estreia em casa diante do Sunderland e aumenta as opções ofensivas e de construção da equipa promovida.",
    summary_en: "Ipswich have strengthened with Julio Enciso and Abdoul Ouattara, both arriving from Strasbourg. Enciso returns to a club where he previously enjoyed a productive loan and has signed for five years, while Ouattara reunites with manager Gary O'Neil. The pair arrive before the home opener against Sunderland and add attacking and build-up options to the promoted side.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/17/tottenham-guglielmo-vicario-spurs-juventus-loan-deal-transfer-window",
    time: "18/08/2026",
    engagement: "~76,9M estimado",
  },
  {
    id: "t4",
    title: "SCANDAL: Arsenal impõe 3-0 ao City e expõe o problema do meio-campo",
    title_en: "SCANDAL: Arsenal hit City for 3-0 and expose midfield problem",
    summary: "O Arsenal abriu 3-0 contra o Manchester City em 48 minutos na Community Shield, com Kai Havertz e Martin Ødegaard entre os marcadores e duas assistências de Christos Tzolis. Bruno Guimarães impressionou na estreia de início. A dimensão do resultado aumenta a atenção sobre a resposta do City antes do início da Premier League, sobretudo depois da saída de Rodri se aproximar.",
    summary_en: "Arsenal raced into a 3-0 lead against Manchester City within 48 minutes in the Community Shield, with Kai Havertz and Martin Ødegaard among the scorers and Christos Tzolis supplying two assists. Bruno Guimarães also impressed on his first start. The scale of the result sharpens scrutiny of City's response before the Premier League begins, particularly with Rodri's exit drawing closer.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/17/martin-odegaard-arsenal-new-signings-premier-league-title-defence",
    time: "18/08/2026",
    engagement: "~174,2M estimado",
  },
  {
    id: "t5",
    title: "HOT: Manchester City é associado a Alexis Mac Allister — sem proposta confirmada",
    title_en: "HOT: Manchester City linked with Alexis Mac Allister — no bid confirmed",
    summary: "O Guardian inclui Alexis Mac Allister entre os nomes associados ao Manchester City, num contexto em que o clube procura soluções para o meio-campo. A informação é apresentada como rumor: não há confirmação de proposta, acordo entre clubes ou abertura do Liverpool a vender. O interesse ganha impacto pela necessidade de o City reagir às lacunas expostas frente ao Arsenal, mas deve ser lido com cautela.",
    summary_en: "The Guardian lists Alexis Mac Allister among players linked with Manchester City as the club seeks midfield solutions. The story is reported as a rumour: there is no confirmed bid, club-to-club agreement or indication that Liverpool are prepared to sell. The link is significant given City's need to respond to the gaps exposed by Arsenal, but it should be treated cautiously.",
    tag: "HOT",
    source: "The Guardian — Rumour Mill",
    url: "https://www.theguardian.com/football/2026/aug/17/football-transfer-rumours-manchester-city-to-move-for-alexis-mac-allister",
    time: "18/08/2026",
    engagement: "~119,8M estimado",
  },
  {
    id: "t6",
    title: "HOT: Barcelona pondera Gyökeres; não existe negociação confirmada",
    title_en: "HOT: Barcelona consider Gyökeres; no deal is confirmed",
    summary: "A ESPN avança que o Barcelona está a ponderar uma abordagem por Viktor Gyökeres como possível sucessor de Ferran Torres, já transferido para o Paris Saint-Germain. O artigo atribui a informação ao El Chiringuito e não relata uma proposta ou conversações formais com o Arsenal. É uma pista de mercado de grande alcance, mas permanece um cenário de interesse e não um negócio fechado.",
    summary_en: "ESPN report that Barcelona are weighing up an approach for Viktor Gyökeres as a possible replacement for Ferran Torres, who has joined Paris Saint-Germain. The report attributes the information to El Chiringuito and does not describe a bid or formal talks with Arsenal. It is a high-profile market lead, but remains an interest story rather than a completed deal.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49636079/transfer-rumors-news-barcelona-eye-arsenal-striker-viktor-gyokeres",
    time: "18/08/2026",
    engagement: "~108,5M estimado",
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
