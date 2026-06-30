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

// Notícias curadas — atualizadas 30/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 BREAKING: Alemanha ELIMINADA do Mundial 2026 pelo Paraguai em Choque Épico!",
    title_en: "🚨 BREAKING: Germany ELIMINATED from World Cup 2026 by Paraguay in Epic Shock!",
    summary: "Numa das maiores surpresas da história dos Mundiais, o Paraguai eliminou a Alemanha nos oitavos de final. Após um empate 1-1 no tempo regulamentar, com Julio Enciso a marcar primeiro e Havertz a empatar, a decisão foi para penáltis onde o Paraguai venceu por 4-3. Um golo da Alemanha no prolongamento foi anulado pelo VAR, gerando enorme controvérsia. Adeus Alemanha!",
    summary_en: "In one of the biggest shocks in World Cup history, Paraguay eliminated Germany in the Round of 32. After a 1-1 draw in regular time, with Julio Enciso scoring first and Havertz equalizing, the decision went to penalties where Paraguay won 4-3. A German goal in extra time was disallowed by VAR, generating huge controversy. Goodbye Germany!",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "954.2M",
  },
  {
    id: "t2",
    title: "🔥 HOT: Brasil Sofre mas Vence o Japão com Golo no Minuto 95!",
    title_en: "🔥 HOT: Brazil Suffers but Beats Japan with a 95th Minute Goal!",
    summary: "O Brasil garantiu a passagem aos oitavos de final com uma vitória dramática por 2-1 sobre o Japão. Os japoneses surpreenderam com um golo de Kaishu Sano aos 29 minutos, mas Casemiro empatou no segundo tempo. Quando tudo parecia ir para prolongamento, Gabriel Martinelli marcou o golo da vitória aos 95 minutos, levando os adeptos brasileiros à loucura em Houston.",
    summary_en: "Brazil secured their passage to the Round of 16 with a dramatic 2-1 victory over Japan. The Japanese surprised with a goal from Kaishu Sano in the 29th minute, but Casemiro equalized in the second half. When everything seemed to be heading to extra time, Gabriel Martinelli scored the winning goal in the 95th minute, driving Brazilian fans crazy in Houston.",
    tag: "HOT",
    source: "@ESPNFC",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "820.5M",
  },
  {
    id: "t3",
    title: "💥 SCANDAL: Transferência de Diomande para o PSG Rejeitada pelo Liverpool",
    title_en: "💥 SCANDAL: Diomande Transfer to PSG Rejected by Liverpool",
    summary: "O mercado de transferências de verão está ao rubro! Yan Diomande rejeitou o Liverpool e deixou claro que a sua preferência é assinar pelo PSG. O Liverpool tinha oferecido 90M€ + 10M€ em bónus ao RB Leipzig, mas o internacional da Costa do Marfim recusou a mudança para Anfield. O PSG prepara-se agora para fechar o negócio milionário.",
    summary_en: "The summer transfer market is on fire! Yan Diomande rejected Liverpool and made it clear that his preference is to sign for PSG. Liverpool had offered €90M + €10M in bonuses to RB Leipzig, but the Ivory Coast international refused the move to Anfield. PSG is now preparing to close the millionaire deal.",
    tag: "TRANSFER",
    source: "@Transfermarkt",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "645.1M",
  },
  {
    id: "t4",
    title: "⚡ HOT: Enzo Maresca Deixa o Chelsea Rumo ao Manchester City por 20M€",
    title_en: "⚡ HOT: Enzo Maresca Leaves Chelsea for Manchester City for €20M",
    summary: "Bomba na Premier League! O Manchester City e o Chelsea chegaram a acordo para a rescisão do contrato de Enzo Maresca por 20 milhões de euros. O treinador italiano vai assumir o comando técnico dos 'Citizens', deixando os adeptos do Chelsea furiosos com a saída repentina para um rival direto.",
    summary_en: "Bomb in the Premier League! Manchester City and Chelsea have reached an agreement for the termination of Enzo Maresca's contract for 20 million euros. The Italian coach will take charge of the 'Citizens', leaving Chelsea fans furious with the sudden departure to a direct rival.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "712.8M",
  },
  {
    id: "t5",
    title: "🚨 BREAKING: Hoje há Grandes Jogos: França vs Suécia e Costa do Marfim vs Noruega",
    title_en: "🚨 BREAKING: Big Games Today: France vs Sweden and Ivory Coast vs Norway",
    summary: "Os 16 avos de final do Mundial 2026 continuam hoje com confrontos imperdíveis. A França de Mbappé enfrenta a Suécia, enquanto a Costa do Marfim joga contra a Noruega de Haaland. Mais tarde, o México defronta o Equador. Quem seguirá em frente nesta fase a eliminar cheia de surpresas?",
    summary_en: "The Round of 32 of the 2026 World Cup continues today with unmissable clashes. Mbappé's France faces Sweden, while Ivory Coast plays against Haaland's Norway. Later, Mexico faces Ecuador. Who will move forward in this knockout stage full of surprises?",
    tag: "HOT",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "580.4M",
  },
  {
    id: "t6",
    title: "💥 SCANDAL: Golo Anulado à Alemanha no Prolongamento Gera Polémica",
    title_en: "💥 SCANDAL: Disallowed Goal for Germany in Extra Time Sparks Controversy",
    summary: "O jogo entre Alemanha e Paraguai terminou em escândalo! No minuto 101 do prolongamento, Jonathan Tah marcou o que seria o golo da vitória para a Alemanha, mas o VAR anulou o lance por uma suposta falta sobre o guarda-redes paraguaio. A decisão enfureceu os alemães, que acabaram por ser eliminados nos penáltis.",
    summary_en: "The game between Germany and Paraguay ended in scandal! In the 101st minute of extra time, Jonathan Tah scored what would have been the winning goal for Germany, but VAR disallowed the play for an alleged foul on the Paraguayan goalkeeper. The decision infuriated the Germans, who ended up being eliminated on penalties.",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "30/06/2026",
    engagement: "890.3M",
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
