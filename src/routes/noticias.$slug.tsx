import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NOTICIAS } from "@/lib/noticias";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const noticia = NOTICIAS.find((n) => n.slug === params.slug);
    if (!noticia) throw notFound();
    return noticia;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.titulo} — Comunidade Diesel` },
          { name: "description", content: loaderData.resumo },
          { property: "og:title", content: loaderData.titulo },
          { property: "og:description", content: loaderData.resumo },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Notícia não encontrada — Comunidade Diesel" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-5xl">Notícia não encontrada</h1>
      <Link to="/" className="mt-4 inline-block text-primary">Voltar para o início</Link>
    </section>
  ),
  component: NoticiaPage,
});

function NoticiaPage() {
  const n = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link to="/" className="text-sm text-primary">← Notícias</Link>
      <span className="mt-6 block text-xs font-semibold uppercase tracking-widest text-primary">{n.categoria}</span>
      <h1 className="mt-3 text-5xl leading-none md:text-6xl">{n.titulo}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{n.leitura}</p>
      <p className="mt-8 text-lg text-muted-foreground">{n.resumo}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {n.corpo.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
