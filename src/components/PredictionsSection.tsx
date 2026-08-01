import { Button } from "@/components/ui/button";
import { TrendingUp, RefreshCw, Zap, Trophy, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePredictions } from "@/hooks/usePredictions";
import { useLanguage } from "@/hooks/useLanguage";

const PredictionsSection = () => {
  const lang = useLanguage();
  const { predictions, loading, refresh } = usePredictions();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getMarketBadgeColor = (market: string) => {
    const map: Record<string, string> = {
      "Resultado Final": "bg-blue-500/20 text-blue-400",
      "Match Result": "bg-blue-500/20 text-blue-400",
      "Mais de 2.5": "bg-purple-500/20 text-purple-400",
      "Over 2.5": "bg-purple-500/20 text-purple-400",
      "Mais de 1.5": "bg-violet-500/20 text-violet-400",
      "Over 1.5": "bg-violet-500/20 text-violet-400",
      "Menos de 2.5": "bg-indigo-500/20 text-indigo-400",
      "Under 2.5": "bg-indigo-500/20 text-indigo-400",
      "Ambas Marcam": "bg-pink-500/20 text-pink-400",
      "BTTS": "bg-pink-500/20 text-pink-400",
      "Golo 1ª Parte": "bg-amber-500/20 text-amber-400",
      "1st Half Goal": "bg-amber-500/20 text-amber-400",
      "Combinada": "bg-red-500/20 text-red-400",
      "Accumulator": "bg-red-500/20 text-red-400",
      "Dupla Hipótese": "bg-cyan-500/20 text-cyan-400",
      "Double Chance": "bg-cyan-500/20 text-cyan-400",
    };
    return map[market] ?? "bg-green-500/20 text-green-400";
  };

  const getBetTypeBadge = (betType?: string) => {
    if (betType === "DOUBLE") return "bg-red-500/20 text-red-400";
    return "bg-emerald-500/20 text-emerald-400";
  };

  return (
    <section id="predictions" className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-3xl font-bold">
                {lang === "pt"
                  ? "Palpites e Prognósticos de Futebol Hoje"
                  : "Today's Football Predictions & Tips"}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                <Zap size={10} />
                {lang === "pt" ? "AO VIVO" : "LIVE"}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {lang === "pt"
                ? "Dicas de apostas grátis com análise detalhada — atualizadas todos os dias"
                : "Free betting tips with detailed analysis — updated every day"}
            </p>
            {/* Social links */}
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://t.me/alivegoal"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram AliveGoal"
                className="flex items-center gap-1.5 rounded-lg bg-[#0088cc]/10 px-3 py-1.5 text-xs font-semibold text-[#0088cc] transition-all hover:bg-[#0088cc]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                Telegram
              </a>
              <a
                href="https://x.com/alivegoal"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter) AliveGoal"
                className="flex items-center gap-1.5 rounded-lg bg-foreground/5 px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-all hover:bg-foreground/10 hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>
              <a
                href="https://facebook.com/alivegoal"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook AliveGoal"
                className="flex items-center gap-1.5 rounded-lg bg-[#1877f2]/10 px-3 py-1.5 text-xs font-semibold text-[#1877f2] transition-all hover:bg-[#1877f2]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              {lang === "pt" ? "Atualizar" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Tips grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="gradient-card rounded-xl border border-border p-5">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="mb-2 h-3 w-24" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : predictions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Trophy size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-display text-xl font-bold">
                {lang === "pt" ? "Sem tips para este período" : "No tips for this period"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "pt"
                  ? "As tips são publicadas diariamente no canal Telegram. Volta mais tarde ou junta-te ao canal para notificações."
                  : "Tips are published daily on the Telegram channel. Come back later or join the channel for notifications."}
              </p>
            </div>
          ) : (
            predictions.map((pred) => (
              <div
                key={pred.id}
                className="gradient-card rounded-xl border border-border p-5 transition-all hover:border-primary/40 hover:glow-emerald"
              >
                {/* Header - League, Bet Number & Market */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">{pred.league}</span>
                    {pred.betNumber && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-mono">
                        #{pred.betNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {pred.betType && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getBetTypeBadge(pred.betType)}`}>
                        {pred.betType}
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getMarketBadgeColor(pred.market)}`}>
                      {pred.market}
                    </span>
                  </div>
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
                <div className="mt-2 text-xs text-muted-foreground">
                  {pred.date}, {pred.time} BST
                </div>

                {/* Prediction & Odds */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded bg-accent/20 px-2 py-1 text-xs font-semibold text-accent flex items-center gap-1">
                    <Target size={10} />
                    {pred.prediction}
                  </span>
                  <span className="text-lg font-bold text-primary">{pred.odds.toFixed(2)}</span>
                </div>

                {/* Analysis */}
                {pred.analysis && (
                  <div className="mt-3 rounded-lg bg-secondary/50 border border-border/50 p-3">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                      <span className="text-primary mt-0.5 shrink-0">📌</span>
                      <span>{pred.analysis}</span>
                    </p>
                  </div>
                )}

                {/* Confidence Bar */}
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>{lang === "pt" ? "Confiança" : "Confidence"}</span>
                    <span>{pred.confidence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className={`h-2 rounded-full transition-all ${getConfidenceColor(pred.confidence)}`}
                      style={{ width: `${pred.confidence}%` }}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <Button size="sm" className="mt-4 w-full glow-emerald" asChild>
                  <a
                    href="https://vvegas-promo.com/l/69f9bb9318f911bfd0029492?sub_id={sub_id_1}&click_id={click_id}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TrendingUp size={14} />
                    {lang === "pt" ? "Apostar Agora" : "Bet Now"}
                  </a>
                </Button>
              </div>
            ))
          )}
        </div>

        {/* SEO content block */}
        <div className="mt-16 space-y-6 opacity-80">
          <div className="rounded-xl border border-border/50 bg-secondary/10 p-6">
            <h3 className="font-display text-base font-bold mb-3 text-muted-foreground">
              {lang === "pt"
                ? "Palpites de Futebol Grátis para Hoje — Como Funcionam os Nossos Prognósticos"
                : "Free Football Predictions for Today — How Our Tips Work"}
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground/80 leading-relaxed">
              {lang === "pt" ? (
                <>
                  <p>
                    Os <strong>palpites de futebol</strong> do AliveGoal são publicados diariamente no nosso canal{" "}
                    <a href="https://t.me/alivegoal" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary hover:underline">
                      Telegram @alivegoal
                    </a>{" "}
                    e atualizados automaticamente neste site. Cada <strong>prognóstico</strong> é acompanhado de uma análise detalhada que explica o raciocínio por trás da aposta — incluindo estatísticas de confronto direto, forma recente, médias de golos e tendências de mercado.
                  </p>
                  <p>
                    Ao contrário de outros sites de <strong>dicas de apostas</strong>, não nos limitamos a dar um palpite: explicamos <em>porquê</em>. Cada tip inclui o mercado recomendado, a odd sugerida, o nível de confiança e uma justificação baseada em dados.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    AliveGoal <strong>football predictions</strong> are published daily on our{" "}
                    <a href="https://t.me/alivegoal" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary hover:underline">
                      Telegram channel @alivegoal
                    </a>{" "}
                    and automatically updated on this site. Each <strong>prediction</strong> comes with a detailed analysis explaining the reasoning behind the bet — including head-to-head stats, recent form, goal averages and market trends.
                  </p>
                  <p>
                    Unlike other <strong>betting tips</strong> sites, we don't just give a prediction: we explain <em>why</em>. Each tip includes the recommended market, suggested odds, confidence level and a data-driven justification.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-secondary/10 p-6">
            <h3 className="font-display text-base font-bold mb-3 text-muted-foreground">
              {lang === "pt" ? "Que Ligas e Mercados Cobrimos" : "Which Leagues & Markets We Cover"}
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground/80 leading-relaxed">
              {lang === "pt" ? (
                <>
                  <p>
                    Publicamos <strong>previsões de futebol</strong> para as principais competições europeias: <strong>Champions League</strong>, <strong>Europa League</strong>, <strong>Premier League</strong>, <strong>La Liga</strong>, <strong>Serie A</strong>, <strong>Bundesliga</strong>, <strong>Ligue 1</strong> e <strong>Liga Portugal</strong>. Também cobrimos ligas africanas como a <strong>Moçambola</strong> (Moçambique), <strong>Girabola</strong> (Angola), <strong>Premier Soccer League</strong> (África do Sul) e <strong>NPFL</strong> (Nigéria).
                  </p>
                  <p>
                    Os mercados mais populares nos nossos <strong>palpites de hoje</strong> incluem: <strong>Resultado Final</strong> (1X2), <strong>BTTS / Ambas Marcam</strong>, <strong>Over 2.5 Golos</strong>, <strong>Over 1.5 Golos</strong>, <strong>Dupla Hipótese</strong>, <strong>Handicap Asiático</strong> e <strong>Acumuladas</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We publish <strong>football predictions</strong> for the main European competitions: <strong>Champions League</strong>, <strong>Europa League</strong>, <strong>Premier League</strong>, <strong>La Liga</strong>, <strong>Serie A</strong>, <strong>Bundesliga</strong>, <strong>Ligue 1</strong> and <strong>Liga Portugal</strong>. We also cover African leagues such as <strong>Moçambola</strong> (Mozambique), <strong>Girabola</strong> (Angola), <strong>Premier Soccer League</strong> (South Africa) and <strong>NPFL</strong> (Nigeria).
                  </p>
                  <p>
                    The most popular markets in our <strong>today's tips</strong> include: <strong>Match Result</strong> (1X2), <strong>BTTS / Both Teams to Score</strong>, <strong>Over 2.5 Goals</strong>, <strong>Over 1.5 Goals</strong>, <strong>Double Chance</strong>, <strong>Asian Handicap</strong> and <strong>Accumulators</strong>.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-secondary/10 p-6">
            <h3 className="font-display text-base font-bold mb-3 text-muted-foreground">
              {lang === "pt"
                ? "Porquê Seguir os Palpites do AliveGoal"
                : "Why Follow AliveGoal Predictions"}
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground/80 leading-relaxed">
              {lang === "pt" ? (
                <>
                  <p>
                    O AliveGoal destaca-se como uma plataforma de <strong>tips de apostas grátis</strong> porque cada previsão vem com uma explicação transparente. Não vendemos picks premium nem cobramos por acesso — todas as <strong>dicas de apostas de futebol</strong> são completamente gratuitas e acessíveis no Telegram e no site.
                  </p>
                  <p>
                    As nossas tips são ideais tanto para apostadores iniciantes que querem aprender a analisar jogos, como para apostadores experientes que procuram uma segunda opinião fundamentada. Publicamos entre 3 a 6 <strong>prognósticos por dia</strong>, focando-nos na qualidade e não na quantidade. Joga sempre com responsabilidade — as apostas desportivas envolvem risco.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    AliveGoal stands out as a <strong>free betting tips</strong> platform because every prediction comes with a transparent explanation. We don't sell premium picks or charge for access — all <strong>football betting tips</strong> are completely free and accessible on Telegram and the website.
                  </p>
                  <p>
                    Our tips are ideal for beginner bettors who want to learn how to analyse matches, as well as experienced bettors looking for a well-founded second opinion. We publish 3 to 6 <strong>predictions per day</strong>, focusing on quality over quantity. Always gamble responsibly — sports betting involves risk.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionsSection;
