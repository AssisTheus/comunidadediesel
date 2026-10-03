import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Criar conta — Comunidade Diesel" },
      { name: "description", content: "Crie sua conta grátis na Comunidade Diesel." },
      { property: "og:title", content: "Criar conta — Comunidade Diesel" },
      { property: "og:description", content: "Cadastre-se para tirar dúvidas sobre injeção diesel." },
    ],
  }),
  component: () => <AuthForm modo="registro" />,
});
