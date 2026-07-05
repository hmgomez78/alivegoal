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

// Notícias de fallback — análises, contexto e investigação — 04/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '05/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Brasil vs Noruega — Pode Haaland Destruir a Defesa Brasileira nos Oitavos?',
      excerpt: 'O jogo mais aguardado dos oitavos de final do Mundial 2026 é hoje: Brasil vs Noruega no MetLife Stadium. Haaland marcou 6 golos contra Gabriel em 11 confrontos pela Premier League — uma estatística que assusta qualquer adepto brasileiro. O Brasil mostrou fragilidades defensivas contra o Japão e a Noruega vai certamente explorar os espaços entre a defesa e o meio-campo. Por outro lado, Vini Jr. e Rayan são uma ameaça constante pelos flancos. Analisamos os esquemas táticos, os pontos fracos de cada equipa e os cenários mais prováveis para este duelo de gigantes.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Bastoni e o Escândalo de Prostituição de Menores — O Que Sabemos Até Agora',
      excerpt: 'O caso Bastoni está a abalar o futebol italiano. O defesa do Inter de Milão está sob investigação da Procuradoria de Milão por prostituição de menores, num incidente alegadamente ocorrido em 2020. Também envolvidos: Riccardo Calafiori (Arsenal), Daniel Maldini e Kevin Bonifazi. Bastoni recusou falar com os investigadores. O Real Madrid suspendeu as negociações de 60M. Investigamos o contexto legal, as implicações para a carreira do jogador, e como o Inter está a gerir a crise. Um escândalo que pode mudar o futebol italiano.',
      category: 'ESCÂNDALO',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TIPS DE APOSTAS: Brasil vs Noruega e México vs Inglaterra — As Nossas Picks para Hoje',
      excerpt: 'Dois jogos imperdíveis hoje nos oitavos do Mundial 2026. Brasil vs Noruega (21:00 UTC): o Brasil é ligeiro favorito (-115) mas Haaland é um perigo constante. Recomendamos Ambas Marcam a 1.85 e Mais de 2.5 Golos a 1.90. México vs Inglaterra (01:00 UTC): a Inglaterra é favorita (+125) mas a altitude da Cidade do México e o apoio do público podem fazer a diferença. Recomendamos Empate ou México a 1.65. Análise completa com estatísticas, forma recente e as nossas melhores picks.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Bernardo Silva ao Real Madrid de Graça — O Impacto no Mercado de Verão',
      excerpt: 'Bernardo Silva vai assinar pelo Real Madrid em fim de contrato, deixando o Manchester City de graça. O Barça e o Atlético ficaram a ver. Florentino Pérez ofereceu 15M por ano durante 4 anos. Analisamos o impacto desta contratação no Real Madrid (que já tem Bellingham, Vini Jr. e Mbappé), o que o City vai fazer para o substituir, e como isto muda o equilíbrio de forças na La Liga. Bernardo Silva é um dos melhores médios do mundo e chega ao Bernabéu sem custar um cêntimo em taxa de transferência.',
      category: 'TRANSFERÊNCIAS',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE: Marrocos 3-0 Canadá — Ounahi Mostrou ao Mundo Que É um Craque de Nível Mundial',
      excerpt: 'Marrocos destruiu o Canadá por 3-0 em Houston e avançou para os quartos de final do Mundial 2026. Azzedine Ounahi foi o grande herói com dois golos e uma exibição de gala. Analisamos como Marrocos anulou completamente o ataque canadiano, a evolução tática da equipa de Regragui desde o Qatar 2022, e as perspetivas para os quartos de final. Marrocos vai enfrentar o vencedor de Brasil vs Noruega — um duelo que promete ser histórico. O futebol africano está a conquistar o mundo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Man United Quer Tchouaméni e Summerville — INEOS Planeia Revolução no Meio-Campo',
      excerpt: 'O Manchester United está a preparar um verão de grandes investimentos. Tchouaméni (Real Madrid) é o sonho do INEOS para o meio-campo, mas o Real Madrid exige uma fortuna. Summerville (West Ham) quer apenas o United e pode ser contratado por 40M. Analisamos como estas contratações mudariam o United, os desafios financeiros do Fair Play Financeiro, e se o INEOS tem plano claro para devolver o clube ao topo da Premier League. Uma análise completa do projeto de reconstrução do Manchester United.',
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
