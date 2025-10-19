import { prisma } from "@/lib/prisma";
import { actualizarIglesia, eliminarIglesia } from "./actions";

export default async function Page({ params }: { params: { id: string } }) {
  const i = await prisma.iglesia.findUnique({ where: { id: params.id } });
  if (!i) return <div className="p-6">Iglesia no encontrada</div>;

  async function onUpdate(formData: FormData) {
    "use server";
    return actualizarIglesia(i.id, formData);
  }

  async function onDelete() {
    "use server";
    return eliminarIglesia(i.id);
  }

  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Editar Iglesia</h1>

      <form action={onUpdate} className="space-y-3">
        <input name="nombre" defaultValue={i.nombre} className="input" required />
        <input name="slug" defaultValue={i.slug} className="input" />
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="direccion" defaultValue={i.direccion ?? ""} className="input" />
          <input name="ciudad" defaultValue={i.ciudad ?? ""} className="input" />
          <input name="region" defaultValue={i.region ?? ""} className="input" />
          <input name="telefono" defaultValue={i.telefono ?? ""} className="input" />
        </div>
        <input type="email" name="email" defaultValue={i.email ?? ""} className="input" />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar cambios</button>
          <a href="/iglesias" className="btn outline">Volver</a>
        </div>
      </form>

      <form action={onDelete} className="pt-4">
        <button
          className="btn danger"
          onClick={(e)=>{ if(!confirm("Â¿Eliminar iglesia? TambiÃ©n desvincularÃ¡ a sus pastores.")) { e.preventDefault(); } }}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
}
