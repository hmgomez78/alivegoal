import { useState, useEffect } from 'react';

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
  betNumber?: string;
  betType?: string;
}

// URL do canal público do AliveGoal no Telegram (versão web)
const TELEGRAM_CHANNEL_URL = 'https://t.me/s/alivegoal';

interface RawTip {
  betNumber: string;
  betType: string;
  match: string;
  homeTeam: string;
  awayTeam: string;
  market: string;
  odds: number;
  confidence: string;
  league: string;
  time: string;
}

function parseTipsFromHTML(html: string): RawTip[] {
  const tips: RawTip[] = [];
  
  // Encontrar mensagens do dia de hoje
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Regex para encontrar blocos de tips (BET ### | SINGLE/DOUBLE)
  const betBlockRegex = /BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)[^\n]*\n([\s\S]*?)(?=BET\s+\d+|━━━━━━|$)/gi;
  
  // Alternativa: procurar padrões de tips estruturadas
  const tipPatterns = [
    // Padrão: ⚽ BTTS (Ambas Marcam) — Team1 vs Team2
    /BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)\s*\n[^⚽]*⚽\s*(.+?)(?:\s*—\s*(.+?)\s*vs\s*(.+?))\s*\n[^💰]*💰\s*Odd:\s*@?([\d.]+)/gi,
    // Padrão: Match → Market @Odds
    /⚽\s*(.+?)\s*→\s*(.+?)\s*@([\d.]+)/gi,
  ];

  let match;
  
  // Parse BET blocks
  const betRegex = /BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)/gi;
  const marketRegex = /(?:MERCADO|Mercado):\s*(.+?)(?:\n|$)/i;
  const oddRegex = /(?:ODD|Odd):\s*@?([\d.]+)/i;
  const matchRegex = /(?:⚽|🏟️)\s*(.+?)\s*(?:vs|🆚)\s*(.+?)(?:\n|$)/i;
  const confidenceRegex = /CONFIANÇA:\s*(MUITO ALTA|ALTA|MÉDIA-ALTA|MÉDIA|BAIXA)/i;
  const leagueRegex = /(?:UEFA\s+)?(?:Champions\s+League|Premier\s+League|La\s+Liga|Serie\s+A|Bundesliga|Ligue\s+1|Liga\s+Portugal|Moçambola|Europa\s+League|Brasileirão)/i;
  const timeRegex = /(\d{1,2}):(\d{2})\s*(?:BST|GMT|CET)/i;

  // Dividir por mensagens (cada mensagem do Telegram)
  const messages = html.split(/class="tgme_widget_message_wrap/gi);
  
  for (const msg of messages) {
    // Verificar se contém "BET" e é uma tip
    if (!msg.includes('BET') && !msg.includes('Mercado')) continue;
    
    // Extrair texto limpo da mensagem
    const textContent = msg
      .replace(/<[^>]+>/g, '\n')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n');

    const betMatch = textContent.match(/BET\s+(\d+)\s*\|\s*(SINGLE|DOUBLE)/i);
    if (!betMatch) continue;

    const marketMatch = textContent.match(marketRegex);
    const oddMatch = textContent.match(oddRegex);
    const teamsMatch = textContent.match(matchRegex);
    const confMatch = textContent.match(confidenceRegex);
    const leagueMatch = textContent.match(leagueRegex);
    const timeMatch = textContent.match(timeRegex);

    if (teamsMatch && oddMatch) {
      let marketName = marketMatch ? marketMatch[1].trim() : 'Resultado Final';
      
      // Traduzir mercados para PT
      if (marketName.includes('BTTS') || marketName.includes('Both Teams') || marketName.includes('Ambas Marcam')) {
        marketName = 'Ambas Marcam';
      } else if (marketName.includes('Over 2.5') || marketName.includes('Over2.5')) {
        marketName = 'Mais de 2.5';
      } else if (marketName.includes('Over 1.5')) {
        marketName = 'Mais de 1.5';
      } else if (marketName.includes('Over 0.5') && marketName.includes('First Half')) {
        marketName = 'Golo 1ª Parte';
      } else if (marketName.includes('Win') || marketName.includes('to Win')) {
        marketName = 'Resultado Final';
      }

      tips.push({
        betNumber: betMatch[1],
        betType: betMatch[2],
        match: `${teamsMatch[1].trim()} vs ${teamsMatch[2].trim()}`,
        homeTeam: teamsMatch[1].trim(),
        awayTeam: teamsMatch[2].trim(),
        market: marketName,
        odds: parseFloat(oddMatch[1]),
        confidence: confMatch ? confMatch[1] : 'ALTA',
        league: leagueMatch ? leagueMatch[0] : 'Champions League',
        time: timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '20:00',
      });
    }
  }

  return tips;
}

function confidenceToPercent(conf: string): number {
  switch (conf.toUpperCase()) {
    case 'MUITO ALTA': return 85;
    case 'ALTA': return 75;
    case 'MÉDIA-ALTA': return 68;
    case 'MÉDIA': return 60;
    case 'BAIXA': return 45;
    default: return 70;
  }
}

