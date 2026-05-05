import { useState, useEffect } from 'react';

const API_KEY = 'e5eb8e8d1bdca69c9a5895d2a5cd79c5';
const API_BASE = 'https://v3.football.api-sports.io';

// Ligas prioritárias (IDs da API-Football)
const PRIORITY_LEAGUES = [
  39,   // Premier League
  140,  // La Liga
  135,  // Serie A
  78,   // Bundesliga
  61,   // Ligue 1
  94,   // Liga Portugal
  2,    // Champions League
  3,    // Europa League
  13,   // CONMEBOL Libertadores
  71,   // Brasileirão Serie A
  128,  // Liga Argentina
  397,  // Girabola (Angola)
  307,  // Moçambola (Moçambique)
  570,  // Ghana Premier League
  6,    // CAF Champions League
];

export interface Prediction {
  id: number;
  league: string;
  leagueCountry: string;
  leagueLogo: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
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
}

function percentToOdds(percent: number): number {
  if (percent <= 0) return 10.0;
  const odds = 100 / percent;
  return Math.round(odds * 100) / 100;
}

function getMarketFromAdvice(advice: string, percent: { home: string; draw: string; away: string }): { market: string; prediction: string; confidence: number; odds: number } {
  const homeP = parseInt(percent.home) || 33;
  const drawP = parseInt(percent.draw) || 33;
  const awayP = parseInt(percent.away) || 33;
  
  // Determinar o mercado mais forte
  const maxP = Math.max(homeP, drawP, awayP);
  
  if (advice.toLowerCase().includes('over') || advice.toLowerCase().includes('goals')) {
    return {
      market: 'Mais de 2.5',
      prediction: 'Mais de 2.5 Golos',
      confidence: Math.min(maxP + 5, 95),
      odds: Math.round((100 / (maxP + 5)) * 100) / 100
    };
  }
  
  if (advice.toLowerCase().includes('under')) {
    return {
      market: 'Menos de 2.5',
      prediction: 'Menos de 2.5 Golos',
      confidence: Math.min(maxP + 5, 95),
      odds: Math.round((100 / (maxP + 5)) * 100) / 100
    };
  }

  if (advice.toLowerCase().includes('btts') || advice.toLowerCase().includes('both')) {
    return {
      market: 'Ambas Marcam',
      prediction: 'Ambas Marcam - Sim',
      confidence: Math.min(maxP, 90),
      odds: Math.round((100 / maxP) * 100) / 100
    };
  }

  if (homeP >= awayP && homeP >= drawP) {
    return {
      market: 'Resultado Final',
      prediction: 'Vitória Casa',
      confidence: homeP,
      odds: percentToOdds(homeP)
    };
  } else if (awayP > homeP && awayP >= drawP) {
    return {
      market: 'Resultado Final',
      prediction: 'Vitória Fora',
      confidence: awayP,
      odds: percentToOdds(awayP)
    };
  } else {
    return {
      market: 'Dupla Hipótese',
      prediction: 'Empate ou ' + (homeP >= awayP ? 'Casa' : 'Fora'),
      confidence: Math.min(homeP + drawP, 90),
      odds: percentToOdds(homeP + drawP)
    };
  }
}

