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

// Notícias de fallback — análises, contexto e investigação — 10/07/2026
function getFallbackNews(): NewsArticle[] {
  const formatToday = '10/07/2026';
  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Espanha vs Bélgica — O Jogo do Dia nos Quartos do Mundial 2026',
      excerpt: 'Espanha chega aos quartos de final do Mundial 2026 como a equipa mais dominante do torneio: zero golos sofridos, posse de bola avassaladora e Lamine Yamal em estado de graça. A Bélgica, liderada por um Kevin De Bruyne em modo despedida, eliminou os EUA de forma dramática. Analisamos os sistemas táticos, os duelos individuais chave (Yamal vs Castagne, Rodri vs De Bruyne) e as probabilidades de cada equipa avançar para as meias-finais. Uma batalha de estilos que pode ser o jogo do torneio.',
      category: 'ANÁLISE TÁTICA',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: Trump, Infantino e o Cartão Vermelho de Balogun — Como a Política Invadiu o Futebol',
      excerpt: 'O escândalo Balogun/Trump é o maior da história recente do futebol mundial. Pela primeira vez, um presidente dos EUA interferiu diretamente numa decisão da FIFA durante um Mundial. Trump ligou a Infantino, a FIFA cedeu, e Balogun jogou. A UEFA está furiosa, parlamentares europeus pedem investigação, e o precedente criado é aterrador. Analisamos as implicações legais e desportivas desta decisão sem precedentes e o que significa para o futuro da governança do futebol.',
      category: 'ESCÂNDALO',
      readTime: '13 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: Bruno Guimarães no Arsenal — O Que Arteta Ganha com o Médio Brasileiro',
      excerpt: 'A chegada de Bruno Guimarães ao Arsenal por £70 milhões é a transferência mais impactante do mercado de verão até agora. O médio brasileiro de 27 anos é um dos melhores da Premier League e resolve o maior problema dos Gunners: a criatividade e intensidade no meio-campo. Analisamos como Guimarães se encaixa no sistema de Arteta, o impacto na formação, e se esta contratação coloca o Arsenal como favorito ao título 2026/27. O Newcastle perde o seu melhor jogador mas recebe uma fortuna para reinvestir.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Espanha vs Bélgica — Análise Completa e as Melhores Picks para Hoje',
      excerpt: 'O segundo quarto de final do Mundial 2026 oferece oportunidades únicas para apostadores. Espanha não sofreu um golo em todo o torneio, mas a Bélgica tem um ataque poderoso com De Bruyne, Doku e Trossard. Recomendamos Espanha a Vencer/Empate (1.45), Menos de 2.5 Golos (1.80) dado o estilo defensivo de ambas as equipas, e Lamine Yamal a ser o melhor jogador do jogo (3.50). Análise completa das estatísticas e as nossas melhores picks para este duelo épico.',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE TÁTICA: Sandro Tonali para o Tottenham — O Impacto de De Zerbi no Mercado de Verão',
      excerpt: 'A chegada de Sandro Tonali ao Tottenham por €100 milhões é um sinal claro da ambição de Roberto De Zerbi. O médio italiano, que revelou que De Zerbi foi decisivo na sua escolha, junta-se a Mateus Fernandes (€98M do West Ham) numa reconstrução massiva do meio-campo dos Spurs. Analisamos o estilo de jogo de De Zerbi, como Tonali se encaixa no seu sistema de pressão alta e posse, e se o Tottenham pode finalmente competir pelos títulos na próxima época.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ÚLTIMA HORA: Mbappé Iguala Recorde de 1958 — França nas Meias-Finais pela 3ª Vez Consecutiva',
      excerpt: 'Kylian Mbappé escreveu mais uma página de ouro na história do futebol! Com o seu 8º golo no Mundial 2026 frente a Marrocos (2-0), o capitão francês igualou o recorde histórico de Just Fontaine de 1958. Mbappé é agora o único jogador a chegar às meias-finais nos seus três primeiros Mundiais. A França aguarda o vencedor de Espanha vs Bélgica para a semifinal de 14 de julho. Analisamos a performance histórica de Mbappé e as chances da França de conquistar o título.',
      category: 'ÚLTIMA HORA',
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
