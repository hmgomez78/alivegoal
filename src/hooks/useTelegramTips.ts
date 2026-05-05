import { useState, useEffect, useCallback } from "react";

export interface TelegramTip {
  id: number;
  type: "tip" | "acumulada" | "resultado" | "analise" | "jogos_do_dia";
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odds: string;
  confidence: number;
  league: string;
  kickoff: string;
  bookmaker: string;
  source: "telegram";
  rawText?: string;
}

// Parse tips from Telegram channel messages
function parseTipFromMessage(text: string, id: number): TelegramTip | null {
  if (!text) return null;

  // Try to detect tip patterns
  // Common patterns: "Team A vs Team B", odds like "@1.85", predictions like "Over 2.5"
  const vsMatch = text.match(/([A-Za-zÀ-ÿ\s.]+?)\s*(?:vs?\.?|x)\s*([A-Za-zÀ-ÿ\s.]+)/i);
  const oddsMatch = text.match(/@?\s*(\d+[.,]\d+)/);
  const leagueMatch = text.match(/(?:🏆|⚽|🏟️)\s*([^\n]+)/);

  if (!vsMatch) return null;

  const homeTeam = vsMatch[1].trim();
  const awayTeam = vsMatch[2].trim();
  const odds = oddsMatch ? oddsMatch[1].replace(",", ".") : "1.80";

  // Detect prediction type
  let prediction = "Tip";
  let type: TelegramTip["type"] = "tip";
  const lowerText = text.toLowerCase();

  if (lowerText.includes("over 2.5") || lowerText.includes("+2.5")) {
    prediction = "Mais de 2.5";
  } else if (lowerText.includes("over 1.5") || lowerText.includes("+1.5")) {
    prediction = "Mais de 1.5";
  } else if (lowerText.includes("btts") || lowerText.includes("ambas marcam") || lowerText.includes("ambas equip")) {
    prediction = "Ambas Marcam";
  } else if (lowerText.includes("vitória casa") || lowerText.includes("home win") || lowerText.includes("1x")) {
    prediction = "Vitória Casa";
  } else if (lowerText.includes("vitória fora") || lowerText.includes("away win") || lowerText.includes("x2")) {
    prediction = "Vitória Fora";
  } else if (lowerText.includes("empate") || lowerText.includes("draw")) {
    prediction = "Empate";
  } else if (lowerText.includes("acumulada") || lowerText.includes("combo") || lowerText.includes("múltipla")) {
    prediction = "Acumulada";
    type = "acumulada";
  } else if (lowerText.includes("resultado") || lowerText.includes("result")) {
    type = "resultado";
    prediction = "Resultado";
  }

  // Detect confidence from emojis or keywords
  let confidence = 70;
  if (lowerText.includes("🔥🔥🔥") || lowerText.includes("alta confiança") || lowerText.includes("high confidence")) {
    confidence = 85;
  } else if (lowerText.includes("🔥🔥") || lowerText.includes("média")) {
    confidence = 75;
  } else if (lowerText.includes("💎") || lowerText.includes("premium")) {
    confidence = 90;
  }

  // Detect bookmaker
  let bookmaker = "elephantbet-mozambique";
  if (lowerText.includes("888") || lowerText.includes("888bets")) {
    bookmaker = "888bets";
  } else if (lowerText.includes("betway")) {
    bookmaker = "betway";
  } else if (lowerText.includes("hollywoodbets") || lowerText.includes("hollywood")) {
    bookmaker = "hollywoodbets";
  }

  return {
    id,
    type,
    homeTeam,
    awayTeam,
    prediction,
    odds,
    confidence,
    league: leagueMatch ? leagueMatch[1].trim() : "Internacional",
    kickoff: "Hoje",
    bookmaker,
    source: "telegram",
    rawText: text,
  };
}

// Fallback predictions (from mockData, used when Telegram is unavailable)
const fallbackPredictions = [
  {
    id: 1, homeTeam: "Manchester City", awayTeam: "Arsenal",
    kickoff: "Hoje, 20:45", prediction: "Vitória Casa", odds: "1.85",
    confidence: 78, league: "Premier League", bookmaker: "betway",
    type: "tip" as const, source: "telegram" as const,
  },
  {
    id: 2, homeTeam: "Barcelona", awayTeam: "Real Madrid",
    kickoff: "Hoje, 21:00", prediction: "Mais de 2.5", odds: "1.72",
    confidence: 82, league: "La Liga", bookmaker: "hollywoodbets",
    type: "tip" as const, source: "telegram" as const,
  },
  {
    id: 3, homeTeam: "PSG", awayTeam: "Bayern Munich",
    kickoff: "Amanhã, 21:00", prediction: "Ambas Marcam", odds: "1.65",
    confidence: 75, league: "Champions League", bookmaker: "betway",
    type: "tip" as const, source: "telegram" as const,
  },
  {
    id: 4, homeTeam: "Juventus", awayTeam: "AC Milan",
    kickoff: "Amanhã, 20:45", prediction: "Empate", odds: "3.20",
    confidence: 61, league: "Serie A", bookmaker: "888bets",
    type: "tip" as const, source: "telegram" as const,
  },
  {
    id: 5, homeTeam: "Liverpool", awayTeam: "Chelsea",
    kickoff: "Sáb, 17:30", prediction: "Vitória Casa", odds: "2.10",
    confidence: 70, league: "Premier League", bookmaker: "premierbet",
    type: "tip" as const, source: "telegram" as const,
  },
  {
    id: 6, homeTeam: "Borussia Dortmund", awayTeam: "RB Leipzig",
    kickoff: "Sáb, 18:30", prediction: "Mais de 2.5", odds: "1.80",
    confidence: 73, league: "Bundesliga", bookmaker: "elephantbet-angola",
    type: "tip" as const, source: "telegram" as const,
  },
];

export function useTelegramTips() {
  const [tips, setTips] = useState<TelegramTip[]>(fallbackPredictions);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch from Telegram public channel web preview
      const channelUrl = "https://t.me/s/NewsForTipsIQ";
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(channelUrl)}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);

      const html = await res.text();

      // Parse messages from HTML
      const messageRegex = /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
      const messages: string[] = [];
      let match;
      while ((match = messageRegex.exec(html)) !== null) {
        // Strip HTML tags
        const text = match[1]
          .replace(/<br\s*\/?>/g, "\n")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .trim();
        if (text.length > 20) {
          messages.push(text);
        }
      }

      if (messages.length === 0) {
        throw new Error("No messages found");
      }

      // Parse tips from the most recent messages
      const parsedTips: TelegramTip[] = [];
      for (let i = messages.length - 1; i >= 0 && parsedTips.length < 6; i--) {
        const tip = parseTipFromMessage(messages[i], messages.length - i);
        if (tip) {
          parsedTips.push(tip);
        }
      }

      if (parsedTips.length > 0) {
        setTips(parsedTips);
        setIsLive(true);
      } else {
        // Messages found but couldn't parse tips - use fallback
        setTips(fallbackPredictions);
        setIsLive(false);
      }

      setError(null);
    } catch (err: any) {
      console.error("Erro ao buscar tips do Telegram:", err);
      setError(err.message);
      setTips(fallbackPredictions);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTips();
    // Refresh every 10 minutes
    const interval = setInterval(fetchTips, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchTips]);

  return { tips, isLive, loading, error, refresh: fetchTips };
}
