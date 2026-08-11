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
  const publicationDate = '11 ago. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: O impacto da troca entre Brennan Johnson e Dwight McNeil',
      excerpt: 'A rara troca direta entre jogadores na Premier League levanta questões sobre o planeamento a longo prazo. Analisamos como as características de Johnson e McNeil se adaptam aos novos sistemas táticos e o que isto significa para o mercado interno inglês.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 102,
      title: 'ANÁLISE TÁTICA: O encaixe de Ayyoub Bouaddi no esquema de Pep Guardiola',
      excerpt: 'O Manchester City assegurou um dos médios mais promissores da Europa. Dissecamos o perfil de Ayyoub Bouaddi e como a sua capacidade de retenção de bola sob pressão o torna o sucessor natural no meio-campo dos "Cityzens".',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 103,
      title: 'ÚLTIMA HORA: O escândalo de apostas que abala o futebol turco',
      excerpt: 'Com mais de 1.000 jogadores suspensos, a Federação Turca enfrenta a maior crise da sua história. Explicamos as ramificações deste escândalo para as competições europeias e as medidas de emergência que estão a ser implementadas.',
      category: 'ÚLTIMA HORA',
      readTime: '7 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'TRANSFERÊNCIAS: A estratégia do Liverpool ao garantir Araujo por empréstimo',
      excerpt: 'A chegada de Araujo a Anfield Road oferece uma solução imediata para as lacunas defensivas do Liverpool. Uma análise aos termos do empréstimo do Barcelona e ao que o internacional uruguaio traz à linha recuada dos Reds.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'Yahoo Sports',
    },
    {
      id: 105,
      title: 'MERCADO: A corrida a dois por Joaquin Seys aquece',
      excerpt: 'Manchester United e Arsenal identificaram no jovem do Club Brugge a resposta para os problemas no lado esquerdo da defesa. Comparamos as propostas financeiras e o projeto desportivo que cada clube tem para oferecer a Seys.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 106,
      title: 'TIPS DE APOSTAS: Como o mercado reage aos movimentos de Rodri',
      excerpt: 'A presença de Rodri em Barcelona fez disparar as odds para o título da La Liga. Analisamos o impacto que uma eventual transferência do médio espanhol teria nas probabilidades das principais casas de apostas europeias.',
      category: 'TIPS DE APOSTAS',
      readTime: '5 min',
      date: publicationDate,
      source: 'AliveGoal Analytics',
    }
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 600));
      setNews(getFallbackNews());
    } catch (error) {
      console.error('Error fetching news:', error);
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
