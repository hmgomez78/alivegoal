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

// Notícias curadas — atualizadas 01/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: França GOLEOU a Suécia 3-0 com Mbappé em Estado de Graça!",
    title_en: "🚨 BREAKING: France CRUSHED Sweden 3-0 with Mbappé in Brilliant Form!",
    summary: "A França confirmou o estatuto de grande favorita ao título do Mundial 2026 com uma goleada por 3-0 sobre a Suécia nos 16 avos de final. Kylian Mbappé marcou dois golos e igualou Messi na corrida à Bota de Ouro com 6 golos no torneio. Bradley Barcola também marcou e Michael Olise foi o grande criador. A França joga agora contra o Paraguai nos oitavos de final em Filadélfia. O treinador Graham Potter reconheceu a derrota justa mas prometeu um futuro brilhante para a Suécia.",
    summary_en: "France confirmed their status as the big World Cup 2026 favourites with a 3-0 thrashing of Sweden in the Round of 32. Kylian Mbappé scored twice and equalled Messi in the Golden Boot race with 6 goals in the tournament. Bradley Barcola also scored and Michael Olise was the chief creator. France now face Paraguay in the Round of 16 in Philadelphia. Coach Graham Potter acknowledged the fair defeat but promised a bright future for Sweden.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "1.2B",
  },
  {
    id: "t2",
    title: "⚡ TRANSFER: Tottenham BOMBAM — Mateus Fernandes por £85M ao West Ham!",
    title_en: "⚡ TRANSFER: Tottenham BOMB — Mateus Fernandes for £85M from West Ham!",
    summary: "Bomba no mercado de transferências! O Tottenham de Roberto De Zerbi bateu o Manchester United na corrida por Mateus Fernandes, pagando £85 milhões ao West Ham por um dos melhores médios portugueses da atualidade. O jovem de 21 anos, representado por Jorge Mendes, escolheu os Spurs apesar do interesse do PSG e do United. Fabrizio Romano confirmou o 'Here We Go!' e o acordo é considerado o maior negócio do verão na Premier League até agora.",
    summary_en: "Transfer bomb! Roberto De Zerbi's Tottenham beat Manchester United in the race for Mateus Fernandes, paying £85 million to West Ham for one of the best young Portuguese midfielders. The 21-year-old, represented by Jorge Mendes, chose Spurs despite interest from PSG and United. Fabrizio Romano confirmed the 'Here We Go!' and the deal is considered the biggest summer deal in the Premier League so far.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "890.4M",
  },
  {
    id: "t3",
    title: "🔥 HOT: Haaland Imparável — Noruega Elimina Costa do Marfim 2-1 e Avança!",
    title_en: "🔥 HOT: Haaland Unstoppable — Norway Eliminates Ivory Coast 2-1 and Advances!",
    summary: "Erling Haaland voltou a ser o herói da Noruega, marcando na vitória por 2-1 sobre a Costa do Marfim nos 16 avos de final do Mundial 2026. Com este golo, Haaland soma 5 golos no torneio e está apenas um atrás de Mbappé e Messi na Bota de Ouro. A Noruega vai agora defrontar o Brasil nos oitavos de final, num duelo de gigantes que promete ser o jogo da fase. A Costa do Marfim saiu de cabeça erguida após uma exibição corajosa.",
    summary_en: "Erling Haaland was Norway's hero again, scoring in the 2-1 victory over Ivory Coast in the World Cup 2026 Round of 32. With this goal, Haaland has 5 goals in the tournament and is just one behind Mbappé and Messi in the Golden Boot race. Norway will now face Brazil in the Round of 16, a clash of giants that promises to be the game of the round. Ivory Coast left with their heads held high after a courageous display.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "780.2M",
  },
  {
    id: "t4",
    title: "💥 SCANDAL: AC Milan Fecha Gonçalo Ramos por €55M — PSG Furioso!",
    title_en: "💥 SCANDAL: AC Milan Close Gonçalo Ramos for €55M — PSG Furious!",
    summary: "Escândalo no mercado de transferências! O AC Milan chegou a acordo para contratar Gonçalo Ramos ao PSG por 55 milhões de euros, deixando os parisienses furiosos com a saída do avançado português. O jogador, que está a fazer um Mundial fantástico com Portugal, terá pedido para sair depois de uma desentendimento com o treinador do PSG. O Milan garante assim um dos melhores avançados do mundo para a próxima época, numa transferência que chocou toda a Europa.",
    summary_en: "Transfer scandal! AC Milan reached an agreement to sign Gonçalo Ramos from PSG for €55 million, leaving the Parisians furious with the departure of the Portuguese striker. The player, who is having a fantastic World Cup with Portugal, reportedly asked to leave after a disagreement with the PSG coach. Milan thus secures one of the best strikers in the world for next season, in a transfer that shocked all of Europe.",
    tag: "SCANDAL",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "745.6M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Hoje há Jogos Épicos — Inglaterra vs Congo-DR e EUA vs Bósnia!",
    title_en: "🚨 BREAKING: Epic Games Today — England vs Congo DR and USA vs Bosnia!",
    summary: "O Mundial 2026 continua hoje com jogos imperdíveis nos 16 avos de final! A Inglaterra de Bellingham e Kane enfrenta o Congo-DR em Atlanta às 17h00 (Lisboa), num jogo onde os ingleses são grandes favoritos. Mais tarde, os EUA anfitriões defrontam a Bósnia-Herzegovina em Santa Clara às 01h00 (Lisboa). Também há Bélgica vs Senegal em Seattle. Quem vai surpreender hoje?",
    summary_en: "The 2026 World Cup continues today with unmissable Round of 32 games! Bellingham and Kane's England face Congo DR in Atlanta at 5pm (Lisbon time), a game where the English are heavy favourites. Later, host USA face Bosnia-Herzegovina in Santa Clara at 1am (Lisbon). There's also Belgium vs Senegal in Seattle. Who will surprise today?",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "620.8M",
  },
  {
    id: "t6",
    title: "💥 SCANDAL: Nagelsmann Explode — 'Não é um Escândalo, É UM ESCÂNDALO ABSOLUTO!'",
    title_en: "💥 SCANDAL: Nagelsmann Explodes — 'It's Not a Scandal, It's AN ABSOLUTE SCANDAL!'",
    summary: "O selecionador alemão Julian Nagelsmann não se conteve após a eliminação da Alemanha frente ao Paraguai nos penáltis. Em conferência de imprensa, Nagelsmann afirmou: 'Não é apenas um escândalo, é um escândalo absoluto!' referindo-se ao golo anulado a Jonathan Tah no prolongamento. O técnico alemão ameaçou apresentar queixa formal à FIFA e exigiu uma revisão do sistema VAR. A declaração tornou-se viral e dividiu o mundo do futebol.",
    summary_en: "German coach Julian Nagelsmann did not hold back after Germany's elimination against Paraguay on penalties. In a press conference, Nagelsmann stated: 'It's not just a scandal, it's an absolute scandal!' referring to the disallowed goal to Jonathan Tah in extra time. The German coach threatened to file a formal complaint with FIFA and demanded a review of the VAR system. The statement went viral and divided the football world.",
    tag: "SCANDAL",
    source: "@NDTV_Sports",
    url: "https://x.com/alivegoal",
    time: "01/07/2026",
    engagement: "935.1M",
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