async function fetchFixtures(date: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/fixtures?date=${date}`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.warn('API-Football errors:', data.errors);
      return [];
    }
    
    return data.response || [];
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
}

async function fetchPrediction(fixtureId: number): Promise<any | null> {
  try {
    const response = await fetch(`${API_BASE}/predictions?fixture=${fixtureId}`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await response.json();
    
    if (data.response && data.response.length > 0) {
      return data.response[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return null;
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
      // Calcular a data baseada no tab
      const today = new Date();
      let targetDate: string;
      
      if (tab === 'Amanhã') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        targetDate = tomorrow.toISOString().split('T')[0];
      } else {
        targetDate = today.toISOString().split('T')[0];
      }

      // Buscar fixtures do dia
      const fixtures = await fetchFixtures(targetDate);
      
      if (fixtures.length === 0) {
        // Tentar o dia seguinte se não houver jogos hoje
        const nextDay = new Date(today);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDate = nextDay.toISOString().split('T')[0];
        const nextFixtures = await fetchFixtures(nextDate);
        
        if (nextFixtures.length === 0) {
          setPredictions(getFallbackPredictions());
          setLoading(false);
          return;
        }
      }

      // Filtrar por ligas prioritárias primeiro
      const priorityFixtures = fixtures.filter(f => 
        PRIORITY_LEAGUES.includes(f.league.id)
      );
      
      // Se não houver jogos de ligas prioritárias, usar os mais relevantes
      const selectedFixtures = priorityFixtures.length > 0 
        ? priorityFixtures.slice(0, 8)
        : fixtures.slice(0, 8);

      // Buscar predictions para cada fixture (limitado a 6 para poupar requests)
      const predictionPromises = selectedFixtures.slice(0, 6).map(async (fixture) => {
        const pred = await fetchPrediction(fixture.fixture.id);
        if (!pred) return null;

        const percent = pred.predictions?.percent || { home: '33%', draw: '33%', away: '33%' };
        const advice = pred.predictions?.advice || '';
        const marketInfo = getMarketFromAdvice(advice, percent);

        const fixtureDate = new Date(fixture.fixture.date);
        
        return {
          id: fixture.fixture.id,
          league: fixture.league.name,
          leagueCountry: fixture.league.country,
          leagueLogo: fixture.league.logo,
          homeTeam: fixture.teams.home.name,
          homeLogo: fixture.teams.home.logo,
          awayTeam: fixture.teams.away.name,
          awayLogo: fixture.teams.away.logo,
          date: fixtureDate.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }),
          time: fixtureDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
          prediction: marketInfo.prediction,
          confidence: marketInfo.confidence,
          odds: marketInfo.odds,
          market: marketInfo.market,
          winner: pred.predictions?.winner?.name || '',
          homePercent: parseInt(percent.home) || 33,
          drawPercent: parseInt(percent.draw) || 33,
          awayPercent: parseInt(percent.away) || 33,
        } as Prediction;
      });

      const results = await Promise.all(predictionPromises);
      const validPredictions = results.filter(p => p !== null) as Prediction[];

      if (validPredictions.length > 0) {
        setPredictions(validPredictions);
      } else {
        setPredictions(getFallbackPredictions());
      }
    } catch (err) {
      console.error('Error in usePredictions:', err);
      setError('Erro ao carregar previsões');
      setPredictions(getFallbackPredictions());
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

function getFallbackPredictions(): Prediction[] {
  return [
    {
      id: 1,
      league: 'Premier League',
      leagueCountry: 'England',
      leagueLogo: '',
      homeTeam: 'Manchester City',
      homeLogo: '',
      awayTeam: 'Arsenal',
      awayLogo: '',
      date: 'Hoje',
      time: '20:45',
      prediction: 'Vitória Casa',
      confidence: 65,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Manchester City',
      homePercent: 55,
      drawPercent: 25,
      awayPercent: 20,
    },
    {
      id: 2,
      league: 'La Liga',
      leagueCountry: 'Spain',
      leagueLogo: '',
      homeTeam: 'Barcelona',
      homeLogo: '',
      awayTeam: 'Real Madrid',
      awayLogo: '',
      date: 'Hoje',
      time: '21:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 72,
      odds: 1.72,
      market: 'Mais de 2.5',
      winner: 'Barcelona',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
    },
    {
      id: 3,
      league: 'Champions League',
      leagueCountry: 'World',
      leagueLogo: '',
      homeTeam: 'Bayern Munich',
      homeLogo: '',
      awayTeam: 'PSG',
      awayLogo: '',
      date: 'Hoje',
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 68,
      odds: 1.65,
      market: 'Ambas Marcam',
      winner: 'Bayern Munich',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
    },
    {
      id: 4,
      league: 'Brasileirão',
      leagueCountry: 'Brazil',
      leagueLogo: '',
      homeTeam: 'Flamengo',
      homeLogo: '',
      awayTeam: 'Palmeiras',
      awayLogo: '',
      date: 'Hoje',
      time: '01:00',
      prediction: 'Dupla Hipótese Casa',
      confidence: 70,
      odds: 1.45,
      market: 'Dupla Hipótese',
      winner: 'Flamengo',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
    },
  ];
}
