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
  const clean = title.replace(/<[^>]*>/g, '').trim();
  
  const dramaticPrefixes = [
    'BOMBA: ', 'CHOQUE: ', 'INACREDITÁVEL: ', 'URGENTE: ', 
    'EXCLUSIVO: ', 'REVELAÇÃO: ', 'CAOS: ', 'HISTÓRICO: '
  ];
  
  if (clean.includes('!') || clean.includes('BREAKING') || clean.length > 80) {
    return clean.substring(0, 100);
  }
  
  if (Math.random() < 0.3) {
    const prefix = dramaticPrefixes[Math.floor(Math.random() * dramaticPrefixes.length)];
    return prefix + clean.substring(0, 80);
  }
  
  return clean.substring(0, 100);
}

function dramatizeExcerpt(text: string): string {
  const clean = text.replace(/<[^>]*>/g, '').trim();
  const shortened = clean.substring(0, 150);
  
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
  
  return CATEGORIES[Math.floor(Math.random() * 3)];
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

// Notícias de fallback — análises, tips e contexto — 04/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como José Mourinho vai transformar o Real Madrid',
      excerpt: 'Com a confirmação do regresso de José Mourinho ao Real Madrid, analisamos como o técnico português pretende revolucionar a equipa. As contratações de Konaté e Dumfries indicam uma aposta numa defesa sólida e laterais ofensivos. Conseguirá Mourinho replicar o sucesso da sua primeira passagem?',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O impacto do mandado de detenção de Brandon Aiyuk',
      excerpt: 'A emissão de um mandado de detenção para o jogador dos 49ers, Brandon Aiyuk, lança uma sombra sobre a NFL. Exploramos as possíveis consequências disciplinares e o impacto na sua carreira, relembrando casos semelhantes no passado e como as ligas lidam com problemas legais dos atletas.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: Éderson no Man Utd — A peça que faltava no meio-campo?',
      excerpt: 'A contratação de Éderson pela equipa de Old Trafford promete trazer mais dinamismo e agressividade ao meio-campo. Analisamos o perfil do médio brasileiro, a sua fantástica época na Atalanta e como ele pode complementar Bruno Fernandes e Kobbie Mainoo no sistema tático.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Preparação para o Mundial — Apostar em Amigáveis',
      excerpt: 'Os jogos de preparação para o Mundial 2026, como o Espanha vs Iraque e o França vs Costa do Marfim, são notoriamente difíceis de prever. Partilhamos estratégias para apostar nestes encontros, focando em mercados de golos e na gestão de expectativas face às habituais rotações de plantel.',
      category: 'TIPS DE APOSTAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: A chegada das seleções à América do Norte para o Mundial',
      excerpt: 'As seleções nacionais começam a aterrar nos EUA, Canadá e México para o Mundial 2026. Acompanhamos a chegada das equipas, os primeiros treinos de adaptação e o ambiente de festa que já se vive nas cidades anfitriãs. O maior torneio de sempre está prestes a começar!',
      category: 'ÚLTIMA HORA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: A estratégia do Bayern Munique no mercado de verão',
      excerpt: 'Com a contratação iminente de Ismael Saibari, o Bayern Munique demonstra uma abordagem cirúrgica ao mercado. Analisamos a política de transferências de Vincent Kompany e como o clube bávaro procura rejuvenescer o plantel sem cometer excessos financeiros, focando em talento provado e com margem de progressão.',
      category: 'TRANSFERÊNCIAS',
      readTime: '11 min',
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
