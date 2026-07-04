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

// Jogos com tips hoje (04/07/2026) — aparecem primeiro
const TODAYS_TIP_TEAMS = [
  "Canadá", "Marrocos", "Canada", "Morocco",
  "Paraguai", "França", "Paraguay", "France",
  "Brasil", "Noruega", "Brazil", "Norway",
  "México", "Inglaterra", "Mexico", "England",
];

// Fallback data com jogos reais (atualizado 04/07/2026)
// NOTA: Sábado — Dia 24 do Mundial 2026:
// Resultados de ontem (03/07):
//   16 avos: Argentina 3-2 Cabo Verde (FIM — prolongamento) — Messi x2, Martínez
//   16 avos: Colômbia 2-0 Gana (FIM) — Díaz, James Rodriguez
//   16 avos: Egito elimina Austrália nos penáltis (1-1 aet, 4-2 pen)
// Jogos de hoje (04/07) — Oitavos de Final:
//   Oitavos: Canadá vs Marrocos (18:00 UTC) — NRG Stadium, Houston
//   Oitavos: Paraguai vs França (22:00 UTC) — Lincoln Financial Field, Philadelphia
// Próximos jogos (05-06 jul):
//   05 jul: Brasil vs Noruega (20:00 UTC)
//   06 jul: México vs Inglaterra (02:00 UTC)
const fallbackMatches: LiveMatch[] = [
  // Jogos de hoje (04/07) — Oitavos de Final
  { id: 537376, homeTeam: "Canadá", awayTeam: "Marrocos", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 19:00", league: "FIFA Mundial 2026 — Oitavos de Final", leagueId: 2000 },
  { id: 537375, homeTeam: "Paraguai", awayTeam: "França", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 23:00", league: "FIFA Mundial 2026 — Oitavos de Final", leagueId: 2000 },
  // Resultados de ontem (03/07) — 16 avos de Final
  { id: 538007, homeTeam: "Argentina", awayTeam: "Cabo Verde", homeScore: 3, awayScore: 2, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  { id: 538008, homeTeam: "Colômbia", awayTeam: "Gana", homeScore: 2, awayScore: 0, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  { id: 538006, homeTeam: "Austrália", awayTeam: "Egito", homeScore: 1, awayScore: 1, minute: 0, status: "FIM (pen)", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  // Resultados anteriores — 16 avos de Final
  { id: 537420, homeTeam: "Espanha", awayTeam: "Áustria", homeScore: 3, awayScore: 0, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  { id: 537419, homeTeam: "Portugal", awayTeam: "Croácia", homeScore: 2, awayScore: 1, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  { id: 537421, homeTeam: "EUA", awayTeam: "Bósnia-Herzegovina", homeScore: 2, awayScore: 0, minute: 0, status: "FIM", league: "FIFA Mundial 2026 — 16 Avos de Final", leagueId: 2000 },
  // Oitavos de Final (próximos dias)
  { id: 538009, homeTeam: "Brasil", awayTeam: "Noruega", homeScore: 0, awayScore: 0, minute: 0, status: "5 JUL", league: "FIFA Mundial 2026 — Oitavos de Final", leagueId: 2000 },
  { id: 538010, homeTeam: "México", awayTeam: "Inglaterra", homeScore: 0, awayScore: 0, minute: 0, status: "6 JUL", league: "FIFA Mundial 2026 — Oitavos de Final", leagueId: 2000 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Canadá", awayTeam: "Marrocos",
  homeScore: 0, awayScore: 0,
  stats: {
    possession: [52, 48], shots: [0, 0], shotsOnTarget: [0, 0],
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
