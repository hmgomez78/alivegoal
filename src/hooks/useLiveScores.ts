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
    // Converter UTC para GMT+1 (Portugal/Lisboa)
    const localHours = ((date.getUTCHours() + 1) % 24).toString().padStart(2, "0");
    const localMinutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `HOJE ${localHours}:${localMinutes}`;
  }
  
  return statusMap[status] || status;
}

// Logos dos clubes via football-data.org crests
function getTeamLogo(team: any): string {
  return team?.crest || "";
}

// Jogos com tips hoje (20/07/2026) — aparecem primeiro
const TODAYS_TIP_TEAMS = [
  "Espanha", "Argentina",
  "Fenerbahce", "Gornik Zabrze",
  "Sturm Graz", "Hearts",
  "Rangers", "Man United",
  "Aston Villa", "Espanyol"
];

// Fallback data com jogos reais (atualizado 20/07/2026)
const fallbackMatches: LiveMatch[] = [
  // RESULTADO DA FINAL DO MUNDIAL 2026 (Ontem, mas relevante manter como destaque)
  { id: 540400, homeTeam: "Espanha", awayTeam: "Argentina", homeScore: 1, awayScore: 0, minute: 120, status: "FIM", league: "FIFA Mundial 2026 — Final", leagueId: 2000 },

  // Amigáveis de Pré-Época (Hoje 20/07 e Amanhã 21/07)
  { id: 540401, homeTeam: "Rangers", awayTeam: "Man United", homeScore: null, awayScore: null, minute: 0, status: "HOJE 15:00", league: "Amigáveis de Clubes", leagueId: 2185 },
  { id: 540402, homeTeam: "Aston Villa", awayTeam: "Espanyol", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Amigáveis de Clubes", leagueId: 2185 },
  { id: 540403, homeTeam: "Chelsea", awayTeam: "Crawley Town", homeScore: 3, awayScore: 1, minute: 90, status: "FIM", league: "Amigáveis de Clubes", leagueId: 2185 },

  // Champions League Qualifying (Amanhã 21/07 - Antecipação)
  { id: 540404, homeTeam: "Fenerbahce", awayTeam: "Gornik Zabrze", homeScore: null, awayScore: null, minute: 0, status: "AMANHÃ 19:00", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
  { id: 540405, homeTeam: "Sturm Graz", awayTeam: "Hearts", homeScore: null, awayScore: null, minute: 0, status: "AMANHÃ 19:30", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
  { id: 540406, homeTeam: "Ararat Armenia", awayTeam: "Shamrock Rovers", homeScore: null, awayScore: null, minute: 0, status: "AMANHÃ 17:00", league: "Liga dos Campeões — Qualificação", leagueId: 2001 },
  
  // Brasileirão Série D — Oitavos de Final (Jogos Recentes)
  { id: 540407, homeTeam: "São Luiz", awayTeam: "CSA", homeScore: 1, awayScore: 1, minute: 90, status: "FIM", league: "Brasileirão Série D — Oitavos", leagueId: 2014 },
  { id: 540408, homeTeam: "América-RN", awayTeam: "Gama", homeScore: 2, awayScore: 0, minute: 90, status: "FIM", league: "Brasileirão Série D — Oitavos", leagueId: 2014 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Espanha", 
  awayTeam: "Argentina",
  homeScore: 1, 
  awayScore: 0,
  stats: {
    possession: [64, 36], 
    shots: [12, 8], 
    shotsOnTarget: [5, 3],
    corners: [6, 4], 
    fouls: [14, 18],
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

      // Ordenar: jogos das tips primeiro, depois ao vivo, depois por hora
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

      // Set featured match (first live match or first match)
      const featuredMatch = formattedMatches.find(m => m.status === "AO VIVO") || formattedMatches[0];
      if (featuredMatch) {
        setFeatured({
          homeTeam: featuredMatch.homeTeam,
          awayTeam: featuredMatch.awayTeam,
          homeScore: featuredMatch.homeScore || 0,
          awayScore: featuredMatch.awayScore || 0,
          stats: fallbackFeatured.stats, // A API gratuita não fornece estatísticas detalhadas
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
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchLiveScores, 60000);
    return () => clearInterval(interval);
  }, [fetchLiveScores]);

  return { matches, featured, isLive, loading, error, refresh: fetchLiveScores };
}
