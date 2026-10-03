import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AuthForm({ modo }: { modo: "entrar" | "registro" }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    if (modo === "registro") {
      if (nome.trim().length < 2) { toast.error("Digite um nome com pelo menos 2 letras."); setCarregando(false); return; }
      if (senha.length < 6) { toast.error("A senha precisa ter pelo menos 6 caracteres."); setCarregando(false); return; }
      const { error } = await supabase.auth.signUp({ email, password: senha, options: { emailRedirectTo: window.location.origin, data: { nome: nome.trim() } } });
      setCarregando(false);
      if (error) return toast.error(error.message.includes("registered") ? "Este email já está cadastrado." : error.message);
      setConfirmar(true);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      setCarregando(false);
      if (error) return toast.error("Email ou senha incorretos.");
      toast.success("Bem-vindo de volta!");
      navigate({ to: "/comunidade" });
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Não foi possível entrar com Google.");
    else if (!r.redirected) navigate({ to: "/comunidade" });
  }

  if (confirmar)
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-5xl">Confira seu email</h1>
        <p className="mt-4 text-muted-foreground">Enviamos um link para <b>{email}</b>. Clique nele para ativar sua conta.</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-5xl">{modo === "entrar" ? "Entrar" : "Criar conta"}</h1>
      <form onSubmit={enviar} className="mt-8 space-y-4 rounded-lg border bg-card p-6">
        {modo === "registro" && (
          <div className="space-y-2"><Label htmlFor="nome">Nome</Label><Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required /></div>
        )}
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="senha">Senha</Label><Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /></div>
        <Button type="submit" className="w-full" disabled={carregando}>{modo === "entrar" ? "Entrar" : "Criar conta"}</Button>
        <Button type="button" variant="outline" className="w-full" onClick={google}>Continuar com Google</Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {modo === "entrar" ? <>Não tem conta? <Link to="/registro" className="text-primary">Cadastre-se</Link></> : <>Já tem conta? <Link to="/entrar" className="text-primary">Entrar</Link></>}
      </p>
    </div>
  );
}
