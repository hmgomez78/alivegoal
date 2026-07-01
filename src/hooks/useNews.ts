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

// Notícias de fallback — análises, contexto e investigação — 01/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '01/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O Sistema Perfeito de Deschamps — Como a França Destruiu a Suécia',
      excerpt: 'A goleada da França sobre a Suécia por 3-0 foi uma aula de futebol. Deschamps voltou ao banco após a morte da mãe e a sua equipa respondeu da melhor forma. Analisamos como o quarteto ofensivo Mbappé-Olise-Barcola-Dembélé criou superioridade numérica constante e como Tchouaméni e Rabiot controlaram o meio-campo. A Suécia de Gyokeres e Isak nunca conseguiu criar perigo real. Uma exibição de gala dos "Bleus".',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TRANSFERÊNCIAS: O Impacto de Mateus Fernandes no Tottenham de De Zerbi',
      excerpt: 'O Tottenham pagou £85 milhões por Mateus Fernandes ao West Ham, tornando-o no maior gasto dos Spurs de sempre. O médio português de 21 anos encaixa perfeitamente no sistema de De Zerbi, que prefere médios técnicos e com capacidade de progressão. Analisamos como Fernandes pode transformar o Tottenham numa candidata séria ao título da Premier League na próxima época, e o que este negócio significa para o West Ham.',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Inglaterra vs Congo-DR e EUA vs Bósnia — Análise Completa',
      excerpt: 'Os 16 avos de final do Mundial 2026 continuam hoje com dois jogos de grande interesse para apostadores. A Inglaterra é favorita clara contra o Congo-DR, mas a equipa africana surpreendeu na fase de grupos. Os EUA em casa contra a Bósnia é outro jogo onde o favoritismo é claro. Recomendamos Vitória Inglaterra & +1.5 Golos (@1.45) e EUA Vence (@1.50). Acumulador paga @2.17!',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO: Gonçalo Ramos Abandona o PSG — A História Completa da Saída',
      excerpt: 'A transferência de Gonçalo Ramos do PSG para o AC Milan por €55 milhões chocou o futebol europeu. Investigamos os bastidores da saída: desentendimentos com o treinador sobre o papel do avançado, promessas não cumpridas de minutos de jogo, e a intervenção decisiva do agente Jorge Mendes. O PSG está furioso e ameaça ação legal, enquanto o Milan celebra a contratação do avançado português que está a brilhar no Mundial.',
      category: 'ESCÂNDALO',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Haaland vs Mbappé vs Messi — A Batalha pela Bota de Ouro do Mundial',
      excerpt: 'A corrida à Bota de Ouro do Mundial 2026 está mais emocionante do que nunca! Mbappé e Messi lideram com 6 golos cada, seguidos de Haaland com 5. Vinícius Jr. e Dembélé têm 4. Com os oitavos de final a começar, qualquer um destes craques pode disparar na tabela. Analisamos as probabilidades de cada jogador vencer a Bota de Ouro e o impacto nas apostas.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'BASTIDORES: A Crise do VAR no Mundial — FIFA Sob Pressão Após Alemanha',
      excerpt: 'As declarações explosivas de Nagelsmann — "É um escândalo absoluto!" — abriram uma crise sem precedentes na FIFA. O golo anulado a Jonathan Tah no prolongamento contra o Paraguai divide especialistas e ex-árbitros. A FIFA convocou uma reunião de emergência para rever os critérios de aplicação do VAR. Enquanto isso, a Alemanha pede uma revisão formal e ameaça com ação legal. O futuro do VAR nos grandes torneios está em debate.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
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
