-- POLÍTICA DE SEGURIDAD PARA LA TABLA admin_users

-- 1. Habilitar Row Level Security (RLS) en la tabla.
-- Esto asegura que ninguna política por defecto permita el acceso. El acceso debe ser explícito.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Crear una política para PERMITIR la lectura (SELECT).
-- Esta política permite que CUALQUIER usuario que esté autenticado (es decir, que tenga una sesión válida)
-- pueda LEER la información de la tabla admin_users.
-- Esto es necesario para que nuestro formulario de login pueda verificar si el email del administrador existe.
CREATE POLICY "Allow authenticated users to read admin users"
ON public.admin_users
FOR SELECT
TO authenticated -- 'authenticated' es un rol especial de Supabase para cualquier usuario con sesión iniciada.
USING (true);

-- NOTA: No estamos creando políticas para INSERT, UPDATE o DELETE, por lo que esas acciones
-- seguirán estando protegidas y solo se podrán hacer desde el dashboard de Supabase o con el rol 'service_role'.
