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

// Notícias de fallback — análises, tips e contexto — 30/05/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Arsenal vs PSG — Os duelos individuais que vão decidir a final da Champions em Budapeste',
      excerpt: 'A grande final da UEFA Champions League 2025/26 coloca frente a frente duas filosofias distintas. O Arsenal de Mikel Arteta aposta no controlo posicional e na pressão alta, enquanto o PSG de Luis Enrique procura explorar transições rápidas com Mbappé. Detalhamos os duelos cruciais: a batalha no meio-campo entre Declan Rice e Vitinha, e como a defesa londrina tentará anular o ataque demolidor dos parisienses liderado por Dembélé.',
      category: 'ANÁLISE TÁTICA',
      readTime: '14 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: A guerra nas redes sociais entre Atlético de Madrid e Barcelona — Quem vai ganhar a batalha por Julián Álvarez?',
      excerpt: 'A disputa pelo avançado argentino Julián Álvarez atingiu um novo nível de tensão após o Atlético de Madrid publicar propostas fictícias por Yamal, Pedri e Raphinha em resposta à oferta de 100 milhões do Barcelona. Analisamos o impacto desta guerra mediática no mercado de transferências, as motivações de cada clube e as probabilidades reais de Álvarez mudar para o Camp Nou antes do Mundial 2026.',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: Mourinho no Real Madrid — O que muda na estratégia dos merengues para 2026/27',
      excerpt: 'O regresso de José Mourinho ao Santiago Bernabéu é a maior notícia do mercado de treinadores. Após a confirmação de Fabrizio Romano, analisamos como o estilo defensivo e pragmático do "Special One" pode transformar um Real Madrid que perdeu a Champions para o PSG. Quais os jogadores que beneficiam com Mourinho? E quem pode estar em risco? Uma análise profunda ao impacto desta contratação histórica.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'LESÕES: Neymar fora do jogo de abertura do Brasil — Ancelotti revela o plano B para o Mundial 2026',
      excerpt: 'A lesão de grau 2 na perna de Neymar Jr. foi confirmada pelo médico da CBF, Rodrigo Lasmar, e o craque está "altamente improvável" de jogar contra Marrocos a 13 de junho. Carlo Ancelotti terá de reinventar o esquema tático da Seleção Canarinha. Analisamos as opções disponíveis: Rodrygo num papel mais central, Vini Jr. como referência ofensiva, e como o Brasil pode ser ainda mais imprevisível sem o seu número 10.',
      category: 'LESÕES',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'TRANSFERÊNCIAS: Konaté sai do Liverpool grátis — Análise ao impacto na defesa dos reds e os candidatos à sua substituição',
      excerpt: 'A saída de Ibrahima Konaté do Liverpool como agente livre é um golpe inesperado para Arne Slot. O defesa central francês era uma das peças-chave da equipa e a sua perda deixa um vazio difícil de preencher. Analisamos os candidatos para o substituir, desde Gvardiol ao próprio Konaté no Real Madrid, e como o Liverpool pode reagir no mercado de verão para manter as suas ambições na Premier League.',
      category: 'TRANSFERÊNCIAS',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TIPS DE APOSTAS: Final da Champions League — Arsenal vs PSG, análise completa e previsão para a aposta do século',
      excerpt: 'A final da UEFA Champions League entre Arsenal e PSG é o evento mais apostado do ano. Analisamos as estatísticas de ambas as equipas, os registos em jogos decisivos, as odds disponíveis nos principais bookmakers e apresentamos a nossa previsão fundamentada. O Arsenal entra como ligeiro favorito em casa, mas o PSG tem a experiência de ser bicampeão. Qual é a aposta com mais valor esta noite?',
      category: 'TIPS DE APOSTAS',
      readTime: '12 min',
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
