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

// Fallback logic and initial state setup
export const TODAYS_TIP_TEAMS = [
  "Lincoln Red Imps",
  "Mjällby AIF",
  "Apollon Limassol",
  "Dila Gori",
  "Riga FC",
  "Vardar",
  "Dinamo Zagreb",
  "FC Thun",
  "NK Celje",
  "Egnatia"
];

const TODAYS_FEATURED_TEAMS = TODAYS_TIP_TEAMS;

const fallbackMatches: LiveMatch[] = [
  { id: 2001, homeTeam: "Lincoln Red Imps", awayTeam: "Mjällby AIF", homeScore: null, awayScore: null, minute: 0, status: "HOJE 16:00", league: "Liga dos Campeões (Q)", leagueId: 2 },
  { id: 2002, homeTeam: "Apollon Limassol", awayTeam: "Dila Gori", homeScore: null, awayScore: null, minute: 0, status: "HOJE 17:00", league: "Liga dos Campeões (Q)", leagueId: 2 },
  { id: 2003, homeTeam: "Riga FC", awayTeam: "Vardar", homeScore: null, awayScore: null, minute: 0, status: "HOJE 17:00", league: "Liga dos Campeões (Q)", leagueId: 2 },
  { id: 2004, homeTeam: "Dinamo Zagreb", awayTeam: "FC Thun", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:00", league: "Liga dos Campeões (Q)", leagueId: 2 },
  { id: 2005, homeTeam: "NK Celje", awayTeam: "Egnatia", homeScore: null, awayScore: null, minute: 0, status: "HOJE 18:15", league: "Liga dos Campeões (Q)", leagueId: 2 }
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: "Dinamo Zagreb",
  awayTeam: "FC Thun",
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

      // 1) Fetch today's matches
      const response = await fetch("/api/proxy-football-data?endpoint=matches", {
        headers: {
          "X-Auth-Token": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      if (!data.matches || data.matches.length === 0) {
        setMatches(fallbackMatches);
        setFeatured(fallbackFeatured);
        setLoading(false);
        return;
      }

      // 2) Map matches
      let mappedMatches: LiveMatch[] = data.matches.map((m: any) => {
        let statusStr = "HOJE";
        let minute = 0;

        if (m.status === "IN_PLAY" || m.status === "PAUSED") {
          statusStr = "AO VIVO";
          minute = 45; // simplified
        } else if (m.status === "FINISHED") {
          statusStr = "TERMINADO";
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

      // 3) Sort matches to prioritize featured/tip teams
      mappedMatches.sort((a, b) => {
        const aIsFeatured = TODAYS_FEATURED_TEAMS.includes(a.homeTeam) || TODAYS_FEATURED_TEAMS.includes(a.awayTeam);
        const bIsFeatured = TODAYS_FEATURED_TEAMS.includes(b.homeTeam) || TODAYS_FEATURED_TEAMS.includes(b.awayTeam);

        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;

        // If both are featured (or neither), sort by status (live first)
        if (a.status === "AO VIVO" && b.status !== "AO VIVO") return -1;
        if (a.status !== "AO VIVO" && b.status === "AO VIVO") return 1;

        return 0;
      });

      setMatches(mappedMatches);

      // 4) Set featured match
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

  return { matches, featured, loading };
}
