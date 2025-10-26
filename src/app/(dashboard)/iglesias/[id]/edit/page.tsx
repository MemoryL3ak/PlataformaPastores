import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uniqueSlug } from "@/lib/slug";

type Props = { params: { id: string } };

export default async function EditIglesiaPage({ params }: Props) {
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!idParam) notFound();

  const asNumber = Number(idParam);
  const useNumberId = Number.isInteger(asNumber) && idParam.trim() === String(asNumber);
  const where = useNumberId ? ({ id: asNumber } as const) : ({ id: idParam } as const);

  const iglesia = await prisma.iglesia.findUnique({ where: where as any });
  if (!iglesia) notFound();

  async function actualizarIglesia(formData: FormData) {
    "use server";
    const nombre = String(formData.get("nombre") || "").trim();

    // Generar slug único basado en el nuevo nombre (evita chocar con sí misma)
    const slug = await uniqueSlug(nombre, async (s) => {
      const found = await prisma.iglesia.findFirst({
        where: { slug: s, NOT: { id: (where as any).id } },
        select: { id: true },
      });
      return !!found;
    });

    await prisma.iglesia.update({
      where: where as any,
      data: { nombre, slug },
    });

    revalidatePath("/iglesias");
    redirect("/iglesias");
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-xl font-semibold">Editar iglesia</h1>

      <form action={actualizarIglesia} className="space-y-3">
        <label className="block">
          <span className="text-sm">Nombre</span>
          <input name="nombre" defaultValue={iglesia.nombre} className="input mt-1" required />
        </label>

        <div className="flex gap-2">
          <SubmitButton>Guardar cambios</SubmitButton>
          <a href="/iglesias" className="btn-outline">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  "use client";
  return <button type="submit" className="btn">{children}</button>;
}
