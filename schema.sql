-- ========= TABLAS DE LA APLICACIÓN =========

-- 1. Tabla para Clientes
-- Almacena la información de los clientes del bufete.
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    address TEXT,
    email TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'Activo' NOT NULL, -- Puede ser 'Activo' o 'Inactivo'
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE clients IS 'Tabla para almacenar los perfiles de los clientes del bufete.';

-- 2. Tabla para Tareas
-- Almacena las tareas asignadas a los clientes.
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE tasks IS 'Tareas legales o administrativas asignadas a un cliente.';

-- 3. Tabla de Mensajes
-- Para la comunicación en tiempo real entre administradores y clientes.
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL, -- Puede ser un auth.users.id (cliente) o un admin_users.id (admin)
    sender_role TEXT NOT NULL, -- 'cliente' o 'admin'
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE messages IS 'Mensajes de chat entre clientes y administradores.';
-- Habilitar Realtime para la tabla de mensajes
ALTER PUBLICATION supabase_realtime ADD TABLE messages;


-- ========= AUTENTICACIÓN Y PERFILES =========

-- 1. Tabla para Perfiles de Administradores (AUTENTICACIÓN PERSONALIZADA)
-- Esta tabla no usará Supabase Auth directamente, sino una lógica personalizada.
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, -- Contraseña hasheada
    role TEXT DEFAULT 'admin' NOT NULL, -- Puede ser 'admin' o 'superadmin'
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE admin_users IS 'Usuarios administradores con sistema de login personalizado.';

-- 2. Tabla de Perfiles para Clientes (VINCULADA A SUPABASE AUTH)
-- Esta tabla extiende la tabla auth.users de Supabase para añadir info extra.
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID UNIQUE REFERENCES clients(id) ON DELETE SET NULL,
    full_name TEXT,
    avatar_url TEXT
);
COMMENT ON TABLE profiles IS 'Datos de perfil de los usuarios (clientes) que extienden auth.users.';

-- Función para crear un perfil de cliente automáticamente al registrar un nuevo usuario en Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función anterior después de cada nuevo registro
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- FIN DEL SCRIPT
