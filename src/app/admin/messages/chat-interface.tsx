"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { summarizeClientMessages } from '@/ai/flows/summarize-client-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const mockMessages = "Cliente: Hola, tengo una pregunta sobre el estado de mi caso. \n\nAdmin: ¡Buenos días! Por supuesto, déjame revisar eso por ti. ¿Puedes confirmar tu número de caso? \n\nCliente: Sí, es C-12345. \n\nAdmin: Gracias. Veo que su caso se encuentra actualmente en la fase de descubrimiento. Esperamos recibir los documentos de la parte contraria a finales de la próxima semana. \n\nCliente: Genial, gracias por la actualización.";

export function ChatInterface() {
    const { toast } = useToast();
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSummarize = async () => {
        setIsLoading(true);
        setSummary('');
        try {
            const result = await summarizeClientMessages({ messages: mockMessages });
            setSummary(result.summary);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error de IA",
                description: "No se pudo generar el resumen.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full md:w-2/3 flex flex-col">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Conversación con Tech Innovators Inc.</CardTitle>
                <Button onClick={handleSummarize} disabled={isLoading} variant="outline">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isLoading ? "Generando..." : "Resumir con IA"}
                </Button>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 overflow-y-auto">
                <div className="border rounded-md p-4 h-full bg-muted/30">
                    <pre className="whitespace-pre-wrap text-sm font-sans">{mockMessages}</pre>
                </div>
                {summary && (
                    <Alert>
                        <Wand2 className="h-4 w-4" />
                        <AlertTitle>Resumen de IA</AlertTitle>
                        <AlertDescription>{summary}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center space-x-2">
                  <Textarea placeholder="Escriba su mensaje aquí..." />
                  <Button>Enviar</Button>
              </div>
            </CardFooter>
        </div>
    );
}
