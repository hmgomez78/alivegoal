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
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
  betNumber?: string;
  betType?: string;
}

// Fallback tips caso a API falhe (hardcoded para o dia)
function getFallbackTips(): Prediction[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  
  return [
    {
      id: 169,
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '169',
      betType: 'SINGLE',
    },
    {
      id: 170,
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 80,
      odds: 1.45,
      market: 'Mais de 1.5',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '170',
      betType: 'SINGLE',
    },
    {
      id: 171,
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Casa',
      confidence: 70,
      odds: 1.70,
      market: 'Resultado Final',
      winner: 'Arsenal',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
      betNumber: '171',
      betType: 'SINGLE',
    },
    {
      id: 172,
      league: 'UEFA Champions League',
      homeTeam: 'Arsenal',
      awayTeam: 'Atlético Madrid',
      date: dateStr,
      time: '20:00',
      prediction: 'BTTS + Over 1.5',
      confidence: 68,
      odds: 2.83,
      market: 'Combinada',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '172',
      betType: 'DOUBLE',
    },
  ];
}

async function fetchTipsFromAPI(): Promise<Prediction[]> {
  try {
    // Fetch from our own Vercel Edge Function (no CORS issues)
    const response = await fetch('/api/tips');
    
    if (!response.ok) {
      throw new Error(`API response: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.tips && data.tips.length > 0) {
      return data.tips.map((tip: any) => ({
        id: tip.id,
        league: tip.league || 'Champions League',
        leagueCountry: tip.leagueCountry || '',
        leagueLogo: tip.leagueLogo || '',
        homeTeam: tip.homeTeam,
        homeLogo: tip.homeLogo || '',
        awayTeam: tip.awayTeam,
        awayLogo: tip.awayLogo || '',
        date: tip.date,
        time: tip.time,
        prediction: tip.prediction,
        confidence: tip.confidence,
        odds: tip.odds,
        market: tip.market,
        winner: tip.winner || '',
        homePercent: tip.homePercent || 45,
        drawPercent: tip.drawPercent || 25,
        awayPercent: tip.awayPercent || 30,
        betNumber: tip.betNumber,
        betType: tip.betType,
      }));
    }
    
    return getFallbackTips();
  } catch (error) {
    console.warn('Could not fetch tips from API, using fallback:', error);
    return getFallbackTips();
  }
}

export function usePredictions(tab: 'Hoje' | 'Amanhã' | 'Esta Semana' = 'Hoje') {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (tab === 'Hoje') {
        const tips = await fetchTipsFromAPI();
        setPredictions(tips);
      } else {
        // Para outros tabs, sem tips disponíveis
        setPredictions([]);
      }
    } catch (err) {
      console.error('Error in usePredictions:', err);
      setError('Erro ao carregar previsões');
      setPredictions(getFallbackTips());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Atualizar a cada 30 minutos
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  return { predictions, loading, error, refresh: fetchData };
}
