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

// Notícias de fallback — análises, contexto e investigação — 09/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '09/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: França vs Marrocos — O Duelo de Gerações nos Quartos do Mundial 2026',
      excerpt: 'Quatro anos depois da semifinal do Qatar 2022, França e Marrocos voltam a defrontar-se num Campeonato do Mundo, desta vez nos quartos de final. Mbappé lidera uma seleção francesa poderosa, mas Marrocos chega como a grande surpresa do torneio, com Hakimi e Ziyech em grande forma. Analisamos os sistemas táticos de ambas as equipas, os pontos fortes e fracos, e as chaves para a qualificação. Uma batalha épica que pode definir o rumo do Mundial 2026.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: FBI vs AFA — O Caso dos $300 Milhões que Pode Abalar o Futebol Mundial',
      excerpt: 'A investigação do FBI à Associação de Futebol Argentino (AFA) por suspeitas de lavagem de dinheiro e fraude bancária de $300 milhões é o maior escândalo do futebol em anos. Analisamos o historial de corrupção no futebol sul-americano, as implicações para a Argentina no atual Mundial 2026, e o que pode acontecer se as acusações forem confirmadas. Poderia a Argentina ser desclassificada do torneio? Um caso que está a sacudir as fundações do desporto rei.',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: Andrey Santos no United — O Que Ruben Amorim Ganha com o Médio Brasileiro',
      excerpt: 'A chegada de Andrey Santos ao Manchester United por £50 milhões é uma aposta clara de Ruben Amorim no talento brasileiro. O médio de 21 anos, formado no Vasco da Gama e que nunca conseguiu afirmar-se no Chelsea, chega com uma enorme margem de progressão. Analisamos as características técnicas do jogador, como se encaixa no sistema 3-4-3 de Amorim, e as expectativas para a próxima temporada na Premier League. Uma transferência de risco, mas com enorme potencial.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: França vs Marrocos — Análise Completa e Previsões para os Quartos',
      excerpt: 'O jogo mais aguardado dos quartos de final do Mundial 2026 oferece oportunidades interessantes para apostadores. A França é favorita com odds de 1.75, mas Marrocos tem mostrado ser uma equipa difícil de bater. Recomendamos apostar em Mais de 2.5 Golos (2.10) dado o estilo ofensivo de ambas as equipas, e em Mbappé a marcar a qualquer momento (2.50). Análise completa das estatísticas, historial de confrontos diretos e as nossas melhores picks para este duelo épico.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE TÁTICA: Mohamed Salah Livre — O Melhor Destino para o Rei Egípcio',
      excerpt: 'Com o contrato no Liverpool expirado, Mohamed Salah é o jogador mais cobiçado do mercado de verão. Aos 34 anos, o egípcio ainda está em excelente forma, como demonstrou no Mundial 2026. Analisamos as três opções mais prováveis: Inter Milan (projeto europeu de topo), MLS (aventura americana) e Arábia Saudita (proposta financeira irrecusável). Qual é o melhor destino para o legado de Salah? E qual o impacto de cada escolha na sua carreira e no futebol mundial?',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Morgan Rogers para o Arsenal — A Transferência de €130M que Pode Mudar a Premier League',
      excerpt: 'Se o Arsenal conseguir fechar a contratação de Morgan Rogers por €130 milhões, será a maior transferência da história do clube. O extremo inglês de 23 anos tem sido uma das revelações da Premier League nas últimas temporadas, com 18 golos e 14 assistências pelo Aston Villa. Analisamos como Rogers se encaixa no sistema de Mikel Arteta, o impacto da saída de Trossard para o Besiktas, e se este investimento coloca o Arsenal como favorito ao título 2026/27.',
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
