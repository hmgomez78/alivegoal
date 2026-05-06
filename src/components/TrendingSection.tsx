import { ExternalLink, Flame, Zap, AlertTriangle, TrendingUp, RefreshCw } from "lucide-react";
import { useTrending, getTrendingText } from "../hooks/useTrending";
import { useLanguage } from "../hooks/useLanguage";
import { t, tr } from "../i18n/translations";

const TAG_CONFIG = {
  BREAKING: {
    label_pt: "ÚLTIMA HORA",
    label_en: "BREAKING",
    color: "bg-red-500 text-white",
    icon: Zap,
  },
  SCANDAL: {
    label_pt: "ESCÂNDALO",
    label_en: "SCANDAL",
    color: "bg-orange-500 text-white",
    icon: AlertTriangle,
  },
  TRANSFER: {
    label_pt: "TRANSFERÊNCIA",
    label_en: "TRANSFER",
    color: "bg-blue-500 text-white",
    icon: TrendingUp,
  },
  HOT: {
    label_pt: "HOT",
    label_en: "HOT",
    color: "bg-emerald-500 text-white",
    icon: Flame,
  },
};

export default function TrendingSection() {
  const lang = useLanguage();
  const { items, loading, error } = useTrending();

  return (
    <section id="trending" className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-3 py-1">
              {/* X logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Trending</span>
            </div>
            <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {tr(t.trending.h2, lang)}
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            {tr(t.trending.subtitle, lang)}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <span className="ml-3 text-gray-400">{tr(t.trending.loading, lang)}</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16 text-gray-500">{error}</div>
        )}

        {/* Grid de notícias */}
        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const tagCfg = TAG_CONFIG[item.tag];
              const TagIcon = tagCfg.icon;
              const { title, summary } = getTrendingText(item, lang);
              const tagLabel = lang === "pt" ? tagCfg.label_pt : tagCfg.label_en;
              const isFirst = index === 0;

              return (
                <article
                  key={item.id}
                  className={`relative bg-gray-900 border rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group ${
                    isFirst
                      ? "md:col-span-2 lg:col-span-2 border-emerald-500/40"
                      : "border-gray-800"
                  }`}
                >
                  {/* Tag */}
                  <div className="p-5 pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${tagCfg.color}`}>
                        <TagIcon className="w-3 h-3" />
                        {tagLabel}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{item.time}</span>
                        <span>·</span>
                        <span className="text-emerald-400 font-medium">{item.engagement} interações</span>
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className={`font-bold text-white leading-tight mb-3 group-hover:text-emerald-400 transition-colors ${
                      isFirst ? "text-xl md:text-2xl" : "text-base"
                    }`}>
                      {title}
                    </h3>

                    {/* Resumo */}
                    <p className={`text-gray-400 leading-relaxed ${isFirst ? "text-sm" : "text-xs line-clamp-3"}`}>
                      {summary}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="p-5 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gray-500" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-xs text-gray-500">{item.source}</span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {tr(t.trending.readMore, lang)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* CTA Telegram */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            {lang === "pt"
              ? "Segue o nosso canal para receberes estas notícias em primeira mão"
              : "Follow our channel to get these news first hand"}
          </p>
          <a
            href="https://t.me/alivegoal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 bg-[#0088cc] hover:bg-[#0077bb] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            {lang === "pt" ? "Entrar no Telegram" : "Join Telegram"}
          </a>
        </div>
      </div>
    </section>
  );
}
