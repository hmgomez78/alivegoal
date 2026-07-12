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
      title: 'ANÁLISE TÁTICA: Como Jude Bellingham Decidiu o Jogo Contra a Noruega',
      excerpt: 'O duelo dos quartos de final do Mundial 2026 entre Noruega e Inglaterra foi decidido pela genialidade de Jude Bellingham. Analisamos como o médio inglês encontrou os espaços na defesa norueguesa durante o prolongamento, marcando os dois golos que garantiram a vitória por 2-1.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TRANSFERÊNCIAS: O Impacto de Marc Guehi na Defesa do Manchester City',
      excerpt: 'A contratação de Marc Guehi por £20 milhões representa um reforço estratégico para o Manchester City. Analisamos como o ex-capitão do Crystal Palace se vai adaptar ao sistema de Pep Guardiola e a sua capacidade de sair a jogar a partir da defesa.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'MUNDIAL 2026: O Caminho da Argentina Rumo ao Título',
      excerpt: 'Após superar a Suíça nos quartos de final, a Argentina de Lionel Messi parece mais forte do que nunca. Uma análise ao percurso da equipa sul-americana, as exibições de Messi e o que esperar do confronto épico nas meias-finais contra a Inglaterra.',
      category: 'MUNDIAL 2026',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: São Bernardo vs Cuiabá — Análise Completa e as Melhores Picks',
      excerpt: 'O embate da 17ª rodada da Série B entre São Bernardo e Cuiabá oferece excelentes oportunidades para os apostadores. O São Bernardo procura recuperar da derrota anterior, enquanto o Cuiabá tenta manter a sequência de vitórias. Recomendamos Ambas as Equipas Marcam (1.95) e Menos de 2.5 Golos (1.75).',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'RESUMO: A Resiliência de Espanha na Vitória sobre o Uruguai',
      excerpt: 'A vitória da Espanha por 1-0 sobre o Uruguai demonstrou a resiliência e maturidade tática da La Roja. Analisamos o golo decisivo, o controlo do meio-campo e a importância deste resultado para as aspirações espanholas no Mundial 2026.',
      category: 'RESUMO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'BRASILEIRÃO SÉRIE B: Atlético-GO Recebe o Fortaleza em Jogo de Elevada Pressão',
      excerpt: 'O duelo entre Atlético-GO e Fortaleza promete ser um dos mais intensos da rodada 17 da Série B. Analisamos as táticas de ambas as equipas, o momento de forma do Fortaleza após a vitória sobre a Ponte Preta, e a necessidade urgente do Atlético-GO de somar pontos.',
      category: 'BRASILEIRÃO SÉRIE B',
      readTime: '8 min',
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
