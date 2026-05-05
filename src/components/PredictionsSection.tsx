import { useState } from "react";
import { bookmakers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, RefreshCw, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePredictions } from "@/hooks/usePredictions";

const tabs = ["Hoje", "Amanhã", "Esta Semana"] as const;

const PredictionsSection = () => {
  const [activeTab, setActiveTab] = useState<'Hoje' | 'Amanhã' | 'Esta Semana'>("Hoje");
  const { predictions, loading, refresh } = usePredictions(activeTab);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getMarketBadgeColor = (market: string) => {
    switch (market) {
      case 'Resultado Final': return 'bg-blue-500/20 text-blue-400';
      case 'Mais de 2.5': return 'bg-purple-500/20 text-purple-400';
      case 'Menos de 2.5': return 'bg-indigo-500/20 text-indigo-400';
      case 'Ambas Marcam': return 'bg-pink-500/20 text-pink-400';
      case 'Dupla Hipótese': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <section id="predictions" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">Previsões de Futebol</h2>
              <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                <Zap size={10} />
                AO VIVO
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              Previsões geradas por IA com dados em tempo real — atualizadas a cada 30 minutos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Atualizar
            </button>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="bg-secondary">
                {tabs.map((t) => (
                  <TabsTrigger key={t} value={t} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="gradient-card rounded-xl border border-border p-5">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="mb-2 h-3 w-24" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : (
            predictions.map((pred) => {
              const bk = bookmakers[0]; // Default bookmaker for CTA
              return (
                <div key={pred.id} className="gradient-card rounded-xl border border-border p-5 transition-all hover:border-primary/40 hover:glow-emerald">
                  {/* Header - Liga & Market */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {pred.leagueLogo && (
                        <img src={pred.leagueLogo} alt={pred.league} className="w-4 h-4 rounded-sm" />
                      )}
                      <span className="text-xs text-muted-foreground">{pred.league}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getMarketBadgeColor(pred.market)}`}>
                      {pred.market}
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {pred.homeLogo && (
                        <img src={pred.homeLogo} alt={pred.homeTeam} className="w-6 h-6" />
                      )}
                      <span className="font-semibold text-sm">{pred.homeTeam}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-right">{pred.awayTeam}</span>
                      {pred.awayLogo && (
                        <img src={pred.awayLogo} alt={pred.awayTeam} className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Date/Time */}
                  <div className="mt-2 text-xs text-muted-foreground">{pred.date}, {pred.time}</div>

                  {/* Prediction & Odds */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded bg-accent/20 px-2 py-1 text-xs font-semibold text-accent">
                      {pred.prediction}
                    </span>
                    <span className="text-sm font-bold text-primary">{pred.odds.toFixed(2)}</span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Confiança</span>
                      <span>{pred.confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className={`h-2 rounded-full transition-all ${getConfidenceColor(pred.confidence)}`}
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Percentages */}
                  <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                    <span>Casa {pred.homePercent}%</span>
                    <span>Empate {pred.drawPercent}%</span>
                    <span>Fora {pred.awayPercent}%</span>
                  </div>

                  {/* CTA Button */}
                  <Button size="sm" className="mt-4 w-full glow-emerald" asChild>
                    <a href={bk?.url || "#bookmakers"} target="_blank" rel="noopener noreferrer">
                      <TrendingUp size={14} /> Apostar Agora
                    </a>
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {/* CTA para o canal Telegram */}
        <div className="mt-8 text-center">
          <a
            href="https://t.me/NewsForTipsIQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc]/10 px-6 py-3 text-sm font-semibold text-[#0088cc] transition-all hover:bg-[#0088cc]/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            Junta-te ao Canal AliveGoal no Telegram para mais tips
          </a>
        </div>
      </div>
    </section>
  );
};

export default PredictionsSection;
