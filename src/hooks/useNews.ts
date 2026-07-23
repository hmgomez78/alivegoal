import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source: string;
  imageUrl?: string;
}

function getFallbackNews(): NewsArticle[] {
  const publicationDate = '23 jul. 2026';

  return [
    {
      id: 'context-1',
      title: 'EUROPA LEAGUE: Dynamo Kyiv–PAOK abre uma noite de eliminatórias de alto nível',
      excerpt: 'A segunda pré-eliminatória da UEFA Europa League coloca Dynamo Kyiv e PAOK frente a frente às 18:00. Mais do que um jogo isolado, é o primeiro passo de uma eliminatória a duas mãos que pode definir o calendário europeu das duas equipas no início da época 2026/27.',
      category: 'ANÁLISE EUROPEIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-2',
      title: 'CONTEXTO: Hammarby–Anderlecht mede ambição sueca contra experiência belga',
      excerpt: 'Hammarby recebe o Anderlecht na segunda ronda de qualificação da Europa League. O emparelhamento ilustra o equilíbrio desta fase: equipas em plena dinâmica competitiva enfrentam clubes habituados a palcos continentais e a gerir eliminatórias sob pressão.',
      category: 'ANÁLISE EUROPEIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-3',
      title: 'EUROPA LEAGUE: Beşiktaş–Midtjylland, um duelo de perfis táticos contrastantes',
      excerpt: 'O Beşiktaş recebe o Midtjylland às 19:00 numa das partidas mais interessantes da segunda pré-eliminatória. O jogo coloca um clube turco de grande massa adepta perante uma estrutura dinamarquesa conhecida pelo recrutamento orientado por dados e pela intensidade competitiva.',
      category: 'LEITURA TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-4',
      title: 'BRASILEIRÃO: Botafogo–Vitória fecha a agenda de hoje com pontos importantes em jogo',
      excerpt: 'Botafogo e Vitória têm pontapé de saída marcado para as 23:30 no calendário de Série A listado pela BBC Sport. Em plena sequência de jogos domésticos, a gestão de energia, rotações e eficácia nas duas áreas ganha peso numa fase em que cada resultado pode alterar o ritmo da campanha.',
      category: 'FUTEBOL BRASILEIRO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-5',
      title: 'BRASILEIRÃO: Corinthians–Remo junta tradição e urgência competitiva',
      excerpt: 'O Corinthians recebe o Remo às 23:30, de acordo com a página de jogos da BBC Sport. Para além do valor histórico dos emblemas, o encontro oferece uma leitura útil sobre a capacidade de adaptação das equipas a um calendário intenso e a contextos competitivos distintos.',
      category: 'FUTEBOL BRASILEIRO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-6',
      title: 'PRÉ-ÉPOCA: Rio Ave–Nottingham Forest no radar, com horário ainda por confirmar',
      excerpt: 'O Rio Ave e o Nottingham Forest têm um amigável previsto para hoje, embora a hora de início permanecesse por confirmar na listagem da BBC Sport. Estes encontros de preparação ajudam a testar dinâmicas, dar minutos a novos elementos e afinar processos antes do arranque oficial.',
      category: 'PRÉ-ÉPOCA',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // O feed editorial de contexto é deliberadamente distinto do feed de tendências.
      setNews(getFallbackNews());
    } catch (error) {
      console.error('Error loading contextual news:', error);
      setNews(getFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { news, loading, refresh: fetchNews };
}
