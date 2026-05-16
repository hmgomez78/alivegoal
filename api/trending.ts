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

// Notícias curadas — atualizadas 16/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 MOURINHO REGRESSA AO REAL MADRID! Acordo final a horas de ser anunciado — Benfica já procura substituto!",
    title_en: "🚨 MOURINHO RETURNS TO REAL MADRID! Final agreement hours away from announcement — Benfica already seeking replacement!",
    summary: "O IMPOSSÍVEL TORNOU-SE POSSÍVEL! José Mourinho está a horas de ser confirmado como novo treinador do Real Madrid, segundo Fabrizio Romano e o Guardian. O 'Special One' recusou ver a proposta de renovação do Benfica e a cláusula de rescisão de €7 milhões será ativada. Mourinho terá exigido controlo total sobre as transferências e um contrato de 3 anos. O Bernabéu, que o vaiou na sua primeira passagem, prepara-se para recebê-lo de volta. Florentino Pérez vê nele o único capaz de recuperar o Real Madrid após uma temporada de pesadelo com Mbappé e Vinicius a serem vaiados pelos próprios adeptos!",
    summary_en: "THE IMPOSSIBLE HAS BECOME POSSIBLE! José Mourinho is hours away from being confirmed as Real Madrid's new manager, according to Fabrizio Romano and the Guardian. The 'Special One' refused to look at Benfica's renewal offer and the €7 million release clause will be activated. Mourinho reportedly demanded full control over transfers and a 3-year contract. The Bernabeu, which once booed him, prepares to welcome him back. Florentino Pérez sees him as the only one capable of rescuing Real Madrid after a nightmare season with Mbappé and Vinicius being booed by their own fans!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "19.4M",
  },
  {
    id: "t2",
    title: "💥 FINAL DA FA CUP HOJE! Manchester City vs Chelsea em Wembley — Guardiola busca o título n.º 17 e Haaland quer ser herói!",
    title_en: "💥 FA CUP FINAL TODAY! Manchester City vs Chelsea at Wembley — Guardiola chases title No. 17 and Haaland wants to be the hero!",
    summary: "O DIA MAIS ESPERADO DO ANO! Este sábado às 15h00 BST, Wembley recebe a Final da FA Cup entre Manchester City e Chelsea, o jogo mais aguardado da temporada inglesa. Pep Guardiola, que pode tornar-se o treinador com mais títulos na história do futebol inglês, enfrenta um Chelsea revitalizado com João Pedro em grande forma. Erling Haaland quer ser o herói da tarde e as odds favorecem o City (1.75), mas o Chelsea tem o fator surpresa. João Pedro, que pode ser vendido ao Barcelona no verão, quer despedir-se em grande estilo. Árbitro: Darren England. Transmissão: BBC One e ITV!",
    summary_en: "THE MOST ANTICIPATED DAY OF THE YEAR! This Saturday at 3pm BST, Wembley hosts the FA Cup Final between Manchester City and Chelsea, the most awaited match of the English season. Pep Guardiola, who could become the manager with the most titles in English football history, faces a revitalised Chelsea with João Pedro in brilliant form. Erling Haaland wants to be the afternoon hero and odds favour City (1.75), but Chelsea have the surprise factor. João Pedro, who may be sold to Barcelona in the summer, wants to sign off in style. Referee: Darren England. Broadcast: BBC One and ITV!",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "22.1M",
  },
  {
    id: "t3",
    title: "🏆 ASTON VILLA 4-2 LIVERPOOL — Ollie Watkins faz hat-trick e Villa garante Champions League! Liverpool em colapso total!",
    title_en: "🏆 ASTON VILLA 4-2 LIVERPOOL — Ollie Watkins hat-trick and Villa secure Champions League! Liverpool in total collapse!",
    summary: "NOITE ÉPICA EM VILLA PARK! O Aston Villa de Unai Emery goleou o Liverpool por 4-2 na sexta-feira e garantiu o seu lugar na UEFA Champions League 2026/27. Ollie Watkins foi o grande herói com dois golos, enquanto Morgan Rogers e John McGinn completaram a goleada. O Liverpool, que perdeu 19 jogos esta temporada — o pior registo do século — viu as suas esperanças no Top 4 ficarem em risco crítico. Arne Slot enfrenta uma crise de confiança total e o futuro do treinador holandês em Anfield está agora em dúvida. Unai Emery celebrou com os adeptos num Villa Park em delírio!",
    summary_en: "EPIC NIGHT AT VILLA PARK! Unai Emery's Aston Villa thrashed Liverpool 4-2 on Friday and secured their place in the 2026/27 UEFA Champions League. Ollie Watkins was the hero with two goals, while Morgan Rogers and John McGinn completed the rout. Liverpool, who have lost 19 games this season — their worst record this century — saw their Top 4 hopes in critical danger. Arne Slot faces a total crisis of confidence and the Dutch manager's future at Anfield is now in doubt. Unai Emery celebrated with fans in a delirious Villa Park!",
    tag: "BREAKING",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "17.8M",
  },
  {
    id: "t4",
    title: "🔥 CARRICK CONFIRMADO NO MANCHESTER UNITED! Fabrizio Romano confirma: contrato de 2 anos assinado — adeus Amorim?",
    title_en: "🔥 CARRICK CONFIRMED AT MANCHESTER UNITED! Fabrizio Romano confirms: 2-year contract signed — goodbye Amorim?",
    summary: "REVOLUÇÃO EM OLD TRAFFORD! Michael Carrick foi confirmado como treinador permanente do Manchester United, segundo Fabrizio Romano. O ex-médio dos Red Devils, que assumiu o cargo interinamente após a saída de Ruben Amorim, assinou um contrato de 2 anos. A nomeação surpreendeu o mundo do futebol, com muitos a esperarem um nome de maior renome internacional. Carrick terá convencido os proprietários com a sua filosofia de jogo e o seu conhecimento profundo do clube. Viktor Gyökeres continua a ser o alvo número 1 para o ataque, com Carrick a pressionar pelo avançado do Sporting CP!",
    summary_en: "REVOLUTION AT OLD TRAFFORD! Michael Carrick has been confirmed as Manchester United's permanent manager, according to Fabrizio Romano. The former Red Devils midfielder, who took charge on an interim basis after Ruben Amorim's departure, signed a 2-year contract. The appointment surprised the football world, with many expecting a bigger international name. Carrick reportedly convinced the owners with his playing philosophy and deep knowledge of the club. Viktor Gyökeres remains the number one target for attack, with Carrick pushing for the Sporting CP striker!",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "14.6M",
  },
  {
    id: "t5",
    title: "💣 ESCÂNDALO INTER MILAN! Relatório secreto revela €300M em receitas falsas — UEFA pode banir os nerazzurri das competições europeias!",
    title_en: "💣 INTER MILAN SCANDAL! Secret report reveals €300M in fake revenue — UEFA could ban nerazzurri from European competitions!",
    summary: "NOVO CALCIOPOLI?! Um relatório confidencial vazado revela que o Inter Milan terá fabricado quase €300 milhões em receitas falsas de patrocinadores asiáticos entre 2016 e 2019 para contornar as regras do Fair Play Financeiro da UEFA. O escândalo, que está a sacudir o futebol italiano, pode resultar num banimento das competições europeias e numa dedução de pontos na Serie A. A UEFA abriu uma investigação formal e o presidente Steven Zhang está no centro da polémica. O Inter, atual detentor do Scudetto, pode ver o título revogado se as acusações forem provadas!",
    summary_en: "NEW CALCIOPOLI?! A leaked confidential report reveals that Inter Milan allegedly fabricated nearly €300 million in fake revenue from Asian sponsors between 2016 and 2019 to circumvent UEFA's Financial Fair Play rules. The scandal, which is shaking Italian football, could result in a ban from European competitions and a points deduction in Serie A. UEFA has opened a formal investigation and president Steven Zhang is at the centre of the controversy. Inter, current Scudetto holders, could see the title revoked if the allegations are proven!",
    tag: "SCANDAL",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "15.3M",
  },
  {
    id: "t6",
    title: "🌟 RECORDE HISTÓRICO! Sporting confirma Zalazar do Sp. Braga — transferência mais cara entre clubes portugueses de sempre!",
    title_en: "🌟 HISTORIC RECORD! Sporting confirm Zalazar from Sp. Braga — most expensive transfer between Portuguese clubs ever!",
    summary: "HISTÓRIA NO FUTEBOL PORTUGUÊS! O Sporting CP confirmou oficialmente a contratação do médio internacional uruguaio Nicolás Zalazar ao Sporting de Braga, num negócio que estabelece um novo recorde de transferências entre clubes portugueses. O jogador assinou um contrato de 5 anos até junho de 2031, com uma cláusula de rescisão de €80 milhões. Zalazar, de 24 anos, foi uma das revelações da Liga Portugal esta temporada e é visto como o substituto ideal para os médios que saíram de Alvalade. O Sporting prepara-se ainda para contratar mais dois jogadores por €20 milhões cada para reforçar o plantel para a Champions League!",
    summary_en: "HISTORY IN PORTUGUESE FOOTBALL! Sporting CP officially confirmed the signing of Uruguayan international midfielder Nicolás Zalazar from Sporting de Braga, in a deal that sets a new transfer record between Portuguese clubs. The player signed a 5-year contract until June 2031, with a release clause of €80 million. Zalazar, 24, was one of the revelations of the Liga Portugal this season and is seen as the ideal replacement for midfielders who left Alvalade. Sporting is also preparing to sign two more players for €20 million each to strengthen the squad for the Champions League!",
    tag: "TRANSFER",
    source: "@Publico",
    url: "https://x.com/alivegoal",
    time: "16/05/2026",
    engagement: "10.2M",
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
