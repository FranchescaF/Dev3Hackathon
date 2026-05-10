import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mic, CheckCircle, RefreshCw, ChevronRight, User, Phone, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const COUPLE_IMG =
  'https://images.unsplash.com/photo-1739932905716-6555c792acef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjb3VwbGUlMjBoYXBweSUyMHJldGlyZW1lbnQlMjBzYXZpbmdzfGVufDF8fHx8MTc3ODM4MjU0MHww&ixlib=rb-4.1.0&q=80&w=1080';

const AFP_OPTIONS = [
  { id: 'integra', name: 'AFP Integra', color: '#0D3B66', emoji: '🏦' },
  { id: 'prima', name: 'AFP Prima', color: '#E8A020', emoji: '🌟' },
  { id: 'profuturo', name: 'AFP Profuturo', color: '#1A7F5A', emoji: '💚' },
  { id: 'habitat', name: 'AFP Habitat', color: '#C0392B', emoji: '🏠' },
];

interface FormData {
  name: string;
  dni: string;
  phone: string;
  afp: string;
}

const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

const STEPS = [
  { icon: User, label: 'Sus datos', color: '#0D3B66' },
  { icon: Phone, label: 'Contacto', color: '#06D6A0' },
  { icon: CreditCard, label: 'Su AFP', color: '#FFB800' },
];

