"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

export async function actualizarCredencial(id: string, form: FormData) {
  const exists = await prisma.credencial.findUnique({ where: { id }});
  if (!exists) notFound();

  const numero = (form.get("numero") as string) || "";
  await prisma.credencial.update({
    where: { id },
    data: {
      pastorId: String(form.get("pastorId") || exists.pastorId),
      numero: numero || exists.numero,
      tipo: String(form.get("tipo") || exists.tipo) as any,
      estado: String(form.get("estado") || exists.estado) as any,
      venceEn: form.get("venceEn") ? new Date(String(form.get("venceEn"))) : null,
      qrUrl: (form.get("qrUrl") as string) || null,
    }
  });
  revalidatePath("/credenciales");
  redirect("/credenciales");
}

export async function eliminarCredencial(id: string) {
  await prisma.credencial.delete({ where: { id }});
  revalidatePath("/credenciales");
  redirect("/credenciales");
}
