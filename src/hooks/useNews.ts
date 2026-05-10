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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e pré-visualizações — 10/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'RESULTADOS DE ONTEM: Liverpool 1-0 Chelsea, Sunderland 0-2 Man United, Wolfsburg 0-3 Bayern!',
      excerpt: 'Sábado de grandes resultados! Gravenberch decidiu o Liverpool vs Chelsea com um golo ao minuto 6. Man United goleou o Sunderland 2-0 com golos de Rashford e Fernandes. Bayern Munich destruiu o Wolfsburg 3-0 com hat-trick de Harry Kane. Lazio 0-3 Inter de Milão — Lautaro marcou duas vezes. Udinese 1-2 Juventus.',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE TÁTICA: Barcelona vs Real Madrid — O El Clásico que pode dar o título ao Barça HOJE!',
      excerpt: 'Barcelona (WWWWW) recebe o Real Madrid (DLWDW) às 21:00 no Camp Nou. Flick usa um 4-3-3 com Yamal e Raphinha nas alas. Arbeloa responde com 4-4-2. Mbappé em dúvida por lesão muscular. Barça marcou 18 golos nos últimos 5 jogos em casa. Real Madrid chega em crise interna (escândalo Valverde/Tchouameni). BET: Barcelona Vence @1.75.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS LA LIGA: Barcelona vs Real Madrid — 3 Apostas para o El Clásico de Hoje!',
      excerpt: 'BET 200: Barcelona Vence @1.75 (Confiança 78%) — Barça em forma perfeita, Real Madrid em crise. BET 201: Mais de 2.5 Golos @1.85 — Clásico tem média de 3.2 golos nos últimos 5 anos. BET 202: Yamal Marca em Qualquer Altura @2.20 — Yamal marcou em 4 dos últimos 5 Clásicos. Acumulador: Barça Vence + Over 2.5 = @3.24!',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS PREMIER LEAGUE: West Ham vs Arsenal — Arteta pode confirmar 2º lugar hoje!',
      excerpt: 'Arsenal visita o West Ham às 15:30. Uma vitória confirma o 2º lugar e a qualificação direta para a Champions League. BET 203: Arsenal Vence @1.65 (Confiança 80%) — Arsenal ganhou 7 dos últimos 8 fora de casa. BET 204: Arsenal Marca Mais de 1.5 Golos @1.70 — Arsenal marcou 2+ em 6 dos últimos 7 jogos fora. West Ham está em 17º lugar.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS SERIE A: Milan vs Atalanta — Batalha épica pelo 3º lugar e vaga na Champions!',
      excerpt: 'Milan recebe a Atalanta às 18:45. Ambas precisam de vencer para garantir o 3º lugar e a Champions League. BET 205: Ambas Marcam @1.72 — Milan marcou em todos os últimos 8 jogos em casa; Atalanta é a equipa mais goleadora da Serie A. BET 206: Mais de 2.5 Golos @1.80. Resultado previsto: 2-2. Gasperini vs Conceição!',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'FINAL DA EUROPA LEAGUE: Aston Villa vs Freiburg — Data, Local e Análise Prévia',
      excerpt: 'A final da UEFA Europa League 2025/26 será Aston Villa vs Freiburg a 27 de maio no Estádio San Mamés, Bilbau. Primeira final europeia do Villa desde 1982. Emery tem 4 títulos na Europa League. Freiburg eliminou o Braga 4-3 no agregado. Grifo marcou 5 golos na competição. Odds: Villa @1.85, Freiburg @2.10.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
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
