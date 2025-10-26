export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9\s-]/g, "")                     // caracteres raros
    .trim()
    .replace(/\s+/g, "-")                             // espacios → guiones
    .replace(/-+/g, "-");
}

export async function uniqueSlug(base: string, exists: (slug: string) => Promise<boolean>) {
  let slug = slugify(base);
  if (!(await exists(slug))) return slug;

  // agrega sufijos -2, -3, ...
  for (let i = 2; i < 10_000; i++) {
    const candidate = `${slug}-${i}`;
    if (!(await exists(candidate))) return candidate;
  }
  throw new Error("No se pudo generar un slug único");
}
