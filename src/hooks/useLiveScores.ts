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

// Fallback data com jogos reais (atualizado 06/05/2026)
const fallbackMatches: LiveMatch[] = [
  { id: 1540844, homeTeam: "Bayern München", awayTeam: "Paris Saint Germain", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 20:00", league: "UEFA Champions League", leagueId: 2, homeTeamLogo: "https://media.api-sports.io/football/teams/157.png", awayTeamLogo: "https://media.api-sports.io/football/teams/85.png" },
  { id: 1540843, homeTeam: "Arsenal", awayTeam: "Atletico Madrid", homeScore: 3, awayScore: 2, minute: 0, status: "FIM", league: "UEFA Champions League", leagueId: 2, homeTeamLogo: "https://media.api-sports.io/football/teams/42.png", awayTeamLogo: "https://media.api-sports.io/football/teams/530.png" },
  { id: 1540900, homeTeam: "Al Ahly", awayTeam: "Enppi", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 17:00", league: "Premier League Egito", leagueId: 233, homeTeamLogo: "https://media.api-sports.io/football/teams/1028.png", awayTeamLogo: "https://media.api-sports.io/football/teams/1040.png" },
  { id: 1540901, homeTeam: "Smouha SC", awayTeam: "Zamalek SC", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 17:00", league: "Premier League Egito", leagueId: 233, homeTeamLogo: "https://media.api-sports.io/football/teams/1044.png", awayTeamLogo: "https://media.api-sports.io/football/teams/1029.png" },
  { id: 1540902, homeTeam: "Stellenbosch", awayTeam: "Orlando Pirates", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 17:30", league: "Premier Soccer League", leagueId: 288, homeTeamLogo: "https://media.api-sports.io/football/teams/2907.png", awayTeamLogo: "https://media.api-sports.io/football/teams/2896.png" },
  { id: 1457749, homeTeam: "Azam", awayTeam: "Namungo", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 15:30", league: "Ligi kuu Bara", leagueId: 567, homeTeamLogo: "https://media.api-sports.io/football/teams/6446.png", awayTeamLogo: "https://media.api-sports.io/football/teams/12190.png" },
  { id: 1542135, homeTeam: "Baniyas SC", awayTeam: "Al-Dhafra", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 16:45", league: "Pro League UAE", leagueId: 301, homeTeamLogo: "https://media.api-sports.io/football/teams/2875.png", awayTeamLogo: "https://media.api-sports.io/football/teams/2880.png" },
  { id: 1541040, homeTeam: "Suhul Shire", awayTeam: "Mebrat Hayl", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 15:00", league: "Premier League Etiópia", leagueId: 363, homeTeamLogo: "https://media.api-sports.io/football/teams/4121.png", awayTeamLogo: "https://media.api-sports.io/football/teams/4126.png" },
  { id: 1542493, homeTeam: "Saint Eloi Lupopo", awayTeam: "TP Mazembe", homeScore: 1, awayScore: 0, minute: 45, status: "INT", league: "Ligue 1 Congo", leagueId: 424, homeTeamLogo: "https://media.api-sports.io/football/teams/8578.png", awayTeamLogo: "https://media.api-sports.io/football/teams/6435.png" },
  { id: 1540903, homeTeam: "Ceramica Cleopatra", awayTeam: "Pyramids FC", homeScore: 0, awayScore: 0, minute: 0, status: "HOJE 17:00", league: "Premier League Egito", leagueId: 233, homeTeamLogo: "https://media.api-sports.io/football/teams/1041.png", awayTeamLogo: "https://media.api-sports.io/football/teams/1031.png" },
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Bayern München", awayTeam: "Paris Saint Germain",
  homeScore: 0, awayScore: 0,
  stats: {
    possession: [58, 42], shots: [0, 0], shotsOnTarget: [0, 0],
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
