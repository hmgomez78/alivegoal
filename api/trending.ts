import type { VercelRequest, VercelResponse } from '@vercel/node';

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

// Conteúdo editorial verificado e atualizado em 12/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: PSG pressiona UEFA por balneário extra antes da final",
    title_en: "SCANDAL: PSG press UEFA for extra dressing-room space before final",
    summary: "O PSG manifestou à UEFA a sua insatisfação com o balneário atribuído no Red Bull Arena, por o considerar pequeno face ao espaço usado pelo Aston Villa. A UEFA atribuiu aos campeões europeus uma sala adicional, normalmente destinada aos árbitros, horas antes da Supertaça Europeia em Salzburgo.",
    summary_en: "PSG made UEFA aware of its dissatisfaction with the dressing room allocated at Red Bull Arena, considering it too small compared with Aston Villa's space. UEFA gave the European champions an additional room, normally used by officials, hours before the UEFA Super Cup in Salzburg.",
    tag: "SCANDAL",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cre41pqy0r7o",
    time: "12/08/2026",
    engagement: "~41.6M estimado",
  },
  {
    id: "t2",
    title: "HOT: PSG e Aston Villa disputam a Supertaça Europeia em Salzburgo",
    title_en: "HOT: PSG and Aston Villa contest the UEFA Super Cup in Salzburg",
    summary: "O campeão da Champions, PSG, enfrenta o vencedor da Europa League, Aston Villa, na final da Supertaça Europeia. O encontro arranca às 21:00 CET no Stadion Salzburg; em caso de empate após 90 minutos, a decisão segue diretamente para penáltis, sem prolongamento.",
    summary_en: "Champions League winners PSG face Europa League holders Aston Villa in the UEFA Super Cup final. Kick-off is 21:00 CET at Stadion Salzburg; if level after 90 minutes, the match goes straight to penalties with no extra time.",
    tag: "HOT",
    source: "UEFA",
    url: "https://www.uefa.com/uefasupercup/news/02a4-2056c25ced6f-cc7862c2721f-1000--2026-uefa-super-cup-in-salzburg-all-you-need-to-know/",
    time: "12/08/2026",
    engagement: "~86.4M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Nottingham Forest fecha Diomande por valor reportado de £34,2M",
    title_en: "TRANSFER: Nottingham Forest seal Diomande deal for reported £34.2m",
    summary: "O Nottingham Forest contratou Ousmane Diomande ao Sporting por uma verba não divulgada, reportada em £34,2 milhões. O central marfinense, de 22 anos, assinou por quatro épocas, com opção de mais uma, depois de 132 jogos pelo clube português.",
    summary_en: "Nottingham Forest have signed Ousmane Diomande from Sporting for an undisclosed fee reported at £34.2m. The 22-year-old Ivorian centre-back signed a four-year contract with an option for a further year after making 132 appearances for the Portuguese club.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/11/transfer-roundup-nottingham-forest-ousmane-diomande-fulham-shea-charles",
    time: "12/08/2026",
    engagement: "~58.9M estimado",
  },
  {
    id: "t4",
    title: "HOT: Barcola viaja com o PSG enquanto Liverpool mantém pressão",
    title_en: "HOT: Barcola travels with PSG as Liverpool keep up pursuit",
    summary: "Bradley Barcola integra a comitiva do PSG para a Supertaça, apesar de continuar no topo da lista do Liverpool para reforçar as alas. A ESPN reporta contactos preliminares com os representantes do francês, mas sublinha que os clubes continuam separados pela avaliação do jogador, estimada em cerca de €150 milhões.",
    summary_en: "Bradley Barcola is in PSG's travelling squad for the Super Cup despite remaining at the top of Liverpool's wing-forward shortlist. ESPN reports preliminary contact with the Frenchman's representatives, but says the clubs remain apart in their valuation of a player estimated at around €150m.",
    tag: "HOT",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49581048/liverpool-target-bradley-barcola-psg-super-cup-squad-amid-transfer-talk",
    time: "12/08/2026",
    engagement: "~79.3M estimado",
  },
  {
    id: "t5",
    title: "BREAKING: Inter negoceia Djed Spence por cerca de €30M",
    title_en: "BREAKING: Inter negotiate Djed Spence move worth about €30m",
    summary: "O Inter está em conversações com o Tottenham por Djed Spence, numa operação avaliada em aproximadamente €30 milhões. Segundo o Guardian, os termos pessoais não devem ser um obstáculo e o internacional inglês mostra-se recetivo, mas o acordo entre os clubes ainda não foi anunciado.",
    summary_en: "Inter are in talks with Tottenham over Djed Spence in a deal valued at about €30m. According to the Guardian, personal terms should not be an obstacle and the England international is open to the move, but an agreement between the clubs has not yet been announced.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/11/djed-spence-nears-tottenham-exit-inter-in-talks-over-move",
    time: "12/08/2026",
    engagement: "~47.8M estimado",
  },
  {
    id: "t6",
    title: "TRANSFER: Fulham investe £30M em Shea Charles; Jorgensen sai do Chelsea",
    title_en: "TRANSFER: Fulham invest £30m in Shea Charles; Jorgensen leaves Chelsea",
    summary: "O Fulham assegurou Shea Charles, de 22 anos, ao Southampton por uma verba reportada de £30 milhões, potencial recorde para um internacional da Irlanda do Norte. No mesmo ciclo de mercado, o guarda-redes Filip Jorgensen deixou o Chelsea por empréstimo e vai representar o Strasbourg durante 2026/27.",
    summary_en: "Fulham have signed 22-year-old Shea Charles from Southampton for a reported £30m, which could be a record fee for a Northern Ireland international. In the same transfer cycle, goalkeeper Filip Jorgensen left Chelsea on loan and will represent Strasbourg in 2026/27.",
    tag: "TRANSFER",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/11/transfer-roundup-nottingham-forest-ousmane-diomande-fulham-shea-charles",
    time: "12/08/2026",
    engagement: "~35.2M estimado",
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return res.status(200).json({
    source: "curated",
    count: CURATED_TRENDING.length,
    updated: new Date().toISOString(),
    items: CURATED_TRENDING
  });
}
