import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export const metadata: Metadata = {
  title: "Plataforma Pastores",
  description: "Gestión de iglesias y pastores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh w-full grid grid-cols-1 md:grid-cols-[16rem_1fr]">
            {/* Sidebar fijo en desktop */}
            <Sidebar />

            {/* Contenido */}
            <div className="flex flex-col min-w-0">
              <Topbar />
              <main className="flex-1 py-4">
                <div className="container">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
