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

// Notícias curadas — atualizadas 17/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🏆 MANCHESTER CITY VENCE A FA CUP! Semenyo marca o único golo e derrota Chelsea 1-0 em Wembley — Guardiola recusa festejos!",
    title_en: "🏆 MANCHESTER CITY WIN THE FA CUP! Semenyo scores the only goal to beat Chelsea 1-0 at Wembley — Guardiola refuses celebrations!",
    summary: "HISTÓRIA EM WEMBLEY! O Manchester City conquistou a FA Cup com uma vitória magra mas dramática por 1-0 sobre o Chelsea. O golo de Antoine Semenyo no segundo tempo foi suficiente para coroar Pep Guardiola com mais um troféu histórico. O treinador catalão, numa declaração surpreendente após o apito final, disse que a equipa não vai beber 'nem uma cerveja' — uma referência ao seu foco total na próxima temporada. O Chelsea, que dominou a posse de bola, saiu de Wembley de mãos vazias e com sérias questões sobre o futuro do treinador. A vitória garante ao City um lugar na UEFA Europa League 2026/27, o que pode ser crucial para as suas finanças. Guardiola conquistou o 17.º título como treinador do City, tornando-se o treinador mais titulado da história do clube inglês!",
    summary_en: "HISTORY AT WEMBLEY! Manchester City won the FA Cup with a narrow but dramatic 1-0 victory over Chelsea. Antoine Semenyo's second-half goal was enough to crown Pep Guardiola with another historic trophy. The Catalan manager, in a surprising statement after the final whistle, said the team will not drink 'not even one beer' — a reference to his total focus on next season. Chelsea, who dominated possession, left Wembley empty-handed with serious questions about their manager's future. The victory secures City a place in the 2026/27 UEFA Europa League, which could be crucial for their finances. Guardiola won his 17th title as City manager, becoming the most decorated manager in the club's English history!",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "24.7M",
  },
  {
    id: "t2",
    title: "🚨 MOURINHO CONFIRMADO NO REAL MADRID! Reunião com Florentino esta semana — Benfica em pânico à procura de substituto!",
    title_en: "🚨 MOURINHO CONFIRMED AT REAL MADRID! Meeting with Florentino this week — Benfica in panic searching for replacement!",
    summary: "O REGRESSO DO SPECIAL ONE! José Mourinho está a horas de ser confirmado como novo treinador do Real Madrid, segundo o The Athletic e Fabrizio Romano. O treinador português vai reunir-se com o presidente Florentino Pérez ainda esta semana para finalizar os detalhes do contrato de 3 anos. Mourinho terá exigido controlo total sobre as transferências, incluindo o poder de vetar qualquer contratação. O Benfica, que esperava renovar com o treinador, está agora em pânico e já contactou Rúben Amorim, Roger Schmidt e até Sérgio Conceição como alternativas. O Bernabéu, que o vaiou na sua primeira passagem, prepara-se para recebê-lo de volta como o 'salvador' após uma temporada de pesadelo. Mbappé e Vinicius, que foram vaiados pelos próprios adeptos, terão de se adaptar ao estilo pragmático do 'Special One'!",
    summary_en: "THE RETURN OF THE SPECIAL ONE! José Mourinho is hours away from being confirmed as Real Madrid's new manager, according to The Athletic and Fabrizio Romano. The Portuguese manager will meet president Florentino Pérez this week to finalise details of a 3-year contract. Mourinho reportedly demanded full control over transfers, including the power to veto any signing. Benfica, who hoped to renew with the manager, are now in panic and have already contacted Rúben Amorim, Roger Schmidt and even Sérgio Conceição as alternatives. The Bernabeu, which once booed him, prepares to welcome him back as the 'saviour' after a nightmare season. Mbappé and Vinicius, who were booed by their own fans, will have to adapt to the 'Special One's' pragmatic style!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "21.3M",
  },
  {
    id: "t3",
    title: "💥 SALAH EXPLODE CONTRA O LIVERPOOL! 'Precisamos de regressar ao heavy metal football' — Arne Slot em risco de ser despedido após derrota 4-2!",
    title_en: "💥 SALAH EXPLODES AGAINST LIVERPOOL! 'We need to return to heavy metal football' — Arne Slot at risk of being sacked after 4-2 defeat!",
    summary: "CRISE TOTAL EM ANFIELD! Mohamed Salah fez uma declaração bombástica após a derrota por 4-2 frente ao Aston Villa, exigindo que o Liverpool regresse ao 'heavy metal football' que o tornou famoso sob Jürgen Klopp. O egípcio, que está no último ano de contrato, parece estar a fazer pressão pública sobre o treinador Arne Slot. O Liverpool, com 19 derrotas esta temporada — o pior registo do século — viu as suas esperanças no Top 4 ficarem em risco crítico. Ollie Watkins foi o herói do Aston Villa com dois golos numa noite épica em Villa Park. A direção dos Reds está agora a ponderar seriamente o futuro de Slot, com nomes como Xabi Alonso e Thomas Tuchel a serem mencionados como possíveis substitutos. Será que Salah está a forçar a saída do treinador para garantir a sua própria renovação?",
    summary_en: "TOTAL CRISIS AT ANFIELD! Mohamed Salah made a bombshell statement after the 4-2 defeat to Aston Villa, demanding Liverpool return to the 'heavy metal football' that made them famous under Jürgen Klopp. The Egyptian, who is in the final year of his contract, appears to be publicly pressuring manager Arne Slot. Liverpool, with 19 defeats this season — their worst record this century — saw their Top 4 hopes in critical danger. Ollie Watkins was Aston Villa's hero with two goals on an epic night at Villa Park. The Reds board is now seriously considering Slot's future, with names like Xabi Alonso and Thomas Tuchel being mentioned as possible replacements. Is Salah forcing the manager out to secure his own contract renewal?",
    tag: "SCANDAL",
    source: "@Reuters",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "18.9M",
  },
  {
    id: "t4",
    title: "💰 PSG PREPARA OFERTA HISTÓRICA DE €100M+ POR JULIAN ALVAREZ! Arsenal e Barcelona ficam para trás — campeões europeus flexionam músculo financeiro!",
    title_en: "💰 PSG PREPARE HISTORIC €100M+ BID FOR JULIAN ALVAREZ! Arsenal and Barcelona left behind — European champions flex financial muscle!",
    summary: "GUERRA DE TRANSFERÊNCIAS! O Paris Saint-Germain, atual campeão da UEFA Champions League, está a preparar uma oferta superior a €100 milhões por Julian Alvarez do Atlético Madrid, segundo o The Score e Ekrem Konur. Os campeões europeus querem superar Arsenal e Barcelona, que também estão na corrida pelo avançado argentino. O PSG, que vai defender o título da Champions na final contra o Arsenal ainda este mês, quer reforçar o ataque com o melhor avançado disponível no mercado. Alvarez, que foi peça fundamental na conquista do Mundial pelo Argentina, tem uma cláusula de rescisão de €120 milhões mas o Atlético pode aceitar menos. Esta transferência seria a mais cara da história do PSG e um sinal claro das ambições do clube francês para 2026/27!",
    summary_en: "TRANSFER WAR! Paris Saint-Germain, current UEFA Champions League holders, are preparing a bid of over €100 million for Julian Alvarez from Atletico Madrid, according to The Score and Ekrem Konur. The European champions want to outmuscle Arsenal and Barcelona, who are also in the race for the Argentine striker. PSG, who will defend the Champions League title in the final against Arsenal later this month, want to strengthen their attack with the best striker available on the market. Alvarez, who was instrumental in Argentina's World Cup triumph, has a release clause of €120 million but Atletico may accept less. This transfer would be the most expensive in PSG's history and a clear signal of the French club's ambitions for 2026/27!",
    tag: "TRANSFER",
    source: "@TheScore",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "16.4M",
  },
  {
    id: "t5",
    title: "🔥 XABI ALONSO É O FAVORITO PARA TREINAR O CHELSEA! Liverpool 'tropeçou na corrida' — Reds perdem o seu herói para os Blues rivais!",
    title_en: "🔥 XABI ALONSO IS FAVOURITE TO MANAGE CHELSEA! Liverpool 'slipped up in the race' — Reds lose their hero to rival Blues!",
    summary: "IRONIA DO DESTINO! Xabi Alonso, ídolo dos adeptos do Liverpool, está prestes a tornar-se o novo treinador do Chelsea, segundo o LiveScore e várias fontes inglesas. O Liverpool, que estava na corrida para contratar o ex-médio espanhol, 'tropeçou na corrida' e agora vê o seu herói ir para o rival londrino. Alonso, que fez história no Bayer Leverkusen ao ganhar a Bundesliga de forma invicta, é visto como o treinador perfeito para reconstruir o Chelsea após uma época dececionante. A sua filosofia de jogo agressiva e baseada na posse de bola é o oposto do que o Chelsea tem mostrado esta temporada. A confirmação pode chegar ainda esta semana, deixando os adeptos do Liverpool furiosos com a direção do clube por terem perdido este alvo prioritário!",
    summary_en: "IRONY OF FATE! Xabi Alonso, Liverpool fans' idol, is about to become Chelsea's new manager, according to LiveScore and various English sources. Liverpool, who were in the race to sign the former Spanish midfielder, 'slipped up in the race' and now see their hero go to their London rival. Alonso, who made history at Bayer Leverkusen by winning the Bundesliga unbeaten, is seen as the perfect manager to rebuild Chelsea after a disappointing season. His aggressive, possession-based playing philosophy is the opposite of what Chelsea have shown this season. Confirmation could come this week, leaving Liverpool fans furious with the club's board for losing this priority target!",
    tag: "HOT",
    source: "@LiveScore",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "14.8M",
  },
  {
    id: "t6",
    title: "⚡ CARRICK CONFIRMADO NO MAN UTD + GYÖKERES COMO ALVO N.º1! Fabrizio Romano: 'Here we go' para o treinador permanente — Sporting em alerta máximo!",
    title_en: "⚡ CARRICK CONFIRMED AT MAN UTD + GYÖKERES AS TARGET N.º1! Fabrizio Romano: 'Here we go' for permanent manager — Sporting on maximum alert!",
    summary: "DUPLA BOMBA EM OLD TRAFFORD! Michael Carrick foi confirmado como treinador permanente do Manchester United por Fabrizio Romano com o seu famoso 'Here we go'. O ex-médio dos Red Devils assinou um contrato de 2 anos e já definiu Viktor Gyökeres do Sporting CP como o alvo número 1 para o ataque. O Sporting está em alerta máximo, sabendo que o United pode ativar a cláusula de rescisão de €80 milhões do avançado sueco. Gyökeres, que marcou 43 golos esta temporada, é o melhor avançado disponível no mercado europeu. A direção do Sporting já começou a identificar possíveis substitutos, com nomes como Jonathan David e Serhou Guirassy a serem estudados. Será que o 'Gyökeres para o United' vai mesmo acontecer no verão de 2026?",
    summary_en: "DOUBLE BOMB AT OLD TRAFFORD! Michael Carrick has been confirmed as Manchester United's permanent manager by Fabrizio Romano with his famous 'Here we go'. The former Red Devils midfielder signed a 2-year contract and has already identified Viktor Gyökeres from Sporting CP as the number one target for attack. Sporting are on maximum alert, knowing United can activate the Swedish striker's €80 million release clause. Gyökeres, who scored 43 goals this season, is the best striker available on the European market. Sporting's board has already started identifying possible replacements, with names like Jonathan David and Serhou Guirassy being studied. Will 'Gyökeres to United' actually happen in the summer of 2026?",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "17/05/2026",
    engagement: "13.2M",
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
