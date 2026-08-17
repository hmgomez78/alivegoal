import type { VercelRequest, VercelResponse } from '@vercel/node';

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

const RESPONSIBLE_GAMBLING_NOTE =
  'Conteúdo editorial para maiores de 18 anos. Aposte apenas o que pode perder; as odds de referência foram consultadas em 17/08/2026, são dinâmicas, podem mudar ou ser suspensas antes do pontapé de saída e não constituem garantia de resultado.';

function getFallbackTips(): Tip[] {
  const dateStr = '17/08/2026';

  return [
    {
      id: 9101,
      betNumber: '9101',
      betType: 'SINGLE',
      league: 'Primeira Liga — Jornada 2',
      homeTeam: 'Casa Pia',
      awayTeam: 'Benfica',
      date: dateStr,
      time: '20:15',
      prediction: 'Vitória Benfica',
      confidence: 78,
      odds: 1.20,
      market: 'Resultado Final (90 min)',
      winner: 'Benfica',
      analysis: `A Sporting Life mostrava Benfica a 1/5 (1,20 em decimal), Casa Pia a 11/1 e empate a 11/2 no momento da consulta. Ao normalizar as probabilidades implícitas dos três preços, o mercado colocava o Benfica perto de 78%, contra 8% para o Casa Pia e 14% para o empate. A escolha acompanha esse favoritismo muito vincado, mas uma odd curta oferece pouco amortecedor para um resultado inesperado; confirme o onze e eventuais alterações de mercado antes de jogar. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 8,
      drawPercent: 14,
      awayPercent: 78,
    },
    {
      id: 9102,
      betNumber: '9102',
      betType: 'SINGLE',
      league: 'Coppa Italia — 1.ª Ronda',
      homeTeam: 'Sassuolo',
      awayTeam: 'Cesena',
      date: dateStr,
      time: '17:30',
      prediction: 'Vitória Sassuolo',
      confidence: 64,
      odds: 1.44,
      market: 'Resultado Final (90 min)',
      winner: 'Sassuolo',
      analysis: `A referência da Sporting Life para Sassuolo–Cesena era 4/9 para o Sassuolo (1,44 decimal), 7/2 para o empate e 5/1 para o Cesena. A conversão e normalização do mercado 1X2 aponta para cerca de 64% de probabilidade do anfitrião, 21% de empate e 15% do visitante. O enquadramento é o de uma eliminatória: um favorito pode controlar a maior parte do jogo e ainda ficar vulnerável a uma bola parada ou transição. É uma leitura de preço, não uma previsão certa. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 64,
      drawPercent: 21,
      awayPercent: 15,
    },
    {
      id: 9103,
      betNumber: '9103',
      betType: 'SINGLE',
      league: 'Superliga Dinamarquesa',
      homeTeam: 'Brøndby',
      awayTeam: 'Sønderjyske',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Brøndby',
      confidence: 67,
      odds: 1.33,
      market: 'Resultado Final (90 min)',
      winner: 'Brøndby',
      analysis: `O Brøndby aparecia a 1/3 (1,33 decimal), com o empate a 7/2 e o Sønderjyske a 11/2 na grelha da Sporting Life. A probabilidade implícita normalizada fica aproximadamente em 67% para o Brøndby, 20% para o empate e 13% para o Sønderjyske. A tese é estritamente a do favoritismo caseiro revelado pelo mercado. Não pressupõe domínio automático: se o anfitrião não converter o controlo territorial em ocasiões, a exposição ao empate aumenta rapidamente. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 67,
      drawPercent: 20,
      awayPercent: 13,
    },
    {
      id: 9104,
      betNumber: '9104',
      betType: 'SINGLE',
      league: 'Allsvenskan',
      homeTeam: 'Häcken',
      awayTeam: 'Halmstad',
      date: dateStr,
      time: '18:00',
      prediction: 'Vitória Häcken',
      confidence: 69,
      odds: 1.29,
      market: 'Resultado Final (90 min)',
      winner: 'Häcken',
      analysis: `A Sporting Life apresentava o Häcken a 2/7 (1,29 em decimal), empate a 18/5 e Halmstad a 13/2. Os preços 1X2 correspondem, após normalização, a cerca de 69% para a vitória do Häcken, 19% para o empate e 12% para o Halmstad. É a maior confiança individual da lista, mas continua a ser uma seleção de resultado final: expulsões, eficácia e variação em bolas paradas podem contrariar uma leitura pré-jogo aparentemente clara. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 69,
      drawPercent: 19,
      awayPercent: 12,
    },
    {
      id: 9105,
      betNumber: '9105',
      betType: 'SINGLE',
      league: 'Coppa Italia — 1.ª Ronda',
      homeTeam: 'Pisa',
      awayTeam: 'Empoli',
      date: dateStr,
      time: '17:00',
      prediction: 'Vitória Pisa',
      confidence: 52,
      odds: 1.80,
      market: 'Resultado Final (90 min)',
      winner: 'Pisa',
      analysis: `Pisa tinha cotação 4/5 (1,80 decimal), perante 13/5 no empate e 16/5 no Empoli na Sporting Life. Depois de ajustar a margem do mercado, a distribuição fica próxima de 52% para Pisa, 26% empate e 22% Empoli. É uma das seleções mais equilibradas do conjunto e, por isso, deve ser lida como favoritismo moderado, não como uma escolha de alta segurança. Numa eliminatória de taça, confirmar rotação e disponibilidade dos jogadores é particularmente relevante. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 52,
      drawPercent: 26,
      awayPercent: 22,
    },
    {
      id: 9106,
      betNumber: '9106',
      betType: 'DOUBLE',
      league: 'Dupla do Dia',
      homeTeam: 'Casa Pia + Sassuolo',
      awayTeam: 'Benfica + Cesena',
      date: dateStr,
      time: '17:30 / 20:15',
      prediction: 'Sassuolo vence + Benfica vence',
      confidence: 58,
      odds: 1.73,
      market: 'Acumulador — Resultado Final (90 min)',
      winner: 'Sassuolo + Benfica',
      analysis: `A dupla combina Sassuolo a 1,44 e Benfica a 1,20, produzindo uma odd acumulada de referência de 1,73 (1,44 × 1,20). A probabilidade implícita bruta do conjunto ronda 58%, antes de qualquer ajuste por margem. Embora as duas singles sejam favoritas no respetivo mercado, a dupla exige que ambos os resultados ocorram e por isso falha integralmente com um empate ou derrota em qualquer jogo. Tem mais variância do que uma seleção simples e não deve ser tratada como uma aposta segura. Fonte de odds e agenda: Sporting Life / Sky Bet, consultado em 17/08. ${RESPONSIBLE_GAMBLING_NOTE}`,
      homePercent: 58,
      drawPercent: 0,
      awayPercent: 42,
    }
  ];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

  const tips = getFallbackTips();

  return res.status(200).json({
    source: "fallback",
    count: tips.length,
    updated: new Date().toISOString(),
    items: tips,
    tips: tips
  });
}
