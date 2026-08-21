import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  source?: string;
}

function getFallbackNews(): NewsArticle[] {
  const publicationDate = '21/08/2026';
  
  return [
    {
      id: 807,
      title: 'ANÁLISE: Como Curtis Jones pode revolucionar o meio-campo do Inter',
      excerpt: 'A potencial mudança de Curtis Jones para o Inter de Milão levanta questões táticas interessantes. O médio do Liverpool traz uma capacidade de progressão de bola que encaixa no esquema de Simone Inzaghi. Analisamos como a sua chegada pode libertar Barella para zonas mais avançadas e dar uma nova dimensão ao jogo interior dos Nerazzurri, numa operação que pode redefinir o mercado.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 808,
      title: 'BRIGHTON: A fábrica de talentos e a iminente saída de Baleba',
      excerpt: 'Com Carlos Baleba a pressionar para rumar ao Manchester United, o Brighton volta a provar a eficácia do seu modelo de scouting. O médio camaronês adaptou-se rapidamente à Premier League e o seu perfil combativo e dinâmico é exatamente o que o United procura. Resta saber como os Seagulls vão reinvestir o valor de mais uma venda avultada.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 809,
      title: 'YANKUBA MINTEH: O perfil ideal para a sucessão de Salah?',
      excerpt: 'A proposta de £50M do Liverpool por Yankuba Minteh demonstra a intenção de Arne Slot em garantir o futuro do corredor direito. O jovem extremo tem mostrado velocidade e capacidade de desequilíbrio, características que o assemelham ao perfil procurado pelos Reds. Uma análise ao impacto que pode ter numa equipa que procura rejuvenescer a sua linha avançada.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 810,
      title: 'ARSENAL: O impacto tático de Bruno Guimarães no sistema de Arteta',
      excerpt: 'Com os exames médicos agendados, a chegada de Bruno Guimarães ao Arsenal promete transformar a dinâmica do meio-campo. O brasileiro oferece uma combinação rara de agressividade defensiva e qualidade de passe, permitindo a Declan Rice atuar mais solto. Exploramos como esta contratação pode ser a peça que faltava para a conquista do título.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 811,
      title: 'PEDRO NETO: O dilema entre a competitividade europeia e a Arábia Saudita',
      excerpt: 'A proposta financeira do Al Hilal coloca Pedro Neto perante uma decisão crucial na sua carreira. Aos 26 anos, o extremo do Chelsea tem de escolher entre continuar no projeto de Stamford Bridge ou aceitar um contrato milionário no Médio Oriente. Uma reflexão sobre as tendências do mercado e o impacto destas ofertas nos jogadores em pico de forma.',
      category: 'OPINIÃO',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Athletic',
    },
    {
      id: 812,
      title: 'ENZO FERNÁNDEZ: Por que Guardiola quer o médio do Chelsea',
      excerpt: 'O interesse surpresa do Manchester City em Enzo Fernández não é obra do acaso. Pep Guardiola procura um construtor de jogo capaz de ditar o ritmo a partir de trás, e o argentino encaixa nesse perfil. Analisamos os motivos táticos que levam o City a considerar uma investida no rival londrino e como Enzo poderia potenciar o ataque dos Cityzens.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Independent',
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
