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
import Link from "next/link";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
});

export function ClientLoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // TODO: Implement Supabase client login server action
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Función no implementada",
      description: "El inicio de sesión del cliente se conectará a Supabase Auth.",
      variant: "destructive",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="underline text-muted-foreground hover:text-foreground">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </Form>
  );
}
