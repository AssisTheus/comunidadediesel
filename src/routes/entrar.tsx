import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Comunidade Diesel" },
      { name: "description", content: "Entre na sua conta da Comunidade Diesel." },
      { property: "og:title", content: "Entrar — Comunidade Diesel" },
      { property: "og:description", content: "Entre para perguntar e responder na comunidade." },
    ],
  }),
  component: () => <AuthForm modo="entrar" />,
});
