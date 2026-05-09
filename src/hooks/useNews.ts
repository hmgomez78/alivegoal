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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e pré-visualizações — 09/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'RESULTADOS DE ONTEM: Dortmund 1-1 Frankfurt, Levante 3-2 Osasuna — Etta Eyong herói!',
      excerpt: 'Noite de drama na Bundesliga e La Liga! Dortmund empatou 1-1 com Frankfurt (Guirassy marcou) e garantiu o 2º lugar. Em Espanha, Levante venceu o Osasuna 3-2 com um golo tardio de Karl Etta Eyong após 6 meses sem marcar — golos dramáticos que mantêm o Levante na luta pela sobrevivência. Celta Vigo 0-0 Getafe.',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE TÁTICA: Liverpool vs Chelsea — Slot vs Maresca, batalha de sistemas no Anfield',
      excerpt: 'Liverpool recebe o Chelsea hoje às 08h30. Arne Slot usa um 4-3-3 compacto com Gravenberch como pivot. Maresca responde com um 4-2-2-2 ofensivo. Alexander Isak pode regressar. Liverpool ganhou 8 dos últimos 10 em casa. Chelsea marcou em todos os últimos 7 jogos fora. Jogo de golos garantidos — BTTS @1.70 é a aposta certa.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS PREMIER LEAGUE: Liverpool vs Chelsea e Sunderland vs Man United — Apostas de Hoje',
      excerpt: 'BET 1: Liverpool Vence @1.55 (Anfield é fortaleza — 8 vitórias nos últimos 10) | BET 2: Man United Vence em Sunderland @2.10 (United garantiu Champions, motivado para terminar forte) | BET 3: Mais de 2.5 Golos Liverpool vs Chelsea @1.75. Acumulador: Liverpool Vence + Over 2.5 = odd @2.71!',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS BUNDESLIGA: Wolfsburg vs Bayern Munich — Última Jornada em Casa do Bayern',
      excerpt: 'Bayern joga em Wolfsburg hoje às 23h30. Wolfsburg está na zona de descida (3º de baixo). Bayern ganhou 7 jogos seguidos contra o Wolfsburg incluindo 8-1 na 1ª volta. Harry Kane lidera os marcadores com 7 golos nos últimos 10 jogos. BET PRINCIPAL: Bayern Vence @1.64 (Confiança 78%). Resultado previsto: 0-2.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'FINAL DA EUROPA LEAGUE: Aston Villa vs Freiburg — Tudo o que Precisas de Saber',
      excerpt: 'A final da UEFA Europa League 2025/26 será Aston Villa vs Freiburg! Primeira final europeia do Villa desde 1982. Emery tem 4 títulos na Europa League. Freiburg eliminou o Braga pelo agregado (4-3). Grifo marcou 5 golos na competição. A final realiza-se a 27 de maio no Estádio San Mamés, em Bilbau.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'GUIA: Lazio vs Inter de Milão Hoje — Análise e Tips para a Serie A',
      excerpt: 'Lazio recebe o Inter de Milão hoje às 13h00 na Serie A. Inter precisa de vencer para manter pressão no topo. Lazio ganhou os últimos 3 em casa. BET: Inter Vence @1.85 — Inter marcou em todos os últimos 8 jogos fora. Simone Inzaghi conhece o Olímpico de Roma como a palma da mão (ex-treinador da Lazio). Lautaro Martínez em forma.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatYesterday,
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
