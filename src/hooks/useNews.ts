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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e resultados — 11/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'TIPS LIGA PORTUGAL: Benfica vs Braga e Rio Ave vs Sporting — Análise e Prognósticos!',
      excerpt: 'Liga Portugal em destaque hoje! Benfica (Mourinho) recebe o Braga na luta pelo 2º lugar. BET 209: Benfica Vence @1.39 (80% confiança). BET 210: BTTS @1.80 (82% confiança). BET 211: Over 2.5 @1.65. Em paralelo, Rio Ave vs Sporting CP — Gyökeres quer mais golos. BET 212: Sporting Vence @1.55. Todos os jogos às 19:15!',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'RESULTADOS DE ONTEM: Barcelona CAMPEÃO, Milan 2-3 Atalanta, Arsenal 1-0 West Ham!',
      excerpt: 'Domingo histórico no futebol europeu! Barcelona campeão da La Liga. Atalanta surpreende o Milan em San Siro. Arsenal venceu o West Ham por 1-0 com golo de Saka e consolida o 2º lugar na Premier League. Wolfsburg 0-2 Bayern Munich — Kane decisivo. Resultados completos no site.',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: formatYesterday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'FINAL DA CHAMPIONS LEAGUE: PSG vs Arsenal a 30 de Maio em Budapeste!',
      excerpt: 'A final da UEFA Champions League 2025/26 está confirmada: PSG vs Arsenal a 30 de maio no Puskás Aréna, Budapeste. PSG eliminou o Bayern Munich 6-5 no agregado. Arsenal eliminou o Inter de Milão. Primeira final europeia do Arsenal desde 2006. Odds: PSG @2.10, Arsenal @1.75. Análise tática completa disponível!',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'BENFICA vs BRAGA: Mourinho precisa de vencer para garantir a Champions League!',
      excerpt: 'José Mourinho enfrenta o Braga numa batalha crucial pelo 2º lugar e a qualificação para a Champions League. Benfica está invicto há 47 jogos na Liga Portugal. Braga vem de derrota pesada na Europa League. Pavlidis com 24 golos na época. Benfica venceu 8 dos últimos 9 jogos em casa. Jogo às 19:15 no Estádio da Luz.',
      category: 'PRÉ-JOGO',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'FINAL DA EUROPA LEAGUE: Aston Villa vs Freiburg — 27 de Maio em Bilbau!',
      excerpt: 'A final da UEFA Europa League 2025/26 está confirmada: Aston Villa vs Freiburg a 27 de maio no Estádio San Mamés, Bilbau. Primeira final europeia do Villa desde 1982. Emery tem 4 títulos na Europa League. Freiburg eliminou o Braga 4-3 no agregado. Odds: Villa @1.85, Freiburg @2.10.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: formatYesterday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TOTTENHAM vs LEEDS: Spurs em casa com Son e Maddison em forma — Tips e Análise!',
      excerpt: 'Tottenham recebe o Leeds United às 19:00 na Premier League. Spurs em casa: 9 vitórias em 13 jogos. Leeds recém-promovido da Championship com a pior defesa dos promovidos (62 golos sofridos). BET 214: Tottenham Vence @1.72. BET 215: Over 2.5 Golos @1.85. Son e Maddison são as ameaças principais.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
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
