import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Bell, 
  ShieldAlert 
} from "lucide-react";

export default function SeguridadPage() {
  const caracteristicas = [
    {
      titulo: "Cifrado de extremo a extremo",
      descripcion: "Solo tú puedes ver tus consultas y documentos.",
      icon: <Lock size={28} />,
    },
    {
      titulo: "Registro en Solana",
      descripcion: "12 consultas verificadas este mes.",
      icon: <ShieldCheck size={28} />,
    },
    {
      titulo: "Sin venta de datos",
      descripcion: "Nunca compartimos tu información con terceros.",
      icon: <EyeOff size={28} />,
    },
    {
      titulo: "Alertas activas",
      descripcion: "Te avisamos si hay actividad inusual en tu cuenta.",
      icon: <Bell size={28} />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-[#1E293B]">Mi Seguridad</h1>
        <p className="text-slate-500 text-2xl">
          Tu información está protegida y solo tú decides quién la ve.
        </p>
      </div>
      <div className="bg-[#008BB7] rounded-[40px] p-12 text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col gap-5">
          <div className="w-20 h-24 bg-white/20 backdrop-blur-md rounded-[30px] flex items-center justify-center border border-white/30 shadow-inner">
            <ShieldCheck size={50} strokeWidth={2.5} />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Cuenta protegida</h2>
            <p className="text-blue-50 text-xl opacity-90 max-w-2xl leading-relaxed">
              Todas tus consultas están cifradas y registradas en blockchain para tu tranquilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Grilla de Características de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caracteristicas.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
          >
            {/* Icono envuelto en un círculo suave */}
            <div className="w-20 h-20 bg-[#F0F9FA] text-[#008BB7] rounded-3xl flex items-center justify-center shadow-sm">
              {item.icon}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-[#1E293B]">
                {item.titulo}
              </h3>
              <p className="text-slate-500 text-xl leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de Acción Extra (Opcional) */}
      <div className="bg-orange-50 border border-orange-100 p-8 rounded-[40px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <p className="text-orange-900 text-lg font-medium">
            ¿Deseas descargar tu certificado de seguridad anual?
          </p>
        </div>
        <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold border border-orange-200 hover:bg-orange-100 transition-colors">
          Descargar Certificado
        </button>
      </div>
    </div>
  );
}