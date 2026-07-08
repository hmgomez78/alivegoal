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

// Notícias de fallback — análises, contexto e investigação — 08/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '08/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O Fim da Era Ronaldo — O Legado e o Futuro de Portugal Após o Mundial 2026',
      excerpt: 'A derrota de Portugal por 1-0 frente a Espanha assinalou o fim da brilhante carreira de Cristiano Ronaldo em Campeonatos do Mundo. O jogador de 41 anos não conseguiu encontrar as redes adversárias, mas o seu legado permanece intocável. Analisamos o impacto de CR7 nas últimas duas décadas, as razões da eliminação frente à "La Roja" de Luis de la Fuente, e como a seleção portuguesa precisará de se reinventar sob a liderança de novos talentos para os próximos anos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: "Trump-gate" na FIFA — A Investigação Europeia a Gianni Infantino',
      excerpt: 'O caso Folarin Balogun tornou-se numa enorme dor de cabeça política para a FIFA. Após a controversa intervenção de Donald Trump que resultou no adiamento da suspensão do avançado norte-americano, dezenas de membros do Parlamento Europeu exigem agora uma investigação oficial a Gianni Infantino. A decisão, vista como uma capitulação da FIFA face a pressões políticas, levantou sérias dúvidas sobre a integridade e independência da organização.',
      category: 'ESCÂNDALO',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: O Novo Meio-Campo dos Spurs — Como Tonali Muda Tudo para De Zerbi',
      excerpt: 'O Tottenham quebrou o seu recorde de transferências ao garantir Sandro Tonali por uns impressionantes £100 milhões (€108M). O médio italiano de 26 anos traz uma combinação única de visão, agressividade e controlo tático que Roberto De Zerbi considera fundamental. Com mais de £237M gastos neste verão, analisamos como o Tottenham se está a posicionar para lutar pelo título da Premier League e o impacto de Tonali no sistema de jogo da equipa.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Previsão dos Quartos de Final do Mundial — Argentina vs Suíça e Espanha vs Bélgica',
      excerpt: 'Os quartos de final do Mundial 2026 prometem confrontos épicos! A Argentina de Messi enfrenta uma Suíça resiliente (sábado, 11 de julho). Recomendamos apostar na vitória da Argentina e em Menos de 2.5 Golos, dada a sólida defesa helvética. No outro jogo (sexta, 10 de julho), a Espanha, ainda sem sofrer golos, defronta a Bélgica que acabou de golear os EUA. A nossa aposta vai para a Espanha a qualificar-se, com ambas as equipas a marcar.',
      category: 'TIPS DE APOSTAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE TÁTICA: O Renascimento de Messi e a Controvérsia Contra o Egito',
      excerpt: 'A Argentina conseguiu uma vitória dramática por 3-2 contra o Egito nos oitavos de final, mas o jogo não escapou à polémica, com queixas egípcias sobre a arbitragem. Lionel Messi continua a desafiar a idade, orquestrando a reviravolta argentina. Analisamos a dinâmica ofensiva da equipa de Scaloni, as vulnerabilidades defensivas expostas por Mohamed Salah e Omar Marmoush, e o que a Argentina precisa de corrigir para o duelo contra a Suíça.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Mercado de Guarda-Redes Aquece — Meslier no Arsenal e Especulações no Man United',
      excerpt: 'O Arsenal fez um movimento inteligente ao garantir Illan Meslier a custo zero após a sua saída do Leeds United. O guardião francês traz experiência e competição para a baliza dos Gunners. Entretanto, o mercado agita-se noutras paragens: o Manchester United pondera uma oferta astronómica de £85M por Aurélien Tchouaméni do Real Madrid para resolver os seus problemas no meio-campo. Uma análise detalhada aos movimentos mais recentes da Premier League.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
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
