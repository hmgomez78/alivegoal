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

// Notícias de fallback — análises, contexto e investigação — 07/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE: O que a expulsão de Leão significa para Portugal no Mundial 2026?',
      excerpt: 'Rafael Leão foi expulso por soco no amistoso Portugal vs Chile (2-0) e a questão que todos fazem é: vai ser suspenso para o Mundial? A FIFA tem jurisdição sobre jogos amistosos internacionais e pode aplicar uma suspensão automática. Portugal estreia-se no Mundial a 15 de junho e Leão é uma peça fundamental do sistema de Roberto Martínez. Analisamos o regulamento disciplinar da FIFA, os precedentes históricos e o impacto tático que a sua ausência teria na seleção das quinas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ANÁLISE TÁTICA: Como a Alemanha derrotou os EUA — lições para o Mundial 2026',
      excerpt: 'A Alemanha venceu os Estados Unidos no Soldier Field em Chicago no último amistoso pré-Mundial. Florian Wirtz foi o grande protagonista, mostrando porque é considerado um dos melhores jogadores do mundo. Analisamos as táticas de Julian Nagelsmann, as fraquezas expostas dos EUA como anfitriões, e o que este resultado nos diz sobre as hipóteses de ambas as seleções no torneio que começa a 11 de junho. A Alemanha parece pronta para ir longe.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'INVESTIGAÇÃO: PSG campeão da Europa — o projeto de um bilião de euros que finalmente deu frutos',
      excerpt: 'O PSG conquistou a sua primeira Liga dos Campeões ao vencer o Arsenal nos penáltis em Budapeste. Mas o que custou este projeto? Desde a compra pelo Qatar Sports Investments em 2011, o clube parisiense gastou mais de €1,5 mil milhões em transferências. Neymar, Mbappé, Messi — todos passaram por Paris. Analisamos o percurso do PSG até ao título europeu, os erros do passado, e como Luís Enrique construiu a equipa que finalmente chegou ao topo da Europa.',
      category: 'ESCÂNDALO',
      readTime: '14 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Ederson para o Man United — o médio que pode mudar tudo em Old Trafford',
      excerpt: 'Manchester United confirmou a contratação de Ederson da Atalanta por €45M, o primeiro reforço da era Michael Carrick. O médio brasileiro foi um dos melhores da Serie A nas últimas duas épocas, combinando qualidade técnica com intensidade defensiva. Analisamos as características do jogador, como ele se encaixa no sistema de Carrick, e porque este pode ser o início de uma reconstrução séria dos Red Devils. Com Casemiro e Ugarte a sair, o meio-campo precisa de renovação urgente.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Amistosos de hoje — Argentina vs Honduras, Croatia vs Slovenia, Morocco vs Norway',
      excerpt: 'Domingo de amistosos internacionais com jogos importantes para a preparação do Mundial 2026. Argentina enfrenta Honduras em College Station, Texas (01:00 BST), onde Messi e Scaloni vão testar o 11 ideal. Croácia vs Eslovénia (19:45 BST) é um dérbi dos Balcãs com muito orgulho em jogo. Marrocos vs Noruega (20:00 BST) em Harrison, NJ, promete ser um jogo equilibrado. Analisamos as odds, as prováveis composições e as melhores apostas para cada encontro.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ÚLTIMA HORA: Liverpool recusa vender Rio Ngumoha ao Bayern Munich — posição firme e clara!',
      excerpt: 'O Liverpool rejeitou categoricamente qualquer proposta do Bayern Munich pelo jovem extremo Rio Ngumoha. Fabrizio Romano revelou que a posição do clube é "zero intenção de negociar, zero hipótese de deixar sair". O jovem prodígio, que foi contratado ao Chelsea e se tornou um dos melhores extremos jovens do mundo, assinou recentemente o seu primeiro contrato profissional com os Reds. Andoni Iraola, novo treinador do Liverpool, conta com ele como peça fundamental do projeto. O Bayern vai ter de procurar outro alvo.',
      category: 'ÚLTIMA HORA',
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
