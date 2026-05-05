import { Button } from "@/components/ui/button";
import { Activity, ChevronDown } from "lucide-react";
import TeamLogo from "@/components/TeamLogo";
import { useLiveScores } from "@/hooks/useLiveScores";
import { useState } from "react";

const HeroSection = () => {
  const { matches, isLive } = useLiveScores();
  const [showAll, setShowAll] = useState(false);

  // Mostrar até 10 jogos, ou todos se showAll
  const displayMatches = showAll ? matches : matches.slice(0, 8);

  return (
    <section className="gradient-hero relative overflow-hidden py-16 md:py-28">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative">
        {/* Top section with text */}
        <div className="mb-10 max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-primary">Tips de Apostas</span> Grátis Hoje —
            <span className="text-accent"> Previsões</span> de Futebol com IA
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Tips diárias com análise estatística para Champions League, Premier League, Moçambola e mais. Odds, BTTS, Over/Under e acumuladas — tudo grátis no AliveGoal.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg" className="glow-emerald" asChild>
              <a href="#predictions">Ver Previsões</a>
            </Button>
          </div>
        </div>

        {/* Full-width Jogos de Hoje widget */}
        <div className="gradient-card rounded-xl border border-border p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Activity size={18} className="animate-pulse-glow" />
              <span className="text-lg">{isLive ? "Jogos ao Vivo" : "Jogos de Hoje"}</span>
              {isLive && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  LIVE
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {matches.length} {matches.length === 1 ? "jogo" : "jogos"}
            </span>
          </div>

          {/* Grid de jogos - layout alargado */}
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {displayMatches.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 text-sm transition-colors hover:bg-secondary/80"
              >
                {/* Liga badge */}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">
                    {m.league}
                  </span>
                  <div className="flex items-center gap-2">
                    {m.homeTeamLogo ? (
                      <img src={m.homeTeamLogo} alt={m.homeTeam} className="h-5 w-5 object-contain" />
                    ) : (
                      <TeamLogo name={m.homeTeam} size="sm" />
                    )}
                    <span className="truncate font-medium">{m.homeTeam}</span>
                  </div>
                </div>

                {/* Score */}
                <div className="mx-3 flex flex-col items-center">
                  <span className="font-display text-lg font-bold text-primary">
                    {m.homeScore} - {m.awayScore}
                  </span>
                </div>

                {/* Away team */}
                <div className="flex flex-1 flex-col items-end gap-1">
                  <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                    {typeof m.minute === "number" && m.minute > 0 ? `${m.minute}'` : m.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="truncate text-right font-medium">{m.awayTeam}</span>
                    {m.awayTeamLogo ? (
                      <img src={m.awayTeamLogo} alt={m.awayTeam} className="h-5 w-5 object-contain" />
                    ) : (
                      <TeamLogo name={m.awayTeam} size="sm" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more/less button */}
          {matches.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ChevronDown size={14} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
              {showAll ? "Mostrar menos" : `Ver todos os ${matches.length} jogos`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
