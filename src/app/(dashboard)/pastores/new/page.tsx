import { prisma } from "@/lib/prisma";
import { crearPastor } from "./actions";

export default async function Page() {
  // Trae las iglesias para el <select>
  const iglesias = await prisma.iglesia.findMany({
    select: { id: true, nombre: true },
    orderBy: { nombre: "asc" },
  });

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold">Nuevo Pastor</h1>

      <form action={crearPastor} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            name="nombres"
            className="input border rounded px-3 py-2"
            placeholder="Nombres"
            required
          />
          <input
            name="apellidos"
            className="input border rounded px-3 py-2"
            placeholder="Apellidos"
            required
          />

          <input
            name="rut"
            className="input border rounded px-3 py-2"
            placeholder="RUT (opcional)"
          />
          <input
            name="telefono"
            className="input border rounded px-3 py-2"
            placeholder="Teléfono (opcional)"
          />
          <input
            type="email"
            name="email"
            className="input border rounded px-3 py-2"
            placeholder="Email (opcional)"
          />

          <select
            name="estado"
            defaultValue="PENDIENTE"
            className="input border rounded px-3 py-2"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>

          <select
            name="iglesiaId"
            defaultValue=""
            className="input border rounded px-3 py-2"
          >
            <option value="">(Sin iglesia)</option>
            {iglesias.map((i) => (
              <option key={i.id} value={i.id}>
                {i.nombre}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="notas"
          rows={3}
          className="input border rounded px-3 py-2 w-full"
          placeholder="Notas (opcional)"
        />

        <div className="flex gap-2">
          <button type="submit" className="btn bg-blue-600 text-white rounded px-4 py-2">
            Guardar
          </button>
          <a href="/pastores" className="btn outline border rounded px-4 py-2">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
