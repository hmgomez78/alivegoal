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
  const publicationDate = '19 ago. 2026';

  return [
    {
      id: 801,
      title: 'NEWCASTLE: Sean Steur chega cedo, mas a adaptação pode definir o impacto',
      excerpt: 'A BBC destaca Sean Steur como um nome a seguir depois de o Newcastle o ter contratado ao Ajax num negócio que pode chegar a £23 milhões. Aos 18 anos, o neerlandês pode jogar como médio defensivo ou mais adiantado, com qualidade de passe e capacidade para usar os dois pés. O contexto pede moderação: a subida da Eredivisie para a Premier League e a integração num clube em transição tornam os primeiros minutos mais relevantes do que uma exigência imediata de titularidade.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 802,
      title: 'COVENTRY: Yirenkyi acrescenta energia e versatilidade a um recém-promovido',
      excerpt: 'Caleb Yirenkyi é apresentado pela BBC como uma contratação de potencial elevado para o Coventry, que terá investido cerca de £25 milhões no médio do Nordsjælland. O ganês, de 20 anos, pode jogar no centro ou pelo lado direito de uma linha de cinco, e já teve exposição internacional. Para uma equipa recém-promovida, essa mobilidade pode ajudar a alternar entre pressão alta, cobertura defensiva e saídas mais diretas sem mudar radicalmente a estrutura.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 803,
      title: 'CRYSTAL PALACE: Mingueza oferece uma solução de baixo custo e alto encaixe',
      excerpt: 'Oscar Mingueza chega ao Crystal Palace a custo zero após o fim do contrato com o Celta Vigo, segundo a análise da BBC. Formado no Barcelona, o defesa tem experiência tanto na construção como na cobertura de várias posições da linha recuada. A sua versatilidade ganha especial relevância se Daniel Muñoz sair: o Palace pode proteger a continuidade do jogo pelos corredores sem depender de uma adaptação longa a uma nova ideia tática.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 804,
      title: 'ASTON VILLA: Brian Madjo é um projeto de impacto, não uma solução para sobrecarregar',
      excerpt: 'Brian Madjo, avançado de 17 anos, marcou na Supertaça frente ao PSG e entra na época com atenção acrescida depois de vários golos na pré-temporada. A BBC salienta a força física e o potencial do jovem, mas também o contexto que o protege: Ollie Watkins e Tammy Abraham oferecem referências experientes no ataque. A oportunidade está na rotação de uma época com Champions, não numa comparação apressada nem numa responsabilidade excessiva sobre um adolescente.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 805,
      title: 'LIVERPOOL: a pré-época de Trey Nyoni pode mudar o debate sobre um empréstimo',
      excerpt: 'Trey Nyoni foi um dos destaques do Liverpool na pré-temporada, recorda a BBC, depois de já ter somado minutos na liga e nas taças na época anterior. Num meio-campo com margem limitada de profundidade, a sua evolução pode levar a equipa técnica a reavaliar uma eventual saída por empréstimo. A questão central não é antecipar um lugar fixo, mas perceber se a capacidade de receber, progredir e pressionar suporta uma presença mais regular no plantel.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 806,
      title: 'MANCHESTER UNITED: Shea Lacey pode beneficiar de uma ala com menos bloqueios',
      excerpt: 'A BBC coloca Shea Lacey entre os jovens com condições para ganhar espaço no Manchester United depois de uma pré-temporada positiva. Aos 19 anos, o extremo ultrapassou problemas físicos iniciais e já conhece o ambiente do clube, enquanto Michael Carrick tem referências diretas do seu desenvolvimento. O teste será transformar a espontaneidade no um-para-um em decisões consistentes sem bola e em último passe, os dois requisitos que mais aceleram a passagem da academia para a rotação sénior.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    }
  ];
}

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
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
