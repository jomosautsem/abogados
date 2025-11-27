"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLoginForm } from '@/components/auth/admin-login-form';
import { ClientLoginForm } from '@/components/auth/client-login-form';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'client';

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
            <Link href="/" className="inline-block">
                <Logo className="w-12 h-12 mx-auto" />
            </Link>
            <h1 className="font-headline text-3xl font-bold mt-4">Estrategias Juridicas</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo.</p>
        </div>
        <Card>
            <CardHeader className="p-0 border-b">
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none h-12">
                        <TabsTrigger value="client" className="rounded-tl-lg h-full">Portal Cliente</TabsTrigger>
                        <TabsTrigger value="admin" className="rounded-tr-lg h-full">Portal Admin</TabsTrigger>
                    </TabsList>
                    <CardContent className="p-6">
                        <TabsContent value="client">
                            <h2 className="text-xl font-semibold tracking-tight text-center mb-4">Acceso Cliente</h2>
                            <ClientLoginForm />
                        </TabsContent>
                        <TabsContent value="admin">
                             <h2 className="text-xl font-semibold tracking-tight text-center mb-4">Acceso Admin</h2>
                            <AdminLoginForm />
                        </TabsContent>
                    </CardContent>
                </Tabs>
            </CardHeader>
        </Card>
        <div className="text-center mt-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Volver a la página de inicio
            </Link>
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
