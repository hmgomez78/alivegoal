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
      title: 'MUNDIAL 2026: O Duelo Histórico Entre Inglaterra e Argentina',
      excerpt: 'A segunda meia-final do Campeonato do Mundo coloca frente a frente duas seleções com um longo historial de rivalidade. Analisamos como a Inglaterra de Thomas Tuchel tentará superar o talento ofensivo da Argentina em Atlanta, num jogo que promete ser épico.',
      category: 'ANTEVISÃO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO DE TRANSFERÊNCIAS: A Reconstrução do Meio-Campo do Man United',
      excerpt: 'Com a chegada de Youri Tielemans e Andrey Santos, o Manchester United prepara-se para apresentar um meio-campo totalmente renovado na próxima época. Uma análise profunda ao impacto tático destas contratações no sistema da equipa de Old Trafford.',
      category: 'TRANSFERÊNCIAS',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: A Vitória Tática de Espanha Frente à França',
      excerpt: 'A Espanha carimbou o passaporte para a final do Mundial 2026 com uma vitória por 2-0 sobre a França. Dissecamos como a "La Roja" anulou as transições rápidas francesas e impôs o seu domínio através da posse de bola e eficácia de Oyarzabal e Pedro Porro.',
      category: 'ANÁLISE',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'LIGAS EUROPEIAS: O Arranque das Qualificações para a Champions League',
      excerpt: 'A época 2026/27 já começou na Europa com a primeira pré-eliminatória da Liga dos Campeões. Destaque para as equipas que procuram o sonho milionário, incluindo o embate entre Sabah FC e The New Saints, e as primeiras surpresas da competição.',
      category: 'FUTEBOL EUROPEU',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'BRASILEIRÃO: Série B e C ao Rubro com Duelos Decisivos',
      excerpt: 'O meio da semana traz emoções fortes no futebol brasileiro. Analisamos os confrontos de hoje, com destaque para o Náutico vs Juventude na Série B e o Ypiranga-RS vs Paysandu na Série C, numa fase crucial para as aspirações de subida.',
      category: 'BRASILEIRÃO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Inglaterra vs Argentina — Prognóstico para a Meia-Final',
      excerpt: 'No jogo mais aguardado do dia, sugerimos as melhores abordagens para apostar no Inglaterra vs Argentina. Analisamos o mercado de golos, o desempenho recente de ambas as seleções e porque o mercado "Ambas Marcam" pode ser a aposta mais valiosa.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
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
