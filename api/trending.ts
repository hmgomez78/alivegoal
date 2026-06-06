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

// Notícias curadas — atualizadas 06/06/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "💣 BOMBA: Real Madrid vai fazer oferta de €150M por Michael Olise na terça-feira — Florentino confirma!",
    title_en: "💣 BOMBSHELL: Real Madrid to make €150M bid for Michael Olise on Tuesday — Florentino confirms!",
    summary: "TRANSFERÊNCIA DO ANO! Florentino Pérez confirmou que, se for reeleito presidente do Real Madrid, vai enviar uma proposta oficial de €150 milhões ao Bayern Munich por Michael Olise já na próxima terça-feira. Fabrizio Romano corroborou a informação do The Telegraph: o alvo misterioso de Pérez é mesmo o extremo franco-inglês de 24 anos, que tem um valor estimado de €170,6M — o segundo mais alto do mundo, atrás apenas de Lamine Yamal. O Bayern insiste que Olise não está à venda a nenhum preço, mas o dinheiro na mesa pode mudar tudo. O Real Madrid já garantiu Mourinho como treinador, Dumfries e Konaté. Agora quer o galáctico!",
    summary_en: "TRANSFER OF THE YEAR! Florentino Pérez confirmed that, if re-elected Real Madrid president, he will send an official €150 million offer to Bayern Munich for Michael Olise as early as next Tuesday. Fabrizio Romano corroborated The Telegraph's information: Pérez's mystery target is indeed the 24-year-old Franco-English winger, who has an estimated value of €170.6M — the second highest in the world, behind only Lamine Yamal. Bayern insist Olise is not for sale at any price, but money on the table can change everything. Real Madrid have already secured Mourinho as manager, Dumfries and Konaté. Now they want the galáctico!",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "6.1M",
  },
  {
    id: "t2",
    title: "🚨 ESCÂNDALO: FIFA cancela bilhetes da Copa do Mundo dados de graça por erro — adeptos furiosos!",
    title_en: "🚨 SCANDAL: FIFA cancels World Cup tickets given for free by error — fans furious!",
    summary: "CAOS NA FIFA! A FIFA cancelou os bilhetes do Mundial 2026 que foram distribuídos gratuitamente a cerca de 60 adeptos devido a um erro no sistema de pagamento do site oficial. Os bilhetes foram emitidos a $0 USD no dia 21 de maio, mais de três meses depois de Infantino ter declarado que todos os 104 jogos estavam esgotados. Agora a FIFA exige que os adeptos paguem o valor correto em 7 dias ou perdem os lugares. Este é o mais recente escândalo de uma venda de bilhetes que está a ser investigada pelos procuradores-gerais de Nova Iorque e Nova Jérsia por possíveis violações de proteção ao consumidor. Os adeptos estão revoltados!",
    summary_en: "FIFA CHAOS! FIFA has canceled 2026 World Cup tickets that were distributed for free to around 60 fans due to a payment system error on the official website. The tickets were issued at $0 USD on May 21st, more than three months after Infantino declared all 104 games were sold out. Now FIFA demands fans pay the correct amount within 7 days or lose their seats. This is the latest scandal in a ticketing sale being investigated by the attorneys general of New York and New Jersey for possible consumer protection violations. Fans are outraged!",
    tag: "SCANDAL",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "5.4M",
  },
  {
    id: "t3",
    title: "⚡ BREAKING: Rafael Leão confirma saída do AC Milan — Premier League é o destino!",
    title_en: "⚡ BREAKING: Rafael Leão confirms AC Milan exit — Premier League is the destination!",
    summary: "ADEUS MILÃO! Rafael Leão confirmou publicamente à televisão portuguesa que precisa de 'um novo desafio' e que a Premier League ou La Liga seriam os destinos ideais para o seu talento. O extremo português, que jogou lesionado durante 4-5 meses esta época com uma inflamação na virilha, culpou o sistema tático de Allegri pelo seu fraco desempenho. O AC Milan falhou a qualificação para a Champions League e despediu Allegri e toda a direção desportiva. Manchester United e Arsenal têm interesse, mas as únicas propostas concretas vieram de Galatasaray e Fenerbahçe — destinos que Leão recusou. O mercado de verão vai ser quente!",
    summary_en: "GOODBYE MILAN! Rafael Leão publicly confirmed to Portuguese television that he needs 'a new challenge' and that the Premier League or La Liga would be the ideal destinations for his talent. The Portuguese winger, who played injured for 4-5 months this season with a groin inflammation, blamed Allegri's tactical system for his poor performance. AC Milan failed to qualify for the Champions League and sacked Allegri and the entire sporting directorate. Manchester United and Arsenal are interested, but the only concrete offers came from Galatasaray and Fenerbahçe — destinations Leão rejected. The summer market will be hot!",
    tag: "BREAKING",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "4.9M",
  },
  {
    id: "t4",
    title: "🔥 HOT: Andrew Robertson assina pelo Tottenham como agente livre — choque no mercado!",
    title_en: "🔥 HOT: Andrew Robertson signs for Tottenham as free agent — market shock!",
    summary: "SURPRESA DO DIA! Andrew Robertson, o lendário lateral esquerdo do Liverpool, assinou pelo Tottenham Hotspur como agente livre após o fim do seu contrato com os Reds. O internacional escocês, que foi um dos melhores laterais do mundo durante vários anos, vai reforçar o setor defensivo dos Spurs para a próxima época. O Tottenham, que também confirmou o regresso de José Mourinho ao Real Madrid, está a fazer uma janela de transferências muito ativa. Esta contratação é um sinal claro das ambições dos Spurs para a temporada 2026/27.",
    summary_en: "SURPRISE OF THE DAY! Andrew Robertson, Liverpool's legendary left-back, has signed for Tottenham Hotspur as a free agent after his contract with the Reds expired. The Scottish international, who was one of the best full-backs in the world for several years, will strengthen Spurs' defensive sector for next season. Tottenham, who also confirmed José Mourinho's return to Real Madrid, are having a very active transfer window. This signing is a clear signal of Spurs' ambitions for the 2026/27 season.",
    tag: "HOT",
    source: "@ESPN",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "3.8M",
  },
  {
    id: "t5",
    title: "💥 CHOQUE: Kang-In Lee acorda com o Atlético de Madrid — PSG aceita €50M!",
    title_en: "💥 SHOCK: Kang-In Lee agrees terms with Atlético Madrid — PSG accepts €50M!",
    summary: "NOVELA RESOLVIDA! Kang-In Lee, o extremo sul-coreano do PSG, chegou a acordo pessoal com o Atlético de Madrid. O PSG está disposto a deixar o jogador sair por €50 milhões, e o coreano já aceitou os termos do contrato com os Colchoneros. Segundo Marca e Matteo Moretto, o negócio está praticamente fechado. Esta transferência vai libertar espaço no ataque do PSG, que pode agora avançar para outros alvos. O Atlético de Madrid continua a fazer uma janela de verão muito ativa, apesar das negociações em curso com o Barcelona sobre Julian Alvarez.",
    summary_en: "SAGA RESOLVED! Kang-In Lee, PSG's South Korean winger, has reached a personal agreement with Atlético Madrid. PSG are willing to let the player leave for €50 million, and the Korean has already accepted the contract terms with Los Colchoneros. According to Marca and Matteo Moretto, the deal is practically done. This transfer will free up space in PSG's attack, allowing them to pursue other targets. Atlético Madrid continue to have a very active summer window, despite ongoing negotiations with Barcelona over Julian Alvarez.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "4.2M",
  },
  {
    id: "t6",
    title: "🚨 ÚLTIMA HORA: EUA vs Alemanha hoje em Chicago — último teste antes do Mundial 2026!",
    title_en: "🚨 BREAKING: USA vs Germany today in Chicago — final test before the 2026 World Cup!",
    summary: "O GRANDE JOGO DO DIA! Os Estados Unidos recebem a Alemanha no Soldier Field em Chicago (18:30 GMT) no último amistoso de preparação antes do início do Mundial 2026 a 11 de junho. É um duelo de alto nível entre dois candidatos ao título. A Alemanha, liderada por Toni Kroos e Kai Havertz, quer confirmar a boa forma, enquanto os EUA, anfitriões do torneio, querem impressionar o seu público antes da maior competição da história do futebol americano. Portugal joga hoje às 20:00 contra o Chile no Estádio Nacional do Jamor, e o Brasil defronta o Egito às 23:00. Noite de futebol mundial!",
    summary_en: "THE BIG MATCH TODAY! The United States host Germany at Soldier Field in Chicago (18:30 GMT) in the final warm-up friendly before the 2026 World Cup kicks off on June 11. It's a high-level clash between two title contenders. Germany, led by Toni Kroos and Kai Havertz, want to confirm their good form, while the USA, tournament hosts, want to impress their home crowd before the biggest competition in American football history. Portugal play today at 20:00 against Chile at the Estádio Nacional do Jamor, and Brazil face Egypt at 23:00. A world football night!",
    tag: "BREAKING",
    source: "@BBCSport",
    url: "https://x.com/alivegoal",
    time: "06/06/2026",
    engagement: "5.0M",
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
