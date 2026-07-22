import { useState, useEffect, useCallback } from "react";

export interface LiveMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
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
    const localHours = ((date.getUTCHours() + 1) % 24).toString().padStart(2, "0");
    const localMinutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `HOJE ${localHours}:${localMinutes}`;
  }
  
  return statusMap[status] || status;
}

function getTeamLogo(team: any): string {
  return team?.crest || "";
}

const TODAYS_TIP_TEAMS = [
  "Coritiba", "Palmeiras",
  "São Paulo", "Athletico-PR",
  "Vasco", "Independiente Medellín",
  "Bragantino", "Sporting Cristal",
  "Omonia Nicosia", "FC Kairat"
];

const fallbackMatches: LiveMatch[] = [
  // Brasileirão Série A (Hoje 22/07)
  { id: 540508, homeTeam: "Coritiba", awayTeam: "Palmeiras", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:30", league: "Brasileirão Série A", leagueId: 2013 },
  { id: 540509, homeTeam: "São Paulo", awayTeam: "Athletico-PR", homeScore: null, awayScore: null, minute: 0, status: "HOJE 21:30", league: "Brasileirão Série A", leagueId: 2013 },
  { id: 540510, homeTeam: "Internacional", awayTeam: "Cruzeiro", homeScore: null, awayScore: null, minute: 0, status: "HOJE 21:30", league: "Brasileirão Série A", leagueId: 2013 },
  { id: 540511, homeTeam: "Chapecoense", awayTeam: "Flamengo", homeScore: null, awayScore: null, minute: 0, status: "HOJE 21:30", league: "Brasileirão Série A", leagueId: 2013 },

  // Copa Sul-Americana — Playoffs Ida (Hoje 22/07)
  { id: 540601, homeTeam: "Ind. Medellín", awayTeam: "Vasco", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:00", league: "Copa Sul-Americana — Playoffs", leagueId: 2152 },
  { id: 540602, homeTeam: "Sporting Cristal", awayTeam: "Bragantino", homeScore: null, awayScore: null, minute: 0, status: "HOJE 21:30", league: "Copa Sul-Americana — Playoffs", leagueId: 2152 },
  { id: 540603, homeTeam: "Lanús", awayTeam: "Cienciano", homeScore: null, awayScore: null, minute: 0, status: "HOJE 21:30", league: "Copa Sul-Americana — Playoffs", leagueId: 2152 },

  // Champions League Qualifying — 2ª Ronda (Hoje 22/07)
  { id: 540701, homeTeam: "Omonia Nicosia", awayTeam: "FC Kairat", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
  { id: 540702, homeTeam: "Levski Sofia", awayTeam: "Univ. Craiova", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:30", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
  { id: 540703, homeTeam: "KF Egnatia", awayTeam: "CM Celje", homeScore: null, awayScore: null, minute: 0, status: "HOJE 20:00", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Coritiba",
  awayTeam: "Palmeiras",
  homeScore: 0,
  awayScore: 0,
  stats: {
    possession: [50, 50],
    shots: [0, 0],
    shotsOnTarget: [0, 0],
    corners: [0, 0],
    fouls: [0, 0],
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
      const fetchPromises = COMPETITION_CODES.map(code => 
        fetch(`${CORS_PROXY}${encodeURIComponent(`${FOOTBALL_DATA_BASE}/competitions/${code}/matches?dateFrom=${today}&dateTo=${today}`)}`, {
          headers: { "X-Auth-Token": key }
        }).then(res => {
          if (!res.ok) {
            if (res.status === 429) throw new Error("Rate limit exceeded");
            return null;
          }
          return res.json();
        }).catch(e => null)
      );

      const results = await Promise.all(fetchPromises);
      
      let allMatches: any[] = [];
      results.forEach(data => {
        if (data && data.matches) {
          allMatches = [...allMatches, ...data.matches];
        }
      });

      if (allMatches.length === 0) {
        setMatches(fallbackMatches);
        setFeatured(fallbackFeatured);
        setIsLive(false);
        setLoading(false);
        return;
      }

      const formattedMatches: LiveMatch[] = allMatches.map(m => ({
        id: m.id,
        homeTeam: m.homeTeam.shortName || m.homeTeam.name,
        awayTeam: m.awayTeam.shortName || m.awayTeam.name,
        homeScore: m.score?.fullTime?.home ?? null,
        awayScore: m.score?.fullTime?.away ?? null,
        minute: m.status === "IN_PLAY" ? "45'" : 0,
        status: formatMatchTime(m),
        league: m.competition.name,
        leagueId: m.competition.id,
        homeTeamLogo: getTeamLogo(m.homeTeam),
        awayTeamLogo: getTeamLogo(m.awayTeam),
      }));

      formattedMatches.sort((a, b) => {
        const aHasTip = TODAYS_TIP_TEAMS.some(t => a.homeTeam.includes(t) || a.awayTeam.includes(t));
        const bHasTip = TODAYS_TIP_TEAMS.some(t => b.homeTeam.includes(t) || b.awayTeam.includes(t));
        
        if (aHasTip && !bHasTip) return -1;
        if (!aHasTip && bHasTip) return 1;
        
        if (a.status === "AO VIVO" && b.status !== "AO VIVO") return -1;
        if (a.status !== "AO VIVO" && b.status === "AO VIVO") return 1;
        
        return a.status.localeCompare(b.status);
      });

      setMatches(formattedMatches);
      setIsLive(formattedMatches.some(m => m.status === "AO VIVO"));

      const featuredMatch = formattedMatches.find(m => m.status === "AO VIVO") || formattedMatches[0];
      if (featuredMatch) {
        setFeatured({
          homeTeam: featuredMatch.homeTeam,
          awayTeam: featuredMatch.awayTeam,
          homeScore: featuredMatch.homeScore || 0,
          awayScore: featuredMatch.awayScore || 0,
          stats: fallbackFeatured.stats,
        });
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching live scores:", err);
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setError(err.message === "Rate limit exceeded" ? "Limite de API excedido. A mostrar dados offline." : "Erro ao carregar resultados ao vivo.");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchLiveScores();
    const interval = setInterval(fetchLiveScores, 60000);
    return () => clearInterval(interval);
  }, [fetchLiveScores]);

  return { matches, featured, isLive, loading, error, refresh: fetchLiveScores };
}
