import { useState, useEffect, useCallback } from "react";

export interface LiveMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number | string;
  status: string;
  league: string;
  leagueId?: number;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
}

export interface FeaturedMatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  stats: MatchStats;
}

// Competições disponíveis no plano gratuito do football-data.org
const COMPETITION_CODES = [
  "CL",   // UEFA Champions League
  "PL",   // Premier League
  "PD",   // La Liga
  "SA",   // Serie A
  "BL1",  // Bundesliga
  "FL1",  // Ligue 1
  "PPL",  // Primeira Liga (Portugal)
  "CLI",  // Copa Libertadores
  "BSA",  // Brasileirão
  "ELC",  // Championship
];

// Mapeamento de status da football-data.org para português
const statusMap: Record<string, string> = {
  "SCHEDULED": "POR INICIAR",
  "TIMED": "HOJE",
  "IN_PLAY": "AO VIVO",
  "PAUSED": "INT",
  "FINISHED": "FIM",
  "POSTPONED": "ADIADO",
  "SUSPENDED": "SUSP",
  "CANCELLED": "CANC",
};

function formatMatchTime(match: any): string {
  const status = match.status;
  if (status === "IN_PLAY" || status === "PAUSED") {
    return "AO VIVO";
  }
  if (status === "FINISHED") {
    return "FIM";
  }
  if (status === "TIMED" || status === "SCHEDULED") {
    const date = new Date(match.utcDate);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `HOJE ${hours}:${minutes}`;
  }
  return statusMap[status] || status;
}

// Logos dos clubes via football-data.org crests
function getTeamLogo(team: any): string {
  return team?.crest || "";
}

// Fallback data com jogos reais (atualizado 08/05/2026)
const fallbackMatches: LiveMatch[] = [
  // Resultados de ontem (07/05)
  { id: 1550001, homeTeam: "Aston Villa", awayTeam: "Nottingham Forest", homeScore: 4, awayScore: 0, minute: 90, status: "FIM", league: "UEFA Europa League", leagueId: 3 },
  { id: 1550002, homeTeam: "Freiburg", awayTeam: "Sporting Braga", homeScore: 3, awayScore: 1, minute: 90, status: "FIM (Agr. 4-3)", league: "UEFA Europa League", leagueId: 3 },
  { id: 1550003, homeTeam: "Crystal Palace", awayTeam: "Shakhtar Donetsk", homeScore: 2, awayScore: 1, minute: 90, status: "FIM", league: "UEFA Conference League", leagueId: 848 },
  { id: 1550004, homeTeam: "Strasbourg", awayTeam: "Rayo Vallecano", homeScore: 0, awayScore: 1, minute: 90, status: "FIM", league: "UEFA Conference League", leagueId: 848 },
  // Jogos de hoje (08/05)
  { id: 1550005, homeTeam: "Borussia Dortmund", awayTeam: "Eintracht Frankfurt", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:30", league: "Bundesliga", leagueId: 2002 },
  { id: 1550006, homeTeam: "Levante", awayTeam: "Osasuna", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 21:00", league: "La Liga", leagueId: 2014 },
  { id: 1550007, homeTeam: "Torino", awayTeam: "Sassuolo", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:45", league: "Serie A", leagueId: 2019 },
  { id: 1550008, homeTeam: "Lens", awayTeam: "Nantes", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:45", league: "Ligue 1", leagueId: 2015 },
  { id: 1550009, homeTeam: "Cadiz", awayTeam: "Deportivo La Coruna", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:30", league: "La Liga 2", leagueId: 2016 },
  { id: 1550010, homeTeam: "Augsburg", awayTeam: "Borussia Mönchengladbach", homeScore: 0, awayScore: 0, minute: 0, status: "AMANHA 15:30", league: "Bundesliga", leagueId: 2002 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Borussia Dortmund", awayTeam: "Eintracht Frankfurt",
  homeScore: 0, awayScore: 0,
  stats: {
    possession: [58, 42], shots: [0, 0], shotsOnTarget: [0, 0],
    corners: [0, 0], fouls: [0, 0],
  },
};

const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";
const CORS_PROXY = "https://corsproxy.io/?";

export function useLiveScores(apiKey?: string) {
  const [matches, setMatches] = useState<LiveMatch[]>(fallbackMatches);
  const [featured, setFeatured] = useState<FeaturedMatchData>(fallbackFeatured);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveScores = useCallback(async () => {
    const key = apiKey || import.meta.env.VITE_FOOTBALL_DATA_KEY;
    if (!key) {
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const allMatches: LiveMatch[] = [];
      let hasLive = false;

      // Buscar jogos de hoje em paralelo para as competições disponíveis
      // Usamos apenas as primeiras 5 para evitar rate limiting (10 req/min)
      const compsToFetch = COMPETITION_CODES.slice(0, 5);

      const results = await Promise.allSettled(
        compsToFetch.map(async (code) => {
          const url = `${CORS_PROXY}${encodeURIComponent(
            `${FOOTBALL_DATA_BASE}/competitions/${code}/matches?dateFrom=${today}&dateTo=${today}`
          )}`;
          const res = await fetch(url, {
            headers: { "X-Auth-Token": key },
          });
          if (!res.ok) return [];
          const data = await res.json();
          return data.matches || [];
        })
      );

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const fixtures = result.value as any[];
          fixtures.forEach((m: any) => {
            const statusStr = formatMatchTime(m);
            if (m.status === "IN_PLAY" || m.status === "PAUSED") {
              hasLive = true;
            }
            allMatches.push({
              id: m.id,
              homeTeam: m.homeTeam?.shortName || m.homeTeam?.name || "Home",
              awayTeam: m.awayTeam?.shortName || m.awayTeam?.name || "Away",
              homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? 0,
              awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? 0,
              minute: m.minute || 0,
              status: statusStr,
              league: m.competition?.name || "Football",
              leagueId: m.competition?.id,
              homeTeamLogo: getTeamLogo(m.homeTeam),
              awayTeamLogo: getTeamLogo(m.awayTeam),
            });
          });
        }
      });

      if (allMatches.length > 0) {
        // Ordenar: ao vivo primeiro, depois por hora
        const sorted = allMatches.sort((a, b) => {
          const aLive = a.status === "AO VIVO" ? 0 : a.status === "FIM" ? 2 : 1;
          const bLive = b.status === "AO VIVO" ? 0 : b.status === "FIM" ? 2 : 1;
          return aLive - bLive;
        });

        setMatches(sorted.slice(0, 15));
        setIsLive(hasLive);

        // Jogo em destaque: primeiro ao vivo ou primeiro do dia
        const featMatch = sorted[0];
        if (featMatch) {
          setFeatured({
            homeTeam: featMatch.homeTeam,
            awayTeam: featMatch.awayTeam,
            homeScore: featMatch.homeScore,
            awayScore: featMatch.awayScore,
            stats: fallbackFeatured.stats,
          });
        }
      } else {
        setMatches(fallbackMatches);
        setFeatured(fallbackFeatured);
        setIsLive(false);
      }

      setError(null);
    } catch (err: any) {
      console.error("Erro ao buscar live scores:", err);
      setError(err.message);
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchLiveScores();
    // Refresh every 60 seconds
    const interval = setInterval(fetchLiveScores, 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchLiveScores]);

  return { matches, featured, isLive, loading, error, refresh: fetchLiveScores };
}
