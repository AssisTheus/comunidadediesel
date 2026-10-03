import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, formatData } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/Avatar";

export const Route = createFileRoute("/comunidade/")({
  head: () => ({
    meta: [
      { title: "Comunidade — Dúvidas sobre injeção diesel" },
      { name: "description", content: "Pergunte e responda dúvidas sobre bombas injetoras, bicos e common rail." },
      { property: "og:title", content: "Comunidade — Dúvidas sobre injeção diesel" },
      { property: "og:description", content: "Pergunte e responda dúvidas sobre injeção diesel." },
    ],
  }),
  component: Comunidade,
});

function Comunidade() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const { data: duvidas, isLoading } = useQuery({
    queryKey: ["duvidas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("duvidas")
        .select("id, titulo, criado_em, autor:profiles(nome, foto_url), respostas(count)")
        .order("criado_em", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (titulo.trim().length < 5 || texto.trim().length < 10)
      return toast.error("Escreva um título (mín. 5 letras) e a descrição da dúvida (mín. 10 letras).");
    const { error } = await supabase.from("duvidas").insert({ titulo: titulo.trim(), texto: texto.trim() });
    if (error) return toast.error("Não foi possível publicar.");
    setTitulo(""); setTexto("");
    toast.success("Dúvida publicada.");
    qc.invalidateQueries({ queryKey: ["duvidas"] });
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-6xl">Comunidade</h1>
      <p className="mt-2 text-muted-foreground">Tire suas dúvidas sobre bombas e bicos injetores.</p>

      {user ? (
        <form onSubmit={publicar} className="mt-8 space-y-3 rounded-lg border bg-card p-6">
          <Input placeholder="Título da dúvida" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Textarea placeholder="Descreva o problema: veículo, sintomas, o que já foi feito..." rows={4} value={texto} onChange={(e) => setTexto(e.target.value)} />
          <Button type="submit">Publicar dúvida</Button>
        </form>
      ) : (
        <div className="mt-8 rounded-lg border bg-card p-6 text-muted-foreground">
          <Link to="/entrar" className="font-semibold text-primary">Entre na sua conta</Link> para enviar uma dúvida.
        </div>
      )}

      <div className="mt-10 divide-y rounded-lg border">
        {isLoading && <p className="p-6 text-muted-foreground">Carregando...</p>}
        {duvidas?.length === 0 && <p className="p-6 text-muted-foreground">Nenhuma dúvida ainda. Seja o primeiro!</p>}
        {duvidas?.map((d) => (
          <Link key={d.id} to="/comunidade/$id" params={{ id: d.id }} className="flex items-center gap-4 p-5 hover:bg-muted">
            <UserAvatar nome={d.autor?.nome} foto={d.autor?.foto_url} />
            <div className="flex-1">
              <h2 className="font-sans text-lg font-semibold">{d.titulo}</h2>
              <p className="text-xs text-muted-foreground">{d.autor?.nome} · {formatData(d.criado_em)}</p>
            </div>
            <span className="text-sm text-primary">{d.respostas?.[0]?.count ?? 0} respostas</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
