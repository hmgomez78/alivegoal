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

async function fetchTrendingNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch('/api/trending');
    if (!res.ok) throw new Error('Failed to fetch trending news');
    const data = await res.json();
    if (data.items && Array.isArray(data.items)) {
      return data.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        excerpt: item.summary,
        category: item.tag === 'TRANSFER' ? 'TRANSFERÊNCIAS' : item.tag === 'BREAKING' ? 'ÚLTIMA HORA' : 'DESTAQUE',
        readTime: '3 min',
        date: item.time,
        source: item.source,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending news for hook:', error);
    return [];
  }
}

function getFallbackNews(): NewsArticle[] {
  const formatToday = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return [
    {
      id: 1,
      title: 'ANÁLISE MUNDIAL 2026: O Caminho de Espanha e Argentina até à Final',
      excerpt: 'Uma análise detalhada ao percurso das duas seleções que vão disputar a final do Mundial 2026. A Espanha, com o seu futebol de posse e jovens talentos como Lamine Yamal, defronta a experiência e resiliência da Argentina de Messi.',
      category: 'MUNDIAL 2026',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO DE TRANSFERÊNCIAS: Chelsea e a Estratégia de Reconstrução',
      excerpt: 'Com as vendas de Marc Cucurella ao Real Madrid e Andrey Santos ao Manchester United, o Chelsea continua a sua profunda reestruturação. Analisamos as entradas de Marco Palestra e Geovany Quenda e o que significam para o futuro do clube.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'BRASILEIRÃO: Bahia Recebe Chapecoense em Jogo de Extremos',
      excerpt: 'Na 19ª rodada do Brasileirão, o Bahia (6º classificado) procura consolidar a sua posição no topo da tabela frente à Chapecoense (20º), que luta desesperadamente pela sobrevivência. Antevisão completa do embate na Arena Fonte Nova.',
      category: 'BRASILEIRÃO',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'LIGAS EUROPEIAS: O Impacto de Luka Vuskovic no Brighton',
      excerpt: 'O Brighton quebrou o seu recorde de transferências ao pagar £50M por Luka Vuskovic. Exploramos como o jovem defesa croata se pode encaixar no sistema tático da equipa e o que justifica este investimento avultado.',
      category: 'FUTEBOL EUROPEU',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ESCÂNDALO NA REPÚBLICA CHECA: As Consequências para o Futebol Europeu',
      excerpt: 'A despromoção do MFK Karviná e a sua exclusão das competições da UEFA devido a viciação de resultados abala o futebol checo. Discutimos o impacto deste escândalo e as medidas que a UEFA está a tomar para combater a corrupção.',
      category: 'BASTIDORES',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Fluminense vs Mirassol — Prognóstico e Odds',
      excerpt: 'O Fluminense (3º classificado) defronta o Mirassol (19º) no Maracanã. Analisamos as melhores oportunidades de aposta para este jogo, tendo em conta o momento de forma das equipas e as estatísticas mais recentes.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    }
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const trendingNews = await fetchTrendingNews();
      
      if (trendingNews.length >= 4) {
        setNews(trendingNews.slice(0, 6));
      } else {
        const fallback = getFallbackNews();
        const mixed = [...trendingNews, ...fallback].slice(0, 6);
        setNews(mixed);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(getFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Atualizar a cada 15 minutos
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { news, loading, refresh: fetchNews };
}
