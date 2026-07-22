import { VercelRequest, VercelResponse } from "@vercel/node";

export interface TrendingNews {
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

const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "🚨 SCANDAL: FBI Investiga Federação Argentina por Alegada Fraude e Lavagem de Dinheiro",
    title_en: "🚨 SCANDAL: FBI Investigates Argentine FA over Alleged Fraud and Money Laundering",
    summary: "O FBI abriu uma investigação à Associação de Futebol da Argentina (AFA) devido a suspeitas de fraude e lavagem de dinheiro envolvendo mais de 300 milhões de dólares em transações bancárias nos EUA. A investigação, que chocou o mundo do futebol após o Mundial 2026, foca-se na possibilidade de fundos terem sido desviados para uso pessoal de líderes da AFA, incluindo a compra de propriedades em numerário.",
    summary_en: "The FBI has opened an investigation into the Argentine Football Association (AFA) over suspicions of fraud and money laundering involving more than $300 million in U.S. bank transactions. The probe, which shocked the football world after the 2026 World Cup, focuses on whether funds were diverted for the personal use of top AFA leaders, including cash purchases of properties.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "154.2M",
  },
  {
    id: "t2",
    title: "⚡ BREAKING: Chelsea Contrata Morgan Rogers em Transferência Recorde de £117 Milhões",
    title_en: "⚡ BREAKING: Chelsea Sign Morgan Rogers in Record £117 Million Transfer",
    summary: "O Chelsea confirmou a contratação de Morgan Rogers ao Aston Villa num negócio que bate recordes, avaliado em 117 milhões de libras. O avançado inglês assinou um contrato de sete anos com os Blues. Esta transferência bombástica faz de Rogers um dos jogadores britânicos mais caros da história, refletindo a sua excelente época no Villa e o contínuo investimento massivo do Chelsea no mercado.",
    summary_en: "Chelsea have confirmed the signing of Morgan Rogers from Aston Villa in a record-breaking deal worth £117 million. The English forward has signed a seven-year contract with the Blues. This blockbuster transfer makes Rogers one of the most expensive British players in history, reflecting his outstanding season at Villa and Chelsea's continued massive investment in the market.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "128.5M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Rodri 'Sonha' com o Real Madrid Enquanto o Manchester City Prepara Renovação",
    title_en: "🔥 HOT: Rodri 'Dreams' of Real Madrid as Manchester City Prepare Renewal",
    summary: "Apesar de ter uma proposta de renovação do Manchester City na mesa, Rodri sonha com uma transferência para o Real Madrid. O médio espanhol, recentemente coroado campeão do mundo e vencedor da Bola de Ouro, vê o Bernabéu como o destino ideal. No entanto, Florentino Pérez mantém reservas devido à idade do jogador, histórico de lesões e elevado custo de transferência, deixando o negócio em suspenso.",
    summary_en: "Despite having a renewal offer from Manchester City on the table, Rodri dreams of a transfer to Real Madrid. The Spanish midfielder, recently crowned World Champion and Ballon d'Or winner, sees the Bernabéu as his ideal destination. However, Florentino Pérez remains unconvinced due to the player's age, injury history, and high transfer cost, leaving the deal in limbo.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "95.7M",
  },
  {
    id: "t4",
    title: "🚨 SCANDAL: Presidente da La Liga Exige Demissão de Infantino por 'Destruir o Futebol'",
    title_en: "🚨 SCANDAL: La Liga President Demands Infantino Resign for 'Destroying Football'",
    summary: "Javier Tebas, presidente da La Liga, lançou um ataque feroz a Gianni Infantino, exigindo a demissão do presidente da FIFA. Tebas acusa Infantino de 'destruir a indústria do futebol' com a expansão contínua de competições internacionais, como o Mundial de Clubes e o potencial Mundial de 64 equipas. A declaração intensifica a guerra aberta entre as ligas europeias e o organismo que rege o futebol mundial.",
    summary_en: "Javier Tebas, president of La Liga, has launched a fierce attack on Gianni Infantino, demanding the resignation of the FIFA president. Tebas accuses Infantino of 'destroying the football industry' with the continuous expansion of international competitions, such as the Club World Cup and a potential 64-team World Cup. The statement intensifies the open war between European leagues and world football's governing body.",
    tag: "SCANDAL",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "88.3M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Arsenal Abre Conversações por Yan Diomande Após Falhar Outros Alvos",
    title_en: "⚡ TRANSFER: Arsenal Open Talks for Yan Diomande After Missing Other Targets",
    summary: "O Arsenal abriu negociações para contratar o defesa Yan Diomande, numa tentativa de reforçar o plantel após a lesão de Saliba. Com o PSG aparentemente fora da corrida pelo central do Sporting CP, os Gunners veem uma oportunidade de ouro. Mikel Arteta está sob pressão para garantir reforços defensivos rapidamente antes do início da nova temporada da Premier League.",
    summary_en: "Arsenal have opened negotiations to sign defender Yan Diomande in an attempt to bolster their squad following Saliba's injury. With PSG seemingly out of the race for the Sporting CP center-back, the Gunners see a golden opportunity. Mikel Arteta is under pressure to secure defensive reinforcements quickly before the start of the new Premier League season.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "72.1M",
  },
  {
    id: "t6",
    title: "🔥 HOT: Messi Fora do MLS All-Star Game Enquanto Beckham Celebra Aniversário de Estreia",
    title_en: "🔥 HOT: Messi Out of MLS All-Star Game as Beckham Celebrates Debut Anniversary",
    summary: "Lionel Messi vai falhar o MLS All-Star Game enquanto continua o seu período de descanso pós-Mundial 2026. A ausência coincide com o terceiro aniversário da sua estreia inesquecível pelo Inter Miami. David Beckham, co-proprietário do clube, elogiou recentemente a performance de Messi no Mundial, desmentindo rumores infundados de tensões entre ambos que circularam nas redes sociais.",
    summary_en: "Lionel Messi will miss the MLS All-Star Game as he continues his post-2026 World Cup rest period. The absence coincides with the third anniversary of his unforgettable debut for Inter Miami. David Beckham, the club's co-owner, recently praised Messi's World Cup performance, dismissing unfounded rumors of tension between the two that had circulated on social media.",
    tag: "HOT",
    source: "@Goal",
    url: "https://x.com/alivegoal",
    time: "22/07/2026",
    engagement: "112.4M",
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
