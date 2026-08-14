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

// Conteúdo editorial verificado e atualizado em 14/08/2026.
// Rumores de mercado são identificados como tal; não equivalem a comunicados oficiais dos clubes.
const CURATED_TRENDING: TrendingNews[] = [
  {
    id: "t1",
    title: "BREAKING: Ferran Torres aproxima-se de mudança para o campeão europeu",
    title_en: "BREAKING: Ferran Torres closes in on move to the European champions",
    summary: "Ferran Torres está perto da transferência que pretendia para o atual campeão da Liga dos Campeões, segundo a atualização de mercado da Bleacher Report. Ainda sem anúncio oficial dos clubes, o dossiê ganhou tração nas últimas horas e pode alterar o desenho ofensivo de duas equipas de topo antes do fecho do mercado.",
    summary_en: "Ferran Torres is closing in on the move he wanted to the reigning Champions League winners, according to Bleacher Report's transfer update. With no official club announcement yet, the story has gathered pace in recent hours and could reshape two elite forward lines before the window closes.",
    tag: "BREAKING",
    source: "Bleacher Report",
    url: "https://bleacherreport.com/liveblogs/25470552-br-football-daily-live-updates-transfer-rumors-news-highlights-and-more-aug-13",
    time: "14/08/2026",
    engagement: "~91,7M estimado",
  },
  {
    id: "t2",
    title: "TRANSFER: Arsenal discute cenário de Osimhen com Galatasaray",
    title_en: "TRANSFER: Arsenal discuss Osimhen scenario with Galatasaray",
    summary: "A disponibilidade de Victor Osimhen foi levantada em contactos entre Arsenal e Galatasaray, num quadro que também inclui o interesse turco por Gabriel Martinelli e Ethan Nwaneri. A Sky Sports sublinha que se trata de conversações de mercado e não de um acordo fechado, mas a possibilidade de uma operação cruzada tornou-se uma das histórias mais observadas do dia.",
    summary_en: "Victor Osimhen's availability has been raised in contacts between Arsenal and Galatasaray, in a picture that also includes Turkish interest in Gabriel Martinelli and Ethan Nwaneri. Sky Sports stresses that this is transfer-window discussion rather than a completed deal, but the prospect of linked moves has become one of the day's most closely watched stories.",
    tag: "TRANSFER",
    source: "Sky Sports",
    url: "https://www.skysports.com/football/transfer-paper-talk/12709/13572744/arsenal-transfer-news-gunners-discuss-victor-osimhen-with-galatasaray-amid-gabriel-martinelli-and-ethan-nwaneri-talks-paper-talk",
    time: "14/08/2026",
    engagement: "~88,3M estimado",
  },
  {
    id: "t3",
    title: "TRANSFER: Badiashile apontado ao Napoli por empréstimo",
    title_en: "TRANSFER: Badiashile linked with a Napoli loan move",
    summary: "O Chelsea continua a reorganizar o plantel e Benoît Badiashile surge apontado a um empréstimo ao Napoli. A atualização da Bleacher Report apresenta o negócio como desenvolvimento avançado, mas sem confirmação formal; se se concretizar, dará ao clube italiano mais uma opção física e canhota no centro da defesa.",
    summary_en: "Chelsea's squad reshuffle continues, with Benoît Badiashile linked to a loan move to Napoli. Bleacher Report lists the deal as an advanced development but not a formal confirmation; if completed, it would give the Italian club another physical, left-footed option in central defence.",
    tag: "TRANSFER",
    source: "Bleacher Report",
    url: "https://bleacherreport.com/liveblogs/25470552-br-football-daily-live-updates-transfer-rumors-news-highlights-and-more-aug-13",
    time: "14/08/2026",
    engagement: "~57,6M estimado",
  },
  {
    id: "t4",
    title: "HOT: Savinho falha treino do City em cenário de interesse do Tottenham",
    title_en: "HOT: Savinho misses City training amid Tottenham interest",
    summary: "Savinho não participou no treino do Manchester City e a atualização de mercado associou a ausência a um contexto de possível saída para o Tottenham, embora a explicação pública referida seja doença. Não há anúncio de proposta aceite nem confirmação de transferência, mas o episódio intensificou a atenção sobre o futuro imediato do extremo.",
    summary_en: "Savinho did not take part in Manchester City's training session, with the market update linking the absence to a possible Tottenham move while the stated public explanation is illness. There is no announcement of an accepted bid or completed transfer, but the episode has intensified attention on the winger's immediate future.",
    tag: "HOT",
    source: "Bleacher Report",
    url: "https://bleacherreport.com/liveblogs/25470552-br-football-daily-live-updates-transfer-rumors-news-highlights-and-more-aug-13",
    time: "14/08/2026",
    engagement: "~74,2M estimado",
  },
  {
    id: "t5",
    title: "SCANDAL: Rutura política na FIFA aumenta pressão sobre Infantino",
    title_en: "SCANDAL: FIFA political rift increases pressure on Infantino",
    summary: "A tensão institucional em torno de Gianni Infantino agravou-se depois de AFC, Concacaf e UEFA terem apoiado uma carta aberta a pedir uma liderança que sirva o futebol, enquanto CAF e CONMEBOL mantêm apoio ao presidente. O Guardian relata também conversas preliminares sobre possíveis torneios alternativos, sinal de uma divisão que pode afetar a governação global do jogo.",
    summary_en: "Institutional tension around Gianni Infantino has intensified after AFC, Concacaf and UEFA backed an open letter calling for leadership that serves football, while CAF and CONMEBOL continue to support the president. The Guardian also reports preliminary talks around possible alternative tournaments, a sign of a divide that could affect the game's global governance.",
    tag: "SCANDAL",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/13/this-weeks-soccer-questions-is-this-the-premier-league-wide-open-and-should-barca-avoid-rodri",
    time: "14/08/2026",
    engagement: "~96,5M estimado",
  },
  {
    id: "t6",
    title: "HOT: Barcelona reabre debate sobre Rodri e o futuro da sua formação",
    title_en: "HOT: Barcelona reopen the Rodri debate and its academy pathway",
    summary: "O interesse do Barcelona em Rodri continua a dominar o mercado espanhol. O Guardian nota que o médio espanhol daria estrutura imediata à equipa, mas recorda que uma contratação desta dimensão pode reduzir espaço competitivo para Marc Bernal, Marc Casadó, Gavi ou Pedri. Não existe acordo anunciado com o Manchester City.",
    summary_en: "Barcelona's interest in Rodri continues to dominate the Spanish market. The Guardian notes that the Spain midfielder would bring immediate structure to the side, but also that a signing of this scale could limit competitive space for Marc Bernal, Marc Casadó, Gavi or Pedri. No agreement with Manchester City has been announced.",
    tag: "HOT",
    source: "The Guardian",
    url: "https://www.theguardian.com/football/2026/aug/13/this-weeks-soccer-questions-is-this-the-premier-league-wide-open-and-should-barca-avoid-rodri",
    time: "14/08/2026",
    engagement: "~82,9M estimado",
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
