"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Mic, ArrowRight, FileText, Volume1, Lightbulb, BookHeart } from "lucide-react";
import DashboardContigo from "../components/dashboardContigo";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="space-y-10">
      {/* 1. El saludo amigable */}
      <div className="w-full rounded-[40px] p-10 bg-gradient-to-br from-[#E0F7F9] to-[#E8F5E9] border border-white/50 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-slate-600 text-xl block mb-2 font-medium">Hola,</span>
          <h1 className="text-5xl font-bold text-[#1E293B] flex items-center gap-4 mb-4">
            Don Martin <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-xl leading-relaxed">
            ¿En qué te puedo ayudar hoy? Puedes hablar conmigo o subir un documento.
          </p>
        </div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-white/20 rounded-full blur-2xl"></div>
      </div>

      {/* 2. El componente principal del dashboard */}
      <div className="w-full flex flex-col items-center">
        <DashboardContigo />
      </div>

      {/* 3. Acciones rápidas */}
      <section>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Consultar AFP", icon: Mic, color: "bg-blue-50 text-blue-600", route: "/dashboard-contigo/miafp" },
            { label: "Subir documento", icon: FileText, color: "bg-green-50 text-green-600", route: "/dashboard-contigo/subir" },
            { label: "Escuchar explicación", icon: Volume1, color: "bg-orange-50 text-orange-600", route: "/dashboard-contigo/historial" },
            { label: "Ver Guardaditos", icon: BookHeart, color: "bg-slate-50 text-slate-600", route: "/dashboard-contigo/guardaditos" },
          ].map((action, i) => (
            <div 
              key={i} 
              onClick={() => router.push(action.route)} 
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-6`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-4">{action.label}</h3>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0088CC] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Tarjetas de historial y consejos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
          <span className="text-slate-400 text-sm font-medium">Última consulta</span>
          <h3 className="text-2xl font-bold text-[#1E293B] mt-2 mb-4 leading-snug">
            ¿Cuánto tengo acumulado en mi AFP?
          </h3>
          <p className="text-slate-400 mb-6 flex items-center gap-2">
            Hace 2 días • <span className="text-green-600 font-medium">Verificada en blockchain</span>
          </p>
          {/* Asegúrate de que el componente Button exista en tus carpetas */}
          <button className="bg-[#E0F2FE] text-[#0088CC] hover:bg-[#BAE6FD] rounded-2xl px-6 py-2 font-bold transition-colors">
            Ver historial
          </button>
        </div>
        
        <div className="p-8 bg-[#FDF2E9] rounded-[32px] border border-orange-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-[#1E293B]">Consejo del día</h3>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed">
            Recuerda revisar tu estado de cuenta cada 6 meses. Si tienes dudas, ¡pregúntame!
          </p>
        </div>
      </div>
    </div>
  );
}