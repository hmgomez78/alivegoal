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

// Notícias de fallback — análises, contexto e investigação — 13/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Brasil vs Marrocos — Pode Ancelotti surpreender sem Neymar no seu primeiro Mundial?',
      excerpt: 'Carlo Ancelotti estreia-se como selecionador do Brasil num Mundial sem a sua maior estrela, Neymar, que está em dúvida para toda a fase de grupos. Marrocos, que chegou às meias-finais em 2022, é um adversário perigoso com uma defesa sólida e um contra-ataque letal. Analisamos o sistema tático de Ancelotti, como Vinícius Júnior e Raphinha podem fazer a diferença, e porque é que este jogo pode ser o mais imprevisível da fase de grupos do Mundial 2026.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O caso Negreira — Tudo o que precisa de saber sobre o maior escândalo do futebol espanhol',
      excerpt: 'O Barcelona pagou 7,5 milhões de euros ao vice-presidente do comité de árbitros espanhol ao longo de 17 anos. O Real Madrid preparou um dossier de 500 páginas para a UEFA. Florentino Pérez afirma que o Barça roubou títulos. O Barcelona processa Florentino por difamação. Um guia completo ao escândalo que está a destruir as relações entre os dois maiores clubes do mundo e que pode ter consequências históricas para o futebol espanhol.',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Lewandowski para a MLS — O fim de uma era ou o início de um novo capítulo?',
      excerpt: 'Robert Lewandowski, 37 anos, está a negociar com o Chicago Fire da MLS. O polaco, um dos maiores avançados da história do futebol, marcou 26 golos na última época no Barcelona. A MLS tem atraído cada vez mais estrelas no final de carreira, mas Lewandowski ainda está num nível competitivo elevado. Analisamos o impacto desta transferência na MLS, o legado de Lewandowski no futebol europeu e o que esperar desta nova aventura americana.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Qatar vs Suíça, Haiti vs Escócia e Austrália vs Turquia — Análise completa dos jogos de hoje',
      excerpt: 'Quatro jogos do Mundial 2026 hoje. A Suíça é favorita esmagadora contra o Qatar (-425), com o mercado de mais de 2.5 golos da Suíça a pagar +120. A Escócia regressa ao Mundial pela primeira vez desde 1998 e enfrenta o Haiti (-200). A Turquia é favorita contra a Austrália (-135). E o Brasil enfrenta Marrocos no jogo mais equilibrado do dia. Analisamos todos os mercados e apresentamos as melhores apostas para este sábado do Mundial.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Canadá 1-1 Bósnia — Cyle Larin salva os anfitriões com golo dramático no final!',
      excerpt: 'O Canadá evitou uma derrota histórica em Toronto graças a um golo de Cyle Larin no segundo tempo, que empatou o jogo a 1-1 contra a Bósnia-Herzegovina. Foi o primeiro ponto do Canadá na história dos Mundiais masculinos. O jogo foi marcado pela ausência de Alphonso Davies, que ficou no banco. A Bósnia tinha marcado primeiro e parecia a caminho de uma vitória surpreendente. O Canadá terá de melhorar muito para a próxima fase do Grupo B.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE: Mateus Fernandes — O médio português de 21 anos que vale 99 milhões de euros e quer seguir Bruno Fernandes',
      excerpt: 'Mateus Fernandes, o médio do West Ham de 21 anos, tornou-se um dos jogadores mais cobiçados do mercado de verão. O Manchester United quer agir rapidamente para o contratar por 99 milhões de euros, mas Arsenal e Real Madrid também estão interessados. Analisamos o perfil técnico de Mateus Fernandes, as suas estatísticas impressionantes na Premier League, e porque é que este jovem português pode ser o próximo grande médio do futebol mundial.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
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
