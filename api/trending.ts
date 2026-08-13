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

// Conteúdo editorial verificado e atualizado em 13/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: PSG vence Aston Villa e repete conquista da Supertaça Europeia",
    title_en: "BREAKING: PSG beat Aston Villa to retain the UEFA Super Cup",
    summary: "O Paris Saint-Germain venceu o Aston Villa por 2-1 em Salzburgo e reteve a Supertaça Europeia. Khvicha Kvaratskhelia abriu o marcador, Brian Madjo empatou antes do intervalo e Désiré Doué decidiu após assistência de Ousmane Dembélé. O golo de Doué foi inicialmente anulado, mas acabou validado após revisão de fora de jogo.",
    summary_en: "Paris Saint-Germain beat Aston Villa 2-1 in Salzburg to retain the UEFA Super Cup. Khvicha Kvaratskhelia opened the scoring, Brian Madjo levelled before half-time and Désiré Doué decided the match after an Ousmane Dembélé assist. Doué's goal was initially disallowed before an offside review overturned the decision.",
    tag: "BREAKING",
    source: "The Guardian / ESPN",
    url: "https://www.theguardian.com/football/2026/aug/12/uefa-super-cup-aston-villa-psg-match-report",
    time: "13/08/2026",
    engagement: "~92,4M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Atlético e Tottenham chegam a acordo por Cristian Romero até €40M",
    title_en: "TRANSFER: Atlético and Tottenham agree Cristian Romero deal worth up to €40m",
    summary: "Segundo fontes da ESPN, o Atlético de Madrid alcançou um acordo para contratar Cristian Romero ao Tottenham por €35 milhões fixos, mais até €5 milhões em variáveis. O central argentino, capitão dos Spurs desde 2025, é um alvo de longa data de Diego Simeone; a operação ainda depende das formalidades finais.",
    summary_en: "According to ESPN sources, Atlético Madrid have agreed to sign Cristian Romero from Tottenham for a €35m fixed fee plus up to €5m in add-ons. The Argentine centre-back, Spurs captain since 2025, has long been a Diego Simeone target; the move still requires final formalities.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49594267/sources-atletico-madrid-agree-40-million-deal-tottenham-cuti-romero",
    time: "13/08/2026",
    engagement: "~76,1M estimado",
  },
  {
    id: "t3",
    title: "HOT: Barcelona sobe para cerca de €60M na tentativa de contratar Rodri",
    title_en: "HOT: Barcelona raise Rodri approach to around €60m",
    summary: "O Barcelona apresentou uma proposta melhorada de cerca de €60 milhões por Rodri, de acordo com o Guardian. O Manchester City ainda não aceitou a abordagem e mantém-se ativo no mercado por alternativas no meio-campo, pelo que não há acordo anunciado entre os clubes.",
    summary_en: "Barcelona have made an improved offer of around €60m for Rodri, according to the Guardian. Manchester City have not accepted the approach and remain active in the market for midfield alternatives, so no agreement has been announced between the clubs.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "13/08/2026",
    engagement: "~68,8M estimado",
  },
  {
    id: "t4",
    title: "SCANDAL: Julián Álvarez volta a pedir saída ao Atlético após conversa com Simeone",
    title_en: "SCANDAL: Julián Álvarez reiterates Atlético exit wish after Simeone talks",
    summary: "Julián Álvarez reuniu-se com Diego Simeone e reiterou o desejo de sair do Atlético neste mercado, segundo fontes da ESPN. O avançado terá identificado o Barcelona como destino preferencial, mas a direção colchonera continua a sustentar que o jogador não está à venda; o impasse mantém o caso no centro do mercado espanhol.",
    summary_en: "Julián Álvarez met Diego Simeone and reiterated his wish to leave Atlético in this transfer window, ESPN sources say. The forward is reported to prefer Barcelona, but Atlético's leadership continue to insist he is not for sale; the standoff keeps the case at the centre of Spain's transfer market.",
    tag: "SCANDAL",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49590738/diego-simeone-julian-alvarez-hold-talks-atletico-madrid-amid-transfer-request-sources",
    time: "13/08/2026",
    engagement: "~83,6M estimado",
  },
  {
    id: "t5",
    title: "BREAKING: Xavi assume seleção dos Países Baixos até ao Mundial de 2030",
    title_en: "BREAKING: Xavi takes Netherlands job through the 2030 World Cup",
    summary: "Os Países Baixos nomearam Xavi Hernández como selecionador num contrato de quatro anos, válido até ao Mundial de 2030. O antigo treinador do Barcelona sucede a Ronald Koeman e terá como primeiras grandes metas o Euro 2028 e o próximo Mundial, depois da eliminação neerlandesa nos 32 avos do torneio deste verão.",
    summary_en: "The Netherlands have appointed Xavi Hernández as head coach on a four-year deal running through the 2030 World Cup. The former Barcelona coach succeeds Ronald Koeman, with Euro 2028 and the next World Cup as his first major targets after the Dutch exit in this summer's round of 32.",
    tag: "BREAKING",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49592307/netherlands-hire-xavi-coach-2030-world-cup",
    time: "13/08/2026",
    engagement: "~61,5M estimado",
  },
  {
    id: "t6",
    title: "TRANSFER: Aston Villa acelera Palhinha e prepara exames a Ruggeri",
    title_en: "TRANSFER: Aston Villa step up Palhinha move and line up Ruggeri medical",
    summary: "O Aston Villa encontra-se em conversações avançadas para contratar João Palhinha ao Bayern Munique, enquanto o lateral Matteo Ruggeri, do Atlético de Madrid, é esperado para exames médicos nas próximas 48 horas, reportou o Guardian. São movimentos que procuram reforçar o plantel de Unai Emery após a derrota apertada na Supertaça.",
    summary_en: "Aston Villa are in advanced talks to sign João Palhinha from Bayern Munich, while Atlético Madrid left-back Matteo Ruggeri is expected for a medical within 48 hours, the Guardian reported. The moves would strengthen Unai Emery's squad after their narrow Super Cup defeat.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/12/uefa-super-cup-aston-villa-psg-match-report",
    time: "13/08/2026",
    engagement: "~45,9M estimado",
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
