import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { UserAvatar } from "./Avatar";

const links = [
  { to: "/", label: "Início" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/cursos", label: "Cursos" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  async function sair() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/entrar", replace: true });
  }
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="stripe-top" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" className="font-display text-3xl text-primary">Comunidade Diesel</Link>
        <nav className="flex flex-1 flex-wrap gap-4 text-sm font-semibold uppercase tracking-wide">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/perfil" className="flex items-center gap-2 text-sm font-semibold">
              <UserAvatar nome={profile?.nome} foto={profile?.foto_url} size={32} />
              {profile?.nome}
            </Link>
            <button onClick={sair} className="text-sm text-muted-foreground hover:text-foreground">Sair</button>
          </div>
        ) : (
          <div className="flex gap-2 text-sm font-semibold">
            <Link to="/entrar" className="px-3 py-2 hover:text-primary">Entrar</Link>
            <Link to="/registro" className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Criar conta</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 py-8 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Comunidade Diesel — bombas e bicos injetores.</p>
        <p>contato@comunidadediesel.com.br</p>
      </div>
    </footer>
  );
}
