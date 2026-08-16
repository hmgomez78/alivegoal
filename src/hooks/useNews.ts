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
  const publicationDate = '16 ago. 2026';

  return [
    {
      id: 501,
      title: 'MANCHESTER UNITED: O 4-2 com o Milan expõe o trabalho defensivo que ainda falta',
      excerpt: 'A derrota por 4-2 frente ao AC Milan fechou a pré-época do Manchester United com um aviso claro para Michael Carrick. A BBC identificou dificuldades na cobertura do corredor esquerdo, espaços entre setores e fragilidade perante movimentos de rutura; três dos quatro golos do Milan nasceram à curta distância. A lição não é apenas sobre um amigável: com a estreia da liga à porta, a coordenação entre lateral, médio e central passa a ser a prioridade competitiva.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 502,
      title: 'RASHFORD: O regresso abre uma decisão de plantel, não uma conclusão',
      excerpt: 'Marcus Rashford voltou a jogar pelo Manchester United pela primeira vez desde dezembro de 2024 e respondeu com uma entrada serena, incluindo um lance técnico junto à linha. A presença com a camisola 9, porém, não fecha a discussão sobre o futuro: o clube sublinhou que o número não é permanente e a janela ainda está aberta. Para Carrick, a questão é tática e estratégica: como integrar um avançado de largura sem comprometer o equilíbrio da equipa.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 503,
      title: 'MANCHESTER CITY: A primeira prova sem Guardiola mede mais do que uma taça',
      excerpt: 'O Community Shield diante do Arsenal é a primeira partida competitiva do Manchester City sem Pep Guardiola no comando. A prévia da DraftKings Network enquadra Enzo Maresca num contexto de mudança profunda: Bernardo Silva saiu, Rodri é dúvida física e Elliot Anderson chegou para renovar o meio-campo. O resultado não definirá a época, mas a capacidade de reproduzir os princípios de pressão e posse será observada com especial atenção.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'DraftKings Network',
    },
    {
      id: 504,
      title: 'ARSENAL: Continuidade, Bruno Guimarães e a oportunidade de começar com um sinal forte',
      excerpt: 'O Arsenal chega ao Community Shield com uma base reconhecível, mas com Bruno Guimarães como adição relevante ao centro do terreno e Christos Tzolis a compensar a saída de Leandro Trossard. A estabilidade pode ser uma vantagem num jogo de abertura contra um adversário em transição técnica. Mais do que o troféu, o desafio dos Gunners é transformar familiaridade coletiva em controlo de ritmo quando o jogo exigir resposta à pressão alta do City.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'DraftKings Network',
    },
    {
      id: 505,
      title: 'LA LIGA: Racing–Villarreal coloca um promovido perante o teste da primeira jornada',
      excerpt: 'O Racing Santander recebe o Villarreal no primeiro domingo da La Liga, num confronto que ilustra a exigência imediata do regresso ao escalão principal. Em semanas inaugurais, o risco está menos no volume de informação e mais na incerteza dos automatismos: o visitante tentará impor qualidade e controlo territorial, enquanto o Racing procurará transformar a energia do seu estádio em intensidade e transições. A gestão dos primeiros 20 minutos pode definir o guião.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 506,
      title: 'BRASILEIRÃO: Atlético-MG–Grêmio e Mirassol–Flamengo concentram pressão no domingo',
      excerpt: 'A ronda de domingo do Brasileirão reúne dois contextos competitivos diferentes. O Atlético-MG recebe o Grêmio em Belo Horizonte com favoritismo de mercado, enquanto o Flamengo visita o Mirassol num teste de controlo fora de casa. A agenda da ESPN também inclui Vasco–Santos, Vitória–Botafogo e Corinthians–Cruzeiro; com seis jogos no mesmo bloco, pequenos detalhes de rotação, viagem e intensidade podem alterar a leitura pré-jogo.',
      category: 'JOGOS DO DIA',
      readTime: '4 min',
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
