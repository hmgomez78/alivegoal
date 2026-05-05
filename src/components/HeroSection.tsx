import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import TeamLogo from "@/components/TeamLogo";
import { useLiveScores } from "@/hooks/useLiveScores";

const HeroSection = () => {
  const { matches, isLive } = useLiveScores();

  return (
    <section className="gradient-hero relative overflow-hidden py-20 md:py-32">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            ALIVEGOAL
            <span className="text-primary"> Previsões</span> de Futebol &amp;
            <span className="text-accent"> Inteligência</span> de Apostas
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Análise de jogos baseada em dados, comparação de odds em tempo real e insights de especialistas — tudo o que precisas para apostar de forma mais inteligente.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="glow-emerald" asChild>
              <a href="#predictions">Ver Previsões</a>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
              <a href="#bookmakers">Comparar Casas de Apostas</a>
            </Button>
          </div>
        </div>

        {/* Mini live widget */}
        <div className="gradient-card rounded-xl border border-border p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Activity size={16} className="animate-pulse-glow" />
            {isLive ? "Jogos ao Vivo" : "Jogos de Hoje"}
            {isLive && (
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                LIVE
              </span>
            )}
          </div>
          <div className="space-y-2">
            {matches.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 text-sm">
                <div className="flex flex-1 items-center gap-2 truncate">
                  {m.homeTeamLogo ? (
                    <img src={m.homeTeamLogo} alt={m.homeTeam} className="h-5 w-5 object-contain" />
                  ) : (
                    <TeamLogo name={m.homeTeam} size="sm" />
                  )}
                  <span className="truncate">{m.homeTeam}</span>
                </div>
                <span className="mx-3 font-display font-bold text-primary">{m.homeScore} - {m.awayScore}</span>
                <div className="flex flex-1 items-center gap-2 justify-end truncate">
                  <span className="truncate text-right">{m.awayTeam}</span>
                  {m.awayTeamLogo ? (
                    <img src={m.awayTeamLogo} alt={m.awayTeam} className="h-5 w-5 object-contain" />
                  ) : (
                    <TeamLogo name={m.awayTeam} size="sm" />
                  )}
                </div>
                <span className="ml-3 rounded bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                  {typeof m.minute === "number" && m.minute > 0 ? `${m.minute}'` : m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
