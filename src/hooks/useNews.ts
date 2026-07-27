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
  const publicationDate = '27 jul. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: O impacto da possível saída de Barcola no projeto do PSG',
      excerpt: 'A fixação do preço de Bradley Barcola em 145 milhões de libras pelo Paris Saint-Germain expõe as movimentações estratégicas do clube. A possível saída do extremo francês obrigaria a repensar a dinâmica ofensiva da equipa, enquanto Arsenal e Liverpool avaliam o encaixe tático do jogador nos seus sistemas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'ESTRATÉGIA: A avaliação de Vinícius Júnior pelo Real Madrid',
      excerpt: 'A etiqueta de 160 milhões de euros atribuída a Vinícius Júnior demonstra a determinação do Real Madrid em proteger a sua estrela. O valor reflete o estatuto do brasileiro e funciona como dissuasor perante o interesse do Arsenal, reforçando a prioridade da renovação do contrato.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 103,
      title: 'MERCADO: O Tottenham de De Zerbi e a gestão de Cristian Romero',
      excerpt: 'O interesse do Inter de Milão em Cristian Romero coloca um desafio à defesa do Tottenham. A possível saída do capitão obrigaria Roberto De Zerbi a procurar um novo líder defensivo, num momento em que a equipa procura consolidar processos após a vitória de pré-época frente ao Auckland FC.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'PLANEAMENTO: Arsenal foca-se em Bruno Guimarães',
      excerpt: 'A aceleração das conversações por Bruno Guimarães evidencia a estratégia de Mikel Arteta em construir um meio-campo dominador. A operação antecipa uma renovação no eixo do terreno, procurando garantir a peça fundamental antes do regresso aos trabalhos do Newcastle.',
      category: 'TRANSFERÊNCIAS',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 105,
      title: 'MERCADO SAUDITA: Al-Hilal testa a resiliência do Everton por Ndiaye',
      excerpt: 'A abordagem formal do Al-Hilal por Iliman Ndiaye sublinha a contínua pressão financeira da liga saudita sobre os clubes da Premier League. Para o Everton, a possível venda representaria um encaixe financeiro, mas exigiria uma rápida reestruturação do ataque de Sean Dyche.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 106,
      title: 'ANÁLISE: O Fulham como incubadora para o talento de Mastantuono',
      excerpt: 'A possível cedência de Franco Mastantuono ao Fulham ilustra a estratégia do Real Madrid de rodar jovens promessas na Premier League. A equipa londrina posiciona-se como o ambiente ideal para o desenvolvimento do médio argentino de 18 anos no exigente futebol europeu.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
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
