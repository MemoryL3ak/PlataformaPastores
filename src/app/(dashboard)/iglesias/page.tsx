

/* ======================= app/(dashboard)/iglesias/page.tsx ======================= */
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Shell } from "@/components/shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export default async function Page() {
const items = await prisma.iglesia.findMany({ orderBy: { nombre: "asc" }, take: 200 });


return (
<Shell
title="Iglesias"
description="Listado general de iglesias con acciones rápidas"
actions={<Link href="/iglesias/new" className="btn-primary">Nueva</Link>}
>
<Card className="rounded-2xl shadow-soft">
<CardContent className="p-4 md:p-6">
<div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
<div className="flex-1">
<Input placeholder="Buscar por nombre o slug…" className="w-full" />
</div>
<div className="flex gap-2">
<Button variant="outline" asChild>
<Link href="/iglesias/new">Agregar</Link>
</Button>
<Button variant="default">Exportar</Button>
</div>
</div>


<div className="mt-4 overflow-auto rounded-xl border">
<table className="w-full text-sm">
<thead className="bg-muted/60">
<tr>
<th className="text-left font-medium px-4 py-3">Nombre</th>
<th className="text-left font-medium px-4 py-3">Slug</th>
<th className="text-left font-medium px-4 py-3">Estado</th>
<th className="text-right font-medium px-4 py-3">Acciones</th>
</tr>
</thead>
<tbody>
{items.map(i => (
<tr key={i.id} className="border-t">
<td className="px-4 py-3 font-medium">{i.nombre}</td>
<td className="px-4 py-3 text-muted-foreground">{i.slug}</td>
<td className="px-4 py-3">
<Badge variant="secondary">Activa</Badge>
</td>
<td className="px-4 py-3 text-right">
<div className="inline-flex gap-2">
<Button variant="outline" size="sm" asChild>
<Link href={`/iglesias/${i.id}`}>Ver</Link>
</Button>
<Button variant="default" size="sm" asChild>
<Link href={`/iglesias/${i.id}/edit`}>Editar</Link>
</Button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</CardContent>
</Card>
</Shell>
);
}

