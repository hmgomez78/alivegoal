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

// Notícias de fallback — análises, contexto e investigação — 03/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '03/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como Portugal Eliminou a Croácia — Ramos, Ronaldo e a Magia de Leão',
      excerpt: "Portugal venceu a Croácia 2-1 num jogo dramático em Toronto. Analisamos como Roberto Martínez reorganizou a equipa após o golo de Perišić, a decisão de colocar Ronaldo a marcar o penálti (68') e o papel crucial de Rafael Leão na assistência para Ramos no 90+4'. A Croácia de Modric jogou bem mas ficou sem forças no final. Portugal avança para os oitavos de final com uma confiança enorme. Uma análise detalhada dos momentos decisivos desta noite histórica em Toronto.",
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Duarte Gomes e o Caso da Arbitragem — O Que Sabemos Até Agora',
      excerpt: 'A demissão de Duarte Gomes como Diretor Técnico de Arbitragem da FPF abriu uma caixa de Pandora no futebol português. Investigamos as alegações de manipulação de resultados, os clubes envolvidos e o que a FPF comunicou ao Ministério Público. Varandas exige provas, o Benfica e o Porto reagem. Comparamos este caso com o Apito Dourado de 2004 e analisamos as consequências possíveis para a Liga Portugal. Uma investigação aprofundada sobre o maior escândalo do futebol português em anos.',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Argentina vs Cabo Verde e Colômbia vs Gana — As Nossas Picks de Hoje',
      excerpt: 'Três jogos de enorme interesse para apostadores hoje nos 16 avos de final do Mundial 2026. Argentina é favorita esmagadora contra Cabo Verde (-667 moneyline), mas a odd de Under 2.5 @+125 tem valor. Colômbia vs Gana: os colombianos são favoritos a -190 e o handicap asiático -1 @-113 é a nossa pick principal. Austrália vs Egito é o jogo mais equilibrado do dia. Análise completa com estatísticas, forma recente e recomendações de apostas para cada jogo.',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Hjulmand do Sporting — Atlético de Madrid Avança, Mas Há Concorrência da Premier League',
      excerpt: 'Morten Hjulmand está prestes a deixar o Sporting CP. O Atlético de Madrid tem acordo de princípio com o jogador e está na frente da corrida, mas há interesse sério da Premier League e da Serie A. O Sporting pode receber mais de €50 milhões. Analisamos o impacto desta saída no plantel de Rúben Amorim para a próxima época, quem pode substituir o dinamarquês e como o Sporting planeia reinvestir a verba. Uma análise completa do mercado de transferências do clube de Alvalade.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: Klopp vs Nagelsmann — A Crise da Seleção Alemã e o Futuro da Mannschaft',
      excerpt: 'A Alemanha está em crise total após a eliminação frente ao Paraguai. O DFB pediu a demissão de Nagelsmann, que recusa sair. Jürgen Klopp é o candidato número um para o substituir. Analisamos o que correu mal na Alemanha neste Mundial, as investigações de corrupção que envolvem o DFB, e o que Klopp poderia trazer à seleção alemã. Com o Euro 2028 e o Mundial 2030 no horizonte, a Alemanha precisa urgentemente de uma revolução. Uma análise profunda da crise que abala o futebol germânico.',
      category: 'ÚLTIMA HORA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE TÁTICA: Messi e Argentina vs Cabo Verde — Como os Campeões do Mundo Podem Vencer',
      excerpt: 'Argentina enfrenta hoje Cabo Verde em Miami num jogo que parece fácil no papel mas pode ser complicado. Cabo Verde é a equipa mais trabalhadora do torneio (432.796 metros percorridos) e tem uma organização defensiva sólida. Analisamos como Scaloni planeia usar Messi, Lautaro Martínez e Mac Allister para quebrar o bloco baixo cabo-verdiano. A Argentina cobriu -1.5 em 8 dos últimos 9 jogos. Previsão: vitória argentina por 2-0 com Lautaro a marcar. Uma análise tática detalhada do jogo mais aguardado do dia.',
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
