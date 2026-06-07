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

// Notícias curadas — atualizadas 07/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO: Rafael Leão expulso por soco no amistoso Portugal vs Chile — em risco para o Mundial!",
    title_en: "🚨 SCANDAL: Rafael Leão sent off for punching in Portugal vs Chile warm-up — World Cup place at risk!",
    summary: "CAOS EM OEIRAS! Rafael Leão foi expulso com cartão vermelho direto por dar um soco ao defesa chileno Ivan Román mesmo antes do intervalo do amistoso Portugal vs Chile (2-0). O extremo do AC Milan ficou furioso após sentir que tinha sido agredido por outro adversário, mas a sua reação violenta pode ter consequências graves. Com o Mundial 2026 a começar a 11 de junho, a Federação Portuguesa de Futebol vai ter de decidir se o jogador enfrenta suspensão. Ronaldo marcou e Bruno Fernandes fez o segundo, mas a expulsão de Leão dominou as notícias. Portugal venceu 2-0 mas a polémica vai durar dias!",
    summary_en: "CHAOS IN OEIRAS! Rafael Leão was sent off with a straight red card for punching Chilean defender Ivan Román just before half-time of the Portugal vs Chile friendly (2-0). The AC Milan winger was furious after feeling he had been fouled by another opponent, but his violent reaction may have serious consequences. With the 2026 World Cup starting on June 11, the Portuguese Football Federation will have to decide if the player faces suspension. Ronaldo scored and Bruno Fernandes added the second, but Leão's red card dominated the headlines. Portugal won 2-0 but the controversy will last days!",
    tag: "SCANDAL",
    source: "@AP_Sports",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "7.2M",
  },
  {
    id: "t2",
    title: "💣 BOMBA: Real Madrid vai enviar oferta de €150M por Michael Olise — Bayern diz 'nem por €200M'!",
    title_en: "💣 BOMBSHELL: Real Madrid to send €150M bid for Michael Olise — Bayern says 'not even for €200M'!",
    summary: "GUERRA DE TRANSFERÊNCIAS! Florentino Pérez, se for reeleito presidente do Real Madrid, vai enviar uma proposta oficial de €150 milhões ao Bayern Munich por Michael Olise já na próxima semana. Fabrizio Romano confirmou que o presidente merengue 'apaixonou-se completamente' pelo extremo franco-inglês de 24 anos e acredita que ele pode 'trazer a magia de volta ao Bernabéu'. O Bayern, porém, não quer saber de dinheiro: Uli Hoeness e Karl-Heinz Rummenigge repetiram que 'nem por €200 milhões' o deixam sair. Olise tem um valor estimado de €170,6M — o segundo mais alto do mundo. O Real Madrid já tem Mourinho, Dumfries e Konaté. Agora quer o galáctico do verão!",
    summary_en: "TRANSFER WAR! Florentino Pérez, if re-elected Real Madrid president, will send an official €150 million offer to Bayern Munich for Michael Olise as early as next week. Fabrizio Romano confirmed that the Merengue president has 'completely fallen in love' with the 24-year-old Franco-English winger and believes he can 'bring the magic back to the Bernabéu'. Bayern, however, don't care about money: Uli Hoeness and Karl-Heinz Rummenigge repeated that 'not even for €200 million' will they let him leave. Olise has an estimated value of €170.6M — the second highest in the world. Real Madrid already have Mourinho, Dumfries and Konaté. Now they want the summer galáctico!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "6.8M",
  },
  {
    id: "t3",
    title: "⚡ BREAKING: PSG campeão da Europa — riots em Paris após final da Champions contra o Arsenal!",
    title_en: "⚡ BREAKING: PSG European champions — riots in Paris after Champions League final against Arsenal!",
    summary: "PARIS EM CHAMAS! O Paris Saint-Germain conquistou a sua primeira Liga dos Campeões da história ao vencer o Arsenal nos penáltis na final disputada em Budapeste. Mas a celebração transformou-se em caos: centenas de adeptos foram detidos em Paris, polícias ficaram feridos e as ruas tornaram-se verdadeiros campos de batalha. O PSG, liderado por Mbappé que marcou duas vezes em 97 segundos para virar o marcador, tornou-se o primeiro clube francês a ganhar a Champions. Arsenal, que perdeu nos penáltis, vê mais uma final escapar. Philippe Senderos disse que 'o Arsenal não vai querer desequilibrar o plantel' neste verão apesar da derrota.",
    summary_en: "PARIS IN FLAMES! Paris Saint-Germain won their first ever Champions League title by defeating Arsenal on penalties in the final held in Budapest. But the celebration turned into chaos: hundreds of fans were arrested in Paris, police officers were injured and the streets became battlegrounds. PSG, led by Mbappé who scored twice in 97 seconds to turn the game around, became the first French club to win the Champions League. Arsenal, who lost on penalties, see another final slip away. Philippe Senderos said that 'Arsenal won't want to unbalance their squad' this summer despite the defeat.",
    tag: "BREAKING",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "9.1M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Manchester United confirma contratação de Ederson (Atalanta) por €45M — primeiro reforço de Carrick!",
    title_en: "🔥 HOT: Manchester United confirm signing of Ederson (Atalanta) for €45M — Carrick's first signing!",
    summary: "NEGÓCIO FECHADO! Manchester United e Atalanta completaram todos os documentos para a transferência do médio brasileiro Ederson por um pacote de €45 milhões (€40,5M + €4,5M em bónus). Fabrizio Romano confirmou: '100% confirmado'. O jogador assinou um contrato de 5 anos (4+1) com o clube de Old Trafford, mas só poderá ser registado oficialmente em julho devido ao sistema de transferências internacionais. É o primeiro reforço da era Michael Carrick, que também quer mais dois médios neste verão. Casemiro e Ugarte saem, Ederson chega para liderar a reconstrução do meio-campo dos Red Devils.",
    summary_en: "DEAL DONE! Manchester United and Atalanta have completed all documents for the transfer of Brazilian midfielder Ederson for a package of €45 million (€40.5M + €4.5M in bonuses). Fabrizio Romano confirmed: '100% confirmed'. The player has signed a 5-year contract (4+1) with the Old Trafford club, but can only be officially registered in July due to the international transfer system. It's the first signing of the Michael Carrick era, who also wants two more midfielders this summer. Casemiro and Ugarte leave, Ederson arrives to lead the Red Devils' midfield rebuild.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "5.3M",
  },
  {
    id: "t5",
    title: "💥 CHOQUE: Mason Greenwood acorda com Fenerbahçe — Marseille pede €55M e Man United tem cláusula pesada!",
    title_en: "💥 SHOCK: Mason Greenwood agrees terms with Fenerbahçe — Marseille wants €55M and Man United have heavy clause!",
    summary: "BOMBA DA TURQUIA! O candidato à presidência do Fenerbahçe, Hakan Safi, anunciou oficialmente que chegou a acordo com Mason Greenwood para um contrato de 4 anos. O próprio Greenwood confirmou o interesse ao seguir Safi no Instagram e dar likes nas publicações sobre o seu futuro. Mas o negócio depende de dois fatores: o Marseille quer entre €50M e €55M, e o Manchester United tem uma cláusula de venda pesada no contrato com o clube francês — 'mais do que 10%', segundo Romano. Se o negócio avançar, o United pode embolsar uma soma considerável. O Roma de Gasperini também está interessado caso o Fenerbahçe não avance.",
    summary_en: "TURKISH BOMBSHELL! Fenerbahçe presidential candidate Hakan Safi officially announced he has reached an agreement with Mason Greenwood for a 4-year contract. Greenwood himself confirmed his interest by following Safi on Instagram and liking posts about his future. But the deal depends on two factors: Marseille want between €50M and €55M, and Manchester United have a heavy sell-on clause in the contract with the French club — 'more than 10%', according to Romano. If the deal goes through, United could pocket a considerable sum. Roma's Gasperini is also interested if Fenerbahçe don't follow through.",
    tag: "HOT",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "4.7M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: Alemanha derrota EUA em Chicago — Wirtz e Havertz brilham no último teste pré-Mundial!",
    title_en: "🚨 BREAKING: Germany defeat USA in Chicago — Wirtz and Havertz shine in final pre-World Cup test!",
    summary: "RESULTADO SURPREENDENTE! A Alemanha derrotou os Estados Unidos no Soldier Field em Chicago no último amistoso de preparação antes do Mundial 2026. Florian Wirtz e Kai Havertz foram os grandes destaques da equipa germânica, que mostrou estar em excelente forma para o torneio que começa a 11 de junho. Os EUA, anfitriões do Mundial, saíram derrotados mas mostraram momentos de qualidade. Esta derrota vai aumentar a pressão sobre a seleção americana, que precisa de convencer os seus adeptos de que pode ir longe no torneio. A Alemanha é agora vista como uma das grandes candidatas ao título.",
    summary_en: "SURPRISING RESULT! Germany defeated the United States at Soldier Field in Chicago in the final warm-up friendly before the 2026 World Cup. Florian Wirtz and Kai Havertz were the standout performers for the German side, who showed they are in excellent form for the tournament starting on June 11. The USA, World Cup hosts, were defeated but showed moments of quality. This defeat will increase pressure on the American team, who need to convince their fans they can go far in the tournament. Germany are now seen as one of the main title contenders.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "07/06/2026",
    engagement: "5.9M",
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
