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

// Notícias de fallback — análises, tips e contexto — 28/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como o Crystal Palace anulou o Rayo Vallecano na final da Conference League',
      excerpt: 'A vitória do Crystal Palace por 1-0 sobre o Rayo Vallecano na final da UEFA Conference League não foi apenas sobre o golo de Mateta, mas sim uma masterclass tática de Oliver Glasner. Analisamos como a linha defensiva dos Eagles bloqueou as transições rápidas do Rayo e como o meio-campo controlou o ritmo do jogo. Uma vitória que consolida o trabalho de Glasner no clube londrino.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: Copa Libertadores — Palmeiras vs Junior Barranquilla, as melhores oportunidades',
      excerpt: 'O Palmeiras precisa de uma vitória no Allianz Parque contra o Junior Barranquilla para garantir a qualificação direta sem depender de terceiros. Com o Verdão em boa forma em casa, as odds para vitória simples estão baixas, mas o mercado de "Palmeiras para vencer sem sofrer golos" oferece valor interessante. Analisamos os confrontos diretos e o momento de ambas as equipas.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: O impacto da chegada de Anthony Gordon ao Barcelona — Quem perde espaço?',
      excerpt: 'A contratação de Anthony Gordon por 70 milhões de euros agita o plantel do Barcelona. Com a chegada do extremo inglês, jogadores como Raphinha e Ferran Torres podem ver o seu tempo de jogo reduzido. Analisamos como Gordon encaixa no sistema tático do Barça, o seu papel na pressão alta e o que esta transferência significa para o futuro do ataque catalão na próxima temporada.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'ESCÂNDALO: O caso de racismo e suspensão que abala a base do Palmeiras na Libertadores',
      excerpt: 'A suspensão de 4 meses imposta pela Conmebol a Eduardo Conceição, de 16 anos, por imitar um macaco num gesto que o jogador afirma ser de protesto contra insultos racistas, gerou indignação. O Palmeiras já anunciou que vai recorrer da decisão. Especialistas jurídicos analisam o caso e o precedente perigoso que a Conmebol pode estar a criar ao punir a vítima de racismo.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'LESÕES: O plano de recuperação de Messi — Como a Argentina gere a fadiga do capitão',
      excerpt: 'A fadiga muscular na coxa esquerda de Lionel Messi liga os alarmes na Argentina, mas a equipa médica de Lionel Scaloni tem um plano claro. O objetivo é gerir os minutos de Messi nos treinos e poupá-lo nos primeiros jogos da fase de grupos do Mundial 2026, garantindo que o camisola 10 chega na máxima força às fases a eliminar. Detalhamos o cronograma de recuperação.',
      category: 'LESÕES',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: O plano de Roberto De Zerbi para reconstruir o Tottenham na próxima época',
      excerpt: 'Após evitar a despromoção, Roberto De Zerbi declarou: "Fechamos uma página e abrimos outra". O treinador italiano já prepara a revolução no Tottenham para 2026/27. Analisamos os perfis de jogadores que De Zerbi procura no mercado, as mudanças táticas esperadas e como os Spurs pretendem voltar a lutar pelos lugares europeus na Premier League.',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
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
