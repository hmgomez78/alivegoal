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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e resultados — 12/05/2026 (Noite)
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE: O impacto do escândalo das "Escort Parties" no balneário do AC Milan',
      excerpt: 'Com Theo Hernández e outras estrelas do Milan envolvidas num escândalo de festas ilegais e "gás do riso", analisamos como esta crise pode destruir a estabilidade da equipa. A direção promete sanções pesadas, e o impacto no rendimento desportivo na reta final da Serie A pode ser devastador.',
      category: 'ESCÂNDALO',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O "Spygate" do Southampton e as consequências nos Playoffs',
      excerpt: 'O Southampton foi acusado de espiar os treinos do Middlesbrough antes da meia-final dos playoffs do Championship. Com a ameaça de expulsão a pairar, analisamos os precedentes legais na EFL e como este caso pode alterar completamente a luta pela subida à Premier League.',
      category: 'ESCÂNDALO',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE TÁTICA: A coragem de Lamine Yamal e o significado da bandeira da Palestina',
      excerpt: 'O gesto de Lamine Yamal durante o desfile do Barcelona gerou controvérsia global. Analisamos o impacto político e social da atitude do jovem talento, a reação do clube e como o ativismo dos jogadores está a moldar a imagem do futebol moderno.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS CHAMPIONS LEAGUE: Como a lesão de Ben White muda as odds da final',
      excerpt: 'A ausência confirmada de Ben White na final da Champions League é um golpe duro para o Arsenal. Analisamos como esta lesão afeta as dinâmicas defensivas dos Gunners e como as casas de apostas estão a ajustar as odds a favor do PSG de Luis Enrique.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE TÁTICA: O que Xabi Alonso pode trazer ao Chelsea',
      excerpt: 'Com Xabi Alonso apontado como o favorito para assumir o Chelsea, analisamos o estilo de jogo do treinador espanhol. Como o seu sistema de posse e pressão alta se encaixaria no plantel dos Blues e quais os jogadores que mais beneficiariam com a sua chegada.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS SAUDI PRO LEAGUE: Al Nassr vs Al Hilal e o impacto da exaustão de Ronaldo',
      excerpt: 'A revelação de que Cristiano Ronaldo vomitou de exaustão após o último jogo levanta dúvidas sobre a sua condição física para o clássico contra o Al Hilal. Analisamos as odds para o jogo e se o Al Nassr tem capacidade para vencer sem o seu capitão a 100%.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
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
