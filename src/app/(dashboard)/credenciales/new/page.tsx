import { prisma } from "@/lib/prisma";
import { crearCredencial } from "./actions";

export default async function Page() {
  const pastores = await prisma.pastor.findMany({
    select: { id: true, nombres: true, apellidos: true },
    orderBy: [{ apellidos: "asc" }, { nombres: "asc" }],
  });

  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Nueva Credencial</h1>
      <form action={crearCredencial} className="space-y-3">
        <select name="pastorId" className="input" defaultValue="">
          <option value="">Selecciona Pastor</option>
          {pastores.map(p => <option key={p.id} value={p.id}>{p.apellidos}, {p.nombres}</option>)}
        </select>
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="numero" className="input" placeholder="NÃºmero (opcional)" />
          <select name="tipo" className="input" defaultValue="ACREDITACION_2025">
            <option value="ACREDITACION_2025">AcreditaciÃ³n 2025</option>
            <option value="INVITADO">Invitado</option>
          </select>
          <select name="estado" className="input" defaultValue="EMITIDA">
            <option value="EMITIDA">Emitida</option>
            <option value="IMPRESA">Impresa</option>
            <option value="ENTREGADA">Entregada</option>
            <option value="REVOCADA">Revocada</option>
            <option value="VENCIDA">Vencida</option>
          </select>
          <input name="venceEn" type="date" className="input" />
        </div>
        <input name="qrUrl" className="input" placeholder="URL QR (opcional)" />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar</button>
          <button type="button" className="btn outline" onClick={()=>history.back()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
