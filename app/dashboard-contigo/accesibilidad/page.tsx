import React from "react";
import { 
  Type, 
  Volume2, 
  Eye, 
  HandMetal, 
  ChevronRight,
  Accessibility
} from "lucide-react";

export default function AccesibilidadPage() {
  const opciones = [
    {
      titulo: "Tamaño de texto",
      descripcion: "Ajusta el tamaño de la letra para leer mejor.",
      valor: "Grande",
      icon: <Type size={28} />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      titulo: "Lectura por voz",
      descripcion: "Activa la narración automática de textos.",
      valor: "Activado",
      icon: <Volume2 size={28} />,
      color: "bg-green-50 text-green-600"
    },
    {
      titulo: "Alto contraste",
      descripcion: "Colores más claros y oscuros para ver mejor.",
      valor: "Desactivado",
      icon: <Eye size={28} />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      titulo: "Asistente de señas",
      descripcion: "Videos de apoyo en lengua de señas peruana.",
      valor: "Configurar",
      icon: <HandMetal size={28} />,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-slate-600">
          <Accessibility size={35} />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-[#1E293B]">Accesibilidad</h1>
          <p className="text-slate-500 text-2xl mt-1">
            Personaliza VozMayor para que se adapte mejor a ti.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {opciones.map((opcion, index) => (
          <div 
            key={index}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-8">
              <div className={`w-20 h-20 ${opcion.color} rounded-[30px] flex items-center justify-center shadow-sm`}>
                {opcion.icon}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-[#1E293B]">
                  {opcion.titulo}
                </h3>
                <p className="text-slate-500 text-xl leading-relaxed">
                  {opcion.descripcion}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xl font-medium">
                {opcion.valor}
              </span>
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#0088CC] group-hover:bg-[#E0F2FE] transition-all">
                <ChevronRight size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#104D82] rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">¿Necesitas ayuda adicional?</h2>
          <p className="text-blue-100 text-xl opacity-90">
            Podemos conectar una videollamada con un asistente en vivo.
          </p>
        </div>
        <button className="bg-[#1ED785] text-[#104D82] px-10 py-5 rounded-3xl font-bold text-xl shadow-lg hover:scale-105 transition-transform">
          Hablar con un asesor
        </button>
      </div>
    </div>
  );
}