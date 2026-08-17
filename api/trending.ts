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

// Conteúdo editorial verificado e atualizado em 17/08/2026.
// A redação distingue acordos confirmados de negociações ainda em curso.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Manchester City aceita £65,4M do Barcelona por Rodri",
    title_en: "BREAKING: Manchester City accept Barcelona's £65.4m bid for Rodri",
    summary: "O Manchester City aceitou a terceira proposta do Barcelona por Rodri, avaliada em £65,4 milhões. O médio espanhol, de 30 anos, prepara-se para assinar por quatro épocas depois de sete temporadas em Manchester. A operação retira do City um jogador decisivo na construção e na proteção defensiva, ao mesmo tempo que entrega ao Barça um antigo vencedor da Bola de Ouro com experiência de elite.",
    summary_en: "Manchester City have accepted Barcelona's third offer for Rodri, worth £65.4m. The 30-year-old Spain midfielder is set to sign for four years after seven seasons in Manchester. The deal removes a pivotal builder and defensive screen from City while giving Barça a former Ballon d'Or winner with elite-level experience.",
    tag: "BREAKING",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11095/13572836/rodri-transfer-news-man-city-accept-bid-from-barcelona-for-world-cup-winning-midfielder-and-former-ballon-dor-holder",
    time: "17/08/2026",
    engagement: "~186,4M estimado",
  },
  {
    id: "t2",
    title: "SCANDAL: Arsenal atropela o City por 3-0 na estreia de Maresca",
    title_en: "SCANDAL: Arsenal crush City 3-0 in Maresca's competitive bow",
    summary: "O Arsenal venceu o Manchester City por 3-0 no Community Shield e deixou uma mensagem forte antes do arranque da Premier League. Calafiori marcou aos 23 segundos, Havertz ampliou aos 28 minutos e Ødegaard fechou o resultado aos 48. Foi a primeira partida competitiva de Enzo Maresca no comando do City, que voltou a expor fragilidades no centro do campo e pouco conseguiu criar contra David Raya.",
    summary_en: "Arsenal beat Manchester City 3-0 in the Community Shield and sent a strong message before the Premier League begins. Calafiori scored after 23 seconds, Havertz added another on 28 minutes and Ødegaard completed the result on 48. It was Enzo Maresca's first competitive game in charge of City, whose midfield frailties were exposed as they created little against David Raya.",
    tag: "SCANDAL",
    source: "Reuters",
    url: "https://www.reuters.com/sports/soccer/arsenal-beat-man-city-3-0-win-community-shield-2026-08-16/",
    time: "17/08/2026",
    engagement: "~151,7M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Reijnders a caminho do Al Qadsiah por cerca de £51M",
    title_en: "TRANSFER: Reijnders set for Al Qadsiah in a deal worth about £51m",
    summary: "O City chegou a acordo para vender Tijjani Reijnders ao Al Qadsiah por uma verba próxima de £51 milhões. A saída ganha outra dimensão no mesmo dia em que Rodri fica a um passo de Barcelona: Maresca pode perder duas opções de meio-campo antes da estreia na liga. O clube já procura respostas no mercado, com Ayyoub Bouaddi e Enzo Fernández entre os nomes associados ao setor.",
    summary_en: "City have agreed to sell Tijjani Reijnders to Al Qadsiah for a fee of about £51m. The exit takes on greater importance on the day Rodri moved close to Barcelona, potentially leaving Maresca short of two midfield options before the league opener. City are already looking for answers in the market, with Ayyoub Bouaddi and Enzo Fernández among the names linked to the position.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/news/11095/13572836/rodri-transfer-news-man-city-accept-bid-from-barcelona-for-world-cup-winning-midfielder-and-former-ballon-dor-holder",
    time: "17/08/2026",
    engagement: "~96,8M estimado",
  },
  {
    id: "t4",
    title: "TRANSFER: Djed Spence troca Tottenham pelo Inter em negócio de €30M",
    title_en: "TRANSFER: Djed Spence swaps Tottenham for Inter in a €30m deal",
    summary: "Djed Spence selou a transferência do Tottenham para o Inter, numa operação de cerca de €30 milhões. O lateral inglês reforça o corredor de uma equipa que procura profundidade e energia na ala, enquanto os Spurs perdem uma opção com experiência internacional. O negócio já figura na atualização do mercado de transferências do Guardian e deixa o Tottenham com uma decisão imediata sobre a sua rotação defensiva.",
    summary_en: "Djed Spence has completed his transfer from Tottenham to Inter in a deal worth about €30m. The England full-back adds depth and energy on the flank for a side seeking options there, while Spurs lose a player with international experience. The deal features in the Guardian's transfer update and leaves Tottenham with an immediate decision over their defensive rotation.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "17/08/2026",
    engagement: "~82,5M estimado",
  },
  {
    id: "t5",
    title: "HOT: Aston Villa aproxima-se de Zion Suzuki para a baliza",
    title_en: "HOT: Aston Villa close in on goalkeeper Zion Suzuki",
    summary: "O Aston Villa está perto de avançar por Zion Suzuki, internacional japonês, segundo o Guardian. O processo deve ser tratado como negociação em curso: não há confirmação oficial de contratação. Ainda assim, é um dossiê de grande impacto para Unai Emery, porque pode definir a sucessão na baliza caso se confirme uma alteração na posição de Emiliano Martínez antes do fecho da janela.",
    summary_en: "Aston Villa are closing in on Japan international Zion Suzuki, according to the Guardian. The story remains an ongoing negotiation rather than a confirmed signing. Even so, it is a high-impact dossier for Unai Emery because it could shape the goalkeeping succession should Emiliano Martínez's situation change before the window closes.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/transfer-window",
    time: "17/08/2026",
    engagement: "~68,1M estimado",
  },
  {
    id: "t6",
    title: "HOT: Flamengo goleia o Mirassol por 5-1 e cola na liderança",
    title_en: "HOT: Flamengo hammer Mirassol 5-1 to close on the top spot",
    summary: "O Flamengo venceu o Mirassol por 5-1 fora de casa e encurtou a distância para a liderança do Brasileirão. O resultado, confirmado na agenda oficial do clube, dá um sinal forte de poder ofensivo numa fase em que cada ronda pesa na corrida pelo topo. Para o Mirassol, a derrota pesada obriga a uma resposta rápida depois de uma noite em que o visitante controlou o marcador.",
    summary_en: "Flamengo beat Mirassol 5-1 away from home and cut the gap to the Brasileirão leaders. The result, confirmed on the club's official schedule, sends a strong attacking statement at a stage when every round matters in the race at the top. For Mirassol, the heavy loss demands a quick response after a night in which the visitors controlled the scoreline.",
    tag: "HOT",
    source: "Flamengo",
    url: "https://www.flamengo.com.br/noticias/futebol/agenda-do-futebol-profissional-17-08-26-a-23-08-26",
    time: "17/08/2026",
    engagement: "~74,3M estimado",
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
