import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED: Record<string, string[]> = {
  "/admin": ["admin"],          // solo admin
  "/panel": ["admin", "visor"], // admin o visor
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const roles = ((token as any).roles || []) as string[];

  for (const [prefix, need] of Object.entries(PROTECTED)) {
    if (pathname.startsWith(prefix) && !need.some((r) => roles.includes(r))) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/panel/:path*"],
};
