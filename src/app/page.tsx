import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLoginForm } from '@/components/auth/admin-login-form';
import { ClientLoginForm } from '@/components/auth/client-login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  return (
    <div className="relative min-h-screen w-full">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-background/30" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl">LexSphere Hub</CardTitle>
            <CardDescription>Portal de Gestión para Bufete de Abogados</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="admin">Administrador</TabsTrigger>
              </TabsList>
              <TabsContent value="client">
                <ClientLoginForm />
              </TabsContent>
              <TabsContent value="admin">
                <AdminLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
