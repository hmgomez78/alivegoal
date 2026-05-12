import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source?: string;
}

// Categorias de notícias com estilo dramático
const CATEGORIES = ['ÚLTIMA HORA', 'ANÁLISE TÁTICA', 'TIPS DE APOSTAS', 'TRANSFERÊNCIAS', 'LESÕES', 'ESCÂNDALO'];

// Buscar notícias de futebol trending via RSS feeds públicos
async function fetchTrendingNews(): Promise<NewsArticle[]> {
  const RSS_FEEDS = [
    'https://api.rss2json.com/v1/api.json?rss_url=https://www.marca.com/en/rss/football.xml&count=5',
    'https://api.rss2json.com/v1/api.json?rss_url=https://www.goal.com/feeds/en/news&count=5',
  ];

  const articles: NewsArticle[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const response = await fetch(feedUrl);
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.status === 'ok' && data.items) {
        for (const item of data.items.slice(0, 3)) {
          articles.push({
            id: articles.length + 1,
            title: dramatizeTitle(item.title || ''),
            excerpt: dramatizeExcerpt(item.description || item.title || ''),
            category: assignCategory(item.title || '', item.categories || []),
            readTime: `${Math.floor(Math.random() * 6) + 3} min`,
            date: formatDate(item.pubDate || new Date().toISOString()),
            source: item.author || extractDomain(feedUrl),
          });
        }
      }
    } catch (error) {
      console.warn('Error fetching RSS feed:', error);
    }
  }

  return articles;
}

// Tornar os títulos mais dramáticos e impactantes
function dramatizeTitle(title: string): string {
  // Remove HTML tags
  const clean = title.replace(/<[^>]*>/g, '').trim();
  
  // Adicionar drama se o título for muito neutro
  const dramaticPrefixes = [
    'BOMBA: ', 'CHOQUE: ', 'INACREDITÁVEL: ', 'URGENTE: ', 
    'EXCLUSIVO: ', 'REVELAÇÃO: ', 'CAOS: ', 'HISTÓRICO: '
  ];
  
  // Se o título já tem impacto, manter
  if (clean.includes('!') || clean.includes('BREAKING') || clean.length > 80) {
    return clean.substring(0, 100);
  }
  
  // Adicionar prefixo dramático aleatório (30% das vezes)
  if (Math.random() < 0.3) {
    const prefix = dramaticPrefixes[Math.floor(Math.random() * dramaticPrefixes.length)];
    return prefix + clean.substring(0, 80);
  }
  
  return clean.substring(0, 100);
}

function dramatizeExcerpt(text: string): string {
  // Remove HTML tags and limit length
  const clean = text.replace(/<[^>]*>/g, '').trim();
  const shortened = clean.substring(0, 150);
  
  // Adicionar frases de impacto no final
  const endings = [
    '... O mundo do futebol está em choque!',
    '... Ninguém esperava isto!',
    '... As odds dispararam!',
    '... Isto muda tudo!',
    '... Os adeptos não acreditam!',
    '... Impacto direto nas apostas!',
  ];
  
  if (shortened.length > 50) {
    const ending = endings[Math.floor(Math.random() * endings.length)];
    return shortened.substring(0, 120) + ending;
  }
  
  return shortened + '...';
}

function assignCategory(title: string, categories: string[]): string {
  const titleLower = title.toLowerCase();
  const catStr = categories.join(' ').toLowerCase();
  
  if (titleLower.includes('transfer') || titleLower.includes('sign') || titleLower.includes('deal')) {
    return 'TRANSFERÊNCIAS';
  }
  if (titleLower.includes('injur') || titleLower.includes('lesão') || titleLower.includes('out')) {
    return 'LESÕES';
  }
  if (titleLower.includes('tactic') || titleLower.includes('formation') || titleLower.includes('analysis')) {
    return 'ANÁLISE TÁTICA';
  }
  if (titleLower.includes('bet') || titleLower.includes('odds') || titleLower.includes('tip')) {
    return 'TIPS DE APOSTAS';
  }
  if (titleLower.includes('scandal') || titleLower.includes('ban') || titleLower.includes('suspend')) {
    return 'ESCÂNDALO';
  }
  
  return CATEGORIES[Math.floor(Math.random() * 3)]; // ÚLTIMA HORA, ANÁLISE TÁTICA, ou TIPS
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Agora mesmo';
    if (diffHours < 24) return `Há ${diffHours}h`;
    if (diffHours < 48) return 'Ontem';
    
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return 'Hoje';
  }
}

function extractDomain(url: string): string {
  try {
    const match = url.match(/rss_url=https?:\/\/(?:www\.)?([^/]+)/);
    return match ? match[1] : 'AliveGoal';
  } catch {
    return 'AliveGoal';
  }
}

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e resultados — 12/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'TIPS LA LIGA: Betis vs Elche — Luta pela Champions League!',
      excerpt: 'O Betis recebe o Elche (pior equipa a jogar fora) e precisa de vencer para garantir a Champions League. O Betis é uma das melhores equipas em casa. BET 501: Betis Vence @1.57. Aposta de alto valor para esta terça-feira na jornada 36 da La Liga.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS LA LIGA: Villarreal vs Sevilla — Submarino Amarelo rumo ao pódio',
      excerpt: 'O Villarreal já garantiu a Champions, mas quer o 3º lugar. Recebe um Sevilla que tem tido muitas dificuldades fora de casa (10 derrotas). O Villarreal é a 2ª melhor equipa a jogar em casa. BET 502: Villarreal Vence @2.05. Excelente odd para o jogo de quarta-feira!',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS LA LIGA: Alavés vs Barcelona — Campeões em festa, mas com golos?',
      excerpt: 'O Barcelona já é campeão e visita o Alavés, que luta pela sobrevivência. O Barça marcou em todos os jogos da liga, e o Alavés precisa de pontuar. BET 503: Total de Golos 1-4 e Barça marca 1-3 golos @1.57. Aposta combinada interessante para quarta-feira.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS LA LIGA: Osasuna vs Atlético Madrid — Colchoneros em crise fora de portas',
      excerpt: 'O Atlético Madrid viaja até Pamplona após desilusão europeia. O Osasuna é forte em casa e luta pela Europa. O Atlético tem sido inconstante fora (7 derrotas). BET 504: Osasuna Vence ou Empata (1X) @1.40. Aposta segura para terça-feira.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS LA LIGA: Real Madrid vs Oviedo — Regresso ao Bernabéu após o Clásico',
      excerpt: 'O Real Madrid recebe o Oviedo (já despromovido) após a perda do título. O ambiente será tenso, mas a diferença de qualidade é enorme. O Real marcou 1-4 golos em 11 dos últimos 14 jogos em casa. BET 505: Real Madrid Vence e Total de Golos 1-4 @1.40.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS LA LIGA: Celta de Vigo vs Levante — Galegos favoritos em casa',
      excerpt: 'O Celta luta pela Europa e recebe um Levante que não vence fora desde janeiro. O Celta vem de vitórias importantes. BET 506: Celta de Vigo Vence @1.70. Uma das melhores apostas simples para a jornada 36 da La Liga.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
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
        // Misturar trending com fallback
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
