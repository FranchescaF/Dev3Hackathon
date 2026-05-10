import { useState, useRef } from 'react';
import { Mic, Volume2, Wallet, Calendar, Info, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

type VoiceState = 'idle' | 'listening' | 'processing' | 'response';

interface MockResponse {
  type: 'balance' | 'payment' | 'info';
  headline: string;
  detail: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const mockResponses: MockResponse[] = [
  {
    type: 'balance',
    headline: 'Su saldo en AFP Integra es S/. 87,450.00',
    detail: 'Último aporte: S/. 412.50 el 30 de abril, 2026 · Fondo 2 (Mixto)',
    icon: Wallet,
    iconColor: '#0D3B66',
    bgColor: '#E8F5F1',
  },
  {
    type: 'payment',
    headline: 'Su próximo pago es el 15 de mayo de 2026',
    detail: 'Monto estimado: S/. 950.00 · Modalidad: Renta vitalicia',
    icon: Calendar,
    iconColor: '#06D6A0',
    bgColor: '#E6FBF5',
  },
  {
    type: 'info',
    headline: '¡Hola! Soy Molly, su asistente de pensiones',
    detail: 'Puedo informarle sobre saldos, pagos, aportes y trámites de AFP en Perú.',
    icon: Info,
    iconColor: '#0D3B66',
    bgColor: '#E8EDF5',
  },
];

const tips = [
  '💡 Pregunte: "¿Cuánto tengo en mi AFP?"',
  '💡 Pregunte: "¿Cuándo recibo mi pensión?"',
  '💡 Pregunte: "¿Cuáles son mis aportes?"',
  '💡 Pregunte: "¿Cómo cambio de fondo?"',
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return '¡Buenos días!';
  if (hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

export function HomeScreen() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [response, setResponse] = useState<MockResponse | null>(null);
  const [responseIndex, setResponseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handleMicDown = () => {
    if (voiceState === 'processing') return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setVoiceState('listening');
    setResponse(null);
  };

  const handleMicUp = () => {
    if (voiceState !== 'listening') return;
    setVoiceState('processing');

    timerRef.current = setTimeout(() => {
      const nextResponse = mockResponses[responseIndex % mockResponses.length];
      setResponse(nextResponse);
      setResponseIndex((i) => i + 1);
      setVoiceState('response');
    }, 1800);
  };

  const handleReset = () => {
    setVoiceState('idle');
    setResponse(null);
  };

  const isListening = voiceState === 'listening';
  const isProcessing = voiceState === 'processing';
  const hasResponse = voiceState === 'response' && response;

  return (
    <div className="flex flex-col min-h-full px-5 pt-6 pb-4 gap-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="font-black"
            style={{ fontSize: '26px', lineHeight: '1.2', color: '#0D3B66' }}
          >
            {getGreeting()}
          </h2>
          <p
            className="font-bold"
            style={{ fontSize: '18px', color: '#5A6F8C', lineHeight: '1.3' }}
          >
            Rosa Mamani · DNI 4521••••
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: '56px', height: '56px', backgroundColor: '#E8EDF5', flexShrink: 0 }}
        >
          <span style={{ fontSize: '28px' }}>👵</span>
        </div>
      </div>

      {/* Quick Info Strip */}
      <button
        onClick={() => navigate('/seguimiento')}
        className="w-full flex items-center justify-between rounded-3xl p-4 transition-all"
        style={{ backgroundColor: '#0D3B66', minHeight: '80px' }}
      >
        <div className="flex items-center gap-3">
          <Wallet style={{ width: '32px', height: '32px', color: '#06D6A0' }} strokeWidth={3} />
          <div className="text-left">
            <p className="font-bold" style={{ fontSize: '14px', color: 'rgba(253,251,247,0.7)', lineHeight: '1.2' }}>
              Saldo AFP Integra
            </p>
            <p className="font-black" style={{ fontSize: '24px', color: '#FDFBF7', lineHeight: '1.2' }}>
              S/. 87,450.00
            </p>
          </div>
        </div>
        <ChevronRight style={{ width: '28px', height: '28px', color: '#06D6A0' }} strokeWidth={3} />
      </button>

      {/* Voice Control Area */}
      <div
        className="flex flex-col items-center rounded-3xl p-6 gap-6"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid rgba(13,59,102,0.12)',
          boxShadow: '0 4px 20px rgba(13,59,102,0.08)',
        }}
      >
        {/* State Label */}
        <div className="text-center">
          <p
            className="font-black"
            style={{ fontSize: '24px', lineHeight: '1.3', color: '#0D3B66' }}
          >
            {isListening ? '¡Te estoy escuchando!' : isProcessing ? 'Procesando...' : hasResponse ? 'Respuesta lista' : 'Presiona para hablar'}
          </p>
          <p
            className="font-bold"
            style={{ fontSize: '16px', lineHeight: '1.4', color: '#5A6F8C' }}
          >
            {isListening
              ? 'Suelta cuando termines de hablar'
              : isProcessing
              ? 'Un momento por favor...'
              : hasResponse
              ? 'Toca 🔁 para preguntar de nuevo'
              : 'Mantén presionado el micrófono'}
          </p>
        </div>

        {/* Mic Button */}
        <div className="relative flex items-center justify-center" style={{ width: '180px', height: '180px' }}>
          {/* Pulse rings when listening */}
          {isListening && (
            <>
              <motion.div
                className="absolute rounded-full"
                style={{ backgroundColor: 'rgba(6,214,160,0.15)' }}
                animate={{ width: ['180px', '240px'], height: ['180px', '240px'], opacity: [0.8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{ backgroundColor: 'rgba(6,214,160,0.1)' }}
                animate={{ width: ['180px', '280px'], height: ['180px', '280px'], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
              />
            </>
          )}

          <motion.button
            onPointerDown={handleMicDown}
            onPointerUp={handleMicUp}
            onPointerLeave={handleMicUp}
            animate={{
              scale: isListening ? 1.06 : isProcessing ? [1, 1.03, 1] : 1,
            }}
            transition={isProcessing ? { duration: 0.8, repeat: Infinity } : { type: 'spring', stiffness: 300 }}
            className="relative flex items-center justify-center rounded-full touch-manipulation select-none"
            style={{
              width: '160px',
              height: '160px',
              backgroundColor: isListening ? '#06D6A0' : isProcessing ? '#5A6F8C' : '#0D3B66',
              boxShadow: isListening
                ? '0 8px 40px rgba(6,214,160,0.5)'
                : '0 8px 32px rgba(13,59,102,0.35)',
              border: `4px solid ${isListening ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              cursor: 'pointer',
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw style={{ width: '64px', height: '64px', color: '#FDFBF7' }} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <Mic style={{ width: '72px', height: '72px', color: '#FDFBF7' }} strokeWidth={3} />
            )}
          </motion.button>
        </div>

        {/* Response Card */}
        <AnimatePresence>
          {hasResponse && response && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="w-full rounded-2xl p-5"
              style={{
                backgroundColor: response.bgColor,
                border: `3px solid ${response.iconColor}30`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ width: '52px', height: '52px', backgroundColor: response.iconColor }}
                >
                  <Volume2 style={{ width: '28px', height: '28px', color: '#FDFBF7' }} strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <p
                    className="font-black"
                    style={{ fontSize: '20px', lineHeight: '1.3', color: '#0D3B66' }}
                  >
                    {response.headline}
                  </p>
                  <p
                    className="font-bold mt-1"
                    style={{ fontSize: '15px', lineHeight: '1.4', color: '#5A6F8C' }}
                  >
                    {response.detail}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-bold transition-all"
                style={{
                  minHeight: '52px',
                  backgroundColor: '#0D3B66',
                  color: '#FDFBF7',
                  fontSize: '17px',
                }}
              >
                <RefreshCw style={{ width: '22px', height: '22px' }} strokeWidth={3} />
                Hacer otra consulta
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        {!hasResponse && !isListening && !isProcessing && (
          <div className="w-full rounded-2xl p-4" style={{ backgroundColor: '#F5F3EE' }}>
            <p className="font-bold text-center mb-2" style={{ fontSize: '16px', color: '#5A6F8C' }}>
              Ejemplos de preguntas:
            </p>
            <div className="space-y-2">
              {tips.map((tip, i) => (
                <p key={i} className="font-bold" style={{ fontSize: '16px', lineHeight: '1.5', color: '#0D3B66' }}>
                  {tip}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      <div
        className="w-full flex items-center gap-4 rounded-3xl p-4"
        style={{ backgroundColor: '#FFF8E6', border: '3px solid #FFB800' }}
      >
        <span style={{ fontSize: '32px', flexShrink: 0 }}>📞</span>
        <div>
          <p className="font-black" style={{ fontSize: '17px', color: '#8B6000', lineHeight: '1.2' }}>
            ¿Necesita ayuda personal?
          </p>
          <p className="font-bold" style={{ fontSize: '15px', color: '#B8800A', lineHeight: '1.3' }}>
            Llame gratis: 0800-00000 · Lun–Vie 9am–6pm
          </p>
        </div>
      </div>
    </div>
  );
}
