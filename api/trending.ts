import { VercelRequest, VercelResponse } from '@vercel/node';

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

// Conteúdo editorial verificado e reescrito em 01/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Crise na FIFA adensa-se após oposição de UEFA e Concacaf a plano de Infantino",
    title_en: "SCANDAL: FIFA crisis deepens as UEFA and Concacaf oppose Infantino's plan",
    summary: "O plano do presidente Gianni Infantino para vender participações comerciais nos torneios da FIFA a investidores privados (FFE) esbarrou na rejeição de confederações chave. Com a UEFA a admitir mesmo um boicote, cresce a pressão sobre a FIFA, que também abriu consulta para alargar o Mundial a 64 equipas.",
    summary_en: "President Gianni Infantino's plan to sell commercial stakes in FIFA tournaments to private investors (FFE) has met fierce rejection from key confederations. With UEFA even considering a boycott, pressure is mounting on FIFA, which has also opened a consultation to expand the World Cup to 64 teams.",
    tag: "SCANDAL",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49495670/fifa-64-team-world-cup-review-gianni-infantino-backlash",
    time: "01/08/2026",
    engagement: "~25.4M",
  },
  {
    id: "t2",
    title: "BREAKING: Eddie Howe deixa o comando do Newcastle e Jaissle perfila-se",
    title_en: "BREAKING: Eddie Howe leaves Newcastle helm with Jaissle in the frame",
    summary: "O Newcastle United confirmou a saída de Eddie Howe, encerrando uma era de cinco anos marcada por regressos à Champions e um troféu doméstico. Divergências sobre a política de transferências terão ditado o fim da linha, com Matthias Jaissle apontado como o provável sucessor.",
    summary_en: "Newcastle United confirmed Eddie Howe's departure, ending a five-year era marked by Champions League returns and domestic silverware. Disagreements over transfer policy reportedly sealed his fate, with Matthias Jaissle tipped as the likely successor.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/jul/30/eddie-howe-leaves-newcastle-united-premier-league",
    time: "01/08/2026",
    engagement: "~19.8M",
  },
  {
    id: "t3",
    title: "SCANDAL: York City despede treinador dias após promoção histórica",
    title_en: "SCANDAL: York City sack manager days after historic promotion",
    summary: "O York City tomou a decisão surpreendente de despedir Stuart Maynard, o treinador que conduziu o clube a uma época de 108 pontos e ao regresso à EFL. Scott Lindsey, ex-técnico do rival Crawley, assume antes do primeiro jogo oficial da nova campanha.",
    summary_en: "York City made the stunning decision to sack Stuart Maynard, the manager who led the club to a 108-point season and a return to the EFL. Former Crawley boss Scott Lindsey takes charge before the first competitive game of the new campaign.",
    tag: "SCANDAL",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cre4n19qzngo",
    time: "01/08/2026",
    engagement: "~8.6M",
  },
  {
    id: "t4",
    title: "TRANSFER: Sandro Tonali quebra recordes e reforça o Tottenham por £100m",
    title_en: "TRANSFER: Sandro Tonali breaks records to bolster Tottenham for £100m",
    summary: "O Tottenham garantiu a contratação de Sandro Tonali ao Newcastle por 100 milhões de libras, a transferência mais cara da história dos Spurs. O médio italiano revelou que a visão do técnico Roberto De Zerbi foi determinante para selar o acordo em poucos minutos.",
    summary_en: "Tottenham secured Sandro Tonali from Newcastle for £100 million, the most expensive transfer in Spurs' history. The Italian midfielder revealed that manager Roberto De Zerbi's vision was decisive in sealing the deal in a matter of minutes.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49495328/sandro-tonali-tottenham-premier-league-newcastle",
    time: "01/08/2026",
    engagement: "~14.5M",
  },
  {
    id: "t5",
    title: "HOT: Inter prepara nova investida de £30m por Curtis Jones",
    title_en: "HOT: Inter prepare new £30m swoop for Curtis Jones",
    summary: "Após ver a primeira abordagem rejeitada, o Inter de Milão estará a preparar uma oferta melhorada na ordem dos 35 milhões de euros (£30m) por Curtis Jones. O Liverpool, no entanto, mantém-se inflexível e exige um valor superior para libertar o médio.",
    summary_en: "After seeing their first approach rejected, Inter Milan are reportedly preparing an improved offer in the region of €35 million (£30m) for Curtis Jones. Liverpool, however, remain inflexible and demand a higher fee to release the midfielder.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "01/08/2026",
    engagement: "~11.7M",
  },
  {
    id: "t6",
    title: "HOT: PSG abre conversações por Mika Godts com preço de €60m",
    title_en: "HOT: PSG open talks for Mika Godts with €60m price tag",
    summary: "O Paris Saint-Germain virou atenções para o promissor extremo do Ajax, Mika Godts. Fontes do mercado indicam que as negociações já arrancaram, mas o emblema neerlandês fixou a fasquia nos 60 milhões de euros pelo talento belga.",
    summary_en: "Paris Saint-Germain have turned their attention to promising Ajax winger Mika Godts. Market sources indicate that negotiations are already underway, but the Dutch club have set the bar at €60 million for the Belgian talent.",
    tag: "HOT",
    source: "Fabrizio Romano",
    url: "https://www.instagram.com/reel/DbeP1SpRR8I/",
    time: "01/08/2026",
    engagement: "~9.1M",
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
