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

// Notícias curadas — atualizadas 23/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Messi faz HISTÓRIA no Mundial 2026! Bate recorde de Klose com 17 golos em Mundiais!",
    title_en: "🚨 BREAKING: Messi makes HISTORY at World Cup 2026! Breaks Klose's record with 17 World Cup goals!",
    summary: "Lionel Messi tornou-se o maior goleador de sempre em Campeonatos do Mundo! O craque argentino marcou contra a Áustria no segundo jogo do Grupo J, ultrapassando o alemão Miroslav Klose (16 golos) e tornando-se o único jogador com 17 ou mais golos em Mundiais. A Argentina venceu por 2-0, garantindo praticamente a qualificação para os oitavos de final. O mundo do futebol está de joelhos perante o GOAT.",
    summary_en: "Lionel Messi became the all-time top scorer in FIFA World Cup history! The Argentine star scored against Austria in Group J's second game, surpassing Germany's Miroslav Klose (16 goals) to become the only player with 17 or more World Cup goals. Argentina won 2-0, virtually securing their place in the round of 32. The football world is on its knees before the GOAT.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "312.8M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Man Utd 'sonha' com Tchouaméni! INEOS contacta Real Madrid por Camavinga!",
    title_en: "🔥 TRANSFER: Man Utd 'dream' of Tchouameni! INEOS contacts Real Madrid for Camavinga!",
    summary: "O Manchester United está em modo de ataque no mercado de transferências! Fabrizio Romano confirmou que o 'sonho' do INEOS é contratar Aurélien Tchouaméni do Real Madrid para substituir Casemiro. Em paralelo, a imprensa espanhola revela que o United já contactou os merengues por Eduardo Camavinga, cujo valor de mercado caiu €50M. Ao mesmo tempo, o Tottenham de De Zerbi prepara uma oferta por Marcus Rashford, avaliado em £40M.",
    summary_en: "Manchester United are in attack mode in the transfer market! Fabrizio Romano confirmed that INEOS's 'dream' is to sign Aurelien Tchouameni from Real Madrid to replace Casemiro. In parallel, the Spanish press reveals that United have already contacted Los Blancos for Eduardo Camavinga, whose market value has dropped €50M. Meanwhile, De Zerbi's Tottenham are preparing a bid for Marcus Rashford, valued at £40M.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "198.4M",
  },
  {
    id: "t3",
    title: "💥 HOT: França goleia Iraque 3-0! Mbappé marca golaço de pé esquerdo após interrupção por tempestade!",
    title_en: "💥 HOT: France thrash Iraq 3-0! Mbappe scores screamer with weak foot after storm delay!",
    summary: "A França de Kylian Mbappé dominou o Iraque com uma vitória expressiva por 3-0, garantindo a qualificação para os oitavos de final do Mundial 2026. O jogo foi suspenso durante mais de duas horas devido a uma forte tempestade, mas quando recomeçou, Mbappé abriu o marcador com um golaço de pé esquerdo. Dembélé e Olise completaram o marcador. Os Les Bleus são agora os grandes favoritos ao título do Grupo I.",
    summary_en: "Kylian Mbappe's France dominated Iraq with an impressive 3-0 victory, securing their place in the round of 32 at the 2026 World Cup. The match was suspended for over two hours due to a severe storm, but when it resumed, Mbappe opened the scoring with a stunning weak-foot screamer. Dembele and Olise completed the scoreline. Les Bleus are now the clear favorites to top Group I.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "245.1M",
  },
  {
    id: "t4",
    title: "⚽ TRANSFER: Grimaldo assina pelo Atlético de Madrid! Kang-in Lee também a caminho de Madrid!",
    title_en: "⚽ TRANSFER: Grimaldo signs for Atletico Madrid! Kang-in Lee also heading to Madrid!",
    summary: "O Atlético de Madrid está em modo de revolução! Fabrizio Romano confirma que Alejandro Grimaldo, lateral esquerdo do Bayer Leverkusen, informou o clube alemão do seu desejo de se juntar ao Atleti. O acordo pessoal está fechado e as negociações entre clubes decorrem, com o Leverkusen a pedir €30M e o Atlético a oferecer €24-25M. Para além disso, Kang-in Lee também chegou a acordo pessoal com o Atlético, que negocia agora com o PSG.",
    summary_en: "Atletico Madrid are in revolution mode! Fabrizio Romano confirms that Alejandro Grimaldo, Bayer Leverkusen's left-back, has informed the German club of his desire to join Atleti. The personal agreement is done and club-to-club negotiations are underway, with Leverkusen asking €30M and Atletico offering €24-25M. Additionally, Kang-in Lee has also reached a personal agreement with Atletico, who are now negotiating with PSG.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "172.6M",
  },
  {
    id: "t5",
    title: "🚨 SCANDAL: Cristiano Ronaldo em risco de ser banido da seleção portuguesa! Polémica com Martinez explode!",
    title_en: "🚨 SCANDAL: Cristiano Ronaldo at risk of being dropped from Portugal! Controversy with Martinez explodes!",
    summary: "O futuro de Cristiano Ronaldo na seleção portuguesa está a gerar uma enorme polémica! Após um desempenho apagado no empate 1-1 com o Congo DR, a imprensa internacional questiona abertamente se o avançado de 41 anos deveria continuar a ser titular. O treinador Roberto Martinez mantém-se fiel ao capitão, mas críticos apontam que Ronaldo está a prejudicar o coletivo. Portugal joga hoje contra o Uzbequistão numa partida decisiva para a sua qualificação.",
    summary_en: "Cristiano Ronaldo's future in the Portuguese national team is generating enormous controversy! After a subdued performance in the 1-1 draw with DR Congo, the international press openly questions whether the 41-year-old forward should continue to start. Coach Roberto Martinez remains loyal to his captain, but critics argue Ronaldo is harming the collective. Portugal play today against Uzbekistan in a decisive match for their qualification.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "221.3M",
  },
  {
    id: "t6",
    title: "🔥 BREAKING: Haaland marca dois golos e a Noruega goleia o Senegal 3-2 num jogo épico!",
    title_en: "🔥 BREAKING: Haaland scores twice as Norway thrash Senegal 3-2 in an epic clash!",
    summary: "Erling Haaland voltou a ser o protagonista do Mundial 2026! O avançado do Manchester City marcou dois golos, incluindo um de primeira após a bola bater no poste, para liderar a Noruega a uma vitória dramática por 3-2 sobre o Senegal. Ismaïla Sarr marcou dois golos para o Senegal, incluindo um de forma acrobática enquanto caía, tornando o jogo num espetáculo épico. A Noruega lidera o Grupo I com 6 pontos e Haaland já tem 4 golos no torneio.",
    summary_en: "Erling Haaland was the star of the show at the 2026 World Cup again! The Manchester City striker scored twice, including a one-touch goal off the crossbar, to lead Norway to a dramatic 3-2 victory over Senegal. Ismaila Sarr scored twice for Senegal, including an acrobatic effort while falling, making the game an epic spectacle. Norway top Group I with 6 points and Haaland already has 4 goals in the tournament.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "23/06/2026",
    engagement: "189.7M",
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
