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

// Notícias de fallback — análises, contexto e investigação — 29/06/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '29/06/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Eustáquio Herói — O meio-campo do Canadá e a estreia de Alphonso Davies',
      excerpt: 'O golo dramático de Stephen Eustáquio aos 92 minutos fez história para o Canadá. Mas a grande história da vitória por 1-0 sobre a África do Sul foi o domínio tático no meio-campo. Analisamos como Jesse Marsch construiu um Canadá sólido e perigoso, o impacto da entrada de Alphonso Davies aos 75 minutos, e por que a equipa norte-americana pode surpreender Holanda ou Marrocos nos oitavos de final.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Golo Anulado à Colômbia no último minuto frente a Portugal gera revolta',
      excerpt: 'Davinson Sánchez marcou o que seria o golo da vitória da Colômbia no último minuto contra Portugal, mas o VAR anulou o lance por um fora de jogo milimétrico. A decisão está a gerar enorme revolta nas redes sociais e na imprensa sul-americana. Analisamos as imagens do VAR, a exibição cinzenta de Portugal e as implicações deste empate que atirou Portugal para o segundo lugar do grupo.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Brasil vs Japão e Alemanha vs Paraguai — Onde está o valor nos oitavos?',
      excerpt: 'O Mundial 2026 entra nos oitavos de final com jogos emocionantes! O Brasil defronta o Japão e a Alemanha enfrenta o Paraguai. Analisamos as odds, estatísticas, lesões e H2H. Recomendamos apostar na vitória do Brasil (@1.45) e em Alemanha Vence & Mais de 1.5 Golos (@1.65). O acumulador do dia (Brasil + Alemanha) paga @2.39!',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: A Revolução do Real Madrid — Cucurella, Bernardo Silva, Konaté e Dumfries!',
      excerpt: 'O Real Madrid confirmou quatro contratações de luxo antes do início de julho: Marc Cucurella (€55M), Bernardo Silva (Custo Zero), Ibrahima Konaté e Denzel Dumfries. Analisamos como Carlo Ancelotti vai encaixar estas estrelas com Kylian Mbappé, Vini Jr e Bellingham. Será este o melhor plantel da história recente do futebol europeu?',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Inglaterra vence Panamá mas não convence — Bellingham e Kane resolvem',
      excerpt: 'A Inglaterra garantiu o primeiro lugar do grupo com uma vitória por 2-0 sobre o Panamá, mas a exibição voltou a desiludir os adeptos. Jude Bellingham abriu o marcador e Harry Kane fez história com o seu 11º golo em Mundiais. Analisamos a pressão sobre Thomas Tuchel e por que a equipa precisa de melhorar drasticamente para o jogo dos oitavos contra a RD Congo.',
      category: 'ÚLTIMA HORA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'LESÕES: Rotura de ligamentos para Ugarte — Manchester United em crise no mercado',
      excerpt: 'O Manchester United confirmou o pior cenário: Manuel Ugarte sofreu uma rotura de ligamentos no joelho esquerdo. Esta lesão grave afasta o médio dos relvados por vários meses e arruína a sua transferência iminente. Analisamos o impacto financeiro para o United e as alternativas de urgência que o clube terá de procurar no mercado de verão.',
      category: 'LESÕES',
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
