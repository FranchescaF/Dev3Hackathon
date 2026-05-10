// app/dashboard/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Mic, ScanLine, BookHeart, History, ShieldCheck, 
  Settings, Accessibility, Volume2, User, LucideIcon 
} from "lucide-react";
import { Logo } from "@/components/Logo";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Inicio", icon: Home, exact: true },
  { to: "/dashboard/miafp", label: "Mi AFP", icon: Mic },
  { to: "/dashboard/subir", label: "Subir Documento", icon: ScanLine },
  { to: "/dashboard/guardaditos", label: "Guardaditos", icon: BookHeart },
  { to: "/dashboard/historial", label: "Historial", icon: History },
  { to: "/dashboard/seguridad", label: "Mi Seguridad", icon: ShieldCheck },
  { to: "/dashboard/accesibilidad", label: "Accesibilidad", icon: Accessibility },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    return item.exact ? pathname === item.to : pathname.startsWith(item.to);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <aside className="hidden lg:flex flex-col w-76 bg-white border-r border-slate-100 p-5 sticky top-0 h-screen">
        <div className="mb-4"><Logo /></div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-4 px-5 py-4 rounded-3xl text-lg transition-all ${
                isActive(item)
                  ? "bg-[#0088CC] text-white shadow-md font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className={`${isActive(item) ? "text-white" : "text-slate-500"} w-6 h-6`} /> 
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenido Dinámico */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-100 h-20 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="text-slate-400 text-md font-bold">Bienvenido de nuevo a PensiónSegura</div>
          <div className="flex items-center gap-6">
            <button className="text-slate-600 hover:text-primary"><Volume2 className="w-5 h-5" /></button>
            <button className="text-slate-600 hover:text-primary"><Accessibility className="w-5 h-5" /></button>
            <button className="text-slate-600 hover:text-primary"><Settings className="w-5 h-5" /></button>
            <div className="w-12 h-12 rounded-full bg-[#0088CC] flex items-center justify-center text-white shadow-sm">
              <User className="w-6 h-6" />
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 space-y-10 max-w-6xl">
          {children} {/* Aquí es donde se cargará cada página */}
        </main>
      </div>
    </div>
  );
}