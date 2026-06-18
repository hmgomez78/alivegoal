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

// Jogos com tips hoje (18/06/2026) — aparecem primeiro
const TODAYS_TIP_TEAMS = [
  "República Checa", "África do Sul", "Czech Republic", "South Africa", "Czechia",
  "Suíça", "Bósnia", "Switzerland", "Bosnia",
  "Canadá", "Qatar", "Canada",
  "México", "Coreia do Sul", "Mexico", "South Korea",
];

// Fallback data com jogos reais (atualizado 18/06/2026)
// NOTA: Quinta-feira — Dia 8 do Mundial 2026:
// Resultados de ontem (17/06):
//   Grupo K: Portugal 1-1 RD Congo (FIM)
//   Grupo L: Inglaterra 4-2 Croácia (FIM)
//   Grupo L: Gana vs Panamá (FIM — a decorrer)
//   Grupo K: Uzbequistão vs Colômbia (FIM — a decorrer)
// Jogos de hoje (18/06):
//   Grupo A: República Checa vs África do Sul (17:00 Lisboa / 12:00 ET) — Atlanta
//   Grupo B: Suíça vs Bósnia e Herzegovina (20:00 Lisboa / 15:00 ET) — Los Angeles
//   Grupo B: Canadá vs Qatar (23:00 Lisboa / 18:00 ET) — Vancouver
//   Grupo A: México vs Coreia do Sul (02:00 Lisboa 19jun / 21:00 ET) — Guadalajara
const fallbackMatches: LiveMatch[] = [
  // República Checa vs África do Sul — Grupo A — 17:00 Lisboa (12:00 ET)
  { id: 537501, homeTeam: "República Checa", awayTeam: "África do Sul", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 17:00", league: "FIFA Mundial 2026 — Grupo A", leagueId: 2000 },
  // Suíça vs Bósnia e Herzegovina — Grupo B — 20:00 Lisboa (15:00 ET)
  { id: 537502, homeTeam: "Suíça", awayTeam: "Bósnia e Herzegovina", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "FIFA Mundial 2026 — Grupo B", leagueId: 2000 },
  // Canadá vs Qatar — Grupo B — 23:00 Lisboa (18:00 ET)
  { id: 537503, homeTeam: "Canadá", awayTeam: "Qatar", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 23:00", league: "FIFA Mundial 2026 — Grupo B", leagueId: 2000 },
  // México vs Coreia do Sul — Grupo A — 02:00 Lisboa 19jun (21:00 ET)
  { id: 537504, homeTeam: "México", awayTeam: "Coreia do Sul", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 02:00", league: "FIFA Mundial 2026 — Grupo A", leagueId: 2000 },
  // Resultados de ontem (17/06)
  { id: 537404, homeTeam: "Inglaterra", awayTeam: "Croácia", homeScore: 4, awayScore: 2, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — Grupo L", leagueId: 2000 },
  { id: 537403, homeTeam: "Portugal", awayTeam: "RD Congo", homeScore: 1, awayScore: 1, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — Grupo K", leagueId: 2000 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "República Checa", awayTeam: "África do Sul",
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
        // Filtrar jogos terminados — só mostrar ao vivo e agendados
        const activeMatches = allMatches.filter(m => m.status !== "FIM");
        const displayMatches = activeMatches.length > 0 ? activeMatches : allMatches;

        // Ordenar: 1º jogos com tips, 2º ao vivo, 3º por hora
        const sorted = displayMatches.sort((a, b) => {
          const aHasTip = TODAYS_TIP_TEAMS.some(t => a.homeTeam.includes(t) || a.awayTeam.includes(t)) ? 0 : 1;
          const bHasTip = TODAYS_TIP_TEAMS.some(t => b.homeTeam.includes(t) || b.awayTeam.includes(t)) ? 0 : 1;
          if (aHasTip !== bHasTip) return aHasTip - bHasTip;
          const aLive = a.status === "AO VIVO" ? 0 : 1;
          const bLive = b.status === "AO VIVO" ? 0 : 1;
          if (aLive !== bLive) return aLive - bLive;
          // Ordenar por hora (extrair HH:MM do status)
          const aTime = a.status.match(/(\d{2}):(\d{2})/);
          const bTime = b.status.match(/(\d{2}):(\d{2})/);
          if (aTime && bTime) {
            return (parseInt(aTime[1]) * 60 + parseInt(aTime[2])) - (parseInt(bTime[1]) * 60 + parseInt(bTime[2]));
          }
          return 0;
        });

        setMatches(sorted.slice(0, 12));
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
    } catch (err) {
      console.error("Error fetching live scores:", err);
      setError("Erro ao carregar jogos");
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchLiveScores();
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchLiveScores, 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchLiveScores]);

  return { matches, featured, isLive, loading, error, refresh: fetchLiveScores };
}
