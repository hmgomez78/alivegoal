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
    title: "🚨 SCANDAL: FIFA Abre Investigação Disciplinar Contra a Argentina Após Briga na Final",
    title_en: "🚨 SCANDAL: FIFA Opens Disciplinary Investigation Against Argentina After Final Brawl",
    summary: "A FIFA abriu formalmente uma investigação disciplinar contra a Argentina após as cenas violentas que mancharam o final da final do Mundial 2026. Paredes agarrou Eric García pelo pescoço, Molina confrontou Rodri e o adjunto Roberto Ayala agrediu Dani Olmo. Enzo Fernández foi expulso ainda durante o jogo. A FIFA pode aplicar sanções pesadas, incluindo suspensões para jogadores e multas à federação argentina.",
    summary_en: "FIFA has formally opened a disciplinary investigation against Argentina following the violent scenes that marred the end of the 2026 World Cup final. Paredes grabbed Eric García by the throat, Molina confronted Rodri and assistant coach Roberto Ayala allegedly struck Dani Olmo. Enzo Fernández was sent off during the match. FIFA could impose heavy sanctions, including player suspensions and fines to the Argentine federation.",
    tag: "SCANDAL",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "142.7M",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Arsenal Confirma Christos Tzolis por €40M — Recorde da Grécia",
    title_en: "⚡ TRANSFER: Arsenal Confirm Christos Tzolis for €40M — Greek Record",
    summary: "O Arsenal confirmou a contratação de Christos Tzolis do Club Brugge por €40 milhões, tornando-o o jogador grego mais caro de sempre. O treinador do Brugge, Ivan Leko, confirmou a saída: 'Estou convicto de que ele terá os seus minutos e mostrará o nível mais alto na Premier League e na Champions League.' O Arsenal reage assim à perda de Morgan Rogers para o Chelsea, reforçando o ataque de Mikel Arteta.",
    summary_en: "Arsenal have confirmed the signing of Christos Tzolis from Club Brugge for €40 million, making him the most expensive Greek player ever. Brugge manager Ivan Leko confirmed the departure: 'I am convinced he will have his minutes and show the highest level in the Premier League and Champions League.' Arsenal respond to losing Morgan Rogers to Chelsea by bolstering Mikel Arteta's attack.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "68.3M",
  },
  {
    id: "t3",
    title: "🔥 BREAKING: Klopp Assina Como Selecionador da Alemanha até 2030",
    title_en: "🔥 BREAKING: Klopp Signs as Germany National Team Coach Until 2030",
    summary: "Jürgen Klopp assinou um contrato de 4 anos como selecionador da Alemanha, confirmado por Fabrizio Romano. O técnico alemão vai orientar a 'Mannschaft' no Euro 2028 e no Mundial 2030. Klopp estava livre desde que deixou o Liverpool no final da época passada e recusou várias propostas de clubes. O regresso ao futebol alemão é visto como uma missão patriótica para restaurar o prestígio da seleção.",
    summary_en: "Jürgen Klopp has signed a 4-year contract as Germany national team coach, confirmed by Fabrizio Romano. The German manager will lead the 'Mannschaft' at Euro 2028 and the 2030 World Cup. Klopp had been free since leaving Liverpool at the end of last season and turned down several club offers. The return to German football is seen as a patriotic mission to restore the national team's prestige.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "98.4M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Arsenal Tenta Contratar John Stones em Free Transfer para Cobrir Saliba",
    title_en: "⚡ TRANSFER: Arsenal Eye Free Transfer for John Stones to Cover Injured Saliba",
    summary: "O Arsenal está a considerar contratar John Stones como agente livre após a lesão grave de William Saliba nas costas, sofrida durante o Mundial 2026. O defesa inglês, de 32 anos, saiu do Manchester City no final do contrato e é visto como uma solução de curto prazo. Arteta trabalhou com Stones no City e conhece bem o jogador. A lesão de Saliba pode mantê-lo afastado vários meses.",
    summary_en: "Arsenal are considering signing John Stones as a free agent after William Saliba suffered a serious back injury during the 2026 World Cup. The 32-year-old English defender left Manchester City at the end of his contract and is seen as a short-term solution. Arteta worked with Stones at City and knows the player well. Saliba's injury could keep him sidelined for several months.",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "54.9M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Barcelona Considera Vlahovic e Darwin Núñez Como Plano B para Julián Álvarez",
    title_en: "🔥 HOT: Barcelona Consider Vlahovic and Darwin Núñez as Plan B for Julián Álvarez",
    summary: "Com o Atlético de Madrid a recusar vender Julián Álvarez, o Barcelona ativou o Plano B. Dusan Vlahovic (livre após sair da Juventus) e Darwin Núñez (a sair do Al Hilal) estão no radar do Barça. Nenhum dos dois ultrapassou Álvarez na lista de prioridades, mas o clube catalão continua a explorar o mercado. O Arsenal também mantém esperança de contratar Álvarez, apesar da preferência do jogador pelo Barcelona.",
    summary_en: "With Atlético Madrid refusing to sell Julián Álvarez, Barcelona have activated Plan B. Dusan Vlahovic (free after leaving Juventus) and Darwin Núñez (leaving Al Hilal) are on Barça's radar. Neither has overtaken Álvarez in the priority list, but the Catalan club continues to explore the market. Arsenal also maintain hope of signing Álvarez, despite the player's preference for Barcelona.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "76.1M",
  },
  {
    id: "t6",
    title: "⚡ TRANSFER: Rafael Leão Tentado pela Premier League — Aston Villa na Corrida",
    title_en: "⚡ TRANSFER: Rafael Leão Tempted by Premier League — Aston Villa in the Race",
    summary: "Rafael Leão está tentado por uma mudança para a Premier League, com o seu futuro no AC Milan a permanecer incerto. O Aston Villa surge como um destino potencial, segundo a Gazzetta dello Sport, embora não esteja claro se alguma das partes vai avançar. O extremo português, de 27 anos, tem sido associado ao Barcelona e ao Chelsea nas últimas semanas, mas a Premier League pode ser o destino final.",
    summary_en: "Rafael Leão is tempted by a move to the Premier League, with his AC Milan future remaining uncertain. Aston Villa have emerged as a potential destination, according to Gazzetta dello Sport, though it's unclear if either party will push to get a deal done. The 27-year-old Portuguese winger has been linked with Barcelona and Chelsea in recent weeks, but the Premier League may be his final destination.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/07/2026",
    engagement: "82.5M",
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
