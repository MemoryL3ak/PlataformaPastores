"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

export function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  // Cierra el drawer al navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-40 border-b bg-[hsl(var(--card))]/80 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/60">
      <div className="flex items-center gap-3 h-14 px-3">
        {/* Botón hamburguesa solo en móvil */}
        <button
          className="md:hidden rounded-xl p-2 hover:bg-muted"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>

        <div className="font-semibold">Panel</div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-xl p-2 hover:bg-muted" aria-label="Cambiar tema">
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />
            ) : (
              <span className="inline-block w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Drawer móvil (sin Radix) */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-200 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 z-[110] h-dvh w-[80vw] max-w-[320px] bg-[hsl(var(--card))] border-r shadow-soft transition-transform duration-200 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">Navegación</div>
          <button
            className="rounded-xl p-2 hover:bg-muted"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="h-[calc(100dvh-56px)] overflow-auto">
          <Sidebar inSheet />
        </div>
      </aside>
    </header>
  );
}
