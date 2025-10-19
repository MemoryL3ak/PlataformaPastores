"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

function toSlug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function actualizarIglesia(id: string, form: FormData) {
  const nombre = String(form.get("nombre") || "");
  const slug = String(form.get("slug") || toSlug(nombre));

  // valida existencia
  const exists = await prisma.iglesia.findUnique({ where: { id }});
  if (!exists) notFound();

  await prisma.iglesia.update({
    where: { id },
    data: {
      nombre, slug,
      direccion: (form.get("direccion") as string) || null,
      ciudad: (form.get("ciudad") as string) || null,
      region: (form.get("region") as string) || null,
      telefono: (form.get("telefono") as string) || null,
      email: (form.get("email") as string) || null,
    }
  });
  revalidatePath("/iglesias");
  redirect("/iglesias");
}

export async function eliminarIglesia(id: string) {
  await prisma.iglesia.delete({ where: { id }});
  revalidatePath("/iglesias");
  redirect("/iglesias");
}
