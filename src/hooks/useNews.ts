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

// Notícias de fallback — conteúdo DIFERENTE do Trending: análises, tips e resultados — 10/05/2026 (noite)
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'BARCELONA CAMPEÃO! Análise completa do El Clásico 2-0 — Rashford e Ferran Torres decidem!',
      excerpt: 'Histórico! Barcelona 2-0 Real Madrid no Camp Nou. Rashford abriu o marcador aos 9\' de livre direto — o seu 22º golo na La Liga. Ferran Torres fez o 2-0 aos 18\' com assistência de Dani Olmo. Real Madrid nunca entrou no jogo. Yamal foi o melhor em campo. Barça é campeão com 3 jornadas de antecedência — 29º título da La Liga!',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'CRISE MILAN: Atalanta vence 3-2 em San Siro — Champions League em risco máximo para o Milan!',
      excerpt: 'Desastre para o AC Milan! Atalanta venceu 3-2 num jogo louco no San Siro. Milan caiu para 4º empatado com a Roma. Com 2 jornadas para o fim, a Champions League pode escapar. Gasperini continua a sua magia com a Atalanta. Fonseca sob pressão máxima. Próximos jogos do Milan: Genoa (fora) e Monza (casa).',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'CHAMPIONS LEAGUE: PSG vs Arsenal e Inter vs Atlético — Tudo o que precisas saber para terça-feira!',
      excerpt: 'Dois jogos épicos na terça-feira! PSG recebe o Arsenal (Arsenal ganhou 1-0 na 1ª mão). PSG eliminou o Bayern 6-5 no agregado. Inter recebe o Atlético (1-1 na 1ª mão). BET 210: Arsenal Qualifica-se @1.90. BET 211: Inter Qualifica-se @1.75. BET 212: Acumulador Arsenal + Inter = @3.52. Análise detalhada de cada jogo disponível no canal Telegram @alivegoal.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'RESULTADOS DE HOJE: Barcelona 2-0 Real Madrid, Milan 2-3 Atalanta, West Ham 0-2 Arsenal!',
      excerpt: 'Domingo de grandes resultados! Barcelona campeão da La Liga após goleada no Clásico. Atalanta surpreende o Milan em San Siro. Arsenal confirma 2º lugar na Premier League com vitória em West Ham. Wolfsburg 0-2 Bayern Munich — Kane com mais um golo. Udinese 1-1 Juventus. Lazio 1-2 Inter de Milão.',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'FINAL DA EUROPA LEAGUE: Aston Villa vs Freiburg — 27 de Maio em Bilbau!',
      excerpt: 'A final da UEFA Europa League 2025/26 está confirmada: Aston Villa vs Freiburg a 27 de maio no Estádio San Mamés, Bilbau. Primeira final europeia do Villa desde 1982. Emery tem 4 títulos na Europa League. Freiburg eliminou o Braga 4-3 no agregado. Grifo marcou 5 golos na competição. Odds: Villa @1.85, Freiburg @2.10. Quem vai ganhar?',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: formatYesterday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'SOUTHAMPTON ESPIONAGEM: EFL abre processo — Podem ser expulsos dos play-offs do Championship!',
      excerpt: 'O escândalo mais bizarro do futebol inglês! Um funcionário do Southampton foi apanhado nos arbustos a filmar o treino do Middlesbrough antes da semi-final dos play-offs. O EFL abriu processo disciplinar. Vários clubes exigem a expulsão dos play-offs. Treinador Tonda Eckert saiu furioso da conferência de imprensa. Decisão esperada para segunda-feira.',
      category: 'ESCÂNDALO',
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
