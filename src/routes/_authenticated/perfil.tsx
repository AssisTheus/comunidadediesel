import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, formatData } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/Avatar";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Comunidade Diesel" },
      { name: "description", content: "Seu perfil na Comunidade Diesel." },
      { property: "og:title", content: "Meu perfil — Comunidade Diesel" },
      { property: "og:description", content: "Seu perfil na Comunidade Diesel." },
    ],
  }),
  component: Perfil,
});

function redimensionar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = 200;
      const c = document.createElement("canvas");
      c.width = s; c.height = s;
      const lado = Math.min(img.width, img.height);
      c.getContext("2d")!.drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, s, s);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function Perfil() {
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const [nome, setNome] = useState("");
  useEffect(() => { if (profile) setNome(profile.nome); }, [profile]);

  const { data: minhas } = useQuery({
    queryKey: ["minhas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("duvidas").select("id, titulo, criado_em, respostas(count)").eq("usuario_id", user!.id).order("criado_em", { ascending: false });
      return data ?? [];
    },
  });

  async function salvar(campos: { nome?: string; foto_url?: string }, msg: string) {
    const { error } = await supabase.from("profiles").update(campos).eq("id", user!.id);
    if (error) return void toast.error("Não foi possível salvar.");
    toast.success(msg);
    qc.invalidateQueries();
  }

  async function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\/(png|jpe?g|gif|webp)$/.test(f.type)) return void toast.error("Use uma imagem nos formatos PNG, JPG, GIF ou WEBP.");
    if (f.size > 2 * 1024 * 1024) return void toast.error("A imagem é muito grande. O limite é 2 MB.");
    void salvar({ foto_url: await redimensionar(f) }, "Foto atualizada.");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-wrap items-center gap-6">
        <UserAvatar nome={profile?.nome} foto={profile?.foto_url} size={96} />
        <div>
          <h1 className="text-5xl">{profile?.nome}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form className="space-y-3 rounded-lg border bg-card p-6" onSubmit={(e) => { e.preventDefault(); if (nome.trim().length < 2) return void toast.error("Digite um nome com pelo menos 2 letras."); void salvar({ nome: nome.trim() }, "Nome atualizado."); }}>
          <h2 className="text-2xl">Trocar nome</h2>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          <Button type="submit">Salvar</Button>
        </form>
        <div className="space-y-3 rounded-lg border bg-card p-6">
          <h2 className="text-2xl">Foto de perfil</h2>
          <Input type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={trocarFoto} />
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF ou WEBP até 2 MB.</p>
        </div>
      </div>
      <h2 className="mt-12 text-3xl">Minhas dúvidas</h2>
      <div className="mt-4 divide-y rounded-lg border">
        {minhas?.length === 0 && <p className="p-5 text-muted-foreground">Você ainda não publicou dúvidas.</p>}
        {minhas?.map((d) => (
          <Link key={d.id} to="/comunidade/$id" params={{ id: d.id }} className="flex justify-between p-5 hover:bg-muted">
            <span className="font-semibold">{d.titulo}</span>
            <span className="text-sm text-muted-foreground">{d.respostas?.[0]?.count ?? 0} respostas · {formatData(d.criado_em)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
