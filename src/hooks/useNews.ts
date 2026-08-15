import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source: string;
  imageUrl?: string;
}

// Conteúdo de análise e contexto, distinto das manchetes do feed de tendências.
function getFallbackNews(): NewsArticle[] {
  const publicationDate = '15 ago. 2026';

  return [
    {
      id: 401,
      title: 'PREMIER LEAGUE: O que muda com os novos limites de tempo e o VAR revisto',
      excerpt: 'A liga inglesa vai importar do Mundial de 2026 a saída obrigatória de um minuto após tratamento em campo, contagens de cinco segundos para reposições e um limite de dez segundos nas substituições. O VAR também poderá corrigir factos em segundos amarelos e casos de identidade trocada, mas não vai intervir em cantos assinalados por erro. A primeira leitura não deve ser sobre espetáculo: é sobre como as equipas vão gerir inferioridades temporárias, transições e o tempo útil de jogo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 402,
      title: 'CHAMPIONSHIP: Novo modelo de play-offs altera o valor de cada ponto desde agosto',
      excerpt: 'A BBC Sport detalhou a mudança nos play-offs do Championship para 2026–27. Num campeonato em que a diferença entre entrar na luta pela subida e ficar fora pode ser mínima, a alteração desloca parte da pressão para a consistência: começar bem, limitar sequências sem vencer e proteger o saldo de golos passam a ter peso ainda maior na construção de uma candidatura.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 403,
      title: 'MIDDLESBROUGH–LINCOLN: O teste do modelo com dois treinadores diante de um favorito de mercado',
      excerpt: 'Tom Shaw e Chris Cohen iniciam o regresso do Lincoln ao segundo escalão com uma liderança partilhada, um modelo raro no futebol inglês. Do outro lado, o Middlesbrough investiu mais de £20 milhões no verão, segundo o The Guardian. O jogo oferece um contraste nítido entre continuidade interna e capacidade financeira: a organização sem bola do Lincoln terá de compensar uma diferença substancial de recursos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 404,
      title: 'BOLTON–PRESTON: A chegada de Leroy dá uma nova variável ao primeiro jogo',
      excerpt: 'O Preston confirmou a contratação do médio Leroy ao Basileia na véspera da deslocação a Bolton. Mais do que uma notícia de mercado, a chegada coloca uma questão operacional para a estreia: integração imediata ou adaptação progressiva? Num encontro inaugural, o equilíbrio entre energia competitiva e automatismos tende a decidir mais do que o estatuto do reforço.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 405,
      title: 'SHEFFIELD UNITED–BIRMINGHAM: Max Bird regressa a casa e aumenta as opções do meio-campo',
      excerpt: 'Max Bird assinou por três anos pelo Birmingham depois de deixar o Bristol City, acrescentando ligação, disponibilidade para pressionar e uma narrativa especial ao arranque da campanha. A visita ao Sheffield United será uma primeira oportunidade para medir a velocidade de integração. A análise vai além da estreia: o sucesso da operação dependerá da forma como o novo médio melhora a saída de bola sem abrir espaços em transição.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 406,
      title: 'NASHVILLE–INTER MIAMI: Duas potências do Este, duas formas de chegar ao golo',
      excerpt: 'Nashville lidera a Conferência Este com 40 pontos em 18 jogos e construiu em casa um registo de oito vitórias e um empate; o Inter Miami vem logo atrás, com 38 pontos e o melhor ataque do duelo, 45 golos. O contexto favorece um jogo de contrastes: Nashville procura controlar o espaço e as bolas paradas, enquanto Miami tende a criar mais volume em posse e transição. A batalha pelo ritmo pode valer tanto como a qualidade individual no último terço.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN / SportsGambler',
    }
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 600));
      setNews(getFallbackNews());
    } catch (error) {
      console.error('Error fetching news:', error);
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
