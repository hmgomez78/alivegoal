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

// Notícias curadas — atualizadas 12/05/2026
const CURATED_TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title: "🚨 ESTÊVÃO FORA DO MUNDIAL 2026! Lesão afasta joia do Chelsea da convocatória do Brasil!",
    title_en: "🚨 ESTÊVÃO OUT OF THE 2026 WORLD CUP! Injury rules Chelsea jewel out of Brazil's squad!",
    summary: "BOMBA NO BRASIL! O jovem prodígio Estêvão (Chelsea) está oficialmente fora do Mundial 2026 devido a uma lesão muscular grave sofrida contra o Manchester United. Carlo Ancelotti deixou o jogador de 19 anos de fora da lista preliminar de 55 convocados. Neymar, por outro lado, está na lista! Uma baixa de peso para a 'Canarinha' a um mês do torneio.",
    summary_en: "BOMB IN BRAZIL! Young prodigy Estêvão (Chelsea) is officially out of the 2026 World Cup due to a serious hamstring injury suffered against Manchester United. Carlo Ancelotti left the 19-year-old out of the 55-man preliminary squad. Neymar, on the other hand, made the cut! A massive blow for the 'Seleção' just a month before the tournament.",
    tag: "BREAKING",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.5M",
  },
  {
    id: "t2",
    title: "😱 ESCÂNDALO NO MUNDIAL! Jogador de Cabo Verde investigado por agressão sexual na Nova Zelândia!",
    title_en: "😱 WORLD CUP SCANDAL! Cape Verde player investigated for sexual assault in New Zealand!",
    summary: "CHOQUE TOTAL! A polícia da Nova Zelândia abriu uma investigação a um jogador da seleção de Cabo Verde (qualificada para o Mundial 2026) por suspeita de agressão sexual. O incidente terá ocorrido no hotel da equipa em Auckland, após um jogo em março. A federação ainda não se pronunciou, mas o caso ameaça manchar a preparação da equipa para o torneio.",
    summary_en: "TOTAL SHOCK! New Zealand police have launched an investigation into a Cape Verde national team player (qualified for the 2026 World Cup) over an alleged sexual assault. The incident reportedly occurred at the team's hotel in Auckland after a match in March. The federation has yet to comment, but the case threatens to derail the team's tournament preparation.",
    tag: "SCANDAL",
    source: "@Reuters",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.8M",
  },
  {
    id: "t3",
    title: "💣 MOURINHO NO REAL MADRID? 'Special One' em negociações avançadas para regresso bombástico!",
    title_en: "💣 MOURINHO TO REAL MADRID? 'Special One' in advanced talks for a blockbuster return!",
    summary: "O REGRESSO DO REI? José Mourinho é agora o principal candidato para assumir o comando do Real Madrid na próxima época, sucedendo a Álvaro Arbeloa. Após uma época desastrosa sem títulos e com o balneário em crise, Florentino Pérez vê no português a solução ideal para 'limpar a casa'. As negociações estão ativas e o acordo pode estar iminente!",
    summary_en: "THE RETURN OF THE KING? José Mourinho is now the top candidate to take charge of Real Madrid next season, succeeding Álvaro Arbeloa. After a disastrous trophyless season and a dressing room in crisis, Florentino Pérez sees the Portuguese as the ideal solution to 'clean house'. Talks are active and an agreement could be imminent!",
    tag: "TRANSFER",
    source: "@SkySports",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "5.2M",
  },
  {
    id: "t4",
    title: "🔥 ARSENAL VENCE COM POLÉMICA! Golo anulado ao West Ham deixa Gunners perto do título!",
    title_en: "🔥 ARSENAL WINS WITH CONTROVERSY! Disallowed West Ham goal leaves Gunners close to the title!",
    summary: "DRAMA NO LONDRES STADIUM! O Arsenal venceu o West Ham por 1-0 (golo de Trossard) e deu um passo gigante rumo ao título da Premier League. No entanto, o jogo ficou marcado por uma enorme polémica com o VAR, que anulou um golo limpo aos 'Hammers' nos minutos finais. O West Ham fica à beira da descida, enquanto o Arsenal tem agora 87% de hipóteses de ser campeão!",
    summary_en: "DRAMA AT LONDON STADIUM! Arsenal beat West Ham 1-0 (Trossard goal) and took a giant step towards the Premier League title. However, the match was marred by massive VAR controversy, which disallowed a clear goal for the 'Hammers' in the final minutes. West Ham are on the brink of relegation, while Arsenal now have an 87% chance of being champions!",
    tag: "HOT",
    source: "@TheAthletic",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "4.1M",
  },
  {
    id: "t5",
    title: "🚨 MAN UTD FECHA EDERSON! Acordo de 5 anos com o médio da Atalanta por €40M!",
    title_en: "🚨 MAN UTD SIGNS EDERSON! 5-year deal with Atalanta midfielder for €40M!",
    summary: "A PRIMEIRA CONTRATAÇÃO! O Manchester United chegou a acordo com o médio brasileiro Ederson (Atalanta) para um contrato de 5 anos. O jogador de 26 anos rejeitou o interesse do Arsenal e disse 'sim' aos Red Devils. A transferência deverá rondar os 40 milhões de euros e marca o início da revolução no meio-campo do United para a próxima época.",
    summary_en: "THE FIRST SIGNING! Manchester United have reached an agreement with Brazilian midfielder Ederson (Atalanta) for a 5-year contract. The 26-year-old rejected interest from Arsenal and said 'yes' to the Red Devils. The transfer is expected to be around 40 million euros and marks the beginning of United's midfield revolution for next season.",
    tag: "TRANSFER",
    source: "@FabrizioRomano",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "3.4M",
  },
  {
    id: "t6",
    title: "🏆 FINAL DA CHAMPIONS: PSG vs Arsenal! Árbitro alemão Daniel Siebert nomeado para o grande jogo!",
    title_en: "🏆 CHAMPIONS LEAGUE FINAL: PSG vs Arsenal! German referee Daniel Siebert appointed for the big game!",
    summary: "TUDO PRONTO PARA BUDAPESTE! A UEFA confirmou que o alemão Daniel Siebert será o árbitro da final da Champions League entre PSG e Arsenal, no dia 30 de maio. Siebert, que ficou de fora da lista do Mundial 2026, recebe assim o maior jogo da época europeia. O PSG procura revalidar o título, enquanto o Arsenal sonha com a glória europeia inédita!",
    summary_en: "ALL SET FOR BUDAPEST! UEFA has confirmed that German Daniel Siebert will referee the Champions League final between PSG and Arsenal on May 30. Siebert, who was left off the 2026 World Cup list, thus gets the biggest game of the European season. PSG look to retain their title, while Arsenal dream of unprecedented European glory!",
    tag: "BREAKING",
    source: "@UEFA",
    url: "https://x.com/alivegoal",
    time: "12/05/2026",
    engagement: "2.9M",
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
