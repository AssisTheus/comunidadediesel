export function UserAvatar({ nome, foto, size = 36 }: { nome?: string | null | undefined; foto?: string | null | undefined; size?: number }) {
  const inicial = (nome ?? "?").trim().charAt(0).toUpperCase();
  return foto ? (
    <img src={foto} alt={nome ?? ""} width={size} height={size} className="rounded-full object-cover border border-border" style={{ width: size, height: size }} />
  ) : (
    <span className="inline-flex items-center justify-center rounded-full bg-primary font-display text-primary-foreground" style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {inicial}
    </span>
  );
}
