// app/dashboard/page.tsx
"use client";

import React from "react";
import { Mic, ArrowRight, FileText, Volume1, Lightbulb, BookHeart } from "lucide-react";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  return (
    <>
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
      <div className="flex flex-col items-center justify-center py-10 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-[#0088CC] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <button className="relative w-32 h-32 rounded-full bg-[#0088CC] flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
            <Mic className="w-14 h-14" />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mt-6">Presiona para hablar</h2>
        <p className="text-slate-400 mt-2">Toca el micrófono y pregúntame lo que quieras sobre tu AFP</p>
      </div>
        <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Acciones rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Consultar AFP", icon: Mic, color: "bg-blue-50 text-blue-600" },
                { label: "Subir documento", icon: FileText, color: "bg-green-50 text-green-600" },
                { label: "Escuchar explicación", icon: Volume1, color: "bg-orange-50 text-orange-600" },
                { label: "Ver Guardaditos", icon: BookHeart, color: "bg-slate-50 text-slate-600" },
              ].map((action, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-6`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-4">{action.label}</h3>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
              <span className="text-slate-400 text-sm font-medium">Última consulta</span>
              <h3 className="text-2xl font-bold text-[#1E293B] mt-2 mb-4 leading-snug">
                ¿Cuánto tengo acumulado en mi AFP?
              </h3>
              <p className="text-slate-400 mb-6 flex items-center gap-2">
                Hace 2 días • <span className="text-green-600 font-medium">Verificada en blockchain</span>
              </p>
              <Button variant="soft" className="bg-[#E0F2FE] text-[#0088CC] hover:bg-[#BAE6FD] rounded-2xl px-6">
                Ver historial
              </Button>
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
    </>
  );
}