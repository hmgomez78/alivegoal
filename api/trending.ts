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

// Notícias curadas — atualizadas 01/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BOMBA: José Mourinho assina pelo Real Madrid até 2029! O 'Special One' regressa ao Santiago Bernabéu",
    title_en: "🚨 BOMBSHELL: Jose Mourinho signs for Real Madrid until 2029! The 'Special One' returns to the Santiago Bernabéu",
    summary: "O REGRESSO DO REI! José Mourinho chegou a um acordo verbal total para regressar ao Real Madrid. O treinador português, que já orientou os merengues entre 2010 e 2013, assinou um contrato até junho de 2029. Florentino Pérez escolheu pessoalmente Mourinho para liderar a nova era do clube. O anúncio oficial será feito após as eleições presidenciais de 7 de junho. Uma notícia que está a abalar o futebol europeu!",
    summary_en: "THE RETURN OF THE KING! Jose Mourinho has reached a full verbal agreement to return to Real Madrid. The Portuguese manager, who previously led the Merengues between 2010 and 2013, has signed a contract until June 2029. Florentino Perez personally chose Mourinho to lead the club's new era. The official announcement will be made after the presidential elections on June 7. A piece of news that is shaking European football!",
    tag: "BREAKING",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "1.5B",
  },
  {
    id: "t2",
    title: "⚖️ ESCÂNDALO: FIFA investigada por preços abusivos nos bilhetes do Mundial 2026! Nova Iorque e Nova Jérsia emitem intimações",
    title_en: "⚖️ SCANDAL: FIFA investigated over abusive World Cup 2026 ticket prices! New York and New Jersey issue subpoenas",
    summary: "A FIFA NA MIRA DA JUSTIÇA! As Procuradoras-Gerais de Nova Iorque e Nova Jérsia emitiram intimações à FIFA devido aos preços exorbitantes e práticas enganosas na venda de bilhetes para o Mundial 2026. A investigação foca-se numa alegada 'escassez falsa' e num esquema de 'isco e troca', onde adeptos pagaram fortunas (até 10.990 dólares) por lugares de categoria 1 e foram realocados para zonas inferiores. O Mundial mais caro da história pode acabar nos tribunais!",
    summary_en: "FIFA IN THE CROSSHAIRS OF JUSTICE! The Attorneys General of New York and New Jersey have issued subpoenas to FIFA over exorbitant prices and deceptive practices in the sale of World Cup 2026 tickets. The investigation focuses on alleged 'fake scarcity' and a 'bait-and-switch' scheme, where fans paid fortunes (up to $10,990) for Category 1 seats and were relocated to inferior zones. The most expensive World Cup in history could end up in court!",
    tag: "SCANDAL",
    source: "@NYAG",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "850.2M",
  },
  {
    id: "t3",
    title: "⚡ FIM DE CICLO: Rafael Leão confirma saída do AC Milan! 'Já dei tudo o que tinha', diz o português",
    title_en: "⚡ END OF AN ERA: Rafael Leao confirms AC Milan exit! 'I gave everything I had', says the Portuguese",
    summary: "LEÃO DE SAÍDA! Rafael Leão chocou os adeptos do AC Milan ao anunciar que considera o seu tempo no clube terminado. 'Fiz o meu melhor pelo Milan, mas é hora de tentar outro desafio', afirmou o internacional português. Apesar de ter contrato até 2028 e uma cláusula de 175 milhões de euros, o Milan poderá aceitar vendê-lo por um valor inferior. O Manchester United surge como um dos principais interessados no extremo de 26 anos.",
    summary_en: "LEAO ON THE WAY OUT! Rafael Leao shocked AC Milan fans by announcing he considers his time at the club over. 'I did my best for Milan, but it's time to try another challenge', stated the Portuguese international. Despite having a contract until 2028 and a €175 million release clause, Milan might accept selling him for a lower fee. Manchester United emerges as one of the main suitors for the 26-year-old winger.",
    tag: "TRANSFER",
    source: "@SempreMilan",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "620.4M",
  },
  {
    id: "t4",
    title: "💣 CAOS: Seleção da África do Sul retida devido a vistos! Viagem para o Mundial 2026 adiada",
    title_en: "💣 CHAOS: South Africa national team grounded due to visas! Trip to World Cup 2026 delayed",
    summary: "DESASTRE LOGÍSTICO! A partida da seleção da África do Sul (Bafana Bafana) para o Mundial 2026 no México foi adiada devido a uma crise de vistos de última hora. Vários jogadores e membros da equipa técnica não receberam os vistos necessários a tempo, forçando o cancelamento do voo. A equipa de Hugo Broos tinha um amigável agendado com a Jamaica antes da estreia no Mundial contra o anfitrião México. Uma vergonha administrativa a poucos dias do torneio!",
    summary_en: "LOGISTICAL DISASTER! The departure of the South African national team (Bafana Bafana) for the 2026 World Cup in Mexico has been delayed due to a last-minute visa crisis. Several players and staff members did not receive the necessary visas in time, forcing the flight cancellation. Hugo Broos' team had a friendly scheduled with Jamaica before their World Cup debut against hosts Mexico. An administrative embarrassment just days before the tournament!",
    tag: "HOT",
    source: "@SABCNews",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "410.7M",
  },
  {
    id: "t5",
    title: "🔥 TRANSFERÊNCIA: PSG ataca Diogo Costa! Franceses preparam oferta milionária pelo guarda-redes do FC Porto",
    title_en: "🔥 TRANSFER: PSG targets Diogo Costa! The French prepare a millionaire offer for the FC Porto goalkeeper",
    summary: "O PSG QUER O NÚMERO 1 DE PORTUGAL! O Paris Saint-Germain está a preparar uma investida forte por Diogo Costa. Segundo o L'Équipe, o guarda-redes do FC Porto é o principal alvo dos parisienses para a baliza na próxima temporada. Com uma cláusula de rescisão de 60 milhões de euros, o internacional português de 26 anos poderá ser a próxima grande venda dos dragões. O PSG promete um mercado muito agitado após a final da Champions!",
    summary_en: "PSG WANTS PORTUGAL'S NUMBER 1! Paris Saint-Germain is preparing a strong move for Diogo Costa. According to L'Équipe, the FC Porto goalkeeper is the Parisians' main target for the goal next season. With a €60 million release clause, the 26-year-old Portuguese international could be the Dragons' next big sale. PSG promises a very busy transfer market after the Champions League final!",
    tag: "TRANSFER",
    source: "@lequipe",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "385.1M",
  },
  {
    id: "t6",
    title: "🚨 OFICIAL: Ibrahima Konaté deixa o Liverpool! Defesa francês sai a custo zero após cinco épocas",
    title_en: "🚨 OFFICIAL: Ibrahima Konate leaves Liverpool! French defender leaves on a free transfer after five seasons",
    summary: "FIM DE UMA ERA EM ANFIELD! O Liverpool confirmou oficialmente a saída de Ibrahima Konaté no final do seu contrato, em junho. O defesa-central francês deixa os 'Reds' após 183 jogos e cinco temporadas, não tendo chegado a acordo para a renovação. Konaté confessou estar 'profundamente triste' com a saída, levando consigo 'memórias para a vida'. Com a Arábia Saudita à espreita, o Liverpool perde uma peça fundamental a custo zero.",
    summary_en: "END OF AN ERA AT ANFIELD! Liverpool have officially confirmed the departure of Ibrahima Konate at the end of his contract in June. The French centre-back leaves the Reds after 183 games and five seasons, having failed to agree on a renewal. Konate confessed to being 'deeply saddened' by the exit, taking with him 'lifelong memories'. With Saudi Arabia lurking, Liverpool lose a key player on a free transfer.",
    tag: "BREAKING",
    source: "@LFC",
    url: "https://x.com/alivegoal",
    time: "01/06/2026",
    engagement: "320.9M",
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
