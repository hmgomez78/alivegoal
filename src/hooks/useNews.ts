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

// Notícias de fallback — análises, contexto e investigação — 15/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Espanha vs Cabo Verde — Como Yamal pode destruir a defesa cabo-verdiana e o que esperar do Grupo H',
      excerpt: 'A Espanha, bicampeã do mundo e da Europa, estreia-se hoje no Mundial 2026 contra Cabo Verde. Lamine Yamal, de 18 anos, é a grande ameaça espanhola e vai enfrentar uma defesa cabo-verdiana que se organiza em bloco baixo. Analisamos o sistema tático de Luis de la Fuente, o papel de Pedri e Rodri no controlo do jogo, e porque é que a Espanha pode golear mas também pode sofrer num contra-ataque. Ryan Mendes, o capitão de Cabo Verde, é o único jogador a vigiar de perto.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE: Holanda 1-1 Japão — Kamada salva o Japão no último minuto! O que este empate significa para o Grupo F',
      excerpt: 'Num resultado surpreendente, o Japão empatou 1-1 com a Holanda no AT&T Stadium de Dallas graças a um golo de cabeça de Daichi Kamada no último minuto. A Holanda dominou o jogo mas o Japão mostrou a sua organização defensiva e capacidade de contra-ataque. Este resultado deixa o Grupo F completamente em aberto. Analisamos o que correu mal para a Holanda, o papel de Ayase Ueda no ataque japonês, e quais são os cenários de qualificação para as próximas jornadas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ESCÂNDALO: O "Watergate" do Mundial 2026 — Como a FIFA vendeu pausas de publicidade disfarçadas de hidratação',
      excerpt: 'A FIFA introduziu pausas obrigatórias de 3 minutos em cada jogo, supostamente para proteger os jogadores do calor americano. Mas a Fox TV transformou-as em blocos publicitários milionários. Segundo analistas, o Mundial terá 208 pausas, gerando 624 minutos de publicidade extra. Klopp, Pochettino e Deschamps criticaram publicamente a medida. Investigamos como a FIFA negociou estes contratos e quanto dinheiro está em jogo neste esquema que a imprensa britânica já apelidou de "Watergate".',
      category: 'ESCÂNDALO',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Espanha vs Cabo Verde, Arábia Saudita vs Uruguai e Suécia vs Tunísia — As melhores apostas do Dia 5',
      excerpt: 'Quatro jogos do Dia 5 do Mundial 2026. A Espanha é favorita esmagadora contra Cabo Verde mas o mercado de golos pode oferecer valor. A Arábia Saudita enfrenta um Uruguai com Darwin Núñez em forma. A Suécia, com Isak e Gyökeres, defronta a Tunísia. Analisamos todos os mercados, apresentamos as melhores apostas e o nosso acumulador do dia, com análise detalhada de odds e percentagens de probabilidade para cada jogo.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Austrália 2-0 Turquia — Irankunda marca e torna-se herói nacional! História de refugiado comove o mundo',
      excerpt: 'A Austrália venceu a Turquia por 2-0 no BC Place de Vancouver, num resultado que surpreendeu os analistas. Nestori Irankunda, nascido num campo de refugiados na Tanzânia, marcou o segundo golo e tornou-se o herói da noite. A história do avançado de 20 anos, que chegou à Austrália como refugiado e agora representa o país num Mundial, comoveu o mundo inteiro. A Turquia, com Hakan Calhanoglu e Arda Guler, foi incapaz de furar a organização defensiva australiana.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Cucurella para o Real Madrid — O que significa para a Premier League e quem substitui o espanhol no Chelsea',
      excerpt: 'A transferência de Marc Cucurella para o Real Madrid por 60 milhões de euros é oficial. O lateral esquerdo espanhol foi um pedido pessoal de José Mourinho e vai assinar por 6 anos. O Chelsea, que pagou 62 milhões em 2022, recupera quase o investimento. Mas quem vai substituir Cucurella em Stamford Bridge? Analisamos os candidatos — Ben Chilwell (regresso do empréstimo), Alphonso Davies (livre) e outros nomes do mercado — e o impacto desta transferência no plantel de Enzo Maresca.',
      category: 'TRANSFERÊNCIAS',
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
