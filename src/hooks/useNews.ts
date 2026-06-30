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

// Notícias de fallback — análises, contexto e investigação — 30/06/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '30/06/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O Erro de Nagelsmann — Como o Paraguai anulou a Alemanha',
      excerpt: 'A eliminação da Alemanha frente ao Paraguai nos oitavos de final vai ficar para a história. Analisamos como a defesa compacta do Paraguai, liderada por um inspirado Orlando Gill na baliza, conseguiu neutralizar o ataque germânico. O golo de Julio Enciso e a incapacidade de Julian Nagelsmann em encontrar soluções táticas além dos cruzamentos para Havertz ditaram o fim da linha para a "Mannschaft".',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO VAR: O Golo Anulado a Jonathan Tah que mudou a história do Mundial',
      excerpt: 'No minuto 101 do prolongamento entre Alemanha e Paraguai, Jonathan Tah marcou o que parecia ser o golo da vitória. No entanto, o VAR interveio e anulou o lance por uma suposta falta de Waldemar Anton sobre o guarda-redes. Especialistas de arbitragem estão divididos, com muitos a argumentar que o contacto foi normal e o golo deveria ter sido validado. A Alemanha chora a eliminação.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: França vs Suécia e Costa do Marfim vs Noruega — Onde está o valor?',
      excerpt: 'Os oitavos de final do Mundial 2026 continuam com grandes jogos. A França é favorita contra a Suécia, mas os nórdicos têm sido surpreendentes. A Costa do Marfim defronta a Noruega num jogo que promete golos. Recomendamos apostar em Ambas Marcam no jogo da Noruega (@1.85) e Vitória da França (@1.55). O acumulador do dia paga @2.86!',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: O Efeito Dominó — Maresca no City e Diomande no PSG',
      excerpt: 'O mercado de transferências não pára! A saída de Enzo Maresca do Chelsea para o Manchester City por 20M€ deixa os londrinos à procura de um novo treinador. Entretanto, o PSG prepara-se para garantir Yan Diomande, depois do jogador ter rejeitado uma oferta de 100M€ (com bónus) do Liverpool. Analisamos o impacto destas movimentações na Premier League e na Ligue 1.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: O Herói Improvável — Gabriel Martinelli salva o Brasil do abismo',
      excerpt: 'O Brasil sofreu muito para ultrapassar o Japão nos oitavos de final. A equipa asiática esteve a vencer e mostrou grande organização, mas a entrada de Gabriel Martinelli mudou o jogo. O golo do avançado do Arsenal aos 95 minutos evitou o prolongamento e garantiu a passagem do Brasil. Analisamos as dificuldades da "Canarinha" e o que precisam melhorar para os quartos de final.',
      category: 'ÚLTIMA HORA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'BASTIDORES: A Crise no Chelsea após a saída de Enzo Maresca',
      excerpt: 'A rescisão de contrato de Enzo Maresca por 20M€ para rumar ao Manchester City deixou o Chelsea em choque. Os adeptos estão furiosos com a direção e os jogadores surpreendidos. Investigamos os motivos que levam um treinador a trocar o Chelsea pelo principal rival, e quem são os favoritos para assumir o cargo em Stamford Bridge.',
      category: 'BASTIDORES',
      readTime: '5 min',
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
