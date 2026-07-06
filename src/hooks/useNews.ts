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

// Notícias de fallback — análises, contexto e investigação — 06/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '06/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Portugal vs Espanha — O Dérbi Ibérico que Vai Parar o Mundo',
      excerpt: 'O embate mais aguardado dos Oitavos de Final acontece hoje: Portugal contra Espanha em Dallas. A Roja tem dominado a posse de bola e apresenta um meio-campo fortíssimo com Rodri e Pedri, enquanto Portugal aposta na magia de Lamine Yamal e na experiência de Cristiano Ronaldo. Analisamos os pontos fortes de cada equipa, os esquemas táticos e onde o jogo poderá ser decidido. Será a organização espanhola capaz de anular a criatividade portuguesa?',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: A Decisão da FIFA sobre Balogun — Favorecimento ou Justiça?',
      excerpt: 'A suspensão do castigo de Folarin Balogun a horas do jogo contra a Bélgica levantou uma onda de indignação. A FIFA abriu um precedente perigoso ao anular o cartão vermelho, gerando acusações de favorecimento à seleção anfitriã (EUA). Investigamos os bastidores desta decisão inédita, as reações internacionais e o impacto que poderá ter na credibilidade do Mundial 2026.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Portugal vs Espanha e EUA vs Bélgica — As Melhores Oportunidades',
      excerpt: 'Dois grandes jogos hoje no Mundial 2026. Portugal vs Espanha: um jogo tático onde prevemos um Empate ao Intervalo (2.00) e Ambas Marcam (1.85). EUA vs Bélgica: os americanos jogam em casa com Balogun de volta. Recomendamos EUA Dupla Hipótese e Mais de 2.5 Golos. Leia a nossa análise detalhada com estatísticas exclusivas para maximizar os seus ganhos nestes Oitavos de Final.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Chelsea Acelera no Mercado — Chavarria e Lacroix a Caminho',
      excerpt: 'O Chelsea não perde tempo na reconstrução do plantel para 2026/27. Com acordos encaminhados por Pep Chavarria (Rayo Vallecano) e Maxence Lacroix (Crystal Palace), os Blues reforçam a defesa. Paralelamente, a venda de Tyrique George ao Everton por 28M€ ajuda a equilibrar as contas. Analisamos a estratégia de Enzo Maresca e o impacto destas mexidas no futuro do clube londrino.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE: Noruega 2-1 Brasil — Haaland Escreve História e Manda o Escrete para Casa',
      excerpt: 'Uma surpresa monumental! A Noruega eliminou o Brasil do Mundial com dois golos de Erling Haaland. Analisamos como a organização tática nórdica bloqueou o talento de Vini Jr. e Rodrygo, e como Haaland explorou as fragilidades defensivas brasileiras. O fim de uma era para a seleção canarinha e a afirmação definitiva da Noruega como uma força a ter em conta no futebol mundial.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: O Futuro de Marcus Rashford — Ficar no United ou Mudar de Ares?',
      excerpt: 'Marcus Rashford adiou qualquer decisão sobre o seu futuro até ao fim do Mundial 2026. O Manchester United, liderado pela INEOS, quer reintegrá-lo na pré-época, mas as dúvidas permanecem. Analisamos as opções de Rashford, os potenciais destinos (como o PSG ou Bayern) e o que a sua saída significaria para o ataque dos Red Devils na próxima temporada.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    }
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
