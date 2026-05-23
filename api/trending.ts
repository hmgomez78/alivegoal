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

// Notícias curadas — atualizadas 23/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 PEP GUARDIOLA ABANDONA O MANCHESTER CITY! Adeus ao maior treinador da história dos Citizens!",
    title_en: "🚨 PEP GUARDIOLA LEAVES MANCHESTER CITY! Farewell to the greatest manager in City's history!",
    summary: "HISTÓRICO E DEVASTADOR! Pep Guardiola confirmou oficialmente que vai abandonar o Manchester City no final desta temporada, após 10 anos inesquecíveis no clube. O catalão, visivelmente emocionado, declarou: 'Dei tudo o que tinha. Chegou a hora de escrever um novo capítulo.' Sob o seu comando, o City conquistou 6 Premier Leagues, 2 Champions Leagues, 2 FA Cups e inúmeros outros títulos. O último jogo de Pep será domingo contra o Aston Villa. O futebol inglês nunca mais será o mesmo!",
    summary_en: "HISTORIC AND DEVASTATING! Pep Guardiola has officially confirmed he will leave Manchester City at the end of this season, after 10 unforgettable years at the club. The Catalan, visibly emotional, declared: 'I gave every last drop of what I had. It's time to write a new chapter.' Under his management, City won 6 Premier Leagues, 2 Champions Leagues, 2 FA Cups and countless other trophies. Pep's final game will be Sunday against Aston Villa. English football will never be the same!",
    tag: "BREAKING",
    source: "@ManCity",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "142.7M",
  },
  {
    id: "t2",
    title: "🚨 MICHAEL CARRICK É O NOVO TREINADOR PERMANENTE DO MANCHESTER UNITED! Contrato até 2028!",
    title_en: "🚨 MICHAEL CARRICK IS MANCHESTER UNITED'S NEW PERMANENT MANAGER! Contract until 2028!",
    summary: "CONFIRMADO! O Manchester United nomeou Michael Carrick como treinador permanente até 2028, após uma impressionante fase interina de quatro meses. O ex-capitão dos Red Devils prometeu 'lutar pelos maiores títulos' e já tem uma lista de transferências ambiciosa para o verão. A diretoria apostou no ex-jogador do clube em detrimento de nomes como Pochettino e Ten Hag, numa decisão que divide os adeptos. Carrick, de 44 anos, torna-se um dos treinadores mais jovens da história recente do United!",
    summary_en: "CONFIRMED! Manchester United have appointed Michael Carrick as permanent manager until 2028, after an impressive four-month interim tenure. The former Red Devils captain promised to 'challenge for the biggest titles' and already has an ambitious transfer list for the summer. The board backed the former player over names like Pochettino and Ten Hag, in a decision that divides fans. Carrick, 44, becomes one of the youngest managers in United's recent history!",
    tag: "BREAKING",
    source: "@ManUtd",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "118.4M",
  },
  {
    id: "t3",
    title: "🔥 ESCÂNDALO SPYGATE: Southampton banido dos play-offs e deduzidos 4 pontos! Hull City na final!",
    title_en: "🔥 SPYGATE SCANDAL: Southampton banned from play-offs and docked 4 points! Hull City in the final!",
    summary: "CHOQUE TOTAL NO CHAMPIONSHIP! O Southampton foi expulso da final dos play-offs do Championship após admitir ter espiado os treinos do Middlesbrough, Oxford United e Ipswich Town. O recurso do clube foi rejeitado e os Saints sofreram ainda uma dedução de 4 pontos para a próxima temporada. O Hull City substitui o Southampton na final de Wembley deste sábado contra o Middlesbrough. O escândalo mais grave do futebol inglês em anos está a abalar as fundações do desporto!",
    summary_en: "TOTAL SHOCK IN THE CHAMPIONSHIP! Southampton have been expelled from the Championship play-off final after admitting to spying on Middlesbrough, Oxford United and Ipswich Town training sessions. The club's appeal was dismissed and the Saints also suffered a four-point deduction for next season. Hull City replace Southampton in Saturday's Wembley final against Middlesbrough. The most serious scandal in English football in years is shaking the foundations of the sport!",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "95.3M",
  },
  {
    id: "t4",
    title: "💰 ENZO FERNÁNDEZ PRIORIDADE DO MANCHESTER CITY! Maresca exige o argentino para substituir Pep!",
    title_en: "💰 ENZO FERNANDEZ MANCHESTER CITY PRIORITY! Maresca demands the Argentine to replace Pep's era!",
    summary: "BOMBA NO MERCADO! Enzo Maresca, confirmado como próximo treinador do Manchester City, declarou ao clube que Enzo Fernández do Chelsea deve ser a prioridade absoluta da janela de transferências de verão. O médio argentino, campeão do mundo em 2022, custou 107 milhões ao Chelsea mas pode sair por 80 milhões. O City precisa de reconstruir o meio-campo após a saída de Guardiola e Fernández é o nome no topo da lista. O Chelsea já recusou uma primeira abordagem!",
    summary_en: "MARKET BOMBSHELL! Enzo Maresca, confirmed as Manchester City's next manager, has told the club that Chelsea's Enzo Fernandez must be the absolute priority for the summer transfer window. The Argentine midfielder, 2022 World Cup winner, cost Chelsea £107 million but could leave for £80 million. City need to rebuild their midfield after Guardiola's departure and Fernandez is the name at the top of the list. Chelsea have already rejected a first approach!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "87.6M",
  },
  {
    id: "t5",
    title: "🚨 TUCHEL DEIXA FODEN, PALMER E ALEXANDER-ARNOLD FORA DO MUNDIAL! Inglaterra em choque!",
    title_en: "🚨 TUCHEL LEAVES FODEN, PALMER AND ALEXANDER-ARNOLD OUT OF THE WORLD CUP! England in shock!",
    summary: "TERRAMOTO NA SELEÇÃO INGLESA! Thomas Tuchel anunciou a convocatória para o Mundial 2026 com ausências bombásticas. Phil Foden, Cole Palmer, Trent Alexander-Arnold e Harry Maguire ficaram de fora da lista final de 26 jogadores. Maguire confessou estar 'chocado e destroçado'. Ivan Toney foi chamado como surpresa. Tuchel revelou ainda que implementou medidas de segurança extra no campo de treino para evitar uma repetição do Spygate inglês. A FA está em modo de crise total!",
    summary_en: "EARTHQUAKE IN THE ENGLAND SQUAD! Thomas Tuchel has announced the 2026 World Cup squad with bombshell absences. Phil Foden, Cole Palmer, Trent Alexander-Arnold and Harry Maguire have been left out of the final 26-man list. Maguire confessed to being 'shocked and gutted'. Ivan Toney was called up as a surprise. Tuchel also revealed he has implemented extra security measures at the training ground to prevent a repeat of England's own Spygate. The FA is in full crisis mode!",
    tag: "BREAKING",
    source: "@talkSPORT",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "109.8M",
  },
  {
    id: "t6",
    title: "💰 REAL MADRID vs BARCELONA: A ÚLTIMA BATALHA DE LA LIGA! Título decide-se HOJE!",
    title_en: "💰 REAL MADRID vs BARCELONA: THE FINAL LA LIGA BATTLE! Title decided TODAY!",
    summary: "A ÚLTIMA JORNADA DE LA LIGA PROMETE EMOÇÃO MÁXIMA! O Real Madrid recebe o Athletic Club às 19h00 enquanto o Barcelona visita o Valencia na mesma hora. O Barça lidera com 1 ponto de vantagem sobre o Real Madrid. Se o Barça ganhar ou empatar, é campeão. Se perder e o Real Madrid ganhar, os merengues conquistam o título. Tudo em aberto nesta última jornada épica! As odds para o Barcelona campeão estão em 1.25, mas o Real Madrid ainda acredita. Não perca este momento histórico!",
    summary_en: "THE FINAL LA LIGA MATCHDAY PROMISES MAXIMUM DRAMA! Real Madrid host Athletic Club at 19:00 while Barcelona visit Valencia at the same time. Barça lead by 1 point over Real Madrid. If Barça win or draw, they are champions. If they lose and Real Madrid win, the Merengues clinch the title. Everything is open in this epic final matchday! Odds for Barcelona champions are at 1.25, but Real Madrid still believe. Don't miss this historic moment!",
    tag: "HOT",
    source: "@LaLiga",
    url: "https://x.com/alivegoal",
    time: "23/05/2026",
    engagement: "76.2M",
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
