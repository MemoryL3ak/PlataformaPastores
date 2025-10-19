// layout para todas las rutas dentro de (dashboard)
import Link from "next/link";
import { ReactNode } from "react";
import "../globals.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-white">
        <div className="p-4 border-b">
          <Link href="/" className="font-semibold">Plataforma Pastores</Link>
        </div>
        <nav className="p-2 space-y-1">
          <SidebarLink href="/pastores">Pastores</SidebarLink>
          <SidebarLink href="/iglesias">Iglesias</SidebarLink>
          <SidebarLink href="/credenciales">Credenciales</SidebarLink>
          <SidebarLink href="/usuarios">Usuarios & Roles</SidebarLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b bg-white flex items-center px-4 justify-between">
          <div className="text-sm text-gray-500">Panel</div>
          <div className="flex items-center gap-2">
            {/* acÃ¡ puedes poner buscador global o avatar sesiÃ³n */}
            <span className="text-sm text-gray-400">v0.1</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
