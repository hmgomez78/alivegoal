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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 18/07/2026
function getFallbackTips(): Prediction[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit'
  }).format(new Date());

  return [
    {
      id: 5070,
      league: 'FIFA Mundial 2026',
      homeTeam: 'França',
      awayTeam: 'Inglaterra',
      date: dateStr,
      time: '22:00',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 82,
      odds: 1.75,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 35,
      drawPercent: 30,
      awayPercent: 35,
      betNumber: '5070',
      betType: 'SINGLE',
      analysis: '🔥 Ambas Marcam @1.75 — Num jogo de atribuição do 3º lugar, as equipas costumam jogar de forma mais aberta e descontraída. Com o talento ofensivo de Mbappé e Bellingham em campo, esperamos golos de ambos os lados num jogo com pouca pressão defensiva.',
    },
    {
      id: 5071,
      league: 'Amigáveis de Clubes',
      homeTeam: 'Man Utd',
      awayTeam: 'Wrexham',
      date: dateStr,
      time: '16:00',
      prediction: 'Man Utd Vence e Mais de 2.5 Golos',
      confidence: 85,
      odds: 1.65,
      market: 'Resultado Final + Total Golos',
      winner: 'Man Utd',
      homePercent: 75,
      drawPercent: 15,
      awayPercent: 10,
      betNumber: '5071',
      betType: 'SINGLE',
      analysis: '⚽ Man Utd + Mais 2.5 Golos @1.65 — No primeiro jogo da pré-época, o Manchester United defronta o Wrexham. A diferença abismal de qualidade entre os plantéis, mesmo com os Red Devils a rodarem a equipa, deve resultar numa vitória confortável com vários golos.',
    },
    {
      id: 5072,
      league: 'Amigáveis de Clubes',
      homeTeam: 'Ajax',
      awayTeam: 'Olympiakos',
      date: dateStr,
      time: '14:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 78,
      odds: 1.80,
      market: 'Total Golos',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '5072',
      betType: 'SINGLE',
      analysis: '🇳🇱 Mais de 2.5 Golos @1.80 — O Ajax continua a sua preparação com o seu habitual estilo ofensivo que deixa muitos espaços na defesa. O Olympiakos tem qualidade para explorar essas debilidades. Prevemos um jogo muito aberto e com pelo menos 3 golos.',
    },
    {
      id: 5073,
      league: 'Brasileirão Série D',
      homeTeam: 'Nacional',
      awayTeam: 'Iguatu',
      date: dateStr,
      time: '16:00',
      prediction: 'Nacional Vence',
      confidence: 80,
      odds: 1.95,
      market: 'Resultado Final',
      winner: 'Nacional',
      homePercent: 55,
      drawPercent: 30,
      awayPercent: 15,
      betNumber: '5073',
      betType: 'SINGLE',
      analysis: '🇧🇷 Nacional Vence @1.95 — No arranque dos oitavos de final da Série D, o fator casa é crucial. O Nacional tem sido muito forte no seu estádio e defronta um Iguatu que baixa bastante de rendimento fora de portas. Excelente odd para a vitória caseira.',
    },
    {
      id: 5074,
      league: 'Brasileirão Série D',
      homeTeam: 'São José',
      awayTeam: 'Treze',
      date: dateStr,
      time: '16:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 75,
      odds: 1.60,
      market: 'Total Golos',
      winner: '',
      homePercent: 35,
      drawPercent: 40,
      awayPercent: 25,
      betNumber: '5074',
      betType: 'SINGLE',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.60 — Jogo da primeira mão dos oitavos de final da Série D. Esperamos uma partida muito tática e fechada, com ambas as equipas a não quererem cometer erros que comprometam a eliminatória logo no primeiro jogo.',
    },
    {
      id: 5075,
      league: 'Mundial + Amigáveis',
      homeTeam: 'Golos no Mundial',
      awayTeam: 'Vitória do United',
      date: dateStr,
      time: '16:00',
      prediction: 'Ambas Marcam (FRA-ING) + Man Utd Vence',
      confidence: 80,
      odds: 2.27,
      market: 'Combinada',
      winner: '',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
      betNumber: '5075',
      betType: 'DOUBLE',
      analysis: '🔥 ACUMULADOR DO DIA @2.27 — Combinamos a tendência histórica de golos para ambos os lados nos jogos de 3º lugar do Mundial com uma vitória natural do Manchester United no seu amigável contra o Wrexham. Uma aposta dupla de grande valor.',
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
    
    if (data.tips && Array.isArray(data.tips) && data.tips.length > 0) {
      // Map API Tip to Prediction interface
      return data.tips.map((tip: any) => ({
        id: tip.id,
        league: tip.league,
        homeTeam: tip.homeTeam,
        awayTeam: tip.awayTeam,
        date: tip.date,
        time: tip.time,
        prediction: tip.prediction,
        confidence: tip.confidence || 75,
        odds: tip.odds || 1.85,
        market: tip.market || 'Resultado Final',
        winner: tip.winner || '',
        analysis: tip.analysis,
        homePercent: tip.homePercent || 40,
        drawPercent: tip.drawPercent || 30,
        awayPercent: tip.awayPercent || 30,
        betNumber: tip.betNumber,
        betType: tip.betType || 'SINGLE'
      }));
    }
    
    return getFallbackTips();
  } catch (error) {
    console.error('Error fetching tips:', error);
    return getFallbackTips();
  }
}

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const data = await fetchTipsFromAPI();
      setPredictions(data);
    } catch (error) {
      console.error('Error in usePredictions:', error);
      setPredictions(getFallbackTips());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    // Refresh tips every 30 minutes
    const interval = setInterval(fetchPredictions, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { predictions, loading, refresh: fetchPredictions };
}
