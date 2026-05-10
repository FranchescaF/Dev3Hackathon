import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mic, Delete, CheckCircle, RefreshCw, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MAN_IMG =
  'https://images.unsplash.com/photo-1758691030826-86a149b6278b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwbWFuJTIwdXNpbmclMjBzbWFydHBob25lJTIwdm9pY2UlMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzc4MzgyNTQzfDA&ixlib=rb-4.1.0&q=80&w=1080';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return '¡Buenos días!';
  if (hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

type LoginMode = 'dni' | 'voice' | 'success';

export function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [dni, setDni] = useState('');
  const [mode, setMode] = useState<LoginMode>('dni');
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [error, setError] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleKey = (key: string) => {
    setError('');
    if (key === 'del') {
      setDni((d) => d.slice(0, -1));
    } else if (key && dni.length < 8) {
      setDni((d) => d + key);
    }
  };

  const handleLogin = () => {
    if (dni.length !== 8) {
      setError('Por favor ingrese su DNI completo (8 dígitos)');
      return;
    }
    setMode('success');
    setTimeout(() => {
      login(dni);
      navigate('/', { replace: true });
    }, 2000);
  };

  const handleVoiceDown = () => {
    if (voiceState === 'processing') return;
    setVoiceState('listening');
  };

  const handleVoiceUp = () => {
    if (voiceState !== 'listening') return;
    setVoiceState('processing');
    timerRef.current = setTimeout(() => {
      // Mock: fill with demo DNI
      setDni('45218834');
      setMode('dni');
      setVoiceState('idle');
    }, 2000);
  };

  const maskedDni = dni.padEnd(8, '·');
  const dniChars = maskedDni.split('');

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
        position: 'relative',
        boxShadow: '0 0 80px rgba(0,0,0,0.25)',
      }}
    >
      {/* Success Overlay */}
      <AnimatePresence>
        {mode === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 100,
              backgroundColor: '#0D3B66',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle style={{ width: 100, height: 100, color: '#06D6A0' }} strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <p
                style={{
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#FDFBF7',
                  margin: 0,
                }}
              >
                ¡Bienvenida,
              </p>
              <p
                style={{
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#06D6A0',
                  margin: 0,
                }}
              >
                Rosa!
              </p>
              <p
                style={{
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'rgba(253,251,247,0.7)',
                  marginTop: 12,
                }}
              >
                Entrando a su cuenta...
              </p>
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw style={{ width: 36, height: 36, color: 'rgba(253,251,247,0.4)' }} strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 16,
          paddingBottom: 8,
          flexShrink: 0,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/welcome')}
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            backgroundColor: '#F0EDE8',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft style={{ width: 30, height: 30, color: '#0D3B66' }} strokeWidth={3} />
        </motion.button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Inter, Roboto, sans-serif',
              fontWeight: 900,
              fontSize: 22,
              color: '#0D3B66',
              margin: 0,
            }}
          >
            Ingresar
          </p>
        </div>
        <div style={{ width: 64 }} />
      </div>

      {/* Scroll content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Hero image strip */}
        <div style={{ position: 'relative', height: 180, margin: '12px 16px', borderRadius: 28, overflow: 'hidden' }}>
          <img
            src={MAN_IMG}
            alt="Persona mayor usando Molly"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(13,59,102,0.72) 0%, rgba(6,214,160,0.18) 100%)',
              borderRadius: 28,
            }}
          />
          <div style={{ position: 'absolute', bottom: 18, left: 22 }}>
            <p
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 900,
                fontSize: 26,
                color: '#FDFBF7',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {getGreeting()}
            </p>
            <p
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                color: 'rgba(253,251,247,0.8)',
                margin: 0,
              }}
            >
              Ingrese su DNI para continuar
            </p>
          </div>
          {/* Sound badge */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              backgroundColor: 'rgba(6,214,160,0.92)',
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 12,
              paddingRight: 14,
              paddingTop: 7,
              paddingBottom: 7,
            }}
          >
            <Volume2 style={{ width: 16, height: 16, color: '#fff' }} strokeWidth={3} />
            <span
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 800,
                fontSize: 13,
                color: '#fff',
              }}
            >
              Con voz
            </span>
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: 12, padding: '12px 16px 0' }}>
          {[
            { key: 'dni', label: '🔢 Con DNI', emoji: '' },
            { key: 'voice', label: '🎙️ Con Voz', emoji: '' },
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMode(key as LoginMode)}
              style={{
                flex: 1,
                minHeight: 56,
                borderRadius: 18,
                border: mode === key ? '3px solid #06D6A0' : '3px solid transparent',
                backgroundColor: mode === key ? '#E6FBF5' : '#F0EDE8',
                cursor: 'pointer',
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 800,
                fontSize: 17,
                color: mode === key ? '#0D3B66' : '#5A6F8C',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* DNI Mode */}
          {mode === 'dni' && (
            <motion.div
              key="dni"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '20px 16px 24px' }}
            >
              {/* DNI display */}
              <p
                style={{
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: 24,
                  color: '#0D3B66',
                  textAlign: 'center',
                  marginBottom: 12,
                }}
              >
                Su número de DNI
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                {dniChars.map((char, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i === dni.length - 1 && dni.length > 0 ? [1, 1.18, 1] : 1,
                      borderColor: i < dni.length ? '#06D6A0' : 'rgba(13,59,102,0.2)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 40,
                      height: 52,
                      borderRadius: 12,
                      border: `3px solid ${i < dni.length ? '#06D6A0' : 'rgba(13,59,102,0.2)'}`,
                      backgroundColor: i < dni.length ? '#E6FBF5' : '#F8F6F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Inter, Roboto, sans-serif',
                      fontWeight: 900,
                      fontSize: 24,
                      color: i < dni.length ? '#0D3B66' : 'rgba(13,59,102,0.25)',
                    }}
                  >
                    {i < dni.length ? char : '·'}
                  </motion.div>
                ))}
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: 'Inter, Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#D64045',
                      textAlign: 'center',
                      marginBottom: 8,
                    }}
                  >
                    ⚠️ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Numpad */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                  marginTop: 16,
                }}
              >
                {numpadKeys.map((key, i) => {
                  if (key === '') {
                    return <div key={i} />;
                  }
                  if (key === 'del') {
                    return (
                      <motion.button
                        key="del"
                        whileTap={{ scale: 0.88 }}
                        onClick={() => handleKey('del')}
                        style={{
                          minHeight: 72,
                          borderRadius: 20,
                          backgroundColor: '#F0EDE8',
                          border: '3px solid rgba(13,59,102,0.12)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Delete style={{ width: 30, height: 30, color: '#5A6F8C' }} strokeWidth={2.5} />
                      </motion.button>
                    );
                  }
                  return (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.88, backgroundColor: '#E6FBF5' }}
                      onClick={() => handleKey(key)}
                      style={{
                        minHeight: 72,
                        borderRadius: 20,
                        backgroundColor: '#FFFFFF',
                        border: '3px solid rgba(13,59,102,0.12)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 900,
                        fontSize: 30,
                        color: '#0D3B66',
                        boxShadow: '0 2px 8px rgba(13,59,102,0.07)',
                      }}
                    >
                      {key}
                    </motion.button>
                  );
                })}
              </div>

              {/* Confirm button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                style={{
                  width: '100%',
                  minHeight: 80,
                  borderRadius: 24,
                  backgroundColor: dni.length === 8 ? '#06D6A0' : '#C8D6E5',
                  border: 'none',
                  cursor: dni.length === 8 ? 'pointer' : 'not-allowed',
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  boxShadow: dni.length === 8 ? '0 8px 28px rgba(6,214,160,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}
                disabled={dni.length !== 8}
              >
                <span style={{ fontSize: 28 }}>✅</span>
                <span
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 900,
                    fontSize: 24,
                    color: dni.length === 8 ? '#0D3B66' : '#8BA0B8',
                  }}
                >
                  Entrar ahora
                </span>
              </motion.button>

              {/* Help link */}
              <button
                onClick={() => navigate('/register')}
                style={{
                  width: '100%',
                  marginTop: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#0D3B66',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(13,59,102,0.35)',
                  padding: '10px 0',
                }}
              >
                ¿No tiene cuenta? Regístrese aquí
              </button>
            </motion.div>
          )}

          {/* Voice Mode */}
          {mode === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '28px 16px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 900,
                    fontSize: 26,
                    color: '#0D3B66',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {voiceState === 'listening'
                    ? '¡Escuchando...'
                    : voiceState === 'processing'
                    ? 'Verificando...'
                    : 'Diga su número de DNI'}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#5A6F8C',
                    marginTop: 8,
                  }}
                >
                  {voiceState === 'idle'
                    ? 'Mantenga presionado el micrófono y diga los 8 dígitos'
                    : voiceState === 'listening'
                    ? 'Suelte cuando termine de hablar'
                    : 'Procesando su voz...'}
                </p>
              </div>

              {/* Big mic */}
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                {voiceState === 'listening' && (
                  <>
                    {[1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          backgroundColor: `rgba(6,214,160,${0.12 / ring})`,
                        }}
                        animate={{
                          scale: [1, 1 + ring * 0.22],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: ring * 0.28,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </>
                )}
                <motion.button
                  onPointerDown={handleVoiceDown}
                  onPointerUp={handleVoiceUp}
                  onPointerLeave={handleVoiceUp}
                  animate={{
                    scale: voiceState === 'listening' ? 1.05 : 1,
                    backgroundColor:
                      voiceState === 'listening'
                        ? '#06D6A0'
                        : voiceState === 'processing'
                        ? '#5A6F8C'
                        : '#0D3B66',
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `5px solid ${voiceState === 'listening' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow:
                      voiceState === 'listening'
                        ? '0 12px 50px rgba(6,214,160,0.55)'
                        : '0 8px 32px rgba(13,59,102,0.4)',
                  }}
                  disabled={voiceState === 'processing'}
                >
                  {voiceState === 'processing' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <RefreshCw style={{ width: 70, height: 70, color: '#FDFBF7' }} strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <Mic style={{ width: 80, height: 80, color: '#FDFBF7' }} strokeWidth={3} />
                  )}
                </motion.button>
              </div>

              {/* Voice waveform bars */}
              {voiceState === 'listening' && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', height: 48 }}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: 6,
                        borderRadius: 3,
                        backgroundColor: i % 2 === 0 ? '#06D6A0' : '#0D3B66',
                      }}
                      animate={{ height: ['16px', `${20 + Math.random() * 28}px`, '16px'] }}
                      transition={{
                        duration: 0.5 + i * 0.08,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.06,
                      }}
                    />
                  ))}
                </div>
              )}

              <div
                style={{
                  width: '100%',
                  borderRadius: 20,
                  backgroundColor: '#F0EDE8',
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>💡</span>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#0D3B66',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Diga sus dígitos claramente, por ejemplo: <strong>"cuatro - cinco - dos - uno - ocho - ocho - tres - cuatro"</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}