"use client";

import React from 'react';
import { 
  Mic, 
  Upload, 
  MessageSquare, 
  ShieldCheck, 
  Accessibility, 
  FileText, 
  Clock, 
  BookOpen, 
  AlertTriangle,
  Lock,
  Sparkles,
  Smartphone,
  Shield,
  Zap,
  HeartHandshake
} from 'lucide-react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
=======
import Link from 'next/link';
import { Logo } from '@/components/Logo';
>>>>>>> cfed5ad1e20bd35e60559f7f89c5597afb482037

export default function LandingPage() {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-100">
<<<<<<< HEAD
            <nav className="fixed top-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-md border-b border-cyan-100/50 shadow-sm">
=======
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-cyan-100/50 shadow-sm">
>>>>>>> cfed5ad1e20bd35e60559f7f89c5597afb482037
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <Logo/>
          
          <div className="hidden md:flex items-center gap-8 text-slate-500 font-medium text-md">
            <button onClick={() => scrollToSection('problema')} className="hover:text-[#008BB7] transition-colors">El problema</button>
            <button onClick={() => scrollToSection('funciona')} className="hover:text-[#008BB7] transition-colors">Cómo funciona</button>
            <button onClick={() => scrollToSection('caracteristicas')} className="hover:text-[#008BB7] transition-colors">Características</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-[#008BB7] transition-colors">Testimonios</button>
          </div>

          <Link href="/dashboard">
  <button className="bg-[#008BB7] text-white px-7 py-2.5 rounded-full font-bold hover:bg-[#00769B] hover:shadow-lg transition-all active:scale-95">
    Entrar
  </button>
</Link>
        </div>
      </nav>
      <div className="pt-20">
        <div className="bg-[#F0F9FA] pb-32"> 
          <header className="max-w-7xl mx-auto px-8 pt-8 pb-24 grid lg:grid-cols-2 gap-16 items-start">        
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-cyan-100 shadow-sm">
                <Sparkles className="text-cyan-500 w-4 h-4" />
                <span className="text-sm font-semibold text-slate-600">Hecho con cariño para adultos mayores</span>
              </div>
              <h1 className="-mt-6 text-5xl md:text-6xl font-serif font-bold leading-[1.1] text-[#002B3D]">
                Habla.<br />Consulta.<br />
                <span className="text-[#008BB7] relative">
                  Entiende
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-cyan-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span> tu AFP.
              </h1>
              <p className="-mt-4 text-xl text-slate-600 max-w-md leading-relaxed">
                PensiónSegura convierte trámites previsionales complejos en conversaciones simples y seguras para adultos mayores.
              </p>
              <div className="-mt-4 flex flex-wrap gap-6">
                <button onClick={() => router.push("/dashboard-contigo")} className="bg-[#008BB7] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-cyan-200 hover:scale-105 transition-transform">
                  <Mic className="w-5 h-5"/> Hablar ahora
                </button>
                <button className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
                  Ver demo
                </button>
              </div>
              <div className="flex flex-wrap gap-3 pt-0">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <Lock className="w-4 h-4 text-[#008BB7]" />
                  <span className="text-sm font-medium text-slate-600">Seguro con Solana</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <Mic className="w-4 h-4 text-[#008BB7]" />
                  <span className="text-sm font-medium text-slate-600">Powered by ElevenLabs</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <Accessibility className="w-4 h-4 text-[#008BB7]" />
                  <span className="text-sm font-medium text-slate-600">Diseñado para accesibilidad</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-4xl p-4 shadow-2xl relative">
                <div className="aspect-square bg-linear-to-b from-cyan-50 to-white rounded-[2.5rem] flex items-end justify-center overflow-hidden">
                  <img 
                    src="https://media.istockphoto.com/id/1463964143/es/foto/el-abuelo-y-la-abuela-ancianos-pasan-tiempo-divirti%C3%A9ndose-usando-aplicaciones-de-tel%C3%A9fonos.jpg?s=170667a&w=0&k=20&c=1rTMNVVlYnDvVrANcUcAQMMVx1-XBFjNX68hJGhEQlY=" 
                    alt="Adulto mayor" 
                    className="w-full h-full object-cover rounded-4xl" 
                  />
                </div>
              </div>
            </div>
          </header>
          <section id="problema" className="max-w-7xl mx-auto px-8 text-center pt-4">
            <h2 className="text-5xl font-serif font-bold text-[#002B3D] mb-4">¿Por qué existe VozMayor?</h2>
            <p className="text-xl text-slate-500 mb-7">Los trámites de AFP no deberían ser un dolor de cabeza.</p>
            <div className="grid md:grid-cols-4 gap-6">
              <ProblemCard icon={<FileText />} title="Trámites confusos" desc="Formularios largos y poco claros." />
              <ProblemCard icon={<Clock />} title="Colas largas" desc="Horas perdidas en agencias." />
              <ProblemCard icon={<BookOpen />} title="Lenguaje técnico" desc="Palabras difíciles de entender." />
              <ProblemCard icon={<AlertTriangle />} title="Riesgo de errores" desc="Decisiones importantes sin orientación." />
            </div>
          </section>
        </div>
        <section id="funciona" className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-serif font-bold text-[#002B3D] mb-4">Cómo funciona</h2>
              <p className="text-slate-500">Cuatro pasos simples. Una experiencia tranquila.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <StepCard number="1" icon={<Mic className="w-8 h-8" />} title="Habla con VozMayor" desc="Pregunta lo que necesitas con tu voz." />
              <StepCard number="2" icon={<Upload className="w-8 h-8" />} title="Sube tu documento" desc="Toma una foto o adjunta el archivo." />
              <StepCard number="3" icon={<MessageSquare className="w-8 h-8" />} title="Recibe explicación sencilla" desc="Sin tecnicismos, claro y corto." />
              <StepCard number="4" icon={<ShieldCheck className="w-8 h-8" />} title="Guarda tu comprobante" desc="Tu consulta queda registrada y segura." />
            </div>
          </div>
        </section>
        <section id="caracteristicas" className="bg-[#F8FAFC] py-10 ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-serif font-bold text-[#002B3D] mb-4">Diseñado para ti</h2>
              <p className="text-slate-500 text-md">Tecnología avanzada que se siente como una charla entre amigos.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-6">
              <FeatureCard icon={Smartphone} bgColor="bg-blue-100" iconColor="text-blue-600" title="Fácil de usar" desc="Sin botones complicados. Todo se controla con tu voz." />
              <FeatureCard icon={Shield} bgColor="bg-green-100" iconColor="text-green-600" title="Privacidad total" desc="Tus datos están protegidos con blockchain." />
              <FeatureCard icon={Zap} bgColor="bg-yellow-100" iconColor="text-yellow-600" title="Respuesta rápida" desc="Sin esperas. Respuestas en segundos." />
              <FeatureCard icon={HeartHandshake} bgColor="bg-red-100" iconColor="text-red-600" title="Apoyo humano" desc="Conexión con asesores si lo necesitas." />
            </div>
          </div>
        </section>
        <section id="testimonios" className="max-w-7xl mx-auto px-8 py-13">
          <h2 className="text-5xl font-serif font-bold text-[#002B3D] text-center mb-10">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard text="Antes no entendía nada de mi AFP. Ahora pregunto y me responde clarito." name="Don José, 68" location="Lima" />
            <TestimonialCard text="Subí mi estado de cuenta y VozMayor me lo leyó. Por fin entiendo." name="Doña Rosa, 71" location="Arequipa" />
            <TestimonialCard text="Me siento más tranquila sabiendo que mis consultas son seguras." name="Mamá Lucía, 74" location="Cusco" />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="bg-[#008BB7] rounded-[3rem] p-16 text-center text-white shadow-2xl shadow-cyan-200/50">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Empieza a hablar con VozMayor</h2>
            <p className="text-cyan-50 text-xl mb-10 opacity-90">Sin descargas. Sin formularios largos. Solo tu voz.</p>
            <button onClick={() => router.push("/dashboard-contigo")} className="bg-white text-[#008BB7] px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 mx-auto hover:scale-105 transition-transform shadow-lg">
              <Mic className="w-6 h-6"/> Hablar ahora
            </button>
          </div>
        </section>
        <footer className="bg-[#F0F9FA]/80 border-t border-slate-100 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#008BB7] p-1.5 rounded-lg">
                  <Mic className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-[#005A78]">VozMayor</span>
              </div>
              <p className="text-sm text-slate-500">Tu asistente AFP por voz, hecho con cuidado para adultos mayores en Perú.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Producto</h4>
              <ul className="text-md text-slate-500 space-y-2 cursor-pointer">
                <li className="hover:text-[#008BB7]">Sobre nosotros</li>
                <li className="hover:text-[#008BB7]">Seguridad</li>
                <li className="hover:text-[#008BB7]">Accesibilidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Soporte</h4>
              <ul className="text-md text-slate-500 space-y-2 cursor-pointer">
                <li className="hover:text-[#008BB7]">Contacto</li>
                <li className="hover:text-[#008BB7]">Ayuda</li>
                <li className="hover:text-[#008BB7]">Asesor humano</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Idiomas</h4>
              <ul className="text-md text-slate-500 space-y-2 cursor-pointer">
                <li className="hover:text-[#008BB7]">Español</li>
                <li className="hover:text-[#008BB7]">Quechua (Próximamente)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200/50 pt-8">
            <p className="text-center text-xs text-slate-400">© 2026 VozMayor · Hecho en Perú con cariño</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
function FeatureCard({ icon: Icon, bgColor, iconColor, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`${bgColor} ${iconColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-[#002B3D] mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ProblemCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
      <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, icon, title, desc }: any) {
  return (
    <div className="relative p-8 bg-white border border-slate-100 rounded-4xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <span className="absolute -top-2 -left-1 text-[8rem] font-serif font-bold text-cyan-50/50 leading-none select-none pointer-events-none">{number}</span>
      <div className="relative z-10 space-y-4">
        <div className="text-[#008BB7]">{icon}</div>
        <h3 className="font-bold text-xl text-[#002B3D] leading-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ text, name, location }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
      <p className="text-lg text-slate-600 italic mb-8">"{text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
           <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <p className="text-xs text-slate-400">{location}</p>
        </div>
      </div>
    </div>
  );
}