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

// Notícias curadas — atualizadas 21/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Alemanha sofre, mas Undav salva! Reviravolta épica 2-1 contra a Costa do Marfim!",
    title_en: "🚨 BREAKING: Germany suffer, but Undav saves the day! Epic 2-1 comeback against Ivory Coast!",
    summary: "A Alemanha de Julian Nagelsmann esteve à beira do desastre no Mundial 2026, mas conseguiu uma vitória dramática por 2-1 sobre a Costa do Marfim. A perder por 1-0 ao intervalo, a Mannschaft viu Deniz Undav entrar e vestir a capa de herói. O avançado marcou dois golos vitais, com o golo da vitória a surgir já aos 94 minutos. Este resultado garante a passagem da Alemanha à próxima fase e consolida o estatuto de Undav como o derradeiro 'super-sub' do torneio.",
    summary_en: "Julian Nagelsmann's Germany were on the brink of disaster at the 2026 World Cup, but managed a dramatic 2-1 victory over Ivory Coast. Trailing 1-0 at half-time, Die Mannschaft saw Deniz Undav come on and don the hero's cape. The striker scored two vital goals, with the winner coming in the 94th minute. This result guarantees Germany's passage to the next round and cements Undav's status as the ultimate 'super-sub' of the tournament.",
    tag: "BREAKING",
    source: "@FIFAWorldCup",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "142.5M",
  },
  {
    id: "t2",
    title: "🔥 TRANSFER: Casemiro no Inter Miami! Acordo total fechado para jogar com Messi na MLS!",
    title_en: "🔥 TRANSFER: Casemiro to Inter Miami! Full agreement reached to play with Messi in MLS!",
    summary: "O mercado de transferências acaba de explodir! Fabrizio Romano confirmou o 'Here We Go' para a transferência de Casemiro do Manchester United para o Inter Miami. O médio brasileiro de 34 anos chegou a um acordo total com a equipa da MLS e vai juntar-se a Lionel Messi, Luis Suárez, Sergio Busquets e Jordi Alba num verdadeiro 'Dream Team' das Américas. Casemiro vai deixar Old Trafford após o final da época, numa transferência livre que marca o fim de uma era no futebol europeu.",
    summary_en: "The transfer market has just exploded! Fabrizio Romano has confirmed the 'Here We Go' for Casemiro's transfer from Manchester United to Inter Miami. The 34-year-old Brazilian midfielder has reached a full agreement with the MLS side and will join Lionel Messi, Luis Suárez, Sergio Busquets and Jordi Alba in a true Americas 'Dream Team'. Casemiro will leave Old Trafford after the end of the season on a free transfer that marks the end of an era in European football.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "185.3M",
  },
  {
    id: "t3",
    title: "💥 HOT: Goleada Histórica! Holanda esmaga Suécia por 5-1 com Gakpo e Brobbey intratáveis!",
    title_en: "💥 HOT: Historic Thrashing! Netherlands crush Sweden 5-1 with unstoppable Gakpo and Brobbey!",
    summary: "A Holanda enviou um sério aviso aos favoritos do Mundial 2026 com uma vitória estrondosa por 5-1 sobre a Suécia. Cody Gakpo e Brian Brobbey estiveram em noite de sonho, marcando dois golos cada um num jogo onde o ataque laranja foi simplesmente demolidor. Crysencio Summerville fechou a contagem para a equipa de Ronald Koeman. A Suécia, que tinha goleado a Tunísia na primeira jornada, não teve resposta para a intensidade e qualidade técnica dos holandeses.",
    summary_en: "The Netherlands sent a serious warning to the 2026 World Cup favourites with a resounding 5-1 victory over Sweden. Cody Gakpo and Brian Brobbey had a dream night, scoring two goals each in a match where the Dutch attack was simply devastating. Crysencio Summerville completed the scoring for Ronald Koeman's team. Sweden, who had thrashed Tunisia in the first round, had no answer to the intensity and technical quality of the Dutch.",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "112.8M",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Manchester City prepara oferta astronómica de £120M por Elliot Anderson!",
    title_en: "🚨 BREAKING: Manchester City prepare astronomical £120M bid for Elliot Anderson!",
    summary: "O Manchester City está determinado a vencer o rival Manchester United na corrida por Elliot Anderson. O talentoso médio do Nottingham Forest e da seleção inglesa, que tem brilhado no Mundial, tornou-se o alvo principal de Pep Guardiola. O City está disposto a bater recordes com uma oferta a rondar os 120 milhões de libras. As negociações estão numa fase avançada, deixando o United em desvantagem e confirmando o poderio financeiro dos 'Citizens' neste mercado de verão.",
    summary_en: "Manchester City are determined to beat rivals Manchester United in the race for Elliot Anderson. The talented Nottingham Forest and England midfielder, who has shone at the World Cup, has become Pep Guardiola's top target. City are willing to break records with an offer of around £120 million. Negotiations are at an advanced stage, leaving United at a disadvantage and confirming the financial power of the 'Citizens' in this summer market.",
    tag: "BREAKING",
    source: "@SkySportsNews",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "95.4M",
  },
  {
    id: "t5",
    title: "⚽ TRANSFER: Atlético Madrid ataca em força! Grimaldo e Lee Kang-In praticamente fechados!",
    title_en: "⚽ TRANSFER: Atletico Madrid attack in force! Grimaldo and Lee Kang-In practically closed!",
    summary: "O Atlético de Madrid de Diego Simeone está a agitar o mercado com duas contratações de peso. Alejandro Grimaldo, do Bayer Leverkusen, e Lee Kang-In, do PSG, estão a um passo de serem anunciados pelos Colchoneros. Fabrizio Romano confirmou que já existe acordo verbal com ambos os jogadores. Grimaldo regressa a Espanha por cerca de 15 milhões de euros, enquanto Lee Kang-In custará perto de 25 milhões. Uma dupla injeção de qualidade para o plantel madrileno.",
    summary_en: "Diego Simeone's Atletico Madrid are shaking up the market with two major signings. Alejandro Grimaldo of Bayer Leverkusen and Lee Kang-In of PSG are one step away from being announced by Los Colchoneros. Fabrizio Romano has confirmed that a verbal agreement already exists with both players. Grimaldo returns to Spain for around €15 million, while Lee Kang-In will cost close to €25 million. A double injection of quality for the Madrid squad.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "88.7M",
  },
  {
    id: "t6",
    title: "🔥 SCANDAL: Mourinho no Real Madrid até 2029! Cucurella é a primeira contratação da nova era!",
    title_en: "🔥 SCANDAL: Mourinho at Real Madrid until 2029! Cucurella is the first signing of the new era!",
    summary: "O regresso do 'Special One' a Madrid já é oficial e já faz vítimas! José Mourinho assinou contrato com o Real Madrid até 2029 e já exigiu revoluções no plantel. A primeira exigência do treinador português foi Marc Cucurella, que chega por 60 milhões de euros para ser o dono do lado esquerdo da defesa. Esta mudança drástica na política de contratações dos merengues, agora focada no sucesso imediato sob a alçada de Mourinho, está a gerar enorme controvérsia em Espanha.",
    summary_en: "The return of the 'Special One' to Madrid is official and is already claiming victims! Jose Mourinho has signed a contract with Real Madrid until 2029 and has already demanded revolutions in the squad. The Portuguese coach's first demand was Marc Cucurella, who arrives for €60 million to own the left side of the defence. This drastic change in Los Blancos' transfer policy, now focused on immediate success under Mourinho, is generating huge controversy in Spain.",
    tag: "SCANDAL",
    source: "@Marca",
    url: "https://x.com/alivegoal",
    time: "21/06/2026",
    engagement: "167.2M",
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
