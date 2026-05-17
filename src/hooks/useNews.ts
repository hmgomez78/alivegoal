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

// Notícias de fallback — análises, tips e contexto — 17/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Como Guardiola ganhou a FA Cup com Semenyo — o plano secreto que destruiu o Chelsea em Wembley',
      excerpt: 'O Manchester City venceu a FA Cup 1-0 contra o Chelsea num jogo tático e intenso. Analisamos como Pep Guardiola preparou o jogo, o papel crucial de Antoine Semenyo como arma surpresa, e por que o Chelsea, apesar de dominar a posse, nunca conseguiu criar perigo real. A vitória garante ao City um lugar na Europa League e pode ser o ponto de viragem para uma reconstrução profunda do plantel no verão. Que jogadores ficam e quem sai de Manchester?',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'TIPS DE APOSTAS: La Liga Jornada Final — Sevilla vs Real Madrid e Barcelona vs Betis — as apostas com maior valor hoje!',
      excerpt: 'A última jornada da La Liga promete drama total! O Real Madrid, já sem título (Barcelona campeão), joga em Sevilha sem pressão mas com Mbappé a querer terminar a época com golos. O Barcelona recebe o Betis em casa e pode festejar. Analisamos os cenários de descida com Elche, Getafe e Osasuna em risco, identificamos as apostas de maior valor e damos as nossas picks para esta jornada histórica do futebol espanhol. Odds e análises detalhadas incluídas!',
      category: 'TIPS DE APOSTAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Derby della Capitale — Roma vs Lazio hoje na Serie A — o jogo mais explosivo de Itália com tudo em jogo!',
      excerpt: 'O Derby della Capitale entre Roma e Lazio é hoje na Serie A e promete ser um dos jogos mais intensos da temporada. A Roma, com Malen confirmado por €25M após a qualificação europeia, quer terminar em grande. A Lazio luta por uma vaga europeia. Analisamos o historial recente, os jogadores-chave, o impacto do escândalo do Inter Milan nas apostas italianas e as melhores apostas para este derby histórico. Quem vai dominar Roma esta tarde?',
      category: 'ANÁLISE TÁTICA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TRANSFERÊNCIAS: Bastoni ao Barcelona por €60M — Inter Milan em duplo escândalo: FFP e perda do melhor defesa!',
      excerpt: 'O Inter Milan enfrenta uma semana catastrófica: além do escândalo do Fair Play Financeiro com alegadas receitas falsas de €300M, o clube pode perder Alessandro Bastoni para o Barcelona por €60M. O diretor desportivo do Barça, Deco, viajou a Londres para reunir com os agentes do defesa italiano. Analisamos o impacto desta dupla crise no Inter, as probabilidades de Bastoni aceitar a mudança e o que isto significa para o futebol italiano. O Inter pode sobreviver a este verão?',
      category: 'TRANSFERÊNCIAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TIPS DE APOSTAS: Brasileirão Série A — Botafogo vs Corinthians e Bahia vs Grêmio — análise completa dos jogos de hoje!',
      excerpt: 'O Brasileirão Série A tem uma tarde repleta de jogos emocionantes! O Botafogo, atual campeão, recebe o Corinthians num duelo de alto nível. O Bahia enfrenta o Grêmio num jogo com implicações na tabela. Analisamos os jogos do dia, incluindo o Palmeiras vs Cruzeiro já disputado, e damos as nossas picks para as apostas de maior valor no futebol brasileiro. Odds reais, estatísticas e análise detalhada para os apostadores mais exigentes!',
      category: 'TIPS DE APOSTAS',
      readTime: '7 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ESCÂNDALO: Arne Slot em risco de despedimento — Salah força saída do treinador com declarações explosivas após derrota 4-2!',
      excerpt: 'As declarações de Mohamed Salah após a derrota por 4-2 frente ao Aston Villa são vistas como uma crítica direta ao trabalho de Arne Slot. O egípcio, no último ano de contrato, parece estar a usar a sua influência para forçar uma mudança na liderança técnica. A direção do Liverpool está dividida: uns querem dar mais tempo a Slot, outros preferem uma mudança imediata. Analisamos os cenários possíveis, os candidatos ao cargo e o impacto nas apostas para a próxima temporada. Será que Salah fica se Slot sair?',
      category: 'ESCÂNDALO',
      readTime: '9 min',
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
