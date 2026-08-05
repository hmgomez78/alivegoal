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
  const publicationDate = '5 ago. 2026';

  return [
    {
      id: 101,
      title: 'CHAMPIONS LEAGUE: Fenerbahçe e Sturm Graz no principal embate da ronda',
      excerpt: 'A formação turca procura consolidar a vantagem na eliminatória sob a batuta de José Mourinho, enquanto o Sturm Graz tenta surpreender fora de portas. A capacidade ofensiva do Fenerbahçe promete ditar o ritmo da partida.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / SportsGambler',
    },
    {
      id: 102,
      title: 'MERCADO: Arsenal insiste por Bruno Guimarães após recusa inicial',
      excerpt: 'As conversações em curso entre o Arsenal e o Newcastle por Bruno Guimarães ilustram a pressão do mercado de médios: uma primeira proposta de £70M foi rejeitada e o eventual acordo continua por fechar.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / The Guardian',
    },
    {
      id: 103,
      title: 'CONFERENCE LEAGUE: Brann e Apollon Limassol medem forças em Bergen',
      excerpt: 'O Brann chega ao encontro com um registo ofensivo impressionante em casa, enquanto o Apollon Limassol vem de uma sequência europeia positiva. Um duelo de contrastes táticos, no qual o fator Bergen pode pesar.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'SoccerVital / UEFA',
    },
    {
      id: 104,
      title: 'CHAMPIONS LEAGUE: AGF Aarhus recebe o embalado FC Sabah',
      excerpt: 'A equipa dinamarquesa tenta contrariar o momento positivo do Sabah, que venceu as quatro eliminatórias europeias recentes. A permeabilidade defensiva dos visitantes fora de casa pode ser a chave para o AGF.',
      category: 'PREVISÃO',
      readTime: '3 min',
      date: publicationDate,
      source: 'Football Whispers',
    },
    {
      id: 105,
      title: 'LIGA EUROPA: Ferencváros tenta confirmar superioridade perante o Górnik Zabrze',
      excerpt: 'Os húngaros chegam a este confronto com o histórico favorável de marcar em todos os jogos de qualificação até ao momento, enfrentando um Górnik que tem demonstrado capacidade para ferir as defesas contrárias.',
      category: 'ANÁLISE',
      readTime: '4 min',
      date: publicationDate,
      source: 'Football Whispers',
    },
    {
      id: 106,
      title: 'CONFERENCE LEAGUE: Panathinaikos com teste exigente frente ao CSKA 1948',
      excerpt: 'A formação grega superou o Paks com dificuldade e enfrenta agora um CSKA 1948 Sofia moralizado após eliminar o Spartak Trnava. A margem de erro para o Panathinaikos em Atenas é mínima.',
      category: 'RESUMO',
      readTime: '3 min',
      date: publicationDate,
      source: 'SportsGambler',
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
