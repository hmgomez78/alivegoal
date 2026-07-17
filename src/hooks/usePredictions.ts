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

// Fallback tips caso a API falhe (hardcoded para o dia) — atualizadas 17/07/2026
function getFallbackTips(): Prediction[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit'
  }).format(new Date());

  return [
    {
      id: 5060,
      league: 'Brasileirão Série A',
      homeTeam: 'Bahia',
      awayTeam: 'Chapecoense',
      date: dateStr,
      time: '23:30',
      prediction: 'Bahia Vence',
      confidence: 88,
      odds: 1.55,
      market: 'Resultado Final',
      winner: 'Bahia',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
      betNumber: '5060',
      betType: 'SINGLE',
      analysis: '🔥 Bahia Vence @1.55 — O Bahia joga em casa na Arena Fonte Nova e tem feito uma excelente campanha, estando no 6º lugar. A Chapecoense é o lanterna-vermelha (20º) e tem tido muitas dificuldades fora de casa. Vitória clara para os baianos.',
    },
    {
      id: 5061,
      league: 'Brasileirão Série A',
      homeTeam: 'Fluminense',
      awayTeam: 'Mirassol',
      date: dateStr,
      time: '23:30',
      prediction: 'Fluminense Vence e Mais de 1.5 Golos',
      confidence: 82,
      odds: 1.85,
      market: 'Resultado Final + Total Golos',
      winner: 'Fluminense',
      homePercent: 65,
      drawPercent: 25,
      awayPercent: 10,
      betNumber: '5061',
      betType: 'SINGLE',
      analysis: '⚽ Fluminense + Mais 1.5 Golos @1.85 — O Fluminense (3º classificado) é muito forte no Maracanã e defronta um Mirassol que luta na parte inferior da tabela (19º). O ataque do Flu deve conseguir marcar pelo menos 2 golos nesta partida.',
    },
    {
      id: 5062,
      league: 'Brasileirão Série A',
      homeTeam: 'Botafogo',
      awayTeam: 'Vitória',
      date: dateStr,
      time: '23:30',
      prediction: 'Ambas Equipas Marcam - Sim',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 45,
      drawPercent: 30,
      awayPercent: 25,
      betNumber: '5062',
      betType: 'SINGLE',
      analysis: '🇧🇷 Ambas Marcam @1.95 — O Botafogo tem um bom ataque mas a sua defesa tem sido permeável (31 golos sofridos em 17 jogos). O Vitória também tem capacidade para marcar golos. Jogo aberto e com boas probabilidades de golos para ambos os lados.',
    },
    {
      id: 5063,
      league: 'Irish FAI Cup',
      homeTeam: 'Shamrock Rovers',
      awayTeam: 'Cork City',
      date: dateStr,
      time: '19:45',
      prediction: 'Shamrock Rovers Vence',
      confidence: 85,
      odds: 1.45,
      market: 'Resultado Final',
      winner: 'Shamrock Rovers',
      homePercent: 70,
      drawPercent: 20,
      awayPercent: 10,
      betNumber: '5063',
      betType: 'SINGLE',
      analysis: '🇮🇪 Shamrock Rovers Vence @1.45 — O Shamrock Rovers é uma das equipas mais fortes da Irlanda e joga em casa para a Taça FAI contra o Cork City. A diferença de qualidade e o fator casa devem ser determinantes para o apuramento.',
    },
    {
      id: 5064,
      league: 'Chinese Super League',
      homeTeam: 'Yunnan Yukun',
      awayTeam: 'Shanghai Port',
      date: dateStr,
      time: '13:00',
      prediction: 'Shanghai Port Vence',
      confidence: 80,
      odds: 1.65,
      market: 'Resultado Final',
      winner: 'Shanghai Port',
      homePercent: 20,
      drawPercent: 25,
      awayPercent: 55,
      betNumber: '5064',
      betType: 'SINGLE',
      analysis: '🇨🇳 Shanghai Port Vence @1.65 — O Shanghai Port é uma das equipas mais fortes do campeonato chinês e tem qualidade suficiente para vencer fora de casa contra o recém-promovido Yunnan Yukun. Excelente valor nesta odd.',
    },
    {
      id: 5065,
      league: 'Brasileirão + FAI Cup',
      homeTeam: 'Bahia + Shamrock',
      awayTeam: 'Múltipla',
      date: dateStr,
      time: '19:45',
      prediction: 'Vitória do Bahia + Vitória do Shamrock Rovers',
      confidence: 85,
      odds: 2.24,
      market: 'Combinada',
      winner: '',
      homePercent: 70,
      drawPercent: 0,
      awayPercent: 30,
      betNumber: '5065',
      betType: 'DOUBLE',
      analysis: '🔥 ACUMULADOR DO DIA @2.24 — Combinamos os dois grandes favoritos do dia a jogar em casa. O Bahia contra o último classificado do Brasileirão e o Shamrock Rovers para a Taça da Irlanda. Uma dupla muito segura para hoje.',
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
    
    // Note: api/tips returns { tips: [...] } even when not from Telegram
    if (data.tips && Array.isArray(data.tips) && data.tips.length > 0) {
      return data.tips.map((tip: any) => ({
        id: tip.id,
        league: tip.league || 'Competição',
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
