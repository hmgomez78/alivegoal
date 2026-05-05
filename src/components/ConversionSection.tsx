import { bookmakers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Bell } from "lucide-react";

const featured = bookmakers.slice(0, 3);

const ConversionSection = () => (
  <section id="conversion" className="gradient-hero border-y border-border py-16 md:py-24">
    <div className="container text-center">
      <h2 className="font-display text-3xl font-bold md:text-4xl">
        Começa a Ganhar com <span className="text-primary">Apostas Mais Inteligentes</span>
      </h2>
      <p className="mt-2 text-muted-foreground">Bónus de boas-vindas por tempo limitado dos nossos parceiros</p>

      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
        {featured.map((b) => (
          <div key={b.id} className="gradient-card rounded-xl border border-primary/30 p-5 glow-emerald">
            <h3 className="font-display font-bold">{b.name}</h3>
            <p className="mt-1 text-sm text-primary font-semibold">{b.bonus}</p>
            <Button className="mt-4 w-full" size="sm" asChild>
              <a href={b.url} target="_blank" rel="noopener noreferrer">
                Reclamar Agora <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <p className="mb-3 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Bell size={14} className="text-primary" /> Recebe previsões e tips grátis no teu email
        </p>
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="O teu endereço de email" type="email" className="bg-secondary border-border" />
          <Button type="submit">Subscrever</Button>
        </form>
      </div>
    </div>
  </section>
);

export default ConversionSection;
