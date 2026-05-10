import { TrendingUp, Calendar, Shield, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'motion/react';

const monthlyData = [
  { mes: 'Nov', aporte: 385, empleador: 312 },
  { mes: 'Dic', aporte: 398, empleador: 322 },
  { mes: 'Ene', aporte: 412, empleador: 334 },
  { mes: 'Feb', aporte: 412, empleador: 334 },
  { mes: 'Mar', aporte: 425, empleador: 344 },
  { mes: 'Abr', aporte: 412, empleador: 334 },
];

const alertItems = [
  {
    id: 1,
    type: 'success',
    text: 'Aporte de abril 2026 registrado correctamente',
    date: '30 Abr, 2026',
  },
  {
    id: 2,
    type: 'info',
    text: 'Su empleador realizó el aporte mensual',
    date: '30 Abr, 2026',
  },
  {
    id: 3,
    type: 'warning',
    text: 'Recuerde actualizar su beneficiario',
    date: '15 Abr, 2026',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-2xl p-3 shadow-lg"
        style={{ backgroundColor: '#0D3B66', border: '2px solid #06D6A0' }}
      >
        <p className="font-bold" style={{ fontSize: '14px', color: '#06D6A0' }}>{label}</p>
        <p className="font-black" style={{ fontSize: '16px', color: '#FDFBF7' }}>
          S/. {payload[0]?.value}
        </p>
      </div>
    );
  }
  return null;
};

