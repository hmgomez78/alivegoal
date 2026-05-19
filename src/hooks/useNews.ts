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

// Notícias de fallback — análises, tips e contexto — 19/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O impacto da saída de Pep Guardiola no Manchester City e o que Enzo Maresca trará de novo',
      excerpt: 'A saída de Pep Guardiola marca o fim de uma era dourada no Manchester City. Analisamos o legado tático deixado pelo catalão e como Enzo Maresca, o seu sucessor, poderá adaptar a equipa. Maresca, que já trabalhou com Guardiola, tem uma filosofia semelhante, mas com nuances próprias. Será que o City conseguirá manter a hegemonia na Premier League sem o seu mestre?',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: Bournemouth vs Manchester City — Análise detalhada e as melhores odds para o jogo decisivo',
      excerpt: 'O Manchester City visita o Bournemouth num jogo crucial para as aspirações de título. Analisamos as estatísticas recentes, o histórico de confrontos e a forma das equipas. O City precisa de vencer, mas o Bournemouth tem sido uma surpresa. Descubra as nossas picks de valor, incluindo o mercado de golos e handicaps, para maximizar os seus lucros neste embate da Premier League.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ESPECIAL COPA DO MUNDO 2026: O regresso de Neymar e as opções de Carlo Ancelotti para a Seleção Brasileira',
      excerpt: 'A convocatória de Neymar por Carlo Ancelotti para a Copa do Mundo de 2026 surpreendeu muitos, mas faz sentido taticamente? Analisamos o papel que Neymar poderá desempenhar no esquema de Ancelotti, a sua condição física e como a sua presença afeta a dinâmica da equipa. O Brasil procura o Hexa e a experiência de Neymar pode ser o fator X.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: O mercado de verão do Real Madrid com Mourinho — Quem entra e quem sai do Bernabéu?',
      excerpt: 'Com o regresso de José Mourinho ao Real Madrid, espera-se uma revolução no plantel. Analisamos os alvos prioritários do técnico português, os jogadores que poderão estar de saída e como o clube irá financiar estas movimentações. Mourinho terá exigido controlo total, o que significa que nomes surpreendentes poderão chegar à capital espanhola.',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Chelsea vs Tottenham — O dérbi londrino que pode decidir o futuro europeu de ambas as equipas',
      excerpt: 'Chelsea e Tottenham defrontam-se num dérbi de alta tensão. Ambas as equipas precisam de pontos para garantir a qualificação europeia. Analisamos as fraquezas defensivas do Chelsea e a inconsistência do Tottenham. Apresentamos as melhores apostas para este jogo, com foco no mercado de cantos, cartões e ambas as equipas marcam.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ESCÂNDALO: As repercussões do caso de apostas no Texas Tech e o impacto no desporto universitário',
      excerpt: 'O caso do quarterback Brendan Sorsby, suspenso por envolvimento em apostas desportivas, levanta questões sérias sobre a integridade no desporto universitário. Analisamos as regras da NCAA, as possíveis consequências legais do processo movido por Sorsby e como as universidades estão a lidar com a crescente legalização das apostas desportivas nos EUA.',
      category: 'ESCÂNDALO',
      readTime: '7 min',
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
