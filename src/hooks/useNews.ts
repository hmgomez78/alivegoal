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
  const publicationDate = '7 ago. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE: Van de Ven e o plano de continuidade do Tottenham',
      excerpt: 'Micky van de Ven está perto de chegar a acordo para um novo contrato com o Tottenham. Analisamos porque a renovação do defesa se tornou estratégica para a estabilidade do projeto dos Spurs.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'MERCADO: Salah inicia novo capítulo no Trabzonspor',
      excerpt: 'A chegada de Mohamed Salah ao Trabzonspor representa uma das mudanças mais inesperadas da janela. Contextualizamos o peso desportivo e comercial da transferência para o futebol turco.',
      category: 'TRANSFERÊNCIAS',
      readTime: '6 min',
      date: publicationDate,
      source: 'BBC Sport / ESPN',
    },
    {
      id: 103,
      title: 'ANÁLISE TÁTICA: Como Rodri encaixaria no Barcelona',
      excerpt: 'Fontes da ESPN indicam que Rodri deu luz verde a uma possível mudança para o Barcelona. Explicamos o que o médio do Manchester City acrescentaria ao modelo de jogo catalão e os desafios de uma operação deste calibre.',
      category: 'ANÁLISE TÁTICA',
      readTime: '7 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 104,
      title: 'INSTITUCIONAL: O que significa o boicote da UEFA às competições FIFA',
      excerpt: 'A UEFA mantém o plano de boicote apesar do pedido de desculpas da FIFA. Uma leitura das consequências que esta crise institucional poderá ter no calendário, nos clubes e na relação de forças no futebol internacional.',
      category: 'INSTITUCIONAL',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 105,
      title: 'TÁTICA: Matthias Jaissle e a reconstrução do Newcastle',
      excerpt: 'A nomeação de Matthias Jaissle para suceder a Eddie Howe abre uma nova etapa em Newcastle. Exploramos os princípios de pressão, posse e transição que o técnico pode transportar para a Premier League.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 106,
      title: 'MERCADO: Crystal Palace procura reforçar-se com Tomiyasu',
      excerpt: 'O Crystal Palace está apontado a Takehiro Tomiyasu e considera ainda uma movimentação por Solly March. Analisamos os perfis procurados e como estas eventuais entradas poderiam ampliar as opções do plantel.',
      category: 'MERCADO',
      readTime: '4 min',
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
