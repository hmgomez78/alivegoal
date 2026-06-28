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
// Notícias curadas — atualizadas 28/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Kane faz HISTÓRIA! Inglaterra 2-0 Panamá — Novo recorde de golos inglês no Mundial!",
    title_en: "🚨 BREAKING: Kane makes HISTORY! England 2-0 Panama — New English World Cup goals record!",
    summary: "Harry Kane tornou-se o maior marcador inglês de sempre em Mundiais ao marcar o segundo golo contra o Panamá, ultrapassando Gary Lineker com 11 golos em fases finais. O capitão dos Three Lions cabeceou para o fundo das redes após um cruzamento magistral de Jude Bellingham, que também marcou o primeiro golo do jogo aos 62 minutos. A Inglaterra terminou o Grupo L em primeiro lugar com 7 pontos e vai defrontar o Senegal nos oitavos de final. Bellingham foi eleito o melhor em campo numa exibição que voltou a mostrar porque é o melhor jogador do mundo. A Croácia também se qualificou ao vencer o Gana por 2-1.",
    summary_en: "Harry Kane became England's all-time leading World Cup scorer by netting the second goal against Panama, surpassing Gary Lineker with 11 goals at World Cup finals. The Three Lions captain headed home after a masterful cross from Jude Bellingham, who also scored the opener in the 62nd minute. England finished Group L in first place with 7 points and will face Senegal in the Round of 32. Bellingham was named man of the match in a performance that once again showed why he is the best player in the world. Croatia also qualified by beating Ghana 2-1.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "487.6M",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Ronaldo APAGADO! Colômbia 0-0 Portugal — CR7 sem golos e Portugal cai para 2º lugar!",
    title_en: "💥 SCANDAL: Ronaldo INVISIBLE! Colombia 0-0 Portugal — CR7 goalless as Portugal drop to 2nd place!",
    summary: "Cristiano Ronaldo viveu uma das noites mais frustrantes da sua carreira no Mundial ao ser completamente apagado pela defesa colombiana no Hard Rock Stadium de Miami. A Colômbia dominou o jogo com 24 remates (6 à baliza) e um xG de 1.63, enquanto Portugal sobreviveu graças a Diogo Costa, que fez defesas milagrosas para manter o empate. O resultado coloca a Colômbia em primeiro do Grupo K e Portugal em segundo, com os portugueses a defrontar a Croácia nos oitavos de final. A imprensa portuguesa não poupou críticas a Ronaldo, que passou o jogo sem um único remate enquadrado. O Guardian escreveu: 'O marcador mente — a Colômbia devia ter ganho este jogo.'",
    summary_en: "Cristiano Ronaldo endured one of the most frustrating nights of his World Cup career as he was completely nullified by the Colombian defence at the Hard Rock Stadium in Miami. Colombia dominated the game with 24 shots (6 on target) and an xG of 1.63, while Portugal survived thanks to Diogo Costa, who made miraculous saves to preserve the draw. The result places Colombia top of Group K and Portugal second, with the Portuguese set to face Croatia in the Round of 32. The Portuguese press did not spare Ronaldo, who went the entire game without a single shot on target. The Guardian wrote: 'The scoreline lies — Colombia should have won this game.'",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "523.4M",
  },
  {
    id: "t3",
    title: "🔥 TRANSFER: Barcelona confirma Anthony Gordon por €80M — O mais caro do verão!",
    title_en: "🔥 TRANSFER: Barcelona confirm Anthony Gordon for €80M — The most expensive signing of the summer!",
    summary: "O Barcelona confirmou a contratação do extremo inglês Anthony Gordon ao Newcastle United por €80 milhões, tornando-se a transferência mais cara do verão de 2026 até ao momento. O internacional inglês, de 24 anos, assinou um contrato de 5 anos com o clube catalão e vai fazer parceria com Lamine Yamal e Raphinha no ataque blaugrana. A contratação foi confirmada pelo próprio Barcelona nas redes sociais com a frase 'Benvindo, Anthony!' em inglês e catalão. O Newcastle, que perde Gordon e pode ainda perder Bruno Guimarães para o Arsenal e Sandro Tonali para o Tottenham, enfrenta uma reconstrução profunda do plantel.",
    summary_en: "Barcelona confirmed the signing of English winger Anthony Gordon from Newcastle United for €80 million, making it the most expensive transfer of the summer of 2026 so far. The 24-year-old England international signed a 5-year contract with the Catalan club and will partner Lamine Yamal and Raphinha in the blaugrana attack. The signing was confirmed by Barcelona themselves on social media with the phrase 'Welcome, Anthony!' in English and Catalan. Newcastle, who lose Gordon and could still lose Bruno Guimarães to Arsenal and Sandro Tonali to Tottenham, face a major squad overhaul.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "341.8M",
  },
  {
    id: "t4",
    title: "🚨 BREAKING: Congo-DR 3-1 Uzbequistão — África faz história com qualificação épica!",
    title_en: "🚨 BREAKING: DR Congo 3-1 Uzbekistan — Africa makes history with epic qualification!",
    summary: "O Congo-DR protagonizou uma das maiores histórias do Mundial 2026 ao eliminar o Uzbequistão por 3-1 num jogo de enorme dramatismo. Yoane Wissa, avançado do Brentford, foi o herói com dois golos — incluindo um grande penálti que empatou o jogo após o Uzbequistão ter aberto o marcador com Eldor Shomurodov. Fiston Mayele marcou o terceiro golo para selar a qualificação histórica. O Congo-DR torna-se apenas a segunda equipa africana a qualificar-se para os oitavos de final neste torneio, juntando-se ao Egito. O VAR anulou um golo congolês no início do jogo, tornando a reviravolta ainda mais dramática.",
    summary_en: "DR Congo produced one of the greatest stories of the 2026 World Cup by eliminating Uzbekistan 3-1 in a game of enormous drama. Yoane Wissa, the Brentford striker, was the hero with two goals — including a crucial penalty that equalised after Uzbekistan had taken the lead through Eldor Shomurodov. Fiston Mayele scored the third to seal the historic qualification. DR Congo become only the second African team to qualify for the Round of 32 in this tournament, joining Egypt. VAR controversially ruled out a Congolese goal early in the game, making the comeback even more dramatic.",
    tag: "BREAKING",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "298.5M",
  },
  {
    id: "t5",
    title: "🔥 TRANSFER: Real Madrid confirma Cucurella (€55M), Bernardo Silva e Konaté (Bosman) — Revolução no Bernabéu!",
    title_en: "🔥 TRANSFER: Real Madrid confirm Cucurella (€55M), Bernardo Silva and Konaté (Bosman) — Revolution at the Bernabéu!",
    summary: "O Real Madrid está a protagonizar uma das janelas de transferências mais activas da sua história. Os merengues confirmaram a contratação do lateral esquerdo Marc Cucurella ao Chelsea por €55 milhões, e fecharam acordos de Bosman com o médio Bernardo Silva (Manchester City) e o defesa central Ibrahima Konaté (Liverpool). Além disso, está a ser finalizado um acordo com o Inter Milão pelo lateral Denzel Dumfries. O clube madrileno quer também contratar Enzo Fernández ao Chelsea. Com Mbappé já no plantel, o Real Madrid está a construir uma equipa para dominar a Europa nos próximos anos. Uma revolução completa no Bernabéu.",
    summary_en: "Real Madrid are having one of the most active transfer windows in their history. Los Blancos confirmed the signing of left-back Marc Cucurella from Chelsea for €55 million, and closed Bosman deals with midfielder Bernardo Silva (Manchester City) and centre-back Ibrahima Konaté (Liverpool). Additionally, a deal with Inter Milan for full-back Denzel Dumfries is being finalised. The Madrid club also wants to sign Enzo Fernández from Chelsea. With Mbappé already in the squad, Real Madrid are building a team to dominate Europe for years to come. A complete revolution at the Bernabéu.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "412.3M",
  },
  {
    id: "t6",
    title: "💥 HOT: Ugarte lesionado GRAVEMENTE — Man Utd em crise e Messi no banco vs Jordânia!",
    title_en: "💥 HOT: Ugarte SERIOUSLY injured — Man Utd in crisis and Messi benched vs Jordan!",
    summary: "O Mundial 2026 trouxe duas notícias bombásticas para os adeptos de futebol de clube. Manuel Ugarte, médio do Manchester United, foi retirado de maca do jogo Uruguai vs Espanha com uma lesão aparentemente grave no joelho, colocando em risco a sua transferência de saída do Old Trafford que estava prevista para este verão. Enquanto isso, Lionel Messi foi poupado por Scaloni no jogo Argentina vs Jordânia — já apurada — com a Argentina a vencer por 2-0 ao intervalo com golos de Lo Celso e Lautaro Martínez (penálti). Messi entrou na segunda parte para delírio dos adeptos no AT&T Stadium em Dallas.",
    summary_en: "The 2026 World Cup brought two bombshell pieces of news for club football fans. Manuel Ugarte, Manchester United's midfielder, was stretchered off during Uruguay vs Spain with an apparently serious knee injury, putting at risk his transfer out of Old Trafford that was planned for this summer. Meanwhile, Lionel Messi was rested by Scaloni for the already-qualified Argentina vs Jordan game — with Argentina leading 2-0 at half-time thanks to goals from Lo Celso and Lautaro Martínez (penalty). Messi came on in the second half to the delight of fans at AT&T Stadium in Dallas.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "28/06/2026",
    engagement: "356.9M",
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
