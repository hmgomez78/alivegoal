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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 12/05/2026
function getFallbackTips(): Prediction[] {
  return [
    {
      id: 217,
      league: 'La Liga',
      homeTeam: 'Osasuna',
      awayTeam: 'Atl. Madrid',
      date: '12/05',
      time: '19:30',
      prediction: 'Atl. Madrid Vence',
      confidence: 78,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Atl. Madrid',
      homePercent: 20,
      drawPercent: 25,
      awayPercent: 55,
      betNumber: '217',
      betType: 'SINGLE',
      analysis: 'O Atlético de Madrid precisa de vencer para garantir a qualificação direta para a Champions League. O Osasuna já não luta por nada no meio da tabela. A motivação e a qualidade superior da equipa de Simeone farão a diferença. Vitória forasteira é a aposta de valor!',
    },
    {
      id: 218,
      league: 'Championship',
      homeTeam: 'Southampton',
      awayTeam: 'Middlesbrough',
      date: '12/05',
      time: '19:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 75,
      odds: 1.72,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '218',
      betType: 'SINGLE',
      analysis: 'Final do Playoff do Championship! Jogo de tudo ou nada para a subida à Premier League. O Southampton tem um ataque forte, mas o Middlesbrough mostrou resiliência. Com o escândalo do "Spygate" a pairar, a tensão é máxima. Ambas as equipas vão procurar o golo desde cedo.',
    },
    {
      id: 219,
      league: 'Saudi Pro League',
      homeTeam: 'Al Nassr',
      awayTeam: 'Al Hilal',
      date: '12/05',
      time: '18:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 82,
      odds: 1.65,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 40,
      drawPercent: 20,
      awayPercent: 40,
      betNumber: '219',
      betType: 'SINGLE',
      analysis: 'O grande clássico da Arábia Saudita! Cristiano Ronaldo contra o Al Hilal. Historicamente, estes jogos são repletos de golos e emoção. Ambas as equipas têm ataques demolidores e defesas que por vezes vacilam sob pressão. Over 2.5 é uma aposta muito sólida.',
    },
    {
      id: 220,
      league: 'La Liga',
      homeTeam: 'Celta Vigo',
      awayTeam: 'Levante',
      date: '12/05',
      time: '17:00',
      prediction: 'Celta Vigo Vence',
      confidence: 70,
      odds: 1.95,
      market: 'Resultado Final',
      winner: 'Celta Vigo',
      homePercent: 50,
      drawPercent: 28,
      awayPercent: 22,
      betNumber: '220',
      betType: 'SINGLE',
      analysis: 'O Celta joga em casa e precisa de pontos para se afastar definitivamente da zona de despromoção. O Levante tem tido dificuldades fora de portas. O fator casa e a necessidade de pontuar dão vantagem ao Celta.',
    },
    {
      id: 221,
      league: 'La Liga',
      homeTeam: 'Betis',
      awayTeam: 'Elche',
      date: '12/05',
      time: '18:00',
      prediction: 'Betis Vence',
      confidence: 85,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Betis',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
      betNumber: '221',
      betType: 'SINGLE',
      analysis: 'O Betis luta pelos lugares europeus e recebe um Elche que está no fundo da tabela. A diferença de qualidade é abismal e o Betis em casa costuma ser muito forte. Vitória caseira é a aposta mais segura do dia na La Liga.',
    },
    {
      id: 222,
      league: 'La Liga + Saudi Pro League',
      homeTeam: 'Betis + Al Nassr',
      awayTeam: 'Elche + Al Hilal',
      date: '12/05',
      time: '18:00',
      prediction: 'Betis Vence + Over 2.5',
      confidence: 76,
      odds: 2.39,
      market: 'Combinada',
      winner: '',
      homePercent: 55,
      drawPercent: 20,
      awayPercent: 25,
      betNumber: '222',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR: Betis Vence (La Liga) + Over 2.5 Golos (Al Nassr vs Al Hilal). Combinamos a vitória provável do Betis com a expectativa de golos no clássico saudita para uma odd de valor @2.39!',
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
