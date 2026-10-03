CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  nome text NOT NULL,
  foto_url text,
  criado_em timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "perfis publicos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "editar proprio perfil" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "criar proprio perfil" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.duvidas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.profiles(id) ON DELETE CASCADE,
  titulo text NOT NULL CHECK (char_length(titulo) >= 5),
  texto text NOT NULL CHECK (char_length(texto) >= 10),
  criado_em timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.duvidas TO anon;
GRANT SELECT, INSERT, DELETE ON public.duvidas TO authenticated;
GRANT ALL ON public.duvidas TO service_role;
ALTER TABLE public.duvidas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ler duvidas" ON public.duvidas FOR SELECT USING (true);
CREATE POLICY "criar duvida" ON public.duvidas FOR INSERT TO authenticated WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "apagar duvida" ON public.duvidas FOR DELETE TO authenticated USING (auth.uid() = usuario_id);

CREATE TABLE public.respostas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  duvida_id uuid NOT NULL REFERENCES public.duvidas(id) ON DELETE CASCADE,
  usuario_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.profiles(id) ON DELETE CASCADE,
  texto text NOT NULL CHECK (char_length(texto) >= 1),
  criado_em timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.respostas TO anon;
GRANT SELECT, INSERT, DELETE ON public.respostas TO authenticated;
GRANT ALL ON public.respostas TO service_role;
ALTER TABLE public.respostas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ler respostas" ON public.respostas FOR SELECT USING (true);
CREATE POLICY "criar resposta" ON public.respostas FOR INSERT TO authenticated WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "apagar resposta" ON public.respostas FOR DELETE TO authenticated USING (auth.uid() = usuario_id);

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, nome)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nome', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)));
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();