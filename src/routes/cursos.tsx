import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cursos")({
  head: () => ({
    meta: [
      { title: "Cursos — Comunidade Diesel" },
      { name: "description", content: "Cursos sobre bombas injetoras, bicos injetores e common rail." },
      { property: "og:title", content: "Cursos — Comunidade Diesel" },
      { property: "og:description", content: "Aprenda injeção diesel do básico à bancada." },
    ],
  }),
  component: Cursos,
});

const CURSOS = [
  { nome: "Fundamentos da injeção diesel", nivel: "Iniciante", texto: "Como bomba, bicos e filtros trabalham juntos." },
  { nome: "Bombas injetoras rotativas e em linha", nivel: "Intermediário", texto: "Desmontagem, regulagem e defeitos mais comuns." },
  { nome: "Common rail na prática", nivel: "Avançado", texto: "Diagnóstico eletrônico, pressão de rail e teste de bicos." },
];

function Cursos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-6xl">Cursos</h1>
      <p className="mt-2 text-muted-foreground">Em breve. Fale com a gente para entrar na lista de espera.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CURSOS.map((c) => (
          <div key={c.nome} className="rounded-lg border bg-card p-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{c.nivel}</span>
            <h2 className="mt-2 text-3xl leading-tight">{c.nome}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.texto}</p>
          </div>
        ))}
      </div>
      <Link to="/contato" className="mt-10 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Quero saber mais</Link>
    </section>
  );
}
