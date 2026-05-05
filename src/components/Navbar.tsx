import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Previsões", href: "#predictions" },
  { label: "Ao Vivo", href: "#live" },
  { label: "Casas de Apostas", href: "#bookmakers" },
  { label: "Notícias", href: "#news" },
  { label: "Guias", href: "#tools" },
  { label: "Promoções", href: "#conversion" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="text-primary">ALIVE</span>
          <span className="text-foreground">GOAL</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="glow-emerald" asChild>
            <a href="#bookmakers">Apostar Agora</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden animate-slide-up">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="mt-2 w-full glow-emerald" asChild>
            <a href="#bookmakers" onClick={() => setOpen(false)}>Apostar Agora</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
