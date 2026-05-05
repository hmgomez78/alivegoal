import { bettingTools } from "@/data/mockData";
import { Scale, Calculator, Search, Layers, PieChart } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  scale: <Scale size={24} />,
  calculator: <Calculator size={24} />,
  search: <Search size={24} />,
  layers: <Layers size={24} />,
  "pie-chart": <PieChart size={24} />,
};

const BettingToolsSection = () => (
  <section id="tools" className="border-y border-border bg-secondary/30 py-16 md:py-24">
    <div className="container">
      <h2 className="font-display text-3xl font-bold">Ferramentas de Apostas</h2>
      <p className="mt-1 mb-8 text-muted-foreground">Ferramentas profissionais para melhorar a tua estratégia de apostas</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {bettingTools.map((t) => (
          <div key={t.title} className="gradient-card rounded-xl border border-border p-5 transition-all hover:border-primary/40">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {iconMap[t.icon]}
            </div>
            <h3 className="font-display font-bold">{t.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
            <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
              t.status === "Experimentar" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
            }`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BettingToolsSection;
