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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 13/05/2026
function getFallbackTips(): Prediction[] {
  return [
    {
      id: 223,
      league: 'Premier League',
      homeTeam: 'Man City',
      awayTeam: 'Crystal Palace',
      date: '13/05',
      time: '20:00',
      prediction: 'Man City Vence',
      confidence: 82,
      odds: 1.40,
      market: 'Resultado Final',
      winner: 'Man City',
      homePercent: 68,
      drawPercent: 18,
      awayPercent: 14,
      betNumber: '223',
      betType: 'SINGLE',
      analysis: 'O City PRECISA de vencer para manter vivas as esperanças no título da Premier League. O Arsenal lidera com 4 pontos de vantagem e uma derrota aqui seria fatal. O City está em excelente forma (3 vitórias seguidas) e recebe um Crystal Palace sem motivação. Vitória caseira é a aposta mais sólida da noite!',
    },
    {
      id: 224,
      league: 'Ligue 1',
      homeTeam: 'Lens',
      awayTeam: 'PSG',
      date: '13/05',
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 78,
      odds: 1.68,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 30,
      drawPercent: 25,
      awayPercent: 45,
      betNumber: '224',
      betType: 'SINGLE',
      analysis: 'O Lens precisa de vencer para manter a esperança no título e vai atacar desde o início. O PSG, mesmo podendo rodar o plantel, tem Dembélé e Kvaratskhelia disponíveis. Os últimos confrontos entre estas equipas produziram sempre golos de ambos os lados. Ambas Marcam é a aposta de valor!',
    },
    {
      id: 225,
      league: 'Coppa Italia',
      homeTeam: 'Lazio',
      awayTeam: 'Inter',
      date: '13/05',
      time: '20:00',
      prediction: 'Inter Vence',
      confidence: 75,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Inter',
      homePercent: 28,
      drawPercent: 22,
      awayPercent: 50,
      betNumber: '225',
      betType: 'SINGLE',
      analysis: 'Final da Coppa Italia! O Inter é favorito claro: venceu o Lazio 3-0 na Serie A recentemente e tem uma equipa mais equilibrada. Simone Inzaghi conhece bem o Lazio (foi treinador durante anos) e vai preparar a equipa ao detalhe. Vitória do Inter é a aposta de valor nesta final!',
    },
    {
      id: 226,
      league: 'La Liga',
      homeTeam: 'Alavés',
      awayTeam: 'Barcelona',
      date: '13/05',
      time: '20:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 80,
      odds: 1.72,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 22,
      drawPercent: 20,
      awayPercent: 58,
      betNumber: '226',
      betType: 'SINGLE',
      analysis: 'O Alavés tem visto mais de 2.5 golos em 6 dos últimos 7 jogos. O Barcelona, já campeão, joga com liberdade e Lamine Yamal e Raphinha estão em forma explosiva. O Alavés precisa de pontos para escapar à despromoção e vai atacar. Espera-se um jogo aberto com muitos golos!',
    },
    {
      id: 227,
      league: 'La Liga',
      homeTeam: 'Villarreal',
      awayTeam: 'Sevilla',
      date: '13/05',
      time: '18:00',
      prediction: 'Villarreal Vence',
      confidence: 72,
      odds: 1.90,
      market: 'Resultado Final',
      winner: 'Villarreal',
      homePercent: 52,
      drawPercent: 25,
      awayPercent: 23,
      betNumber: '227',
      betType: 'SINGLE',
      analysis: 'O Villarreal luta por um lugar europeu e recebe um Sevilla em crise, sem nada a ganhar. O fator casa e a motivação europeia dão clara vantagem ao Submarino Amarelo. O Sevilla tem a pior defesa fora de casa nas últimas 6 jornadas. Vitória caseira com valor!',
    },
    {
      id: 228,
      league: 'Premier League + Coppa Italia',
      homeTeam: 'Man City + Lazio',
      awayTeam: 'Crystal Palace + Inter',
      date: '13/05',
      time: '20:00',
      prediction: 'Man City Vence + Inter Vence',
      confidence: 74,
      odds: 2.59,
      market: 'Combinada',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '228',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR DO DIA: Man City Vence (Premier League) + Inter Vence a Final da Coppa Italia. Duas apostas de alta confiança combinadas para uma odd de excelente valor @2.59. O City precisa de vencer e o Inter é favorito claro na final italiana!',
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
