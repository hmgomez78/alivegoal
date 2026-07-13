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
      title: 'MUNDIAL 2026: Análise Tática do Sucesso de Inglaterra e Espanha',
      excerpt: 'As meias-finais do Mundial estão definidas. Analisamos como a Inglaterra de Jude Bellingham superou a Noruega no prolongamento e como a jovem defesa espanhola, liderada por Pau Cubarsi, resistiu à Bélgica. Um olhar profundo sobre as táticas que levaram estas equipas ao sucesso.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO AFA: O Impacto da Investigação do FBI no Futebol Sul-Americano',
      excerpt: 'A investigação do FBI à Federação Argentina por alegada lavagem de 300 milhões de dólares abalou o mundo do futebol. Exploramos as possíveis consequências legais, o impacto na imagem do Mundial 2026 e como a equipa de Messi conseguiu manter o foco desportivo.',
      category: 'BASTIDORES',
      readTime: '15 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'MERCADO DE TRANSFERÊNCIAS: A Revolução do Chelsea e a Procura de Avançados',
      excerpt: 'Com o interesse em Jonathan Rowe do Bologna e outros alvos milionários, o Chelsea promete agitar o mercado. Uma análise às necessidades do plantel dos Blues e como as novas contratações se podem encaixar na visão do treinador para a próxima época.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'BRASILEIRÃO SÉRIE B: América-MG e Londrina em Duelo Crucial na 17ª Jornada',
      excerpt: 'Num dia de pausa no Mundial, a Série B atrai as atenções. O confronto entre América-MG e Londrina é vital para as aspirações de ambas as equipas. Analisamos os pontos fortes de cada lado, os jogadores em destaque e as táticas prováveis para este embate.',
      category: 'BRASILEIRÃO SÉRIE B',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Ceará vs Athletic — Prognóstico e Melhores Odds',
      excerpt: 'O Ceará recebe o Athletic num jogo que promete golos e emoção. Analisamos o histórico recente de ambas as equipas, as estatísticas de golos marcados e sofridos, e sugerimos as melhores apostas para este confronto da Série B, incluindo o mercado de Ambas Marcam.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'RUMO À FINAL: O que Esperar do Épico França vs Espanha',
      excerpt: 'A meia-final entre França e Espanha coloca frente a frente duas potências europeias. Uma antevisão detalhada do jogo: como a defesa espanhola tentará travar Kylian Mbappé, e como a França lidará com o controlo de bola e posse característicos da La Roja.',
      category: 'ANTEVISÃO',
      readTime: '10 min',
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
