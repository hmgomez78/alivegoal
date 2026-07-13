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

// Fallback data
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "🚨 SCANDAL: FBI Investiga Federação Argentina por Lavagem de Dinheiro no Mundial",
    title_en: "🚨 SCANDAL: FBI Investigates Argentine Federation for Money Laundering at World Cup",
    summary: "A Associação de Futebol da Argentina (AFA) está a ser alvo de uma investigação do FBI por alegada fraude e lavagem de dinheiro envolvendo cerca de 300 milhões de dólares. A investigação, revelada em pleno Mundial 2026, ameaça manchar a imagem do torneio, embora a campanha da seleção argentina não tenha sido afetada.",
    summary_en: "The Argentine Football Association (AFA) is under FBI investigation for alleged fraud and money laundering involving an estimated $300 million. The investigation, revealed during the 2026 World Cup, threatens to tarnish the tournament's image, although the Argentine national team's campaign remains unaffected.",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "45.2M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Chelsea na Corrida por Jonathan Rowe em Mercado Agitado",
    title_en: "⚡ TRANSFER: Chelsea in the Race for Jonathan Rowe in Busy Market",
    summary: "O Chelsea está a observar o extremo do Bologna, Jonathan Rowe, para reforçar o ataque, num dia em que o mercado de transferências europeu ferve. Os Blues também estão interessados num alvo de 58 milhões de euros do Man Utd, prometendo dias intensos nas negociações de verão.",
    summary_en: "Chelsea is looking at Bologna winger Jonathan Rowe to bolster their attack, on a day when the European transfer market is boiling. The Blues are also keen on a €58m star wanted by Man Utd, promising intense days in summer negotiations.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "18.5M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Inglaterra e Argentina Confirmadas nas Meias-Finais do Mundial",
    title_en: "🔥 HOT: England and Argentina Confirmed in World Cup Semi-Finals",
    summary: "O alinhamento das meias-finais do Mundial 2026 está definido. A Inglaterra venceu a Noruega (2-1) e vai defrontar a Argentina, que superou a Suíça (3-1). Na outra meia-final, a França (que eliminou Marrocos) medirá forças com a Espanha (vencedora contra a Bélgica).",
    summary_en: "The 2026 World Cup semi-final lineup is set. England beat Norway (2-1) and will face Argentina, who overcame Switzerland (3-1). In the other semi-final, France (who eliminated Morocco) will clash with Spain (winners against Belgium).",
    tag: "HOT",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "38.1M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Atalanta Prepara Novo Contrato para Éderson Após Acordo Falhado",
    title_en: "⚡ TRANSFER: Atalanta Prepares New Contract for Éderson After Failed Deal",
    summary: "A Atalanta está pronta para oferecer um novo contrato a Éderson, depois de a transferência para o Manchester United ter caído. Fabrizio Romano confirmou que as negociações entre o clube italiano e os Red Devils não chegaram a bom porto, mantendo o jogador em Bérgamo.",
    summary_en: "Atalanta is set to offer a new deal to Éderson after his transfer to Manchester United collapsed. Fabrizio Romano confirmed that negotiations between the Italian club and the Red Devils fell through, keeping the player in Bergamo.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "14.2M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Julian Alvarez na Mira do Arsenal Após Dificuldades com PSG",
    title_en: "🚨 BREAKING: Julian Alvarez in Arsenal's Sights After Difficulties with PSG",
    summary: "O Arsenal mudou o seu foco para o avançado argentino do Atlético de Madrid, Julian Alvarez, depois de Bradley Barcola, do PSG, se ter tornado indisponível. Os Gunners tentam garantir o jogador antes do início da pré-época para reforçar o ataque de Mikel Arteta.",
    summary_en: "Arsenal has switched focus to Atletico Madrid and Argentina striker Julian Alvarez after PSG forward Bradley Barcola became unavailable. The Gunners are trying to secure the player before pre-season begins to bolster Mikel Arteta's attack.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "22.7M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Brasileirão Série B Aquece Segunda-Feira Sem Mundial",
    title_en: "🔥 HOT: Brasileirão Série B Heats Up Monday Without World Cup",
    summary: "Com uma pausa nos jogos do Mundial 2026 antes das meias-finais, as atenções viram-se para o Brasileirão Série B. O América-MG defronta o Londrina, e o Ceará recebe o Athletic em jogos importantes da 17ª jornada que podem mexer com a tabela classificativa.",
    summary_en: "With a break in the 2026 World Cup matches before the semi-finals, attention turns to the Brasileirão Série B. América-MG faces Londrina, and Ceará hosts Athletic in important 17th round games that could shake up the league table.",
    tag: "HOT",
    source: "@GloboEsporte",
    url: "https://x.com/alivegoal",
    time: "13/07/2026",
    engagement: "9.3M",
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
