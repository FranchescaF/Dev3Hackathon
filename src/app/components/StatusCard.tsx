import { Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface StatusCardProps {
  message: string;
  isListening: boolean;
}

export function StatusCard({ message, isListening }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full rounded-3xl p-8 border-4 mb-6"
      style={{
        backgroundColor: isListening ? '#06D6A0' : '#0D3B66',
        borderColor: isListening ? '#06D6A0' : '#0D3B66',
      }}
    >
      <div className="flex items-center gap-6">
        <Volume2
          className="flex-shrink-0"
          style={{ width: '48px', height: '48px', color: '#FDFBF7' }}
          strokeWidth={3}
        />
        <p
          className="font-bold flex-1"
          style={{ fontSize: '26px', lineHeight: '1.4', color: '#FDFBF7' }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
}
