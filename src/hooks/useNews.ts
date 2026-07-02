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

// Notícias de fallback — análises, contexto e investigação — 02/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '02/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Tonali + Fernandes no Tottenham — De Zerbi Constrói Meio-Campo de Elite',
      excerpt: 'O Tottenham gastou £185 milhões em dois médios num único verão: Mateus Fernandes (£85M) e Sandro Tonali (£100M). Analisamos como Roberto De Zerbi planeia usar estes dois jogadores no seu sistema de jogo. Tonali é um médio completo, com capacidade defensiva e ofensiva, que complementa perfeitamente o técnico português Fernandes. Com este duo no meio-campo, o Tottenham pode finalmente competir pelos títulos na Premier League. Uma análise detalhada do projeto ambicioso dos Spurs para a próxima época.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TRANSFERÊNCIAS: Xabi Alonso no Chelsea — O Que Esperar da Nova Era dos Blues',
      excerpt: 'Xabi Alonso assumiu oficialmente o comando do Chelsea e já está a trabalhar com o plantel. A sua primeira contratação foi Marco Palestra, lateral italiano por €55M. Alonso avança para Pep Chavarría do Rayo Vallecano como lateral esquerdo. Analisamos o estilo de jogo do espanhol, como transformou o Bayer Leverkusen num campeão invicto, e o que os adeptos do Chelsea podem esperar. Cole Palmer e Enzo Fernandez são os pilares do projeto. Uma nova era começa em Stamford Bridge com um dos melhores treinadores do mundo.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Espanha vs Áustria e Portugal vs Croácia — Análise Completa dos Jogos de Hoje',
      excerpt: 'Os 16 avos de final do Mundial 2026 continuam hoje com dois jogos de enorme interesse para apostadores. A Espanha é favorita clara contra a Áustria (odd 1.40), mas os austríacos surpreenderam ao qualificar-se. Portugal vs Croácia é o duelo das lendas — Ronaldo vs Modric. Recomendamos Espanha Vence @1.40 e Mais de 2.5 Golos em Portugal vs Croácia @1.95. Acumulador paga @2.73! Análise completa com estatísticas e contexto histórico dos confrontos.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO: DFB Alvo de Rusga Policial — Corrupção no Euro 2024 Ameaça o Futebol Alemão',
      excerpt: 'A crise do futebol alemão aprofundou-se dramaticamente. Após a eliminação humilhante frente ao Paraguai nos penáltis, a Federação Alemã de Futebol (DFB) foi alvo de uma rusga policial por suspeitas de corrupção ligadas à organização do Euro 2024. As investigações apontam para subornos na atribuição de contratos e manipulação de resultados. O chanceler Friedrich Merz entrou na polémica e foi duramente criticado. Nagelsmann exige revisão do VAR e ameaça com ação legal à FIFA. O futebol alemão vive a sua pior crise em décadas.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Ronaldo vs Modric — Dois Ícones em Crepúsculo Num Duelo Histórico',
      excerpt: 'Portugal vs Croácia é mais do que um jogo de futebol — é o adeus de duas lendas. Cristiano Ronaldo, 41 anos, marcou em 6 Mundiais consecutivos, um recorde absoluto. Luka Modric, 40 anos, fez a assistência mais velha da história do torneio. Ambos estão no último Mundial das suas carreiras. Analisamos o percurso de dois dos maiores jogadores de todos os tempos e o que este jogo representa para o futebol mundial. Uma noite que ficará na história do desporto.',
      category: 'ÚLTIMA HORA',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: Como os EUA Venceram a Bósnia 2-0 — Balogun e o Sonho Americano',
      excerpt: 'Os EUA confirmaram a passagem aos oitavos de final com uma vitória por 2-0 sobre a Bósnia-Herzegovina. Analisamos como o selecionador americano preparou o jogo, o papel decisivo de Folarin Balogun como referência ofensiva, e como Pulisic e McKennie controlaram o meio-campo. Os EUA vão agora defrontar a Bélgica ou o Senegal. Com o apoio do público em casa e uma geração de jogadores talentosos, os americanos sonham com as meias-finais. Uma análise tática detalhada da vitória histórica.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
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
