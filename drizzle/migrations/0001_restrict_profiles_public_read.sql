CREATE INDEX IF NOT EXISTS duvidas_usuario_id_idx ON public.duvidas (usuario_id);
CREATE INDEX IF NOT EXISTS respostas_usuario_id_idx ON public.respostas (usuario_id);

DROP POLICY IF EXISTS "perfis publicos" ON public.profiles;

CREATE POLICY "ver proprio perfil ou autores"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (
  auth.uid() = id
  OR EXISTS (SELECT 1 FROM public.duvidas d WHERE d.usuario_id = profiles.id)
  OR EXISTS (SELECT 1 FROM public.respostas r WHERE r.usuario_id = profiles.id)
);