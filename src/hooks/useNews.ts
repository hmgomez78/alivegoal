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

// Notícias de fallback — análises, contexto e investigação — 28/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Kane faz história — Como Bellingham e Tuchel transformaram a Inglaterra numa potência do Mundial',
      excerpt: 'Harry Kane tornou-se o maior marcador inglês de sempre em Mundiais com 11 golos, ultrapassando Gary Lineker. Mas a grande história da vitória 2-0 sobre o Panamá foi Jude Bellingham: golo, assistência e domínio total do jogo. Analisamos como Thomas Tuchel construiu uma Inglaterra sólida e perigosa, o papel de Rashford e Saka no ataque, e por que os Three Lions são agora sérios candidatos ao título.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: A noite negra de Ronaldo — Colômbia 0-0 Portugal e as críticas que abalaram CR7',
      excerpt: 'Cristiano Ronaldo foi completamente apagado pela defesa colombiana no Hard Rock Stadium. Sem um único remate enquadrado, o capitão português viu Diogo Costa salvar Portugal de uma derrota vergonhosa. A Colômbia teve 24 remates e um xG de 1.63. Analisamos o que correu mal, a crise de forma de Ronaldo no Mundial, e o que Portugal precisa de mudar para bater a Croácia nos oitavos de final.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE TÁTICA: Congo-DR 3-1 Uzbequistão — A história mais bonita do Mundial 2026',
      excerpt: 'O Congo-DR escreveu uma das páginas mais bonitas do Mundial 2026 ao eliminar o Uzbequistão com uma reviravolta épica. Yoane Wissa foi o herói com dois golos, incluindo um penálti decisivo. O VAR anulou um golo congolês no início, tornando a vitória ainda mais dramática. Analisamos o sistema tático do Congo-DR, o papel de Wissa e Mayele, e o que esperar dos africanos nos oitavos de final contra a Inglaterra.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Oitavos de Final do Mundial 2026 — As melhores apostas para a fase a eliminar',
      excerpt: 'O quadro dos oitavos de final do Mundial 2026 está a tomar forma. Inglaterra vs Congo-DR, Portugal vs Croácia, Argentina vs Cabo Verde e Colômbia vs Gana são alguns dos duelos confirmados. Analisamos as odds, as estatísticas e os mercados com maior valor para cada jogo, incluindo os favoritos, as surpresas possíveis e o nosso acumulador especial para a fase a eliminar.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TRANSFERÊNCIAS: Real Madrid em modo revolução — Cucurella, Bernardo Silva, Konaté e Dumfries confirmados',
      excerpt: 'O Real Madrid está a construir uma equipa para dominar a Europa por anos. Marc Cucurella (€55M do Chelsea), Bernardo Silva (Bosman do Man City) e Ibrahima Konaté (Bosman do Liverpool) já estão confirmados. Denzel Dumfries do Inter Milão está a ser finalizado. Com Mbappé já no plantel, os merengues querem ainda Enzo Fernández do Chelsea. Analisamos como estas contratações transformam o Real Madrid e o que significa para a Premier League perder tantas estrelas.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'LESÕES: Ugarte lesionado gravemente — O impacto no Man Utd e no mercado de transferências',
      excerpt: 'Manuel Ugarte foi retirado de maca do jogo Uruguai vs Espanha com uma lesão aparentemente grave no joelho. O médio do Manchester United estava previsto para sair do Old Trafford este verão, mas a lesão pode adiar esses planos. Analisamos o impacto desta notícia para o Man Utd, que agora pode ter de manter o jogador, e como isto afeta a corrida por Mateus Fernandes (£85M) e outros alvos dos Red Devils no mercado.',
      category: 'LESÕES',
      readTime: '6 min',
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
