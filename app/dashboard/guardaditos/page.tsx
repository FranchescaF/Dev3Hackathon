import React from "react";
import { Search, Volume2, Eye, CheckCircle2, BookHeart } from "lucide-react";

export default function GuardaditosPage() {
  const items = [
    {
      tipo: "CONSULTA AFP",
      fecha: "12 mar 2026",
      titulo: "Tu fondo acumulado al cierre del mes anterior fue de S/ 42,350.",
      verificado: true,
    },
    {
      tipo: "EXPLICACIÓN DOCUMENTO",
      fecha: "8 mar 2026",
      titulo: "Estado de cuenta de marzo: rentabilidad del 5.2%, todo en orden.",
      verificado: true,
    },
    {
      tipo: "ESTADO DE CUENTA",
      fecha: "1 mar 2026",
      titulo: "Aporte mensual recibido. Próximo aporte: 1 de abril.",
      verificado: true,
    },
    {
      tipo: "RECORDATORIO DE TRÁMITE",
      fecha: "20 feb 2026",
      titulo: "Renovación de DNI vence en 60 días.",
      verificado: false,
    },
    {
      tipo: "CONSULTA AFP",
      fecha: "15 feb 2026",
      titulo: "¿Puedo retirar antes de los 65? Respuesta: solo en casos especiales.",
      verificado: true,
    },
    {
      tipo: "EXPLICACIÓN DOCUMENTO",
      fecha: "5 feb 2026",
      titulo: "Constancia de aportes 2025 lista para descargar.",
      verificado: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#FDF2E9] rounded-2xl flex items-center justify-center text-[#845328]">
          <BookHeart size={35} />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-[#1E293B]">Tus Guardaditos</h1>
          <p className="text-slate-500 text-xl mt-1">Guarda tus consultas y documentos para revisarlos cuando quieras.</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input 
            type="text" 
            placeholder="Buscar en tus guardaditos..." 
            className="w-full pl-14 pr-6 py-4 bg-[#F1F5F9] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#0088CC]/20"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {["Todos", "Consulta AFP", "Explicación documento", "Recordatorio"].map((filtro, i) => (
            <button 
              key={filtro}
              className={`px-6 py-3 rounded-2xl text-md font-bold whitespace-nowrap transition-all ${
                i === 0 ? "bg-[#0088CC] text-white" : "bg-[#F1F5F9] text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-4 py-1.5 bg-[#E0F2FE] text-[#0088CC] rounded-xl text-sm font-bold tracking-wide">
                  {item.tipo}
                </span>
                {item.verificado && (
                  <div className="flex items-center gap-1.5 text-green-600 font-medium">
                    <CheckCircle2 size={18} />
                    <span className="text-sm">Verificado</span>
                  </div>
                )}
              </div>
              <p className="text-slate-400 font-medium mb-2">{item.fecha}</p>
              <h3 className="text-2xl font-bold text-[#1E293B] leading-snug">
                {item.titulo}
              </h3>
            </div>
            <div className="flex gap-3 mt-8">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#E0F2FE] text-[#0088CC] rounded-2xl font-bold hover:bg-[#BAE6FD] transition-colors">
                <Volume2 size={20} /> Escuchar
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                <Eye size={20} /> Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}