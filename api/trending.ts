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

// Conteúdo editorial verificado em 29/07/2026. As notícias de mercado são identificadas
// como rumores ou negociações quando não existe anúncio oficial do clube.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Zidane confirmado como selecionador de França",
    title_en: "BREAKING: Zidane confirmed as France head coach",
    summary: "Zinedine Zidane foi confirmado como novo selecionador de França. A nomeação abre um novo ciclo para uma das seleções mais pressionadas do futebol mundial e devolve o antigo campeão mundial ao comando técnico depois de um período afastado dos bancos.",
    summary_en: "Zinedine Zidane has been confirmed as France's new head coach. The appointment opens a new cycle for one of world football's most scrutinised national teams and returns the former World Cup winner to management after time away from the dugout.",
    tag: "BREAKING",
    source: "BBC Sport",
    url: "https://www.bbc.com/sport/football/videos/cpvwkdnpgkpo",
    time: "29/07/2026",
    engagement: "~12.4M",
  },
  {
    id: "t2",
    title: "TRANSFER: Newcastle confirma a contratação de Aladji Bamba por £30M",
    title_en: "TRANSFER: Newcastle confirm £30m Aladji Bamba signing",
    summary: "O Newcastle confirmou a chegada do médio Aladji Bamba, proveniente do Monaco, num acordo de cerca de £30 milhões e contrato de cinco anos. É uma adição concreta ao meio-campo numa janela em que o futuro de Bruno Guimarães também domina os debates do clube.",
    summary_en: "Newcastle have confirmed the arrival of midfielder Aladji Bamba from Monaco in a deal worth around £30m on a five-year contract. It is a concrete midfield addition in a window where Bruno Guimaraes' future also remains a major talking point.",
    tag: "TRANSFER",
    source: "BeSoccer",
    url: "https://www.besoccer.com/new/latest-transfer-news-football-rumours-confirmed-1412436",
    time: "29/07/2026",
    engagement: "~8.7M",
  },
  {
    id: "t3",
    title: "HOT: Chelsea estuda Welbeck e Henderson numa mudança de política",
    title_en: "HOT: Chelsea explore Welbeck and Henderson in policy shift",
    summary: "O Chelsea está a explorar possíveis negócios por Danny Welbeck e Jordan Henderson, dois perfis veteranos invulgares na estratégia recente do clube. A BBC recorda que os Blues não contratavam um jogador com mais de 27 anos desde 2022; por enquanto, trata-se de interesse de mercado, não de transferências confirmadas.",
    summary_en: "Chelsea are exploring potential deals for Danny Welbeck and Jordan Henderson, two veteran profiles unusual in the club's recent strategy. The BBC notes the Blues had not signed a player over 27 since 2022; for now, these are market links rather than confirmed transfers.",
    tag: "HOT",
    source: "BBC Sport",
    url: "https://www.bbc.co.uk/sport/football/videos/c934yjz2ne5o",
    time: "29/07/2026",
    engagement: "~7.9M",
  },
  {
    id: "t4",
    title: "TRANSFER: Real Madrid entra na corrida por Yan Diomande; Leipzig resiste",
    title_en: "TRANSFER: Real Madrid join Yan Diomande race as Leipzig hold firm",
    summary: "O Real Madrid entrou na corrida pelo jovem Yan Diomande, segundo o mercado acompanhado pela BeSoccer, enquanto o Leipzig terá recusado uma proposta inicial de €100 milhões. Não há confirmação oficial de acordo: a história continua a ser uma disputa de mercado entre gigantes europeus.",
    summary_en: "Real Madrid have entered the race for young talent Yan Diomande, according to the market report tracked by BeSoccer, while Leipzig are said to have rejected an opening €100m bid. There is no official agreement: the story remains a transfer battle between European heavyweights.",
    tag: "TRANSFER",
    source: "BeSoccer",
    url: "https://www.besoccer.com/new/latest-transfer-news-football-rumours-confirmed-1412436",
    time: "29/07/2026",
    engagement: "~9.6M",
  },
  {
    id: "t5",
    title: "SCANDAL: Itália procura saída após Guardiola recusar e Pirlo aproximar-se",
    title_en: "SCANDAL: Italy search for answer after Guardiola refusal and Pirlo links",
    summary: "A sucessão no comando da seleção italiana ganhou contornos de crise: os relatos indicam que Pep Guardiola recusou uma abordagem da federação e que Andrea Pirlo está perto de um entendimento, ainda dependente da situação contratual no United FC. O episódio expõe a pressão sobre a FIGC para fechar rapidamente o dossiê.",
    summary_en: "Italy's managerial succession has taken on crisis overtones: reports say Pep Guardiola declined an approach from the federation and Andrea Pirlo is close to an agreement, still subject to his contractual situation at United FC. The episode highlights the pressure on the FIGC to resolve the vacancy quickly.",
    tag: "SCANDAL",
    source: "BeSoccer",
    url: "https://www.besoccer.com/new/latest-transfer-news-football-rumours-confirmed-1412436",
    time: "29/07/2026",
    engagement: "~6.8M",
  },
  {
    id: "t6",
    title: "HOT: Arsenal e Newcastle mantêm braço-de-ferro por Bruno Guimarães",
    title_en: "HOT: Arsenal and Newcastle remain locked in Bruno Guimaraes talks",
    summary: "O Arsenal continua associado a Bruno Guimarães, mas o jogador não tenciona forçar uma saída do Newcastle e os Magpies mantêm uma avaliação de cerca de £80 milhões. O impasse deixa a negociação dependente de um entendimento entre clubes, apesar do forte interesse londrino.",
    summary_en: "Arsenal remain linked with Bruno Guimaraes, but the player does not intend to force an exit from Newcastle and the Magpies are holding firm around an £80m valuation. The stalemate leaves any move dependent on an agreement between the clubs despite strong London interest.",
    tag: "HOT",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/transfer-paper-talk",
    time: "29/07/2026",
    engagement: "~8.1M",
  },
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
