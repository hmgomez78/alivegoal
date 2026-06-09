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

// Notícias curadas — atualizadas 09/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Tiroteio junto à base de treino do Mundial 2026 — Kansas City em alerta máximo!",
    title_en: "🚨 BREAKING: Shooting near 2026 World Cup training base — Kansas City on maximum alert!",
    summary: "CAOS A 2 DIAS DO MUNDIAL! Um tiroteio deixou 9 feridos nas imediações de Kansas City, uma das cidades anfitriãs da Copa do Mundo 2026, a apenas 4 dias do início do torneio. O incidente ocorreu perto de uma base de treino de seleções nacionais, obrigando a FIFA e as autoridades americanas a reforçar a segurança em todos os locais do torneio. A ICE também assassinou uma mulher de 37 anos em Minneapolis, outra cidade anfitriã, gerando indignação mundial e levando adeptos internacionais a cancelar viagens. A FIFA emitiu comunicado garantindo que 'a segurança dos participantes é a prioridade máxima', mas a pressão política sobre os EUA como país anfitrião nunca foi tão grande. O mundo questiona: estão os EUA preparados para receber o maior torneio de futebol da história?",
    summary_en: "CHAOS 2 DAYS BEFORE THE WORLD CUP! A shooting left 9 injured near Kansas City, one of the 2026 World Cup host cities, just 4 days before the tournament begins. The incident occurred near a national team training base, forcing FIFA and US authorities to reinforce security at all tournament venues. ICE also killed a 37-year-old woman in Minneapolis, another host city, generating global outrage and causing international fans to cancel trips. FIFA issued a statement guaranteeing that 'the safety of participants is the top priority', but political pressure on the US as host country has never been greater. The world asks: is the US ready to host the biggest football tournament in history?",
    tag: "BREAKING",
    source: "@AP_Sports",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "11.2M",
  },
  {
    id: "t2",
    title: "💥 TRANSFER: Man United prepara oferta de £80M por Tonali — Newcastle pronto para vender!",
    title_en: "💥 TRANSFER: Man United prepare £80M bid for Tonali — Newcastle ready to sell!",
    summary: "BOMBA DE VERÃO! O Manchester United está a preparar uma oferta formal de £80 milhões ao Newcastle United pelo médio italiano Sandro Tonali, segundo fontes próximas do clube. O internacional italiano, que cumpriu suspensão por apostas ilegais e regressou em grande forma, é o alvo número um de Michael Carrick para o meio-campo dos Red Devils. Fabrizio Romano confirmou que Tonali está 'aberto a uma mudança' e que o Newcastle, apesar de não querer vender, pode ceder se a oferta for irrecusável. O Manchester City também manifestou interesse, criando uma guerra de transferências entre os dois gigantes de Manchester. Com o Mundial 2026 em curso, as negociações devem acelerar em julho. A era Carrick no United está a ganhar forma com contratações de topo.",
    summary_en: "SUMMER BOMBSHELL! Manchester United are preparing a formal £80 million offer to Newcastle United for Italian midfielder Sandro Tonali, according to sources close to the club. The Italian international, who served a suspension for illegal betting and returned in great form, is Michael Carrick's number one target for the Red Devils' midfield. Fabrizio Romano confirmed that Tonali is 'open to a move' and that Newcastle, despite not wanting to sell, may give in if the offer is irresistible. Manchester City also expressed interest, creating a transfer war between the two Manchester giants. With the 2026 World Cup underway, negotiations are expected to accelerate in July. The Carrick era at United is taking shape with top signings.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "8.7M",
  },
  {
    id: "t3",
    title: "😱 SCANDAL: Wesley cortado do Brasil com lesão grave — Ancelotti em pânico a 2 dias do Mundial!",
    title_en: "😱 SCANDAL: Wesley cut from Brazil with serious injury — Ancelotti in panic 2 days before World Cup!",
    summary: "DESASTRE NA SELEÇÃO BRASILEIRA! O lateral-direito Wesley, um dos jogadores mais em forma do Brasil, foi cortado da Copa do Mundo 2026 após sofrer uma lesão grau 3 no músculo adutor da coxa esquerda durante o amistoso contra o Egito. A CBF confirmou que Éderson foi convocado como substituto de emergência. A notícia caiu como uma bomba no Brasil: Wesley era considerado titular indiscutível e uma das peças-chave do esquema tático de Carlo Ancelotti. O corte levanta sérias questões sobre a gestão de carga dos atletas — esta é a terceira lesão muscular grave na Seleção em menos de 2 semanas. Os adeptos brasileiros estão furiosos nas redes sociais, exigindo explicações da CBF. O Brasil estreia no Grupo C contra Marrocos no dia 12 de junho.",
    summary_en: "DISASTER IN THE BRAZILIAN NATIONAL TEAM! Right-back Wesley, one of Brazil's most in-form players, was cut from the 2026 World Cup after suffering a grade 3 injury to the left thigh adductor muscle during the friendly against Egypt. The CBF confirmed that Éderson was called up as an emergency replacement. The news hit Brazil like a bombshell: Wesley was considered an undisputed starter and one of the key pieces in Carlo Ancelotti's tactical setup. The cut raises serious questions about player load management — this is the third serious muscle injury in the squad in less than 2 weeks. Brazilian fans are furious on social media, demanding explanations from the CBF. Brazil opens in Group C against Morocco on June 12.",
    tag: "SCANDAL",
    source: "@CBF_Futebol",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "9.8M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Bayern avisa Real Madrid — 'Esqueçam o Olise, podem poupar o trabalho!'",
    title_en: "🔥 HOT: Bayern warns Real Madrid — 'Forget Olise, you can save yourselves the trouble!'",
    summary: "GUERRA DE PALAVRAS ENTRE GIGANTES! O Bayern de Munique enviou um recado direto e contundente ao Real Madrid: Michael Olise não está à venda, ponto final. O diretor desportivo do Bayern declarou publicamente que 'podem poupar o trabalho' quando questionado sobre o interesse do Real Madrid no extremo francês. Olise, que chegou ao Bayern em 2024 por €50M, tem sido um dos melhores jogadores do clube alemão e Florentino Pérez, reconduzido presidente do Real Madrid, identificou-o como alvo prioritário para o verão. O Real Madrid, que também está a tentar contratar Haaland e Kvaratskhelia, vê mais uma porta fechar-se. Mas o mercado de transferências está apenas a começar e os merengues têm poder financeiro para forçar qualquer negócio.",
    summary_en: "WAR OF WORDS BETWEEN GIANTS! Bayern Munich sent a direct and blunt message to Real Madrid: Michael Olise is not for sale, full stop. Bayern's sporting director publicly declared that they 'can save themselves the trouble' when asked about Real Madrid's interest in the French winger. Olise, who joined Bayern in 2024 for €50M, has been one of the German club's best players and Florentino Pérez, re-elected as Real Madrid president, has identified him as a priority target for the summer. Real Madrid, who are also trying to sign Haaland and Kvaratskhelia, see yet another door closing. But the transfer market is only just beginning and the Merengues have the financial power to force any deal.",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "7.4M",
  },
  {
    id: "t5",
    title: "⚡ BREAKING: Argentina vs Islândia — último teste de Messi antes do Mundial! Scaloni revela XI surpresa",
    title_en: "⚡ BREAKING: Argentina vs Iceland — Messi's last test before the World Cup! Scaloni reveals surprise XI",
    summary: "A ÚLTIMA DANÇA ANTES DO MUNDIAL! A Argentina, atual campeã do mundo, enfrenta esta noite a Islândia no último amistoso de preparação para a Copa do Mundo 2026. Lionel Scaloni surpreendeu ao revelar um onze inicial com várias novidades táticas, incluindo a utilização de Lautaro Martínez como falso 9 com Messi a jogar mais recuado. A Argentina, que estreia no Grupo D contra a Arábia Saudita no dia 13 de junho, quer chegar ao torneio em máxima confiança. Messi, que joga o seu último Mundial, prometeu 'dar tudo' para defender o título. O jogo começa às 22h (hora de Lisboa) e promete ser um espetáculo. A Islândia, que não se qualificou para o Mundial, quer fazer história contra os campeões do mundo.",
    summary_en: "THE LAST DANCE BEFORE THE WORLD CUP! Argentina, the current world champions, face Iceland tonight in the last warm-up friendly before the 2026 World Cup. Lionel Scaloni surprised by revealing a starting XI with several tactical innovations, including Lautaro Martínez as a false 9 with Messi playing deeper. Argentina, who open in Group D against Saudi Arabia on June 13, want to arrive at the tournament in maximum confidence. Messi, who is playing his last World Cup, promised to 'give everything' to defend the title. The match starts at 22:00 (Lisbon time) and promises to be a spectacle. Iceland, who did not qualify for the World Cup, want to make history against the world champions.",
    tag: "BREAKING",
    source: "@TyCSports",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "10.1M",
  },
  {
    id: "t6",
    title: "💰 HOT: Eriksen fala pela primeira vez após colapso — 'Estou bem, quero jogar o Mundial!'",
    title_en: "💰 HOT: Eriksen speaks for the first time after collapse — 'I'm fine, I want to play the World Cup!'",
    summary: "ALÍVIO MUNDIAL! Christian Eriksen quebrou o silêncio e falou pela primeira vez após o susto que paralisou o futebol mundial durante o amistoso Dinamarca vs Ucrânia. O médio do Manchester United, que já tinha sobrevivido a uma paragem cardíaca no Euro 2020, garantiu estar 'bem e consciente' e revelou o seu desejo de representar a Dinamarca no Mundial 2026. 'Estou bem. Foi um susto, mas o meu coração está a funcionar. Quero jogar o Mundial', disse Eriksen em comunicado. O dispositivo cardíaco implantado após o episódio de 2021 funcionou na perfeição. A Dinamarca, que estreia no Grupo E contra a Sérvia no dia 15 de junho, aguarda o aval médico para incluir Eriksen na convocatória. O mundo do futebol respirou de alívio.",
    summary_en: "WORLDWIDE RELIEF! Christian Eriksen broke his silence and spoke for the first time after the scare that paralysed world football during the Denmark vs Ukraine friendly. The Manchester United midfielder, who had already survived a cardiac arrest at Euro 2020, assured he is 'well and conscious' and revealed his desire to represent Denmark at the 2026 World Cup. 'I'm fine. It was a scare, but my heart is working. I want to play the World Cup', said Eriksen in a statement. The cardiac device implanted after the 2021 episode worked perfectly. Denmark, who open in Group E against Serbia on June 15, await medical clearance to include Eriksen in the squad. The football world breathed a sigh of relief.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "09/06/2026",
    engagement: "12.3M",
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
