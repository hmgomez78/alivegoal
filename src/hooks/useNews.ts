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
  // Remove HTML tags
  const clean = title.replace(/<[^>]*>/g, '').trim();
  
  // Adicionar drama se o título for muito neutro
  const dramaticPrefixes = [
    'BOMBA: ', 'CHOQUE: ', 'INACREDITÁVEL: ', 'URGENTE: ', 
    'EXCLUSIVO: ', 'REVELAÇÃO: ', 'CAOS: ', 'HISTÓRICO: '
  ];
  
  // Se o título já tem impacto, manter
  if (clean.includes('!') || clean.includes('BREAKING') || clean.length > 80) {
    return clean.substring(0, 100);
  }
  
  // Adicionar prefixo dramático aleatório (30% das vezes)
  if (Math.random() < 0.3) {
    const prefix = dramaticPrefixes[Math.floor(Math.random() * dramaticPrefixes.length)];
    return prefix + clean.substring(0, 80);
  }
  
  return clean.substring(0, 100);
}

function dramatizeExcerpt(text: string): string {
  // Remove HTML tags and limit length
  const clean = text.replace(/<[^>]*>/g, '').trim();
  const shortened = clean.substring(0, 150);
  
  // Adicionar frases de impacto no final
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
  const catStr = categories.join(' ').toLowerCase();
  
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
  
  return CATEGORIES[Math.floor(Math.random() * 3)]; // ÚLTIMA HORA, ANÁLISE TÁTICA, ou TIPS
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

// Notícias de fallback sempre atuais e dramáticas — atualizadas 07/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formatYesterday = yesterday.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'FINAL DOS SONHOS! Arsenal vs PSG em Budapeste — 30 de Maio 2026',
      excerpt: 'A final da UEFA Champions League 2025/26 está definida: Arsenal vs PSG no Puskás Aréna de Budapeste, a 30 de Maio. O Arsenal eliminou o Atlético de Madrid (5-1 no agregado) e o PSG afastou o Bayern num épico 6-5. Primeira final europeia do Arsenal desde 2006!',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO UCL: PSG beneficiou de 2 penáltis não marcados — Bayern exige investigação',
      excerpt: 'O jornal Bild classificou de escândalo a atuação do árbitro na semi-final PSG vs Bayern. Michael Ballack afirmou: "Dois penáltis claros não foram marcados e isso mudou o jogo". O Bayern exige investigação formal à UEFA. A BBC Sport também analisou as polémicas decisões.',
      category: 'ESCÂNDALO',
      readTime: '5 min',
      date: formatToday,
      source: 'Bild / BBC Sport',
    },
    {
      id: 3,
      title: 'NEYMAR ESBOFETEIA colega no treino do Santos — pedido de desculpas público',
      excerpt: 'Neymar protagonizou um incidente chocante ao esbofetear o jovem Robinho Júnior no treino do Santos. O vídeo viralizou nas redes sociais. Neymar pediu desculpas publicamente, mas o Santos abriu investigação interna. O caso pode comprometer a convocatória para o Mundial 2026.',
      category: 'ESCÂNDALO',
      readTime: '3 min',
      date: formatYesterday,
      source: 'The Guardian',
    },
    {
      id: 4,
      title: 'PIQUÉ SUSPENSO 6 JOGOS por violência contra árbitro — escândalo no FC Andorra',
      excerpt: 'Gerard Piqué, dono do FC Andorra, foi suspenso por 6 jogos e proibido de qualquer atividade futebolística em Espanha por 2 meses após confronto físico com o árbitro. A Federação Espanhola classificou o incidente como "violência leve". O presidente do clube também foi punido.',
      category: 'ESCÂNDALO',
      readTime: '4 min',
      date: formatYesterday,
      source: 'Marca / BBC Sport',
    },
    {
      id: 5,
      title: 'RONALDO HOJE: Al-Nassr vs Al-Shabab — título da Saudi Pro League em jogo!',
      excerpt: 'Cristiano Ronaldo e o Al-Nassr jogam hoje (18:00 GMT) contra o Al-Shabab numa partida decisiva para o título da Saudi Pro League. O Al-Nassr lidera com 5 pontos de vantagem sobre o Al-Hilal de Benzema. CR7 tem 25 golos e 12 assistências esta época.',
      category: 'ÚLTIMA HORA',
      readTime: '3 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ARSENAL quer KVARATSKHELIA do PSG — "O melhor extremo do mundo"',
      excerpt: 'O Arsenal está a preparar uma proposta milionária para contratar Khvicha Kvaratskhelia do PSG no verão. O extremo georgiano foi apelidado de "o melhor extremo do mundo" por Steven Gerrard. Mikel Arteta quer reforçar o ataque para a próxima época, independentemente do resultado da final.',
      category: 'TRANSFERÊNCIAS',
      readTime: '5 min',
      date: formatToday,
      source: 'FootballTransfers',
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
        // Misturar trending com fallback
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
