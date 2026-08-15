import { useState, useEffect, useCallback } from 'react';

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

// Equipas em destaque e com tips editoriais de 15 de agosto de 2026.
export const TODAYS_TIP_TEAMS = [
  "Deportivo Alavés",
  "Getafe",
  "Sevilla",
  "Rayo Vallecano",
  "Nashville SC",
  "Inter Miami",
  "Bolton Wanderers",
  "Preston North End",
  "Sheffield United",
  "Birmingham City"
];

// Jogos confirmados para 15 de agosto de 2026. Horas de Portugal continental.
// Fontes de agenda: Sky Sports, Soccerbase, ESPN e Football Whispers. Os horários podem sofrer alterações.
const fallbackMatches: LiveMatch[] = [
  { id: 9501, homeTeam: 'Bolton Wanderers', awayTeam: 'Preston North End', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 12:30', league: 'EFL Championship — Jornada 1' },
  { id: 9502, homeTeam: 'Charlton Athletic', awayTeam: 'Derby County', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 15:00', league: 'EFL Championship — Jornada 1' },
  { id: 9503, homeTeam: 'Middlesbrough', awayTeam: 'Lincoln City', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 15:00', league: 'EFL Championship — Jornada 1' },
  { id: 9504, homeTeam: 'Sheffield United', awayTeam: 'Birmingham City', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 17:30', league: 'EFL Championship — Jornada 1' },
  { id: 9505, homeTeam: 'Deportivo Alavés', awayTeam: 'Getafe', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 18:30', league: 'La Liga — Jornada 1' },
  { id: 9506, homeTeam: 'Sevilla', awayTeam: 'Rayo Vallecano', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 20:30', league: 'La Liga — Jornada 1' },
  { id: 9507, homeTeam: 'Nashville SC', awayTeam: 'Inter Miami', homeScore: null, awayScore: null, minute: 0, status: '16 AGO 01:30', league: 'MLS — Conferência Este' },
  { id: 9508, homeTeam: 'LAFC', awayTeam: 'San Diego FC', homeScore: null, awayScore: null, minute: 0, status: '16 AGO 03:30', league: 'MLS — Conferência Oeste' }
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: 'Deportivo Alavés',
  awayTeam: 'Getafe',
  homeScore: 0,
  awayScore: 0,
  stats: {
    possession: [50, 50],
    shots: [0, 0],
    shotsOnTarget: [0, 0],
    corners: [0, 0],
    fouls: [0, 0]
  }
};

export function useLiveScores() {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [featuredMatch, setFeaturedMatch] = useState<FeaturedMatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
      if (!API_KEY) {
        setMatches(fallbackMatches);
        setFeaturedMatch(fallbackFeatured);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/football-data', {
        headers: { 'X-Auth-Token': API_KEY }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: FootballDataResponse = await response.json();

      if (!data.matches || data.matches.length === 0) {
        setMatches(fallbackMatches);
        setFeaturedMatch(fallbackFeatured);
        setLoading(false);
        return;
      }

      const liveMatches: LiveMatch[] = data.matches.map(m => {
        let status = 'AGENDADO';
        if (m.status === 'IN_PLAY' || m.status === 'PAUSED') {
          status = 'AO VIVO';
        } else if (m.status === 'FINISHED') {
          status = 'TERMINADO';
        } else if (m.status === 'TIMED' || m.status === 'SCHEDULED') {
          const date = new Date(m.utcDate);
          status = `HOJE ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }

        return {
          id: m.id,
          homeTeam: m.homeTeam.shortName || m.homeTeam.name,
          awayTeam: m.awayTeam.shortName || m.awayTeam.name,
          homeScore: m.score?.fullTime?.home ?? null,
          awayScore: m.score?.fullTime?.away ?? null,
          minute: 0,
          status,
          league: m.competition?.name || 'Competição',
          leagueId: m.competition?.id
        };
      });

      const featuredTeamsSet = new Set(TODAYS_TIP_TEAMS.map(t => t.toLowerCase()));

      const sortedMatches = liveMatches.sort((a, b) => {
        const aIsFeatured = featuredTeamsSet.has(a.homeTeam.toLowerCase()) || featuredTeamsSet.has(a.awayTeam.toLowerCase());
        const bIsFeatured = featuredTeamsSet.has(b.homeTeam.toLowerCase()) || featuredTeamsSet.has(b.awayTeam.toLowerCase());

        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        return 0;
      });

      setMatches(sortedMatches.length > 0 ? sortedMatches : fallbackMatches);

      const activeMatch = sortedMatches.find(m => m.status === 'AO VIVO') ||
                          sortedMatches.find(m => m.status.startsWith('HOJE')) ||
                          sortedMatches[0];

      if (activeMatch) {
        setFeaturedMatch({
          homeTeam: activeMatch.homeTeam,
          awayTeam: activeMatch.awayTeam,
          homeScore: activeMatch.homeScore || 0,
          awayScore: activeMatch.awayScore || 0,
          stats: {
            possession: [50, 50],
            shots: [0, 0],
            shotsOnTarget: [0, 0],
            corners: [0, 0],
            fouls: [0, 0]
          }
        });
      } else {
        setFeaturedMatch(fallbackFeatured);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching live scores:', err);
      setMatches(fallbackMatches);
      setFeaturedMatch(fallbackFeatured);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, [fetchScores]);

  return { matches, featuredMatch, loading, error, refresh: fetchScores };
}
