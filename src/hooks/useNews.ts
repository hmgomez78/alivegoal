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
  const publicationDate = '25 jul. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: O impacto da contratação de Lacroix na defesa do Chelsea',
      excerpt: 'A chegada de Maxence Lacroix por £60M traz a velocidade e a capacidade de recuperação que faltavam aos Blues. Com uma velocidade de ponta de 35.8 km/h e uma taxa de sucesso de 50.5% em duelos, o francês promete estabilizar a linha defensiva de Xabi Alonso.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'ANÁLISE TÁTICA: O que significa a cirurgia de Rodri para o Man City?',
      excerpt: 'A ausência prolongada do médio espanhol obriga Enzo Maresca a redesenhar o miolo. Sem o pêndulo que dita o ritmo e o equilíbrio defensivo, o Manchester City terá de adaptar a sua agressividade sem bola para não ficar exposto nas transições.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 103,
      title: 'BASTIDORES: O ultimato de Klopp à imprensa alemã',
      excerpt: 'Jürgen Klopp assumiu a seleção da Alemanha com uma promessa de revolução, mas o seu aviso sobre a privacidade familiar não foi um mero detalhe. É uma linha vermelha que define a nova relação de poder entre a federação, o treinador e os media.',
      category: 'ÚLTIMA HORA',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'MERCADO: Newcastle consolida projeto com Aladji Bamba',
      excerpt: 'A aquisição do médio francês de 20 anos ao Monaco por £34M sublinha a estratégia de Eddie Howe: talento jovem, intenso e com margem de progressão. Bamba traz rotação e transporte de bola a um meio-campo que precisa de energia.',
      category: 'TRANSFERÊNCIAS',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 105,
      title: 'DISCIPLINA: FIFA sob pressão no rescaldo da final do Mundial',
      excerpt: 'As palavras de Luis de la Fuente, classificando o comportamento da Argentina como "intolerável", aumentam a pressão sobre a investigação da FIFA. A forma como os incidentes forem julgados ditará o padrão disciplinar para o próximo ciclo internacional.',
      category: 'ESCÂNDALO',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 106,
      title: 'MERCADO SAUDITA: A saída de Summerville e o novo paradigma',
      excerpt: 'A transferência de Crysencio Summerville para o Al-Hilal por quase €70M demonstra que o poder de atração saudita continua intacto. O West Ham perde um talento emergente, confirmando que nenhum clube fora da elite europeia está imune às investidas do Médio Oriente.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
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
