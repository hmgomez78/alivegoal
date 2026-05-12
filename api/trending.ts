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

// Notícias curadas — atualizadas 12/05/2026 (Tarde)
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESCÂNDALO NA SERIE A! Theo Hernández e estrelas do Milan envolvidos em festas ilegais!",
    title_en: "🚨 SERIE A SCANDAL! Theo Hernández and Milan stars involved in illegal parties!",
    summary: "BOMBA EM ITÁLIA! O lateral Theo Hernández está a ser apontado como o 'organizador' de festas com acompanhantes ('escort parties') que envolvem várias estrelas do AC Milan. O escândalo rebentou após o controverso empresário Fabrizio Corona divulgar fotos comprometedoras e detalhes sobre o uso de 'gás do riso'. O clube e a liga italiana prometem mão pesada!",
    summary_en: "BOMB IN ITALY! Full-back Theo Hernández is being named as the 'organizer' of escort parties involving several AC Milan stars. The scandal broke after controversial businessman Fabrizio Corona leaked compromising photos and details about the use of 'laughing gas'. The club and the Italian league promise heavy sanctions!",
    tag: "SCANDAL",
    source: "@FabrizioCorona",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "6.1M",
  },
  {
    id: "t2",
    title: "😱 MBAPPÉ NO LIVERPOOL? Crise no Real Madrid abre porta a transferência do século!",
    title_en: "😱 MBAPPÉ TO LIVERPOOL? Real Madrid crisis opens door to transfer of the century!",
    summary: "REVIRAVOLTA ÉPICA! O caos interno no Real Madrid e a época sem títulos estão a fazer Kylian Mbappé repensar o seu futuro. Relatórios explosivos indicam que o Liverpool está em reuniões cruciais para tentar garantir a contratação do astro francês. O Arsenal e o Man City também estão atentos, mas os Reds lideram a corrida pela transferência do século!",
    summary_en: "EPIC TWIST! The internal chaos at Real Madrid and the trophyless season are making Kylian Mbappé rethink his future. Explosive reports indicate that Liverpool are holding crucial meetings to try and secure the signing of the French star. Arsenal and Man City are also watching, but the Reds lead the race for the transfer of the century!",
    tag: "TRANSFER",
    source: "@FootballInsider",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "5.8M",
  },
  {
    id: "t3",
    title: "🔥 YAMAL HUMILHA BELLINGHAM! 'Falar é barato' após o Barcelona conquistar a La Liga!",
    title_en: "🔥 YAMAL HUMILIATES BELLINGHAM! 'Talk is cheap' after Barcelona wins La Liga!",
    summary: "GUERRA DE PALAVRAS! Após o Barcelona garantir o título da La Liga com uma vitória por 2-0 sobre o Real Madrid no El Clásico, Lamine Yamal não perdoou. O jovem prodígio publicou a frase 'Falar é barato' nas redes sociais, uma resposta direta às provocações de Jude Bellingham em outubro. A rivalidade entre as duas jovens estrelas está ao rubro!",
    summary_en: "WAR OF WORDS! After Barcelona secured the La Liga title with a 2-0 win over Real Madrid in El Clásico, Lamine Yamal showed no mercy. The young prodigy posted the phrase 'Talk is cheap' on social media, a direct response to Jude Bellingham's taunts back in October. The rivalry between the two young stars is red hot!",
    tag: "HOT",
    source: "@Goal",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.9M",
  },
  {
    id: "t4",
    title: "💣 SPYGATE NO CHAMPIONSHIP! Southampton arrisca expulsão dos playoffs por espionagem!",
    title_en: "💣 SPYGATE IN THE CHAMPIONSHIP! Southampton risks playoff expulsion for spying!",
    summary: "ESCÂNDALO EM INGLATERRA! O Southampton foi formalmente acusado pela EFL de espiar e filmar os treinos do Middlesbrough antes da meia-final dos playoffs do Championship. O clube pediu tempo para uma 'revisão interna', mas arrisca ser expulso da competição, o que mudaria completamente a luta pela subida à Premier League!",
    summary_en: "SCANDAL IN ENGLAND! Southampton have been formally charged by the EFL for spying on and filming Middlesbrough's training sessions ahead of their Championship playoff semi-final. The club has asked for time for an 'internal review', but risks being expelled from the competition, which would completely change the battle for Premier League promotion!",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.5M",
  },
  {
    id: "t5",
    title: "🚨 HANSI FLICK RENOVA ATÉ 2028! Acordo fechado durante a festa do título do Barcelona!",
    title_en: "🚨 HANSI FLICK RENEWS UNTIL 2028! Deal sealed during Barcelona's title party!",
    summary: "OFICIAL (QUASE)! Em pleno desfile de celebração do título da La Liga nas ruas de Barcelona, foi confirmado que Hansi Flick chegou a acordo total para renovar o seu contrato até 2028 (com mais um ano de opção). O treinador alemão é visto como o grande arquiteto do renascimento do clube catalão e foi ovacionado pelos adeptos!",
    summary_en: "OFFICIAL (ALMOST)! Right in the middle of the La Liga title celebration parade in the streets of Barcelona, it was confirmed that Hansi Flick has reached a full agreement to renew his contract until 2028 (with an optional extra year). The German coach is seen as the great architect of the Catalan club's revival and received a standing ovation from the fans!",
    tag: "BREAKING",
    source: "@Sport",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.2M",
  },
  {
    id: "t6",
    title: "🏆 CAOS NOS DIREITOS TV DO MUNDIAL! FIFA sem acordo na China e Índia a um mês do torneio!",
    title_en: "🏆 WORLD CUP TV RIGHTS CHAOS! FIFA without agreement in China and India a month before the tournament!",
    summary: "CRISE NA FIFA! A apenas um mês do pontapé de saída do Mundial 2026, a FIFA de Gianni Infantino ainda não conseguiu fechar acordos de transmissão televisiva na China e na Índia. Este falhanço épico significa que milhares de milhões de adeptos nos dois gigantes asiáticos correm o risco de não poder ver os 104 jogos do torneio!",
    summary_en: "CRISIS AT FIFA! With just a month to go until the kickoff of the 2026 World Cup, Gianni Infantino's FIFA has still not managed to secure TV broadcasting deals in China and India. This epic failure means that billions of fans in the two Asian giants are at risk of not being able to watch the tournament's 104 matches!",
    tag: "BREAKING",
    source: "@TheGuardian",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.8M",
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
