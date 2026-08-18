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
  const publicationDate = '18 ago. 2026';

  return [
    {
      id: 701,
      title: 'CHAMPIONS: Fenerbahçe–Lyon mede a força do fator casa no primeiro acto',
      excerpt: 'O Fenerbahçe recebe o Olympique Lyonnais às 20:00 (hora do Reino Unido) no play-off da Liga dos Campeões. O mercado 1X2 consultado coloca os turcos como favoritos moderados, não como favoritos esmagadores: o contexto pede equilíbrio entre agressividade territorial e controlo das transições. Para o Lyon, sobreviver ao arranque e sair da pressão com qualidade pode ser tão valioso quanto acumular posse. É uma primeira mão em que a gestão da vantagem ou do empate terá peso estratégico imediato.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / FanDuel',
    },
    {
      id: 702,
      title: 'CHAMPIONS: Dinamo Zagreb chega embalado, mas o Viking é um teste de maturidade',
      excerpt: 'Dinamo Zagreb–Viking começa às 20:00 do Reino Unido, segundo a agenda da BBC, e abre uma eliminatória que decide presença na fase principal da Champions. O Dinamo passou pelo Kauno Žalgiris com triunfos por 5-0 e 2-1 nas duas partidas mais recentes da qualificação, dados que explicam o favoritismo caseiro. Ainda assim, uma eliminatória de duas mãos não recompensa apenas a iniciativa: o anfitrião terá de proteger-se contra uma equipa norueguesa que chega com capacidade ofensiva reconhecida pela prévia do encontro.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / Legalbet',
    },
    {
      id: 703,
      title: 'CHAMPIONS: Levski–AEK é uma eliminatória onde o preço prevê pouca margem',
      excerpt: 'Levski Sofia e AEK Athens entram em campo às 20:00 do Reino Unido, num play-off em que a cotação de referência dá uma vantagem curta aos gregos. Essa diferença reduzida muda a leitura do jogo: o Levski não precisa de se expor cedo para ser competitivo, enquanto a AEK terá de evitar que o favoritismo se transforme em precipitação. O primeiro golo pode alterar radicalmente a estrutura de risco, sobretudo se a equipa que marca conseguir baixar o ritmo e defender com bloco compacto.',
      category: 'JOGOS DO DIA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / FanDuel',
    },
    {
      id: 704,
      title: 'LIBERTADORES: Rivadavia–Fluminense reabre um duelo que ainda não encontrou vencedor',
      excerpt: 'Independiente Rivadavia recebe o Fluminense às 23:00 do Reino Unido nos oitavos da Libertadores. O marcador agregado está em 0-0 depois da primeira mão e o histórico recente do confronto reforça a ideia de equilíbrio: em 2026, as equipas já registaram um 0-0, um 1-1 e uma vitória argentina por 2-1. Com pouco para separar os lados, a disciplina sem bola e a eficiência nas bolas paradas podem pesar mais do que o volume de ataques.',
      category: 'TAÇAS',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport / Legalbet',
    },
    {
      id: 705,
      title: 'CHINA: Shanghai Shenhua–Beijing Guoan promete um duelo de probabilidades apertadas',
      excerpt: 'Shanghai Shenhua e Beijing Guoan jogam às 12:35 do Reino Unido na Superliga Chinesa. A referência de mercado coloca o Shenhua como favorito curto em casa, com o Beijing suficientemente próximo para que um jogo de transições tenha valor competitivo real. Para o anfitrião, a prioridade é evitar perdas no corredor central que ofereçam contra-ataques; para o visitante, impedir que a posse territorial do Shenhua se converta em cruzamentos repetidos será o primeiro objectivo.',
      category: 'ANÁLISE TÁTICA',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport / FanDuel',
    },
    {
      id: 706,
      title: 'AMIGÁVEL: Heidenheim–Bayern é mais sobre rotinas do que sobre o resultado',
      excerpt: 'O Bayern Munique visita o Heidenheim às 17:00 do Reino Unido num amigável de pré-temporada. Num contexto sem pontos ou eliminação em jogo, a informação mais útil estará nos comportamentos: a altura da pressão, a ligação entre sectores e o volume de minutos dos jogadores chamados a ter protagonismo na época. Para o Heidenheim, enfrentar um adversário de elite permite testar a organização defensiva sob pressão contínua; para o Bayern, é uma oportunidade de afinar mecanismos sem o peso de uma competição oficial.',
      category: 'JOGOS DO DIA',
      readTime: '3 min',
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
