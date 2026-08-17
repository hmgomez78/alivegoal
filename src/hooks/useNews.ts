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
  const publicationDate = '17 ago. 2026';

  return [
    {
      id: 601,
      title: 'PRIMEIRA LIGA: Casa Pia–Benfica abre uma noite de contraste de ambições',
      excerpt: 'O Benfica visita o Casa Pia em Rio Maior numa partida que, pela hierarquia histórica, coloca maior pressão sobre o candidato ao topo. A agenda da ESPN confirma o pontapé de saída para as 20:15 locais. Para o Casa Pia, o ponto de partida é reduzir o espaço entre linhas e transformar cada recuperação numa transição controlada; para o Benfica, o desafio é não confundir volume de posse com controlo real do risco. A forma como os encarnados reagirem à primeira perda de bola pode definir a narrativa do encontro.',
      category: 'JOGOS DO DIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN Brasil',
    },
    {
      id: 602,
      title: 'LA LIGA: Deportivo–Elche é um teste de maturidade logo na jornada inaugural',
      excerpt: 'Deportivo de La Coruña e Elche entram em campo às 20:00 do Reino Unido num jogo que a BBC inclui na abertura da La Liga. Em estreias de campeonato, a informação sobre automatismos ainda é limitada e as margens tendem a ser pequenas. O Deportivo pode procurar transformar o apoio em casa em pressão territorial, enquanto o Elche terá incentivo para baixar o ritmo e escolher com cuidado os momentos de aceleração. A gestão emocional dos primeiros minutos ganha peso acrescido neste contexto.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 603,
      title: 'CHAMPIONSHIP: Cardiff–Wrexham mede a capacidade de impor o jogo em casa',
      excerpt: 'Cardiff City recebe o Wrexham às 20:00 do Reino Unido, segundo a lista de jogos da BBC. O encontro coloca frente a frente dois emblemas galeses num cenário em que o fator casa pode pesar cedo: iniciar em bloco alto é diferente de conseguir sustentar essa intensidade ao longo de 90 minutos. O Wrexham, por sua vez, terá interesse em sobreviver ao primeiro ímpeto e procurar zonas de cruzamento ou segunda bola. Mais do que o favoritismo prévio, importa observar quem conquista o meio-campo.',
      category: 'JOGOS DO DIA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 604,
      title: 'COPPA ITALIA: Pisa–Empoli traz um dérbi de margem curta para a ronda inaugural',
      excerpt: 'Pisa e Empoli jogam às 17:00 do Reino Unido na primeira ronda da Coppa Italia, num dos quatro jogos italianos desta segunda-feira identificados pela BBC. Em eliminatórias a uma mão, o contexto altera a tomada de decisão: a equipa que se adianta no marcador pode gerir o risco, enquanto quem sofre primeiro fica exposto a acelerar antes do momento ideal. A presença de dois clubes da mesma região acrescenta um componente emocional a uma eliminatória em que o detalhe defensivo pode valer mais do que a iniciativa constante.',
      category: 'TAÇAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 605,
      title: 'DINAMARCA: Brøndby–Sønderjyske coloca o favorito perante a obrigação de controlar',
      excerpt: 'O Brøndby recebe o Sønderjyske às 18:00 do Reino Unido na Superliga dinamarquesa. A agenda do dia oferece um duelo útil para avaliar como um favorito transforma expectativa em domínio sustentável: ter mais bola só cria valor competitivo se a equipa encontrar entradas entre a linha média e a defesa adversária. O Sønderjyske deverá beneficiar de um jogo mais fragmentado, por isso a qualidade do Brøndby na recuperação imediata e nas bolas paradas merece atenção.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 606,
      title: 'SUÉCIA: Häcken–Halmstad testa a diferença entre pressão e eficácia',
      excerpt: 'Häcken e Halmstad defrontam-se às 18:00 do Reino Unido na Allsvenskan, conforme o calendário da BBC. Para o Häcken, jogar em casa cria a expectativa de comandar o território; para o Halmstad, cada passagem ofensiva terá mais valor se for capaz de fixar a bola e ganhar faltas. É um encontro que recompensa uma leitura paciente: uma pressão inicial sem critério pode abrir espaços, mas um bloco bem coordenado pode transformar recuperações em oportunidades de transição.',
      category: 'JOGOS DO DIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
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
