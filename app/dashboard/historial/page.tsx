import React from "react";
import { ExternalLink, ShieldCheck, History } from "lucide-react";

export default function HistorialPage() {
  const registros = [
    {
      fecha: "12 mar 2026 - 10:34 am",
      pregunta: "¿Cuánto tengo acumulado?",
      hash: "0x8f2c...a91d",
    },
    {
      fecha: "8 mar 2026 - 4:12 pm",
      pregunta: "Explicar estado de cuenta marzo",
      hash: "0xb71e...3f02",
    },
    {
      fecha: "1 mar 2026 - 9:00 am",
      pregunta: "Confirmar aporte mensual",
      hash: "0x4d83...c612",
    },
    {
      fecha: "15 feb 2026 - 11:20 am",
      pregunta: "¿Puedo retirar antes?",
      hash: "0x91ba...77ef",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-[#1E293B] flex items-center gap-4">
          Historial verificado
        </h1>
        <p className="text-slate-500 text-2xl">
          Cada consulta queda registrada con un sello digital único en Solana.
        </p>
      </div>

      <div className="relative pl-12 space-y-8">
        <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>
        {registros.map((item, index) => (
          <div key={index} className="relative group">
            <div className="absolute -left-[45px] top-6 w-12 h-12 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-[#0088CC] shadow-sm z-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div className="bg-white border border-slate-100 rounded-[35px] p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <p className="text-slate-400 text-lg font-medium">{item.fecha}</p>
                  <h3 className="text-3xl font-bold text-[#1E293B]">
                    {item.pregunta}
                  </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="bg-[#F1F5F9] px-4 py-2 rounded-2xl flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Hash:</span>
                      <code className="text-[#0088CC] font-mono font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-100">
                        {item.hash}
                      </code>
                    </div>
                    <span className="text-slate-400 text-lg">• Verificado en Solana</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="bg-[#E0F9F1] text-[#1ED785] px-6 py-2 rounded-2xl flex items-center gap-2 font-bold text-lg border border-[#1ED785]/20">
                    <ShieldCheck size={20} /> Verificado
                  </div>
                  <button className="flex items-center gap-3 px-6 py-4 bg-[#E0F2FE] text-[#0088CC] rounded-2xl font-bold text-lg hover:bg-[#BAE6FD] transition-all w-full md:w-auto justify-center">
                    Ver comprobante <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer informativo */}
      <div className="bg-slate-50 p-8 rounded-[40px] flex items-center gap-6 border border-slate-100">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
          <History size={32} />
        </div>
        <p className="text-slate-500 text-lg leading-relaxed">
          Este historial es permanente y no puede ser alterado, garantizando que tu información siempre esté protegida y disponible.
        </p>
      </div>
    </div>
  );
}