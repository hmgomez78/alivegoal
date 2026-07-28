import { VercelRequest, VercelResponse } from "@vercel/node";

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
    title: "⚡ BREAKING: John Stones a caminho do Inter de Milão",
    title_en: "⚡ BREAKING: John Stones on his way to Inter Milan",
    summary: "O defesa internacional inglês John Stones está prestes a assinar pelo Inter de Milão a custo zero, após deixar o Manchester City. A transferência iminente surge depois de uma excelente prestação no Mundial 2026.",
    summary_en: "England international defender John Stones is poised to sign for Inter Milan on a free transfer after leaving Manchester City. The imminent move follows an excellent performance at the 2026 World Cup.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football",
    time: "28/07/2026",
    engagement: "~9.1M",
  },
  {
    id: "t2",
    title: "🚨 TRANSFER: Real Madrid e Yan Diomande perto de acordo",
    title_en: "🚨 TRANSFER: Real Madrid and Yan Diomande close to deal",
    summary: "O Real Madrid deverá ser o destino do jovem extremo Yan Diomande. O Paris Saint-Germain retirou-se formalmente da corrida pelo jogador, abrindo caminho para que a transferência para o Santiago Bernabéu seja concluída.",
    summary_en: "Real Madrid is expected to be the destination for young winger Yan Diomande. Paris Saint-Germain have formally withdrawn from the race for the player, clearing the way for the transfer to the Santiago Bernabéu to be completed.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football",
    time: "28/07/2026",
    engagement: "~8.5M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Chelsea explora Welbeck e Henderson",
    title_en: "🔥 HOT: Chelsea explore Welbeck and Henderson",
    summary: "O Chelsea está a explorar movimentos-surpresa no mercado por Danny Welbeck e Jordan Henderson. Embora sejam para já rumores de mercado, o interesse indica uma procura por experiência no balneário londrino.",
    summary_en: "Chelsea are exploring surprise market moves for Danny Welbeck and Jordan Henderson. Although currently market rumours, the interest indicates a search for experience in the London dressing room.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football",
    time: "28/07/2026",
    engagement: "~7.2M",
  },
  {
    id: "t4",
    title: "⚠️ SCANDAL: Crise na federação italiana após falha com Pirlo",
    title_en: "⚠️ SCANDAL: Crisis in Italian federation after Pirlo failure",
    summary: "Paolo Maldini e Leonardo apresentaram a demissão dos seus cargos diretivos. A decisão institucional surge na sequência do colapso do processo de nomeação de Andrea Pirlo, instalando uma crise na estrutura transalpina.",
    summary_en: "Paolo Maldini and Leonardo have resigned from their directorial roles. The institutional decision follows the collapse of Andrea Pirlo's appointment process, installing a crisis in the transalpine structure.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football",
    time: "28/07/2026",
    engagement: "~6.8M",
  },
  {
    id: "t5",
    title: "🚨 TRANSFER: Juventus aponta a Joshua Zirkzee",
    title_en: "🚨 TRANSFER: Juventus target Joshua Zirkzee",
    summary: "Joshua Zirkzee, do Manchester United, tornou-se o alvo principal da Juventus para o ataque. O interesse da equipa italiana intensificou-se após o colapso das negociações por Randal Kolo Muani.",
    summary_en: "Manchester United's Joshua Zirkzee has become Juventus' primary target for the attack. The Italian team's interest intensified following the collapse of negotiations for Randal Kolo Muani.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/transfer-paper-talk",
    time: "28/07/2026",
    engagement: "~5.5M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Manchester City tenta segurar Rodri face ao Real Madrid",
    title_en: "🔥 HOT: Manchester City try to secure Rodri amid Real Madrid interest",
    summary: "O Manchester City está esperançoso de que Rodri assine um novo contrato, mas o clube prepara-se para uma investida do Real Madrid. O médio continua a atrair grande atenção do mercado após as suas exibições.",
    summary_en: "Manchester City are hopeful that Rodri will sign a new contract, but the club are braced for a bid from Real Madrid. The midfielder continues to attract major market attention following his performances.",
    tag: "HOT",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/transfer-paper-talk",
    time: "28/07/2026",
    engagement: "~8.1M",
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
