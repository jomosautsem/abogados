import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, Users, Briefcase, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <h1 className="font-headline text-xl font-bold text-sidebar-foreground">Estrategias Juridicas</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/admin/dashboard"><Home /><span>Dashboard</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Clientes">
                <Link href="/admin/clients"><Briefcase /><span>Clientes</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Usuarios">
                <Link href="/admin/users"><Users /><span>Usuarios</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/admin/100/100" data-ai-hint="person face" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <p className="text-sm font-medium">Usuario Admin</p>
                        <p className="text-xs text-muted-foreground/80">Superadmin</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Ajustes</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Cerrar sesión</span></DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:justify-end">
            <SidebarTrigger className="md:hidden"/>
            <p className="font-semibold text-sm text-muted-foreground hidden md:block">Portal de Administración</p>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
