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

// Fallback tips caso a API falhe (hardcoded para o dia)
function getFallbackTips(): Prediction[] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  
  return [
    {
      id: 173,
      league: 'UEFA Champions League',
      homeTeam: 'Bayern München',
      awayTeam: 'Paris SG',
      date: '06/05',
      time: '20:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 85,
      odds: 1.65,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '173',
      betType: 'SINGLE',
      analysis: 'Bayern em casa na Champions é uma MÁQUINA de golos — 4.69 golos/jogo de média! O PSG também não brinca com 4.27. Bayern: 92% Over 2.5 na UCL | PSG: 73%. FOGO GARANTIDO!',
    },
    {
      id: 174,
      league: 'UEFA Champions League',
      homeTeam: 'Bayern München',
      awayTeam: 'Paris SG',
      date: '06/05',
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 82,
      odds: 1.72,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '174',
      betType: 'SINGLE',
      analysis: 'Bayern FTS: 0% | PSG FTS: 7%. Semi-final de volta, ambas equipas vão atacar sem medo. Bayern: 85% BTTS | PSG: 67%. BTTS é praticamente certo!',
    },
    {
      id: 175,
      league: 'UEFA Champions League',
      homeTeam: 'Bayern München',
      awayTeam: 'Paris SG',
      date: '06/05',
      time: '20:00',
      prediction: 'Golo na 1ª Parte',
      confidence: 80,
      odds: 1.40,
      market: 'Golo 1ª Parte',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '175',
      betType: 'SINGLE',
      analysis: 'Bayern: 77% Over 0.5 HT | PSG: 80%. Média HT combinada: 2.19. A Allianz Arena vai explodir logo nos primeiros minutos!',
    },
    {
      id: 176,
      league: 'UEFA Champions League',
      homeTeam: 'Bayern München',
      awayTeam: 'Paris SG',
      date: '06/05',
      time: '20:00',
      prediction: 'Over 2.5 + BTTS + Over 0.5 1H',
      confidence: 75,
      odds: 2.90,
      market: 'Combinada',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '176',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR: Over 2.5 + BTTS + Over 0.5 1H. Média combinada: 4.48 golos/jogo. Stake: 500 MZN por aposta → Retorno total potencial: 1450 MZN!',
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
        analysis: tip.analysis || '',
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
