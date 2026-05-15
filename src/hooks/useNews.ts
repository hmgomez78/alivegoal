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

// Notícias de fallback — análises, tips e contexto — 15/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE JURÍDICA: O que pode acontecer ao Southampton no "Spygate" — expulsão, dedução de pontos ou multa?',
      excerpt: 'Com a EFL a marcar uma audiência disciplinar para antes de 19 de maio, analisamos os cenários possíveis para o Southampton. Especialistas em direito desportivo explicam que a expulsão da final é possível mas improvavél, sendo mais provável uma multa pesada e dedução de pontos. O impacto nas odds da final Hull City vs Southampton é imediato e significativo para os apostadores.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: Aston Villa vs Liverpool — Análise tática e as melhores apostas para esta sexta-feira',
      excerpt: 'O duelo de Villa Park é o jogo mais importante da jornada da Premier League. O Liverpool precisa de vencer para manter as esperanças no Top 4, enquanto o Villa quer consolidar o seu lugar europeu. Analisamos as estatísticas, o historial recente e identificamos as apostas com maior valor: ambas as equipas a marcar (1.75) e Liverpool vence (7/5) são as nossas picks.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Xabi Alonso no Chelsea — O "Gegenpress" pode transformar os Blues em candidatos ao título?',
      excerpt: 'Se Xabi Alonso assinar pelo Chelsea, como será o seu sistema tático? Analisamos o "Gegenpress" que Alonso implementou no Bayer Leverkusen e no Real Madrid, e como pode encaixar no plantel atual dos Blues. Com £160M para gastar, quem serão os alvos prioritários e pode o Chelsea lutar pelo título da Premier League na próxima temporada?',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Viktor Gyökeres — Por que o United e o Arsenal estão dispostos a pagar €80M pelo sueco',
      excerpt: 'Com 80 golos em 7 temporadas, Viktor Gyökeres é o avançado mais cobiçado da Europa. Analisamos as suas estatísticas avançadas, o seu impacto no Sporting CP e porque Ruben Amorim o considera essencial para o projeto do Manchester United. O Arsenal também quer o jogador — quem tem mais argumentos financeiros e desportivos para o convencer?',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'CRISE NO BERNABÉU: O que está por detrás das vaias a Mbappé e Vinicius — e o que isto significa para o futuro do Real Madrid',
      excerpt: 'Os adeptos do Real Madrid vaiaram Mbappé e Vinicius Júnior no próprio Bernabéu. Florentino Pérez foi filmado a discutir com adeptos. O que está por detrás desta crise? Analisamos as causas do descontentamento, o impacto no balneário e o que pode mudar no Real Madrid na próxima temporada. Mbappé pode sair já no verão?',
      category: 'ESCÂNDALO',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Mundial 2026 — As odds a longo prazo e os favoritos à vitória final com o torneio a 6 semanas',
      excerpt: 'Com o Mundial 2026 a apenas 6 semanas de distância, as casas de apostas já definiram os favoritos. Analisamos as odds para a conquista do troféu nos EUA, México e Canadá. Brasil e França lideram, mas Portugal e Espanha são os dark horses com maior valor. Onde estão as melhores apostas antecipadas para o maior torneio de futebol do mundo?',
      category: 'TIPS DE APOSTAS',
      readTime: '9 min',
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
