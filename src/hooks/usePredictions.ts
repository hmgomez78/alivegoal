import { useState, useEffect } from 'react';

export interface Prediction {
  id: number;
  league: string;
  leagueCountry?: string;
  leagueLogo?: string;
  homeTeam: string;
  homeLogo?: string;
  awayTeam: string;
  awayLogo?: string;
  date: string;
  time: string;
  prediction: string;
  confidence: number;
  odds: number;
  market: string;
  winner: string;
  analysis?: string;
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
  betNumber?: string;
  betType?: string;
}

const RESPONSIBLE_NOTE =
  'Aposte com responsabilidade. Odds consultadas antes do jogo podem mudar e não garantem resultados.';

// Fallback local alinhado com /api/tips para 08/08/2026.
function getFallbackTips(): Prediction[] {
  const dateStr = '08/08/2026';

  return [
    {
      id: 8201,
      betNumber: '8201',
      betType: 'SINGLE',
      league: 'Carabao Cup — 1.ª ronda',
      homeTeam: 'Cambridge United',
      awayTeam: 'Barnet',
      date: dateStr,
      time: '13:00',
      prediction: 'Vitória Cambridge United',
      confidence: 55,
      odds: 1.83,
      market: 'Resultado Final',
      winner: 'Cambridge United',
      analysis: `O Cambridge United é favorito no mercado 1X2, com a melhor odd de referência a 1.83. A leitura combina o fator casa com uma probabilidade implícita próxima de 55%, mas é um jogo de taça a eliminar e uma seleção pré-jogo nunca elimina o risco de surpresa. Fonte da odd: SportyTrader. ${RESPONSIBLE_NOTE}`,
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 8202,
      betNumber: '8202',
      betType: 'SINGLE',
      league: 'Carabao Cup — 1.ª ronda',
      homeTeam: 'Queens Park Rangers',
      awayTeam: 'Millwall',
      date: dateStr,
      time: '14:00',
      prediction: 'Vitória Millwall',
      confidence: 43,
      odds: 2.32,
      market: 'Resultado Final',
      winner: 'Millwall',
      analysis: `O Millwall surge como favorito marginal em algumas cotações de mercado, apesar de jogar fora, com referência de 2.32 no resultado final. A odd elevada traduz um confronto equilibrado e não uma escolha de alta segurança; o valor potencial vem acompanhado de variância relevante. Fonte da odd: Matchbook, via comparação publicada pela ToffeeWeb. ${RESPONSIBLE_NOTE}`,
      homePercent: 28,
      drawPercent: 29,
      awayPercent: 43,
    },
    {
      id: 8203,
      betNumber: '8203',
      betType: 'SINGLE',
      league: 'J1 League',
      homeTeam: 'Avispa Fukuoka',
      awayTeam: 'Vissel Kobe',
      date: dateStr,
      time: '11:00',
      prediction: 'Avispa Fukuoka +0.5 Handicap Asiático',
      confidence: 56,
      odds: 1.77,
      market: 'Handicap Asiático',
      winner: 'Avispa Fukuoka',
      analysis: `A linha Avispa Fukuoka +0.5 protege a seleção em caso de empate e foi encontrada a -130, equivalente a 1.77 em formato decimal. O Vissel Kobe é tratado como favorito no 1X2, pelo que a aposta assume que o fator casa pode ser suficiente para evitar a derrota. Fonte da odd: SportsGambler. ${RESPONSIBLE_NOTE}`,
      homePercent: 31,
      drawPercent: 32,
      awayPercent: 37,
    },
    {
      id: 8204,
      betNumber: '8204',
      betType: 'SINGLE',
      league: 'J1 League',
      homeTeam: 'Kashiwa Reysol',
      awayTeam: 'Mito HollyHock',
      date: dateStr,
      time: '11:00',
      prediction: 'Vitória Kashiwa Reysol',
      confidence: 55,
      odds: 1.65,
      market: 'Resultado Final',
      winner: 'Kashiwa Reysol',
      analysis: `O Kashiwa Reysol é apontado como favorito em casa contra o Mito HollyHock, com odd de referência de 1.65 e probabilidade de mercado aproximada de 55%. O favoritismo não dispensa cautela: a cotação mantém uma margem considerável para empate ou vitória visitante. Fonte da odd: WinComparator / Unibet. ${RESPONSIBLE_NOTE}`,
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
    },
    {
      id: 8205,
      betNumber: '8205',
      betType: 'SINGLE',
      league: '2. Bundesliga',
      homeTeam: 'SV Darmstadt 98',
      awayTeam: 'Holstein Kiel',
      date: dateStr,
      time: '12:00',
      prediction: 'Vitória SV Darmstadt 98',
      confidence: 45,
      odds: 2.0,
      market: 'Resultado Final',
      winner: 'SV Darmstadt 98',
      analysis: `O Darmstadt é apontado como ligeiro favorito frente ao Holstein Kiel a uma odd de referência de 2.00. É uma seleção de risco moderado: a cotação sugere um jogo aberto, no qual a margem entre os três resultados continua reduzida. Fonte da odd: Oddspedia. ${RESPONSIBLE_NOTE}`,
      homePercent: 45,
      drawPercent: 28,
      awayPercent: 27,
    },
    {
      id: 8206,
      betNumber: '8206',
      betType: 'DOUBLE',
      league: 'Várias',
      homeTeam: 'Cambridge United + Kashiwa Reysol',
      awayTeam: 'Barnet + Mito HollyHock',
      date: dateStr,
      time: 'Vários',
      prediction: 'Cambridge United vence + Kashiwa Reysol vence',
      confidence: 34,
      odds: 3.02,
      market: 'Dupla Combinada',
      winner: '',
      analysis: `A dupla reúne duas vitórias caseiras com odds de referência de 1.83 e 1.65, formando uma cotação combinada aproximada de 3.02. Embora ambas as seleções partam como favoritas nos respetivos mercados, a dupla só é vencedora se os dois resultados ocorrerem e tem, por isso, risco substancialmente superior a cada aposta simples. Fontes das odds: SportyTrader e WinComparator / Unibet. ${RESPONSIBLE_NOTE}`,
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    },
  ];
}

async function fetchTipsFromAPI(): Promise<Prediction[]> {
  try {
    const response = await fetch('/api/tips');
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid API response format');
    }

    return data.items.map((tip: any) => ({
      id: tip.id,
      league: tip.league,
      homeTeam: tip.homeTeam,
      awayTeam: tip.awayTeam,
      date: tip.date,
      time: tip.time,
      prediction: tip.prediction,
      confidence: tip.confidence,
      odds: tip.odds,
      market: tip.market,
      winner: tip.winner || '',
      analysis: tip.analysis,
      homePercent: tip.homePercent || 0,
      drawPercent: tip.drawPercent || 0,
      awayPercent: tip.awayPercent || 0,
      betNumber: tip.betNumber,
      betType: tip.betType,
    }));
  } catch (error) {
    console.error('Error fetching tips from API:', error);
    return [];
  }
}

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const apiTips = await fetchTipsFromAPI();

      if (apiTips.length > 0) {
        setPredictions(apiTips);
      } else {
        setPredictions(getFallbackTips());
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setPredictions(getFallbackTips());
      setError('Erro ao carregar tips. A mostrar dados offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { predictions, loading, error, refresh: fetchPredictions };
}
