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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 21/07/2026
function getFallbackTips(): Prediction[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit'
  }).format(new Date());

  return [
    {
      id: 5088,
      league: 'Liga dos Campeões — Qualificação 2ª Ronda',
      homeTeam: 'Fenerbahce',
      awayTeam: 'Gornik Zabrze',
      date: dateStr,
      time: '20:00',
      prediction: 'Fenerbahce Vence e Mais de 1.5 Golos',
      confidence: 78,
      odds: 1.62,
      market: 'Resultado e Total de Golos',
      winner: 'Fenerbahce',
      homePercent: 68,
      drawPercent: 18,
      awayPercent: 14,
      betNumber: '5088',
      betType: 'SINGLE',
      analysis: '🇹🇷 Fenerbahce & Over 1.5 @1.62 — O Fenerbahce joga em casa no Şükrü Saracoğlu, onde é historicamente dominante nas competições europeias. O Gornik Zabrze, da Ekstraklasa polaca, é claramente inferior em qualidade de plantel. Com a motivação de chegar à fase de grupos e o apoio do seu inflamado público, o Fener deve vencer confortavelmente num jogo com golos.',
    },
    {
      id: 5089,
      league: 'Liga dos Campeões — Qualificação 2ª Ronda',
      homeTeam: 'Sturm Graz',
      awayTeam: 'Hearts',
      date: dateStr,
      time: '20:30',
      prediction: 'Sturm Graz Vence',
      confidence: 70,
      odds: 1.78,
      market: 'Resultado Final',
      winner: 'Sturm Graz',
      homePercent: 57,
      drawPercent: 24,
      awayPercent: 19,
      betNumber: '5089',
      betType: 'SINGLE',
      analysis: '🇦🇹 Sturm Graz Vence @1.78 — O Sturm Graz tem sido uma das equipas austríacas mais sólidas nas qualificações europeias nos últimos anos. A jogar em casa contra um Hearts que tem dificuldades históricas fora da Escócia, os austríacos têm vantagem clara. O Hearts perdeu os seus melhores jogadores no verão e chega a Graz sem grande forma.',
    },
    {
      id: 5090,
      league: 'Brasileirão Série A',
      homeTeam: 'Mineiro',
      awayTeam: 'Bahia',
      date: dateStr,
      time: '23:30',
      prediction: 'Atlético-MG Vence ou Empata (Dupla Hipótese)',
      confidence: 68,
      odds: 1.65,
      market: 'Dupla Hipótese',
      winner: 'Mineiro',
      homePercent: 48,
      drawPercent: 28,
      awayPercent: 24,
      betNumber: '5090',
      betType: 'SINGLE',
      analysis: '🇧🇷 Atlético-MG 1X @1.65 — O Atlético Mineiro joga em casa na Arena MRV, onde tem sido muito forte nesta temporada. O Bahia é uma equipa competente, mas viaja para Belo Horizonte com desvantagem de fator campo. A dupla hipótese oferece segurança com boa odd para um jogo de alto nível do Brasileirão.',
    },
    {
      id: 5091,
      league: 'Copa Sul-Americana — Playoffs',
      homeTeam: 'Univ. Central',
      awayTeam: 'Santos',
      date: dateStr,
      time: '22:30',
      prediction: 'Menos de 2.5 Golos',
      confidence: 72,
      odds: 1.58,
      market: 'Total Golos',
      winner: '',
      homePercent: 38,
      drawPercent: 32,
      awayPercent: 30,
      betNumber: '5091',
      betType: 'SINGLE',
      analysis: '🛡️ Menos de 2.5 Golos @1.58 — Jogo de ida dos playoffs da Sul-Americana na Venezuela. Em jogos de mata-mata de primeira mão, as equipas tendem a ser mais cautelosas, especialmente fora de casa. O Santos vai privilegiar não sofrer golos para a segunda mão no Brasil. Esperamos um jogo tático e fechado.',
    },
    {
      id: 5092,
      league: 'Liga dos Campeões — Qualificação 2ª Ronda',
      homeTeam: 'Larne',
      awayTeam: 'Red Star Belgrade',
      date: dateStr,
      time: '21:00',
      prediction: 'Red Star Belgrade Vence',
      confidence: 80,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Red Star Belgrade',
      homePercent: 18,
      drawPercent: 22,
      awayPercent: 60,
      betNumber: '5092',
      betType: 'SINGLE',
      analysis: '🇷🇸 Red Star Belgrade Vence @1.45 — O Estrela Vermelha de Belgrado é um dos gigantes históricos do futebol europeu e tem uma qualidade muito superior ao Larne da Irlanda do Norte. Apesar de jogar fora, o Red Star tem plantel, experiência europeia e motivação para avançar. Uma das apostas mais seguras do dia.',
    },
    {
      id: 5093,
      league: 'Champions League Qualificação',
      homeTeam: 'Fenerbahce & Red Star',
      awayTeam: 'Opositores',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Fenerbahce + Vitória Red Star Belgrade',
      confidence: 72,
      odds: 2.35,
      market: 'Combinada',
      winner: '',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
      betNumber: '5093',
      betType: 'DOUBLE',
      analysis: '🔥 ACUMULADOR DO DIA @2.35 — Combinamos os dois favoritos mais sólidos das qualificações da Liga dos Campeões desta noite. O Fenerbahce em casa contra o Gornik Zabrze tem qualidade muito superior. O Red Star Belgrade, apesar de jogar fora, é claramente superior ao Larne da Irlanda do Norte. Uma dupla com excelente valor para a noite europeia.',
    },
  ];
}

async function fetchTipsFromAPI(): Promise<Prediction[]> {
  try {
    // Fetch from our own Vercel Edge Function (no CORS issues)
    const response = await fetch('/api/tips');
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.tips || !Array.isArray(data.tips)) {
      throw new Error('Invalid API response format');
    }

    return data.tips.map((tip: any) => ({
      id: tip.id,
      league: tip.league,
      homeTeam: tip.homeTeam,
      awayTeam: tip.awayTeam,
      date: tip.date,
      time: tip.time,
      prediction: tip.prediction,
      confidence: tip.confidence,
      odds: tip.odds,
      market: tip.market,
      winner: tip.winner || '',
      analysis: tip.analysis,
      homePercent: tip.homePercent || 0,
      drawPercent: tip.drawPercent || 0,
      awayPercent: tip.awayPercent || 0,
      betNumber: tip.betNumber,
      betType: tip.betType,
    }));
  } catch (error) {
    console.error('Error fetching tips from API:', error);
    return [];
  }
}

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const apiTips = await fetchTipsFromAPI();
      
      if (apiTips.length > 0) {
        setPredictions(apiTips);
      } else {
        setPredictions(getFallbackTips());
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setPredictions(getFallbackTips());
      setError('Erro ao carregar tips. A mostrar dados offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    // Atualizar a cada 30 minutos
    const interval = setInterval(fetchPredictions, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { predictions, loading, error, refresh: fetchPredictions };
}
