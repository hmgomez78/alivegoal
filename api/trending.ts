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

const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Liverpool oferece €40M por Curtis Jones, Inter aguarda resposta",
    title_en: "BREAKING: Inter Milan make €40m loan-to-buy offer for Curtis Jones",
    summary: "O Inter de Milão avançou com uma proposta de empréstimo com opção de compra obrigatória de €40 milhões por Curtis Jones. O Liverpool tem a palavra final na negociação. A transferência seria uma das mais surpreendentes deste final de mercado, com o médio inglês a poder rumar à Serie A.",
    summary_en: "Inter Milan have submitted a loan offer with a €40m buy option for Curtis Jones. Initial talks have started, but Liverpool hold the final say. This transfer would be one of the most surprising of the late window, with the English midfielder potentially heading to Serie A.",
    tag: "BREAKING",
    source: "ESPN / Fabrizio Romano",
    url: "https://www.espn.com/soccer/story/_/id/49439236/liverpool-transfer-news-live",
    time: "21/08/2026",
    engagement: "~25,4M estimado",
  },
  {
    id: "t2",
    title: "HOT: Carlos Baleba pressiona para assinar pelo Manchester United",
    title_en: "HOT: Carlos Baleba pushes for Manchester United move",
    summary: "Carlos Baleba está muito interessado em juntar-se ao Manchester United. O médio do Brighton quer a transferência para Old Trafford e as negociações estão em andamento. O negócio está classificado como 'iminente' por fontes próximas ao jogador.",
    summary_en: "Carlos Baleba is super keen on joining Manchester United. The Brighton midfielder wants the Old Trafford move and talks are ongoing. The deal is described as 'imminent' by sources close to the player.",
    tag: "HOT",
    source: "Fabrizio Romano",
    url: "https://www.youtube.com/watch?v=m95ch__2U84",
    time: "21/08/2026",
    engagement: "~19,8M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Liverpool avança com proposta de £50M por Yankuba Minteh",
    title_en: "TRANSFER: Liverpool bid £50M for Brighton's Yankuba Minteh",
    summary: "O Liverpool formalizou uma proposta de £50 milhões pelo extremo do Brighton, Yankuba Minteh. A equipa de Arne Slot procura reforçar o ataque antes do fecho do mercado e o jovem jogador tornou-se um alvo prioritário.",
    summary_en: "Liverpool have formalized a £50m bid for Brighton winger Yankuba Minteh. Arne Slot's team is looking to bolster their attack before the window closes, and the young player has emerged as a priority target.",
    tag: "TRANSFER",
    source: "Breaking News UK",
    url: "https://www.youtube.com/watch?v=dL1peIO6NIY",
    time: "21/08/2026",
    engagement: "~18,2M estimado",
  },
  {
    id: "t4",
    title: "BREAKING: Bruno Guimarães a caminho dos exames médicos no Arsenal",
    title_en: "BREAKING: Bruno Guimarães set for Arsenal medical",
    summary: "Bruno Guimarães está a caminho de Londres para realizar exames médicos no Arsenal. O médio do Newcastle está prestes a protagonizar uma das maiores transferências do verão, reforçando significativamente o meio-campo dos Gunners.",
    summary_en: "Bruno Guimarães is heading to London to undergo a medical with Arsenal. The Newcastle midfielder is set to star in one of the biggest transfers of the summer, significantly strengthening the Gunners' midfield.",
    tag: "BREAKING",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49439166/arsenal-transfer-news-live",
    time: "21/08/2026",
    engagement: "~28,5M estimado",
  },
  {
    id: "t5",
    title: "TRANSFER: Chelsea recebe proposta financeira por Pedro Neto",
    title_en: "TRANSFER: Chelsea receive financial proposal for Pedro Neto",
    summary: "O Al Hilal agendou negociações diretas com o Chelsea para esta semana e já enviou uma proposta financeira por Pedro Neto. O internacional português pode ser a próxima grande estrela a rumar à Arábia Saudita.",
    summary_en: "Al Hilal have scheduled direct talks with Chelsea this week and have already sent a financial proposal for Pedro Neto. The Portuguese international could be the next big star to head to Saudi Arabia.",
    tag: "TRANSFER",
    source: "Fabrizio Romano",
    url: "https://www.instagram.com/reel/DcQp2friS_b/",
    time: "21/08/2026",
    engagement: "~15,6M estimado",
  },
  {
    id: "t6",
    title: "SCANDAL: Manchester City prepara investida surpresa por Enzo Fernández",
    title_en: "SCANDAL: Manchester City prepare shock move for Enzo Fernandez",
    summary: "O Manchester City está a preparar uma oferta surpreendente por Enzo Fernández, do Chelsea. O médio argentino tem estado a treinar bem, mas o interesse de Pep Guardiola pode abalar o plantel londrino nos últimos dias de mercado.",
    summary_en: "Manchester City are preparing a shock bid for Chelsea's Enzo Fernandez. The Argentine midfielder has been training well, but Pep Guardiola's interest could shake up the London squad in the final days of the window.",
    tag: "SCANDAL",
    source: "Transfer News",
    url: "https://www.youtube.com/watch?v=x4w8S2iLk08",
    time: "21/08/2026",
    engagement: "~22,1M estimado",
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
    source: 'curated',
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
