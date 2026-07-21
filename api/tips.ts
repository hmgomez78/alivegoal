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
  // ... existing implementation ...
  return [];
}

export function getFallbackTips(): Tip[] {
  const dateStr = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  return [
    // ===== FENERBAHCE vs GORNIK ZABRZE — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5088,
      betNumber: '5088',
      betType: 'SINGLE',
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
      analysis: '🇹🇷 Fenerbahce & Over 1.5 @1.62 — O Fenerbahce joga em casa no Şükrü Saracoğlu, onde é historicamente dominante nas competições europeias. O Gornik Zabrze, da Ekstraklasa polaca, é claramente inferior em qualidade de plantel. Com a motivação de chegar à fase de grupos e o apoio do seu inflamado público, o Fener deve vencer confortavelmente num jogo com golos.',
      homePercent: 68,
      drawPercent: 18,
      awayPercent: 14,
    },
    // ===== STURM GRAZ vs HEARTS — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5089,
      betNumber: '5089',
      betType: 'SINGLE',
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
      analysis: '🇦🇹 Sturm Graz Vence @1.78 — O Sturm Graz tem sido uma das equipas austríacas mais sólidas nas qualificações europeias nos últimos anos. A jogar em casa contra um Hearts que tem dificuldades históricas fora da Escócia, os austríacos têm vantagem clara. O Hearts perdeu os seus melhores jogadores no verão e chega a Graz sem grande forma.',
      homePercent: 57,
      drawPercent: 24,
      awayPercent: 19,
    },
    // ===== ATLETICO-MG vs BAHIA — BRASILEIRÃO SÉRIE A =====
    {
      id: 5090,
      betNumber: '5090',
      betType: 'SINGLE',
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
      analysis: '🇧🇷 Atlético-MG 1X @1.65 — O Atlético Mineiro joga em casa na Arena MRV, onde tem sido muito forte nesta temporada. O Bahia é uma equipa competente, mas viaja para Belo Horizonte com desvantagem de fator campo. A dupla hipótese oferece segurança com boa odd para um jogo de alto nível do Brasileirão.',
      homePercent: 48,
      drawPercent: 28,
      awayPercent: 24,
    },
    // ===== UNIVERSIDAD CENTRAL vs SANTOS — SUL-AMERICANA =====
    {
      id: 5091,
      betNumber: '5091',
      betType: 'SINGLE',
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
      analysis: '🛡️ Menos de 2.5 Golos @1.58 — Jogo de ida dos playoffs da Sul-Americana na Venezuela. Em jogos de mata-mata de primeira mão, as equipas tendem a ser mais cautelosas, especialmente fora de casa. O Santos vai privilegiar não sofrer golos para a segunda mão no Brasil. Esperamos um jogo tático e fechado.',
      homePercent: 38,
      drawPercent: 32,
      awayPercent: 30,
    },
    // ===== LARNE vs RED STAR BELGRADE — CHAMPIONS LEAGUE QUALIFYING =====
    {
      id: 5092,
      betNumber: '5092',
      betType: 'SINGLE',
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
      analysis: '🇷🇸 Red Star Belgrade Vence @1.45 — O Estrela Vermelha de Belgrado é um dos gigantes históricos do futebol europeu e tem uma qualidade muito superior ao Larne da Irlanda do Norte. Apesar de jogar fora, o Red Star tem plantel, experiência europeia e motivação para avançar. Uma das apostas mais seguras do dia.',
      homePercent: 18,
      drawPercent: 22,
      awayPercent: 60,
    },
    // ===== ACUMULADOR DO DIA (DOUBLE) =====
    {
      id: 5093,
      betNumber: '5093',
      betType: 'DOUBLE',
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
      analysis: '🔥 ACUMULADOR DO DIA @2.35 — Combinamos os dois favoritos mais sólidos das qualificações da Liga dos Campeões desta noite. O Fenerbahce em casa contra o Gornik Zabrze tem qualidade muito superior. O Red Star Belgrade, apesar de jogar fora, é claramente superior ao Larne da Irlanda do Norte. Uma dupla com excelente valor para a noite europeia.',
      homePercent: 0,
      drawPercent: 0,
      awayPercent: 0,
    }
  ];
}

export default async function handler(req: Request) {
  // CORS headers
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

    // Fallback if no tips found for today
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
