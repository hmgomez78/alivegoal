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
  const publicationDate = '8 ago. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: Porque Højbjerg é uma opção monitorizada pelo Newcastle',
      excerpt: 'O Newcastle explora uma possível abordagem por Pierre-Emile Højbjerg, segundo a atualização de mercado da Sky Sports. Analisamos como a experiência, a leitura defensiva e a capacidade de liderança do médio poderiam acrescentar controlo ao meio-campo.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 102,
      title: 'ANÁLISE TÁTICA: O empréstimo de Buonanotte e a oportunidade no Elche',
      excerpt: 'Facundo Buonanotte junta-se ao Elche por empréstimo. O enquadramento na LaLiga pode oferecer ao criativo minutos entre linhas e responsabilidade ofensiva, num passo pensado para acelerar o desenvolvimento fora do ambiente competitivo do Brighton.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 103,
      title: 'MERCADO: O investimento do Coventry em Yirenkyi sob análise',
      excerpt: 'O Coventry fechou a chegada do médio ganês Yirenkyi por um negócio reportado em 26 milhões de libras. Contextualizamos o peso financeiro da operação e o perfil de um reforço chamado a aumentar energia, condução e progressão com bola.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 104,
      title: 'MERCADO: O que um empréstimo de Araújo poderia mudar no Liverpool',
      excerpt: 'A atualização do Liverpool da Sky Sports coloca Ronald Araújo entre os temas em observação. Um empréstimo do central acrescentaria agressividade no duelo, jogo aéreo e cobertura preventiva, mas dependeria da viabilidade negocial com o Barcelona.',
      category: 'MERCADO',
      readTime: '7 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 105,
      title: 'ANÁLISE: Fulham testa Garcia e Palacios num arranque exigente',
      excerpt: 'Garcia e Palacios tiveram estreias marcadas por uma derrota do Fulham frente ao Crystal Palace. Mais do que o resultado isolado, a leitura passa pela adaptação ao ritmo da equipa e pelas alternativas que ambos podem trazer durante a época.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 106,
      title: 'INSTITUCIONAL: A pressão sobre West Ham fora das quatro linhas',
      excerpt: 'A agenda do West Ham também é dominada por uma atualização sobre David Sullivan e a possibilidade de assistir aos jogos apesar de aconselhamento em sentido contrário. A situação reforça como a estabilidade institucional pode condicionar a narrativa à volta do clube.',
      category: 'INSTITUCIONAL',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports',
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
