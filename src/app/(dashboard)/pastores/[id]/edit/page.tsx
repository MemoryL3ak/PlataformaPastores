import { prisma } from "@/lib/prisma";
import { actualizarPastor, eliminarPastor } from "./actions";

export default async function Page({ params }: { params: { id: string } }) {
  const [p, iglesias] = await Promise.all([
    prisma.pastor.findUnique({ where: { id: params.id }, include: { iglesia: true } }),
    prisma.iglesia.findMany({ select: { id: true, nombre: true }, orderBy: { nombre: "asc" } }),
  ]);
  if (!p) return <div className="p-6">Pastor no encontrado</div>;

  async function onUpdate(formData: FormData) { "use server"; return actualizarPastor(p.id, formData); }
  async function onDelete() { "use server"; return eliminarPastor(p.id); }

  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Editar Pastor</h1>

      <form action={onUpdate} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="nombres" defaultValue={p.nombres} className="input" required />
          <input name="apellidos" defaultValue={p.apellidos} className="input" required />
          <input name="rut" defaultValue={p.rut ?? ""} className="input" />
          <input name="telefono" defaultValue={p.telefono ?? ""} className="input" />
          <input name="email" type="email" defaultValue={p.email ?? ""} className="input" />
          <select name="estado" defaultValue={p.estado} className="input">
            <option value="PENDIENTE">Pendiente</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
          <select name="iglesiaId" defaultValue={p.iglesiaId ?? ""} className="input">
            <option value="">(Sin iglesia)</option>
            {iglesias.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
          </select>
        </div>
        <textarea name="notas" defaultValue={p.notas ?? ""} className="input" rows={3} />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar cambios</button>
          <a href="/pastores" className="btn outline">Volver</a>
        </div>
      </form>

      <form action={onDelete} className="pt-4">
        <button
          className="btn danger"
          onClick={(e)=>{ if(!confirm("Â¿Eliminar pastor? (si tiene credencial, tambiÃ©n se eliminarÃ¡ por cascada)")) e.preventDefault(); }}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
}
