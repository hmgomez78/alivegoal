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
  const publicationDate = '10 ago. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: O impacto de Lucas Digne no regresso ao Paris Saint-Germain',
      excerpt: 'Dez anos depois de ter deixado a capital francesa, Lucas Digne volta ao PSG. A transferência de £6M-£7M, após duas épocas de destaque no Aston Villa, oferece a Luis Enrique um perfil experiente para a rotação nos corredores laterais.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 102,
      title: 'ANÁLISE TÁTICA: O que a pré-temporada revelou sobre o Chelsea de Xabi Alonso',
      excerpt: 'O empate a três golos com o Johor Darul Ta’zim evidenciou lacunas disciplinares e excesso de opções ofensivas no Chelsea. Com 41 jogadores no plantel, Xabi Alonso tem apenas duas semanas para definir a estrutura tática e equilibrar a equipa.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 103,
      title: 'MERCADO: Aston Villa estuda empréstimo do jovem Endrick',
      excerpt: 'Com a forte concorrência no ataque do Real Madrid após as contratações de verão, o Aston Villa surge como um dos interessados no empréstimo de Endrick. O modelo de Unai Emery pode oferecer o contexto competitivo que o avançado procura na Premier League.',
      category: 'TRANSFERÊNCIAS',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / AS',
    },
    {
      id: 104,
      title: 'MERCADO: O Nottingham Forest aposta forte na defesa com Ousmane Diomande',
      excerpt: 'A iminente contratação de Ousmane Diomande ao Sporting CP por €40M sublinha a ambição do Nottingham Forest. O central marfinense é visto como a peça-chave para o sistema de três defesas desenhado por Oliver Glasner.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN / The Athletic',
    },
    {
      id: 105,
      title: 'MERCADO: Como e a atração de Cesc Fàbregas convencem Trevoh Chalobah',
      excerpt: 'A mudança de Trevoh Chalobah para o Como, por £25.7M, ilustra o poder de atração do projeto de Cesc Fàbregas. O defesa inglês procura relançar a carreira na Serie A, assumindo-se como um dos líderes da equipa recém-promovida.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 106,
      title: 'ANÁLISE TÁTICA: As dinâmicas ofensivas do Manchester City na Ásia',
      excerpt: 'Apesar de algumas oscilações defensivas, Enzo Maresca retira notas positivas da digressão asiática. As combinações entre Antoine Semenyo e Omar Marmoush, bem como o impacto de Savinho, indicam que o City manterá a imprevisibilidade nos corredores.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
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
