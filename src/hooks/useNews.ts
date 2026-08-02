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
  const publicationDate = '2 ago. 2026';

  return [
    {
      id: 101,
      title: 'PROPRIEDADE: A entrada do consórcio Staveley no West Ham e o novo equilíbrio de poder',
      excerpt: 'O acordo para a compra dos 25,1% detidos pela família Gold coloca Amanda Staveley novamente no centro da Premier League. Mais do que uma mudança acionista, o movimento pode alterar a capacidade de investimento, a estratégia de recrutamento e a ambição desportiva do West Ham nos próximos anos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 102,
      title: 'LIVERPOOL: A pré-época de Iraola e a urgência de corrigir as lacunas do campeão',
      excerpt: 'Andoni Iraola acelera a preparação do Liverpool antes do arranque da Premier League, com intensidade e organização sem bola no centro do trabalho. A questão decisiva é perceber se o novo treinador consegue fechar rapidamente os espaços que ficaram expostos na reta final da época passada.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'BBC Sport / The Guardian',
    },
    {
      id: 103,
      title: 'NEWCASTLE: O que muda após a confirmação da saída de Eddie Howe',
      excerpt: 'A saída de Eddie Howe obriga o Newcastle a redefinir a sua identidade no momento em que o plantel entra na pré-época. A sucessão terá de equilibrar exigência europeia, controlo salarial e a expectativa de manter um estilo competitivo sem perder os pilares que sustentaram a evolução recente.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 104,
      title: 'BOURNEMOUTH: Por que Antonio Silva pode ser a contratação estrutural do verão',
      excerpt: 'A chegada do defesa português Antonio Silva oferece ao Bournemouth uma combinação rara de idade, experiência internacional e qualidade de construção. A adaptação à intensidade da Premier League será determinante, mas o perfil sugere uma contratação pensada para valorizar dentro e fora do relvado.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 105,
      title: 'CELTIC: A recusa por Engels revela a estratégia de retenção de talento',
      excerpt: 'A recusa do Celtic a uma abordagem do West Ham por Arne Engels sinaliza que o clube não pretende desmantelar o núcleo competitivo antes das eliminatórias europeias. O interesse simultâneo em reforçar o plantel ilustra uma política de mercado que privilegia continuidade e margem de negociação.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 106,
      title: 'TOTTENHAM: O futuro de Richarlison como teste à gestão de De Zerbi',
      excerpt: 'Roberto De Zerbi admitiu que Richarlison pode ponderar sair, mas deixou clara a vontade de manter o avançado. A decisão será um teste imediato à gestão do treinador: entre valorizar um jogador de grande impacto físico e abrir espaço para uma reformulação ofensiva, os Spurs têm de escolher o timing certo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / The Guardian',
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
