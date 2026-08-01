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
  const publicationDate = '1 ago. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE TÁTICA: O impacto do cansaço pós-Mundial nas contas da Premier League',
      excerpt: 'Com a Premier League a arrancar a 21 de agosto, apenas 33 dias após a final do Mundial, equipas como Arsenal e Manchester City enfrentam uma pré-época atrofiada. A fadiga acumulada e os regressos tardios prometem nivelar o primeiro mês de competição, exigindo rotações drásticas.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'PLANEAMENTO: Como a revolução silenciosa no Newcastle redefine a ambição do clube',
      excerpt: 'A saída de Eddie Howe expôs uma mudança estrutural no Newcastle. Longe das promessas de domínio imediato, a atual direção desportiva foca-se na valorização de jovens promessas na casa dos £20m-£40m. É um modelo sustentável, mas que esfria o sonho imediato de títulos.',
      category: 'ANÁLISE TÁTICA',
      readTime: '6 min',
      date: publicationDate,
      source: 'BBC Sport / The Guardian',
    },
    {
      id: 103,
      title: 'TRANSFERÊNCIAS: O risco das contratações acima dos £100m num mercado inflacionado',
      excerpt: 'A janela de verão de 2026 reafirmou o poderio financeiro da Premier League, com o Tottenham a quebrar a barreira dos £100m por Sandro Tonali. A história, contudo, alerta: a pressão do preço afeta o rendimento imediato e exige paciência num ecossistema mediático impiedoso.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'AliveGoal Editorial',
    },
    {
      id: 104,
      title: 'BASTIDORES: A ameaça de boicote europeu e o braço de ferro pelos lucros do Mundial',
      excerpt: 'A oposição frontal da UEFA ao plano de comercialização dos torneios da FIFA ameaça paralisar o calendário internacional. Se a crise não for resolvida, o futebol feminino, cuja dependência das receitas do Mundial é crítica, poderá ser o maior dano colateral deste conflito institucional.',
      category: 'ÚLTIMA HORA',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 105,
      title: 'TIPS DE APOSTAS: Navegar na incerteza dos amigáveis de pré-época',
      excerpt: 'Apostar em jogos de preparação exige cautela redobrada. As múltiplas substituições ao intervalo, o foco na condição física em detrimento do resultado e as experiências táticas subvertem as probabilidades tradicionais. A aposta de valor reside frequentemente nos golos ou em handicaps positivos dos underdogs.',
      category: 'TIPS DE APOSTAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'AliveGoal Editorial',
    },
    {
      id: 106,
      title: 'INGLATERRA: O arranque madrugador da EFL e as surpresas da Carabao Cup',
      excerpt: 'A temporada inglesa 2026-27 começou de forma discreta com a ronda preliminar da Carabao Cup. O embate entre Tranmere Rovers e Rochdale marcou o pontapé de saída de um calendário que, mais uma vez, testará a profundidade dos plantéis nas divisões inferiores.',
      category: 'ÚLTIMA HORA',
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
