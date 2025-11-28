// supabase/functions/admin-login/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

// Cabeceras CORS para permitir llamadas desde cualquier origen (ideal para desarrollo)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Manejar la solicitud OPTIONS de preflight para CORS
  // Esto es crucial para que el navegador permita la solicitud POST.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();

    // Crear un cliente de Supabase con la clave de servicio para saltarse RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
         auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // 1. Buscar al usuario en la tabla admin_users
    const { data: adminUser, error: selectError } = await supabaseAdmin
      .from('admin_users')
      .select('email, password_hash, role')
      .eq('email', email)
      .single();

    if (selectError || !adminUser) {
      return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // 2. Verificar la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(password, adminUser.password_hash);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // 3. Autenticación exitosa: devolver los datos del usuario
    return new Response(JSON.stringify({ 
        message: 'Inicio de sesión exitoso',
        user: {
            email: adminUser.email,
            role: adminUser.role,
        }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