export function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ name: '', dni: '', phone: '', afp: '' });
  const [dniInput, setDniInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [voiceField, setVoiceField] = useState<'name' | null>(null);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [finished, setFinished] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goPrev = () => {
    if (step === 0) { navigate('/welcome'); return; }
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleDniKey = (key: string) => {
    if (key === 'del') setDniInput((d) => d.slice(0, -1));
    else if (key && dniInput.length < 8) setDniInput((d) => d + key);
  };

  const handlePhoneKey = (key: string) => {
    if (key === 'del') setPhoneInput((d) => d.slice(0, -1));
    else if (key && phoneInput.length < 9) setPhoneInput((d) => d + key);
  };

  const handleVoiceDown = () => {
    setVoiceState('listening');
  };
  const handleVoiceUp = () => {
    if (voiceState !== 'listening') return;
    setVoiceState('processing');
    timerRef.current = setTimeout(() => {
      setForm((f) => ({ ...f, name: 'Rosa Mamani' }));
      setVoiceState('idle');
      setVoiceField(null);
    }, 2000);
  };

  const handleFinish = () => {
    setFinished(true);
    setTimeout(() => {
      register({
        name: form.name || 'Rosa Mamani',
        dni: dniInput,
        afp: AFP_OPTIONS.find((a) => a.id === form.afp)?.name ?? 'AFP Integra',
        phone: phoneInput,
      });
      navigate('/', { replace: true });
    }, 2800);
  };

  const dniChars = dniInput.padEnd(8, '·').split('');
  const phoneChars = phoneInput.padEnd(9, '·').split('');

  if (finished) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0D3B66',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180 }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              backgroundColor: 'rgba(6,214,160,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle style={{ width: 90, height: 90, color: '#06D6A0' }} strokeWidth={2} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', paddingInline: 32 }}
        >
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 34, color: '#06D6A0', margin: 0 }}>
            ¡Listo!
          </p>
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 28, color: '#FDFBF7', margin: '8px 0 0' }}>
            Su cuenta fue creada
          </p>
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 600, fontSize: 18, color: 'rgba(253,251,247,0.7)', marginTop: 12, lineHeight: 1.5 }}>
            Bienvenida a Molly. Ahora puede consultar su AFP con su voz.
          </p>
        </motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
          <RefreshCw style={{ width: 34, height: 34, color: 'rgba(253,251,247,0.4)' }} strokeWidth={2.5} />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
        boxShadow: '0 0 80px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 16px 8px', flexShrink: 0 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goPrev}
          style={{
            width: 64, height: 64, borderRadius: 20,
            backgroundColor: '#F0EDE8', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft style={{ width: 30, height: 30, color: '#0D3B66' }} strokeWidth={3} />
        </motion.button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 22, color: '#0D3B66', margin: 0 }}>
            Crear mi cuenta
          </p>
        </div>
        <div style={{ width: 64 }} />
      </div>

      {/* Step indicator */}
      <div style={{ padding: '8px 24px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEPS.map(({ icon: Icon, label, color }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div
                  animate={{
                    backgroundColor: i < step ? '#06D6A0' : i === step ? color : '#E0DDD8',
                    scale: i === step ? 1.12 : 1,
                  }}
                  style={{
                    width: 52, height: 52, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: i === step ? `0 4px 16px ${color}55` : 'none',
                  }}
                >
                  {i < step ? (
                    <CheckCircle style={{ width: 26, height: 26, color: '#FDFBF7' }} strokeWidth={3} />
                  ) : (
                    <Icon style={{ width: 24, height: 24, color: i === step ? '#FDFBF7' : '#8A9AAA' }} strokeWidth={2.5} />
                  )}
                </motion.div>
                <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 700, fontSize: 12, color: i === step ? color : '#8A9AAA' }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <motion.div
                  animate={{ backgroundColor: i < step ? '#06D6A0' : '#E0DDD8' }}
                  style={{ flex: 1, height: 4, borderRadius: 2, marginBottom: 22, marginInline: 4 }}
                />
              )}
            </div>
          ))}
        </div>
        {/* Image strip */}
        <div style={{ borderRadius: 20, overflow: 'hidden', height: 100, marginTop: 12, position: 'relative' }}>
          <img src={COUPLE_IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(13,59,102,0.75) 0%, rgba(13,59,102,0.1) 100%)' }} />
          <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }}>
            <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 20, color: '#FDFBF7', margin: 0, lineHeight: 1.2 }}>
              Paso {step + 1} de {STEPS.length}
            </p>
            <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 600, fontSize: 14, color: 'rgba(253,251,247,0.75)', margin: 0 }}>
              {STEPS[step].label}
            </p>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Name with voice */}
              <div>
                <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: '#0D3B66', marginBottom: 12 }}>
                  ¿Cuál es su nombre?
                </p>
                {voiceField === 'name' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '12px 0' }}>
                    <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 700, fontSize: 18, color: '#5A6F8C', textAlign: 'center', margin: 0 }}>
                      {voiceState === 'listening' ? '¡Escuchando!' : voiceState === 'processing' ? 'Procesando...' : 'Presione el micrófono'}
                    </p>
                    <div style={{ position: 'relative', width: 130, height: 130 }}>
                      {voiceState === 'listening' && [1, 2].map((r) => (
                        <motion.div
                          key={r}
                          style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'rgba(6,214,160,0.1)' }}
                          animate={{ scale: [1, 1 + r * 0.3], opacity: [0.5, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: r * 0.3, ease: 'easeOut' }}
                        />
                      ))}
                      <motion.button
                        onPointerDown={handleVoiceDown}
                        onPointerUp={handleVoiceUp}
                        onPointerLeave={handleVoiceUp}
                        animate={{ backgroundColor: voiceState === 'listening' ? '#06D6A0' : '#0D3B66', scale: voiceState === 'listening' ? 1.06 : 1 }}
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '50%', border: 'none',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 8px 32px rgba(13,59,102,0.35)',
                        }}
                        disabled={voiceState === 'processing'}
                      >
                        {voiceState === 'processing'
                          ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw style={{ width: 48, height: 48, color: '#fff' }} strokeWidth={2.5} /></motion.div>
                          : <Mic style={{ width: 54, height: 54, color: '#fff' }} strokeWidth={3} />
                        }
                      </motion.button>
                    </div>
                    <button
                      onClick={() => setVoiceField(null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 700, fontSize: 16, color: '#5A6F8C', textDecoration: 'underline' }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div
                      style={{
                        flex: 1, minHeight: 72, borderRadius: 20, border: `3px solid ${form.name ? '#06D6A0' : 'rgba(13,59,102,0.2)'}`,
                        backgroundColor: form.name ? '#E6FBF5' : '#F8F6F1',
                        display: 'flex', alignItems: 'center', paddingInline: 20,
                        fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 800, fontSize: 22, color: form.name ? '#0D3B66' : '#A0ADC0',
                      }}
                    >
                      {form.name || 'Su nombre completo...'}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setVoiceField('name')}
                      style={{
                        width: 72, height: 72, borderRadius: 20, backgroundColor: '#0D3B66', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        boxShadow: '0 4px 20px rgba(13,59,102,0.3)',
                      }}
                    >
                      <Mic style={{ width: 32, height: 32, color: '#FDFBF7' }} strokeWidth={3} />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* DNI */}
              <div>
                <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: '#0D3B66', marginBottom: 10 }}>
                  Su número de DNI
                </p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {dniChars.map((char, i) => (
                    <div key={i} style={{
                      flex: 1, height: 52, borderRadius: 12,
                      border: `3px solid ${i < dniInput.length ? '#06D6A0' : 'rgba(13,59,102,0.2)'}`,
                      backgroundColor: i < dniInput.length ? '#E6FBF5' : '#F8F6F1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 22,
                      color: i < dniInput.length ? '#0D3B66' : 'rgba(13,59,102,0.25)',
                    }}>
                      {i < dniInput.length ? char : '·'}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {numpadKeys.map((key, i) => {
                    if (key === '') return <div key={i} />;
                    if (key === 'del') return (
                      <motion.button key="del" whileTap={{ scale: 0.88 }} onClick={() => handleDniKey('del')}
                        style={{ minHeight: 60, borderRadius: 16, backgroundColor: '#F0EDE8', border: '2px solid rgba(13,59,102,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontSize: 20, color: '#5A6F8C' }}>⌫</span>
                      </motion.button>
                    );
                    return (
                      <motion.button key={key} whileTap={{ scale: 0.88 }} onClick={() => handleDniKey(key)}
                        style={{ minHeight: 60, borderRadius: 16, backgroundColor: '#FFFFFF', border: '2px solid rgba(13,59,102,0.12)', cursor: 'pointer', fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 26, color: '#0D3B66', boxShadow: '0 2px 8px rgba(13,59,102,0.07)' }}>
                        {key}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                disabled={!form.name && dniInput.length < 8}
                style={{
                  width: '100%', minHeight: 80, borderRadius: 24,
                  backgroundColor: (form.name || dniInput.length === 8) ? '#0D3B66' : '#C8D6E5',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: (form.name || dniInput.length === 8) ? '0 8px 28px rgba(13,59,102,0.35)' : 'none',
                }}
              >
                <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: '#FDFBF7' }}>
                  Continuar
                </span>
                <ChevronRight style={{ width: 28, height: 28, color: '#06D6A0' }} strokeWidth={3} />
              </motion.button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div>
                <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: '#0D3B66', marginBottom: 10 }}>
                  Su número de celular
                </p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {phoneChars.map((char, i) => (
                    <div key={i} style={{
                      flex: 1, height: 52, borderRadius: 12,
                      border: `3px solid ${i < phoneInput.length ? '#06D6A0' : 'rgba(13,59,102,0.2)'}`,
                      backgroundColor: i < phoneInput.length ? '#E6FBF5' : '#F8F6F1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 20,
                      color: i < phoneInput.length ? '#0D3B66' : 'rgba(13,59,102,0.25)',
                    }}>
                      {i < phoneInput.length ? char : '·'}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {numpadKeys.map((key, i) => {
                    if (key === '') return <div key={i} />;
                    if (key === 'del') return (
                      <motion.button key="del" whileTap={{ scale: 0.88 }} onClick={() => handlePhoneKey('del')}
                        style={{ minHeight: 60, borderRadius: 16, backgroundColor: '#F0EDE8', border: '2px solid rgba(13,59,102,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontSize: 20, color: '#5A6F8C' }}>⌫</span>
                      </motion.button>
                    );
                    return (
                      <motion.button key={key} whileTap={{ scale: 0.88 }} onClick={() => handlePhoneKey(key)}
                        style={{ minHeight: 60, borderRadius: 16, backgroundColor: '#FFFFFF', border: '2px solid rgba(13,59,102,0.12)', cursor: 'pointer', fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 26, color: '#0D3B66', boxShadow: '0 2px 8px rgba(13,59,102,0.07)' }}>
                        {key}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div
                style={{ borderRadius: 20, backgroundColor: '#FFF8E6', border: '3px solid #FFB800', padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: 26, flexShrink: 0 }}>📱</span>
                <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 700, fontSize: 17, color: '#8B6000', margin: 0, lineHeight: 1.5 }}>
                  Le enviaremos un código de verificación por SMS a este número.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                disabled={phoneInput.length < 9}
                style={{
                  width: '100%', minHeight: 80, borderRadius: 24,
                  backgroundColor: phoneInput.length === 9 ? '#0D3B66' : '#C8D6E5',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: phoneInput.length === 9 ? '0 8px 28px rgba(13,59,102,0.35)' : 'none',
                }}
              >
                <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: '#FDFBF7' }}>
                  Continuar
                </span>
                <ChevronRight style={{ width: 28, height: 28, color: '#06D6A0' }} strokeWidth={3} />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '8px 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 26, color: '#0D3B66', marginBottom: 4 }}>
                ¿A qué AFP pertenece?
              </p>
              <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 600, fontSize: 18, color: '#5A6F8C', marginTop: 0, marginBottom: 8 }}>
                Toque su AFP para seleccionarla:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {AFP_OPTIONS.map((afp) => (
                  <motion.button
                    key={afp.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setForm((f) => ({ ...f, afp: afp.id }))}
                    animate={{
                      backgroundColor: form.afp === afp.id ? afp.color : '#FFFFFF',
                      borderColor: form.afp === afp.id ? afp.color : 'rgba(13,59,102,0.15)',
                      scale: form.afp === afp.id ? 1.03 : 1,
                    }}
                    style={{
                      minHeight: 100, borderRadius: 24, border: `3px solid`,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: form.afp === afp.id ? `0 8px 24px ${afp.color}44` : '0 2px 10px rgba(13,59,102,0.08)',
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 36 }}>{afp.emoji}</span>
                    <span style={{
                      fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 800, fontSize: 16,
                      color: form.afp === afp.id ? '#FDFBF7' : '#0D3B66', textAlign: 'center', lineHeight: 1.3,
                    }}>
                      {afp.name}
                    </span>
                    {form.afp === afp.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle style={{ width: 22, height: 22, color: form.afp === afp.id ? '#FDFBF7' : '#06D6A0' }} strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div
                style={{ borderRadius: 20, backgroundColor: '#E8EDF5', border: '3px solid rgba(13,59,102,0.15)', padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: 26, flexShrink: 0 }}>ℹ️</span>
                <p style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 700, fontSize: 16, color: '#0D3B66', margin: 0, lineHeight: 1.5 }}>
                  Si no está seguro, puede cambiarlo después. También puede preguntar: <strong>"¿A qué AFP pertenezco?"</strong>
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleFinish}
                disabled={!form.afp}
                style={{
                  width: '100%', minHeight: 80, borderRadius: 24,
                  backgroundColor: form.afp ? '#06D6A0' : '#C8D6E5',
                  border: 'none', cursor: form.afp ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: form.afp ? '0 8px 28px rgba(6,214,160,0.45)' : 'none',
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 28 }}>🎉</span>
                <span style={{ fontFamily: 'Inter, Roboto, sans-serif', fontWeight: 900, fontSize: 24, color: form.afp ? '#0D3B66' : '#8BA0B8' }}>
                  ¡Crear mi cuenta!
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}