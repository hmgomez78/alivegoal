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

// Notícias de fallback — análises, tips e contexto — 16/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Mourinho no Real Madrid — O "Parking the Bus" pode funcionar no Bernabéu em 2026?',
      excerpt: 'O regresso de José Mourinho ao Real Madrid é o tema do momento. Analisamos como o treinador português pode adaptar o seu estilo defensivo ao plantel atual, com Mbappé e Vinicius como peças centrais. Mourinho terá de conciliar a sua filosofia pragmática com as exigências ofensivas do Bernabéu. Quais são os cenários táticos e quem são os jogadores que mais beneficiam com esta mudança?',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: FA Cup Final Manchester City vs Chelsea — As melhores apostas para Wembley hoje!',
      excerpt: 'A Final da FA Cup entre Manchester City e Chelsea é o jogo do dia em Wembley. O City é favorito a 1.75, mas o Chelsea tem João Pedro em grande forma e pode surpreender. Analisamos as estatísticas, o historial recente e identificamos as apostas com maior valor: Erling Haaland a marcar a qualquer momento (2.10), Over 2.5 golos (1.80) e Manchester City vence (1.75) são as nossas picks para esta final histórica.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Aston Villa 4-2 Liverpool — O colapso de Arne Slot e o que mudou no futebol inglês esta temporada',
      excerpt: 'A derrota por 4-2 em Villa Park foi mais um capítulo negro para o Liverpool de Arne Slot. Com 19 derrotas na temporada — o pior registo do século — o clube de Anfield enfrenta uma reconstrução profunda. Analisamos as causas do colapso, o impacto nas apostas para o Top 4 e o que o Liverpool precisa de fazer no mercado de verão para regressar à elite. Slot sobreviverá à próxima temporada?',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO: Inter Milan e o FFP — O que pode acontecer aos nerazzurri se as acusações de €300M forem provadas?',
      excerpt: 'O escândalo financeiro do Inter Milan é o mais grave desde o Calciopoli de 2006. Se o relatório secreto for confirmado, o Inter pode ser banido das competições europeias, sofrer uma dedução de pontos na Serie A e até ver o Scudetto revogado. Analisamos os cenários legais, o impacto no mercado de transferências e o que isto significa para o futebol italiano. O Inter pode ser o novo Juventus de 2006?',
      category: 'ESCÂNDALO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TRANSFERÊNCIAS: Michael Carrick no Manchester United — Viktor Gyökeres continua a ser o alvo número 1?',
      excerpt: 'Com Michael Carrick confirmado como treinador permanente do Manchester United, a questão mais urgente é: quem vai reforçar o ataque? Viktor Gyökeres do Sporting CP continua a ser o alvo número 1, mas o Arsenal também está na corrida. Analisamos as probabilidades de Carrick conseguir o avançado sueco, o impacto nas odds de transferências e quais os outros alvos prioritários para o mercado de verão dos Red Devils.',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Bundesliga Final Day — St. Pauli, Heidenheim e Wolfsburg em igualdade — quem desce?',
      excerpt: 'O último dia da Bundesliga é um caos total! St. Pauli, Heidenheim e Wolfsburg estão todos empatados em pontos na zona de descida. Analisamos os cenários possíveis, os jogos de cada equipa e as apostas com maior valor para este dia histórico do futebol alemão. Quem vai descer e quem vai sobreviver? As odds estão a mudar a cada hora — aqui estão as melhores apostas para o drama final da Bundesliga!',
      category: 'TIPS DE APOSTAS',
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
