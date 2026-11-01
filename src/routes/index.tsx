import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { NOTICIAS } from "@/lib/noticias";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comunidade Diesel — Bombas e bicos injetores" },
      { name: "description", content: "Notícias, dicas e uma comunidade para tirar dúvidas sobre bombas injetoras e bicos injetores diesel." },
      { property: "og:title", content: "Comunidade Diesel — Bombas e bicos injetores" },
      { property: "og:description", content: "Notícias, dicas e uma comunidade para tirar dúvidas sobre injeção diesel." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Bomba injetora e bicos injetores em bancada" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-4 py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Injeção diesel sem mistério</p>
          <h1 className="mt-3 max-w-3xl text-6xl leading-none md:text-8xl">Bombas injetoras, bicos e quem entende deles.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Leia as novidades, tire dúvidas com outros mecânicos e aprenda com quem vive a bancada todo dia.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/comunidade" className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Ver dúvidas</Link>
            <Link to="/cursos" className="rounded-md border px-6 py-3 font-semibold">Cursos</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-4xl">Notícias</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NOTICIAS.map((n) => (
            <Link key={n.slug} to="/noticias/$slug" params={{ slug: n.slug }} className="flex flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">{n.categoria}</span>
              <h3 className="mt-3 text-2xl leading-tight">{n.titulo}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{n.resumo}</p>
              <span className="mt-4 text-xs text-muted-foreground">{n.leitura} · Ler notícia →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
