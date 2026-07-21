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
      title: 'ANÁLISE: A Investigação da FIFA e o Futuro da Argentina Pós-Mundial',
      excerpt: 'A abertura de uma investigação disciplinar da FIFA contra a Argentina levanta questões sérias sobre o futuro da seleção albiceleste. Paredes, Molina e o adjunto Ayala enfrentam potenciais suspensões. Analisamos o impacto que estas sanções podem ter na preparação da Argentina para a próxima Copa América e como Scaloni vai gerir a situação internamente.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'BASTIDORES: Klopp na Alemanha — O Desafio de Reconstruir a "Mannschaft"',
      excerpt: 'Jürgen Klopp regressa ao futebol alemão com uma missão clara: restaurar o prestígio de uma seleção que saiu cedo no Mundial 2026. Com o Euro 2028 e o Mundial 2030 no horizonte, Klopp terá de construir uma equipa em torno de talentos como Florian Wirtz e Jamal Musiala. Analisamos os desafios táticos e geracionais que o aguardam.',
      category: 'BASTIDORES',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: "MERCADO: Arsenal em Modo de Emergência — Tzolis Confirmado, Stones e Diomande na Mira",
      excerpt: 'Com a lesão de Saliba e a perda de Morgan Rogers para o Chelsea, o Arsenal está a operar em modo de emergência no mercado. Christos Tzolis foi confirmado por €40M, John Stones pode chegar como free transfer e Yan Diomande surge como grande oportunidade após o PSG desistir da corrida. Mikel Arteta tem trabalho pela frente para montar um plantel competitivo.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'CHAMPIONS LEAGUE: Fenerbahce e Sturm Graz Abrem a 2ª Ronda de Qualificação Hoje',
      excerpt: 'A segunda ronda de qualificação da Liga dos Campeões 2026/27 arranca hoje com duelos apetitosos. O Fenerbahce recebe o Gornik Zabrze em Istambul, enquanto o Sturm Graz enfrenta o Hearts em Graz. Também em destaque: Ararat Armenia vs Shamrock Rovers, AGF vs Lech Poznan e Larne vs Red Star Belgrade. Analisamos os favoritos e os possíveis azarões.',
      category: 'LIGA DOS CAMPEÕES',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'SUL-AMERICANA: Santos e Nacional-URU Abrem os Playoffs Esta Noite',
      excerpt: 'A Copa Sul-Americana regressa com os playoffs de ida. O Santos visita o Universidad Central na Venezuela (21h30), enquanto o Nacional-URU recebe o Tigre-ARG (19h00). Quatro clubes brasileiros estão em campo esta semana: Santos, Vasco, Bragantino e Grêmio. Atlético-MG, Botafogo e São Paulo já aguardam nas oitavas. Analisamos as chaves e os favoritos.',
      category: 'SUL-AMERICANA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Champions League Qualifying e Brasileirão — As Melhores Apostas de Hoje',
      excerpt: 'Com a Champions League qualifying a arrancar e o Brasileirão a continuar, há valor real nas apostas de hoje. O Fenerbahce em casa contra o Gornik Zabrze é uma das apostas mais sólidas da noite europeia. No Brasil, o Atlético-MG recebe o Bahia num duelo de alto nível. Analisamos os mercados com melhor relação risco/recompensa para 21 de julho.',
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
