"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toSlug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function crearIglesia(form: FormData) {
  const nombre = String(form.get("nombre") || "");
  const slug = String(form.get("slug") || toSlug(nombre));
  await prisma.iglesia.create({
    data: {
      nombre, slug,
      direccion: (form.get("direccion") as string) || null,
      ciudad: (form.get("ciudad") as string) || null,
      region: (form.get("region") as string) || null,
      telefono: (form.get("telefono") as string) || null,
      email: (form.get("email") as string) || null,
    },
  });
  revalidatePath("/iglesias");
  redirect("/iglesias");
}
