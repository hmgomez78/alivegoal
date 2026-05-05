import { tipsters, testimonials } from "@/data/mockData";
import { Star, User, Trophy } from "lucide-react";

const TrustSection = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <h2 className="font-display mb-8 text-3xl font-bold text-center">A Confiança de Milhares</h2>

      {/* Tipsters */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tipsters.map((t) => (
          <div key={t.name} className="gradient-card rounded-xl border border-border p-5 text-center transition-all hover:border-accent/40">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <User size={24} />
            </div>
            <h3 className="font-display font-bold">{t.name}</h3>
            <p className="text-xs text-muted-foreground">{t.specialty}</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-primary">
              <Trophy size={14} /> <span className="font-bold">{t.winRate}</span>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">{t.totalTips} tips</p>
          </div>
        ))}
      </div>

      {/* Testemunhos */}
      <div className="grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="gradient-card rounded-xl border border-border p-6">
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < t.rating ? "fill-primary text-primary" : "text-muted-foreground"} />
              ))}
            </div>
            <p className="text-sm italic text-muted-foreground">"{t.quote}"</p>
            <p className="mt-3 text-xs font-semibold">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
