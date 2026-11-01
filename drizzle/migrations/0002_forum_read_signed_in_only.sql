DROP POLICY IF EXISTS "ler duvidas" ON public.duvidas;
CREATE POLICY "ler duvidas membros"
ON public.duvidas
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "ler respostas" ON public.respostas;
CREATE POLICY "ler respostas membros"
ON public.respostas
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "ver proprio perfil ou autores" ON public.profiles;
CREATE POLICY "ver proprio perfil ou autores"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
  OR EXISTS (SELECT 1 FROM public.duvidas d WHERE d.usuario_id = profiles.id)
  OR EXISTS (SELECT 1 FROM public.respostas r WHERE r.usuario_id = profiles.id)
);