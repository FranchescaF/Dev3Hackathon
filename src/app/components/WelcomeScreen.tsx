import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Wallet, Shield, ChevronRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const WOMAN_IMG =
  'https://images.unsplash.com/photo-1740735074136-5df85e1b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVydXZpYW4lMjB3b21hbiUyMHNtaWxpbmclMjBoYXBweSUyMHBob25lfGVufDF8fHx8MTc3ODM4MjUzOXww&ixlib=rb-4.1.0&q=80&w=1080';

const COUPLE_IMG =
  'https://images.unsplash.com/photo-1739932905716-6555c792acef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjb3VwbGUlMjBoYXBweSUyMHJldGlyZW1lbnQlMjBzYXZpbmdzfGVufDF8fHx8MTc3ODM4MjU0MHww&ixlib=rb-4.1.0&q=80&w=1080';

const slides = [
  {
    img: WOMAN_IMG,
    title: 'Su pensión,\nen su voz',
    sub: 'Consulte su AFP sin complicaciones. Solo hable con Molly.',
  },
  {
    img: COUPLE_IMG,
    title: 'Simple y\nSeguro',
    sub: 'Diseñado especialmente para usted, con letras grandes y botones fáciles.',
  },
];

const floatingIcons = [
  { Icon: Mic, color: '#06D6A0', size: 28, x: '10%', delay: 0 },
  { Icon: Wallet, color: '#FFB800', size: 24, x: '78%', delay: 0.4 },
  { Icon: Shield, color: '#0D3B66', size: 22, x: '85%', delay: 0.8 },
  { Icon: Star, color: '#06D6A0', size: 18, x: '5%', delay: 1.2 },
];

export function WelcomeScreen() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlide((s) => (s + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Image Hero */}
      <div style={{ position: 'relative', height: '58%', flexShrink: 0, overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <ImageWithFallback
              src={slides[slide].img}
              alt="Persona mayor feliz usando Molly"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(13,59,102,0.35) 0%, rgba(13,59,102,0.08) 50%, rgba(253,251,247,1) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Logo badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: 999,
            paddingLeft: 14,
            paddingRight: 18,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#0D3B66',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 20 }}>🐦</span>
          </div>
          <span
            style={{
              fontFamily: 'Inter, Roboto, sans-serif',
              fontWeight: 900,
              fontSize: 22,
              color: '#0D3B66',
              letterSpacing: '-0.5px',
            }}
          >
            Molly
          </span>
        </motion.div>

        {/* Floating icons */}
        {floatingIcons.map(({ Icon, color, size, x, delay }, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '30%',
              left: x,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(6px)',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay },
              opacity: { duration: 0.5, delay: delay + 0.3 },
            }}
          >
            <Icon style={{ width: size, height: size, color }} strokeWidth={2.5} />
          </motion.div>
        ))}

        {/* Slide indicator dots */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}
        >
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === slide ? 24 : 8, backgroundColor: i === slide ? '#06D6A0' : 'rgba(255,255,255,0.6)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 4, cursor: 'pointer' }}
              onClick={() => { setDirection(i > slide ? 1 : -1); setSlide(i); }}
            />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 32,
          paddingTop: 8,
          gap: 20,
        }}
      >
        {/* Slide Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <h1
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 900,
                fontSize: 32,
                color: '#0D3B66',
                lineHeight: 1.2,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {slides[slide].title}
            </h1>
            <p
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 600,
                fontSize: 18,
                color: '#5A6F8C',
                lineHeight: 1.45,
                marginTop: 8,
              }}
            >
              {slides[slide].sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
          {/* Primary - Login */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              minHeight: 80,
              borderRadius: 24,
              backgroundColor: '#0D3B66',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 28,
              paddingRight: 20,
              boxShadow: '0 8px 30px rgba(13,59,102,0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: 'rgba(6,214,160,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 26 }}>👋</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 900,
                    fontSize: 22,
                    color: '#FDFBF7',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Entrar a mi cuenta
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'rgba(253,251,247,0.65)',
                    margin: 0,
                  }}
                >
                  Ya tengo cuenta en Molly
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: 28, height: 28, color: '#06D6A0', flexShrink: 0 }} strokeWidth={3} />
          </motion.button>

          {/* Secondary - Register */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/register')}
            style={{
              width: '100%',
              minHeight: 80,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              border: '3px solid #0D3B66',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 28,
              paddingRight: 20,
              boxShadow: '0 4px 16px rgba(13,59,102,0.10)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: '#E8F5F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 26 }}>✨</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 900,
                    fontSize: 22,
                    color: '#0D3B66',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Soy nuevo aquí
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#5A6F8C',
                    margin: 0,
                  }}
                >
                  Crear mi cuenta gratis
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: 28, height: 28, color: '#0D3B66', flexShrink: 0 }} strokeWidth={3} />
          </motion.button>

          {/* Helper badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingTop: 4,
            }}
          >
            <Shield style={{ width: 18, height: 18, color: '#06D6A0' }} strokeWidth={2.5} />
            <p
              style={{
                fontFamily: 'Inter, Roboto, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: '#5A6F8C',
                margin: 0,
              }}
            >
              100% seguro · Datos protegidos por la SBS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}