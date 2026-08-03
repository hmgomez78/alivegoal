import { VercelRequest, VercelResponse } from '@vercel/node';

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

// Conteúdo editorial verificado e atualizado em 03/08/2026.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "SCANDAL: Rebelião no Conselho da FIFA ameaça liderança de Gianni Infantino",
    title_en: "SCANDAL: FIFA Council rebellion threatens Gianni Infantino's leadership",
    summary: "Membros do Conselho da FIFA estão a tentar provocar uma reunião geral extraordinária que pode evoluir para um desafio formal à liderança de Gianni Infantino. A contestação reúne a polémica sobre o levantamento da suspensão de Folarin Balogun e o plano abandonado de vender uma participação numa empresa do Mundial a investidores privados.",
    summary_en: "Members of FIFA's Council are seeking to trigger an extraordinary general meeting that could develop into a formal challenge to Gianni Infantino's leadership. The revolt brings together the controversy over lifting Folarin Balogun's suspension and the abandoned plan to sell a stake in a World Cup company to private investors.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/02/gianni-infantino-could-face-leadership-challenge-as-fifa-council-members-rebel",
    time: "03/08/2026",
    engagement: "~31.2M",
  },
  {
    id: "t2",
    title: "BREAKING: Países da UEFA ponderam retirar apoio à reeleição de Infantino",
    title_en: "BREAKING: UEFA nations consider withdrawing support for Infantino's re-election",
    summary: "Federações europeias discutem retirar as cartas de apoio à reeleição de Gianni Infantino após o colapso do plano de investimento privado ligado ao Mundial. A iniciativa aumentaria a pressão política sobre o presidente da FIFA antes do próximo ciclo eleitoral.",
    summary_en: "European federations are discussing withdrawing their letters of support for Gianni Infantino's re-election after the collapse of the private investment plan linked to the World Cup. The move would increase political pressure on FIFA's president before the next election cycle.",
    tag: "BREAKING",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/02/gianni-infantino-fifa-president-pressure-uefa-members-prepare-oppose-re-election",
    time: "03/08/2026",
    engagement: "~27.6M",
  },
  {
    id: "t3",
    title: "TRANSFER: Chelsea confirma Valentín Barco do Strasbourg por sete anos",
    title_en: "TRANSFER: Chelsea confirm Valentín Barco from Strasbourg on seven-year deal",
    summary: "O Chelsea oficializou a contratação de Valentín Barco ao Strasbourg, com um contrato de sete anos. O versátil internacional argentino torna-se mais uma opção para o meio-campo e lado esquerdo, naquele que é o 13.º negócio entre os dois clubes desde o início da época passada.",
    summary_en: "Chelsea have completed the signing of Valentín Barco from Strasbourg on a seven-year contract. The versatile Argentina international adds an option in midfield and on the left, in what is the 13th deal between the two clubs since the start of last season.",
    tag: "TRANSFER",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cdrv6e5m87no",
    time: "03/08/2026",
    engagement: "~22.5M",
  },
  {
    id: "t4",
    title: "TRANSFER: Juventus volta a contratar Randal Kolo Muani em definitivo",
    title_en: "TRANSFER: Juventus re-sign Randal Kolo Muani on permanent deal",
    summary: "A Juventus confirmou o regresso definitivo de Randal Kolo Muani, contratado ao Paris Saint-Germain. O avançado francês marcou dez golos em 22 jogos na sua anterior passagem por empréstimo pela Vecchia Signora e reforça imediatamente as opções ofensivas do clube.",
    summary_en: "Juventus have confirmed the permanent return of Randal Kolo Muani from Paris Saint-Germain. The French forward scored 10 goals in 22 appearances during his previous loan spell with the Bianconeri and immediately strengthens their attacking options.",
    tag: "TRANSFER",
    source: "ESPN",
    url: "https://www.espn.com/soccer/story/_/id/49515538/juventus-re-sign-randal-kolo-muani-permanent-deal",
    time: "03/08/2026",
    engagement: "~18.4M",
  },
  {
    id: "t5",
    title: "HOT: Bournemouth perto de fechar Juanlu por 11,1M£",
    title_en: "HOT: Bournemouth close to sealing £11.1m Juanlu deal",
    summary: "O Bournemouth está a finalizar a contratação de Juanlu, lateral-direito do Sevilla, por 11,1 milhões de libras. O jogador de 22 anos deve assinar um vínculo de longo prazo e seria a terceira entrada do verão para a equipa de Marco Rose.",
    summary_en: "Bournemouth are finalising the signing of Sevilla right-back Juanlu for £11.1 million. The 22-year-old is expected to sign a long-term contract and would become Marco Rose's side's third summer arrival.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/articles/cjwx77l1lg9o",
    time: "03/08/2026",
    engagement: "~13.1M",
  },
  {
    id: "t6",
    title: "TRANSFER: Manchester City associado a possível investida de 70M£ por Pedro Neto",
    title_en: "TRANSFER: Manchester City linked with potential £70m move for Pedro Neto",
    summary: "Segundo uma notícia de mercado agregada pela ESPN, o Manchester City pondera uma abordagem-surpresa por Pedro Neto, extremo do Chelsea, avaliado em cerca de 70 milhões de libras. Trata-se de uma informação de mercado sem confirmação oficial dos clubes.",
    summary_en: "According to a transfer report aggregated by ESPN, Manchester City are considering a surprise approach for Chelsea winger Pedro Neto, valued at around £70 million. This remains a market report with no official confirmation from either club.",
    tag: "TRANSFER",
    source: "ESPN Transfer Talk",
    url: "https://www.espn.com/soccer/story/_/id/49511046/transfer-rumors-news-man-city-eye-chelsea-winger-pedro-neto",
    time: "03/08/2026",
    engagement: "~16.7M",
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
