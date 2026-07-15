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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 15/07/2026
function getFallbackTips(): Prediction[] {
  return [
    {
      id: 5052,
      league: 'FIFA Mundial 2026',
      homeTeam: 'Inglaterra',
      awayTeam: 'Argentina',
      date: '15/07',
      time: '20:00',
      prediction: 'Ambas Marcam',
      confidence: 80,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
      betNumber: '5052',
      betType: 'SINGLE',
      analysis: 'A segunda meia-final promete golos. A Inglaterra tem marcado consistentemente com Bellingham e Kane em grande forma. A Argentina de Scaloni tem talento ofensivo de sobra mas a defesa tem vacilado. Jogo aberto e com oportunidades para ambos os lados.',
    },
    {
      id: 5053,
      league: 'Brasileirão Série B',
      homeTeam: 'Náutico',
      awayTeam: 'Juventude',
      date: '15/07',
      time: '20:30',
      prediction: 'Juventude Vence (Empate Anula)',
      confidence: 75,
      odds: 1.85,
      market: 'Empate Anula',
      winner: 'Juventude',
      homePercent: 30,
      drawPercent: 30,
      awayPercent: 40,
      betNumber: '5053',
      betType: 'SINGLE',
      analysis: 'O Juventude tem feito uma campanha sólida na Série B e defronta um Náutico muito irregular. A proteção do Empate Anula Aposta (Draw No Bet) oferece valor numa partida onde os visitantes são ligeiramente favoritos.',
    },
    {
      id: 5054,
      league: 'Brasileirão Série C',
      homeTeam: 'Ypiranga-RS',
      awayTeam: 'Paysandu',
      date: '15/07',
      time: '11:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 85,
      odds: 1.60,
      market: 'Menos de 2.5',
      winner: '',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
      betNumber: '5054',
      betType: 'SINGLE',
      analysis: 'Confronto matinal na Série C. O Ypiranga é forte em casa mas costuma protagonizar jogos de poucos golos. O Paysandu vai tentar controlar o ritmo e jogar no erro. Tendência clara para um jogo fechado.',
    },
    {
      id: 5055,
      league: 'Qualificação Champions',
      homeTeam: 'Sabah FC',
      awayTeam: 'The New Saints',
      date: '15/07',
      time: '19:00',
      prediction: 'Sabah FC Vence',
      confidence: 80,
      odds: 1.75,
      market: 'Resultado Final',
      winner: 'Sabah FC',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
      betNumber: '5055',
      betType: 'SINGLE',
      analysis: 'Na qualificação para a Champions League, a equipa do Azerbaijão é amplamente superior ao campeão galês. A jogar em casa, o Sabah deve conseguir uma vitória confortável por mais de um golo de diferença.',
    },
    {
      id: 5056,
      league: 'Brasileirão Série D',
      homeTeam: 'América-RN',
      awayTeam: 'Trem-AP',
      date: '15/07',
      time: '19:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 70,
      odds: 1.90,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 65,
      drawPercent: 20,
      awayPercent: 15,
      betNumber: '5056',
      betType: 'SINGLE',
      analysis: 'Com base nos últimos jogos do América-RN em casa, a equipa tem mostrado grande capacidade ofensiva mas também sofre golos. O Trem-AP precisa de arriscar, o que deve resultar num jogo com pelo menos 3 golos.',
    },
    {
      id: 5057,
      league: 'Mundial + Champions',
      homeTeam: 'Inglaterra/Argentina + Sabah',
      awayTeam: 'Múltipla',
      date: '15/07',
      time: '19:00',
      prediction: 'Ambas Marcam (ING-ARG) + Sabah Vence',
      confidence: 85,
      odds: 2.55,
      market: 'Combinada',
      winner: '',
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
      betNumber: '5057',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR DO DIA: Combinamos a expectativa de golos na meia-final do Mundial entre Inglaterra e Argentina com o favoritismo claro do Sabah FC na qualificação da Champions League. Uma aposta dupla de excelente valor.',
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
