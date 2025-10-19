"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearPastor(form: FormData) {
  // Campos básicos
  const nombres = String(form.get("nombres") ?? "").trim();
  const apellidos = String(form.get("apellidos") ?? "").trim();

  if (!nombres || !apellidos) {
    throw new Error("Nombres y Apellidos son obligatorios.");
  }

  await prisma.pastor.create({
    data: {
      nombres,
      apellidos,
      rut: (form.get("rut") as string) || null,
      telefono: (form.get("telefono") as string) || null,
      email: (form.get("email") as string) || null,
      estado: (form.get("estado") as "PENDIENTE" | "ACTIVO" | "INACTIVO") ?? "PENDIENTE",
      iglesiaId: (form.get("iglesiaId") as string) || null,
      notas: (form.get("notas") as string) || null,
    },
  });

  // Refresca el listado y vuelve
  revalidatePath("/pastores");
  redirect("/pastores");
}
