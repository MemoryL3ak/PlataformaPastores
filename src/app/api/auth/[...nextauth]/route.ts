// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    // SOLO usuarios con Usuario.activo = true
    async signIn({ account, profile }: any) {
      if (account?.provider !== "google") return false;
      const email = profile?.email?.toLowerCase();
      if (!email) return false;

      const u = await prisma.usuario.findUnique({ where: { email } });
      if (!u?.activo) {
        // Si no existe, opcional: lo creamos INACTIVO para que aparezca en el panel
        if (!u) {
          await prisma.usuario.create({
            data: { email, nombre: profile?.name || "", activo: false },
          });
        }
        return false; // Bloquear login si no estÃ¡ activo
      }

      // Asegura que tenga rol base "visor"
      await prisma.usuario.update({
        where: { email },
        data: {
          roles: {
            connectOrCreate: {
              where: {
                usuarioId_rolId: {
                  usuarioId: u.id,
                  rolId: (
                    await prisma.rol.upsert({
                      where: { nombre: "visor" },
                      update: {},
                      create: { nombre: "visor" },
                    })
                  ).id,
                },
              },
              create: {
                rol: {
                  connectOrCreate: {
                    where: { nombre: "visor" },
                    create: { nombre: "visor" },
                  },
                },
              },
            },
          },
        },
      });

      return true;
    },

    async jwt({ token }: any) {
      if (!token?.email) return token;
      const dbUser = await prisma.usuario.findUnique({
        where: { email: token.email.toLowerCase() },
        include: { roles: { include: { rol: true } } },
      });
      token.uid = dbUser?.id;
      token.roles = dbUser?.roles?.map((r: any) => r.rol.nombre) || [];
      if (dbUser?.nombre) token.name = dbUser.nombre;
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).roles = token.roles || [];
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  allowDangerousEmailAccountLinking: false,
});

export { handler as GET, handler as POST };
