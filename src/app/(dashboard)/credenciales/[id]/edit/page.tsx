import { prisma } from "@/lib/prisma";
import { actualizarCredencial, eliminarCredencial } from "./actions";

export default async function Page({ params }: { params: { id: string } }) {
  const [c, pastores] = await Promise.all([
    prisma.credencial.findUnique({ where: { id: params.id }, include: { pastor: true } }),
    prisma.pastor.findMany({ select: { id: true, nombres: true, apellidos: true }, orderBy:[{apellidos:"asc"},{nombres:"asc"}] })
  ]);
  if (!c) return <div className="p-6">Credencial no encontrada</div>;

  async function onUpdate(formData: FormData) { "use server"; return actualizarCredencial(c.id, formData); }
  async function onDelete() { "use server"; return eliminarCredencial(c.id); }

  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Editar Credencial</h1>

      <form action={onUpdate} className="space-y-3">
        <select name="pastorId" defaultValue={c.pastorId} className="input">
          {pastores.map(p => <option key={p.id} value={p.id}>{p.apellidos}, {p.nombres}</option>)}
        </select>
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="numero" defaultValue={c.numero ?? ""} className="input" />
          <select name="tipo" defaultValue={c.tipo} className="input">
            <option value="ACREDITACION_2025">AcreditaciÃ³n 2025</option>
            <option value="INVITADO">Invitado</option>
          </select>
          <select name="estado" defaultValue={c.estado} className="input">
            <option value="EMITIDA">Emitida</option>
            <option value="IMPRESA">Impresa</option>
            <option value="ENTREGADA">Entregada</option>
            <option value="REVOCADA">Revocada</option>
            <option value="VENCIDA">Vencida</option>
          </select>
          <input type="date" name="venceEn"
                 defaultValue={c.venceEn ? new Date(c.venceEn).toISOString().slice(0,10) : ""} className="input" />
        </div>
        <input name="qrUrl" defaultValue={c.qrUrl ?? ""} className="input" />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar cambios</button>
          <a href="/credenciales" className="btn outline">Volver</a>
        </div>
      </form>

      <form action={onDelete} className="pt-4">
        <button
          className="btn danger"
          onClick={(e)=>{ if(!confirm("Â¿Eliminar credencial?")) e.preventDefault(); }}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
}
