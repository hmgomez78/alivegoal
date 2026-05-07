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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 07/05/2026
function getFallbackTips(): Prediction[] {
  return [
    {
      id: 177,
      league: 'UEFA Europa League',
      homeTeam: 'Aston Villa',
      awayTeam: 'Nottingham Forest',
      date: '07/05',
      time: '19:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 78,
      odds: 1.75,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 50,
      drawPercent: 22,
      awayPercent: 28,
      betNumber: '177',
      betType: 'SINGLE',
      analysis: 'Semi-final da Europa League — Aston Villa e Nottingham Forest vão ao ataque! Emery sabe que precisa de golos. Forest também não vai fechar. BTTS é a aposta certa para esta noite!',
    },
    {
      id: 178,
      league: 'UEFA Europa League',
      homeTeam: 'Freiburg',
      awayTeam: 'Braga',
      date: '07/05',
      time: '19:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 74,
      odds: 1.85,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 48,
      drawPercent: 24,
      awayPercent: 28,
      betNumber: '178',
      betType: 'SINGLE',
      analysis: 'Braga tem 2-1 do primeiro jogo. O Freiburg precisa de marcar em casa. Jogo aberto, ambas equipas com motivação máxima. Over 2.5 é forte neste contexto!',
    },
    {
      id: 179,
      league: 'UEFA Conference League',
      homeTeam: 'Crystal Palace',
      awayTeam: 'Shakhtar Donetsk',
      date: '07/05',
      time: '19:00',
      prediction: 'Crystal Palace Vence',
      confidence: 80,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Crystal Palace',
      homePercent: 60,
      drawPercent: 20,
      awayPercent: 20,
      betNumber: '179',
      betType: 'SINGLE',
      analysis: 'Crystal Palace entra com vantagem de 3-1 do primeiro jogo. Em casa, Glasner\'s side vai fechar o assunto. Vitória do Palace é praticamente garantida!',
    },
    {
      id: 180,
      league: 'Saudi Pro League',
      homeTeam: 'Al-Shabab',
      awayTeam: 'Al-Nassr',
      date: '07/05',
      time: '18:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 76,
      odds: 1.80,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 35,
      drawPercent: 25,
      awayPercent: 40,
      betNumber: '180',
      betType: 'SINGLE',
      analysis: 'CR7 e o Al-Nassr precisam de vencer para garantir o título! Ronaldo tem 25 golos esta época. Jogo de alta pressão, Over 2.5 é forte neste contexto de título!',
    },
    {
      id: 181,
      league: 'CONMEBOL Libertadores',
      homeTeam: 'Platense',
      awayTeam: 'Peñarol',
      date: '07/05',
      time: '22:00',
      prediction: 'Peñarol Vence ou Empate',
      confidence: 72,
      odds: 1.65,
      market: 'Dupla Hipotese',
      winner: 'Peñarol',
      homePercent: 30,
      drawPercent: 28,
      awayPercent: 42,
      betNumber: '181',
      betType: 'SINGLE',
      analysis: 'Peñarol é um dos grandes favoritos da Libertadores 2026. Em campo neutro, a qualidade técnica do Peñarol faz a diferença. X2 é a aposta segura!',
    },
    {
      id: 182,
      league: 'UEFA Europa League',
      homeTeam: 'Aston Villa',
      awayTeam: 'Nottingham Forest',
      date: '07/05',
      time: '19:00',
      prediction: 'Aston Villa Vence + Over 1.5',
      confidence: 70,
      odds: 2.10,
      market: 'Combinada',
      winner: 'Aston Villa',
      homePercent: 50,
      drawPercent: 22,
      awayPercent: 28,
      betNumber: '182',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR: Aston Villa Vence + Over 1.5 Golos. Villa em casa na Europa League é forte. Emery sabe como gerir semi-finais. Odd @2.10 com boa relação risco/retorno!',
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
