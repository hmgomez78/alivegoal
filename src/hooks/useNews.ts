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
  const publicationDate = '9 ago. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: Pio Esposito é o novo alvo para o ataque do Arsenal',
      excerpt: 'A ESPN coloca Arsenal e Manchester United entre os clubes atentos a Pio Esposito, avançado do Inter. Para o Arsenal, o perfil físico e a presença de área podem representar uma alternativa de futuro caso Gabriel Jesus saia; o preço apontado, porém, sugere uma operação exigente.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 102,
      title: 'ANÁLISE TÁTICA: O que Lewis Hall acrescentaria ao Manchester United',
      excerpt: 'O Manchester United terá perguntado pelo lateral-esquerdo Lewis Hall, embora o Newcastle o considere inegociável. O interesse evidencia a procura por amplitude, progressão com bola e uma opção natural para a esquerda, numa zona onde as alternativas são limitadas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN / Sky Sports',
    },
    {
      id: 103,
      title: 'MERCADO: Ayyoub Bouaddi e a sucessão de Rodri no Manchester City',
      excerpt: 'O Manchester City está, segundo a ESPN, na fase final das conversações por Ayyoub Bouaddi, do Lille. Aos 18 anos, o médio é visto como uma aposta de futuro para renovar a zona central, num contexto em que o futuro de Rodri domina o mercado do clube.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 104,
      title: 'MERCADO: Matteo Ruggeri pode equilibrar o corredor esquerdo do Aston Villa',
      excerpt: 'O Aston Villa aproxima-se de um acordo por Matteo Ruggeri, lateral do Atlético de Madrid. O perfil do italiano combina profundidade ofensiva e disponibilidade física, podendo criar concorrência e abrir cenários para a composição do setor defensivo de Unai Emery.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 105,
      title: 'ANÁLISE: Højbjerg como solução de experiência para o Newcastle',
      excerpt: 'Pierre-Emile Højbjerg é apontado como alvo do Newcastle para reorganizar o meio-campo. A experiência do dinamarquês na Premier League e a disciplina sem bola poderiam oferecer uma resposta imediata a uma eventual necessidade de liderança e controlo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN / Footmercato',
    },
    {
      id: 106,
      title: 'MERCADO: Rafael Leão mantém o foco no AC Milan e na Europa',
      excerpt: 'Rafael Leão não está a considerar uma mudança para a Saudi Pro League apesar de duas propostas avultadas, segundo a atualização de mercado da ESPN. A decisão preserva uma peça-chave do Milan e mantém o extremo português no centro da competição europeia.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN / Nicolò Schira',
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
