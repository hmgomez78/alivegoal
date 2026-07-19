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
        category: item.tag === 'TRANSFER' ? 'TRANSFERÊNCIAS' : item.tag === 'BREAKING' ? 'ÚLTIMA HORA' : item.tag === 'SCANDAL' ? 'ESCÂNDALO' : 'DESTAQUE',
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
      title: 'ANÁLISE TÁTICA: Como a Espanha Pode Deter o Ataque Tardio da Argentina na Final',
      excerpt: 'A Argentina marcou 11 dos seus 14 golos no Mundial após o minuto 75 — um recorde absoluto na história das Copas. A Espanha, com a sua posse de bola dominante (64% de média) e apenas 1 golo sofrido em 7 jogos, tem as ferramentas para neutralizar este padrão. Analisamos as chaves táticas do confronto entre Rodri e Mac Allister, e o duelo de gerações Lamine Yamal vs Messi.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE: Mbappé Quebra Recorde de Golos no Mundial — Mas França Perde o Bronze',
      excerpt: 'Kylian Mbappé tornou-se o maior marcador da história dos Mundiais ao superar Messi, mas não foi suficiente para evitar a derrota da França por 6-4 frente à Inglaterra. Num jogo de 10 golos que entrou para a história, Bukayo Saka fez hat-trick e a Inglaterra esteve a vencer 4-0 ao intervalo antes de uma remontada francesa que quase chegou ao empate. Uma análise ao jogo mais louco da Copa 2026.',
      category: 'MUNDIAL 2026',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'MERCADO: Chelsea Gasta £117M em Morgan Rogers — O Fim do Projeto Aston Villa?',
      excerpt: 'Com a saída de Johan Manzambi por £59.5M e agora de Morgan Rogers por £117M, o Aston Villa encaixou mais de £176M em apenas duas semanas. Mas o que significa isto para o projeto de Unai Emery? O Chelsea, por sua vez, consolida-se como o clube mais gastador da Premier League, com um plantel que já custou mais de £500M. Analisamos as implicações desta mega-transferência.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'INVESTIGAÇÃO: O Colapso do Futebol Turco — Como o Escândalo de Apostas Chegou ao Topo',
      excerpt: 'Com mais de 100 suspensos e 17 dirigentes detidos em raids em 10 províncias, o futebol turco enfrenta a sua maior crise de sempre. Investigamos como uma rede de apostas ilegais infiltrou os maiores clubes do país, incluindo Galatasaray e Besiktas, e o que a UEFA pode fazer para restaurar a credibilidade da Süper Lig. Um escândalo que ameaça abalar as fundações do futebol turco.',
      category: 'BASTIDORES',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'BRASILEIRÃO SÉRIE D: Oitavos de Final Arrancam com Duelos Decisivos',
      excerpt: 'O mata-mata da Série D do Brasileirão começa hoje com jogos de alto voltagem. Hoje disputam-se os jogos de ida das oitavos de final, com São Luiz-RS vs CSA-AL (11h) e América-RN vs Gama-DF (19h). Analisamos os favoritos, as equipas surpresa e o que está em jogo nesta fase decisiva da competição que decide o acesso à Série C.',
      category: 'BRASILEIRÃO',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Final do Mundial Espanha vs Argentina — Análise e Previsões',
      excerpt: 'A final do Mundial 2026 entre Espanha e Argentina é o jogo mais aguardado do ano. A Espanha tem 59.5% de probabilidade de vencer segundo os modelos matemáticos. Analisamos as odds, os mercados mais interessantes (Lamine Yamal marcador, golos totais, resultado ao intervalo) e apresentamos as nossas melhores tips para o jogo da noite no MetLife Stadium.',
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
