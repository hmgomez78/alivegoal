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
  const publicationDate = '13 ago. 2026';

  return [
    {
      id: 201,
      title: 'PREMIER LEAGUE: Arsenal compra liderança imediata com Bruno Guimarães',
      excerpt: 'A entrada de Bruno Guimarães por £75 milhões não é apenas uma troca de camisola: dá ao Arsenal um médio capaz de organizar a primeira fase de construção e acelerar a pressão após perda. O desafio será integrar esse volume de jogo sem retirar influência aos criativos que já ocupam os corredores interiores.',
      category: 'PREMIER LEAGUE',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 202,
      title: 'MERCADO: Morgan Rogers transforma a escala de ambição do Chelsea',
      excerpt: 'O Chelsea investiu £117 milhões em Morgan Rogers, uma verba que eleva a fasquia para um jogador chamado a ligar meio-campo e ataque. A contratação recompensa a progressão do inglês, mas também exige um plano claro para que o seu transporte de bola e chegada à área não se confundam com as funções dos restantes avançados.',
      category: 'MERCADO',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 203,
      title: 'ANÁLISE TÁTICA: Elliot Anderson pode redesenhar o meio-campo do Manchester City',
      excerpt: 'A aquisição de Elliot Anderson por £116 milhões aponta para uma solução de energia e condução no centro do campo do City. Mais do que procurar um substituto direto de Rodri, Pep Guardiola poderá usar o novo médio para tornar a equipa mais móvel entre linhas e mais agressiva na recuperação.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 204,
      title: 'TRANSFERÊNCIAS: Tottenham aposta no controlo com Sandro Tonali',
      excerpt: 'Sandro Tonali chega ao Tottenham por £100 milhões numa mudança que privilegia capacidade de circulação, intensidade sem bola e experiência de alto nível. O encaixe com os médios de chegada será determinante: se o italiano receber linhas de passe cedo, os Spurs podem ganhar estabilidade sem perder aceleração.',
      category: 'TRANSFERÊNCIAS',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 205,
      title: 'PREMIER LEAGUE: Manchester United reconstrói o eixo com Santos e Tielemans',
      excerpt: 'Andrey Santos e Youri Tielemans acrescentam qualidades complementares ao Manchester United: o primeiro oferece raio de ação e recuperação, o segundo controlo do ritmo e passe vertical. Com várias saídas no plantel, o valor desta dupla dependerá menos dos nomes e mais da rapidez com que cria referências de jogo.',
      category: 'PREMIER LEAGUE',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 206,
      title: 'MERCADO: Liverpool equilibra presente e sucessão na defesa',
      excerpt: 'Jérémy Jacquet, por £55 milhões, e o empréstimo de Ronald Araújo mostram um Liverpool a atacar duas necessidades diferentes: talento com margem de evolução e uma resposta imediata para a profundidade defensiva. A época dirá se a coexistência de perfis é uma solução transitória ou a base de uma nova linha de defesa.',
      category: 'MERCADO',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
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
