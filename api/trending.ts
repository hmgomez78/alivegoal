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

// Notícias curadas — atualizadas 02/07/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Tottenham FECHA Sandro Tonali por £100M — Recorde Histórico dos Spurs!",
    title_en: "🚨 BREAKING: Tottenham CLOSE Sandro Tonali for £100M — Historic Spurs Record!",
    summary: "Bomba total no mercado de transferências! O Tottenham de Roberto De Zerbi chegou a acordo com o Newcastle para contratar Sandro Tonali por £100 milhões, tornando-se a maior transferência da história dos Spurs. O médio italiano, que cumpriu suspensão por apostas ilegais, estava a fazer uma época extraordinária no Newcastle. Fabrizio Romano confirmou o 'Here We Go!' e o acordo inclui £85M fixos mais £15M em bónus. De Zerbi já tinha contratado Mateus Fernandes por £85M ao West Ham. O Tottenham está a construir um meio-campo de elite para a próxima época da Premier League.",
    summary_en: "Total transfer bomb! Roberto De Zerbi's Tottenham reached an agreement with Newcastle to sign Sandro Tonali for £100 million, making it the biggest transfer in Spurs history. The Italian midfielder, who served a suspension for illegal betting, was having an extraordinary season at Newcastle. Fabrizio Romano confirmed the 'Here We Go!' and the deal includes £85M fixed plus £15M in bonuses. De Zerbi had already signed Mateus Fernandes for £85M from West Ham. Tottenham are building an elite midfield for next Premier League season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "1.4B",
  },
  {
    id: "t2",
    title: "💥 SCANDAL: Nagelsmann EXPLODE — 'Escândalo Absoluto!' Alemanha Pede Revisão do VAR à FIFA!",
    title_en: "💥 SCANDAL: Nagelsmann EXPLODES — 'Absolute Scandal!' Germany Demands FIFA VAR Review!",
    summary: "A eliminação da Alemanha frente ao Paraguai nos penáltis continua a gerar ondas de choque. O selecionador Julian Nagelsmann declarou em conferência de imprensa: 'Não é um escândalo, é um ESCÂNDALO ABSOLUTO!' referindo-se ao golo anulado a Jonathan Tah no prolongamento por um suposto fora-de-jogo milimétrico. A Federação Alemã de Futebol (DFB) foi alvo de uma rusga policial por suspeitas de corrupção ligadas ao Euro 2024. O chanceler Friedrich Merz entrou na polémica nas redes sociais e foi duramente criticado. A FIFA convocou reunião de emergência para rever os critérios do VAR.",
    summary_en: "Germany's elimination against Paraguay on penalties continues to generate shockwaves. Coach Julian Nagelsmann declared at a press conference: 'It's not a scandal, it's an ABSOLUTE SCANDAL!' referring to Jonathan Tah's disallowed goal in extra time for an alleged millimetric offside. The German Football Federation (DFB) was raided by police over suspected corruption linked to Euro 2024. Chancellor Friedrich Merz entered the controversy on social media and was heavily criticised. FIFA called an emergency meeting to review VAR criteria.",
    tag: "SCANDAL",
    source: "@NDTV_Sports",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "1.1B",
  },
  {
    id: "t3",
    title: "🚨 BREAKING: Xabi Alonso é Oficialmente o Novo Treinador do Chelsea — Era Começa HOJE!",
    title_en: "🚨 BREAKING: Xabi Alonso is Officially Chelsea's New Manager — Era Starts TODAY!",
    summary: "A partir de hoje, Xabi Alonso é oficialmente o treinador do Chelsea FC. O espanhol, que recusou o Bayern de Munique e o Liverpool para assumir o projeto dos Blues, já começou a trabalhar com o clube. A sua primeira contratação foi Marco Palestra, o lateral italiano por €55 milhões. Alonso está também a avançar para contratar Pep Chavarría do Rayo Vallecano como lateral esquerdo. O Chelsea planeia uma revolução total com Alonso no comando, e os adeptos estão em êxtase com a chegada do ex-médio do Real Madrid e Liverpool.",
    summary_en: "From today, Xabi Alonso is officially Chelsea FC's manager. The Spaniard, who turned down Bayern Munich and Liverpool to take on the Blues project, has already started working with the club. His first signing was Marco Palestra, the Italian full-back for €55 million. Alonso is also advancing to sign Pep Chavarría from Rayo Vallecano as left-back. Chelsea plan a total revolution with Alonso in charge, and fans are ecstatic about the arrival of the former Real Madrid and Liverpool midfielder.",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "980.5M",
  },
  {
    id: "t4",
    title: "⚡ TRANSFER: Arsenal BOMBAM — Morgan Rogers por £130M? Aston Villa Recusa Baixar Preço!",
    title_en: "⚡ TRANSFER: Arsenal BOMB — Morgan Rogers for £130M? Aston Villa Refuse to Lower Price!",
    summary: "O Arsenal está a tentar de todas as formas contratar Morgan Rogers ao Aston Villa, mas os Villans mantêm a avaliação de £130 milhões. Fabrizio Romano revelou que o Arsenal fez progressos significativos com o jogador, que está disposto a mudar-se para o Emirates. No entanto, o Arsenal espera negociar com add-ons e uma estrutura criativa de pagamento. Barcola do PSG é a alternativa, com o Liverpool também interessado. Rashford pode ficar no Manchester United após reunião positiva com Michael Carrick. Tchouaméni do Real Madrid é sonho do United mas o salário é demasiado alto.",
    summary_en: "Arsenal are trying every way to sign Morgan Rogers from Aston Villa, but the Villans maintain their £130 million valuation. Fabrizio Romano revealed that Arsenal have made significant progress with the player, who is willing to move to the Emirates. However, Arsenal hope to negotiate with add-ons and a creative payment structure. PSG's Barcola is the alternative, with Liverpool also interested. Rashford may stay at Manchester United after a positive meeting with Michael Carrick. Real Madrid's Tchouaméni is United's dream but the salary is too high.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "845.3M",
  },
  {
    id: "t5",
    title: "🔥 HOT: Portugal vs Croácia HOJE — Ronaldo vs Modric no Duelo das Lendas do Mundial!",
    title_en: "🔥 HOT: Portugal vs Croatia TODAY — Ronaldo vs Modric in the World Cup Legend Duel!",
    summary: "O Mundial 2026 oferece hoje um dos jogos mais emocionantes da história recente: Portugal vs Croácia nos 16 avos de final em Toronto (00:00 Lisboa). Cristiano Ronaldo, 41 anos, tornou-se o segundo jogador mais velho a marcar num Mundial e o único a marcar em 6 torneios consecutivos. Luka Modric, 40 anos, fez a assistência mais velha da história do Mundial. Dois ícones no crepúsculo das suas carreiras num duelo épico. Também hoje: Espanha vs Áustria (20:00 Lisboa) e Suíça vs Argélia (03:00 Lisboa). O Mundial está a chegar ao seu ponto mais emocionante!",
    summary_en: "The 2026 World Cup offers today one of the most exciting games in recent history: Portugal vs Croatia in the Round of 32 in Toronto (midnight Lisbon). Cristiano Ronaldo, 41, became the second oldest player to score in a World Cup and the only one to score in 6 consecutive tournaments. Luka Modric, 40, made the oldest assist in World Cup history. Two icons at the twilight of their careers in an epic duel. Also today: Spain vs Austria (8pm Lisbon) and Switzerland vs Algeria (3am Lisbon). The World Cup is reaching its most exciting point!",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "920.7M",
  },
  {
    id: "t6",
    title: "🚨 BREAKING: EUA VENCEM Bósnia 2-0 e Avançam — Balogun Herói na Madrugada!",
    title_en: "🚨 BREAKING: USA WIN Bosnia 2-0 and Advance — Balogun Hero in the Night!",
    summary: "Os Estados Unidos confirmaram a passagem aos oitavos de final do Mundial 2026 com uma vitória por 2-0 sobre a Bósnia-Herzegovina em Santa Clara. Folarin Balogun marcou o primeiro golo ainda antes do intervalo e foi o herói da noite para os anfitriões. Os EUA vão agora defrontar a Bélgica ou o Senegal nos oitavos de final em Seattle. A vitória americana gerou uma festa enorme nas bancadas e o país inteiro celebrou. England também venceu o Congo-DR por 2-1 com dois golos de Harry Kane, que está em excelente forma para os oitavos de final contra o México.",
    summary_en: "The United States confirmed their place in the World Cup 2026 Round of 16 with a 2-0 victory over Bosnia-Herzegovina in Santa Clara. Folarin Balogun scored the first goal before half-time and was the night's hero for the hosts. The USA will now face Belgium or Senegal in the Round of 16 in Seattle. The American victory generated a huge celebration in the stands and the whole country celebrated. England also beat Congo DR 2-1 with two Harry Kane goals, who is in excellent form for the Round of 16 against Mexico.",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "02/07/2026",
    engagement: "875.2M",
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
