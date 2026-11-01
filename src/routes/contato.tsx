import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Comunidade Diesel" },
      { name: "description", content: "Fale com a Comunidade Diesel por email." },
      { property: "og:title", content: "Contato — Comunidade Diesel" },
      { property: "og:description", content: "Email da Comunidade Diesel." },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-6xl">Contato</h1>
      <p className="mt-2 text-muted-foreground">Dúvidas, parcerias ou cursos — é só chamar.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <a href="mailto:contato@comunidadediesel.com.br" className="rounded-lg border bg-card p-6 hover:border-primary">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Email</span>
          <p className="mt-2 text-lg">contato@comunidadediesel.com.br</p>
        </a>
      </div>
    </section>
  );
}
