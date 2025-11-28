"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
  remember: z.boolean().default(false),
});

export function AdminLoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "leosan@gmail.com",
      password: "leosan123",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Llamar a la Edge Function para validar al administrador
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { email: values.email, password: values.password },
      });

      if (error || data.error) {
        throw new Error(error?.message || data.error || 'Credenciales de Admin incorrectas');
      }
      
      // Si la validación del admin es exitosa, ahora establecemos la sesión del cliente de prueba
       const { error: authError } = await supabase.auth.signInWithPassword({
          email: 'client@test.com', 
          password: 'password123',
      });

      if (authError) {
          throw new Error("No se pudo establecer la sesión de Supabase: " + authError.message);
      }

      // ¡Éxito! Redirigir al dashboard de admin.
      toast({
        title: "Inicio de sesión de Admin exitoso",
        description: `Bienvenido, ${data.user.role === 'superadmin' ? 'Superadmin' : 'Administrador'}.`,
      });
      router.push('/admin/dashboard');
      router.refresh();

    } catch (e: any) {
        toast({
            title: "Error de inicio de sesión",
            description: e.message || "Ocurrió un error inesperado.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de Administrador</FormLabel>
              <FormControl>
                <Input placeholder="admin@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
            <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormLabel className="font-normal">Recuérdame</FormLabel>
                </FormItem>
                )}
            />
            <div className="text-sm">
                <Link href="/forgot-password" className="underline text-muted-foreground hover:text-primary">
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión como Admin"}
        </Button>
      </form>
    </Form>
  );
}
