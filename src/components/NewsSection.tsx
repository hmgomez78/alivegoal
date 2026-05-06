import { Clock, RefreshCw, Flame, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const categoryColors: Record<string, string> = {
  // Portuguese categories
  "ÚLTIMA HORA": "bg-destructive/20 text-destructive",
  "ANÁLISE TÁTICA": "bg-accent/20 text-accent",
  "TIPS DE APOSTAS": "bg-emerald-500/20 text-emerald-400",
  "TRANSFERÊNCIAS": "bg-purple-500/20 text-purple-400",
  "LESÕES": "bg-orange-500/20 text-orange-400",
  "ESCÂNDALO": "bg-red-500/20 text-red-400",
  "Antevisão": "bg-primary/20 text-primary",
  "Análise Tática": "bg-accent/20 text-accent",
  "Tips de Apostas": "bg-emerald-500/20 text-emerald-400",
  "Transferências": "bg-purple-500/20 text-purple-400",
  "Lesões": "bg-destructive/20 text-destructive",
  // English categories
  "BREAKING": "bg-destructive/20 text-destructive",
  "TACTICAL ANALYSIS": "bg-accent/20 text-accent",
  "BETTING TIPS": "bg-emerald-500/20 text-emerald-400",
  "TRANSFERS": "bg-purple-500/20 text-purple-400",
  "INJURIES": "bg-orange-500/20 text-orange-400",
  "SCANDAL": "bg-red-500/20 text-red-400",
  "Preview": "bg-primary/20 text-primary",
  "Analysis": "bg-accent/20 text-accent",
};

const NewsSection = () => {
  const lang = useLanguage();
  const { news, loading, refresh } = useNews();
  const navigate = useNavigate();

  return (
    <section id="news" className="border-y border-border bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">
                {lang === "pt" ? "Notícias de Futebol Hoje" : "Football News Today"}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-destructive/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                <Flame size={10} />
                TRENDING
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {lang === "pt"
                ? "Transferências, análises táticas e tips de apostas — atualizado em tempo real"
                : "Transfers, tactical analysis and betting tips — updated in real time"}
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            {lang === "pt" ? "Atualizar" : "Refresh"}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="gradient-card rounded-xl border border-border p-5">
                  <Skeleton className="mb-3 h-5 w-24" />
                  <Skeleton className="mb-2 h-6 w-full" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            : news.map((a) => (
                <div
                  key={a.id}
                  onClick={() => navigate(`/noticias/${a.id}`)}
                  className="gradient-card group cursor-pointer rounded-xl border border-border p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                        categoryColors[a.category] || "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {a.category}
                    </span>
                    {a.source && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                        {a.source}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {a.readTime}
                      </span>
                      <span>{a.date}</span>
                    </div>
                    <span className="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      {lang === "pt" ? "Ler mais" : "Read more"} <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
