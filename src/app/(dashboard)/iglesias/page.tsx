import { prisma } from "@/lib/prisma";

export default async function Page() {
  const items = await prisma.iglesia.findMany({ orderBy: { nombre: "asc" }, take: 200 });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Iglesias</h1>
        <a className="btn" href="/iglesias/new">Nueva</a>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        {items.map(i => (
          <li key={i.id}>
            {i.nombre} <span className="text-gray-500">({i.slug})</span>
            {" â€” "}
            <a className="underline" href={`/iglesias/${i.id}/edit`}>Editar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
