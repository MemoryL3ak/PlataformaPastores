import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uniqueSlug } from "@/lib/slug";

export default function NuevaIglesiaPage() {
  async function crearIglesia(formData: FormData) {
    "use server";
    const nombre = String(formData.get("nombre") || "").trim();

    const slug = await uniqueSlug(nombre, async (s) => {
      const found = await prisma.iglesia.findUnique({ where: { slug: s } });
      return !!found;
    });

    await prisma.iglesia.create({ data: { nombre, slug } });
    revalidatePath("/iglesias");
    redirect("/iglesias");
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-xl font-semibold">Nueva iglesia</h1>
      <form action={crearIglesia} className="space-y-3">
        <label className="block">
          <span className="text-sm">Nombre</span>
          <input name="nombre" className="input mt-1" required />
        </label>
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
}