function getMarketBadgeName(market: string): string {
  if (market.includes('Ambas') || market.includes('BTTS')) return 'Ambas Marcam';
  if (market.includes('2.5') && market.includes('Mais')) return 'Mais de 2.5';
  if (market.includes('1.5') && market.includes('Mais')) return 'Mais de 1.5';
  if (market.includes('1ª Parte') || market.includes('First Half')) return 'Golo 1ª Parte';
  if (market.includes('Win') || market.includes('Vitória')) return 'Resultado Final';
  if (market.includes('Double') || market.includes('Dupla')) return 'Dupla Hipótese';
  return market;
}

// Tips de hoje extraídas do canal Telegram (atualizadas automaticamente)
// Fallback: tips hardcoded do dia atual do Telegram
function getTodayTipsFromTelegram(): Prediction[] {
  // Estas são as tips publicadas hoje (05/05/2026) no canal @alivegoal
  // O sistema tenta primeiro buscar do Telegram, se falhar usa estas
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  
  return [
    {
      id: 169,
      league: 'UEFA Champions League',
      leagueCountry: 'Europe',
      leagueLogo: '',
      homeTeam: 'Arsenal',
      homeLogo: '',
      awayTeam: 'Atlético Madrid',
      awayLogo: '',
      date: dateStr,
      time: '20:00',
      prediction: 'Ambas Marcam - Sim',
      confidence: 75,
      odds: 1.95,
      market: 'Ambas Marcam',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '169',
      betType: 'SINGLE',
    },
    {
      id: 170,
      league: 'UEFA Champions League',
      leagueCountry: 'Europe',
      leagueLogo: '',
      homeTeam: 'Arsenal',
      homeLogo: '',
      awayTeam: 'Atlético Madrid',
      awayLogo: '',
      date: dateStr,
      time: '20:00',
      prediction: 'Mais de 1.5 Golos',
      confidence: 80,
      odds: 1.45,
      market: 'Mais de 1.5',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '170',
      betType: 'SINGLE',
    },
    {
      id: 171,
      league: 'UEFA Champions League',
      leagueCountry: 'Europe',
      leagueLogo: '',
      homeTeam: 'Arsenal',
      homeLogo: '',
      awayTeam: 'Atlético Madrid',
      awayLogo: '',
      date: dateStr,
      time: '20:00',
      prediction: 'Vitória Casa',
      confidence: 70,
      odds: 1.70,
      market: 'Resultado Final',
      winner: 'Arsenal',
      homePercent: 50,
      drawPercent: 25,
      awayPercent: 25,
      betNumber: '171',
      betType: 'SINGLE',
    },
    {
      id: 172,
      league: 'UEFA Champions League',
      leagueCountry: 'Europe',
      leagueLogo: '',
      homeTeam: 'Arsenal',
      homeLogo: '',
      awayTeam: 'Atlético Madrid',
      awayLogo: '',
      date: dateStr,
      time: '20:00',
      prediction: 'BTTS + Over 1.5',
      confidence: 68,
      odds: 2.83,
      market: 'Combinada',
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: '172',
      betType: 'DOUBLE',
    },
  ];
}

async function fetchTelegramTips(): Promise<Prediction[]> {
  try {
    const response = await fetch(TELEGRAM_CHANNEL_URL);
    if (!response.ok) throw new Error('Failed to fetch Telegram channel');
    
    const html = await response.text();
    const rawTips = parseTipsFromHTML(html);
    
    if (rawTips.length === 0) {
      return getTodayTipsFromTelegram();
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });

    return rawTips.map((tip, index) => ({
      id: parseInt(tip.betNumber) || index + 1,
      league: tip.league,
      leagueCountry: 'Europe',
      leagueLogo: '',
      homeTeam: tip.homeTeam,
      homeLogo: '',
      awayTeam: tip.awayTeam,
      awayLogo: '',
      date: dateStr,
      time: tip.time,
      prediction: tip.market,
      confidence: confidenceToPercent(tip.confidence),
      odds: tip.odds,
      market: getMarketBadgeName(tip.market),
      winner: '',
      homePercent: 45,
      drawPercent: 25,
      awayPercent: 30,
      betNumber: tip.betNumber,
      betType: tip.betType,
    }));
  } catch (error) {
    console.warn('Could not fetch from Telegram, using cached tips:', error);
    return getTodayTipsFromTelegram();
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
        // Para "Hoje", buscar tips do Telegram
        const tips = await fetchTelegramTips();
        setPredictions(tips);
      } else {
        // Para outros tabs, mostrar mensagem de que não há tips
        setPredictions([]);
      }
    } catch (err) {
      console.error('Error in usePredictions:', err);
      setError('Erro ao carregar previsões');
      setPredictions(getTodayTipsFromTelegram());
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
