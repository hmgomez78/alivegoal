import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, RefreshCw, Zap, Trophy, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePredictions } from "@/hooks/usePredictions";

const PredictionsSection = () => {
  const { predictions, loading, refresh } = usePredictions("Hoje");

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getMarketBadgeColor = (market: string) => {
    switch (market) {
      case 'Resultado Final': return 'bg-blue-500/20 text-blue-400';
      case 'Mais de 2.5': return 'bg-purple-500/20 text-purple-400';
      case 'Mais de 1.5': return 'bg-violet-500/20 text-violet-400';
      case 'Menos de 2.5': return 'bg-indigo-500/20 text-indigo-400';
      case 'Ambas Marcam': return 'bg-pink-500/20 text-pink-400';
      case 'Golo 1ª Parte': return 'bg-amber-500/20 text-amber-400';
      case 'Combinada': return 'bg-red-500/20 text-red-400';
      case 'Dupla Hipótese': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  const getBetTypeBadge = (betType?: string) => {
    if (betType === 'DOUBLE') return 'bg-red-500/20 text-red-400';
    return 'bg-emerald-500/20 text-emerald-400';
  };

  return (
    <section id="predictions" className="py-16 md:py-24">
      <div className="container">
        {/* SEO-optimized header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-3xl font-bold">Tips de Hoje</h2>
              <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                <Zap size={10} />
                AO VIVO
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              Tips publicadas no canal <a href="https://t.me/alivegoal" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@AliveGoal</a> — atualizadas diariamente
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
              <h3 className="font-display text-xl font-bold">Sem tips para este período</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                As tips são publicadas diariamente no canal Telegram. Volta mais tarde ou junta-te ao canal para notificações.
              </p>
            </div>
          ) : (
            predictions.map((pred) => (
              <div key={pred.id} className="gradient-card rounded-xl border border-border p-5 transition-all hover:border-primary/40 hover:glow-emerald">
                {/* Header - Liga, Bet Number & Market */}
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

                {/* CTA Button */}
                <Button size="sm" className="mt-4 w-full glow-emerald" asChild>
                  <a href="https://vvegas-promo.com/l/69f9bb9318f911bfd0029492?sub_id={sub_id_1}&click_id={click_id}" target="_blank" rel="noopener noreferrer">
                    <TrendingUp size={14} /> Apostar Agora
                  </a>
                </Button>
              </div>
            ))
          )}
        </div>

        {/* CTA para o canal Telegram */}
        <div className="mt-8 text-center">
          <a
            href="https://t.me/alivegoal"
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

        {/* SEO content block */}
        <div className="mt-8 rounded-xl border border-border bg-secondary/20 p-6">
          <h3 className="font-display text-lg font-bold mb-3">Tips de Apostas de Futebol Grátis — Como Funcionam</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              As tips de apostas do AliveGoal são publicadas diariamente no nosso canal <a href="https://t.me/alivegoal" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram @alivegoal</a> e atualizadas automaticamente neste site. Cada previsão é baseada em análise estatística detalhada, incluindo percentagens de Over/Under, BTTS (Ambas Marcam), médias de golos e forma recente das equipas.
            </p>
            <p>
              Cobrimos as principais competições de futebol: <strong>Champions League</strong>, <strong>Premier League</strong>, <strong>La Liga</strong>, <strong>Serie A</strong>, <strong>Bundesliga</strong>, <strong>Ligue 1</strong>, <strong>Liga Portugal</strong> e ligas africanas como a <strong>Moçambola</strong>, <strong>Premier Soccer League</strong> e <strong>NPFL</strong>. Todas as tips incluem nível de confiança, odd sugerida e tipo de aposta (single ou acumulada).
            </p>
            <p>
              Os mercados mais populares nas nossas previsões incluem: <strong>Resultado Final</strong>, <strong>BTTS (Ambas Marcam)</strong>, <strong>Over 2.5 Golos</strong>, <strong>Over 1.5 Golos</strong>, <strong>Dupla Hipótese</strong> e <strong>Acumuladas</strong>. Joga sempre com responsabilidade e gere a tua banca de forma inteligente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionsSection;
