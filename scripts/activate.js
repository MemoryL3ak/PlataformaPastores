require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  const email = (process.argv[2] || "").toLowerCase();
  if (!email) { console.error("Uso: node scripts/activate.js correo@dominio"); process.exit(1); }

  const user = await p.usuario.upsert({
    where: { email },
    update: { activo: true },
    create: { email, nombre: "", activo: true },
  });

  const visor = await p.rol.upsert({
    where: { nombre: 'visor' },
    update: {},
    create: { nombre: 'visor' },
  });

  await p.usuarioRol.upsert({
    where: { usuarioId_rolId: { usuarioId: user.id, rolId: visor.id } },
    update: {},
    create: { usuarioId: user.id, rolId: visor.id },
  });

  console.log(`Activado: ${email}`);
  await p.$disconnect();
})();
