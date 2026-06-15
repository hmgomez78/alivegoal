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

// Notícias curadas — atualizadas 15/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🔥 TRANSFER: Cucurella assina pelo Real Madrid por 60M€! Mourinho pediu-o pessoalmente — Chelsea aceita!",
    title_en: "🔥 TRANSFER: Cucurella signs for Real Madrid for €60M! Mourinho requested him personally — Chelsea agrees!",
    summary: "BOMBA DE TRANSFERÊNCIA CONFIRMADA! Fabrizio Romano confirmou que Marc Cucurella vai assinar pelo Real Madrid por um pacote total de 60 milhões de euros, num negócio que ficou concluído durante o Mundial 2026. O lateral esquerdo espanhol, que representou a Espanha no torneio, foi um pedido pessoal de José Mourinho, o novo treinador do Real Madrid. O Chelsea, que pagou 62 milhões de euros pelo jogador em 2022, aceitou deixá-lo sair após quatro temporadas. Cucurella, de 26 anos, vai assinar um contrato de 6 anos com o clube merengue. A Espanha, que enfrenta Cabo Verde hoje no Grupo H, pode ter o seu lateral esquerdo a celebrar uma dupla vitória — no campo e fora dele. Esta é a quinta contratação do Real Madrid neste verão, confirmando a ambição do clube para a próxima temporada.",
    summary_en: "CONFIRMED TRANSFER BOMB! Fabrizio Romano confirmed that Marc Cucurella will sign for Real Madrid for a total package of €60 million, in a deal concluded during World Cup 2026. The Spanish left-back, who represented Spain in the tournament, was a personal request from José Mourinho, Real Madrid's new manager. Chelsea, who paid €62 million for the player in 2022, agreed to let him leave after four seasons. Cucurella, 26, will sign a 6-year contract with the Merengues. Spain, who face Cape Verde today in Group H, may have their left-back celebrating a double victory — on and off the pitch. This is Real Madrid's fifth signing of the summer, confirming the club's ambition for next season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "52.4M",
  },
  {
    id: "t2",
    title: "🚨 SCANDAL: Árbitro somali banido dos EUA! Omar Artan impedido de entrar no país — FIFA em escândalo diplomático!",
    title_en: "🚨 SCANDAL: Somali referee banned from USA! Omar Artan denied entry — FIFA in diplomatic scandal!",
    summary: "ESCÂNDALO DIPLOMÁTICO NO MUNDIAL 2026! Omar Artan, considerado o melhor árbitro de África em 2025, foi impedido de entrar nos Estados Unidos para apitar jogos do Mundial 2026. A alfândega americana recusou a sua entrada no aeroporto de Miami Internacional, citando 'preocupações de segurança', apesar de o árbitro somali ter um visto válido emitido pela Embaixada da Somália no Quénia. A FIFA emitiu um comunicado a dizer que 'não interfere nos processos de imigração dos países anfitriões', mas confirmou que Artan receberá o pagamento total do torneio apesar de não apitar nenhum jogo. O presidente da UEFA, Aleksander Ceferin, nomeou Artan para a Supertaça Europeia de agosto em sinal de solidariedade. O incidente gerou uma onda de indignação internacional, com acusações de racismo e discriminação. Artan, de 34 anos, recebeu uma receção de herói quando regressou à Somália.",
    summary_en: "DIPLOMATIC SCANDAL AT WORLD CUP 2026! Omar Artan, considered Africa's best referee in 2025, was denied entry to the United States to officiate World Cup 2026 matches. US Customs refused his entry at Miami International Airport, citing 'security concerns', despite the Somali referee having a valid visa issued by the Somali Embassy in Kenya. FIFA issued a statement saying it 'does not interfere in host countries' immigration processes', but confirmed Artan will receive full tournament payment despite not officiating any games. UEFA president Aleksander Ceferin appointed Artan to the August European Super Cup in solidarity. The incident sparked a wave of international outrage, with accusations of racism and discrimination. Artan, 34, received a hero's welcome when he returned to Somalia.",
    tag: "SCANDAL",
    source: "@AP_Sports",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "44.7M",
  },
  {
    id: "t3",
    title: "💥 BREAKING: Alemanha 7-1 Curaçao! Havertz marca 2 golos — A maior goleada do Mundial 2026 até agora!",
    title_en: "💥 BREAKING: Germany 7-1 Curaçao! Havertz scores 2 goals — The biggest World Cup 2026 thrashing so far!",
    summary: "RESULTADO HISTÓRICO NO MUNDIAL 2026! A Alemanha goleou Curaçao por 7-1 no NRG Stadium de Houston, num resultado que confirmou o regresso dos Panzer ao topo do futebol mundial. Kai Havertz foi o grande destaque com dois golos, incluindo um chip delicioso para o 7-1. Florian Wirtz, do Liverpool, brilhou na sua estreia num Mundial com uma assistência e um golo. O único golo de Curaçao foi marcado por Livano Comenencia, que ficará para sempre na história como o primeiro golo da pequena nação num Mundial. Dick Advocaat, de 78 anos, tornou-se o treinador mais velho da história do torneio. A Alemanha, que falhou a fase de grupos em 2018 e 2022, envia uma mensagem clara ao mundo: os Panzer voltaram. O resultado coloca a Alemanha no topo do Grupo E com 3 pontos e diferença de golos de +6.",
    summary_en: "HISTORIC RESULT AT WORLD CUP 2026! Germany thrashed Curaçao 7-1 at NRG Stadium in Houston, in a result that confirmed the Panzer's return to the top of world football. Kai Havertz was the standout with two goals, including a delicious chip for the 7-1. Liverpool's Florian Wirtz shone on his World Cup debut with an assist and a goal. Curaçao's only goal was scored by Livano Comenencia, who will forever be in history as the small nation's first World Cup goal. Dick Advocaat, 78, became the oldest manager in tournament history. Germany, who failed to get out of the group stage in 2018 and 2022, send a clear message to the world: the Panzer are back. The result puts Germany top of Group E with 3 points and a goal difference of +6.",
    tag: "BREAKING",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "38.2M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: FIFA cria pausas de 3 minutos para publicidade — Klopp explode: 'Futebol tomado como refém!'",
    title_en: "🚨 SCANDAL: FIFA creates 3-minute advertising breaks — Klopp explodes: 'Football taken hostage!'",
    summary: "O NOVO ESCÂNDALO DO MUNDIAL 2026! A FIFA introduziu pausas obrigatórias de hidratação de 3 minutos em cada jogo — uma em cada parte — supostamente para proteger os jogadores do calor dos EUA. Mas a realidade é outra: a Fox TV aproveitou as pausas para transmitir blocos publicitários, chegando a atrasar o regresso à transmissão ao vivo e fazendo os espectadores americanos perderem ação em campo. A imprensa britânica apelidou o escândalo de 'Watergate'. Segundo o analista Michael Johnson, o Mundial terá 208 dessas pausas, gerando 624 minutos de publicidade extra, com slots a custar entre 7 e 9 milhões de dólares cada. Jürgen Klopp foi o mais crítico: 'O futebol foi tomado como refém por pessoas em escritórios com ar condicionado. O jogo devia fluir como um rio, e estamos a construir barragens para deixar a publicidade fluir.' Pochettino, Deschamps e Roberto Martínez também criticaram a medida.",
    summary_en: "THE NEW WORLD CUP 2026 SCANDAL! FIFA introduced mandatory 3-minute hydration breaks in each match — one per half — supposedly to protect players from the US heat. But the reality is different: Fox TV used the breaks to air advertising blocks, even delaying the return to live broadcast and making American viewers miss on-field action. The British press dubbed the scandal 'Watergate'. According to analyst Michael Johnson, the World Cup will have 208 such breaks, generating 624 minutes of extra advertising, with slots costing between $7 and $9 million each. Jürgen Klopp was the harshest critic: 'Football has been taken hostage by people in air-conditioned offices. The game should flow like a river, and we are building dams to let the ads flow through.' Pochettino, Deschamps and Roberto Martínez also criticised the measure.",
    tag: "SCANDAL",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "31.6M",
  },
  {
    id: "t5",
    title: "⚽ HOT: Espanha vs Cabo Verde HOJE — Yamal e Pedri lideram os campeões do mundo! Grupo H em destaque!",
    title_en: "⚽ HOT: Spain vs Cape Verde TODAY — Yamal and Pedri lead the world champions! Group H in focus!",
    summary: "O JOGO DO DIA NO MUNDIAL 2026! A Espanha de Luis de la Fuente, campeã do mundo e da Europa, estreia-se no torneio contra Cabo Verde no Mercedes-Benz Stadium de Atlanta às 17h00 de Lisboa. Lamine Yamal, de apenas 18 anos, é a grande estrela da Espanha e chega ao torneio após uma época extraordinária no Barcelona. Pedri, Rodri e Morata completam um meio-campo de luxo. Cabo Verde, que se qualificou de forma surpreendente, tem Ryan Mendes como principal arma ofensiva. A Espanha é favorita esmagadora (-500) mas Cabo Verde já mostrou que pode surpreender ao eliminar Marrocos na qualificação africana. O jogo promete ser dominado pela Espanha mas Cabo Verde pode tentar explorar os contra-ataques. Marc Cucurella, que acabou de assinar pelo Real Madrid por 60 milhões, vai jogar o seu provavelmente último jogo como jogador do Chelsea.",
    summary_en: "THE MATCH OF THE DAY AT WORLD CUP 2026! Luis de la Fuente's Spain, world and European champions, make their tournament debut against Cape Verde at Mercedes-Benz Stadium in Atlanta at 17:00 Lisbon time. Lamine Yamal, just 18 years old, is Spain's star player and arrives at the tournament after an extraordinary season at Barcelona. Pedri, Rodri and Morata complete a luxury midfield. Cape Verde, who qualified surprisingly, have Ryan Mendes as their main attacking weapon. Spain are overwhelming favourites (-500) but Cape Verde have already shown they can surprise by eliminating Morocco in African qualifying. The match promises to be dominated by Spain but Cape Verde may try to exploit counter-attacks. Marc Cucurella, who just signed for Real Madrid for €60 million, will play his probably last match as a Chelsea player.",
    tag: "HOT",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "27.3M",
  },
  {
    id: "t6",
    title: "🚨 TRANSFER: Bayern Munique fecha Rashford! Man United pede 60M€ pelo avançado inglês em grande forma no Mundial!",
    title_en: "🚨 TRANSFER: Bayern Munich close in on Rashford! Man United demand €60M for English forward in great World Cup form!",
    summary: "NEGÓCIO QUENTE NO MERCADO! O Bayern Munique está cada vez mais confiante de que vai contratar Marcus Rashford, o avançado do Manchester United que está a brilhar no Mundial 2026 com a Inglaterra. Segundo a ESPN, o Bayern está disposto a pagar os 60 milhões de euros pedidos pelo United pelo jogador de 28 anos. Rashford, que passou a última temporada cedido ao Barcelona, regressou ao United mas o seu futuro em Old Trafford parece incerto. O jogador tem estado em grande forma no Mundial, com 2 golos em 2 jogos pela Inglaterra. O Bayern, que perdeu Leroy Sané e Thomas Müller no final da época, precisa de reforçar o ataque. A AS Roma também mostrou interesse no jogador americano Folarin Balogun, que está a impressionar no torneio. Uma das novelas de transferências mais quentes do verão de 2026.",
    summary_en: "HOT DEAL IN THE MARKET! Bayern Munich are increasingly confident they will sign Marcus Rashford, the Manchester United forward who is shining at World Cup 2026 with England. According to ESPN, Bayern are willing to pay the €60 million United are asking for the 28-year-old. Rashford, who spent last season on loan at Barcelona, returned to United but his future at Old Trafford looks uncertain. The player has been in great form at the World Cup, with 2 goals in 2 games for England. Bayern, who lost Leroy Sané and Thomas Müller at the end of the season, need to strengthen their attack. AS Roma also showed interest in American player Folarin Balogun, who is impressing at the tournament. One of the hottest transfer sagas of the summer of 2026.",
    tag: "TRANSFER",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "15/06/2026",
    engagement: "23.8M",
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
