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

// Notícias curadas — atualizadas 08/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 CHOQUE: Eriksen colapsa em campo durante Dinamarca vs Ucrânia — jogo abandonado!",
    title_en: "🚨 SHOCK: Eriksen collapses on pitch during Denmark vs Ukraine — match abandoned!",
    summary: "TERROR EM COPENHAGA! Christian Eriksen voltou a colapsar em campo durante o amistoso Dinamarca vs Ucrânia, apenas 5 anos depois do episódio que chocou o mundo no Euro 2020. O médio do Manchester United agarrou ao peito e caiu no relvado aos 65 minutos, forçando o árbitro a interromper imediatamente o jogo. Os serviços médicos acorreram ao local e Eriksen foi estabilizado e saiu do campo a pé — consciente e a falar. O jogo foi definitivamente abandonado. A UEFA e a FIFA emitiram comunicados de apoio. O mundo do futebol está em estado de choque. Com o Mundial 2026 a começar a 11 de junho, a Dinamarca aguarda notícias sobre o estado de saúde do seu capitão.",
    summary_en: "TERROR IN COPENHAGEN! Christian Eriksen collapsed on the pitch again during the Denmark vs Ukraine friendly, just 5 years after the incident that shocked the world at Euro 2020. The Manchester United midfielder clutched his chest and fell to the ground in the 65th minute, forcing the referee to immediately stop the game. Medical staff rushed to the scene and Eriksen was stabilised and walked off the pitch — conscious and speaking. The match was definitively abandoned. UEFA and FIFA issued statements of support. The football world is in shock. With the 2026 World Cup starting on June 11, Denmark awaits news on the health of their captain.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "12.4M",
  },
  {
    id: "t2",
    title: "🔥 ESCÂNDALO: FIFA sob investigação nos EUA por esquema de bilhetes do Mundial 2026!",
    title_en: "🔥 SCANDAL: FIFA under US investigation for 2026 World Cup ticket scheme!",
    summary: "BOMBA ANTES DO APITO INICIAL! A FIFA está a ser investigada pelas autoridades norte-americanas por um suposto esquema de venda ilegal de bilhetes para o Mundial 2026. Segundo o New York Times, promotores federais estão a investigar a revenda de bilhetes a preços inflacionados através de intermediários ligados a dirigentes da FIFA. Com o torneio a começar a 11 de junho, o escândalo chega num momento péssimo para a organização. Milhares de adeptos queixam-se de não conseguir bilhetes oficiais enquanto os mesmos aparecem em sites de revenda por valores 10 vezes superiores. Gianni Infantino recusou comentar. O espectro do escândalo de 2015 paira sobre a FIFA.",
    summary_en: "BOMB BEFORE KICK-OFF! FIFA is being investigated by US authorities for an alleged illegal ticket scheme for the 2026 World Cup. According to the New York Times, federal prosecutors are investigating the resale of tickets at inflated prices through intermediaries linked to FIFA officials. With the tournament starting on June 11, the scandal comes at the worst possible time for the organisation. Thousands of fans complain of being unable to get official tickets while the same tickets appear on resale sites at 10 times the price. Gianni Infantino refused to comment. The spectre of the 2015 scandal looms over FIFA.",
    tag: "SCANDAL",
    source: "@NYTimes",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "8.7M",
  },
  {
    id: "t3",
    title: "💣 TRANSFER: Chelsea pronto para gastar €200M+ na janela de Xabi Alonso — Leão e Olise no topo da lista!",
    title_en: "💣 TRANSFER: Chelsea ready to spend €200M+ in Xabi Alonso's window — Leão and Olise top the list!",
    summary: "REVOLUÇÃO EM STAMFORD BRIDGE! Xabi Alonso assumiu o comando do Chelsea e a direção do clube está pronta para apoiá-lo com um orçamento de transferências superior a €200 milhões. Segundo o The Athletic, Rafael Leão do AC Milan é o alvo número um — o Chelsea já fez contactos formais com o agente do jogador e está disposto a pagar €80M. Michael Olise do Bayern Munich é a segunda opção, mas o clube alemão pede €150M. Além disso, o Chelsea quer um médio defensivo de topo e um central. Após uma época dececionante, Todd Boehly deu luz verde total a Alonso para reconstruir o plantel. A Premier League vai ficar de boca aberta.",
    summary_en: "REVOLUTION AT STAMFORD BRIDGE! Xabi Alonso has taken charge of Chelsea and the club's board is ready to back him with a transfer budget exceeding €200 million. According to The Athletic, AC Milan's Rafael Leão is the number one target — Chelsea have already made formal contact with the player's agent and are willing to pay €80M. Bayern Munich's Michael Olise is the second option, but the German club are asking €150M. Additionally, Chelsea want a top defensive midfielder and a centre-back. After a disappointing season, Todd Boehly has given Alonso full green light to rebuild the squad. The Premier League will be left speechless.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "7.9M",
  },
  {
    id: "t4",
    title: "⚡ BREAKING: Trump ameaça banir seleção do Irão do Mundial 2026 — FIFA em pânico!",
    title_en: "⚡ BREAKING: Trump threatens to ban Iran national team from 2026 World Cup — FIFA in panic!",
    summary: "CRISE DIPLOMÁTICA NO FUTEBOL! O Presidente dos Estados Unidos, Donald Trump, ameaçou impedir a seleção iraniana de participar no Mundial 2026 que decorre em solo norte-americano. Vários membros do staff técnico e dirigentes da federação iraniana já foram barrados de entrar nos EUA, forçando a equipa a instalar-se em Tijuana, México. A FIFA está em pânico: o regulamento do torneio garante a participação de todas as seleções qualificadas, mas os EUA insistem que têm soberania sobre quem entra no país. O Irão ameaça levar o caso ao Tribunal Arbitral do Desporto. É a maior crise política na história recente do futebol mundial.",
    summary_en: "DIPLOMATIC CRISIS IN FOOTBALL! US President Donald Trump has threatened to prevent the Iranian national team from participating in the 2026 World Cup being held on American soil. Several members of the Iranian technical staff and federation officials have already been barred from entering the US, forcing the team to set up base in Tijuana, Mexico. FIFA is in panic: the tournament regulations guarantee the participation of all qualified teams, but the US insists it has sovereignty over who enters the country. Iran threatens to take the case to the Court of Arbitration for Sport. It is the biggest political crisis in recent world football history.",
    tag: "BREAKING",
    source: "@AP_Sports",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "9.3M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Lamine Yamal promete deixar crescer barba se Espanha ganhar o Mundial — a aposta viral!",
    title_en: "🔥 HOT: Lamine Yamal promises to grow a beard if Spain win the World Cup — the viral bet!",
    summary: "A PROMESSA QUE ESTÁ A DOMINAR A INTERNET! Lamine Yamal, a estrela de 18 anos do Barcelona e da seleção espanhola, fez uma promessa hilariante que se tornou viral em todo o mundo: se a Espanha ganhar o Mundial 2026, o jovem prodígio vai deixar crescer barba e bigode completos durante três semanas. O problema? Yamal ainda mal consegue fazer crescer barba! O vídeo da promessa já tem mais de 50 milhões de visualizações nas redes sociais. A Espanha é uma das grandes favoritas ao título e os adeptos espanhóis estão a fazer campanha para ver o seu ídolo com barba. Yamal respondeu: 'Não tenho medo, a Espanha vai ganhar!'",
    summary_en: "THE PROMISE DOMINATING THE INTERNET! Lamine Yamal, the 18-year-old star of Barcelona and the Spanish national team, made a hilarious promise that went viral worldwide: if Spain win the 2026 World Cup, the young prodigy will grow a full beard and moustache for three weeks. The problem? Yamal can barely grow a beard! The video of the promise already has over 50 million views on social media. Spain are one of the main title favourites and Spanish fans are campaigning to see their idol with a beard. Yamal responded: 'I'm not afraid, Spain will win!'",
    tag: "HOT",
    source: "@marca",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "6.1M",
  },
  {
    id: "t6",
    title: "💥 TRANSFER: Man United confirma Ederson + avança para Mateus Fernandes — era Carrick arranca a sério!",
    title_en: "💥 TRANSFER: Man United confirm Ederson + advance for Mateus Fernandes — Carrick era starts for real!",
    summary: "RECONSTRUÇÃO EM MARCHA! Após confirmar a contratação de Ederson da Atalanta por €45M, o Manchester United está agora em negociações avançadas para contratar Mateus Fernandes do West Ham. Fabrizio Romano revelou que Michael Carrick quer 'pelo menos mais um médio' e que o jovem português de 21 anos é o alvo principal. O West Ham, recém-despromovido para o Championship, não tem poder negocial e pode aceitar €25M. Fernandes, que jogou com Bruno Fernandes na seleção portuguesa, é descrito como 'o upgrade perfeito para o meio-campo dos Red Devils'. Com o Mundial a decorrer, as negociações vão acelerar em julho. A era Carrick está a ganhar forma!",
    summary_en: "RECONSTRUCTION UNDERWAY! After confirming the signing of Ederson from Atalanta for €45M, Manchester United are now in advanced negotiations to sign Mateus Fernandes from West Ham. Fabrizio Romano revealed that Michael Carrick wants 'at least one more midfielder' and that the 21-year-old Portuguese is the main target. West Ham, newly relegated to the Championship, have no negotiating power and may accept €25M. Fernandes, who plays alongside Bruno Fernandes in the Portuguese national team, is described as 'the perfect upgrade for the Red Devils' midfield'. With the World Cup underway, negotiations will accelerate in July. The Carrick era is taking shape!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "08/06/2026",
    engagement: "5.8M",
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
