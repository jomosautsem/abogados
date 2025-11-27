import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TasksPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-3xl font-bold">Gestión de Tareas</h1>
                <CardDescription>Cree, asigne y de seguimiento a las tareas de los clientes.</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Tarea
              </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Tareas</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aquí se mostrará la tabla de tareas con opciones para crear, asignar y completar.</p>
                </CardContent>
            </Card>
        </div>
    )
}
