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
  const publicationDate = '12 ago. 2026';

  return [
    {
      id: 201,
      title: 'ANÁLISE TÁTICA: Wirtz quer assumir o papel de número 10 no novo Liverpool',
      excerpt: 'Depois de uma primeira época de adaptação, Florian Wirtz diz estar mais preparado para a intensidade inglesa. Os sete golos e 10 assistências deixam uma base concreta, mas a chave para a evolução dos Reds será a ligação do alemão ao avançado no sistema de Andoni Iraola.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 202,
      title: 'PREMIER LEAGUE: O equilíbrio delicado do Brighton entre Europa e renovação',
      excerpt: 'O Brighton entra na nova época com futebol europeu, mas sem Danny Welbeck e Jan Paul van Hecke. A capacidade de Fabian Hürzeler para distribuir minutos e acelerar a integração de jovens como Luka Vuskovic e Charalampos Kostoulas pode definir o teto competitivo da equipa.',
      category: 'PREMIER LEAGUE',
      readTime: '6 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 203,
      title: 'MERCADO: O que muda no Newcastle de Matthias Jaissle após um verão de rutura',
      excerpt: 'A saída de Bruno Guimarães, Sandro Tonali e Anthony Gordon retirou liderança e experiência ao Newcastle. Matthias Jaissle assume uma equipa que aposta em perfis sub-22; mais do que resultados imediatos, o desafio passa por construir referências dentro de um balneário profundamente renovado.',
      category: 'MERCADO',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 204,
      title: 'LIBERTADORES: Palmeiras-Cerro Porteño coloca favoritismo contra resistência',
      excerpt: 'O Palmeiras chega aos oitavos em casa como líder do Brasileirão, mas o Cerro Porteño já venceu no Allianz Parque na fase de grupos. A primeira mão pede gestão de risco: os brasileiros têm mais produção ofensiva, enquanto os paraguaios sofreram apenas dois golos na campanha continental até aqui.',
      category: 'LIBERTADORES',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN / BetMines',
    },
    {
      id: 205,
      title: 'LIBERTADORES: Platense e Coquimbo procuram vantagem mínima antes da segunda mão',
      excerpt: 'O Platense recebe o Coquimbo Unido em Buenos Aires num duelo com sinais de equilíbrio. A equipa argentina vem de vitória fora sobre o Independiente, enquanto os chilenos marcaram em cinco dos seus últimos seis jogos; o controlo das transições pode ser o detalhe decisivo desta eliminatória.',
      category: 'LIBERTADORES',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN / FootballPredictions',
    },
    {
      id: 206,
      title: 'PREMIER LEAGUE: Porque Brennan Johnson pode ganhar nova vida no Everton de Moyes',
      excerpt: 'Brennan Johnson chega ao Everton com a missão de transformar volume ofensivo em golos. A leitura de Lee Trundle é que a aceleração do galês pode encaixar tanto na ala como por dentro, aproveitando uma equipa que cria oportunidades mas tem sentido dificuldades na finalização.',
      category: 'PREMIER LEAGUE',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport Wales',
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
