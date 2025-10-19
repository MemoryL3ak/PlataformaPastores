// scripts/cleanup.js
require('dotenv').config({ path: '.env' }); // solo carga DB, no toca Google
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const email = process.env.CLEANUP_EMAIL || process.argv[2];
  if (!email) {
    console.error('Falta CLEANUP_EMAIL o pasar el correo como argumento');
    process.exit(1);
  }

  // 1) Borra Account(s) ligados a ese email
  const accounts = await p.account.findMany({
    where: { user: { email } },
    select: { id: true },
  });
  if (accounts.length) {
    await p.account.deleteMany({ where: { id: { in: accounts.map(a => a.id) } } });
    console.log(`Accounts borrados: ${accounts.length}`);
  }

  // 2) Borra User (tabla NextAuth)
  const u = await p.user.findUnique({ where: { email } });
  if (u) {
    await p.session.deleteMany({ where: { userId: u.id } });
    await p.user.delete({ where: { id: u.id } });
    console.log(`User borrado: ${email}`);
  }

  // 3) Borra tu Usuario (tabla de dominio) y rol relación
  const dom = await p.usuario.findUnique({ where: { email } });
  if (dom) {
    await p.usuarioRol.deleteMany({ where: { usuarioId: dom.id } });
    await p.usuario.delete({ where: { id: dom.id } });
    console.log(`Usuario (dominio) borrado: ${email}`);
  }

  console.log('OK');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => p.$disconnect());
