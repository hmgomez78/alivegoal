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
}

export interface FeaturedMatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  stats: {
    possession: [number, number];
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
  };
}

interface FootballDataResponse {
  matches: Array<{
    id: number;
    competition?: { id: number; name: string };
    homeTeam: { name: string; shortName?: string };
    awayTeam: { name: string; shortName?: string };
    status: string;
    utcDate: string;
    score?: {
      fullTime?: { home: number | null; away: number | null };
    };
  }>;
}

const TODAYS_TIP_TEAMS = ['Villarreal', 'Celta Vigo', 'Borussia M.Gladbach', 'Bayer Leverkusen', 'PSG', 'Montpellier', 'Sevilla', 'Valencia', 'Getafe', 'Real Sociedad'];

const fallbackMatches: LiveMatch[] = [
  { id: 9901, homeTeam: 'Villarreal', awayTeam: 'Celta Vigo', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 20:30', league: 'La Liga' },
  { id: 9902, homeTeam: 'Borussia M.Gladbach', awayTeam: 'Bayer Leverkusen', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 19:30', league: 'Bundesliga' },
  { id: 9903, homeTeam: 'PSG', awayTeam: 'Montpellier', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 19:45', league: 'Ligue 1' },
  { id: 9904, homeTeam: 'Sevilla', awayTeam: 'Villarreal', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 20:30', league: 'La Liga' },
  { id: 9905, homeTeam: 'Getafe', awayTeam: 'Real Sociedad', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 18:00', league: 'La Liga' },
  { id: 9906, homeTeam: 'Sheffield Wednesday', awayTeam: 'Leeds United', homeScore: null, awayScore: null, minute: 0, status: 'HOJE 20:00', league: 'Championship' }
];

const fallbackFeatured: FeaturedMatchData = {
  homeTeam: 'Villarreal',
  awayTeam: 'Celta Vigo',
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
