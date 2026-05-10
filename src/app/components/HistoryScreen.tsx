import { useState } from 'react';
import { Wallet, Calendar, HelpCircle, FileText, ChevronDown, ChevronUp, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type FilterType = 'todos' | 'semana' | 'mes';

interface HistoryItem {
  id: number;
  date: string;
  shortDate: string;
  type: 'balance' | 'payment' | 'info' | 'tramite';
  query: string;
  response: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  labelBg: string;
  labelColor: string;
  label: string;
  week: boolean;
  month: boolean;
}

const historyData: HistoryItem[] = [
  {
    id: 1,
    date: '09 May 2026 · 10:32 am',
    shortDate: '09 May',
    type: 'balance',
    query: '¿Cuánto tengo en mi AFP?',
    response: 'Su saldo es S/. 87,450.00 en AFP Integra · Fondo 2',
    icon: Wallet,
    iconBg: '#0D3B66',
    iconColor: '#FDFBF7',
    labelBg: '#E8EDF5',
    labelColor: '#0D3B66',
    label: 'Saldo',
    week: true,
    month: true,
  },
  {
    id: 2,
    date: '07 May 2026 · 3:45 pm',
    shortDate: '07 May',
    type: 'payment',
    query: '¿Cuándo recibo mi pensión?',
    response: 'Próximo pago: 15 de mayo, 2026 · S/. 950.00 estimado',
    icon: Calendar,
    iconBg: '#06D6A0',
    iconColor: '#FDFBF7',
    labelBg: '#E6FBF5',
    labelColor: '#06D6A0',
    label: 'Pago',
    week: true,
    month: true,
  },
  {
    id: 3,
    date: '05 May 2026 · 9:10 am',
    shortDate: '05 May',
    type: 'tramite',
    query: '¿Cómo actualizo mis datos?',
    response: 'Puede actualizar sus datos en la app AFP Integra o llamando al 615-5000',
    icon: FileText,
    iconBg: '#F59E0B',
    iconColor: '#FDFBF7',
    labelBg: '#FFF8E6',
    labelColor: '#8B6000',
    label: 'Trámite',
    week: true,
    month: true,
  },
  {
    id: 4,
    date: '01 May 2026 · 11:20 am',
    shortDate: '01 May',
    type: 'info',
    query: '¿Qué es el Fondo 2?',
    response: 'El Fondo 2 es de tipo mixto, combina renta fija y variable. Es el más usado en Perú.',
    icon: HelpCircle,
    iconBg: '#7C3AED',
    iconColor: '#FDFBF7',
    labelBg: '#F3EEFF',
    labelColor: '#7C3AED',
    label: 'Consulta',
    week: false,
    month: true,
  },
  {
    id: 5,
    date: '28 Abr 2026 · 4:00 pm',
    shortDate: '28 Abr',
    type: 'balance',
    query: '¿Cuánto aportó mi empleador?',
    response: 'Su empleador aportó S/. 334.25 en abril 2026',
    icon: Wallet,
    iconBg: '#0D3B66',
    iconColor: '#FDFBF7',
    labelBg: '#E8EDF5',
    labelColor: '#0D3B66',
    label: 'Saldo',
    week: false,
    month: true,
  },
  {
    id: 6,
    date: '20 Abr 2026 · 8:55 am',
    shortDate: '20 Abr',
    type: 'payment',
    query: '¿Cuándo fue mi último pago?',
    response: 'Último pago recibido: 15 de abril, 2026 por S/. 950.00',
    icon: Calendar,
    iconBg: '#06D6A0',
    iconColor: '#FDFBF7',
    labelBg: '#E6FBF5',
    labelColor: '#06D6A0',
    label: 'Pago',
    week: false,
    month: true,
  },
  {
    id: 7,
    date: '15 Abr 2026 · 2:30 pm',
    shortDate: '15 Abr',
    type: 'tramite',
    query: '¿Puedo retirar dinero de mi AFP?',
    response: 'Existen modalidades de retiro según su situación. Puede consultar en AFP Integra.',
    icon: FileText,
    iconBg: '#F59E0B',
    iconColor: '#FDFBF7',
    labelBg: '#FFF8E6',
    labelColor: '#8B6000',
    label: 'Trámite',
    week: false,
    month: false,
  },
];

function HistoryCard({ item }: { item: HistoryItem }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        border: '3px solid rgba(13,59,102,0.10)',
        boxShadow: '0 2px 12px rgba(13,59,102,0.06)',
      }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
        style={{ minHeight: '90px' }}
      >
        <div
          className="flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ width: '56px', height: '56px', backgroundColor: item.iconBg }}
        >
          <Icon style={{ width: '28px', height: '28px', color: item.iconColor }} strokeWidth={3} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="rounded-full px-2 py-0.5 font-bold"
              style={{ fontSize: '12px', backgroundColor: item.labelBg, color: item.labelColor, lineHeight: '1.4' }}
            >
              {item.label}
            </span>
            <span className="font-bold" style={{ fontSize: '13px', color: '#5A6F8C' }}>
              {item.shortDate}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Mic style={{ width: '14px', height: '14px', color: '#5A6F8C', flexShrink: 0 }} strokeWidth={3} />
            <p
              className="font-bold truncate"
              style={{ fontSize: '17px', color: '#0D3B66', lineHeight: '1.3' }}
            >
              {item.query}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp style={{ width: '28px', height: '28px', color: '#0D3B66' }} strokeWidth={3} />
          ) : (
            <ChevronDown style={{ width: '28px', height: '28px', color: '#0D3B66' }} strokeWidth={3} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div
                className="rounded-2xl p-4"
                style={{ backgroundColor: '#F5F3EE', borderLeft: `4px solid ${item.iconBg}` }}
              >
                <p className="font-bold mb-1" style={{ fontSize: '14px', color: '#5A6F8C' }}>
                  Respuesta de Molly:
                </p>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0D3B66', lineHeight: '1.5' }}>
                  {item.response}
                </p>
                <p className="font-bold mt-2" style={{ fontSize: '13px', color: '#5A6F8C' }}>
                  🕐 {item.date}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HistoryScreen() {
  const [filter, setFilter] = useState<FilterType>('todos');

  const filtered = historyData.filter((item) => {
    if (filter === 'semana') return item.week;
    if (filter === 'mes') return item.month;
    return true;
  });

  const filters: { id: FilterType; label: string }[] = [
    { id: 'todos', label: 'Todo' },
    { id: 'semana', label: 'Esta semana' },
    { id: 'mes', label: 'Este mes' },
  ];

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      {/* Header Info */}
      <div>
        <h2 className="font-black" style={{ fontSize: '26px', color: '#0D3B66', lineHeight: '1.2' }}>
          Mis consultas
        </h2>
        <p className="font-bold" style={{ fontSize: '16px', color: '#5A6F8C', lineHeight: '1.3' }}>
          {filtered.length} registros encontrados
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className="flex-shrink-0 rounded-full px-5 py-3 font-black transition-all"
            style={{
              minHeight: '52px',
              backgroundColor: filter === id ? '#0D3B66' : '#FFFFFF',
              color: filter === id ? '#FDFBF7' : '#0D3B66',
              border: `3px solid ${filter === id ? '#0D3B66' : 'rgba(13,59,102,0.2)'}`,
              fontSize: '17px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* History List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span style={{ fontSize: '64px' }}>📭</span>
          <p className="font-bold text-center" style={{ fontSize: '20px', color: '#5A6F8C' }}>
            No hay consultas en este período
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Legend */}
      <div
        className="rounded-3xl p-4"
        style={{ backgroundColor: '#F5F3EE', border: '2px solid rgba(13,59,102,0.10)' }}
      >
        <p className="font-bold mb-3" style={{ fontSize: '16px', color: '#5A6F8C' }}>
          Tipos de consulta:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Saldo', bg: '#E8EDF5', color: '#0D3B66' },
            { label: 'Pago', bg: '#E6FBF5', color: '#06D6A0' },
            { label: 'Trámite', bg: '#FFF8E6', color: '#8B6000' },
            { label: 'Consulta', bg: '#F3EEFF', color: '#7C3AED' },
          ].map(({ label, bg, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 font-bold"
                style={{ fontSize: '13px', backgroundColor: bg, color, lineHeight: '1.4' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
