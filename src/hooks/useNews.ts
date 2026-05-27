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

// Notícias de fallback — análises, tips e contexto — 27/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Crystal Palace vs Rayo Vallecano — Como se vai decidir a Final da Conference League?',
      excerpt: 'A grande final da UEFA Conference League 2025/26 acontece esta noite em Leipzig. O Crystal Palace de Oliver Glasner, com Ismaïla Sarr como principal ameaça (9 golos na competição), enfrenta um Rayo Vallecano organizado e corajoso. Analisamos os sistemas táticos de ambas as equipas, os duelos chave no meio-campo e como a pressão alta dos Eagles pode ser contrariada pela transição rápida do conjunto espanhol. Uma final equilibrada onde o detalhe pode fazer a diferença.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Cole Palmer reage com fúria à exclusão da seleção inglesa — "Não foi por razões desportivas"',
      excerpt: 'A exclusão de Cole Palmer da lista de 26 jogadores de Thomas Tuchel para o Mundial 2026 gerou uma polémica enorme. O avançado do Chelsea, um dos melhores jogadores da Premier League esta época, declarou publicamente que acredita ter sido excluído por razões pessoais. Harry Maguire ficou a saber da exclusão de forma indireta e expressou o seu choque nas redes sociais. Uma crise que divide os adeptos ingleses e coloca Tuchel sob enorme pressão antes do torneio.',
      category: 'ESCÂNDALO',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Final da Conference League — Crystal Palace vs Rayo Vallecano, as nossas melhores apostas',
      excerpt: 'A final da UEFA Conference League desta noite em Leipzig oferece oportunidades interessantes para os apostadores. O Crystal Palace é ligeiro favorito com odds a rondar 1.85, mas o Rayo Vallecano chega em excelente forma (4 jogos sem perder). Analisamos os mercados mais atrativos: resultado final, número de golos, marcador da partida e apostas ao intervalo. Ismaïla Sarr, com 9 golos na competição, é a nossa principal aposta para marcador a qualquer momento.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Robertson entre Tottenham e Juventus — O que pesa na decisão do lateral escocês?',
      excerpt: 'Andy Robertson, que vai deixar o Liverpool a custo zero, tem de escolher entre o Tottenham Hotspur e a Juventus. Os Spurs oferecem continuidade na Premier League e um projeto de reconstrução ambicioso. A Juventus oferece a Liga Europa e a possibilidade de jogar em Itália. Analisamos os prós e contras de cada opção para o capitão da Escócia, de 32 anos, e o impacto que a sua escolha terá nos planos de mercado de ambos os clubes para o verão de 2026.',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'LESÕES: O estado de saúde das estrelas antes do Mundial 2026 — Yamal, Messi e os casos mais preocupantes',
      excerpt: 'A menos de um mês do início do Campeonato do Mundo de 2026, o boletim médico das grandes estrelas preocupa os adeptos. Lamine Yamal (Espanha) está em dúvida com lesão muscular. Lionel Messi (Argentina) saiu lesionado no último jogo do Inter Miami. Fazemos o ponto de situação sobre os casos mais preocupantes, os prazos de recuperação estimados e o impacto que as ausências podem ter nas probabilidades de cada seleção chegar à fase final do torneio.',
      category: 'LESÕES',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: PSG vs Arsenal — Antevisão completa da Final da Champions 2026 em Budapeste',
      excerpt: 'Faltam 3 dias para a grande final da Liga dos Campeões 2025/26 em Budapeste. O PSG de Luis Enrique, atual campeão, enfrenta o Arsenal de Mikel Arteta, novo campeão da Premier League. Analisamos em profundidade os sistemas táticos de ambas as equipas, os duelos individuais mais importantes (Rice vs Vitinha, Saka vs Hakimi) e as estratégias que cada treinador poderá adotar para conquistar o troféu mais cobiçado do futebol europeu.',
      category: 'ANÁLISE TÁTICA',
      readTime: '13 min',
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
