import { Activity, BarChart3, RefreshCw } from "lucide-react";
import TeamLogo from "@/components/TeamLogo";
import { useLiveScores } from "@/hooks/useLiveScores";
import { Skeleton } from "@/components/ui/skeleton";

const statLabels: Record<string, string> = {
  possession: "Posse de Bola",
  shots: "Remates",
  shotsOnTarget: "Remates à Baliza",
  corners: "Cantos",
  fouls: "Faltas",
};

const LiveScoresSection = () => {
  const { matches, featured, isLive, loading, refresh } = useLiveScores();

  return (
    <section id="live" className="border-y border-border bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">
              <Activity size={28} className="mr-2 inline text-primary animate-pulse-glow" />
              Resultados de Futebol ao Vivo Hoje
              {isLive && (
                <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary align-middle">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Ao Vivo
                </span>
              )}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {isLive ? "Resultados em tempo real" : "Resultados e estatísticas dos jogos"}
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Atualizar
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Lista de jogos ao vivo */}
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="gradient-card rounded-xl border border-border px-5 py-4">
                  <Skeleton className="mb-2 h-3 w-24" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))
            ) : (
              matches.map((m) => (
                <div key={m.id} className="gradient-card flex items-center justify-between rounded-xl border border-border px-5 py-4 transition-colors hover:border-primary/30">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">{m.league}</div>
                    <div className="mt-1 flex items-center gap-3">
                      {m.homeTeamLogo ? (
                        <img src={m.homeTeamLogo} alt={m.homeTeam} className="h-6 w-6 object-contain" />
                      ) : (
                        <TeamLogo name={m.homeTeam} size="sm" />
                      )}
                      <span className="font-semibold">{m.homeTeam}</span>
                      <span className="font-display text-lg font-bold text-primary">{m.homeScore} - {m.awayScore}</span>
                      <span className="font-semibold">{m.awayTeam}</span>
                      {m.awayTeamLogo ? (
                        <img src={m.awayTeamLogo} alt={m.awayTeam} className="h-6 w-6 object-contain" />
                      ) : (
                        <TeamLogo name={m.awayTeam} size="sm" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                      {typeof m.minute === "number" && m.minute > 0 ? `${m.minute}'` : "—"}
                    </span>
                    <span className="mt-1 text-[10px] uppercase text-primary">{m.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Estatísticas do jogo em destaque */}
          <div className="gradient-card rounded-xl border border-border p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <BarChart3 size={16} className="text-accent" /> Estatísticas do Jogo em Destaque
            </div>
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <TeamLogo name={featured.homeTeam} />
                <span className="font-display text-lg font-bold">{featured.homeTeam}</span>
                <span className="mx-2 text-2xl font-bold text-primary">{featured.homeScore} - {featured.awayScore}</span>
                <span className="font-display text-lg font-bold">{featured.awayTeam}</span>
                <TeamLogo name={featured.awayTeam} />
              </div>
            </div>
            {Object.entries(featured.stats).map(([key, [home, away]]) => (
              <div key={key} className="mb-3">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{home}</span>
                  <span>{statLabels[key] || key.replace(/([A-Z])/g, " $1")}</span>
                  <span>{away}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="bg-primary transition-all" style={{ width: `${home + away > 0 ? (home / (home + away)) * 100 : 50}%` }} />
                  <div className="bg-accent transition-all" style={{ width: `${home + away > 0 ? (away / (home + away)) * 100 : 50}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveScoresSection;
