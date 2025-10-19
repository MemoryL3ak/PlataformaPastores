"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function generarNumero(tipo: string) {
  const aÃ±o = new Date().getFullYear();
  const last = await prisma.credencial.findFirst({
    where: { tipo: tipo as any },
    orderBy: { emitidaEn: "desc" },
    select: { numero: true },
  });
  const n = last?.numero ? parseInt(last.numero.split("-").pop() || "0", 10) + 1 : 1;
  return `${aÃ±o}-${n.toString().padStart(4,"0")}`;
}

export async function crearCredencial(form: FormData) {
  const pastorId = String(form.get("pastorId") || "");
  const tipo = String(form.get("tipo") || "ACREDITACION_2025");
  const estado = String(form.get("estado") || "EMITIDA");
  const numeroManual = String(form.get("numero") || "");
  const venceEn = form.get("venceEn") ? new Date(String(form.get("venceEn"))) : null;
  const qrUrl = (form.get("qrUrl") as string) || null;

  const numero = numeroManual || await generarNumero(tipo);

  await prisma.credencial.create({
    data: { pastorId, tipo: tipo as any, estado: estado as any, numero, venceEn: venceEn ?? undefined, qrUrl: qrUrl ?? undefined },
  });
  revalidatePath("/credenciales");
  redirect("/credenciales");
}
