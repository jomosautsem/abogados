"use client";

import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLoginForm } from '@/components/auth/admin-login-form';
import { ClientLoginForm } from '@/components/auth/client-login-form';
import { LoginGraphic } from '@/components/auth/login-graphic';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export function LoginForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'client';

  return (
    <div className="relative min-h-screen w-full">
        <LoginGraphic />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/80 to-background" />
        
        <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
          <Logo className="w-12 h-12" />
        </Link>

        <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
            <div className="hidden lg:block" />
            <div className="flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-6">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Iniciar Sesión</h1>
                    <p className="mt-2 text-muted-foreground">
                    {defaultTab === 'client' ? 'Acceda a su portal de cliente.' : 'Acceda al panel de administración.'}
                    </p>
                </div>
                
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="client" asChild><Link href="/login?tab=client">Portal Cliente</Link></TabsTrigger>
                        <TabsTrigger value="admin" asChild><Link href="/login?tab=admin">Portal Admin</Link></TabsTrigger>
                    </TabsList>
                    <TabsContent value="client" className="pt-6">
                        <ClientLoginForm />
                    </TabsContent>
                    <TabsContent value="admin" className="pt-6">
                        <AdminLoginForm />
                    </TabsContent>
                </Tabs>
                <div className="text-center text-sm text-muted-foreground">
                    Al hacer clic en Iniciar Sesión, usted acepta nuestros{' '}
                    <Link href="#" className="underline hover:text-primary">
                    Términos de Servicio
                    </Link>{' '}
                    y{' '}
                    <Link href="#" className="underline hover:text-primary">
                    Política de Privacidad
                    </Link>
                    .
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}
