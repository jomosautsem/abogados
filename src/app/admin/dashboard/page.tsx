import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, ClipboardCheck } from "lucide-react";

const stats = [
    { title: "Clientes Totales", value: "125", icon: Briefcase },
    { title: "Clientes Activos", value: "110", icon: Users },
    { title: "Tareas Pendientes", value: "32", icon: ClipboardCheck },
];

const recentClients = [
    { name: "Tech Innovators Inc.", rfc: "TII123456XYZ", status: "Activo" },
    { name: "Quantum Solutions", rfc: "QSA654321ABC", status: "Activo" },
    { name: "Nexus Enterprises", rfc: "NEX789012DEF", status: "Inactivo" },
    { name: "Stellar Dynamics", rfc: "STD345678GHI", status: "Activo" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Dashboard de Administrador</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Comercial</TableHead>
                <TableHead className="hidden md:table-cell">RFC</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client) => (
                <TableRow key={client.rfc}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.rfc}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'Activo' ? 'secondary' : 'destructive'}>{client.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