export function TrackingScreen() {
  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      {/* Balance Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6"
        style={{
          background: 'linear-gradient(135deg, #0D3B66 0%, #1A5A9A 100%)',
          boxShadow: '0 8px 32px rgba(13,59,102,0.35)',
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-bold" style={{ fontSize: '15px', color: 'rgba(253,251,247,0.7)', lineHeight: '1.3' }}>
              Saldo total acumulado
            </p>
            <p
              className="font-black mt-1"
              style={{ fontSize: '40px', lineHeight: '1.1', color: '#FDFBF7' }}
            >
              S/. 87,450<span style={{ fontSize: '24px' }}>.00</span>
            </p>
          </div>
          <div
            className="flex items-center gap-1 rounded-2xl px-3 py-2"
            style={{ backgroundColor: 'rgba(6,214,160,0.2)', border: '2px solid #06D6A0' }}
          >
            <TrendingUp style={{ width: '20px', height: '20px', color: '#06D6A0' }} strokeWidth={3} />
            <span className="font-black" style={{ fontSize: '16px', color: '#06D6A0' }}>+3.2%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div
            className="rounded-xl px-3 py-1.5 flex items-center gap-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <Shield style={{ width: '18px', height: '18px', color: '#06D6A0' }} strokeWidth={3} />
            <span className="font-bold" style={{ fontSize: '14px', color: '#FDFBF7' }}>AFP Integra</span>
          </div>
          <div
            className="rounded-xl px-3 py-1.5"
            style={{ backgroundColor: 'rgba(6,214,160,0.2)' }}
          >
            <span className="font-bold" style={{ fontSize: '14px', color: '#06D6A0' }}>Fondo 2 · Mixto</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div
            className="rounded-2xl p-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <p className="font-bold" style={{ fontSize: '13px', color: 'rgba(253,251,247,0.6)', lineHeight: '1.2' }}>
              Aporte mensual
            </p>
            <p className="font-black" style={{ fontSize: '22px', color: '#FDFBF7', lineHeight: '1.2' }}>
              S/. 412.50
            </p>
          </div>
          <div
            className="rounded-2xl p-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <p className="font-bold" style={{ fontSize: '13px', color: 'rgba(253,251,247,0.6)', lineHeight: '1.2' }}>
              Próximo pago
            </p>
            <p className="font-black" style={{ fontSize: '22px', color: '#06D6A0', lineHeight: '1.2' }}>
              15 May
            </p>
          </div>
        </div>
      </motion.div>

      {/* Next Payment Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl p-5 flex items-center justify-between"
        style={{
          backgroundColor: '#E6FBF5',
          border: '3px solid #06D6A0',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: '56px', height: '56px', backgroundColor: '#06D6A0' }}
          >
            <Calendar style={{ width: '30px', height: '30px', color: '#FDFBF7' }} strokeWidth={3} />
          </div>
          <div>
            <p className="font-bold" style={{ fontSize: '15px', color: '#5A6F8C', lineHeight: '1.2' }}>
              Próxima pensión
            </p>
            <p className="font-black" style={{ fontSize: '22px', color: '#0D3B66', lineHeight: '1.2' }}>
              15 de mayo, 2026
            </p>
            <p className="font-bold" style={{ fontSize: '16px', color: '#06D6A0', lineHeight: '1.2' }}>
              S/. 950.00 estimado
            </p>
          </div>
        </div>
        <ArrowUpRight style={{ width: '32px', height: '32px', color: '#06D6A0', flexShrink: 0 }} strokeWidth={3} />
      </motion.div>

      {/* Monthly Contributions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-5"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid rgba(13,59,102,0.12)',
          boxShadow: '0 4px 16px rgba(13,59,102,0.06)',
        }}
      >
        <h3
          className="font-black mb-4"
          style={{ fontSize: '20px', color: '#0D3B66', lineHeight: '1.3' }}
        >
          📊 Aportes últimos 6 meses
        </h3>
        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,59,102,0.08)" />
              <XAxis
                dataKey="mes"
                tick={{ fill: '#5A6F8C', fontWeight: 700, fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#5A6F8C', fontWeight: 700, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="aporte" fill="#06D6A0" radius={[8, 8, 0, 0]} name="Mi aporte" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#06D6A0' }} />
            <span className="font-bold" style={{ fontSize: '14px', color: '#5A6F8C' }}>Mi aporte (S/.)</span>
          </div>
        </div>
      </motion.div>

      {/* Fund Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl p-5"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid rgba(13,59,102,0.12)',
          boxShadow: '0 4px 16px rgba(13,59,102,0.06)',
        }}
      >
        <h3
          className="font-black mb-4"
          style={{ fontSize: '20px', color: '#0D3B66', lineHeight: '1.3' }}
        >
          🎯 Rendimiento del Fondo 2
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Últimos 12 meses', value: '+3.2%', color: '#06D6A0' },
            { label: 'Últimos 3 años', value: '+7.8%', color: '#06D6A0' },
            { label: 'Desde afiliación', value: '+62.4%', color: '#0D3B66' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: 'rgba(13,59,102,0.08)' }}>
              <span className="font-bold" style={{ fontSize: '17px', color: '#5A6F8C' }}>{label}</span>
              <span className="font-black" style={{ fontSize: '20px', color }}>{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alerts / Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-5"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid rgba(13,59,102,0.12)',
          boxShadow: '0 4px 16px rgba(13,59,102,0.06)',
        }}
      >
        <h3
          className="font-black mb-4"
          style={{ fontSize: '20px', color: '#0D3B66', lineHeight: '1.3' }}
        >
          🔔 Alertas recientes
        </h3>
        <div className="space-y-3">
          {alertItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl p-3"
              style={{
                backgroundColor: item.type === 'success' ? '#E6FBF5' : item.type === 'warning' ? '#FFF8E6' : '#E8EDF5',
              }}
            >
              {item.type === 'success' ? (
                <CheckCircle2 style={{ width: '28px', height: '28px', color: '#06D6A0', flexShrink: 0 }} strokeWidth={3} />
              ) : item.type === 'warning' ? (
                <AlertCircle style={{ width: '28px', height: '28px', color: '#F59E0B', flexShrink: 0 }} strokeWidth={3} />
              ) : (
                <Shield style={{ width: '28px', height: '28px', color: '#0D3B66', flexShrink: 0 }} strokeWidth={3} />
              )}
              <div className="flex-1">
                <p className="font-bold" style={{ fontSize: '15px', color: '#0D3B66', lineHeight: '1.3' }}>
                  {item.text}
                </p>
                <p className="font-bold" style={{ fontSize: '13px', color: '#5A6F8C', lineHeight: '1.3' }}>
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
