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

// Notícias de fallback — análises, contexto e investigação — 09/06/2026
function getFallbackNews(): NewsArticle[] {
  const today = new Date();
  const formatToday = today.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  return [
    {
      id: 1,
      title: 'ANÁLISE TÁTICA: Argentina vs Islândia — Scaloni revela sistema surpresa antes do Mundial',
      excerpt: 'No último amistoso antes do Mundial 2026, Lionel Scaloni surpreendeu com um 4-3-3 modificado onde Messi atua como meia-atacante e Lautaro Martínez como falso 9. Analisamos as implicações táticas desta escolha, como a Argentina pode explorar os espaços contra seleções organizadas defensivamente, e porque este sistema pode ser a chave para defender o título mundial. A Argentina estreia no Grupo D contra a Arábia Saudita a 13 de junho — o mesmo adversário que causou o maior choque do Mundial 2022.',
      category: 'ANÁLISE TÁTICA',
      readTime: '9 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 2,
      title: 'INVESTIGAÇÃO: Segurança no Mundial 2026 — tiroteios, ICE e o pesadelo logístico dos EUA',
      excerpt: 'A 2 dias do início do Mundial 2026, os EUA enfrentam uma crise de segurança sem precedentes. Um tiroteio com 9 feridos em Kansas City, a morte de uma mulher pela ICE em Minneapolis e ameaças de grupos extremistas estão a criar pânico entre adeptos internacionais. Investigamos os protocolos de segurança da FIFA, as falhas das autoridades americanas, e porque vários países emitiram alertas de viagem para os seus cidadãos que pretendem assistir ao torneio. Está o maior Mundial da história a tornar-se um pesadelo logístico?',
      category: 'ESCÂNDALO',
      readTime: '11 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 3,
      title: 'ANÁLISE: Brasil sem Wesley — como Ancelotti vai resolver o problema no lado direito?',
      excerpt: 'O corte de Wesley por lesão muscular grave é um golpe duro para o Brasil a 2 dias do Mundial. Analisamos as opções de Ancelotti para o lado direito da defesa: Éderson (convocado de emergência), Danilo (veterano experiente) e a possibilidade de usar Militão como lateral. Também examinamos o padrão preocupante de lesões musculares na Seleção — 3 casos graves em 2 semanas — e o que isto revela sobre a gestão de carga dos atletas. O Brasil estreia no Grupo C contra Marrocos a 12 de junho.',
      category: 'LESÕES',
      readTime: '8 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 4,
      title: 'TIPS DE APOSTAS: Argentina vs Islândia esta noite — análise e melhores apostas',
      excerpt: 'A Argentina enfrenta a Islândia às 22h (hora de Lisboa) no último amistoso antes do Mundial. Com odds de 1.25 para vitória argentina, a aposta mais interessante é Over 2.5 golos a 1.65 — a Argentina marcou em média 3.2 golos nos últimos 5 amistosos. Messi está em grande forma e quer chegar ao torneio com confiança máxima. A Islândia, sem qualificação para o Mundial, vai jogar sem pressão. Analisamos as estatísticas head-to-head e as melhores oportunidades de apostas para este jogo.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 5,
      title: 'ANÁLISE: Tonali para o Man United — o que muda no meio-campo dos Red Devils?',
      excerpt: 'Se o Manchester United concretizar a contratação de Sandro Tonali por £80M, como fica o meio-campo de Michael Carrick? Analisamos o perfil do médio italiano — box-to-box, excelente na recuperação de bola e com capacidade de progressão — e como se encaixa ao lado de Bruno Fernandes e Kobbie Mainoo. Também examinamos o risco de uma contratação tão cara para um jogador que esteve suspenso por apostas ilegais. Pode Tonali ser a peça que falta ao United para competir pelo título?',
      category: 'TRANSFERÊNCIAS',
      readTime: '10 min',
      date: formatToday,
      source: 'AliveGoal',
    },
    {
      id: 6,
      title: 'ANÁLISE: Eriksen e o dispositivo cardíaco — como funciona e porque salvou a sua vida duas vezes',
      excerpt: 'O ICD (Cardioverter-Desfibrilhador Implantável) de Christian Eriksen voltou a funcionar na perfeição durante o susto no amistoso Dinamarca vs Ucrânia. Explicamos como funciona este dispositivo, porque Eriksen pode continuar a jogar futebol profissional com ele implantado, e o que os médicos da Dinamarca vão avaliar antes de decidirem se o jogador pode participar no Mundial 2026. A Dinamarca estreia no Grupo E contra a Sérvia a 15 de junho — o tempo é curto mas a esperança é grande.',
      category: 'ÚLTIMA HORA',
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
