import React from "react";
import { Upload, FileText } from "lucide-react";

export default function EscanearPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
          Subir Documento
        </h1>
        <p className="text-slate-500 text-xl leading-relaxed">
          Sube tu documento AFP y te lo explico en palabras simples.
        </p>
      </div>
      <div className="bg-white border-4 border-dashed border-[#0088CC]/30 rounded-[40px] p-16 flex flex-col items-center justify-center text-center space-y-6 hover:border-[#0088CC]/60 transition-colors cursor-pointer group">
        <div className="w-24 h-24 bg-[#0088CC] rounded-[30px] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
          <Upload size={48} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Arrastra tu documento aquí
          </h2>
          <p className="text-slate-400 text-lg">
            O toca para seleccionarlo desde tu teléfono
          </p>
        </div>
        <button className="bg-[#0088CC] text-white text-xl font-bold py-5 px-12 rounded-3xl shadow-lg hover:bg-[#0077B3] active:scale-95 transition-all">
          Subir documento AFP
        </button>
        <p className="text-slate-400 font-medium">
          Aceptamos PDF, JPG, PNG
        </p>
      </div>
      <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100 text-[#0088CC]">
        <FileText className="shrink-0 w-8 h-8" />
        <p className="text-lg leading-relaxed">
          <strong>Consejo:</strong> Asegúrate de que la foto sea clara y se vea todo el texto del documento para darte una mejor explicación.
        </p>
      </div>
    </div>
  );
}