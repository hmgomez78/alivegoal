import { Clock, ExternalLink, RefreshCw, Flame } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";

const categoryColors: Record<string, string> = {
  "ÚLTIMA HORA": "bg-destructive/20 text-destructive",
  "ANÁLISE TÁTICA": "bg-accent/20 text-accent",
  "TIPS DE APOSTAS": "bg-emerald/20 text-emerald",
  "TRANSFERÊNCIAS": "bg-lavender/20 text-lavender",
  "LESÕES": "bg-orange-500/20 text-orange-400",
  "ESCÂNDALO": "bg-red-500/20 text-red-400",
  "Antevisão": "bg-primary/20 text-primary",
  "Análise Tática": "bg-accent/20 text-accent",
  "Tips de Apostas": "bg-emerald/20 text-emerald",
  "Transferências": "bg-lavender/20 text-lavender",
  "Lesões": "bg-destructive/20 text-destructive",
};

const NewsSection = () => {
  const { news, loading, refresh } = useNews();

  return (
    <section id="news" className="border-y border-border bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">Notícias &amp; Análises</h2>
              <span className="flex items-center gap-1 rounded-full bg-destructive/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                <Flame size={10} />
                TRENDING
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              As notícias mais quentes do futebol mundial — atualizadas em tempo real
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
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
