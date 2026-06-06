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

// Jogos com tips hoje (06/06/2026) — aparecem primeiro
const TODAYS_TIP_TEAMS = [
  "Portugal", "Chile",
  "EUA", "Alemanha",
  "Brasil", "Egito",
  "Argentina", "Honduras",
  "Inglaterra", "Nova Zelândia",
  "Bélgica", "Tunísia",
];

// Fallback data com jogos reais (atualizado 06/06/2026)
// NOTA: Sábado — Amistosos Internacionais (Preparação Mundial 2026)
const fallbackMatches: LiveMatch[] = [
  // JOGO PRINCIPAL — EUA vs Alemanha (Soldier Field, Chicago)
  { id: 5000001, homeTeam: "EUA", awayTeam: "Alemanha", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 18:30", league: "Amistoso Internacional", leagueId: 0 },
  // Portugal vs Chile — Estádio Nacional do Jamor
  { id: 5000002, homeTeam: "Portugal", awayTeam: "Chile", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "Amistoso Internacional", leagueId: 0 },
  // Brasil vs Egito (sem Neymar)
  { id: 5000003, homeTeam: "Brasil", awayTeam: "Egito", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 23:00", league: "Amistoso Internacional", leagueId: 0 },
  // Argentina vs Honduras
  { id: 5000004, homeTeam: "Argentina", awayTeam: "Honduras", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 00:00", league: "Amistoso Internacional", leagueId: 0 },
  // Inglaterra vs Nova Zelândia (Raymond James Stadium, Tampa)
  { id: 5000005, homeTeam: "Inglaterra", awayTeam: "Nova Zelândia", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 21:00", league: "Amistoso Internacional", leagueId: 0 },
  // Bélgica vs Tunísia
  { id: 5000006, homeTeam: "Bélgica", awayTeam: "Tunísia", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 14:00", league: "Amistoso Internacional", leagueId: 0 },
  // Suíça vs Austrália
  { id: 5000007, homeTeam: "Suíça", awayTeam: "Austrália", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "Amistoso Internacional", leagueId: 0 },
  // Escócia vs Bolívia
  { id: 5000008, homeTeam: "Escócia", awayTeam: "Bolívia", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 21:00", league: "Amistoso Internacional", leagueId: 0 },
  // Venezuela vs Turquia
  { id: 5000009, homeTeam: "Venezuela", awayTeam: "Turquia", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "Amistoso Internacional", leagueId: 0 },
  // Panamá vs Bósnia-Herzegovina
  { id: 5000010, homeTeam: "Panamá", awayTeam: "Bósnia-Herzegovina", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "Amistoso Internacional", leagueId: 0 },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "EUA", awayTeam: "Alemanha",
  homeScore: 0, awayScore: 0,
  stats: {
    possession: [48, 52], shots: [0, 0], shotsOnTarget: [0, 0],
    corners: [0, 0], fouls: [0, 0],
  },
};

const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";
const CORS_PROXY = "https://corsproxy.io/?";

export function useLiveScores(apiKey?: string) {
  const [matches, setMatches] = useState<LiveMatch[]>(fallbackMatches);
  const [featured, setFeatured] = useState<FeaturedMatchData>(fallbackFeatured);
  const [isLive, setIsLive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveScores = useCallback(async () => {
    const key = apiKey || import.meta.env.VITE_FOOTBALL_DATA_KEY;
    if (!key) {
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(true);
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
        setIsLive(true);
      }
    } catch (err) {
      console.error("Error fetching live scores:", err);
      setError("Erro ao carregar jogos");
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
      setIsLive(true);
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
