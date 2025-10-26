"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Church, Users, Settings } from "lucide-react";

const NAV = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/iglesias", label: "Iglesias", icon: Church },
  { href: "/pastores", label: "Pastores", icon: Users },
  { href: "/ajustes", label: "Ajustes", icon: Settings },
];

type SidebarProps = { inSheet?: boolean };

export function Sidebar({ inSheet }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        inSheet
          ? "flex flex-col w-full h-full p-4 gap-4 bg-[hsl(var(--card))]"
          : "hidden md:flex md:flex-col w-64 shrink-0 h-dvh sticky top-0 p-4 gap-4 bg-[hsl(var(--card))] border-r"
      )}
    >
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="size-9 rounded-xl bg-brand" />
        <div>
          <p className="font-semibold leading-tight">Plataforma Pastores</p>
          <p className="text-xs text-muted-foreground">IEP San Bernardo</p>
        </div>
      </div>

      <nav className="mt-2 grid gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                active ? "bg-brand text-white shadow-soft" : "hover:bg-muted"
              )}
            >
              <Icon className={cn("size-4", active && "opacity-90")} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {!inSheet && (
        <div className="mt-auto text-xs text-muted-foreground px-2">
          v1.0 • {new Date().getFullYear()}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
