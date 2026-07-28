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
  const publicationDate = '28 jul. 2026';

  return [
    {
      id: 101,
      title: 'MERCADO: O impacto da possível contratação de Stones pelo Inter',
      excerpt: 'A provável transferência de John Stones para o Inter de Milão reflete a estratégia do clube italiano em reforçar a defesa com experiência ao mais alto nível. A saída a custo zero do Manchester City após o Mundial 2026 sublinha uma mudança geracional na equipa de Guardiola.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 102,
      title: 'ANÁLISE: O que Yan Diomande traz ao ataque do Real Madrid',
      excerpt: 'Com a desistência do PSG, o Real Madrid ganha via aberta para Yan Diomande. O jovem extremo marfinense promete acrescentar explosão e verticalidade às alas merengues, integrando-se na política de recrutamento de jovens talentos de alto potencial.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 103,
      title: 'PLANEAMENTO: A renovação do balneário do Chelsea',
      excerpt: 'A exploração de negócios por Danny Welbeck e Jordan Henderson pelo Chelsea revela uma intenção clara de introduzir liderança e experiência num plantel jovem. A estratégia sugere uma procura por estabilidade para apoiar o desenvolvimento da equipa.',
      category: 'TRANSFERÊNCIAS',
      readTime: '3 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'MERCADO: O efeito dominó do colapso de Kolo Muani na Juventus',
      excerpt: 'A falha nas negociações por Randal Kolo Muani forçou a Juventus a redirecionar atenções para Joshua Zirkzee. O avançado do Manchester United apresenta um perfil diferente, prometendo maior capacidade de ligação de jogo no sistema tático dos italianos.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 105,
      title: 'ESTRATÉGIA: A batalha pela renovação de Rodri',
      excerpt: 'A tentativa do Manchester City em renovar com Rodri é crucial para a estabilidade do seu meio-campo. A sombra do interesse do Real Madrid pressiona a estrutura inglesa a garantir o seu maestro, essencial no equilíbrio tático da equipa.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'Sky Sports',
    },
    {
      id: 106,
      title: 'INSTITUCIONAL: As consequências da demissão de Maldini e Leonardo',
      excerpt: 'As saídas de Paolo Maldini e Leonardo instalam uma crise na federação italiana. O colapso da nomeação de Andrea Pirlo expõe fraturas na visão estratégica, exigindo uma rápida reestruturação para garantir a estabilidade do projeto desportivo nacional.',
      category: 'INSTITUCIONAL',
      readTime: '5 min',
      date: publicationDate,
      source: 'The Guardian',
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
