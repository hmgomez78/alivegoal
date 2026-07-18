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
      title: 'ANÁLISE MUNDIAL 2026: França e Inglaterra no Jogo que Ninguém Quer Jogar',
      excerpt: 'Ibrahima Konaté admitiu que o jogo de atribuição do 3º lugar entre França e Inglaterra é "o jogo que ninguém quer jogar". Analisamos a motivação das duas equipas europeias que caíram nas meias-finais e como Didier Deschamps e Lee Carsley vão gerir os plantéis.',
      category: 'MUNDIAL 2026',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO DE TRANSFERÊNCIAS: O Recorde do Aston Villa por Johan Manzambi',
      excerpt: 'O Aston Villa quebrou o seu recorde de transferências ao pagar £59.5M por Johan Manzambi ao Freiburg. Exploramos como o médio suíço, que brilhou no Mundial 2026, se pode encaixar no sistema de Unai Emery na Premier League e na Liga dos Campeões.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'BRASILEIRÃO SÉRIE A: Fluminense e Grêmio Vencem na Abertura da Rodada',
      excerpt: 'O Fluminense empatou a uma bola com o RB Bragantino, enquanto o Mirassol surpreendeu o Grêmio com uma vitória por 2-1. Uma análise detalhada aos jogos de ontem e o impacto na tabela classificativa do Brasileirão.',
      category: 'BRASILEIRÃO',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO NA TURQUIA: 17 Dirigentes Detidos por Viciação de Resultados',
      excerpt: 'O futebol turco está em choque após a detenção de 17 dirigentes de clubes, incluindo de gigantes como Galatasaray e Besiktas. Investigamos as ramificações deste escândalo de apostas ilegais que ameaça a credibilidade da Süper Lig.',
      category: 'BASTIDORES',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TÁTICA E ESTRATÉGIA: Como Savinho Pode Transformar o Ataque do Tottenham',
      excerpt: 'Com a transferência iminente de Savinho para o Tottenham por £65M, analisamos o perfil do extremo brasileiro. A sua capacidade de drible e criatividade parecem ser a peça que faltava no xadrez ofensivo de Ange Postecoglou.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Man Utd vs Wrexham e Amigáveis de Verão',
      excerpt: 'A pré-época europeia arranca com o Manchester United a defrontar o Wrexham, e jogos interessantes como Ajax vs Olympiakos e Basel vs Juventus. Onde está o valor nas apostas destes jogos amigáveis de preparação?',
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
