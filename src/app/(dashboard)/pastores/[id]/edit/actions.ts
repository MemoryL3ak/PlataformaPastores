"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

export async function actualizarPastor(id: string, form: FormData) {
  const exists = await prisma.pastor.findUnique({ where: { id }});
  if (!exists) notFound();

  await prisma.pastor.update({
    where: { id },
    data: {
      nombres: String(form.get("nombres") || ""),
      apellidos: String(form.get("apellidos") || ""),
      rut: (form.get("rut") as string) || null,
      telefono: (form.get("telefono") as string) || null,
      email: (form.get("email") as string) || null,
      estado: (form.get("estado") as any) || "PENDIENTE",
      iglesiaId: (form.get("iglesiaId") as string) || null,
      notas: (form.get("notas") as string) || null,
    }
  });

  revalidatePath("/pastores");
  redirect("/pastores");
}

export async function eliminarPastor(id: string) {
  await prisma.pastor.delete({ where: { id }});
  revalidatePath("/pastores");
  redirect("/pastores");
}
