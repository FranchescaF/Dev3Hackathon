import React from "react";
import { TrendingUp, Shield, Calendar, ArrowUpRight } from "lucide-react";

export default function MiAFPPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold text-[#1E293B]">Mi AFP</h1>
      <div className="bg-[#104D82] text-white rounded-[40px] p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-blue-100 text-lg">Saldo total acumulado</span>
            <div className="bg-[#1ED785]/20 text-[#1ED785] px-4 py-2 rounded-full flex items-center gap-2 font-bold">
              <TrendingUp size={18} /> +3.2%
            </div>
          </div>
          <div className="text-6xl font-bold mb-8">
            S/. 87,450<span className="text-3xl opacity-80">.00</span>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-2">
              <Shield size={20} className="text-green-400" />
              <span className="font-medium">AFP Integra</span>
            </div>
            <div className="bg-[#1A5F96] px-6 py-3 rounded-2xl flex items-center gap-2">
              <span className="text-green-400 font-medium">Fondo 2 • Mixto</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-blue-200 text-sm mb-1">Aporte mensual</p>
              <p className="text-2xl font-bold text-white">S/. 412.50</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-blue-200 text-sm mb-1">Próximo pago</p>
              <p className="text-2xl font-bold text-[#1ED785]">15 May</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      <div className="bg-[#E0F9F1] border border-[#1ED785]/30 rounded-[35px] p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#1ED785] rounded-full flex items-center justify-center text-white">
            <Calendar size={32} />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-lg">Próxima pensión</p>
            <h3 className="text-3xl font-bold text-[#1E293B]">15 de mayo, 2026</h3>
            <p className="text-[#1ED785] font-bold text-xl mt-1">S/. 950.00 estimado</p>
          </div>
        </div>
        <button className="text-[#1ED785] hover:scale-110 transition-transform">
          <ArrowUpRight size={40} />
        </button>
      </div>
        <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl font-bold text-[#1E293B]">Rendimiento del Fondo 2</h2>
        </div>
        <div className="space-y-6">
          {/* Últimos 12 meses */}
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <span className="text-slate-600 text-xl font-medium">Últimos 12 meses</span>
            <span className="text-[#1ED785] text-3xl font-bold">+3.2%</span>
          </div>

          {/* Últimos 3 años */}
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <span className="text-slate-600 text-xl font-medium">Últimos 3 años</span>
            <span className="text-[#1ED785] text-3xl font-bold">+7.8%</span>
          </div>

          {/* Desde afiliación */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-slate-600 text-xl font-medium">Desde afiliación</span>
            <span className="text-[#1ED785] text-3xl font-bold">+62.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}