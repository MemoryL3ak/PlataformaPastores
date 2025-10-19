// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/pastores"); // o "/(dashboard)" si prefieres un home de bienvenida
  return null;
}
