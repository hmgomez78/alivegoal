import { useEffect, useState } from "react";
import { newsArticles as mockArticles } from "@/data/mockData";
import { Clock, ExternalLink, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsArticle {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  link?: string;
  source?: string;
}

const categoryColors: Record<string, string> = {
  "Antevisão": "bg-primary/20 text-primary",
  "Análise Tática": "bg-accent/20 text-accent",
  "Tips de Apostas": "bg-emerald/20 text-emerald",
  "Transferências": "bg-lavender/20 text-lavender",
  "Lesões": "bg-destructive/20 text-destructive",
  "Match Preview": "bg-primary/20 text-primary",
  "Tactical Analysis": "bg-accent/20 text-accent",
  "Betting Tips": "bg-emerald/20 text-emerald",
  "Transfer News": "bg-lavender/20 text-lavender",
  "Injury Update": "bg-destructive/20 text-destructive",
};

const NewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockArticles);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-football-news");
      if (error) throw error;
      if (data?.success && data.articles?.length > 0) {
        setArticles(data.articles);
        setIsLive(true);
      } else {
        setArticles(mockArticles);
        setIsLive(false);
      }
    } catch (e) {
      console.error("Falha ao buscar notícias ao vivo:", e);
      setArticles(mockArticles);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="news" className="border-y border-border bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">Notícias &amp; Análises</h2>
              {isLive && (
                <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Ao Vivo
                </span>
              )}
            </div>
            <p className="mt-1 text-muted-foreground">
              {isLive ? "Insights de futebol em tempo real das melhores fontes" : "Análises de futebol e tips de apostas de especialistas"}
            </p>
          </div>
          <button
            onClick={fetchNews}
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
            : articles.map((a) => {
                const Wrapper = a.link ? "a" : "div";
                const wrapperProps = a.link
                  ? { href: a.link, target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <Wrapper
                    key={a.id}
                    {...wrapperProps}
                    className="gradient-card group cursor-pointer rounded-xl border border-border p-5 transition-all hover:border-primary/40"
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
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {a.readTime}
                        </span>
                        <span>{a.date}</span>
                      </div>
                      {a.link && <ExternalLink size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />}
                    </div>
                  </Wrapper>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
