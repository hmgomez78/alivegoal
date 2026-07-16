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
      title: 'MUNDIAL 2026: Espanha e Argentina Protagonizam a Final de Sonho',
      excerpt: 'A Argentina operou uma reviravolta dramática para vencer a Inglaterra por 2-1 nas meias-finais, garantindo o seu lugar na final do Mundial 2026. A albiceleste vai agora defrontar a Espanha, que eliminou a França, num duelo ibero-americano muito aguardado em Nova Iorque.',
      category: 'MUNDIAL 2026',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO DE TRANSFERÊNCIAS: A Revolução do Manchester City',
      excerpt: 'O Manchester City está a agitar o mercado de transferências. Com a contratação de Elliot Anderson por um valor astronómico de £116M e a surpreendente chegada de Marc Guéhi por £20M, Pep Guardiola demonstra uma clara intenção de reforçar a equipa para a nova época.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'BRASILEIRÃO: O Regresso Aguardado com Clássicos em Perspetiva',
      excerpt: 'A 19ª rodada do Brasileirão Série A marca o regresso da competição após uma pausa. O grande destaque vai para o embate entre Botafogo e Santos no Estádio Nilton Santos, um jogo crucial para as aspirações de ambas as equipas no campeonato.',
      category: 'BRASILEIRÃO',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'LIGAS EUROPEIAS: Tottenham Abre os Cordões à Bolsa por Sandro Tonali',
      excerpt: 'O Tottenham Hotspur está perto de concluir uma transferência recorde para o clube, ao acordar a contratação de Sandro Tonali ao Newcastle por £92.5M. Analisamos como o médio italiano pode transformar o meio-campo dos Spurs na próxima temporada.',
      category: 'FUTEBOL EUROPEU',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ESCÂNDALO: Investigação à Venda Ilegal de Bilhetes no Mundial',
      excerpt: 'As autoridades desportivas enfrentam novos desafios com alegações de venda ilegal de bilhetes para os jogos do Mundial 2026. A Associação de Futebol do Gana está no centro da polémica, levantando questões sobre a transparência na distribuição de ingressos.',
      category: 'BASTIDORES',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Botafogo vs Santos — Prognóstico para o Clássico',
      excerpt: 'Com o regresso do Brasileirão, analisamos as melhores odds e mercados para o confronto entre Botafogo e Santos. Exploramos o momento de forma das equipas e as tendências históricas para oferecer a melhor tip de aposta para este clássico.',
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
