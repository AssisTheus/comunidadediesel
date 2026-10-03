import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, formatData } from "@/lib/auth";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/Avatar";

export const Route = createFileRoute("/comunidade/$id")({
  head: () => ({
    meta: [
      { title: "Dúvida — Comunidade Diesel" },
      { name: "description", content: "Veja a dúvida e as respostas da comunidade." },
      { property: "og:title", content: "Dúvida — Comunidade Diesel" },
      { property: "og:description", content: "Veja a dúvida e as respostas da comunidade." },
    ],
  }),
  component: Duvida,
});

function Duvida() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [texto, setTexto] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["duvida", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("duvidas")
        .select("*, autor:profiles(nome, foto_url), respostas(id, texto, criado_em, autor:profiles(nome, foto_url))")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  async function responder(e: React.FormEvent) {
    e.preventDefault();
    if (!texto.trim()) return toast.error("Escreva sua resposta antes de enviar.");
    const { error } = await supabase.from("respostas").insert({ duvida_id: id, texto: texto.trim() });
    if (error) return toast.error("Não foi possível enviar.");
    setTexto("");
    toast.success("Resposta publicada.");
    qc.invalidateQueries({ queryKey: ["duvida", id] });
  }

  if (isLoading) return <p className="mx-auto max-w-4xl px-4 py-16 text-muted-foreground">Carregando...</p>;
  if (!data)
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-5xl">Dúvida não encontrada</h1>
        <Link to="/comunidade" className="mt-4 inline-block text-primary">Voltar para a comunidade</Link>
      </div>
    );

  const respostas = [...(data.respostas ?? [])].sort((a, b) => a.criado_em.localeCompare(b.criado_em));

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <Link to="/comunidade" className="text-sm text-primary">← Comunidade</Link>
      <article className="mt-4 rounded-lg border bg-card p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <UserAvatar nome={data.autor?.nome} foto={data.autor?.foto_url} />
          {data.autor?.nome} · {formatData(data.criado_em)}
        </div>
        <h1 className="mt-4 text-5xl leading-none">{data.titulo}</h1>
        <p className="mt-4 whitespace-pre-wrap">{data.texto}</p>
      </article>

      <h2 className="mt-10 text-3xl">{respostas.length} respostas</h2>
      <div className="mt-4 space-y-4">
        {respostas.map((r) => (
          <div key={r.id} className="rounded-lg border p-5">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <UserAvatar nome={r.autor?.nome} foto={r.autor?.foto_url} size={28} />
              {r.autor?.nome} · {formatData(r.criado_em)}
            </div>
            <p className="mt-3 whitespace-pre-wrap">{r.texto}</p>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={responder} className="mt-8 space-y-3">
          <Textarea rows={4} placeholder="Sua resposta..." value={texto} onChange={(e) => setTexto(e.target.value)} />
          <Button type="submit">Responder</Button>
        </form>
      ) : (
        <p className="mt-8 text-muted-foreground"><Link to="/entrar" className="font-semibold text-primary">Entre</Link> para responder.</p>
      )}
    </section>
  );
}
