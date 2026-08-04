import { useState, useEffect } from 'react';

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

// Equipas em destaque e com tips de apostas (4 de agosto de 2026)
export const TODAYS_TIP_TEAMS = [
  "Sparta Prague",
  "Lyon",
  "Union SG",
  "Bodø/Glimt",
  "Dinamo Zagreb",
  "Kauno Žalgiris",
  "Hapoel Be'er Sheva",
  "Red Star",
  "Mjällby",
  "Slovan Bratislava",
  "Levski Sofia",
  "Kairat"
];

const TODAYS_FEATURED_TEAMS = TODAYS_TIP_TEAMS;

// Jogos de 4 de agosto de 2026 verificados. Horas de início de acordo com a BBC (hora do Reino Unido / Lisboa).
const fallbackMatches: LiveMatch[] = [
  { id: 4001, homeTeam: "Sparta Prague", awayTeam: "Lyon", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4002, homeTeam: "Union SG", awayTeam: "Bodø/Glimt", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4003, homeTeam: "Dinamo Zagreb", awayTeam: "Kauno Žalgiris", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4004, homeTeam: "Hapoel Be'er Sheva", awayTeam: "Red Star", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:30", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4005, homeTeam: "Mjällby", awayTeam: "Slovan Bratislava", homeScore: null, awayScore: null, minute: 0, status: "HOJE 17:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4006, homeTeam: "Levski Sofia", awayTeam: "Kairat", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:30", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4007, homeTeam: "Olympiakos", awayTeam: "NEC", homeScore: null, awayScore: null, minute: 0, status: "HOJE 19:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4008, homeTeam: "Ararat-Armenia", awayTeam: "Celje", homeScore: null, awayScore: null, minute: 0, status: "HOJE 17:00", league: "UEFA Champions League (Q)", leagueId: 2001 },
  { id: 4009, homeTeam: "Shamrock Rovers", awayTeam: "Egnatia", homeScore: null, awayScore: null, minute: 0, status: "HOJE 20:00", league: "UEFA Europa League (Q)", leagueId: 2014 },
  { id: 4010, homeTeam: "Jeju FC", awayTeam: "Bayern Munich", homeScore: null, awayScore: null, minute: 0, status: "HOJE 12:00", league: "Club Friendlies", leagueId: 0 }
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Sparta Prague",
  awayTeam: "Lyon",
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
