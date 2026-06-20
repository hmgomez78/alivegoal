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

// Notícias de fallback — análises, contexto e investigação — 20/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Alemanha vs Costa do Marfim — O duelo que pode definir o Grupo E do Mundial 2026',
      excerpt: 'A Alemanha de Julian Nagelsmann entra neste jogo com a obrigação de confirmar a liderança do Grupo E após a goleada por 7-1 ao Curaçau. A Costa do Marfim, que venceu o Equador por 1-0, é uma equipa perigosa com Haller, Zaha e Seri. Analisamos os sistemas táticos, os duelos individuais e os mercados de apostas mais interessantes para este confronto no BMO Field, Toronto.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE: Holanda vs Suécia — Batalha do Grupo F! Van Dijk vs Isak, o duelo de gigantes',
      excerpt: 'A Holanda empatou com o Japão (2-2) na estreia e precisa de vencer a Suécia, que goleou a Tunísia por 5-1. Alexander Isak, um dos melhores avançados do mundo, enfrenta a sólida defesa holandesa liderada por Van Dijk. Este jogo no NRG Stadium, Houston, pode ser o mais equilibrado do dia. Analisamos as estatísticas, o historial e as melhores apostas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: A guerra pelo Olise — Real Madrid vs Bayern, o negócio do verão que pode chegar aos €220M',
      excerpt: 'Michael Olise tornou-se o jogador mais cobiçado do mercado de verão. O Real Madrid está disposto a pagar 220 milhões de euros, mas o Bayern quer segurar o francês com um salário de 22 milhões por época. Analisamos o impacto desta transferência nos dois clubes, o que Olise ganharia em cada destino e porque este negócio pode redefinir o mercado de transferências europeu.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO: O declínio de Ronaldo no Mundial — 10 jogos sem remate enquadrado, Portugal em crise de identidade',
      excerpt: 'Os números são implacáveis: Cristiano Ronaldo não enquadrou um único remate em 10 jogos consecutivos de torneios internacionais. Portugal empatou com a RD Congo na estreia e o debate sobre o futuro do capitão é inevitável. Analisamos as estatísticas, o impacto psicológico na equipa e o que Roberto Martínez deve fazer contra o Uzbequistão para salvar o Mundial de Portugal.',
      category: 'ESCÂNDALO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Alemanha vs Costa do Marfim e Holanda vs Suécia — Análise completa dos jogos de hoje',
      excerpt: 'Dois jogos de alto nível no Dia 10 do Mundial 2026. A Alemanha tem obrigação de vencer a Costa do Marfim para confirmar a liderança do Grupo E. A Holanda precisa de uma vitória sobre a Suécia para não complicar a sua passagem. Analisamos as odds, as estatísticas de forma e os mercados mais rentáveis para apostar hoje nestes dois duelos europeus.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE: Brasil 3-0 Haiti — Ancelotti encontrou a fórmula? O que este resultado significa para o Grupo C',
      excerpt: 'O Brasil venceu o Haiti por 3-0 e aliviou a pressão após o empate com Marrocos. Matheus Cunha foi o herói, Vinicius Jr. marcou e Endrick estreou-se. Mas o Grupo C está ainda em aberto: Escócia lidera com 6 pontos e o Brasil precisa de vencer na última jornada. Analisamos o desempenho tático de Ancelotti, os pontos fortes e fracos que ficaram expostos e o que esperar do Brasil no mata-mata.',
      category: 'ANÁLISE TÁTICA',
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
