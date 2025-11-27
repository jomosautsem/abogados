import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInterface } from "./chat-interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const clients = [
    { name: "Tech Innovators Inc.", avatar: "TI", seed: "client1" },
    { name: "Quantum Solutions", avatar: "QS", seed: "client2" },
    { name: "Stellar Dynamics", avatar: "SD", seed: "client3" },
    { name: "Nexus Enterprises", avatar: "NE", seed: "client4" },
];

export default function MessagesPage() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h1 className="font-headline text-3xl font-bold">Mensajería</h1>
            <Card className="flex-1 flex flex-col md:flex-row min-h-[600px] overflow-hidden">
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r">
                    <CardHeader><CardTitle>Clientes</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-1">
                            {clients.map((client, index) => (
                                <li key={client.name} className={`p-2 rounded-md flex items-center gap-3 cursor-pointer ${index === 0 ? 'bg-muted' : 'hover:bg-muted'}`}>
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${client.seed}/40/40`} data-ai-hint="logo abstract" />
                                        <AvatarFallback>{client.avatar}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{client.name}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </div>
                <ChatInterface />
            </Card>
        </div>
    )
}
