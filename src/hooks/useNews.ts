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
      title: 'ANÁLISE: Como a Espanha Construiu o Título Mundial de 2026',
      excerpt: 'A vitória da Espanha por 1-0 sobre a Argentina não foi apenas o resultado de um golo de Ferran Torres aos 90+2. Foi o culminar de um torneio onde a "La Roja" dominou a posse de bola e sofreu apenas 1 golo em toda a competição. Analisamos a solidez de Rodri (eleito o melhor jogador), a explosão de Lamine Yamal e a estratégia perfeita que neutralizou Messi na final.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'BASTIDORES: O Fim de Uma Era? O Enigmático "Last Tango" de Messi',
      excerpt: 'Aos 39 anos e após o seu sexto Campeonato do Mundo, Lionel Messi deixou o mundo do futebol em suspenso com a sua publicação "Last Tango". O que se segue para o astro argentino? Analisamos o impacto de uma possível reforma internacional de Messi para a seleção da Argentina e como a equipa terá de se reinventar sem o seu eterno capitão.',
      category: 'BASTIDORES',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: "MERCADO: O 'Hijack' de £117M — Como o Chelsea Bateu o Arsenal por Rogers",
      excerpt: 'Num dos negócios mais rápidos e surpreendentes da janela de transferências, o Chelsea antecipou-se ao Arsenal e pagou £117M por Morgan Rogers. O Aston Villa encaixa mais um valor recorde, enquanto Mikel Arteta vê o seu alvo número um escapar. Como é que os Blues conseguiram fechar o negócio em 24 horas? Uma análise aos bastidores da transferência.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'CHAMPIONS LEAGUE: As Fases de Qualificação Arrancam com Duelos Tensos',
      excerpt: 'Enquanto o mundo recupera da ressaca do Mundial, o futebol de clubes já regressou com as fases de qualificação da Liga dos Campeões 2026/27. Com jogos como Fenerbahce vs Gornik Zabrze e Sturm Graz vs Hearts a aproximarem-se, analisamos as equipas que procuram o sonho milionário da fase de grupos.',
      category: 'LIGA DOS CAMPEÕES',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'PRÉ-ÉPOCA: O Que Esperar dos Tubarões Europeus',
      excerpt: 'Com a pré-temporada em pleno andamento, equipas como o Chelsea já começaram a somar vitórias (3-1 vs Crawley Town). O Aston Villa, o Rangers e o Manchester United também têm testes importantes. Analisamos como as equipas da Premier League se estão a preparar taticamente para a nova época e quais os jovens a ter em conta.',
      category: 'PRÉ-ÉPOCA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Liga dos Campeões e Pré-Época — Onde Está o Valor?',
      excerpt: 'Sem jogos do Mundial, os apostadores viram as atenções para as qualificações da Liga dos Campeões e os amigáveis de pré-época. Jogos de pré-época tendem a ter muitos golos (Over 2.5), enquanto as qualificatórias da Champions são muitas vezes tensas e táticas na primeira mão. Analisamos os melhores mercados para esta semana de transição.',
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
