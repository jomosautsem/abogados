import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ClientMessagesPage() {
    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Mensajería</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Comunicación con el Bufete</CardTitle>
                    <CardDescription>Envíe y reciba mensajes de nuestro equipo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-96 border rounded-md p-4 bg-muted/50 overflow-y-auto flex flex-col gap-4">
                       <div className="p-3 rounded-lg bg-background max-w-[80%] self-start">
                         <p className="font-bold text-sm">Admin</p>
                         <p>Good morning! Of course, let me check that for you. Can you confirm your case number?</p>
                       </div>
                       <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-[80%] self-end">
                         <p className="font-bold text-sm">Usted</p>
                         <p>Yes, it's C-12345.</p>
                       </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center space-x-2">
                        <Textarea placeholder="Escriba su mensaje aquí..." />
                        <Button>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
