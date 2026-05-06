import { bookmakers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Bell } from "lucide-react";
import { useGeolocation, getVisibleBookmakers } from "@/hooks/useGeolocation";
import { useLanguage } from "@/hooks/useLanguage";

const ConversionSection = () => {
  const lang = useLanguage();
  const { countryCode } = useGeolocation();

  const visibleIds = countryCode ? getVisibleBookmakers(countryCode) : bookmakers.map((b) => b.id as any);
  const filteredBookmakers = bookmakers.filter((b) => visibleIds.includes(b.id as any));
  const featured = filteredBookmakers.slice(0, 3);

  return (
    <section id="conversion" className="gradient-hero border-y border-border py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          {lang === "pt" ? (
            <>Começa a Ganhar com <span className="text-primary">Apostas Mais Inteligentes</span></>
          ) : (
            <>Start Winning with <span className="text-primary">Smarter Bets</span></>
          )}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {lang === "pt"
            ? "Bónus de boas-vindas por tempo limitado dos nossos parceiros"
            : "Limited time welcome bonuses from our partners"}
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {featured.map((b) => (
            <div key={b.id} className="gradient-card rounded-xl border border-primary/30 p-5 glow-emerald">
              <h3 className="font-display font-bold">{b.name}</h3>
              <p className="mt-1 text-sm text-primary font-semibold">{b.bonus}</p>
              <Button className="mt-4 w-full" size="sm" asChild>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  {lang === "pt" ? "Reclamar Agora" : "Claim Now"} <ExternalLink size={14} />
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <p className="mb-3 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Bell size={14} className="text-primary" />
            {lang === "pt"
              ? "Recebe previsões e tips grátis no teu email"
              : "Get free predictions and tips in your email"}
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder={lang === "pt" ? "O teu endereço de email" : "Your email address"}
              type="email"
              className="bg-secondary border-border"
            />
            <Button type="submit">
              {lang === "pt" ? "Subscrever" : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection;
