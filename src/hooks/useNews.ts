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

// Notícias de fallback — análises, tips e contexto — 31/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como o PSG de Luis Enrique destroçou o sistema do Arsenal nos penáltis — A análise da final histórica',
      excerpt: 'O PSG é bicampeão da Champions League após vencer o Arsenal 4-3 nos penáltis em Budapeste. Analisamos como Luis Enrique preparou a equipa para neutralizar o pressing alto de Mikel Arteta, a decisão de Dembélé de cobrar o penálti que empatou o jogo, e por que razão Eze e Gabriel falharam as suas tentativas decisivas. Uma análise tática profunda a uma final que ficará na história do futebol europeu.',
      category: 'ANÁLISE TÁTICA',
      readTime: '14 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ÚLTIMA HORA: Liverpool despede Slot — Quem são os candidatos ao banco de Anfield e o que esperar da próxima época?',
      excerpt: 'A demissão de Arne Slot do Liverpool chocou o mundo do futebol. O holandês, campeão da Premier League na primeira temporada, não sobreviveu a uma segunda época inconsistente. Analisamos os principais candidatos ao cargo — Iraola do Bournemouth é o favorito — e o que esta mudança significa para o projeto desportivo dos Reds, que precisam de reconstruir após a saída de Konaté e outras peças-chave.',
      category: 'ÚLTIMA HORA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: O verão de ouro do Barcelona — Gordon, Bernardo Silva e a estratégia de Deco para dominar a La Liga',
      excerpt: 'O Barcelona está a construir uma equipa de sonho para 2026/27. A contratação de Anthony Gordon por €80M ao Newcastle e a chegada gratuita de Bernardo Silva (que aceitou reduzir o salário para metade) mostram a ambição do clube catalão. Analisamos como estas peças se encaixam no sistema de Flick, o impacto no futuro de Rashford e Bardghji, e se o Barça tem agora o plantel para reconquistar a Champions.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Brasileirão Série A — Análise completa à rodada 18 com Cruzeiro vs Fluminense e Palmeiras vs Chapecoense',
      excerpt: 'A última rodada do Brasileirão antes da pausa para o Mundial 2026 tem jogos de alto impacto. Analisamos os confrontos mais relevantes: Cruzeiro vs Fluminense no Mineirão (20h30), Palmeiras vs Chapecoense no Allianz Parque (16h00) e Bragantino vs Internacional (11h00). Apresentamos as nossas picks com odds reais, análise de forma recente e percentagens de probabilidade para cada resultado.',
      category: 'TIPS DE APOSTAS',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ESCÂNDALO: O caso Saco Azul do Benfica regressa ao tribunal — O que significa o recurso do MP para o clube e para Vieira?',
      excerpt: 'O Ministério Público vai recorrer da absolvição do Benfica SAD e de Luís Filipe Vieira no processo Saco Azul, reabrindo um caso que parecia encerrado. O tribunal tinha absolvido todos os arguidos em abril por impossibilidade de realizar perícia forense 10 anos após os factos. Analisamos as implicações jurídicas, o impacto na imagem do clube e o que pode acontecer nas próximas semanas com o prazo de 60 dias para o recurso.',
      category: 'ESCÂNDALO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: Brasil x Panamá — Ancelotti testa o sistema para o Mundial e revela as suas escolhas para o onze titular',
      excerpt: 'O amistoso Brasil vs Panamá no Maracanã (18h30) é o último ensaio antes do Mundial 2026. Carlo Ancelotti tem dúvidas na composição do ataque após as lesões e quer testar Rodrygo, Vini Jr. e Endrick juntos. Analisamos o possível onze inicial da Seleção Canarinha, as opções táticas do técnico italiano, e o que este jogo pode revelar sobre a estratégia do Brasil para o torneio que começa a 11 de junho.',
      category: 'ANÁLISE TÁTICA',
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
