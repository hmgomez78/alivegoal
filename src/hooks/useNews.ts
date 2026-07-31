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
  const publicationDate = '31 jul. 2026';

  return [
    {
      id: 101,
      title: 'ANÁLISE: O projeto incompleto de De Zerbi e a gestão do plantel do Tottenham',
      excerpt: 'Roberto De Zerbi quer convencer Djed Spence a ficar e admite que o mercado dos Spurs ainda só está "60% concluído". Com gastos recorde e forte concorrência interna, o técnico italiano procura agora mais um "bombardeiro" para o ataque, moldando uma equipa à sua imagem.',
      category: 'PLANEAMENTO',
      readTime: '5 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 102,
      title: 'ESTRATÉGIA: Como a janela de transferências revela a ambição do Tottenham na WSL',
      excerpt: 'A contratação recorde de Alice Sombath e a chegada de talentos consolidados mostram o plano a 12 meses de Martin Ho. O objetivo do Tottenham é claro: intrometer-se no topo da Women\'s Super League e disputar o acesso às competições europeias na nova temporada.',
      category: 'FUTEBOL FEMININO',
      readTime: '4 min',
      date: publicationDate,
      source: 'BBC Sport',
    },
    {
      id: 103,
      title: 'MERCADO: O impacto de Maxence Lacroix na reconstrução defensiva do Chelsea',
      excerpt: 'Com a chegada de Lacroix por £52 milhões, o Chelsea procura estancar a vulnerabilidade defensiva que marcou a última época. O francês traz versatilidade tática para o esquema de Xabi Alonso e representa uma ligeira inflexão do clube na busca por perfis mais maduros e testados.',
      category: 'TRANSFERÊNCIAS',
      readTime: '4 min',
      date: publicationDate,
      source: 'The Guardian',
    },
    {
      id: 104,
      title: 'PLANEAMENTO: Carlos Espí e a nova arquitetura ofensiva do Real Madrid',
      excerpt: 'A contratação de Carlos Espí ao Levante acrescenta mais uma peça ao ataque de José Mourinho no Real Madrid. O jovem espanhol junta-se a Mbappé e Endrick, num verão de profundas remodelações no Bernabéu que já incluiu as chegadas de Cucurella, Bernardo Silva e Konaté.',
      category: 'ANÁLISE TÁTICA',
      readTime: '5 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 105,
      title: 'ANÁLISE: O que esperar da janela de transferências num ano pós-Mundial',
      excerpt: 'O calendário atípico do verão de 2026, com o Mundial a atrasar o arranque das ligas europeias, obriga os clubes a ginástica negocial. Com o fecho do mercado em Inglaterra marcado para 1 de setembro, as direções desportivas têm menos tempo para integrar reforços antes da competição a sério.',
      category: 'MERCADO',
      readTime: '4 min',
      date: publicationDate,
      source: 'ESPN',
    },
    {
      id: 106,
      title: 'OPINIÃO: O risco das contratações recorde e o fator de adaptação',
      excerpt: 'Transferências milionárias como a de Morgan Rogers para o Aston Villa ou Elliot Anderson para o Manchester City carregam enorme pressão imediata. A história mostra que o valor da etiqueta raramente garante sucesso, exigindo paciência tática num ambiente mediático cada vez mais voraz.',
      category: 'TIPS DE APOSTAS',
      readTime: '6 min',
      date: publicationDate,
      source: 'AliveGoal Editorial',
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
