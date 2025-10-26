import { prisma } from "@/lib/prisma";

export default async function Page() {
  const items = await prisma.pastor.findMany({
    include: { iglesia: true },
    orderBy: [{ apellidos: "asc" }, { nombres: "asc" }],
    take: 200,
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Pastores</h1>
        <a className="btn" href="/pastores/new">Nuevo</a>
      </div>

<table className="table">
        <thead>
          <tr>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Iglesia</th>
            <th className="text-left p-2">Estado</th>
            <th className="text-left p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.apellidos}, {p.nombres}</td>
              <td className="p-2">{p.iglesia?.nombre ?? "-"}</td>
              <td className="p-2">{p.estado}</td>
              <td className="p-2">
                <a className="underline" href={`/pastores/${p.id}/edit`}>Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
