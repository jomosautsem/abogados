import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ClientTasksPage() {
    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Mis Tareas</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Estado de Tareas Asignadas</CardTitle>
                    <CardDescription>Vea el progreso de todas las tareas que el bufete está gestionando para usted.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Aquí se mostrará una tabla con todas sus tareas y su estado actual.</p>
                </CardContent>
            </Card>
        </div>
    )
}
