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

// Notícias curadas — atualizadas 05/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO: Man City ameaça ação legal contra candidato do Real Madrid por prometer Haaland!",
    title_en: "🚨 SCANDAL: Man City threaten legal action against Real Madrid candidate over Haaland promise!",
    summary: "GUERRA JURÍDICA! O Manchester City está a considerar uma ação legal contra o candidato presidencial do Real Madrid, Enrique Riquelme, depois de este ter prometido publicamente contratar Erling Haaland caso ganhe as eleições. O camp do avançado norueguês negou qualquer acordo, mas o City não está disposto a ficar em silêncio. Florentino Pérez também alimentou os rumores ao confirmar que vai fazer uma oferta de €150M por uma estrela na próxima terça-feira. O mundo do futebol está em choque!",
    summary_en: "LEGAL WAR! Manchester City are considering legal action against Real Madrid presidential candidate Enrique Riquelme after he publicly promised to sign Erling Haaland if he wins the elections. The Norwegian striker's camp denied any agreement, but City are not willing to stay silent. Florentino Pérez also fuelled the rumours by confirming he will make a €150M bid for a star player next Tuesday. The football world is in shock!",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "5.2M",
  },
  {
    id: "t2",
    title: "💥 CHOQUE: França perde 1-2 com Costa do Marfim! Alarme antes do Mundial!",
    title_en: "💥 SHOCK: France lose 1-2 to Ivory Coast! Alarm bells before the World Cup!",
    summary: "CATÁSTROFE GAULESA! A França foi derrotada em casa pela Costa do Marfim por 1-2 no último amistoso antes do Mundial 2026. Deschamps ficou visivelmente perturbado com a derrota, que levanta sérias dúvidas sobre a solidez defensiva dos campeões do mundo. Yan Diomandé foi o herói da Costa do Marfim com uma exibição brilhante que certamente vai disparar o seu valor de mercado. Os adeptos franceses estão em pânico!",
    summary_en: "FRENCH CATASTROPHE! France were beaten at home by Ivory Coast 1-2 in their last friendly before the 2026 World Cup. Deschamps looked visibly troubled by the defeat, which raises serious questions about the world champions' defensive solidity. Yan Diomandé was Ivory Coast's hero with a brilliant display that will certainly boost his market value. French fans are in panic!",
    tag: "BREAKING",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "4.8M",
  },
  {
    id: "t3",
    title: "⚡ SURPRESA: Espanha empata 1-1 com o Iraque! De la Fuente preocupado!",
    title_en: "⚡ SURPRISE: Spain draw 1-1 with Iraq! De la Fuente concerned!",
    summary: "ALERTA ESPANHOL! A campeã europeia Espanha apenas empatou 1-1 com o Iraque num amistoso de preparação para o Mundial. A equipa de Luis de la Fuente mostrou dificuldades na criação de jogo e falhou várias oportunidades claras de golo. Com o Mundial a começar em menos de duas semanas, os adeptos espanhóis estão nervosos. A Espanha enfrenta a Croácia na fase de grupos e este resultado não inspira confiança.",
    summary_en: "SPANISH ALERT! European champions Spain only drew 1-1 with Iraq in a World Cup warm-up friendly. Luis de la Fuente's side showed difficulties in creating chances and missed several clear goal opportunities. With the World Cup starting in less than two weeks, Spanish fans are nervous. Spain face Croatia in the group stage and this result does not inspire confidence.",
    tag: "HOT",
    source: "@Guardian",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "3.9M",
  },
  {
    id: "t4",
    title: "💣 TRANSFERÊNCIA: Vlahovic confirma saída da Juventus como agente livre! Corrida louca!",
    title_en: "💣 TRANSFER: Vlahovic confirms Juventus exit as free agent! Crazy race begins!",
    summary: "BOMBA NO MERCADO! Dusan Vlahovic vai deixar a Juventus no final de junho como agente livre após a rutura total entre as partes. O avançado sérvio pediu 8 milhões de euros por temporada e a Juve recusou. Tottenham, Arsenal, Chelsea e vários clubes da Bundesliga já contactaram o agente do jogador. Um dos melhores avançados da Europa disponível de graça — o mercado vai enlouquecer!",
    summary_en: "MARKET BOMB! Dusan Vlahovic will leave Juventus at the end of June as a free agent after a total breakdown between the parties. The Serbian striker demanded €8 million per season and Juve refused. Tottenham, Arsenal, Chelsea and several Bundesliga clubs have already contacted the player's agent. One of Europe's best strikers available for free — the market will go crazy!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "4.1M",
  },
  {
    id: "t5",
    title: "🔥 BOMBA: Julian Alvarez quer sair do Atlético! Barcelona oferece €100M!",
    title_en: "🔥 BOMBSHELL: Julian Alvarez wants to leave Atlético! Barcelona bid €100M!",
    summary: "NOVELA DO VERÃO! Julian Alvarez comunicou ao Atlético de Madrid que quer sair este verão. O Barcelona já apresentou uma proposta de €100 milhões, segundo Fabrizio Romano e o Mundo Deportivo, mas os colchoneros recusam. Arsenal e PSG também estão atentos à situação. O argentino, campeão do mundo em 2022, pode ser a grande transferência do verão europeu. O Atlético exige pelo menos €130M!",
    summary_en: "SUMMER SAGA! Julian Alvarez has told Atlético Madrid he wants to leave this summer. Barcelona have already submitted a €100 million bid, according to Fabrizio Romano and Mundo Deportivo, but the Colchoneros are refusing. Arsenal and PSG are also monitoring the situation. The 2022 World Cup winner could be the big transfer of the European summer. Atlético are demanding at least €130M!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "3.7M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: Morgan Rogers decide Arsenal como destino preferido!",
    title_en: "🚨 BREAKING: Morgan Rogers decides Arsenal as preferred destination!",
    summary: "REFORÇO DE LUXO PARA O ARSENAL! Morgan Rogers, a grande revelação da Aston Villa, decidiu que o Arsenal é o seu destino preferido para este verão. Mikel Arteta está pessoalmente a liderar as negociações e o clube londrino está disposto a pagar os €69M pedidos pela Villa. O jovem internacional inglês vai ser titular no Mundial 2026 e pode tornar-se no grande negócio do Arsenal neste mercado.",
    summary_en: "LUXURY SIGNING FOR ARSENAL! Morgan Rogers, Aston Villa's breakout star, has decided that Arsenal is his preferred destination this summer. Mikel Arteta is personally leading negotiations and the London club is willing to pay the €69M asked by Villa. The young England international will start at the 2026 World Cup and could become Arsenal's marquee signing of this transfer window.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "05/06/2026",
    engagement: "2.9M",
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
