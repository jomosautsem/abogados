import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-3xl font-bold">Mis Documentos</h1>
                <CardDescription>Suba y gestione los documentos relacionados con sus casos.</CardDescription>
              </div>
              <Button>
                <UploadCloud className="mr-2 h-4 w-4" />
                Subir Documento
              </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Archivos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aquí se mostrará una tabla con sus documentos, con opciones para subir nuevos archivos y descargarlos.</p>
                </CardContent>
            </Card>
        </div>
    )
}
