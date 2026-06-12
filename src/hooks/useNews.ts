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

// Notícias de fallback — análises, contexto e investigação — 12/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Mourinho no Real Madrid — O que muda com o regresso do Special One ao Bernabéu?',
      excerpt: 'José Mourinho está de volta ao Real Madrid 13 anos depois. Numa época em que o clube perdeu a Liga para o Barça, foi eliminado da Champions pelo Bayern e viu Valverde hospitalizado após confronto com Tchouaméni, o técnico português chega para restaurar a ordem. Analisamos o que muda taticamente, como Mourinho pode transformar o balneário e se a sua filosofia defensiva ainda funciona na era moderna do futebol.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'INVESTIGAÇÃO: 3 Cartões Vermelhos no jogo de abertura — O VAR está a destruir o espetáculo do Mundial?',
      excerpt: 'O jogo de abertura do Mundial 2026 entre o México e a África do Sul ficou marcado por 3 cartões vermelhos e múltiplas intervenções do VAR. A África do Sul ficou reduzida a 8 jogadores. A Fox Sports foi criticada por cortar para publicidade durante o jogo. Investigamos as novas regras do Mundial 2026, o impacto do VAR expandido e se a FIFA está a priorizar o negócio em detrimento do espetáculo.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Bernardo Silva ao Real Madrid — O médio perfeito para o sistema de Mourinho?',
      excerpt: 'Com Mourinho confirmado no Real Madrid, o seu primeiro pedido foi Bernardo Silva. O médio português do Manchester City é o alvo número 1 do novo treinador merengue. Analisamos o perfil técnico de Bernardo, como se encaixa no sistema de Mourinho, e porque é que o Barça perdeu a corrida apesar de ter estado muito perto de fechar o negócio. Uma análise detalhada ao transfer mais falado do verão.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Canadá vs Bósnia e EUA vs Paraguai — Análise e apostas para os jogos de hoje',
      excerpt: 'Dois jogos de enorme interesse apostador hoje no Mundial 2026. O Canadá recebe a Bósnia em Toronto sem Alphonso Davies, o que muda completamente as probabilidades. Os EUA enfrentam o Paraguai em Los Angeles com Pochettino a preparar uma estratégia especial. Analisamos as odds, os mercados mais atrativos e apresentamos as nossas melhores sugestões para estes dois jogos do Grupo B e D.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE MÉDICA: Alphonso Davies — Quanto tempo falta para o capitão do Canadá regressar?',
      excerpt: 'Alphonso Davies foi confirmado como ausente para o jogo de abertura do Canadá contra a Bósnia. O lateral do Bayern Munique sofreu uma lesão no tendão e treina separadamente. O selecionador Marsch diz que uma ressonância mostrou sinais positivos. Especialistas em medicina desportiva analisam o tempo real de recuperação para este tipo de lesão e se Davies pode estar disponível para o segundo jogo do Canadá.',
      category: 'LESÕES',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'CONTEXTO: Raúl Jiménez — A história mais emocionante do Mundial 2026 começa no Azteca',
      excerpt: 'Raúl Jiménez marcou o segundo golo do México contra a África do Sul com um cabeceamento sublime. Mas o que torna este golo especial é a história por trás dele: em 2020, o avançado mexicano quase morreu após uma fratura no crânio num jogo pelo Wolverhampton. Jiménez usa um capacete especial desde então e disse que é um milagre estar aqui. Uma análise completa à carreira de resiliência do herói nacional mexicano.',
      category: 'ÚLTIMA HORA',
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
