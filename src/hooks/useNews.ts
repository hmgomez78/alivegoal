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

// Notícias de fallback — análises, contexto e investigação — 14/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Alemanha vs Curaçao — Wirtz pode finalmente brilhar num Mundial? O regresso dos Panzer!',
      excerpt: 'Florian Wirtz, o craque do Liverpool de 23 anos, faz a sua estreia num Mundial contra Curaçao, a menor nação da história do torneio. A Alemanha falhou a fase de grupos em 2018 e 2022 e Nagelsmann quer mostrar que os Panzer voltaram ao topo. Analisamos o sistema tático alemão, o papel de Wirtz no 4-2-3-1 de Nagelsmann, e porque é que este jogo pode ser o início de uma nova era para o futebol alemão. As odds colocam a Alemanha como favorita esmagadora mas o histórico recente obriga à cautela.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Roubo no Mundial! Chuteiras de Kane e Bellingham desaparecem — Segurança do torneio em causa!',
      excerpt: 'O equipamento da seleção inglesa foi roubado durante a transferência da Florida para Kansas City. Chuteiras personalizadas de Harry Kane e Jude Bellingham, bolas oficiais e material tático desapareceram. A polícia deteve dois suspeitos. Este incidente, somado a problemas de segurança com outras seleções, levanta sérias questões sobre a organização do maior Mundial de sempre. Thomas Tuchel está furioso e a federação inglesa trabalha contra o relógio para repor o material antes do jogo contra a Croácia.',
      category: 'ESCÂNDALO',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Brasil 1-1 Marrocos — O empate que abalou o mundo e o que significa para o Grupo C',
      excerpt: 'O Brasil de Ancelotti empatou 1-1 com Marrocos num resultado histórico que deixou o Grupo C completamente em aberto. Saibari abriu o marcador com um contra-ataque clínico que expôs as fragilidades defensivas brasileiras. Vinícius Júnior respondeu com um golo brilhante. Sem Neymar, o Brasil mostrou que ainda tem muito trabalho a fazer. Analisamos o que este resultado significa para as próximas jornadas e quais são os cenários de qualificação para Brasil, Marrocos, Escócia e Haiti.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Alemanha vs Curaçao, Holanda vs Japão e Costa do Marfim vs Equador — Análise do Dia 4',
      excerpt: 'Quatro jogos do Dia 4 do Mundial 2026. A Alemanha é favorita esmagadora contra Curaçao (odds 1.05). A Holanda enfrenta um Japão perigoso que dominou a qualificação asiática. A Costa do Marfim, a equipa mais jovem do torneio, defronta o Equador. E a Suécia joga com a Tunísia. Analisamos todos os mercados e apresentamos as melhores apostas para este domingo do Mundial, incluindo o nosso acumulador do dia.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Escócia 1-0 Haiti — McGinn marca o primeiro golo escocês num Mundial em 28 anos!',
      excerpt: 'John McGinn marcou o primeiro golo da Escócia num Mundial desde 1998, abrindo o marcador aos 28 minutos contra o Haiti no Gillette Stadium em Boston. Foi um golo de recarga após uma defesa do guarda-redes haitiano a um remate de Ché Adams. A Escócia, que regressou ao Mundial pela primeira vez desde 1998, lidera o Grupo C com 3 pontos se vencer. O Haiti, que se qualificou de forma surpreendente, mostrou algumas ideias interessantes mas falhou na finalização. O resultado final ainda está em aberto.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Liverpool à caça do sucessor de Salah — Barcola, Diomandé ou Bazoumana Touré?',
      excerpt: 'Com a saída de Mohamed Salah, o Liverpool tem uma lista de três candidatos para o seu lugar: Bradley Barcola (PSG, 120M€), Yan Diomandé (Sporting CP, 70M€) e Bazoumana Touré. O Arsenal também quer Barcola, o que pode desencadear uma guerra de licitações. Diomandé, que foi uma das revelações do Sporting esta época, pode ser a opção mais acessível. Analisamos o perfil de cada candidato, as suas estatísticas e qual deles se encaixa melhor no sistema de jogo do Liverpool.',
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
