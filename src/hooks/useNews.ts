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
  const publicationDate = '3 ago. 2026';

  return [
    {
      id: 101,
      title: 'CELTIC–DUNDEE: O campeão entra em campo com margem para assumir o controlo cedo',
      excerpt: 'O Celtic recebe o Dundee na abertura da defesa do título escocês. A leitura do encontro passa pela capacidade dos campeões para impor volume ofensivo em casa, sem ignorar que o Dundee chega com mais minutos competitivos nas pernas graças à Taça da Liga.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / LiveScore',
    },
    {
      id: 102,
      title: 'SJK–HJK: Porque a dupla hipótese visitante concentra o interesse no duelo finlandês',
      excerpt: 'A deslocação do HJK ao terreno do SJK é um jogo de equilíbrio delicado na Veikkausliiga. Em vez de antecipar um vencedor absoluto, a proteção do empate reflete o perfil competitivo do confronto e reduz a exposição a um cenário de jogo fechado.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / Oddslot',
    },
    {
      id: 103,
      title: 'SHAKHTAR–KUDRIVKA: Favoritismo alto e o desafio de transformar domínio em resultado',
      excerpt: 'O Shakhtar Donetsk parte como grande favorito frente ao Kudrivka na Ukrainian Premier League. O foco da análise está em perceber se a equipa favorita confirma o estatuto desde cedo ou se o adversário consegue prolongar o equilíbrio através de um bloco baixo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / BetKing',
    },
    {
      id: 104,
      title: 'ALLSVENSKAN: Djurgården–Västerås mede a força do fator casa na noite sueca',
      excerpt: 'O Djurgården recebe o Västerås num dos jogos centrais da Allsvenskan desta segunda-feira. As linhas de pré-jogo favorecem a equipa da casa, mas o ponto decisivo será a capacidade de transformar posse de bola e pressão territorial em ocasiões claras.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / BettingOdds',
    },
    {
      id: 105,
      title: 'EKSTRAKLASA: Cracovia–Pogoń abre uma noite de decisões na Polónia',
      excerpt: 'Cracovia e Pogoń Szczecin enfrentam-se numa jornada que também inclui compromissos importantes na Dinamarca, Suécia e Ucrânia. Para os adeptos, é uma oportunidade de acompanhar campeonatos em andamento enquanto as grandes ligas ainda ultimam a preparação da nova época.',
      category: 'ÚLTIMA HORA',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport / Soccerbase',
    },
    {
      id: 106,
      title: 'EFL CUP: York City–Crawley Town traz a primeira eliminatória inglesa à agenda',
      excerpt: 'A Taça da Liga inglesa regressa com York City–Crawley Town. Em jogos eliminatórios de início de época, a gestão de rotações e o impacto da pressão competitiva ganham peso, tornando a leitura de escalações mais relevante do que as referências históricas isoladas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '3 min',
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
