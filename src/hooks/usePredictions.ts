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

// Fallback local alinhado com /api/tips para 29/07/2026.
function getFallbackTips(): Prediction[] {
  const dateStr = '29/07/2026';
  const league = 'Liga dos Campeões — Qualificação';

  return [
    {
      id: 7001,
      league,
      homeTeam: 'Crvena Zvezda',
      awayTeam: 'Larne',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Crvena Zvezda',
      confidence: 88,
      odds: 1.06,
      market: 'Resultado final',
      winner: 'Crvena Zvezda',
      homePercent: 88,
      drawPercent: 8,
      awayPercent: 4,
      betNumber: '7001',
      betType: 'SINGLE',
      analysis: `O Crvena Zvezda entra com 4-0 de vantagem depois de dominar a primeira mão. A odd pré-jogo de 1.06 traduz favoritismo muito elevado. ${RESPONSIBLE_NOTE}`,
    },
    {
      id: 7002,
      league,
      homeTeam: 'Lech Poznań',
      awayTeam: 'Aarhus',
      date: dateStr,
      time: '19:00',
      prediction: 'Vitória Lech Poznań',
      confidence: 58,
      odds: 1.73,
      market: 'Resultado final',
      winner: 'Lech Poznań',
      homePercent: 58,
      drawPercent: 27,
      awayPercent: 15,
      betNumber: '7002',
      betType: 'SINGLE',
      analysis: `O Lech venceu a primeira mão por 4-1 e joga em Poznań. A cotação de 1.73 corresponde a aproximadamente 58% de probabilidade implícita. ${RESPONSIBLE_NOTE}`,
    },
    {
      id: 7003,
      league,
      homeTeam: 'Kairat Almaty',
      awayTeam: 'Omonia',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Kairat Almaty',
      confidence: 45,
      odds: 2.23,
      market: 'Resultado final',
      winner: 'Kairat Almaty',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
      betNumber: '7003',
      betType: 'SINGLE',
      analysis: `A perder 1-0 na eliminatória, o Kairat precisa de assumir o jogo em Almaty. A odd 2.23 indica uma seleção de valor, não uma escolha de baixa variância. ${RESPONSIBLE_NOTE}`,
    },
    {
      id: 7004,
      league,
      homeTeam: 'Kauno Žalgiris',
      awayTeam: 'Klaksvík',
      date: dateStr,
      time: '18:00',
      prediction: 'Klaksvík ou Empate (X2)',
      confidence: 61,
      odds: 2.20,
      market: 'Dupla hipótese',
      winner: 'Klaksvík',
      homePercent: 39,
      drawPercent: 25,
      awayPercent: 36,
      betNumber: '7004',
      betType: 'SINGLE',
      analysis: `Com 0-0 da primeira mão, o Klaksvík pode gerir uma eliminatória aberta. O modelo de mercado consultado atribuiu 61% ao X2, a 2.20. ${RESPONSIBLE_NOTE}`,
    },
    {
      id: 7005,
      league,
      homeTeam: 'Universitatea Craiova',
      awayTeam: 'Levski Sofia',
      date: dateStr,
      time: '19:30',
      prediction: 'Menos de 2.5 golos',
      confidence: 58,
      odds: 1.73,
      market: 'Total de golos',
      winner: '',
      homePercent: 42,
      drawPercent: 31,
      awayPercent: 27,
      betNumber: '7005',
      betType: 'SINGLE',
      analysis: `O Levski defende uma vantagem de 1-0 e o Under 2.5 foi cotado a 1.73. O contexto de segunda mão aponta para uma partida controlada. ${RESPONSIBLE_NOTE}`,
    },
    {
      id: 7006,
      league,
      homeTeam: 'Crvena Zvezda + Lech Poznań',
      awayTeam: 'Larne + Aarhus',
      date: dateStr,
      time: '19:00',
      prediction: 'Crvena Zvezda vence + Lech Poznań vence',
      confidence: 55,
      odds: 1.83,
      market: 'Combinada',
      winner: '',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
      betNumber: '7006',
      betType: 'DOUBLE',
      analysis: `Odd combinada calculada a partir de 1.06 × 1.73 = 1.83; probabilidade implícita aproximada de 55%. Numa dupla, uma falha perde toda a aposta. ${RESPONSIBLE_NOTE}`,
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
