import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Category = 'todos' | 'basico' | 'avanzado' | 'tramites';

interface LearnItem {
  id: number;
  category: Category;
  emoji: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  bgColor: string;
  borderColor: string;
}

const learnItems: LearnItem[] = [
  {
    id: 1,
    category: 'basico',
    emoji: '🏦',
    title: '¿Qué es el AFP?',
    subtitle: 'Conceptos básicos del sistema de pensiones',
    content:
      'El AFP (Administradora de Fondos de Pensiones) es una empresa privada que administra los ahorros para su jubilación.\n\nCada mes, usted aporta el 10% de su sueldo y su empleador aporta adicional. Ese dinero crece con el tiempo gracias a las inversiones.\n\nEn Perú existen 4 AFP: Integra, Habitat, Prima y Profuturo. Usted puede elegir cuál prefiere.\n\nAl jubilarse, recibirá ese dinero acumulado como una pensión mensual o en un solo pago según la modalidad que elija.',
    tags: ['Básico', 'Obligatorio'],
    bgColor: '#E8EDF5',
    borderColor: '#0D3B66',
  },
  {
    id: 2,
    category: 'basico',
    emoji: '📊',
    title: 'Los 3 tipos de fondos',
    subtitle: 'Fondo 1, 2 y 3 explicados con claridad',
    content:
      '🟢 Fondo 1 (Conservador)\nPara personas mayores de 60 años. Inversiones seguras, poco riesgo. Su dinero crece lentamente pero con seguridad.\n\n🟡 Fondo 2 (Mixto) — El más popular\nEquilibrio entre seguridad y crecimiento. Ideal para personas entre 45 y 60 años. La mayoría de afiliados usa este fondo.\n\n🔴 Fondo 3 (Agresivo / Crecimiento)\nPara personas jóvenes (menores de 45 años). Mayor riesgo pero también mayor ganancia a largo plazo.\n\nPuede cambiar de fondo cuando desee llamando a su AFP.',
    tags: ['Básico', 'Inversión'],
    bgColor: '#E6FBF5',
    borderColor: '#06D6A0',
  },
  {
    id: 3,
    category: 'avanzado',
    emoji: '🏠',
    title: 'Jubilación adelantada',
    subtitle: '¿Puede retirarse antes de los 65 años?',
    content:
      'Sí, es posible jubilarse antes de los 65 años bajo estas condiciones:\n\n📋 Requisitos:\n• Mujeres: 55 años mínimo\n• Hombres: 60 años mínimo\n• Su pensión proyectada debe ser al menos el 40% del promedio de sus últimos 120 sueldos\n\nSi no llega a ese porcentaje, pero su fondo acumulado permite una pensión mínima de S/. 500, también puede hacerlo.\n\n⚠️ Importante: Los fondos se reducen al jubilarse antes. Es recomendable consultar con un asesor de AFP antes de decidir.',
    tags: ['Avanzado', 'Jubilación'],
    bgColor: '#FFF8E6',
    borderColor: '#F59E0B',
  },
  {
    id: 4,
    category: 'avanzado',
    emoji: '📈',
    title: '¿Cómo aumentar mi pensión?',
    subtitle: '7 formas de mejorar sus ahorros AFP',
    content:
      'Aquí algunos consejos para mejorar su pensión:\n\n1️⃣ Aportes voluntarios: Puede depositar dinero extra a su AFP en cualquier momento. Desde S/. 30.\n\n2️⃣ Elegir el fondo correcto: Consulte con su AFP si su fondo es adecuado para su edad.\n\n3️⃣ No retirar anticipadamente: Cada retiro reduce significativamente su pensión futura.\n\n4️⃣ Verificar aportes: Asegúrese de que su empleador aporte mensualmente.\n\n5️⃣ Registrar períodos sin trabajo: Puede seguir aportando voluntariamente cuando no trabaja.\n\n6️⃣ Actualizar beneficiarios: Para proteger a su familia si algo le sucede.\n\n7️⃣ Comparar AFPs: Revise comisiones y rendimientos antes de cambiarse.',
    tags: ['Avanzado', 'Consejos'],
    bgColor: '#F3EEFF',
    borderColor: '#7C3AED',
  },
  {
    id: 5,
    category: 'basico',
    emoji: '🛡️',
    title: 'Pensión mínima garantizada',
    subtitle: 'El Estado protege su jubilación',
    content:
      'El Estado peruano garantiza una pensión mínima para los afiliados al SPP (Sistema Privado de Pensiones).\n\n💰 Monto garantizado: S/. 500.00 mensuales\n\n📋 Requisitos para acceder:\n• Tener 65 años de edad\n• Haber aportado al menos 20 años al sistema\n• Su fondo AFP no es suficiente para cubrir S/. 500 mensual\n\nSi cumple estos requisitos y su fondo se agota, el Estado complementará su pensión hasta S/. 500.\n\nEsto significa que nunca recibirá menos de S/. 500 si aportó durante 20 años.',
    tags: ['Básico', 'Garantía'],
    bgColor: '#E6FBF5',
    borderColor: '#06D6A0',
  },
  {
    id: 6,
    category: 'tramites',
    emoji: '💳',
    title: 'Retiro de fondos AFP',
    subtitle: '¿Cuándo y cómo puede retirar su dinero?',
    content:
      'Existen varias modalidades para retirar sus fondos AFP:\n\n🏠 25% para vivienda\nPuede retirar hasta el 25% de su fondo para comprar su primera vivienda o pagar su hipoteca.\n\n👴 Retiro libre (65 años)\nSi tiene 65 años, puede retirar hasta 4 UIT (S/. 21,200 aprox.) en efectivo.\n\n🎓 Desempleo\nSi está desempleado más de 6 meses, puede retirar hasta el 25%.\n\n📋 Cómo hacer el trámite:\n1. Ingresar a la app AFP Integra\n2. Ir a "Trámites" → "Retiro"\n3. Adjuntar documentos requeridos\n4. Esperar aprobación (5-10 días hábiles)\n\n⚠️ Recuerde: Cada retiro reduce su pensión futura.',
    tags: ['Trámite', 'Retiro'],
    bgColor: '#FFF8E6',
    borderColor: '#F59E0B',
  },
  {
    id: 7,
    category: 'tramites',
    emoji: '👨‍👩‍👧',
    title: 'Pensión de sobrevivencia',
    subtitle: 'Proteja a su familia con su AFP',
    content:
      'La pensión de sobrevivencia protege a su familia si usted fallece.\n\n👥 ¿Quiénes son beneficiarios?\n• Cónyuge o conviviente\n• Hijos menores de 18 años (o mayores con discapacidad)\n• Padres dependientes económicamente\n\n💰 ¿Cuánto reciben?\n• Cónyuge o conviviente: 42% de su pensión\n• Hijos: 14% por cada hijo (máximo 3)\n• Padres: 14% cada uno\n\n📋 Para registrar beneficiarios:\n• Vaya a una agencia AFP con su DNI\n• O llame al 615-5000\n• Es completamente gratis\n\n⚠️ Importante: Si no tiene beneficiarios registrados, su fondo pasa a sus herederos legales.',
    tags: ['Trámite', 'Familia'],
    bgColor: '#E8EDF5',
    borderColor: '#0D3B66',
  },
  {
    id: 8,
    category: 'tramites',
    emoji: '🔄',
    title: 'Cómo cambiar de AFP',
    subtitle: 'Proceso paso a paso sin complicaciones',
    content:
      'Cambiar de AFP es su derecho y no tiene ningún costo.\n\n⏱️ ¿Cuándo puede cambiar?\nUna vez al año, entre enero y diciembre.\n\n📋 Pasos para cambiar:\n1. Elija su nueva AFP (compare comisiones y rendimientos)\n2. Presente su DNI en una agencia de la nueva AFP\n3. O hágalo por la app/web de la nueva AFP\n4. Firme el contrato de afiliación\n5. Espere 30-60 días hábiles para la transferencia\n\n💰 Comisiones 2026:\n• AFP Habitat: 1.47%\n• AFP Integra: 1.55%\n• AFP Prima: 1.60%\n• AFP Profuturo: 1.69%\n\nMenor comisión = más dinero en su bolsillo.',
    tags: ['Trámite', 'Cambio'],
    bgColor: '#F3EEFF',
    borderColor: '#7C3AED',
  },
];

