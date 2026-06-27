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

// Notícias de fallback — análises, contexto e investigação — 27/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O hat-trick de Dembélé — Como a França destruiu a Noruega em 32 minutos',
      excerpt: 'Ousmane Dembélé fez história ao marcar três golos em apenas 32 minutos contra a Noruega, tornando-se o segundo jogador a conseguir este feito num Mundial. Analisamos como o sistema de Deschamps criou os espaços para o avançado do PSG, a decisão de Solbakken de poupar Haaland e o que este resultado significa para a França nos oitavos de final. A Bota de Ouro está ao alcance do vencedor do Bola de Ouro 2025.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O fim de Muslera — O erro que eliminou o Uruguai e encerrou uma era',
      excerpt: 'Fernando Muslera, com 40 anos e 19 jogos de Mundial às costas, cometeu o erro mais doloroso da sua carreira ao deixar escapar o remate de Alex Baena. O veterano foi substituído ao intervalo por Bielsa, numa cena que pode marcar o fim da sua carreira internacional. Analisamos o impacto desta eliminação, a raiva de Bielsa, o cartão vermelho de Canobbio e o que o futuro reserva ao futebol uruguaio.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE TÁTICA: Portugal vs Colômbia — Ronaldo vs James Rodríguez, o duelo que define o Grupo K',
      excerpt: 'Portugal e Colômbia defrontam-se esta noite no Hard Rock Stadium de Miami num jogo que pode definir a liderança do Grupo K. Cristiano Ronaldo, ainda a perseguir o seu primeiro golo no torneio, enfrenta um James Rodríguez em excelente forma. Analisamos os sistemas táticos, os pontos fortes e fracos de cada equipa, os jogadores a vigiar e as apostas com maior valor para este confronto de gigantes.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Inglaterra vs Panamá e Portugal vs Colômbia — As melhores apostas do Dia 17',
      excerpt: 'O Dia 17 do Mundial 2026 traz seis jogos de enorme qualidade. Inglaterra vs Panamá, Croácia vs Gana, Portugal vs Colômbia e Congo-DR vs Uzbequistão são os destaques. Analisamos as odds, as estatísticas e os mercados com maior valor, incluindo Mais de 2.5 golos no jogo da Inglaterra, Resultado Final para Portugal e o Acumulador do Dia com odds combinadas acima de 3.50.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TRANSFERÊNCIAS: Arsenal vs Newcastle — A batalha por Bruno Guimarães que vai dominar o verão',
      excerpt: 'A proposta de £55M do Arsenal por Bruno Guimarães foi recusada, mas os Gunners estão determinados a melhorar a oferta. Analisamos por que Mikel Arteta vê o médio brasileiro como a peça que falta para o Arsenal ganhar a Premier League, as razões do Newcastle para resistir à venda, o papel do agente do jogador e como esta saga pode terminar. Uma das transferências mais explosivas do verão de 2026.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Tottenham e De Zerbi — Tonali, Fernandes e a revolução do meio-campo dos Spurs',
      excerpt: 'Roberto De Zerbi está a transformar o Tottenham com contratações de alto nível. O acordo com Sandro Tonali por £85M e o interesse em Mateus Fernandes do West Ham mostram a ambição dos Spurs para 2026-27. Analisamos como estes médios se encaixam no sistema de De Zerbi, o que significa para o projeto do técnico italiano e por que o Tottenham pode ser uma das equipas mais excitantes da próxima Premier League.',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
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
