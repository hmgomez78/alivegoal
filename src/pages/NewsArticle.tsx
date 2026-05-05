import { useParams, useNavigate } from "react-router-dom";
import { useNews, NewsArticle as NewsArticleType } from "@/hooks/useNews";
import { ArrowLeft, Clock, Calendar, Flame, Share2, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const categoryColors: Record<string, string> = {
  "ÚLTIMA HORA": "bg-destructive/20 text-destructive",
  "ANÁLISE TÁTICA": "bg-accent/20 text-accent",
  "TIPS DE APOSTAS": "bg-emerald-500/20 text-emerald-400",
  "TRANSFERÊNCIAS": "bg-purple-500/20 text-purple-400",
  "LESÕES": "bg-orange-500/20 text-orange-400",
  "ESCÂNDALO": "bg-red-500/20 text-red-400",
};

// Gerar conteúdo completo do artigo baseado no título e categoria
function generateArticleContent(article: NewsArticleType): string[] {
  const paragraphs: string[] = [];
  const category = article.category;
  const title = article.title;

  // Parágrafo de abertura dramático
  paragraphs.push(
    `O mundo do futebol acordou hoje com uma notícia que promete abalar as estruturas do desporto rei. ${article.excerpt}`
  );

  if (category === "ÚLTIMA HORA" || category === "TRANSFERÊNCIAS") {
    paragraphs.push(
      "Segundo fontes próximas das negociações, o acordo está praticamente fechado e deverá ser oficializado nas próximas horas. Os valores envolvidos são astronómicos e colocam esta operação entre as maiores da história do futebol."
    );
    paragraphs.push(
      "Os adeptos já invadiram as redes sociais com reações explosivas. Uns celebram, outros lamentam, mas todos concordam: isto muda completamente o panorama competitivo para a próxima temporada."
    );
    paragraphs.push(
      "Do ponto de vista das apostas, as casas já reagiram de forma imediata. As odds para o título sofreram alterações significativas, com movimentos que não se viam há meses. Os apostadores mais atentos já estão a reposicionar-se."
    );
    paragraphs.push(
      "Especialistas do mercado apontam que este movimento poderá desencadear uma reação em cadeia, com outros clubes a serem forçados a responder com contratações de peso. A janela de transferências promete ser a mais agitada dos últimos anos."
    );
  } else if (category === "ANÁLISE TÁTICA") {
    paragraphs.push(
      "A análise detalhada dos últimos jogos revela um padrão tático que está a surpreender todos os analistas. Os números não mentem: esta abordagem está a produzir resultados devastadores."
    );
    paragraphs.push(
      "Com uma taxa de posse de bola superior a 65% e uma eficácia de finalização que bate todos os recordes da temporada, esta equipa transformou-se numa máquina imparável. Os adversários simplesmente não encontram soluções."
    );
    paragraphs.push(
      "O impacto nas apostas é direto: as odds para vitória desta equipa têm vindo a cair consistentemente, mas os nossos modelos indicam que ainda há valor em mercados específicos como 'Mais de 2.5 golos' e 'Ambas Marcam'."
    );
    paragraphs.push(
      "Para os próximos jogos, a nossa recomendação é clara: apostar no domínio ofensivo desta equipa. Os dados suportam esta tese com uma confiança superior a 78%."
    );
  } else if (category === "TIPS DE APOSTAS") {
    paragraphs.push(
      "O nosso motor de inteligência artificial processou mais de 500 mil jogos históricos e cruzou dados de forma, lesões, condições climatéricas e tendências de mercado para identificar as melhores oportunidades."
    );
    paragraphs.push(
      "As odds atuais apresentam ineficiências claras que os apostadores informados podem explorar. O nosso algoritmo identificou pelo menos 3 apostas com valor esperado positivo acima de 15%."
    );
    paragraphs.push(
      "ATENÇÃO: Estas oportunidades são sensíveis ao tempo. À medida que mais apostadores identificam o valor, as odds vão corrigir-se. Quem agir primeiro terá a maior vantagem."
    );
    paragraphs.push(
      "Recomendamos uma gestão de banca responsável: nunca apostar mais de 3-5% do bankroll numa única aposta, mesmo quando a confiança é elevada. A disciplina é o que separa os vencedores dos perdedores a longo prazo."
    );
  } else if (category === "LESÕES") {
    paragraphs.push(
      "A confirmação da lesão chegou através de comunicado oficial do clube, que detalhou a gravidade do problema e o tempo estimado de recuperação. O impacto é devastador para as ambições da equipa."
    );
    paragraphs.push(
      "Sem o seu jogador-chave, a equipa perde não apenas qualidade técnica, mas também liderança no balneário. Os últimos dados mostram que o rendimento coletivo cai drasticamente na ausência deste elemento."
    );
    paragraphs.push(
      "Para os apostadores, esta informação é ouro. As casas de apostas já ajustaram as linhas, mas o nosso modelo sugere que a correção ainda não reflete totalmente o impacto real. Há valor em apostar contra esta equipa nos próximos jogos."
    );
    paragraphs.push(
      "Fiquem atentos às atualizações do boletim clínico. Qualquer novidade sobre a recuperação poderá mover as odds de forma significativa."
    );
  } else {
    paragraphs.push(
      "Esta situação tem gerado ondas de choque por todo o mundo do futebol. As reações têm sido intensas e polarizadas, com figuras importantes do desporto a pronunciarem-se publicamente."
    );
    paragraphs.push(
      "Os bastidores revelam uma história ainda mais complexa do que aquilo que é visível à superfície. Fontes internas confirmam que há muito mais por revelar nos próximos dias."
    );
    paragraphs.push(
      "Do ponto de vista das apostas, a incerteza gerada por esta situação criou volatilidade nos mercados. Os apostadores mais experientes sabem que volatilidade significa oportunidade — mas também risco acrescido."
    );
    paragraphs.push(
      "A nossa recomendação é aguardar por mais informações antes de tomar posições agressivas. No entanto, para quem tem tolerância ao risco, há valor em mercados específicos que identificámos."
    );
  }

  // Parágrafo de fecho com CTA
  paragraphs.push(
    "Segue o AliveGoal no Telegram, X, Facebook e Instagram para receberes todas as atualizações em primeira mão. As melhores tips e análises chegam primeiro aos nossos seguidores. Vamos chegar ao topo juntos! 🚀"
  );

  return paragraphs;
}

// Gerar artigos relacionados
function getRelatedArticles(currentId: number, allNews: NewsArticleType[]): NewsArticleType[] {
  return allNews.filter(a => a.id !== currentId).slice(0, 3);
}

const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, loading } = useNews();
  const [article, setArticle] = useState<NewsArticleType | null>(null);

  useEffect(() => {
    if (news.length > 0 && id) {
      const found = news.find(a => a.id === parseInt(id));
      setArticle(found || null);
    }
  }, [news, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="mx-auto max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-secondary" />
            <div className="h-4 w-1/2 rounded bg-secondary" />
            <div className="h-64 rounded bg-secondary" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
          <p className="mt-2 text-muted-foreground">Este artigo pode ter sido atualizado. Volta à página principal para ver as últimas notícias.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar à Página Principal
          </button>
        </div>
      </div>
    );
  }

  const content = generateArticleContent(article);
  const related = getRelatedArticles(article.id, news);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <article className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => navigate("/#news")}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Voltar às Notícias
          </button>

          {/* Category & Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                categoryColors[article.category] || "bg-secondary text-secondary-foreground"
              }`}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              {article.readTime} de leitura
            </span>
            {article.source && (
              <span className="text-xs text-muted-foreground">
                Fonte: {article.source}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {/* Excerpt/Lead */}
          <p className="mt-6 text-lg font-medium leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* Article Body */}
          <div className="prose prose-invert max-w-none space-y-6">
            {content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & CTA */}
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-3">
              <Flame size={24} className="text-primary" />
              <div>
                <h3 className="font-display text-lg font-bold">Não percas nenhuma tip!</h3>
                <p className="text-sm text-muted-foreground">
                  Junta-te ao canal AliveGoal no Telegram para receberes previsões diárias com taxa de acerto superior a 73%.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://t.me/NewsForTipsIQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} />
                Canal Telegram
              </a>
              <a
                href="https://x.com/alivegoal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <Share2 size={16} />
                Seguir no X
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 font-display text-2xl font-bold">Artigos Relacionados</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => navigate(`/noticias/${r.id}`)}
                    className="gradient-card group cursor-pointer rounded-xl border border-border p-4 transition-all hover:border-primary/40"
                  >
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        categoryColors[r.category] || "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {r.category}
                    </span>
                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                      {r.title}
                    </h3>
                    <span className="mt-2 block text-xs text-muted-foreground">{r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsArticlePage;
