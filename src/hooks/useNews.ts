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

// Notícias de fallback — análises, tips e contexto — 01/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: O que o Real Madrid ganha com o regresso de José Mourinho — A nova era merengue',
      excerpt: 'José Mourinho está de volta ao Santiago Bernabéu! Analisamos como o treinador português poderá organizar taticamente a equipa do Real Madrid, com um plantel recheado de estrelas como Vinícius Jr., Bellingham e Mbappé. Irá o "Special One" adotar um estilo mais pragmático ou apostar no futebol ofensivo? Uma análise profunda ao impacto de Mourinho na La Liga.',
      category: 'ANÁLISE TÁTICA',
      readTime: '12 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'ESCÂNDALO: FIFA no banco dos réus — Como os preços do Mundial 2026 estão a revoltar os adeptos',
      excerpt: 'As Procuradorias-Gerais de Nova Iorque e Nova Jérsia abriram uma investigação à FIFA devido aos preços exorbitantes dos bilhetes para o Mundial 2026. Analisamos as táticas de "escassez falsa" e as relocalizações de lugares que levaram a este processo legal. O que significa isto para os adeptos que já compraram bilhetes e para a imagem da organização?',
      category: 'ESCÂNDALO',
      readTime: '15 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'TRANSFERÊNCIAS: Rafael Leão na porta de saída — Quais os possíveis destinos para o internacional português?',
      excerpt: 'Rafael Leão confirmou que a sua etapa no AC Milan chegou ao fim. Com uma cláusula de 175 milhões de euros, o extremo português é um dos jogadores mais cobiçados do mercado. Analisamos o interesse do Manchester United e do PSG, como Leão encaixaria nestas equipas e qual o valor real que o Milan poderá exigir pela sua transferência.',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Amigáveis Internacionais — Previsões para o Noruega vs Suécia e Colômbia vs Costa Rica',
      excerpt: 'Os amigáveis de preparação para o Mundial 2026 continuam a todo o gás. Analisamos o clássico nórdico entre Noruega e Suécia, com Haaland em destaque, e o duelo sul-americano entre Colômbia e Costa Rica. Apresentamos as nossas picks com odds reais, análise de forma recente e as melhores oportunidades de aposta para estes confrontos.',
      category: 'TIPS DE APOSTAS',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ÚLTIMA HORA: O descalabro logístico da África do Sul — O impacto do adiamento na preparação para o Mundial',
      excerpt: 'A seleção sul-africana (Bafana Bafana) viu a sua viagem para o México adiada devido a problemas com vistos, falhando o voo agendado. Analisamos o impacto deste atraso na preparação da equipa de Hugo Broos para o Mundial 2026, o cancelamento do amigável com a Jamaica e como este erro administrativo pode afetar o desempenho da equipa no torneio.',
      category: 'ÚLTIMA HORA',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'TRANSFERÊNCIAS: Liverpool perde Konaté a custo zero — Como Arne Slot irá reconstruir a defesa dos Reds?',
      excerpt: 'Ibrahima Konaté confirmou a sua saída do Liverpool após cinco épocas, não tendo chegado a acordo para renovar. Analisamos as opções do Liverpool no mercado para substituir o central francês, o impacto da sua saída a custo zero nas finanças do clube e como a defesa será reestruturada para a próxima temporada da Premier League.',
      category: 'TRANSFERÊNCIAS',
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
