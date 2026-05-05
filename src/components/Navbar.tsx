import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    // Se estamos na homepage, faz scroll direto
    if (location.pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Se estamos noutra página, navega para a homepage com a âncora
      navigate("/" + href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="font-display text-xl font-bold tracking-tight">
          <span className="text-primary">ALIVE</span>
          <span className="text-foreground">GOAL</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="glow-emerald" asChild>
            <a href="#bookmakers" onClick={(e) => handleNavClick(e, "#bookmakers")}>Apostar Agora</a>
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
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="mt-2 w-full glow-emerald" asChild>
            <a href="#bookmakers" onClick={(e) => handleNavClick(e, "#bookmakers")}>Apostar Agora</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
