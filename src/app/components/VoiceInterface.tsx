import { Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

interface VoiceInterfaceProps {
  isListening: boolean;
  onStart: () => void;
  onEnd: () => void;
}

export function VoiceInterface({ isListening, onStart, onEnd }: VoiceInterfaceProps) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="text-center space-y-4">
        <p className="text-foreground font-bold" style={{ fontSize: '28px', lineHeight: '1.4' }}>
          {isListening ? '¡Te escucho!' : 'Presiona para hablar'}
        </p>
        <p className="text-foreground/70" style={{ fontSize: '24px', lineHeight: '1.4' }}>
          {isListening
            ? 'Suelta cuando termines'
            : 'Pregúntame sobre tu pensión'}
        </p>
      </div>

      <motion.button
        onPointerDown={onStart}
        onPointerUp={onEnd}
        onPointerLeave={onEnd}
        className="relative flex items-center justify-center rounded-full transition-all touch-manipulation"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: isListening ? '#06D6A0' : '#0D3B66',
          boxShadow: isListening
            ? '0 8px 32px rgba(6, 214, 160, 0.4)'
            : '0 8px 24px rgba(13, 59, 102, 0.3)',
        }}
        animate={{
          scale: isListening ? 1.05 : 1,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: '#06D6A0' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <div className="relative z-10">
          {isListening ? (
            <Mic className="text-primary-foreground" style={{ width: '80px', height: '80px' }} strokeWidth={3} />
          ) : (
            <MicOff className="text-primary-foreground" style={{ width: '80px', height: '80px' }} strokeWidth={3} />
          )}
        </div>
      </motion.button>

      <div className="bg-muted rounded-3xl p-6 w-full border-4 border-primary/20">
        <p className="text-foreground font-bold text-center" style={{ fontSize: '24px', lineHeight: '1.5' }}>
          Ejemplos de preguntas:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="text-foreground" style={{ fontSize: '22px', lineHeight: '1.5' }}>
            • "¿Cuánto tengo en mi pensión?"
          </li>
          <li className="text-foreground" style={{ fontSize: '22px', lineHeight: '1.5' }}>
            • "¿Cuándo recibo mi pago?"
          </li>
          <li className="text-foreground" style={{ fontSize: '22px', lineHeight: '1.5' }}>
            • "¿Cómo actualizo mis datos?"
          </li>
        </ul>
      </div>
    </div>
  );
}
