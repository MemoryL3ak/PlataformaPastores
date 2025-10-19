import { prisma } from "@/lib/prisma";

export default async function Page() {
  const items = await prisma.credencial.findMany({
    include: { pastor: true },
    orderBy: { emitidaEn: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Credenciales</h1>
        <a className="btn" href="/credenciales/new">Nueva</a>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">NÃºmero</th>
            <th className="text-left p-2">Pastor</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Estado</th>
            <th className="text-left p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.numero}</td>
              <td className="p-2">{c.pastor?.apellidos}, {c.pastor?.nombres}</td>
              <td className="p-2">{c.tipo}</td>
              <td className="p-2">{c.estado}</td>
              <td className="p-2">
                <a className="underline" href={`/credenciales/${c.id}/edit`}>Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
