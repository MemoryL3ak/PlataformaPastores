/* ======================= app/(dashboard)/page.tsx ======================= */
import { Card, CardContent } from "@/components/ui/card";
import { Shell } from "@/components/shell";


export default function Page() {
return (
<Shell
title="Bienvenido 👋"
description="Resumen de actividad y accesos rápidos"
>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
{["Iglesias", "Pastores", "Acreditación"].map((k, i) => (
<Card key={i} className="rounded-2xl shadow-soft">
<CardContent className="p-5">
<p className="text-sm text-muted-foreground">Módulo</p>
<p className="text-lg font-semibold mt-1">{k}</p>
</CardContent>
</Card>
))}
</div>
</Shell>
);
}