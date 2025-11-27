import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewClientDialog } from "./new-client-dialog";
import { createClient } from "@/lib/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function ClientsPage() {
    const supabase = createClient();
    const { data: clients, error } = await supabase.from('clients').select('*');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-3xl font-bold">Gestión de Clientes</h1>
                <CardDescription>Vea, edite y gestione los perfiles de sus clientes.</CardDescription>
              </div>
              <NewClientDialog />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-destructive">Error al cargar los clientes: {error.message}</p>}
                    {!clients || clients.length === 0 && !error ? (
                        <p className="text-muted-foreground">No hay clientes registrados.</p>
                    ) : (
                       <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre Completo</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">Dirección</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients?.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.full_name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">{client.address}</TableCell>
                                    <TableCell>
                                        <Badge variant={client.status === 'Activo' ? 'secondary' : 'destructive'}>{client.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                       </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
