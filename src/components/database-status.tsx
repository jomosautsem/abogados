"use server";

import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

export async function DatabaseStatus() {
  let status: 'En línea' | 'Desconectado' = 'En línea';
  let variant: 'secondary' | 'destructive' = 'secondary';

  try {
    const supabase = createClient();
    const { error } = await supabase.from('clients').select('id').limit(1);

    if (error) {
      throw error;
    }
  } catch (error) {
    status = 'Desconectado';
    variant = 'destructive';
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Base de Datos:</span>
      <Badge variant={variant} className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${variant === 'secondary' ? 'bg-green-500' : 'bg-red-500'}`} />
        {status}
      </Badge>
    </div>
  );
}
