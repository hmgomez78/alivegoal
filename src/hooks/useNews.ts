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

// Notícias de fallback — análises, contexto e investigação — 06/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE: EUA vs Alemanha — quem é o favorito no último teste antes do Mundial 2026?',
      excerpt: 'O Soldier Field em Chicago recebe hoje o duelo mais aguardado dos amistosos pré-Mundial: Estados Unidos vs Alemanha (18:30 GMT). Os americanos, anfitriões do torneio, querem confirmar que estão prontos para competir com as grandes potências. A Alemanha, em excelente forma, quer mostrar que é candidata ao título. Analisamos as forças e fraquezas de ambas as equipas, as prováveis composições e o que este jogo nos pode dizer sobre as hipóteses de cada seleção no Mundial.',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'INVESTIGAÇÃO: O escândalo dos bilhetes do Mundial — como a FIFA falhou os adeptos',
      excerpt: 'O cancelamento de bilhetes dados de graça por erro é apenas a ponta do iceberg do caos na venda de bilhetes do Mundial 2026. Os procuradores-gerais de Nova Iorque e Nova Jérsia estão a investigar a FIFA por possíveis violações de proteção ao consumidor. Os preços são os mais altos de sempre, a FIFA opera a sua própria plataforma de revenda cobrando 15% de comissão a compradores e vendedores, e os bilhetes prometidos a $21 para jogos da fase de grupos nunca chegaram. Uma análise completa do escândalo.',
      category: 'ESCÂNDALO',
      readTime: '13 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: O regresso de Mourinho ao Real Madrid — o que esperar desta parceria?',
      excerpt: 'José Mourinho está de volta ao Real Madrid, desta vez com Florentino Pérez a prometer uma oferta de €150M por Michael Olise. A primeira passagem de Mourinho pelo clube (2010-2013) foi marcada por conquistas mas também por conflitos. Agora, com 63 anos e vindo do Benfica, o treinador português tem uma segunda oportunidade de deixar a sua marca no Santiago Bernabéu. Analisamos o que mudou, o que permanece igual e quais as expectativas para esta nova era.',
      category: 'TRANSFERÊNCIAS',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Portugal vs Chile — Ronaldo lidera a última preparação para o Mundial',
      excerpt: 'Portugal recebe o Chile hoje às 20:00 no Estádio Nacional do Jamor, em Oeiras, no último amistoso antes do Mundial 2026. Cristiano Ronaldo, que vai disputar o seu quinto Mundial, quer terminar a preparação com um golo. O Chile, sem se qualificar para o torneio, serve de sparring para a equipa das quinas. Analisamos as odds (Portugal favorito a 1.40), as prováveis composições e as melhores apostas para este encontro.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Brasil vs Egito sem Neymar — a grande ausência antes do Mundial',
      excerpt: 'O Brasil defronta o Egito esta noite (23:00 GMT) no último amistoso antes do Mundial 2026, mas sem Neymar. O craque brasileiro foi afastado do jogo por uma lesão na barriga da perna, levantando dúvidas sobre a sua condição física para o torneio. Dorival Júnior vai testar alternativas no ataque, com Vinicius Jr. e Rodrygo a serem os principais candidatos a liderar o jogo ofensivo. O Brasil é um dos favoritos ao título, mas a incerteza em torno de Neymar é uma preocupação real.',
      category: 'ÚLTIMA HORA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: Argentina vs Honduras — Scaloni testa o 11 ideal para o Mundial',
      excerpt: 'A Argentina, atual campeã do mundo, defronta Honduras esta noite (00:00 GMT) no último amistoso de preparação. Lionel Scaloni tem usado estes jogos para testar diferentes combinações táticas e decidir quem vai ser titular no primeiro jogo do Mundial. Messi, que vai disputar o seu último Mundial, está em excelente forma. Analisamos as opções táticas do selecionador argentino, os jogadores em dúvida e o que esperar do campeão mundial em defesa do título.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
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
