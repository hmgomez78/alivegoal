import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source: string;
  imageUrl?: string;
}

// Conteúdo de análise e contexto, distinto das manchetes do feed de tendências.
function getFallbackNews(): NewsArticle[] {
  const publicationDate = '6 ago. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE TÁTICA: O que esperar de Matthias Jaissle no Newcastle?',
      excerpt: 'A surpreendente escolha de Matthias Jaissle para o comando técnico do Newcastle traz uma filosofia de pressão alta e transições rápidas. Analisamos como o plantel atual se pode adaptar ao estilo do jovem treinador alemão.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'MERCADO: O impacto da contratação de Yan Diomande no Real Madrid',
      excerpt: 'Os 120 milhões de libras investidos em Yan Diomande não são apenas uma declaração de intenções, mas uma peça chave na reformulação defensiva e de construção de jogo do Real Madrid. Uma análise profunda à mais recente bomba do mercado.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / The Guardian',
    },
    {
      id: 103,
      title: 'OPINIÃO: A polémica da "Fifa Super League" e o futuro do futebol europeu',
      excerpt: 'As revelações sobre o envolvimento de Gianni Infantino na "Fifa Super League" levantam questões sérias sobre a governação do futebol. Um olhar sobre as implicações políticas e desportivas deste escândalo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'TRANSFERÊNCIAS: Folarin Balogun e a urgência ofensiva do Tottenham',
      excerpt: 'Com a necessidade premente de golos, o Tottenham aponta baterias a Folarin Balogun. O avançado norte-americano tem o perfil físico e a capacidade de finalização que os Spurs tanto precisam, mas o seu passado no Arsenal adiciona pimenta à possível transferência.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 105,
      title: 'MERCADO: Ibrahim Mbaye na mira do Liverpool',
      excerpt: 'O interesse do Liverpool em Ibrahim Mbaye reflete a estratégia do clube em rejuvenescer as alas. O talento do PSG tem as características explosivas que os Reds procuram para a sucessão a longo prazo na frente de ataque.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 106,
      title: 'ÚLTIMA HORA: A renovação milionária de Vinicius Jr',
      excerpt: 'O Real Madrid avança com uma proposta de renovação astronómica para Vinicius Jr. A decisão visa segurar a principal estrela da equipa e enviar um aviso claro aos clubes interessados de que o brasileiro é inegociável.',
      category: 'ÚLTIMA HORA',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      setNews(getFallbackNews());
    } catch (error) {
      console.error('Error loading contextual news:', error);
      setNews(getFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { news, loading, refresh: fetchNews };
}