const categories = [
  { id: 'todos' as Category, label: 'Todo', emoji: '📚' },
  { id: 'basico' as Category, label: 'Básico', emoji: '🟢' },
  { id: 'avanzado' as Category, label: 'Avanzado', emoji: '🔵' },
  { id: 'tramites' as Category, label: 'Trámites', emoji: '📋' },
];

function LearnCard({ item }: { item: LearnItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        border: `3px solid ${item.borderColor}30`,
        boxShadow: '0 3px 16px rgba(13,59,102,0.07)',
      }}
    >
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
        style={{ minHeight: '90px' }}
      >
        <div
          className="flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ width: '60px', height: '60px', backgroundColor: item.bgColor, fontSize: '28px' }}
        >
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 font-bold"
                style={{ fontSize: '12px', backgroundColor: item.bgColor, color: item.borderColor, lineHeight: '1.5' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p
            className="font-black"
            style={{ fontSize: '19px', color: '#0D3B66', lineHeight: '1.3' }}
          >
            {item.title}
          </p>
          <p
            className="font-bold"
            style={{ fontSize: '14px', color: '#5A6F8C', lineHeight: '1.3' }}
          >
            {item.subtitle}
          </p>
        </div>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp style={{ width: '28px', height: '28px', color: item.borderColor }} strokeWidth={3} />
          ) : (
            <ChevronDown style={{ width: '28px', height: '28px', color: item.borderColor }} strokeWidth={3} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: item.bgColor, borderLeft: `4px solid ${item.borderColor}` }}
              >
                <p
                  className="font-bold whitespace-pre-line"
                  style={{ fontSize: '17px', lineHeight: '1.8', color: '#0D3B66' }}
                >
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LearnScreen() {
  const [category, setCategory] = useState<Category>('todos');

  const filtered = learnItems.filter(
    (item) => category === 'todos' || item.category === category
  );

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      {/* Header */}
      <div>
        <h2 className="font-black" style={{ fontSize: '26px', color: '#0D3B66', lineHeight: '1.2' }}>
          Centro de Aprendizaje
        </h2>
        <p className="font-bold" style={{ fontSize: '16px', color: '#5A6F8C', lineHeight: '1.3' }}>
          Todo lo que necesita saber sobre su AFP
        </p>
      </div>

      {/* Progress Banner */}
      <div
        className="rounded-3xl p-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #0D3B66 0%, #1A5A9A 100%)' }}
      >
        <span style={{ fontSize: '36px', flexShrink: 0 }}>🎓</span>
        <div>
          <p className="font-black" style={{ fontSize: '18px', color: '#FDFBF7', lineHeight: '1.2' }}>
            {learnItems.length} temas disponibles
          </p>
          <p className="font-bold" style={{ fontSize: '14px', color: 'rgba(253,251,247,0.7)', lineHeight: '1.3' }}>
            Básicos, avanzados y guías de trámites
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className="flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 font-black transition-all"
            style={{
              minHeight: '52px',
              backgroundColor: category === id ? '#0D3B66' : '#FFFFFF',
              color: category === id ? '#FDFBF7' : '#0D3B66',
              border: `3px solid ${category === id ? '#0D3B66' : 'rgba(13,59,102,0.2)'}`,
              fontSize: '16px',
            }}
          >
            <span>{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Learn Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => (
          <LearnCard key={item.id} item={item} />
        ))}
      </div>

      {/* Help Banner */}
      <div
        className="rounded-3xl p-5 flex items-center gap-4"
        style={{ backgroundColor: '#FFF8E6', border: '3px solid #FFB800' }}
      >
        <span style={{ fontSize: '36px', flexShrink: 0 }}>📞</span>
        <div>
          <p className="font-black" style={{ fontSize: '18px', color: '#8B6000', lineHeight: '1.2' }}>
            ¿Tiene más preguntas?
          </p>
          <p className="font-bold" style={{ fontSize: '15px', color: '#B8800A', lineHeight: '1.3' }}>
            Llame gratis a AFP Integra: 0800-00000
          </p>
          <p className="font-bold" style={{ fontSize: '14px', color: '#B8800A', lineHeight: '1.3' }}>
            Lun–Vie de 9am a 6pm
          </p>
        </div>
      </div>
    </div>
  );
}
