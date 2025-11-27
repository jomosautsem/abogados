import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
        <h1 className="font-headline text-3xl font-bold">Bienvenido, Tech Innovators Inc.</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Información de la Empresa</CardTitle>
                    <CardDescription>Datos de su compañía.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p><strong>RFC:</strong> TII123456XYZ</p>
                    <p className="flex items-center gap-2"><strong>Estado:</strong> <Badge variant="secondary">Activo</Badge></p>
                    <p><strong>Contacto:</strong> contact@techinnovators.com</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Resumen de Tareas</CardTitle>
                    <CardDescription>Sus tareas pendientes y completadas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold mb-2">Pendientes (2)</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Revisión de contrato de servicio</li>
                            <li>Entrega de documentación fiscal Q3</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Completadas (5)</h3>
                         <ul className="list-disc list-inside text-muted-foreground">
                            <li>Registro de marca "InnovateX"</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
