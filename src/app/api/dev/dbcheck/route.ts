import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token }) {
      if (!token?.email) return token;

      let dbUser = await prisma.usuario.findUnique({
        where: { email: token.email },
        include: { roles: { include: { rol: true } } },
      });

      if (!dbUser) {
        dbUser = await prisma.usuario.create({
          data: {
            email: token.email,
            nombre: token.name || "",
            roles: {
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
          include: { roles: { include: { rol: true } } },
        });
      }

      token.uid = dbUser.id;
      token.roles = dbUser.roles.map((r: any) => r.rol.nombre);
      token.name = dbUser.nombre || token.name;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).roles = token.roles || [];
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
