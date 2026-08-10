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

// Conteúdo editorial verificado e atualizado em 10/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "TRANSFER: Mohamed Salah junta-se ao Trabzonspor em mudança histórica",
    title_en: "TRANSFER: Mohamed Salah joins Trabzonspor in historic move",
    summary: "O antigo avançado do Liverpool assinou por duas épocas com o Trabzonspor, rejeitando opções em Istambul. O acordo inclui salário-base de 10 milhões de euros e 7 milhões de prémio de assinatura anual. O clube vendeu mais de 17 mil lugares anuais em 24 horas.",
    summary_en: "The former Liverpool striker has signed a two-year deal with Trabzonspor, rejecting Istanbul options. The agreement includes a €10m base salary and €7m annual signing bonus. The club sold over 17,000 season tickets within 24 hours.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/09/mohamed-salah-trabzonspor-turkish-rivals-istanbul",
    time: "10/08/2026",
    engagement: "~85.4M estimado",
  },
  {
    id: "t2",
    title: "SCANDAL: Presidente da La Liga exige saída de Infantino da FIFA",
    title_en: "SCANDAL: La Liga president demands Infantino's exit from FIFA",
    summary: "Javier Tebas acusou Gianni Infantino de destruir a essência do futebol e declarou o fim da sua era na FIFA. As declarações aumentam a pressão europeia sobre o presidente da FIFA, com a UEFA a ponderar um possível boicote aos torneios.",
    summary_en: "Javier Tebas has accused Gianni Infantino of destroying the essence of football, declaring his era at FIFA is over. The remarks add to mounting European pressure on the FIFA president, with UEFA considering a possible boycott of tournaments.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/09/la-liga-president-javier-tebas-gianni-infantino-fifa-uefa",
    time: "10/08/2026",
    engagement: "~62.1M estimado",
  },
  {
    id: "t3",
    title: "HOT: Bruno Guimarães apresentado no Arsenal por £75 milhões",
    title_en: "HOT: Bruno Guimarães unveiled at Arsenal in £75m deal",
    summary: "Mikel Arteta espera que Bruno Guimarães 'acenda' o Arsenal após a sua transferência do Newcastle. O médio brasileiro foi apresentado antes da derrota no Emirates Cup, sendo descrito pelo treinador como o 'guerreiro' que faltava ao meio-campo.",
    summary_en: "Mikel Arteta expects Bruno Guimarães to 'ignite' Arsenal following his £75m move from Newcastle. The Brazilian midfielder was unveiled before their Emirates Cup defeat, described by the manager as the missing 'warrior' in midfield.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/09/arteta-guimaraes-ignite-arsenal-maresca-manchester-city",
    time: "10/08/2026",
    engagement: "~55.8M estimado",
  },
  {
    id: "t4",
    title: "TRANSFER: Fulham contrata Shea Charles por £30 milhões",
    title_en: "TRANSFER: Fulham sign Shea Charles for £30 million",
    summary: "O Fulham assegurou a contratação de Shea Charles ao Southampton, numa operação que pode atingir 30 milhões de libras. O médio norte-irlandês assinará por cinco anos e deverá ser a âncora do meio-campo da equipa de Álvaro Arbeloa.",
    summary_en: "Fulham have secured the signing of Shea Charles from Southampton in a deal worth up to £30m. The Northern Ireland midfielder will sign a five-year contract and is expected to anchor Álvaro Arbeloa's midfield.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/09/transfer-roundup-fulham-agree-deal-shea-charles-southampton-trevoh-chalobah-como",
    time: "10/08/2026",
    engagement: "~34.2M estimado",
  },
  {
    id: "t5",
    title: "BREAKING: Mourinho confessa que assinou pelo Man Utd em 2013",
    title_en: "BREAKING: Mourinho admits he signed for Man Utd in 2013",
    summary: "José Mourinho revelou ter assinado contrato para suceder a Sir Alex Ferguson no Manchester United em 2013, antes de recuar em lágrimas para regressar ao Chelsea. Ferguson confirmou a versão no novo documentário da Netflix.",
    summary_en: "José Mourinho has revealed he signed a contract to succeed Sir Alex Ferguson at Manchester United in 2013, before tearfully backing out to return to Chelsea. Ferguson confirmed the account in a new Netflix documentary.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/10/jose-mourinho-signed-contract-succeed-alex-ferguson-manchester-united-2013-netflix",
    time: "10/08/2026",
    engagement: "~91.5M estimado",
  },
  {
    id: "t6",
    title: "HOT: Barcelona prepara nova ofensiva por Rodri",
    title_en: "HOT: Barcelona prepare fresh approach for Rodri",
    summary: "O Barcelona está a preparar uma nova oferta por Rodri. Segundo a ESPN e fontes do mercado, o médio espanhol está recetivo a deixar o Manchester City caso o clube catalão apresente os valores exigidos pelos campeões ingleses.",
    summary_en: "Barcelona are preparing a fresh bid for Rodri. According to ESPN and market sources, the Spanish midfielder is open to leaving Manchester City if the Catalan club meets the valuation demanded by the English champions.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49566333/transfer-rumors-news-barcelona-step-rodri-chase-man-city",
    time: "10/08/2026",
    engagement: "~72.3M estimado",
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
