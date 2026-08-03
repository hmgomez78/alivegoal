import { useState, useEffect } from "react";

export interface LiveMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  minute: number;
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

interface FootballDataMatch {
  id: number;
  status: string;
  utcDate: string;
  homeTeam: { shortName?: string; name: string };
  awayTeam: { shortName?: string; name: string };
  score?: { fullTime?: { home?: number | null; away?: number | null } };
  competition?: { name?: string; id?: number };
}

interface FootballDataResponse {
  matches?: FootballDataMatch[];
}

// Equipas em destaque e com tips de apostas (3 de agosto de 2026)
export const TODAYS_TIP_TEAMS = [
  "Celtic",
  "Dundee",
  "Shakhtar Donetsk",
  "Kudrivka",
  "SJK",
  "HJK",
  "Djurgården",
  "Västerås"
];

const TODAYS_FEATURED_TEAMS = TODAYS_TIP_TEAMS;

// Jogos de 3 de agosto de 2026 verificados em BBC Sport e Soccerbase. Horas em Portugal continental.
const fallbackMatches: LiveMatch[] = [
  { id: 3001, homeTeam: "Celtic", awayTeam: "Dundee", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:30", league: "Scottish Premiership", leagueId: 55 },
  { id: 3002, homeTeam: "Shakhtar Donetsk", awayTeam: "Kudrivka", homeScore: null, awayScore: null, minute: 0, status: "HOJE 16:00", league: "Ukrainian Premier League", leagueId: 88 },
  { id: 3003, homeTeam: "SJK", awayTeam: "HJK", homeScore: null, awayScore: null, minute: 0, status: "HOJE 17:00", league: "Veikkausliiga", leagueId: 244 },
  { id: 3004, homeTeam: "Djurgården", awayTeam: "Västerås", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Swedish Allsvenskan", leagueId: 113 },
  { id: 3005, homeTeam: "Halmstad", awayTeam: "Sirius", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Swedish Allsvenskan", leagueId: 113 },
  { id: 3006, homeTeam: "OB", awayTeam: "Sønderjyske", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Danish Superliga", leagueId: 119 },
  { id: 3007, homeTeam: "Cracovia", awayTeam: "Pogoń Szczecin", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Polish Ekstraklasa", leagueId: 106 },
  { id: 3008, homeTeam: "York City", awayTeam: "Crawley Town", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:30", league: "English League Cup", leagueId: 20 },
  { id: 3009, homeTeam: "Železničar Pančevo", awayTeam: "Mladost Lučani", homeScore: null, awayScore: null, minute: 0, status: "HOJE 20:00", league: "Serbian Super Liga", leagueId: 57 }
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Celtic",
  awayTeam: "Dundee",
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

export function useLiveScores() {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [featured, setFeatured] = useState<FeaturedMatchData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
      if (!apiKey) {
        console.warn("No API key found, using fallback live scores.");
        setMatches(fallbackMatches);
        setFeatured(fallbackFeatured);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/proxy-football-data?endpoint=matches", {
        headers: {
          "X-Auth-Token": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = (await response.json()) as FootballDataResponse;

      if (!data.matches || data.matches.length === 0) {
        setMatches(fallbackMatches);
        setFeatured(fallbackFeatured);
        setLoading(false);
        return;
      }

      const mappedMatches: LiveMatch[] = data.matches.map((m) => {
        let statusStr = "HOJE";
        let minute = 0;

        if (m.status === "IN_PLAY" || m.status === "PAUSED") {
          statusStr = "AO VIVO";
          minute = 45;
        } else if (m.status === "FINISHED") {
          statusStr = "FIM";
          minute = 90;
        } else if (m.status === "TIMED" || m.status === "SCHEDULED") {
          const dateObj = new Date(m.utcDate);
          statusStr = `HOJE ${dateObj.getHours().toString().padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;
        }

        return {
          id: m.id,
          homeTeam: m.homeTeam.shortName || m.homeTeam.name,
          awayTeam: m.awayTeam.shortName || m.awayTeam.name,
          homeScore: m.score?.fullTime?.home ?? null,
          awayScore: m.score?.fullTime?.away ?? null,
          minute,
          status: statusStr,
          league: m.competition?.name || "Competição",
          leagueId: m.competition?.id,
        };
      });

      mappedMatches.sort((a, b) => {
        const aIsFeatured = TODAYS_FEATURED_TEAMS.includes(a.homeTeam) || TODAYS_FEATURED_TEAMS.includes(a.awayTeam);
        const bIsFeatured = TODAYS_FEATURED_TEAMS.includes(b.homeTeam) || TODAYS_FEATURED_TEAMS.includes(b.awayTeam);

        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        if (a.status === "AO VIVO" && b.status !== "AO VIVO") return -1;
        if (a.status !== "AO VIVO" && b.status === "AO VIVO") return 1;
        return 0;
      });

      setMatches(mappedMatches);

      const liveFeatured = mappedMatches.find((m) => m.status === "AO VIVO" && (TODAYS_FEATURED_TEAMS.includes(m.homeTeam) || TODAYS_FEATURED_TEAMS.includes(m.awayTeam)));
      const upcomingFeatured = mappedMatches.find((m) => m.status.startsWith("HOJE") && (TODAYS_FEATURED_TEAMS.includes(m.homeTeam) || TODAYS_FEATURED_TEAMS.includes(m.awayTeam)));
      const bestMatch = liveFeatured || upcomingFeatured || mappedMatches[0];

      if (bestMatch) {
        setFeatured({
          homeTeam: bestMatch.homeTeam,
          awayTeam: bestMatch.awayTeam,
          homeScore: bestMatch.homeScore || 0,
          awayScore: bestMatch.awayScore || 0,
          stats: {
            possession: [50, 50],
            shots: [0, 0],
            shotsOnTarget: [0, 0],
            corners: [0, 0],
            fouls: [0, 0],
          },
        });
      } else {
        setFeatured(fallbackFeatured);
      }
    } catch (error) {
      console.error("Error fetching live scores:", error);
      setMatches(fallbackMatches);
      setFeatured(fallbackFeatured);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  const isLive = matches.some((match) => match.status === "AO VIVO");

  return { matches, featured, loading, isLive, refresh: fetchScores };
}
