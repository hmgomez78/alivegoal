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

// Notícias de fallback — análises, tips e contexto — 18/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O que esperar do Chelsea de Xabi Alonso — como o espanhol vai transformar os Blues numa potência europeia',
      excerpt: 'A chegada de Xabi Alonso ao Chelsea representa uma das maiores revoluções táticas do futebol inglês em anos. O ex-médio espanhol, que fez história no Bayer Leverkusen com um futebol agressivo, vertical e baseado na pressão alta, vai tentar implementar a mesma filosofia num Chelsea que tem oscilado entre sistemas e estilos. Analisamos os jogadores que melhor se adaptam ao seu sistema, os reforços prioritários que já pediu — incluindo Morgan Rogers e um novo guarda-redes — e o que os adeptos podem esperar na época 2026/27.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: Arsenal vs Burnley hoje às 19:00 — análise completa e as melhores apostas para o jogo da noite!',
      excerpt: 'O Arsenal recebe o Burnley hoje às 19:00 num jogo decisivo para a classificação final da Premier League. Os Gunners precisam de vencer para garantir a sua vaga na Champions League da próxima época. Analisamos o historial recente, as estatísticas de golos, a forma das duas equipas e identificamos as apostas de maior valor para esta noite. O Arsenal marcou em 89% dos jogos em casa esta temporada. Odds reais, análise detalhada e as nossas picks para este jogo imperdível!',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Mourinho no Real Madrid — o que muda para Mbappé, Vinicius e o projeto Madridista em 2026/27',
      excerpt: 'O regresso de José Mourinho ao Real Madrid vai mudar tudo no Bernabéu. O treinador português, famoso pelo seu pragmatismo e organização defensiva, vai ter de gerir estrelas como Mbappé e Vinicius Jr., que foram vaiados pelos próprios adeptos esta temporada. Analisamos como Mourinho pode transformar o Real Madrid, que posições vai reforçar, quais as estrelas que podem sair e se o "Special One" tem o que é preciso para devolver os títulos ao clube mais titulado do mundo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Gyökeres ao Manchester United — Sporting em alerta máximo com Carrick a confirmar interesse no avançado sueco',
      excerpt: 'Michael Carrick, recém-confirmado como treinador permanente do Manchester United, já definiu Viktor Gyökeres como o alvo número 1 para o ataque. O avançado sueco, que marcou 43 golos esta temporada pelo Sporting CP, tem uma cláusula de rescisão de €80 milhões. O Sporting está em alerta máximo e já identificou possíveis substitutos, incluindo Jonathan David e Serhou Guirassy. Analisamos os cenários possíveis, o impacto financeiro para o Sporting e se Gyökeres vai mesmo aceitar a mudança para Old Trafford neste verão.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Última jornada da Premier League amanhã — Chelsea vs Tottenham, Liverpool vs Brentford e City vs Villa — picks completas!',
      excerpt: 'Amanhã, 19 de Maio, é o último dia da Premier League 2025/26 e há drama total em vários jogos. O Chelsea vs Tottenham é um derby explosivo com ambos os clubes a lutar por objetivos europeus. O Liverpool vs Brentford pode decidir o Top 4. O Manchester City vs Aston Villa tem implicações na descida. Damos as nossas picks para todos os jogos com análise detalhada, odds reais e percentagens de probabilidade. A jornada mais emocionante do ano está aí!',
      category: 'TIPS DE APOSTAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ESCÂNDALO: FIFA atrasando pagamentos a revendedores do Mundial 2026 — milhares de dólares retidos em alegada violação dos próprios contratos',
      excerpt: 'A FIFA está a atrasar pagamentos a revendedores oficiais de bilhetes do Mundial 2026, com alguns casos a envolver milhares de dólares retidos em aparente violação dos próprios contratos legais. O escândalo surge a apenas semanas do início do torneio nos EUA, México e Canadá, e levanta sérias questões sobre a gestão financeira do organismo que governa o futebol mundial. Vários revendedores já contactaram advogados e ameaçam processar a FIFA. A organização ainda não comentou publicamente as acusações.',
      category: 'ESCÂNDALO',
      readTime: '6 min',
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
