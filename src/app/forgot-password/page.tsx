"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ChevronLeft, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // TODO: Implementar reseteo de contraseña de Supabase
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: "Correo enviado",
      description: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
    });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
                 <div className="mx-auto mb-4">
                    <Logo />
                </div>
                <CardTitle className="font-headline text-3xl">Recuperar Contraseña</CardTitle>
                <CardDescription>
                    {isSubmitted 
                        ? "Revisa tu bandeja de entrada." 
                        : "Introduce tu email para recibir un enlace de recuperación."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSubmitted ? (
                     <div className="text-center">
                        <p className="text-muted-foreground mb-4">Puede que el correo tarde unos minutos en llegar. No olvides revisar tu carpeta de spam.</p>
                     </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Enviando..." : "Enviar enlace"}
                            </Button>
                        </form>
                    </Form>
                )}
                 <Button variant="ghost" className="w-full mt-4" asChild>
                    <Link href="/">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Volver al inicio de sesión
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
