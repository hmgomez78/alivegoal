import * as cheerio from 'cheerio';

export interface Tip {
  id: number;
  betNumber: string;
  betType: 'SINGLE' | 'DOUBLE' | 'TREBLE' | 'ACCA';
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  prediction: string;
  confidence: number;
  odds: number;
  market: string;
  winner?: string;
  analysis?: string;
  homePercent?: number;
  drawPercent?: number;
  awayPercent?: number;
}

function parseTipsFromHTML(html: string): Tip[] {
  return [];
}

export function getFallbackTips(): Tip[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return [
    // ===== CORITIBA vs PALMEIRAS — BRASILEIRÃO SÉRIE A =====
    {
      id: 5094,
      betNumber: '5094',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'Coritiba',
      awayTeam: 'Palmeiras',
      date: dateStr,
      time: '19:30',
      prediction: 'Palmeiras Vence',
      confidence: 78,
      odds: 1.75,
      market: 'Resultado Final',
      winner: 'Palmeiras',
      analysis: '🟢 Palmeiras Vence @1.75 — O Palmeiras viaja até ao Couto Pereira com necessidade de somar pontos na luta pelo topo da tabela. Apesar de jogar fora, a equipa de Abel Ferreira tem um plantel muito superior ao do Coritiba, que luta na parte inferior da classificação. O Verdão tem um excelente registo como visitante.',
      homePercent: 18,
      drawPercent: 25,
      awayPercent: 57,
    },
    // ===== SÃO PAULO vs ATHLETICO-PR — BRASILEIRÃO SÉRIE A =====
    {
      id: 5095,
      betNumber: '5095',
      betType: 'SINGLE',
      league: 'Brasileirão Série A',
      homeTeam: 'São Paulo',
      awayTeam: 'Athletico-PR',
      date: dateStr,
      time: '21:30',
      prediction: 'Mais de 2.5 Golos',
      confidence: 72,
      odds: 1.90,
      market: 'Total Golos',
      winner: '',
      analysis: '⚽ Mais de 2.5 Golos @1.90 — Confronto no Morumbi entre duas equipas com vocação ofensiva. O São Paulo em casa costuma ser dominante, mas o Athletico Paranaense tem um contra-ataque muito perigoso. O histórico recente entre ambos sugere um jogo aberto e com oportunidades para os dois lados.',
      homePercent: 45,
      drawPercent: 28,
      awayPercent: 27,
    },
    // ===== INDEPENDIENTE MEDELLÍN vs VASCO — SUL-AMERICANA =====
    {
      id: 5096,
      betNumber: '5096',
      betType: 'SINGLE',
      league: 'Copa Sul-Americana — Playoffs',
      homeTeam: 'Ind. Medellín',
      awayTeam: 'Vasco',
      date: dateStr,
      time: '19:00',
      prediction: 'Ambas Equipas Marcam (BTTS) - Sim',
      confidence: 68,
      odds: 1.85,
      market: 'Ambas Marcam',
      winner: '',
      analysis: '🔄 BTTS Sim @1.85 — Jogo de ida dos playoffs na Colômbia. O Independiente Medellín é forte em casa e costuma marcar. O Vasco, apesar das dificuldades recentes, tem qualidade no ataque e precisará de marcar um golo fora para levar uma vantagem para São Januário. Um jogo onde os ataques devem superar as defesas.',
      homePercent: 38,
      drawPercent: 32,
      awayPercent: 30,
    },
    // ===== SPORTING CRISTAL vs BRAGANTINO — SUL-AMERICANA =====
    {
      id: 5097,
      betNumber: '5097',
      betType: 'SINGLE',
      league: 'Copa Sul-Americana — Playoffs',
      homeTeam: 'Sporting Cristal',
      awayTeam: 'Bragantino',
      date: dateStr,
      time: '21:30',
      prediction: 'Bragantino Empate Anula (Draw No Bet)',
      confidence: 75,
      odds: 1.62,
      market: 'Empate Anula',
      winner: 'Bragantino',
      analysis: '🛡️ Bragantino DNB @1.62 — O Red Bull Bragantino é claramente superior ao Sporting Cristal, mas joga no Peru, o que sempre traz desafios adicionais. A aposta "Empate Anula" oferece segurança num jogo onde a equipa brasileira tem tudo para, no mínimo, não perder.',
      homePercent: 22,
      drawPercent: 30,
      awayPercent: 48,
    },
    // ===== OMONIA NICOSIA vs FC KAIRAT — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5098,
      betNumber: '5098',
      betType: 'SINGLE',
      league: 'Liga dos Campeões — Qualificação',
      homeTeam: 'Omonia Nicosia',
      awayTeam: 'FC Kairat',
      date: dateStr,
      time: '18:00',
      prediction: 'Omonia Nicosia Vence',
      confidence: 70,
      odds: 1.80,
      market: 'Resultado Final',
      winner: 'Omonia Nicosia',
      analysis: '🇨🇾 Omonia Nicosia Vence @1.80 — O Omonia Nicosia joga em casa, onde tem um forte apoio dos seus adeptos. O FC Kairat do Cazaquistão enfrenta uma longa viagem e costuma ter dificuldades em jogos europeus fora de portas. O fator casa deve ser decisivo neste encontro de qualificação.',
      homePercent: 52,
      drawPercent: 28,
      awayPercent: 20,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5099,
      betNumber: '5099',
      betType: 'DOUBLE',
      league: 'Brasileirão & Champions League',
      homeTeam: 'Palmeiras & Omonia',
      awayTeam: 'Opositores',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Palmeiras + Vitória Omonia Nicosia',
      confidence: 65,
      odds: 3.15,
      market: 'Combinada',
      winner: '',
      analysis: '🔥 ACUMULADOR DO DIA @3.15 — Combinamos duas vitórias sólidas para hoje. O Palmeiras, mesmo fora, é favorito claro frente ao Coritiba. Juntamos a vitória caseira do Omonia Nicosia na qualificação da Champions League contra o FC Kairat. Uma dupla com excelente valor a rondar a odd 3.',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    }
  ];
}

export default async function handler(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const channelId = process.env.TELEGRAM_CHANNEL_ID || 'alivegoal_tips';
    const response = await fetch(`https://t.me/s/${channelId}`);
    
    if (!response.ok) {
      console.warn('Failed to fetch from Telegram, using fallback tips');
      return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'fallback' }), {
        status: 200,
        headers,
      });
    }

    const html = await response.text();
    const tips = parseTipsFromHTML(html);

    if (tips.length > 0) {
      return new Response(JSON.stringify({ tips, source: 'telegram' }), {
        status: 200,
        headers,
      });
    }

    return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'fallback_no_tips_today' }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error in tips API:', error);
    return new Response(JSON.stringify({ tips: getFallbackTips(), source: 'error_fallback' }), {
      status: 200,
      headers,
    });
  }
}
