import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs",
};

interface TrendingItem {
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

// Notícias curadas — atualizadas 30/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🔥 FINAL DA CHAMPIONS: Arsenal vs PSG — A batalha pelo trono europeu começa HOJE em Budapeste!",
    title_en: "🔥 CHAMPIONS FINAL: Arsenal vs PSG — The battle for European glory starts TODAY in Budapest!",
    summary: "O DIA MAIS ESPERADO DO ANO! A Puskás Aréna de Budapeste recebe esta noite a grande final da UEFA Champions League 2025/26 entre Arsenal e Paris Saint-Germain. O Arsenal, que não chegava a uma final há 20 anos, procura a glória máxima sob o comando de Mikel Arteta. O PSG, bicampeão em título, quer confirmar a sua hegemonia europeia com Mbappé e Dembélé. Toda a Europa tem os olhos postos em Budapeste. Pontapé de saída às 20h00 UTC.",
    summary_en: "THE MOST ANTICIPATED DAY OF THE YEAR! The Puskás Aréna in Budapest hosts tonight the grand UEFA Champions League 2025/26 final between Arsenal and Paris Saint-Germain. Arsenal, who haven't reached a final in 20 years, seek ultimate glory under Mikel Arteta. PSG, back-to-back champions, want to confirm their European dominance with Mbappé and Dembélé. All of Europe has its eyes on Budapest. Kick-off at 20:00 UTC.",
    tag: "HOT",
    source: "@ChampionsLeague",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "892.4M",
  },
  {
    id: "t2",
    title: "🚨 GUERRA NAS REDES: Atlético de Madrid trollou o Barcelona com propostas falsas por Yamal, Pedri e Raphinha para responder ao assédio por Julián Álvarez!",
    title_en: "🚨 SOCIAL MEDIA WAR: Atletico Madrid trolled Barcelona with fake bids for Yamal, Pedri and Raphinha to hit back over Julian Alvarez pursuit!",
    summary: "ESCÂNDALO ÉPICO NO MERCADO! O Atlético de Madrid lançou uma bomba nas redes sociais ao publicar propostas fictícias pelo trio do Barcelona — Lamine Yamal, Pedri e Raphinha — em resposta direta à oferta de 100 milhões de euros do Barça por Julián Álvarez. O clube colchonero acusou o Barcelona de uma 'campanha de difamação' e deixou claro que o argentino 'não está à venda'. O Barcelona prepara agora uma proposta melhorada de 135 milhões de euros para forçar a saída do avançado.",
    summary_en: "EPIC TRANSFER MARKET SCANDAL! Atletico Madrid dropped a social media bombshell by posting fictional bids for Barcelona's trio — Lamine Yamal, Pedri and Raphinha — as a direct response to Barca's €100m offer for Julian Alvarez. The Colchoneros accused Barcelona of a 'smear campaign' and made it clear the Argentine 'is not for sale'. Barcelona are now preparing an improved €135m offer to force the forward's exit.",
    tag: "SCANDAL",
    source: "@atleticodemadrid",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "567.3M",
  },
  {
    id: "t3",
    title: "🚨 OFICIAL: José Mourinho assina pelo Real Madrid — O 'Special One' regressa ao Santiago Bernabéu!",
    title_en: "🚨 OFFICIAL: José Mourinho signs for Real Madrid — The 'Special One' returns to the Santiago Bernabéu!",
    summary: "O REGRESSO DO REI! Fabrizio Romano confirmou que José Mourinho chegou a acordo total com o Real Madrid para assumir o comando técnico dos merengues. O contrato é válido por três temporadas. O português, que já treinou o Real Madrid entre 2010 e 2013, regressa ao Bernabéu com uma missão clara: reconquistar a Liga dos Campeões. O anúncio oficial aguarda apenas a conclusão do processo eleitoral do clube. O futebol europeu tem um novo protagonista.",
    summary_en: "THE KING RETURNS! Fabrizio Romano confirmed that José Mourinho has reached a full agreement with Real Madrid to take charge of the Merengues. The contract runs for three seasons. The Portuguese manager, who previously coached Real Madrid between 2010 and 2013, returns to the Bernabéu with a clear mission: to reconquer the Champions League. The official announcement is only awaiting the conclusion of the club's electoral process. European football has a new protagonist.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "445.6M",
  },
  {
    id: "t4",
    title: "💣 BOMBA DE VERÃO: Ibrahima Konaté sai do Liverpool a custo zero — Real Madrid e gigantes europeus na corrida!",
    title_en: "💣 SUMMER BOMB: Ibrahima Konate leaves Liverpool on a free transfer — Real Madrid and European giants in the race!",
    summary: "SAÍDA INESPERADA EM ANFIELD! Fabrizio Romano confirmou que Ibrahima Konaté vai deixar o Liverpool no final da temporada como agente livre, após as negociações para a renovação de contrato terem colapsado por desacordo nos bónus. O defesa central francês, um dos melhores da Premier League, estava muito perto de renovar em abril, mas as conversas quebraram nas últimas semanas. O Real Madrid, que tinha mostrado interesse no passado, pode agora reentrar na corrida. Uma das maiores transferências gratuitas do verão de 2026.",
    summary_en: "UNEXPECTED EXIT AT ANFIELD! Fabrizio Romano confirmed that Ibrahima Konate will leave Liverpool at the end of the season as a free agent, after contract renewal talks collapsed over a bonus disagreement. The French centre-back, one of the best in the Premier League, was very close to renewing in April, but talks broke down in recent weeks. Real Madrid, who had shown interest in the past, could now re-enter the race. One of the biggest free transfers of the summer of 2026.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "312.8M",
  },
  {
    id: "t5",
    title: "🔴 BOCA JUNIORS ELIMINADO! Derrota histórica em casa frente ao Universidad Católica encerra era na Libertadores!",
    title_en: "🔴 BOCA JUNIORS ELIMINATED! Historic home defeat to Universidad Católica ends their Libertadores campaign!",
    summary: "CATÁSTROFE NA BOMBONERA! O Boca Juniors foi eliminado da Copa Libertadores 2026 após uma derrota histórica em casa por 0-1 frente ao Universidad Católica do Chile. O golo de Clemente Montes aos 33 minutos foi suficiente para consumar uma das maiores humilhações da história do clube argentino. A eliminação na fase de grupos representa um fracasso colossal para um dos maiores clubes da América do Sul. Os adeptos xeneizes estão em choque e a direção enfrenta uma crise sem precedentes.",
    summary_en: "CATASTROPHE AT THE BOMBONERA! Boca Juniors were eliminated from the 2026 Copa Libertadores after a historic home defeat by 0-1 to Universidad Católica of Chile. Clemente Montes' goal on 33 minutes was enough to seal one of the greatest humiliations in the Argentine club's history. The group stage elimination represents a colossal failure for one of South America's biggest clubs. Xeneize fans are in shock and the board faces an unprecedented crisis.",
    tag: "BREAKING",
    source: "@BocaJrsOficial",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "278.5M",
  },
  {
    id: "t6",
    title: "⚡ BERNARDO SILVA ESCOLHE ESPANHA: Barcelona e Atlético de Madrid em guerra pelo craque português do City!",
    title_en: "⚡ BERNARDO SILVA CHOOSES SPAIN: Barcelona and Atletico Madrid at war over the Portuguese City star!",
    summary: "O PORTUGUÊS MAIS COBIÇADO DO MERCADO! Bernardo Silva, que termina contrato com o Manchester City no final da temporada, confirmou ao seu agente Jorge Mendes que quer jogar em Espanha. O médio português recusou propostas de Itália (Juventus) e de outros países, e agora Barcelona e Atlético de Madrid travam uma batalha feroz pela sua assinatura. O jogador pede cerca de 12 milhões de euros líquidos por temporada, mas pode reduzir as suas exigências pelo clube certo. A decisão final aproxima-se.",
    summary_en: "THE MOST COVETED PORTUGUESE PLAYER ON THE MARKET! Bernardo Silva, whose contract with Manchester City expires at the end of the season, has confirmed to his agent Jorge Mendes that he wants to play in Spain. The Portuguese midfielder rejected proposals from Italy (Juventus) and other countries, and now Barcelona and Atletico Madrid are fighting a fierce battle for his signature. The player is asking for around €12 million net per season, but could reduce his demands for the right club. The final decision is approaching.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "30/05/2026",
    engagement: "198.7M",
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
