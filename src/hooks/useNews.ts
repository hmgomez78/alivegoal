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
  const publicationDate = '24 jul. 2026';

  return [
    {
      id: 'context-1',
      title: 'EUROPA LEAGUE: Reviravolta do St.Gallen frente ao Benfica deixa tudo em aberto',
      excerpt: 'A vitória do St.Gallen por 2-1 na receção ao Benfica sublinha a exigência das eliminatórias europeias precoces. O resultado transfere a pressão para o jogo da segunda mão, exigindo uma resposta tática clara da equipa encarnada perante o seu público.',
      category: 'ANÁLISE EUROPEIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-2',
      title: 'CONFERENCE LEAGUE: Estreia positiva de Alfred Johansson no Motherwell',
      excerpt: 'O Motherwell venceu o HB Tórshavn por 2-0, num jogo marcado por oito estreias absolutas na equipa escocesa. A abordagem corajosa com bola e o envolvimento de vários jovens talentos deixam boas perspetivas para a era Johansson.',
      category: 'LEITURA TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-3',
      title: 'CONFERENCE LEAGUE: Hibernian surpreendido na deslocação ao Kosovo',
      excerpt: 'A derrota por 2-0 do Hibernian frente ao Malisheva serve de aviso para os perigos das rondas de qualificação continentais. O emblema escocês terá de apresentar uma versão muito mais contundente na segunda mão para evitar uma eliminação precoce.',
      category: 'ANÁLISE EUROPEIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-4',
      title: 'CONFERENCE LEAGUE: Ajax impõe hierarquia com goleada na Sérvia',
      excerpt: 'O triunfo claro do Ajax por 4-1 no terreno do Vojvodina demonstra a diferença de argumentos competitivos entre as duas formações. A equipa de Amesterdão deixou a eliminatória praticamente resolvida antes do jogo de volta nos Países Baixos.',
      category: 'ANÁLISE EUROPEIA',
      readTime: '3 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-5',
      title: 'FUTEBOL DE FORMAÇÃO: FA desvaloriza incidente nos Sub-16 como "assunto interno"',
      excerpt: 'A federação inglesa de futebol encerrou rapidamente a polémica gerada pela divulgação de um vídeo de 2025 que mostrava um confronto entre jogadores da seleção de Sub-16 durante um estágio na Turquia, considerando a situação resolvida no momento.',
      category: 'FUTEBOL INGLÊS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 'context-6',
      title: 'MERCADO FEMININO: Transferências cruciais ofuscadas pelo Mundial Masculino',
      excerpt: 'Enquanto as atenções globais se focavam no Mundial 2026, o mercado de transferências feminino registou movimentos de grande impacto. Nomes como Alexandra Popp (Dortmund) e Kadidiatou Diani (London City) mudaram de ares, redesenhando as forças na Europa.',
      category: 'FUTEBOL FEMININO',
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
