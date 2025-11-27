import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLoginForm } from '@/components/auth/admin-login-form';
import { ClientLoginForm } from '@/components/auth/client-login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background-panel');

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center bg-gray-900 text-white lg:flex">
         {bgImage && (
            <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="absolute inset-0 object-cover opacity-20"
            data-ai-hint={bgImage.imageHint}
            priority
            />
        )}
        <div className="relative z-10 flex flex-col items-center text-center p-8">
            <Logo className="w-16 h-16 mb-4 bg-white text-gray-900" />
            <h1 className="font-headline text-5xl font-bold">LexSphere Hub</h1>
            <p className="mt-4 text-lg text-gray-300">Su portal de gestión legal, simplificado.</p>
        </div>
        <div className="absolute bottom-4 text-xs text-gray-400">
            © {new Date().getFullYear()} LexSphere. Todos los derechos reservados.
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Soy Cliente</TabsTrigger>
                <TabsTrigger value="admin">Soy Administrador</TabsTrigger>
              </TabsList>
              <TabsContent value="client">
                <h2 className="text-2xl font-semibold tracking-tight text-center my-6">Acceso Cliente</h2>
                <ClientLoginForm />
              </TabsContent>
              <TabsContent value="admin">
                <h2 className="text-2xl font-semibold tracking-tight text-center my-6">Acceso Admin</h2>
                <AdminLoginForm />
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
