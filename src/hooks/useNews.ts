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
  const publicationDate = '4 ago. 2026';

  return [
    {
      id: 101,
      title: 'CHAMPIONS LEAGUE: Sparta Praga e Lyon medem forças no limite do erro',
      excerpt: 'A receção do Sparta Praga ao Lyon marca um dos duelos mais equilibrados da 3.ª pré-eliminatória. A formação francesa procura afirmar o seu estatuto continental, mas a solidez caseira dos checos promete uma eliminatória resolvida nos detalhes táticos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / Fox Sports',
    },
    {
      id: 102,
      title: 'MERCADO: O impacto inflacionário das transferências britânicas',
      excerpt: 'A ultrapassagem da fasquia dos mil milhões de libras na Premier League, impulsionada por negócios como os de Morgan Rogers e Elliot Anderson, consolida o fosso financeiro entre o mercado inglês e as restantes ligas europeias.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / AliveGoal',
    },
    {
      id: 103,
      title: 'CHAMPIONS LEAGUE: Union Saint-Gilloise tenta travar o ritmo do Bodø/Glimt',
      excerpt: 'O embate entre Union SG e Bodø/Glimt coloca frente a frente a organização belga e a intensidade ofensiva norueguesa. A expectativa de golos é alta, refletindo a propensão de ambas as equipas para um futebol vertical e de transições rápidas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / Oddslot',
    },
    {
      id: 104,
      title: 'CHAMPIONS LEAGUE: Dinamo Zagreb assume favoritismo absoluto perante o Kauno Žalgiris',
      excerpt: 'O campeão croata recebe a formação lituana com a clara intenção de resolver a eliminatória na primeira mão. A disparidade de argumentos técnicos e orçamentais coloca o Dinamo na obrigação de apresentar um futebol dominante e traduzido em golos.',
      category: 'PREVISÃO',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport / YesPlay',
    },
    {
      id: 105,
      title: 'MLS: Inter Miami recupera a liderança no rescaldo do regresso das estrelas',
      excerpt: 'O empate frente ao Columbus Crew quebrou a série vitoriosa, mas o regresso de Lionel Messi e o impacto imediato de Luis Suárez e Rodrigo De Paul recolocaram o Inter Miami no topo do Power Ranking, confirmando a profundidade do plantel.',
      category: 'ANÁLISE',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 106,
      title: 'SCOTTISH PREMIERSHIP: Celtic arranca defesa do título com vitória pragmática',
      excerpt: 'O golo solitário de Benjamin Nygren na segunda parte permitiu ao Celtic superar o Dundee na jornada inaugural. Um triunfo que não disfarça a necessidade de afinar processos ofensivos, mas que garante a tranquilidade inicial exigida a um campeão.',
      category: 'RESUMO',
      readTime: '3 min',
      date: publicationDate,
      source: 'The Guardian / ESPN',
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
