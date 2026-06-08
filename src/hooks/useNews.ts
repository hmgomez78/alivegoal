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

// Notícias de fallback — análises, contexto e investigação — 08/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE: O colapso de Eriksen — o que aconteceu e o que significa para a Dinamarca no Mundial?',
      excerpt: 'Christian Eriksen voltou a colapsar em campo durante o amistoso Dinamarca vs Ucrânia, apenas 5 anos depois do episódio traumático no Euro 2020. O médio do Manchester United saiu consciente e a falar, mas o jogo foi abandonado. Analisamos o historial médico do jogador, o impacto psicológico para a equipa dinamarquesa, e o que este episódio significa para a participação da Dinamarca no Mundial 2026. A Dinamarca estreia-se no torneio a 15 de junho — terá Eriksen condições de jogar?',
      category: 'ÚLTIMA HORA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'INVESTIGAÇÃO: O escândalo dos bilhetes do Mundial 2026 — como a FIFA falhou os adeptos',
      excerpt: 'A FIFA está sob investigação nos EUA por um suposto esquema de venda ilegal de bilhetes para o Mundial 2026. Promotores federais investigam a revenda de bilhetes a preços 10 vezes superiores ao valor oficial através de intermediários ligados a dirigentes da FIFA. Este não é o primeiro escândalo da organização — em 2015, vários dirigentes foram detidos por corrupção. Analisamos o padrão de comportamento da FIFA, as consequências para os adeptos, e o que pode mudar.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE TÁTICA: Xabi Alonso no Chelsea — que futebol podemos esperar em Stamford Bridge?',
      excerpt: 'Xabi Alonso assumiu o comando do Chelsea com um orçamento de €200M+ para a janela de verão. O treinador espanhol, que fez um trabalho extraordinário no Bayer Leverkusen, vai trazer o seu estilo de pressão alta e posse de bola ao futebol inglês. Analisamos o sistema tático preferido de Alonso, os perfis de jogadores que procura, e porque Rafael Leão e Michael Olise são os alvos ideais para o seu projeto. Pode o Chelsea finalmente competir pelo título com Alonso?',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ANÁLISE: A crise diplomática Irão-EUA e o impacto no Mundial 2026',
      excerpt: 'Trump ameaçou banir a seleção iraniana do Mundial 2026, e vários membros do staff técnico já foram barrados de entrar nos EUA. O Irão instalou-se em Tijuana, México, e ameaça levar o caso ao Tribunal Arbitral do Desporto. Analisamos o enquadramento legal desta situação, os precedentes históricos de crises políticas em Mundiais, e o que a FIFA pode fazer para garantir a participação de todas as seleções qualificadas. É a maior crise política na história recente do futebol.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Mundial 2026 começa a 11 de junho — as melhores apostas para a fase de grupos',
      excerpt: 'O Mundial 2026 arranca em 3 dias com México vs África do Sul no Estádio Azteca. Com 48 seleções e 104 jogos, as oportunidades de apostas são imensas. Analisamos os favoritos ao título (Espanha, Argentina, França, Brasil), as surpresas potenciais (Marrocos, Japão, Portugal), e as melhores apostas para a fase de grupos. Espanha é a favorita com odds de 5.00, seguida de Argentina a 5.50 e França a 6.00. Quem vai levantar o troféu em Los Angeles a 19 de julho?',
      category: 'TIPS DE APOSTAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Mateus Fernandes para o Man United — o próximo passo da era Carrick',
      excerpt: 'Após confirmar Ederson, o Manchester United avança para Mateus Fernandes do West Ham por €25M. O jovem médio português de 21 anos foi um dos melhores jogadores do West Ham na época passada, apesar da descida do clube ao Championship. Fabrizio Romano confirma que as negociações estão avançadas e que o jogador quer a mudança para Old Trafford. Com Bruno Fernandes como referência e Carrick a construir um meio-campo competitivo, o United parece finalmente a ter uma estratégia clara de recrutamento.',
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
