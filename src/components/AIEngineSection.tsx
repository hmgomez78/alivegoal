import { aiFeatures, platformStats } from "@/data/mockData";
import { Brain, Database, BarChart3, Target, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain size={28} />,
  database: <Database size={28} />,
  "bar-chart": <BarChart3 size={28} />,
  target: <Target size={28} />,
  zap: <Zap size={28} />,
};

const AIEngineSection = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          O Nosso Motor de <span className="text-primary">Previsões com IA</span>
        </h2>
        <p className="mt-2 text-muted-foreground">Algoritmos avançados para insights de futebol mais inteligentes</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {aiFeatures.map((f) => (
          <div key={f.title} className="gradient-card rounded-xl border border-border p-5 text-center transition-all hover:border-accent/40 hover:glow-lavender">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
              {iconMap[f.icon]}
            </div>
            <h3 className="font-display font-bold">{f.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Barra de estatísticas */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {platformStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-secondary/30 p-6 text-center">
            <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AIEngineSection;
