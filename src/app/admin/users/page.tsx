import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-3xl font-bold">Gestión de Usuarios</h1>
                <CardDescription>Añada o elimine usuarios administradores (solo Superadmin).</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Usuarios Administradores</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aquí se mostrará la tabla de usuarios administradores con opciones para crear, editar y eliminar.</p>
                </CardContent>
            </Card>
        </div>
    )
}
