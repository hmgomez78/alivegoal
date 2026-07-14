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
      title: 'MUNDIAL 2026: França e Espanha Procuram o Bilhete para a Final em Dallas',
      excerpt: 'A primeira meia-final do Campeonato do Mundo opõe a sólida seleção francesa à irreverente equipa espanhola. Analisamos as chaves táticas do encontro: como a defesa gaulesa tentará travar a posse de bola de Espanha e as transições rápidas de Mbappé.',
      category: 'ANTEVISÃO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO DE TRANSFERÊNCIAS: A Dança dos Milhões na Premier League',
      excerpt: 'Com a contratação de Andrey Santos pelo Manchester United e o Arsenal na corrida por Julian Alvarez, os clubes ingleses começam a mexer os cordelinhos. Uma análise profunda às necessidades das equipas do Big Six e aos alvos mais cobiçados do verão.',
      category: 'TRANSFERÊNCIAS',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'BASTIDORES DO MUNDIAL: As Polémicas que Marcam a Competição nos EUA',
      excerpt: 'Desde a investigação do FBI à AFA por lavagem de dinheiro, passando pelo caso Folarin Balogun e os escândalos na seleção do Senegal, o Mundial 2026 tem sido pródigo em casos fora das quatro linhas. O impacto destas controvérsias na imagem da FIFA.',
      category: 'BASTIDORES',
      readTime: '15 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'SÉRIE B BRASILEIRA: América-MG e Ceará Tropeçam em Casa na 17ª Jornada',
      excerpt: 'A ronda 17 do Brasileirão Série B trouxe surpresas, com empates a zero do América-MG frente ao Londrina e do Ceará contra o Athletic Club. Analisamos as dificuldades ofensivas das equipas candidatas à subida e o que precisam de melhorar.',
      category: 'BRASILEIRÃO SÉRIE B',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'O ADEUS DE GREENWOOD: O Regresso à Turquia e a Reconstrução da Carreira',
      excerpt: 'Mason Greenwood troca o Marselha pelo Fenerbahçe de José Mourinho por 40 milhões de euros. Um olhar sobre a passagem do inglês por França, onde recuperou a sua melhor forma, e os desafios que o esperam no intenso ambiente do futebol turco.',
      category: 'ANÁLISE',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: França vs Espanha — Prognóstico para o Duelo Ibérico-Gaulês',
      excerpt: 'No jogo mais aguardado do dia, sugerimos as melhores abordagens para apostar no França vs Espanha. A solidez defensiva francesa e o estilo de posse espanhol apontam para um jogo fechado. Analisamos o mercado de golos e o desempenho recente de ambas as seleções.',
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
