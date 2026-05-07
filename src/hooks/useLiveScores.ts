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

// IDs das ligas principais na API-Football
const PRIORITY_LEAGUES = [
  39,   // Premier League (Inglaterra)
  140,  // La Liga (Espanha)
  135,  // Serie A (Itália)
  78,   // Bundesliga (Alemanha)
  61,   // Ligue 1 (França)
  94,   // Liga Portugal
  2,    // Champions League
  3,    // Europa League
  848,  // Conference League
  71,   // Brasileirão Serie A
  253,  // MLS
  1,    // World Cup
  4,    // Euro
  6,    // Copa África
  10,   // Nations League
  307,  // Saudi Pro League
  233,  // Premier League Egito
  551,  // Girabola (Angola)
  686,  // Moçambola
];

// Fallback data com jogos reais (atualizado 07/05/2026)
const fallbackMatches: LiveMatch[] = [
  // UEFA Europa League — Semi-finais (2ª mão)
  { id: 1550001, homeTeam: "Aston Villa", awayTeam: "Nottingham Forest", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "UEFA Europa League", leagueId: 3, homeTeamLogo: "https://media.api-sports.io/football/teams/66.png", awayTeamLogo: "https://media.api-sports.io/football/teams/65.png" },
  { id: 1550002, homeTeam: "Freiburg", awayTeam: "Sporting Braga", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "UEFA Europa League", leagueId: 3, homeTeamLogo: "https://media.api-sports.io/football/teams/160.png", awayTeamLogo: "https://media.api-sports.io/football/teams/228.png" },
  // UEFA Conference League — Semi-finais (2ª mão)
  { id: 1550003, homeTeam: "Crystal Palace", awayTeam: "Shakhtar Donetsk", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "UEFA Conference League", leagueId: 848, homeTeamLogo: "https://media.api-sports.io/football/teams/52.png", awayTeamLogo: "https://media.api-sports.io/football/teams/2282.png" },
  { id: 1550004, homeTeam: "Strasbourg", awayTeam: "Rayo Vallecano", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "UEFA Conference League", leagueId: 848, homeTeamLogo: "https://media.api-sports.io/football/teams/95.png", awayTeamLogo: "https://media.api-sports.io/football/teams/728.png" },
  // Saudi Pro League
  { id: 1550005, homeTeam: "Al Shabab", awayTeam: "Al Nassr", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 19:00", league: "Saudi Pro League", leagueId: 307, homeTeamLogo: "https://media.api-sports.io/football/teams/2932.png", awayTeamLogo: "https://media.api-sports.io/football/teams/2939.png" },
  // CONMEBOL Libertadores
  { id: 1550006, homeTeam: "Platense", awayTeam: "Peñarol", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 23:00", league: "CONMEBOL Libertadores", leagueId: 13, homeTeamLogo: "https://media.api-sports.io/football/teams/435.png", awayTeamLogo: "https://media.api-sports.io/football/teams/442.png" },
  { id: 1550007, homeTeam: "Mirassol", awayTeam: "LDU Quito", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 23:00", league: "CONMEBOL Libertadores", leagueId: 13, homeTeamLogo: "https://media.api-sports.io/football/teams/1191.png", awayTeamLogo: "https://media.api-sports.io/football/teams/1190.png" },
  // Jogos terminados de hoje
  { id: 1550008, homeTeam: "Deportes Tolima", awayTeam: "Nacional", homeScore: 3, awayScore: 0, minute: 90, status: "FIM", league: "CONMEBOL Libertadores", leagueId: 13, homeTeamLogo: "https://media.api-sports.io/football/teams/1197.png", awayTeamLogo: "https://media.api-sports.io/football/teams/1195.png" },
  { id: 1550009, homeTeam: "Independiente Rivadavia", awayTeam: "Fluminense", homeScore: 1, awayScore: 1, minute: 90, status: "FIM", league: "CONMEBOL Libertadores", leagueId: 13, homeTeamLogo: "https://media.api-sports.io/football/teams/1193.png", awayTeamLogo: "https://media.api-sports.io/football/teams/119.png" },
  { id: 1550010, homeTeam: "Independiente Santa Fe", awayTeam: "Corinthians", homeScore: 1, awayScore: 1, minute: 90, status: "FIM", league: "CONMEBOL Libertadores", leagueId: 13, homeTeamLogo: "https://media.api-sports.io/football/teams/1196.png", awayTeamLogo: "https://media.api-sports.io/football/teams/131.png" },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Aston Villa", awayTeam: "Nottingham Forest",
  homeScore: 0, awayScore: 0,
  stats: {
    possession: [55, 45], shots: [0, 0], shotsOnTarget: [0, 0],
    corners: [0, 0], fouls: [0, 0],
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
      // Primeiro tentar jogos ao vivo
      const url = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/fixtures?live=all`)}`;
      const res = await fetch(url, {
        headers: { "x-apisports-key": key },
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      let fixtures = data?.response || [];

      // Filtrar apenas ligas principais
      let filteredFixtures = fixtures.filter((f: any) =>
        PRIORITY_LEAGUES.includes(f.league.id)
      );

      // Se não há jogos ao vivo das ligas principais, buscar jogos de hoje
      if (filteredFixtures.length === 0) {
        const today = new Date().toISOString().split("T")[0];
        const todayUrl = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/fixtures?date=${today}`)}`;
        const todayRes = await fetch(todayUrl, {
          headers: { "x-apisports-key": key },
        });
        const todayData = await todayRes.json();
        const todayFixtures = todayData?.response || [];

        // Filtrar ligas principais
        filteredFixtures = todayFixtures.filter((f: any) =>
          PRIORITY_LEAGUES.includes(f.league.id)
        );

        // Se ainda não há jogos, usar todos os de hoje (top 15)
        if (filteredFixtures.length === 0) {
          filteredFixtures = todayFixtures.slice(0, 15);
        }

        if (filteredFixtures.length > 0) {
          const mapped = filteredFixtures.slice(0, 15).map((f: any, idx: number) => ({
            id: f.fixture.id || idx,
            homeTeam: f.teams.home.name,
            awayTeam: f.teams.away.name,
            homeScore: f.goals.home ?? 0,
            awayScore: f.goals.away ?? 0,
            minute: f.fixture.status.elapsed || 0,
            status: mapStatus(f.fixture.status.short, f.fixture.status.elapsed),
            league: f.league.name,
            leagueId: f.league.id,
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

      // Mapear jogos ao vivo das ligas principais
      const mapped: LiveMatch[] = filteredFixtures.slice(0, 15).map((f: any, idx: number) => ({
        id: f.fixture.id || idx,
        homeTeam: f.teams.home.name,
        awayTeam: f.teams.away.name,
        homeScore: f.goals.home ?? 0,
        awayScore: f.goals.away ?? 0,
        minute: f.fixture.status.elapsed || 0,
        status: mapStatus(f.fixture.status.short, f.fixture.status.elapsed),
        league: f.league.name,
        leagueId: f.league.id,
        homeTeamLogo: f.teams.home.logo,
        awayTeamLogo: f.teams.away.logo,
      }));

      setMatches(mapped);
      setIsLive(true);

      // Set featured match (primeiro jogo com mais golos)
      const sorted = [...filteredFixtures].sort((a: any, b: any) =>
        ((b.goals.home || 0) + (b.goals.away || 0)) - ((a.goals.home || 0) + (a.goals.away || 0))
      );
      const feat = sorted[0];
      if (feat) {
        const stats = feat.statistics;
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
