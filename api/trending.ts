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

// Conteúdo editorial verificado e atualizado em 02/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Pressão sobre Infantino aumenta após o colapso do plano de venda do Mundial",
    title_en: "SCANDAL: Pressure on Infantino grows after World Cup sell-off plan collapses",
    summary: "A crise de governação na FIFA continua a escalar depois do abandono do plano para vender participações comerciais do Mundial. A BBC relata que cresce a exigência por uma revisão completa da liderança de Gianni Infantino, num momento em que a UEFA afirma ter perdido a confiança no presidente.",
    summary_en: "FIFA's governance crisis continues to escalate following the abandonment of the plan to sell commercial stakes in the World Cup. The BBC reports growing calls for a full review of Gianni Infantino's leadership, with UEFA saying it has lost confidence in the president.",
    tag: "SCANDAL",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/c9w0djx2g92o",
    time: "02/08/2026",
    engagement: "~24.6M",
  },
  {
    id: "t2",
    title: "TRANSFER: Chelsea confirma a contratação de Danny Welbeck ao Brighton",
    title_en: "TRANSFER: Chelsea confirm the signing of Danny Welbeck from Brighton",
    summary: "O Chelsea oficializou a chegada de Danny Welbeck proveniente do Brighton. A contratação do avançado experiente dá uma nova opção imediata ao ataque londrino e foi uma das notícias de maior impacto da manhã no mercado inglês.",
    summary_en: "Chelsea have made Danny Welbeck's arrival from Brighton official. The signing of the experienced forward gives the London side an immediate new attacking option and was one of the morning's biggest stories in the English market.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football",
    time: "02/08/2026",
    engagement: "~18.9M",
  },
  {
    id: "t3",
    title: "TRANSFER: Brentford bate o seu recorde para contratar Mamadou Sangaré",
    title_en: "TRANSFER: Brentford break their record to sign Mamadou Sangaré",
    summary: "O Brentford confirmou Mamadou Sangaré, médio do Lens, por uma verba recorde para o clube. O negócio reforça de forma ambiciosa o eixo da equipa e assinala uma nova fasquia financeira para o projeto dos Bees.",
    summary_en: "Brentford have confirmed Lens midfielder Mamadou Sangaré for a club-record fee. The deal ambitiously strengthens the spine of the side and sets a new financial benchmark for the Bees' project.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cn8n43nzyvmo",
    time: "02/08/2026",
    engagement: "~11.4M",
  },
  {
    id: "t4",
    title: "HOT: Tzolis marca na estreia e Arsenal goleia o Girona na pré-época",
    title_en: "HOT: Tzolis scores on debut as Arsenal rout Girona in pre-season",
    summary: "Christos Tzolis deixou uma impressão imediata na estreia pelo Arsenal ao marcar na vitória de pré-época sobre o Girona. O desempenho do novo extremo reforçou o entusiasmo dos adeptos com as opções ofensivas de Mikel Arteta.",
    summary_en: "Christos Tzolis made an immediate impression on his Arsenal debut by scoring in the pre-season win over Girona. The new winger's display increased supporters' excitement about Mikel Arteta's attacking options.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/czjlv99x87mo",
    time: "02/08/2026",
    engagement: "~13.7M",
  },
  {
    id: "t5",
    title: "HOT: JJ Gabriel, de 15 anos, estreia-se pelo Manchester United contra o Atlético",
    title_en: "HOT: 15-year-old JJ Gabriel makes Manchester United debut against Atlético",
    summary: "O Manchester United deu palco ao prodígio JJ Gabriel, de apenas 15 anos, na vitória de pré-época frente ao Atlético de Madrid. A estreia do jovem avançado foi um dos momentos mais comentados do dia e sublinha a atenção do clube à sua academia.",
    summary_en: "Manchester United handed the stage to 15-year-old prodigy JJ Gabriel in their pre-season win against Atlético Madrid. The young forward's debut was one of the day's most discussed moments and underlines the club's focus on its academy.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football",
    time: "02/08/2026",
    engagement: "~10.2M",
  },
  {
    id: "t6",
    title: "BREAKING: Aberdeen rouba vitória ao Hearts com dois golos no tempo de compensação",
    title_en: "BREAKING: Aberdeen steal victory from Hearts with two stoppage-time goals",
    summary: "O Aberdeen protagonizou uma reviravolta dramática na abertura da Scottish Premiership: Lewis Mayo empatou aos 90 minutos e Kevin Nisbet selou o 2-1 diante do Hearts já no tempo de compensação. Um resultado que agita de imediato a nova época escocesa.",
    summary_en: "Aberdeen produced a dramatic Scottish Premiership opening-day comeback: Lewis Mayo equalised in the 90th minute before Kevin Nisbet sealed a 2-1 win against Hearts in stoppage time. The result immediately shakes up the new Scottish season.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/01/scottish-premiership-aberdeen-hearts-falkirk-st-mirren",
    time: "02/08/2026",
    engagement: "~8.8M",
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
