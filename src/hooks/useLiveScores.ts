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

// Fallback data when API is unavailable
const fallbackMatches: LiveMatch[] = [
  { id: 1, homeTeam: "Benfica", awayTeam: "Porto", homeScore: 2, awayScore: 1, minute: 67, status: "AO VIVO", league: "Liga Portugal" },
  { id: 2, homeTeam: "Al Ahly", awayTeam: "Zamalek", homeScore: 0, awayScore: 0, minute: 23, status: "AO VIVO", league: "Liga Egípcia" },
  { id: 3, homeTeam: "Flamengo", awayTeam: "Palmeiras", homeScore: 1, awayScore: 2, minute: 81, status: "AO VIVO", league: "Brasileirão" },
  { id: 4, homeTeam: "Celtic", awayTeam: "Rangers", homeScore: 3, awayScore: 1, minute: 55, status: "AO VIVO", league: "Liga Escocesa" },
  { id: 5, homeTeam: "Ajax", awayTeam: "Feyenoord", homeScore: 1, awayScore: 1, minute: 42, status: "AO VIVO", league: "Eredivisie" },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Benfica", awayTeam: "Porto",
  homeScore: 2, awayScore: 1,
  stats: {
    possession: [58, 42], shots: [12, 7], shotsOnTarget: [5, 3],
    corners: [6, 3], fouls: [9, 14],
  },
};

// API-Football status mapping to Portuguese
const statusMap: Record<string, string> = {
  "1H": "1T", "2H": "2T", "HT": "INT", "ET": "PROL",
  "P": "PEN", "FT": "FIM", "AET": "FIM AP", "PEN": "PEN",
  "BT": "PAUSA", "SUSP": "SUSP", "INT": "INT",
  "PST": "ADIADO", "CANC": "CANC", "ABD": "ABAND",
  "AWD": "WO", "WO": "WO", "LIVE": "AO VIVO",
  "NS": "POR INICIAR", "TBD": "A DEFINIR",
};

function mapStatus(short: string, elapsed: number | null): string {
  if (["1H", "2H", "ET"].includes(short) && elapsed) {
    return "AO VIVO";
  }
  return statusMap[short] || short;
}

// Use a CORS proxy for client-side API calls
const API_BASE = "https://v3.football.api-sports.io";
const CORS_PROXY = "https://corsproxy.io/?";

export function useLiveScores(apiKey?: string) {
  const [matches, setMatches] = useState<LiveMatch[]>(fallbackMatches);
  const [featured, setFeatured] = useState<FeaturedMatchData>(fallbackFeatured);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveScores = useCallback(async () => {
    // If no API key, use fallback data
    const key = apiKey || import.meta.env.VITE_API_FOOTBALL_KEY;
    if (!key) {
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/fixtures?live=all`)}`;
      const res = await fetch(url, {
        headers: {
          "x-apisports-key": key,
        },
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const fixtures = data?.response;

      if (!fixtures || fixtures.length === 0) {
        // No live matches right now, try today's fixtures
        const today = new Date().toISOString().split("T")[0];
        const todayUrl = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/fixtures?date=${today}`)}`;
        const todayRes = await fetch(todayUrl, {
          headers: { "x-apisports-key": key },
        });
        const todayData = await todayRes.json();
        const todayFixtures = todayData?.response;

        if (todayFixtures && todayFixtures.length > 0) {
          const mapped = todayFixtures.slice(0, 10).map((f: any, idx: number) => ({
            id: f.fixture.id || idx,
            homeTeam: f.teams.home.name,
            awayTeam: f.teams.away.name,
            homeScore: f.goals.home ?? 0,
            awayScore: f.goals.away ?? 0,
            minute: f.fixture.status.elapsed || 0,
            status: mapStatus(f.fixture.status.short, f.fixture.status.elapsed),
            league: f.league.name,
            homeTeamLogo: f.teams.home.logo,
            awayTeamLogo: f.teams.away.logo,
          }));
          setMatches(mapped);
          setIsLive(false);
        } else {
          setMatches(fallbackMatches);
          setIsLive(false);
        }
        setLoading(false);
        return;
      }

      // Map live fixtures
      const mapped: LiveMatch[] = fixtures.slice(0, 10).map((f: any, idx: number) => ({
        id: f.fixture.id || idx,
        homeTeam: f.teams.home.name,
        awayTeam: f.teams.away.name,
        homeScore: f.goals.home ?? 0,
        awayScore: f.goals.away ?? 0,
        minute: f.fixture.status.elapsed || 0,
        status: mapStatus(f.fixture.status.short, f.fixture.status.elapsed),
        league: f.league.name,
        homeTeamLogo: f.teams.home.logo,
        awayTeamLogo: f.teams.away.logo,
      }));

      setMatches(mapped);
      setIsLive(true);

      // Set featured match (first match with most goals)
      const sorted = [...fixtures].sort((a: any, b: any) =>
        ((b.goals.home || 0) + (b.goals.away || 0)) - ((a.goals.home || 0) + (a.goals.away || 0))
      );
      const feat = sorted[0];
      if (feat) {
        const stats = feat.statistics;
        // Try to extract stats if available
        let featuredStats: MatchStats = fallbackFeatured.stats;
        if (stats && stats.length >= 2) {
          const homeStats = stats[0]?.statistics || [];
          const awayStats = stats[1]?.statistics || [];
          const getStat = (arr: any[], type: string) => {
            const found = arr.find((s: any) => s.type === type);
            return found ? parseInt(found.value) || 0 : 0;
          };
          featuredStats = {
            possession: [getStat(homeStats, "Ball Possession"), getStat(awayStats, "Ball Possession")],
            shots: [getStat(homeStats, "Total Shots"), getStat(awayStats, "Total Shots")],
            shotsOnTarget: [getStat(homeStats, "Shots on Goal"), getStat(awayStats, "Shots on Goal")],
            corners: [getStat(homeStats, "Corner Kicks"), getStat(awayStats, "Corner Kicks")],
            fouls: [getStat(homeStats, "Fouls"), getStat(awayStats, "Fouls")],
          };
        }
        setFeatured({
          homeTeam: feat.teams.home.name,
          awayTeam: feat.teams.away.name,
          homeScore: feat.goals.home ?? 0,
          awayScore: feat.goals.away ?? 0,
          stats: featuredStats,
        });
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
