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
  const publicationDate = '14 ago. 2026';

  return [
    {
      id: 301,
      title: 'PREMIER LEAGUE: A ausência de um “treinador alfa” torna a corrida ao título mais imprevisível',
      excerpt: 'A nova época inglesa começa com Chelsea, Liverpool e Manchester City sob novas lideranças, enquanto outros clubes ainda procuram estabilidade. O ponto central não é escolher um favorito prematuro, mas perceber quem assimilou mais depressa os novos princípios: pressão, construção e gestão dos regressos pós-Mundial podem alterar a hierarquia já nas primeiras jornadas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 302,
      title: 'MANCHESTER UNITED: Carrick define progresso sem prometer revolução',
      excerpt: 'Michael Carrick considera que o plantel do Manchester United está a evoluir antes da sua primeira época completa no comando. A mensagem é relevante porque desloca o foco do ruído de mercado para a continuidade: a prova estará em transformar essa sensação de progresso numa equipa mais coerente com bola e mais resistente quando perde a posse.',
      category: 'PREMIER LEAGUE',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 303,
      title: 'ARSENAL: Pré-época expõe o equilíbrio entre fadiga e exigência defensiva',
      excerpt: 'O campeão inglês sofreu seis golos em derrotas consecutivas frente a Real Betis e Borussia Dortmund, ainda com vários internacionais a regressar de forma gradual. A situação de William Saliba e a carga acumulada de Declan Rice ajudam a explicar parte do contexto, mas a preparação deixa uma questão clara: a estrutura sem bola terá de recuperar rapidamente para proteger uma candidatura ao bicampeonato.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 304,
      title: 'TOTTENHAM: A margem de manobra de De Zerbi será medida pela reconstrução, não pelo nome',
      excerpt: 'Roberto De Zerbi entra numa época decisiva depois de ter salvo o Tottenham da descida. O desafio vai além da identidade estética: os Spurs precisam de tornar a circulação mais segura, proteger melhor as transições e alinhar o mercado com um modelo reconhecível. Sem esse tempo e essas ferramentas, a exigência sobre o treinador aumentará depressa.',
      category: 'PREMIER LEAGUE',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 305,
      title: 'RANGERS: Driouech pode acrescentar desequilíbrio, mas não resolve sozinho a preparação europeia',
      excerpt: 'Couhaib Driouech é esperado em Glasgow para concluir a mudança depois de assistir ao jogo em Ibrox. A possível chegada oferece aceleração e jogo exterior, qualidades úteis para uma equipa que procura atacar blocos baixos; ainda assim, as palavras de Derek McInnes sobre a falta de prontidão para a Liga Europa lembram que a resposta terá de ser coletiva e imediata.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports / BBC Sport',
    },
    {
      id: 306,
      title: 'CHELSEA: A permanência de Nicolas Jackson abre uma disputa real pelo lugar de ponta de lança',
      excerpt: 'Nicolas Jackson está disponível para lutar pelo seu espaço sob Xabi Alonso, segundo a imprensa inglesa. Para o Chelsea, manter um avançado disposto a competir pode preservar profundidade e opções de pressão, mas exige uma definição clara de hierarquia: minutos, perfil de apoio e rendimento na área decidirão se a continuidade é solução ou apenas adiamento de uma decisão de mercado.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports',
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
