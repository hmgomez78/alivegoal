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

// Notícias de fallback — análises, contexto e investigação — 07/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '07/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O Fim de uma Era — Ronaldo Despede-se do Mundial com Derrota para Espanha',
      excerpt: 'Uma noite de emoções em Dallas. Cristiano Ronaldo, 41 anos, disputou o seu último jogo num Mundial e saiu de campo sem marcar, com Portugal a perder 0-1 para Espanha graças ao golo de Mikel Merino no primeiro minuto de descontos. Analisamos a prestação do capitão português, a frieza tática de Luis de la Fuente, e o que esta derrota significa para o futuro da seleção das Quinas. Portugal terá de reconstruir sem o seu maior ídolo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Bélgica Humilha EUA (4-1) — A Interferência de Trump na FIFA Saiu pela Culatra',
      excerpt: 'A polémica reversão da suspensão de Balogun pela FIFA, que até mereceu agradecimentos do Presidente Trump, tornou-se num escândalo ainda maior quando a Bélgica goleou os EUA por 4-1 em Seattle. A interferência política na decisão da FIFA gerou indignação internacional. Os Red Devils avançam para os Quartos de Final e os EUA saem do torneio que organizaram com uma humilhação histórica. Investigamos os bastidores desta decisão sem precedentes.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Argentina vs Egito e Suíça vs Colômbia — Análise e Previsões',
      excerpt: 'Dois grandes jogos hoje nos Oitavos de Final do Mundial 2026. Argentina vs Egito (16:00 UTC): Messi e companhia são favoritos claros, mas Salah pode surpreender. Recomendamos Argentina Vence e Messi Marca a Qualquer Momento. Suíça vs Colômbia (20:00 UTC): um jogo muito equilibrado onde apostamos em Menos de 2.5 Golos e Suíça Dupla Hipótese. Leia a nossa análise completa com estatísticas e odds reais.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: De Zerbi Transforma os Spurs — £237M Gastos e Mais Reforços a Caminho',
      excerpt: 'Roberto De Zerbi está a revolucionar o Tottenham Hotspur! Após assinar Sandro Tonali por £100M (recorde do clube), os Spurs já gastaram mais de £237 milhões neste verão. O treinador italiano explora ainda Rafael Leão (AC Milan) e Savinho (Man City) para reforçar os flancos. Analisamos a estratégia de De Zerbi, o estilo de jogo que quer implementar e se o Tottenham pode finalmente competir pelos títulos na temporada 2026/27.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE: Espanha — A Equipa Mais Dominante do Mundial 2026 Sem Sofrer Golos',
      excerpt: 'A Espanha é simplesmente imparável! Após eliminar Portugal com um golo de Merino no último minuto, a La Roja mantém a sua folha de zeros no torneio — nenhum golo sofrido em todos os jogos. Com Lamine Yamal, Pedri, Rodri e Dani Olmo a brilhar, analisamos porque a Espanha é a grande favorita ao título e como Espanha vs Bélgica nos Quartos de Final pode ser o jogo do torneio. A defesa espanhola é uma muralha.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Liverpool Quer Thuram da Juventus por £39M — Corrida com Man United',
      excerpt: 'O Liverpool identificou Khephren Thuram, médio francês da Juventus, como o seu alvo principal para o verão. A Juve está disposta a vender por entre £35M e £39M para equilibrar as contas. O Manchester United também está interessado, criando uma corrida entre os dois gigantes ingleses. Analisamos o perfil de Thuram, como se encaixaria no sistema de Arne Slot no Liverpool, e o impacto desta contratação na luta pelo título da Premier League.',
      category: 'TRANSFERÊNCIAS',
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
