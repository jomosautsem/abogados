import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-3xl font-bold">Gestión de Clientes</h1>
                <CardDescription>Vea, edite y gestione los perfiles de sus clientes.</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aquí se mostrará la tabla de clientes con opciones para crear, editar y eliminar.</p>
                </CardContent>
            </Card>
        </div>
    )
}
