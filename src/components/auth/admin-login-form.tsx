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

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
  remember: z.boolean().default(false),
});

export function AdminLoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (values.email === "admin@test.com" && values.password === "password123") {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido, Administrador.",
      });
      router.push('/admin/dashboard');
    } else {
      toast({
        title: "Credenciales incorrectas",
        description: "Por favor, verifica tu email y contraseña.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
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
                <Input placeholder="admin@test.com" {...field} />
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
