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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e pré-visualizações — 07/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Aston Villa vs Nottingham Forest — Como Emery pode chegar à final da Europa League',
      excerpt: 'Emery tem preparado um esquema de pressão alta para neutralizar o Forest. Villa tem 63% de posse média em casa e Watkins está em grande forma com 4 golos nos últimos 3 jogos. Análise completa das forças e fraquezas de ambas as equipas para a semi-final de hoje.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: 5 Apostas de Alta Confiança para os Jogos de Hoje — Europa League e Conference',
      excerpt: 'Aston Villa BTTS @1.75 | Crystal Palace Vence @1.55 | Freiburg Over 2.5 @1.85 | Al-Nassr Vence @1.70 | Platense vs Peñarol X2 @1.65. Análise detalhada de cada aposta com estatísticas e justificação. Acumulador total @8.20!',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'PRÉ-VISUALIZAÇÃO: Crystal Palace vs Shakhtar Donetsk — Palace a um passo da final da Conference League',
      excerpt: 'Crystal Palace entra com vantagem de 3-1 do primeiro jogo. Glasner tem o seu melhor 11 disponível. Eze e Olise são as grandes ameaças. O Shakhtar precisaria de um milagre para virar a elimnatória. Probabilidade de qualificação do Palace: 94%.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'COPA LIBERTADORES: Platense vs Peñarol — Análise e Palpites para a Fase de Grupos',
      excerpt: 'Peñarol é um dos grandes favoritos da Libertadores 2026. Com Forlan Jr. em grande forma e uma defesa sólida, os uruguaios têm 78% de probabilidade de pelo menos empatar. Over 1.5 golos é forte com odd @1.55. Análise completa dos últimos 5 confrontos diretos.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'COMO APOSTAR: Guia Completo sobre Mercados de Apostas na Europa League 2026',
      excerpt: 'Explicação detalhada dos mercados mais lucrativos na Europa League: BTTS, Over/Under, Handicap Asiático e Resultado Final. Estatísticas das semi-finais dos últimos 5 anos mostram que 73% dos jogos têm Over 2.5. Guia prático para apostadores de todos os níveis.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatYesterday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'SAUDI PRO LEAGUE: CR7 vs Benzema — A corrida ao título que o mundo está a seguir',
      excerpt: 'Ronaldo (Al-Nassr, 25 golos) vs Benzema (Al-Hilal, 21 golos). Al-Nassr lidera com 5 pontos de vantagem mas joga hoje contra o Al-Shabab. Se vencer, praticamente garante o título. Análise tática completa e palpites para o jogo de hoje às 18:00 GMT.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
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
