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

// Conteúdo de análise e contexto, distinto das manchetes do feed de tendências.
function getFallbackNews(): NewsArticle[] {
  const publicationDate = '29 jul. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE: O Barcelona entra num verão decisivo na procura do novo número 9',
      excerpt: 'A sucessão de Robert Lewandowski tornou-se o maior dossiê ofensivo do Barcelona. Com Julián Álvarez fora de alcance, João Pedro bloqueado pelo Chelsea e Bournemouth resistente por Junior Kroupi, o clube precisa de reavaliar preço, perfil e calendário sem comprometer o próximo ciclo.',
      category: 'PLANEAMENTO',
      readTime: '5 min',
      date: publicationDate,
      source: 'BeSoccer',
    },
    {
      id: 102,
      title: 'ESTRATÉGIA: A renovação de Kane e o que muda no ataque do Bayern',
      excerpt: 'A perspetiva de Harry Kane prolongar o vínculo com o Bayern fecha, por agora, a porta a Barcelona e Al-Hilal. Mais do que reter golos, a decisão dá previsibilidade ao planeamento bávaro: a prioridade pode deslocar-se para criadores e equilíbrio defensivo em vez de uma substituição imediata de elite.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BeSoccer',
    },
    {
      id: 103,
      title: 'MERCADO: Porque o Chelsea trata Pedro Neto como peça central',
      excerpt: 'Apesar das especulações de saída, o Chelsea mantém Pedro Neto como elemento nuclear do projeto. A posição do clube ajuda a explicar por que as grandes equipas procuram alas prontos para decidir: trocar um desequilibrador consolidado exige mais do que uma proposta financeiramente atraente.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'BeSoccer',
    },
    {
      id: 104,
      title: 'SELEÇÕES: Klopp na Alemanha e o valor de um ciclo até 2030',
      excerpt: 'A nomeação oficial de Jürgen Klopp para a Alemanha até ao Mundial de 2030 dá à federação uma rara janela de planeamento longo. O desafio não será apenas recuperar resultados: será criar uma identidade estável, integrar a nova geração e gerir a expectativa inevitável em torno de um treinador de perfil global.',
      category: 'FUTEBOL INTERNACIONAL',
      readTime: '5 min',
      date: publicationDate,
      source: 'BeSoccer',
    },
    {
      id: 105,
      title: 'ANÁLISE: O interesse do Real Madrid por Rodri testa o centro do projeto City',
      excerpt: 'Os relatos sobre o desejo de Rodri por um novo desafio e o interesse do Real Madrid colocam foco no papel estrutural do médio. Para o Manchester City, a questão não é apenas preço: substituir um jogador que organiza a posse, controla transições e define o ritmo altera toda a arquitetura da equipa.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'BeSoccer',
    },
    {
      id: 106,
      title: 'EUROPA: Como a segunda pré-eliminatória muda a rota para a Champions',
      excerpt: 'A segunda mão da segunda pré-eliminatória decide muito mais do que uma vaga na ronda seguinte. Os vencedores avançam na sua respetiva via; os derrotados transitam para a terceira pré-eliminatória da Liga Europa. É por isso que cada golo tem impacto simultâneo na ambição desportiva e no calendário da época.',
      category: 'COMPETIÇÕES UEFA',
      readTime: '4 min',
      date: publicationDate,
      source: 'UEFA',
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
