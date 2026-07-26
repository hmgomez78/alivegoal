import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source: string;
  imageUrl?: string;
}

function getFallbackNews(): NewsArticle[] {
  const publicationDate = '26 jul. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE TÁTICA: O desafio de Maresca ao suceder Guardiola no Manchester City',
      excerpt: 'Enzo Maresca assume o Manchester City depois de uma década de Pep Guardiola e admite a dimensão do desafio. A continuidade de ideias, a pressão por resultados imediatos e a gestão de um balneário vencedor serão decisivas para a nova era no Etihad.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 102,
      title: 'PLANTEL: A cirurgia de Rodri obriga o City a planear sem o seu pêndulo',
      excerpt: 'Rodri será operado às costas e o Manchester City terá de gerir cuidadosamente a recuperação do médio depois do Mundial. Apesar do ruído sobre o Real Madrid, Maresca espera contar com o espanhol na próxima época, tornando o timing do regresso uma questão central.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 103,
      title: 'MERCADO: O que o recorde de £117M por Morgan Rogers exige ao Chelsea',
      excerpt: 'O Chelsea pagou £117M ao Aston Villa por Morgan Rogers, estabelecendo uma nova referência no mercado britânico. O investimento aumenta o nível de exigência sobre o jovem inglês e reforça o debate sobre o equilíbrio entre talento, encaixe tático e preço.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'MERCADO: Newcastle aposta em Aladji Bamba para acrescentar energia ao meio-campo',
      excerpt: 'O Newcastle confirmou Aladji Bamba como a quarta contratação do verão. A chegada do médio de 20 anos vindo do Monaco encaixa numa estratégia que combina margem de progressão, intensidade competitiva e renovação gradual do plantel.',
      category: 'TRANSFERÊNCIAS',
      readTime: '3 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 105,
      title: 'MERCADO SAUDITA: A ida de Crysencio Summerville para o Al-Hilal mantém a pressão sobre a Premier League',
      excerpt: 'A transferência de Crysencio Summerville do West Ham para o Al-Hilal é mais um sinal de força financeira do futebol saudita. Para os clubes ingleses, a operação sublinha a necessidade de proteger ativos e antecipar substitutos em posições de extremo.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 106,
      title: 'PLANEAMENTO: Christos Tzolis completa a terceira adição do Arsenal no verão',
      excerpt: 'A contratação de Christos Tzolis por cerca de £34M, depois de Piero Hincapié e Illan Meslier, mostra que o Arsenal já tem uma base de reforços antes das decisões mais ambiciosas do mercado. A versatilidade ofensiva do grego amplia as opções de Arteta.',
      category: 'TRANSFERÊNCIAS',
      readTime: '3 min',
      date: publicationDate,
      source: 'The Guardian',
    },
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // O feed editorial de contexto é deliberadamente distinto do feed de tendências.
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
