"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLoginForm } from '@/components/auth/admin-login-form';
import { ClientLoginForm } from '@/components/auth/client-login-form';
import { LoginGraphic } from '@/components/auth/login-graphic';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'client';

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <LoginGraphic />
      </div>
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
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
