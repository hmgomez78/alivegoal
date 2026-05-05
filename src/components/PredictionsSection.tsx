import { useState } from "react";
import { bookmakers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, RefreshCw, MessageCircle } from "lucide-react";
import TeamLogo from "@/components/TeamLogo";
import { Skeleton } from "@/components/ui/skeleton";
import { useTelegramTips } from "@/hooks/useTelegramTips";

const tabs = ["Hoje", "Amanhã", "Esta Semana"];

const PredictionsSection = () => {
  const [activeTab, setActiveTab] = useState("Hoje");
  const { tips, isLive, loading, refresh } = useTelegramTips();

  const filtered = activeTab === "Hoje"
    ? tips.filter((p) => p.kickoff.startsWith("Hoje"))
    : activeTab === "Amanhã"
    ? tips.filter((p) => p.kickoff.startsWith("Amanhã"))
    : tips;

  const display = filtered.length > 0 ? filtered : tips;

  return (
    <section id="predictions" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">Previsões de Futebol</h2>
              {isLive && (
                <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                  <MessageCircle size={10} />
                  Telegram
                </span>
              )}
            </div>
            <p className="mt-1 text-muted-foreground">
              {isLive
                ? "Tips em tempo real do canal AliveGoal no Telegram"
                : "Previsões geradas por IA com índice de confiança"}
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            display.map((p) => {
              const bk = bookmakers.find((b) => b.id === p.bookmaker);
              return (
                <div key={p.id} className="gradient-card rounded-xl border border-border p-5 transition-all hover:border-primary/40 hover:glow-emerald">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{p.league}</span>
                    {p.source === "telegram" && isLive && (
                      <span className="flex items-center gap-1 text-[10px] text-primary">
                        <MessageCircle size={10} /> Telegram
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <TeamLogo name={p.homeTeam} size="sm" />
                      <span className="font-semibold text-sm">{p.homeTeam}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-right">{p.awayTeam}</span>
                      <TeamLogo name={p.awayTeam} size="sm" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{p.kickoff}</div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded bg-accent/20 px-2 py-1 text-xs font-semibold text-accent">{p.prediction}</span>
                    <span className="text-sm font-bold text-primary">{p.odds}</span>
                  </div>

                  {/* Barra de confiança */}
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Confiança</span>
                      <span>{p.confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${p.confidence}%` }} />
                    </div>
                  </div>

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
