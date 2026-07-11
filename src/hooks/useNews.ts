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

// Notícias de fallback — análises, contexto e investigação — 11/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '11/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Noruega vs Inglaterra — Como Parar Erling Haaland?',
      excerpt: 'O duelo dos quartos de final do Mundial 2026 entre Noruega e Inglaterra promete ser um dos mais táticos do torneio. Gareth Southgate tem o desafio monumental de travar Erling Haaland, que vem de uma exibição demolidora contra o Brasil. Analisamos como a defesa inglesa se vai organizar, o papel crucial de Declan Rice na cobertura, e como a Noruega pode explorar os espaços deixados pelas subidas de Trent Alexander-Arnold. Uma verdadeira batalha de xadrez em Miami.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: O Relvado da Final do Mundial e a Desconexão da FIFA com os Fãs',
      excerpt: 'A decisão da FIFA de vender pedaços do relvado da final do Mundial 2026 por $647 é apenas a ponta do icebergue. Numa altura em que os fãs enfrentam preços de bilhetes recorde e problemas de vistos, esta iniciativa comercial gerou uma onda de indignação global. Analisamos o impacto desta decisão na imagem da FIFA, as reações das associações de adeptos, e o que isto significa para o futuro da acessibilidade aos grandes eventos desportivos.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: A Nova Era do Manchester United com Andrey Santos',
      excerpt: 'A iminente chegada de Andrey Santos ao Manchester United por £50 milhões marca uma mudança de paradigma em Old Trafford. Sob a nova direção desportiva, o clube aposta agora em talento jovem e comprovado, em vez de superestrelas em declínio. Analisamos como o médio brasileiro de 22 anos se encaixa no sistema de Michael Carrick, a sua parceria potencial com Kobbie Mainoo, e se esta é a peça que faltava para os Red Devils lutarem pelo título.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Noruega vs Inglaterra — Análise Completa e as Melhores Picks',
      excerpt: 'O embate dos quartos de final entre Noruega e Inglaterra oferece excelentes oportunidades para os apostadores. A Inglaterra é ligeiramente favorita, mas a Noruega já provou que pode surpreender qualquer um. Recomendamos Ambas as Equipas Marcam (1.95), Erling Haaland a Marcar a Qualquer Altura (2.20), e Mais de 2.5 Golos (2.10). Análise detalhada das estatísticas, histórico de confrontos e o impacto das condições meteorológicas em Miami.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'RESUMO: A Vitória Épica da Espanha e o Fim da Geração de Ouro Belga',
      excerpt: 'A vitória da Espanha por 2-1 sobre a Bélgica, com um golo de Mikel Merino aos 88 minutos, foi um dos jogos mais emocionantes do Mundial 2026. Analisamos a resiliência espanhola, a masterclass no meio-campo de Rodri, e o que esta derrota significa para a Bélgica. Com Kevin De Bruyne possivelmente a fazer o seu último jogo internacional, este resultado pode marcar o fim definitivo da tão aclamada "Geração de Ouro" belga.',
      category: 'RESUMO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'QUALIFICAÇÕES EUROPEIAS: O Caminho para a Conference League 2026/27',
      excerpt: 'Enquanto o mundo foca no Mundial, a nova época europeia já começou com a primeira pré-eliminatória da UEFA Conference League. Analisamos os principais embates, incluindo o Drita FC contra o FK Kauno Žalgiris, e o que esperar das equipas periféricas que sonham com a fase de liga. Um olhar detalhado sobre as surpresas potenciais, os jogadores a seguir e as implicações financeiras destas eliminatórias para os clubes mais pequenos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
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
