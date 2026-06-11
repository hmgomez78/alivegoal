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

// Notícias de fallback — análises, contexto e investigação — 11/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: México vs África do Sul — O jogo de abertura do maior Mundial de sempre',
      excerpt: 'O Estádio Azteca recebe hoje o jogo de abertura do Mundial 2026. O México, anfitrião, entra em campo com a pressão de uma nação inteira sobre os ombros. Analisamos as forças e fraquezas de ambas as equipas, a estratégia de Javier Aguirre para aproveitar o fator casa, e porque é que a África do Sul pode surpreender neste encontro histórico com 48 seleções.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'INVESTIGAÇÃO: A fraude nos bilhetes do Mundial 2026 — Como a FIFA enganou milhares de adeptos',
      excerpt: 'Quatro estados americanos abriram investigações criminais à FIFA por práticas enganosas na venda de bilhetes para o Mundial 2026. Adeptos que pagaram preços premium por lugares de Categoria 1 viram os seus assentos reclassificados sem aviso. Investigamos os bastidores desta fraude, as histórias das vítimas e o que pode acontecer à FIFA se for condenada.',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Arsenal vs Atlético — Quanto vale Julián Álvarez e quem pode pagar?',
      excerpt: 'Com o Real Madrid e o Barcelona fora da corrida por Julián Álvarez, o Arsenal emerge como o único clube com capacidade financeira para satisfazer as exigências do Atlético de Madrid. Analisamos os números do avançado argentino, o impacto que teria no projeto de Arteta, e se uma oferta próxima do recorde mundial faz sentido para os Gunners neste mercado de verão.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: México vs África do Sul — Análise e apostas para o jogo de abertura do Mundial',
      excerpt: 'O México joga em casa no Azteca, com um ambiente que pode ser decisivo. A África do Sul é uma equipa organizada e difícil de bater. Analisamos as odds, os mercados mais atrativos — incluindo resultado final, golos e handicaps — e apresentamos as nossas melhores sugestões para este jogo histórico que abre o maior torneio de futebol do mundo.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE MÉDICA: Lamine Yamal — Pode o prodígio de 18 anos jogar no Mundial com lesão?',
      excerpt: 'Lamine Yamal está "desesperado" para jogar no Mundial 2026, mas não atua desde 22 de abril devido a uma lesão no tendão. Especialistas em medicina desportiva analisam os riscos de uma utilização prematura, o tempo real de recuperação para este tipo de lesão, e como a Espanha pode adaptar o seu jogo se o maior talento da geração falhar o arranque do torneio.',
      category: 'LESÕES',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'CONTEXTO: O Mundial mais polémico da história — Vistos negados, bandeiras proibidas e investigações criminais',
      excerpt: 'O Mundial 2026 começa hoje num ambiente de enorme controvérsia. Árbitros e adeptos com vistos negados, o Irão a ameaçar boicotar jogos por causa de bandeiras LGBTQ+, investigações criminais à FIFA em quatro estados americanos, e protestos de adeptos mexicanos. Uma análise completa a todas as polémicas que ensombram o arranque do maior torneio de futebol de sempre.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
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
