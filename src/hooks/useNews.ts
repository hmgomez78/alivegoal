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
      title: 'ANÁLISE: O Impacto da Investigação do FBI na AFA e no Futebol Argentino',
      excerpt: 'A recente abertura de uma investigação do FBI sobre a Associação de Futebol da Argentina (AFA) levanta sérias questões sobre a transparência financeira no futebol sul-americano. Analisamos como as alegações de fraude e lavagem de dinheiro, envolvendo mais de 300 milhões de dólares, podem afetar a reputação da seleção recém-coroada campeã mundial e a estabilidade da federação.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'MERCADO: O Investimento Contínuo do Chelsea e a Chegada de Morgan Rogers',
      excerpt: 'O Chelsea continua a sua agressiva estratégia de mercado com a contratação recorde de Morgan Rogers por £117 milhões. Exploramos como o avançado inglês se encaixa no sistema tático de Stamford Bridge, o impacto financeiro deste negócio e o que significa para o projeto a longo prazo do clube sob a atual direção.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: "BASTIDORES: A Guerra Aberta entre Javier Tebas e Gianni Infantino",
      excerpt: 'As declarações explosivas do presidente da La Liga, Javier Tebas, exigindo a demissão de Gianni Infantino, marcam um novo ponto baixo nas relações entre as ligas europeias e a FIFA. Discutimos as razões por trás desta disputa, centrada na expansão do calendário internacional, e as possíveis consequências para o futuro das competições de clubes.',
      category: 'BASTIDORES',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'CHAMPIONS LEAGUE: Omonia Nicosia e Levski Sofia Entram em Ação na Qualificação',
      excerpt: 'A segunda ronda de qualificação da Liga dos Campeões continua hoje. O Omonia Nicosia enfrenta o FC Kairat, enquanto o Levski Sofia joga contra a Universitatea Craiova. Analisamos as perspetivas destas equipas na sua jornada rumo à fase de grupos da competição de clubes mais prestigiada da Europa.',
      category: 'LIGA DOS CAMPEÕES',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'SUL-AMERICANA: Vasco e Bragantino em Destaque nos Playoffs Desta Noite',
      excerpt: 'Os playoffs da Copa Sul-Americana aquecem com o Vasco a visitar o Independiente Medellín e o Bragantino a enfrentar o Sporting Cristal. Avaliamos as hipóteses das equipas brasileiras nestes confrontos cruciais e o que precisam de fazer para garantir a passagem aos oitavos de final do torneio continental.',
      category: 'SUL-AMERICANA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Brasileirão e Sul-Americana — As Melhores Oportunidades de Hoje',
      excerpt: 'Com uma noite repleta de ação no Brasileirão (Coritiba x Palmeiras, São Paulo x Athletico) e na Copa Sul-Americana, identificamos as apostas com maior valor. Analisamos as estatísticas recentes, o momento de forma das equipas e as odds para lhe trazer as melhores dicas para maximizar os seus retornos.',
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
