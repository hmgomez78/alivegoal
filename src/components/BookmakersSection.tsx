import { useState } from "react";
import { bookmakers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, LayoutGrid, Table } from "lucide-react";

const BookmakersSection = () => {
  const [view, setView] = useState<"cards" | "table">("cards");

  return (
    <section id="bookmakers" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Comparar Casas de Apostas</h2>
            <p className="mt-1 text-muted-foreground">Encontra as melhores ofertas de bónus e funcionalidades</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={view === "cards" ? "default" : "outline"} onClick={() => setView("cards")}><LayoutGrid size={14} /> Cards</Button>
            <Button size="sm" variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}><Table size={14} /> Tabela</Button>
          </div>
        </div>

        {view === "cards" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookmakers.map((b) => (
              <div key={b.id} className="gradient-card flex flex-col rounded-xl border border-border p-6 transition-all hover:border-primary/40 hover:glow-emerald">
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(b.url).hostname}&sz=64`}
                    alt={`${b.name} logo`}
                    className="h-10 w-10 shrink-0 rounded-lg bg-secondary/50 object-contain p-1"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">{b.region}</div>
                    <h3 className="font-display text-lg font-bold">{b.name}</h3>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(b.rating) ? "fill-primary text-primary" : "text-muted-foreground"} />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">{b.rating}</span>
                </div>
                <div className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{b.bonus}</div>
                <ul className="mt-4 flex-1 space-y-1">
                  {b.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-5 w-full glow-emerald" asChild>
                  <a href={b.url} target="_blank" rel="noopener noreferrer">
                    Reclamar Bónus <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Casa de Apostas</th>
                  <th className="px-4 py-3 text-left font-semibold">Região</th>
                  <th className="px-4 py-3 text-left font-semibold">Bónus</th>
                  <th className="px-4 py-3 text-center font-semibold">Avaliação</th>
                  <th className="px-4 py-3 text-center font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody>
                {bookmakers.map((b) => (
                  <tr key={b.id} className="border-t border-border transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3 font-semibold">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(b.url).hostname}&sz=32`}
                          alt={`${b.name} logo`}
                          className="h-6 w-6 shrink-0 rounded object-contain"
                          loading="lazy"
                        />
                        {b.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{b.region}</td>
                    <td className="px-4 py-3 text-primary">{b.bonus}</td>
                    <td className="px-4 py-3 text-center">{b.rating}</td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" asChild><a href={b.url} target="_blank" rel="noopener noreferrer">Reclamar</a></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookmakersSection;
