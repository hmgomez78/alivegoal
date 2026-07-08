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

// Notícias curadas — atualizadas 08/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Cristiano Ronaldo Confirma Fim de Carreira em Mundiais Após Eliminação!",
    title_en: "🚨 BREAKING: Cristiano Ronaldo Confirms End of World Cup Career After Elimination!",
    summary: "O fim de uma era no futebol mundial! Após a eliminação de Portugal frente à Espanha nos oitavos de final do Mundial 2026, Cristiano Ronaldo, de 41 anos, confirmou oficialmente que este foi o seu último Campeonato do Mundo. O astro português, que passou duas décadas a carregar a seleção nacional, deixou o relvado em lágrimas após a derrota por 1-0 com um golo de Mikel Merino aos 91 minutos. Uma despedida emocionante para um dos maiores de sempre.",
    summary_en: "The end of an era in world football! Following Portugal's elimination against Spain in the World Cup 2026 round of 16, 41-year-old Cristiano Ronaldo officially confirmed that this was his last World Cup. The Portuguese star, who spent two decades carrying the national team, left the pitch in tears after the 1-0 defeat with a 91st-minute goal by Mikel Merino. An emotional farewell for one of the greatest ever.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "12.4M",
  },
  {
    id: "t2",
    title: "😱 SCANDAL: FIFA Investiga Incidente Racista com IShowSpeed no Mundial!",
    title_en: "😱 SCANDAL: FIFA Investigates Racist Incident Involving IShowSpeed at World Cup!",
    summary: "A FIFA abriu uma investigação oficial após alegações de abusos racistas envolvendo o famoso YouTuber americano IShowSpeed e um adepto durante a vitória da Argentina por 3-2 sobre o Egito (originalmente reportado como Cabo Verde/Egito dependendo das fontes). O incidente, captado durante uma transmissão ao vivo, mostra um adepto a dirigir insultos racistas ao streamer. A FIFA já condenou veementemente o ato, afirmando que o racismo não tem lugar no futebol.",
    summary_en: "FIFA has launched an official investigation following allegations of racist abuse involving famous American YouTuber IShowSpeed and a fan during Argentina's 3-2 win over Egypt (originally reported as Cape Verde/Egypt depending on sources). The incident, caught on a live stream, shows a fan directing racist slurs at the streamer. FIFA has strongly condemned the act, stating that racism has no place in football.",
    tag: "SCANDAL",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "8.9M",
  },
  {
    id: "t3",
    title: "⚡ TRANSFER: Sandro Tonali Assina pelo Tottenham num Negócio Recorde de £100M!",
    title_en: "⚡ TRANSFER: Sandro Tonali Signs for Tottenham in Record £100M Deal!",
    summary: "Revolução em Londres! Sandro Tonali completou a sua transferência definitiva para o Tottenham Hotspur por um valor recorde de £100 milhões (€108M) vindo do Newcastle. O médio italiano assinou um contrato de longo prazo até junho de 2032. Esta é a sexta contratação de verão de Roberto De Zerbi, que está a construir uma equipa temível nos Spurs, já tendo gasto mais de £237 milhões no mercado. Uma verdadeira declaração de poder!",
    summary_en: "Revolution in London! Sandro Tonali has completed his permanent transfer to Tottenham Hotspur for a club-record £100 million (€108M) fee from Newcastle. The Italian midfielder has signed a long-term contract until June 2032. This is Roberto De Zerbi's sixth summer signing, who is building a fearsome squad at Spurs, having already spent over £237 million in the market. A true statement of intent!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "6.5M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Argentina e Suíça Avançam para os Quartos do Mundial 2026!",
    title_en: "🔥 HOT: Argentina and Switzerland Advance to World Cup 2026 Quarter-Finals!",
    summary: "Os quartos de final estão definidos! Num dia dramático, a Argentina de Messi precisou de uma reviravolta épica para vencer o Egito por 3-2, num jogo marcado por queixas egípcias sobre a arbitragem. No outro jogo do dia, a Suíça superou a Colômbia num tenso desempate por grandes penalidades (4-3) após um empate 0-0. Agora, Argentina e Suíça vão defrontar-se nos quartos de final no sábado, dia 11 de julho.",
    summary_en: "The quarter-finals are set! On a dramatic day, Messi's Argentina needed an epic comeback to beat Egypt 3-2, in a match marked by Egyptian complaints about the refereeing. In the other game of the day, Switzerland overcame Colombia in a tense penalty shootout (4-3) following a 0-0 draw. Now, Argentina and Switzerland will face each other in the quarter-finals on Saturday, July 11th.",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "7.2M",
  },
  {
    id: "t5",
    title: "⚡ TRANSFER: Arsenal Garante Contratação do Guarda-redes Illan Meslier!",
    title_en: "⚡ TRANSFER: Arsenal Secure Signing of Goalkeeper Illan Meslier!",
    summary: "Negócio fechado no Emirates! O Arsenal chegou a acordo para assinar com o guarda-redes Illan Meslier numa transferência a custo zero, após o término do seu contrato com o Leeds United. O guardião francês chega para reforçar as opções de Mikel Arteta na baliza dos Gunners. Um movimento astuto de mercado do Arsenal, garantindo um guarda-redes com experiência de Premier League sem custos de transferência.",
    summary_en: "Deal done at the Emirates! Arsenal have agreed a deal to sign goalkeeper Illan Meslier on a free transfer following the expiration of his contract with Leeds United. The French shot-stopper arrives to bolster Mikel Arteta's goalkeeping options for the Gunners. An astute market move by Arsenal, securing a goalkeeper with Premier League experience with no transfer fee.",
    tag: "TRANSFER",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "4.8M",
  },
  {
    id: "t6",
    title: "😱 SCANDAL: Investigação Europeia a Gianni Infantino por Causa de Donald Trump!",
    title_en: "😱 SCANDAL: European Investigation into Gianni Infantino over Donald Trump!",
    summary: "O escândalo do 'Trump-gate' ganha novas proporções! Dezenas de legisladores europeus estão a recolher apoio para lançar uma investigação no Parlamento Europeu contra o presidente da FIFA, Gianni Infantino. Em causa está a sua decisão de reverter a suspensão por cartão vermelho do jogador americano Folarin Balogun após intervenção direta do Presidente dos EUA, Donald Trump. Os legisladores classificam a mudança de regras a meio do torneio como uma 'vergonha e perversão da justiça'.",
    summary_en: "The 'Trump-gate' scandal takes on new proportions! Dozens of European lawmakers are gathering support to launch an investigation in the European Parliament against FIFA boss Gianni Infantino. At issue is his decision to reverse the red card suspension of American player Folarin Balogun following direct intervention from US President Donald Trump. Lawmakers call the mid-tournament rule change a 'disgrace and a perversion of justice'.",
    tag: "SCANDAL",
    source: "@Independent",
    url: "https://x.com/alivegoal",
    time: "08/07/2026",
    engagement: "9.1M",
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
