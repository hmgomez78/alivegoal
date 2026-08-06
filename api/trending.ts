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

// Conteúdo editorial verificado e atualizado em 06/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Documento revela plano de Infantino para uma 'Fifa Super League'",
    title_en: "SCANDAL: Document reveals Infantino plan for a 'Fifa Super League'",
    summary: "Um documento de 2020, agora revelado, mostra que Gianni Infantino discutiu a hipótese de dar a marca FIFA à liga dissidente europeia. A revelação reacende o debate sobre a governação do futebol, embora não prove que o projeto tenha avançado para contrato definitivo.",
    summary_en: "A 2020 document revealed this week shows that Gianni Infantino discussed the possibility of giving FIFA branding to the European breakaway league. The disclosure reignites the debate on football governance, although it does not prove the project reached a definitive agreement.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football",
    time: "06/08/2026",
    engagement: "~42.5M",
  },
  {
    id: "t2",
    title: "TRANSFER: Real Madrid chega a acordo de até 120M£ por Yan Diomande",
    title_en: "TRANSFER: Real Madrid reach agreement worth up to £120m for Yan Diomande",
    summary: "O Real Madrid chegou a um acordo avaliado em até 140 milhões de euros, cerca de 120 milhões de libras, com o RB Leipzig por Yan Diomande, segundo a imprensa. A operação, ainda sujeita aos passos formais, agita o mercado e reforça a ambição merengue.",
    summary_en: "Real Madrid have reached an agreement reportedly worth up to €140m, around £120m, with RB Leipzig for Yan Diomande. Still subject to formal completion, the move shakes up the market and underlines Madrid's ambition.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football",
    time: "06/08/2026",
    engagement: "~38.1M",
  },
  {
    id: "t3",
    title: "HOT: Real Madrid oferece renovação milionária a Vinicius Jr",
    title_en: "HOT: Real Madrid offer bumper new deal to Vinicius Jr",
    summary: "Numa clara demonstração de força, o Real Madrid apresentou uma proposta de renovação substancial a Vinicius Jr. O clube procura blindar o extremo brasileiro perante o assédio constante de outros gigantes europeus.",
    summary_en: "In a clear show of strength, Real Madrid have offered a substantial contract renewal to Vinicius Jr. The club seeks to shield the Brazilian winger from the constant interest of other European giants.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football",
    time: "06/08/2026",
    engagement: "~29.4M",
  },
  {
    id: "t4",
    title: "BREAKING: Newcastle surpreende e anuncia Matthias Jaissle como treinador",
    title_en: "BREAKING: Newcastle surprise by appointing Matthias Jaissle as head coach",
    summary: "O Newcastle United anunciou a contratação do jovem técnico Matthias Jaissle, de 38 anos, para suceder a Eddie Howe. O alemão assinou um contrato válido até 2030, numa mudança de rumo drástica para os 'Magpies'.",
    summary_en: "Newcastle United have announced the appointment of 38-year-old Matthias Jaissle as head coach to succeed Eddie Howe. The German has signed a deal until 2030 in a dramatic change of direction for the Magpies.",
    tag: "BREAKING",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football",
    time: "06/08/2026",
    engagement: "~25.8M",
  },
  {
    id: "t5",
    title: "TRANSFER: Liverpool explora contratação de Ibrahim Mbaye, do PSG",
    title_en: "TRANSFER: Liverpool explore move for PSG's Ibrahim Mbaye",
    summary: "O Liverpool está a explorar uma possível contratação do extremo do Paris Saint-Germain, Ibrahim Mbaye. Os 'Reds' analisam o jovem talento senegalês como opção para reforçar as alas, mas não há acordo anunciado.",
    summary_en: "Liverpool are exploring a possible move for Paris Saint-Germain winger Ibrahim Mbaye. The Reds are assessing the young Senegalese talent as a wide option, but no agreement has been announced.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer",
    time: "06/08/2026",
    engagement: "~21.2M",
  },
  {
    id: "t6",
    title: "HOT: Tottenham avança por Folarin Balogun",
    title_en: "HOT: Tottenham make move for Folarin Balogun",
    summary: "O Tottenham Hotspur virou as atenções para o internacional norte-americano Folarin Balogun. O avançado do Mónaco, ex-Arsenal, é o eleito para resolver a crise ofensiva dos Spurs nesta temporada.",
    summary_en: "Tottenham Hotspur have turned their attention to United States international Folarin Balogun. The Monaco and former Arsenal striker is the chosen one to solve Spurs' attacking crisis this season.",
    tag: "HOT",
    source: "The Guardian / ESPN",
    url: "https://www.theguardian.com/football",
    time: "06/08/2026",
    engagement: "~19.5M",
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
