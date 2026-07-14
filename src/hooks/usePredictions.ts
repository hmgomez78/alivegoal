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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 14/07/2026
function getFallbackTips(): Prediction[] {
  return [
    {
      id: 5046,
      league: 'FIFA Mundial 2026',
      homeTeam: 'França',
      awayTeam: 'Espanha',
      date: '14/07',
      time: '20:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 85,
      odds: 1.65,
      market: 'Menos de 2.5',
      winner: '',
      homePercent: 35,
      drawPercent: 35,
      awayPercent: 30,
      betNumber: '5046',
      betType: 'SINGLE',
      analysis: 'A meia-final do Mundial coloca frente a frente duas potências. A França de Deschamps tem-se mostrado incrivelmente sólida a defender e pragmática a atacar. A Espanha gosta de ter a bola mas terá dificuldades em penetrar o bloco gaulês. Jogo de muita tática e poucos golos.',
    },
    {
      id: 5047,
      league: 'FIFA Mundial 2026',
      homeTeam: 'Inglaterra',
      awayTeam: 'Argentina',
      date: '15/07',
      time: '20:00',
      prediction: 'Ambas Marcam',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
      betNumber: '5047',
      betType: 'SINGLE',
      analysis: 'Antecipação da segunda meia-final. A Inglaterra de Thomas Tuchel tem marcado consistentemente desde a fase de grupos. A Argentina tem o talento ofensivo de Messi e Alvarez. Ambas as defesas têm mostrado algumas fragilidades sob pressão.',
    },
    {
      id: 5048,
      league: 'Allsvenskan',
      homeTeam: 'Djurgardens IF',
      awayTeam: 'Halmstads BK',
      date: '14/07',
      time: '18:00',
      prediction: 'Djurgardens IF Vence',
      confidence: 80,
      odds: 1.85,
      market: 'Resultado Final',
      winner: 'Djurgardens IF',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
      betNumber: '5048',
      betType: 'SINGLE',
      analysis: 'O Djurgardens está em excelente forma no campeonato sueco e defronta um Halmstads que tem tido muitas dificuldades defensivas. Jogando em casa, o Djurgardens tem todas as condições para vencer por uma margem confortável.',
    },
    {
      id: 5049,
      league: 'Brasileirão Série D',
      homeTeam: 'América-RN',
      awayTeam: 'Trem-AP',
      date: '14/07',
      time: '19:00',
      prediction: 'América-RN Vence',
      confidence: 90,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'América-RN',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
      betNumber: '5049',
      betType: 'SINGLE',
      analysis: 'Jogo decisivo na Série D onde o América-RN tem uma vantagem clara jogando em casa. O Trem-AP é uma equipa inferior tecnicamente e o fator casa na Arena das Dunas será fundamental para a vitória.',
    },
    {
      id: 5050,
      league: 'Brasileirão Série D',
      homeTeam: 'CSA',
      awayTeam: 'Betim',
      date: '14/07',
      time: '20:00',
      prediction: 'Mais de 2.5 Golos',
      confidence: 70,
      odds: 1.80,
      market: 'Mais de 2.5',
      winner: '',
      homePercent: 60,
      drawPercent: 25,
      awayPercent: 15,
      betNumber: '5050',
      betType: 'SINGLE',
      analysis: 'O CSA precisa de resolver a eliminatória em casa e tem um ataque forte para o nível da Série D. O Betim tentará jogar no erro, o que pode abrir espaços. Esperamos um jogo aberto com oportunidades de golo.',
    },
    {
      id: 5051,
      league: 'Mundial + Allsvenskan',
      homeTeam: 'França/Espanha + Djurgardens',
      awayTeam: 'Múltipla',
      date: '14/07',
      time: '18:00',
      prediction: 'Menos 2.5 (FRA-ESP) + Djurgardens Vence',
      confidence: 85,
      odds: 2.30,
      market: 'Combinada',
      winner: '',
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
      betNumber: '5051',
      betType: 'DOUBLE',
      analysis: 'ACUMULADOR DO DIA: Combinamos a tendência de poucos golos no duelo tático entre França e Espanha com o favoritismo claro do Djurgardens em casa no campeonato sueco. Uma aposta dupla de alto valor para esta terça-feira.',
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
