import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Ligas de Futebol",
    links: [
      { label: "Champions League", href: "#predictions" },
      { label: "Premier League", href: "#predictions" },
      { label: "La Liga", href: "#predictions" },
      { label: "Serie A", href: "#predictions" },
      { label: "Bundesliga", href: "#predictions" },
      { label: "Liga Portugal", href: "#predictions" },
      { label: "Moçambola", href: "#predictions" },
    ],
  },
  {
    title: "Tips de Apostas",
    links: [
      { label: "Tips de Hoje", href: "#predictions" },
      { label: "Resultados ao Vivo", href: "#live" },
      { label: "Casas de Apostas", href: "#bookmakers" },
      { label: "Notícias de Futebol", href: "#news" },
      { label: "Canal Telegram", href: "https://t.me/alivegoal" },
    ],
  },
  {
    title: "Mercados Populares",
    links: [
      { label: "BTTS (Ambas Marcam)", href: "#predictions" },
      { label: "Over 2.5 Golos", href: "#predictions" },
      { label: "Over 1.5 Golos", href: "#predictions" },
      { label: "Resultado Final", href: "#predictions" },
      { label: "Acumuladas", href: "#predictions" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Serviço", href: "#" },
      { label: "Política de Privacidade", href: "#" },
      { label: "Jogo Responsável", href: "#" },
      { label: "Divulgação de Afiliados", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Telegram", url: "https://t.me/alivegoal", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" },
  { name: "X (Twitter)", url: "https://x.com/alivegoal", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Facebook", url: "https://facebook.com/alivegoal", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", url: "https://instagram.com/alivegoal", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/20 py-12">
    <div className="container">
      {/* SEO content block */}
      <div className="mb-10 max-w-4xl">
        <h3 className="font-display text-xl font-bold mb-3">ALIVEGOAL — Tips de Apostas de Futebol Grátis</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          O AliveGoal é a tua plataforma de tips de apostas de futebol grátis. Publicamos diariamente previsões com análise estatística para as principais competições: Champions League, Premier League, La Liga, Serie A, Bundesliga, Liga Portugal e ligas africanas como a Moçambola. As nossas tips incluem mercados como BTTS (Ambas Marcam), Over/Under, Resultado Final e acumuladas, sempre com odds atualizadas e nível de confiança. Segue o nosso canal Telegram @alivegoal para receberes as tips em primeira mão.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="font-display mb-3 font-bold">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h4 className="font-display mb-3 font-bold">Newsletter</h4>
          <p className="text-xs text-muted-foreground mb-2">Recebe tips diárias no teu email — grátis.</p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="O teu email" type="email" className="bg-secondary border-border" aria-label="Email para newsletter" />
            <Button size="sm" className="w-full">Subscrever</Button>
          </form>

          {/* Redes Sociais */}
          <h4 className="font-display mt-6 mb-3 font-bold">Segue-nos</h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary"
                title={social.name}
                aria-label={`Seguir ALIVEGOAL no ${social.name}`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        <p className="mb-2">
          <strong>Divulgação de Afiliados:</strong> O ALIVEGOAL pode receber comissões de parceiros de casas de apostas. Isto não afeta as nossas análises ou recomendações.
        </p>
        <p>&copy; {new Date().getFullYear()} ALIVEGOAL. Todos os direitos reservados. | 18+ | Por favor, joga de forma responsável.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
