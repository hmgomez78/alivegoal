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

// Notícias de fallback — análises, contexto e investigação — 04/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '04/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como Argentina Sobreviveu ao Susto — O Que Correu Mal e o Que Salvou Messi',
      excerpt: 'Argentina venceu Cabo Verde 3-2 em prolongamento num jogo que ninguém esperava tão dramático. Analisamos os erros defensivos que permitiram a Cabo Verde empatar duas vezes, a decisão de Scaloni de manter Messi em campo durante todo o prolongamento, e como o capitão argentino decidiu o jogo com um golo no minuto 117. A Argentina mostrou vulnerabilidades que o Brasil, a França ou a Espanha vão certamente explorar. Uma análise detalhada de um jogo que revelou muito sobre os limites dos campeões do mundo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O Caso Senegal em Detalhe — Festas, Assédio e um Treinador Sem Contrato',
      excerpt: 'O escândalo da seleção do Senegal no Mundial 2026 é um dos mais chocantes da história do futebol africano. Investigamos cada detalhe: as festas privadas com álcool enquanto os jogadores se preparavam, as acusações de assédio sexual ao chef da equipa, o treinador Pape Thiaw que não tinha contrato válido horas antes de um jogo do Mundial, e a retirada do capitão Pape Gueye. Comparamos com outros escândalos históricos de seleções em Mundiais e analisamos o impacto no futuro do futebol senegalês.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Canadá vs Marrocos e Paraguai vs França — As Nossas Picks para os Oitavos',
      excerpt: 'Os oitavos de final do Mundial 2026 arrancam hoje com dois jogos de enorme interesse para apostadores. Canadá vs Marrocos (18:00 UTC) é um jogo muito equilibrado — Marrocos tem a defesa mais sólida do torneio mas o Canadá joga em casa (Houston). Paraguai vs França (22:00 UTC): a França é favorita a -250 mas o Paraguai eliminou a Alemanha e pode surpreender. Análise completa com estatísticas, forma recente, odds e as nossas recomendações de apostas para cada jogo.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Tonali para o Tottenham — O Que Muda na Premier League e no Newcastle',
      excerpt: 'A transferência de Sandro Tonali para o Tottenham por £100 milhões é um dos movimentos mais impactantes do mercado de verão. Analisamos o impacto desta contratação no Tottenham de Roberto De Zerbi (que já contratou Mateus Fernandes por €98M), como o Newcastle planeia reinvestir os £100 milhões, e o que isto significa para o equilíbrio de forças na Premier League. O Tottenham está a construir um plantel de elite — mas será suficiente para competir pelo título com o City, Arsenal e Liverpool?',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Klopp de Regresso — O Que Esperar do Treinador Mais Carismático do Futebol Mundial',
      excerpt: 'Jürgen Klopp está em negociações para assumir o comando da seleção alemã após a demissão de Nagelsmann. Se o acordo se concretizar, será o regresso mais aguardado ao futebol mundial. Analisamos o que Klopp pode trazer à Mannschaft, os desafios de treinar uma seleção nacional versus um clube, e como a Alemanha pode reconstruir-se para o Euro 2028 e o Mundial 2030. Com Klopp, a Alemanha voltaria a ter uma identidade clara e um futebol agressivo e vertical que os adeptos adoram.',
      category: 'ÚLTIMA HORA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: Paraguai vs França — Como os Sul-Americanos Podem Surpreender os Campeões Europeus',
      excerpt: 'O Paraguai eliminou a Alemanha nos penáltis e agora enfrenta a França nos oitavos de final do Mundial 2026. Parece um jogo fácil para os franceses, mas o Paraguai tem uma organização defensiva excecional e pode jogar pelos contra-ataques. Analisamos o esquema tático do Paraguai, as fraquezas da França que podem ser exploradas, e os cenários em que uma surpresa é possível. A França tem Mbappé, Griezmann e Dembélé, mas o Paraguai tem organização, garra e a memória recente de ter eliminado a Alemanha.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
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
