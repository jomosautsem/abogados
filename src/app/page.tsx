import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle2, Briefcase, MessageSquare, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
    {
      icon: Briefcase,
      title: 'Gestión de Casos Centralizada',
      description: 'Acceda a toda la información de sus casos, documentos y comunicaciones en un solo lugar seguro.',
    },
    {
      icon: FolderKanban,
      title: 'Seguimiento de Tareas Transparente',
      description: 'Vea el estado de las tareas y reciba actualizaciones en tiempo real sobre el progreso de su caso.',
    },
    {
      icon: MessageSquare,
      title: 'Comunicación Directa y Segura',
      description: 'Envíe y reciba mensajes de forma segura con nuestro equipo legal a través de nuestro portal.',
    },
];

export default function LandingPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center gap-2 mr-6">
            <Logo className="w-8 h-8" />
            <span className="font-headline text-xl font-bold">Estrategias Juridicas</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                    <Link href="/login?tab=client">Portal Cliente</Link>
                </Button>
                <Button asChild>
                    <Link href="/login?tab=admin">Portal Admin</Link>
                </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
            {bgImage && (
                <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="absolute inset-0 object-cover opacity-10"
                data-ai-hint={bgImage.imageHint}
                priority
                />
            )}
            <div className="container relative text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Su Portal de Gestión Legal, Simplificado.
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Bienvenido a Estrategias Juridicas, la plataforma donde la claridad y la eficiencia se encuentran. Gestione sus casos, documentos y comunicación con nuestro bufete de manera fácil y segura.
                </p>
                <div className="mt-10">
                    <Button size="lg" asChild>
                        <Link href="/login?tab=client">Acceder a mi portal</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Todo lo que necesita, en un solo lugar</h2>
              <p className="text-muted-foreground mt-2">Diseñado para ofrecerle total transparencia y control.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

         {/* CTA Section */}
        <section className="py-20">
            <div className="container text-center">
                <h2 className="font-headline text-3xl font-bold">¿Listo para empezar?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Inicie sesión en su portal para acceder a todos sus beneficios.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/login?tab=client">Iniciar Sesión</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Estrategias Juridicas. Todos los derechos reservados.
          </p>
           <Link href="#" className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <span className="font-headline text-lg font-bold">Estrategias Juridicas</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
