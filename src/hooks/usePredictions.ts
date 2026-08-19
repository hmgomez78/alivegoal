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

const RESPONSIBLE_NOTE =
  'Conteúdo editorial para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência recolhidas em 19/08/2026 são dinâmicas e não garantem resultados.';

// Fallback local alinhado com /api/tips para 19/08/2026.
function getFallbackTips(): Prediction[] {
  const dateStr = '19/08/2026';

  return [
    {
      id: 9301,
      betNumber: '9301',
      betType: 'SINGLE',
      league: 'La Liga',
      homeTeam: 'Atlético de Madrid',
      awayTeam: 'Málaga',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Atlético de Madrid',
      confidence: 73,
      odds: 1.35,
      market: 'Resultado Final (90 min)',
      winner: 'Atlético de Madrid',
      analysis: `A referência SportyTrader/1xBet de 1,35 para o Atlético, 5,38 para o empate e 11,10 para o Málaga traduz, após ajuste simples à margem, aproximadamente 73% para o anfitrião. Fontes: Sky Sports e SportyTrader. ${RESPONSIBLE_NOTE}`,
      homePercent: 73,
      drawPercent: 18,
      awayPercent: 9,
    },
    {
      id: 9302,
      betNumber: '9302',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Celtic',
      awayTeam: 'LASK',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas as equipas marcam — Sim',
      confidence: 52,
      odds: 1.78,
      market: 'Ambas as equipas marcam',
      winner: 'BTTS — Sim',
      analysis: `BTTS Sim estava a -128, equivalente a 1,78 decimal, na referência BetMGM publicada pelo SportsGambler. O preço ajustado ao lado oposto indica uma probabilidade de mercado próxima de 52%, não uma certeza. ${RESPONSIBLE_NOTE}`,
      homePercent: 59,
      drawPercent: 24,
      awayPercent: 17,
    },
    {
      id: 9303,
      betNumber: '9303',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'NEC Nijmegen',
      awayTeam: 'Bodø/Glimt',
      date: dateStr,
      time: '20:00',
      prediction: 'Menos de 3,5 golos',
      confidence: 53,
      odds: 1.78,
      market: 'Total de golos — Menos de 3,5',
      winner: 'Menos de 3,5 golos',
      analysis: `A FOX Sports listava Menos de 3,5 a -129, aproximadamente 1,78 decimal. Face ao lado oposto do total, a probabilidade de mercado normalizada fica perto de 53%. ${RESPONSIBLE_NOTE}`,
      homePercent: 38,
      drawPercent: 24,
      awayPercent: 38,
    },
    {
      id: 9304,
      betNumber: '9304',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Hapoel Beer-Sheva',
      awayTeam: 'Sabah FK',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 2,5 golos',
      confidence: 50,
      odds: 1.95,
      market: 'Total de golos — Mais de 2,5',
      winner: 'Mais de 2,5 golos',
      analysis: `A comparação SportyTrader/1xBet mostrava Mais de 2,5 a 1,95 e Menos de 2,5 a 1,96. É, por isso, uma seleção de mercado muito equilibrado, com cerca de 50% de probabilidade ajustada. ${RESPONSIBLE_NOTE}`,
      homePercent: 43,
      drawPercent: 30,
      awayPercent: 27,
    },
    {
      id: 9305,
      betNumber: '9305',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Play-off (1.ª mão)',
      homeTeam: 'Slovan Bratislava',
      awayTeam: 'Celje',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Slovan Bratislava',
      confidence: 57,
      odds: 1.67,
      market: 'Resultado Final (90 min)',
      winner: 'Slovan Bratislava',
      analysis: `O Slovan estava a -150 na ESPN/DraftKings, equivalente a 1,67 decimal. Com empate a +300 e Celje a +370, a leitura normalizada ronda 57% para a equipa da casa. ${RESPONSIBLE_NOTE}`,
      homePercent: 57,
      drawPercent: 23,
      awayPercent: 20,
    },
    {
      id: 9306,
      betNumber: '9306',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Atlético de Madrid + Shanghai Port',
      awayTeam: 'Málaga + Dalian Yingbo',
      date: dateStr,
      time: '12:35 / 20:00',
      prediction: 'Atlético de Madrid vence + Ambas marcam em Shanghai Port–Dalian Yingbo',
      confidence: 42,
      odds: 2.19,
      market: 'Acumulador — 2 seleções',
      winner: 'Atlético de Madrid + BTTS Sim',
      analysis: `A dupla combina 1,35 para Atlético vencer e 1,62 para BTTS Sim em Shanghai Port–Dalian Yingbo, criando 2,19 em decimal. A probabilidade indicativa de referência ronda 42%; uma única falha invalida o acumulador. ${RESPONSIBLE_NOTE}`,
      homePercent: 42,
      drawPercent: 0,
      awayPercent: 58,
    },
  ];
}

async function fetchTipsFromAPI(): Promise<Prediction[]> {
  try {
    const response = await fetch('/api/tips');
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid API response format');
    }

    return data.items.map((tip: any) => ({
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
    const interval = setInterval(fetchPredictions, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { predictions, loading, error, refresh: fetchPredictions };
}
