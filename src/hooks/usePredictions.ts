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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 19/07/2026
function getFallbackTips(): Prediction[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit'
  }).format(new Date());

  return [
    {
      id: 5076,
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Espanha Vence (incluindo prolongamento)',
      confidence: 62,
      odds: 1.90,
      market: 'Resultado Final',
      winner: 'Espanha',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
      betNumber: '5076',
      betType: 'SINGLE',
      analysis: '🏆 Espanha Vence @1.90 — A Espanha chega à final invicta há 37 jogos, com apenas 1 golo sofrido em 7 partidas no torneio e com uma média de posse de 64%. A Argentina é perigosa nos minutos finais (11 golos após o min.75), mas o controlo de jogo espanhol deve neutralizar este padrão. Lamine Yamal vs Messi é o duelo de gerações que pode definir o campeão.',
    },
    {
      id: 5077,
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 68,
      odds: 1.75,
      market: 'Total Golos',
      winner: '',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
      betNumber: '5077',
      betType: 'SINGLE',
      analysis: '🛡️ Menos de 2.5 Golos @1.75 — A Espanha sofreu apenas 1 golo em 7 jogos neste Mundial. Em finais de Copa do Mundo, a tendência histórica é para jogos fechados e táticos. Apenas 3 das últimas 8 finais tiveram 3 ou mais golos. A solidez defensiva espanhola é o factor decisivo.',
    },
    {
      id: 5078,
      league: 'FIFA Mundial 2026 — Final',
      homeTeam: 'Espanha',
      awayTeam: 'Argentina',
      date: dateStr,
      time: '20:00',
      prediction: 'Lamine Yamal Marca a Qualquer Momento',
      confidence: 55,
      odds: 2.50,
      market: 'Marcador',
      winner: 'Espanha',
      homePercent: 59,
      drawPercent: 20,
      awayPercent: 21,
      betNumber: '5078',
      betType: 'SINGLE',
      analysis: '⭐ Lamine Yamal Marca @2.50 — O prodígio espanhol de 18 anos foi um dos melhores jogadores do torneio. Numa final onde a Espanha vai dominar a posse, Yamal terá espaço para criar e finalizar. A odd de 2.50 representa excelente valor para o jogador mais em forma da competição.',
    },
    {
      id: 5079,
      league: 'Brasileirão Série D — Oitavos',
      homeTeam: 'São Luiz',
      awayTeam: 'CSA',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos',
      confidence: 72,
      odds: 1.65,
      market: 'Total Golos',
      winner: '',
      homePercent: 40,
      drawPercent: 35,
      awayPercent: 25,
      betNumber: '5079',
      betType: 'SINGLE',
      analysis: '🇧🇷 Menos de 2.5 Golos @1.65 — Jogo de ida dos oitavos de final da Série D. Em jogos de mata-mata de primeira mão, as equipas tendem a ser mais cautelosas. O São Luiz e o CSA são equipas com defesas sólidas. Esperamos um jogo tático e fechado com poucos golos.',
    },
    {
      id: 5080,
      league: 'Brasileirão Série D — Oitavos',
      homeTeam: 'América-RN',
      awayTeam: 'Gama',
      date: dateStr,
      time: '19:00',
      prediction: 'América-RN Vence ou Empata (Dupla Hipótese)',
      confidence: 70,
      odds: 1.55,
      market: 'Dupla Hipótese',
      winner: 'América-RN',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
      betNumber: '5080',
      betType: 'SINGLE',
      analysis: '🇧🇷 América-RN 1X @1.55 — O América-RN joga em casa e tem a vantagem do fator campo. O Gama viaja do Distrito Federal para o Nordeste, o que representa um desgaste adicional. A dupla hipótese é uma aposta segura com boa odd para um jogo de mata-mata.',
    },
    {
      id: 5081,
      league: 'Mundial + Série D',
      homeTeam: 'Final do Mundo',
      awayTeam: 'Série D Brasil',
      date: dateStr,
      time: '11:00',
      prediction: 'Menos de 2.5 Golos (ESP-ARG) + Menos de 2.5 Golos (São Luiz-CSA)',
      confidence: 72,
      odds: 2.89,
      market: 'Combinada',
      winner: '',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
      betNumber: '5081',
      betType: 'DOUBLE',
      analysis: '🔥 ACUMULADOR DO DIA @2.89 — Combinamos dois mercados de "menos de 2.5 golos" com excelente valor. A final do Mundial tende a ser um jogo fechado (apenas 3 das últimas 8 finais tiveram 3+ golos) com a solidez defensiva espanhola. O jogo da Série D entre São Luiz e CSA é um mata-mata de primeira mão onde ambas jogarão de forma cautelosa.',
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
