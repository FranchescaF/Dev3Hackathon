import { Wallet, History, HelpCircle, Home } from 'lucide-react';

interface ActionButtonsProps {
  currentView: 'home' | 'balance' | 'history' | 'help';
  onViewChange: (view: 'home' | 'balance' | 'history' | 'help') => void;
}

export function ActionButtons({ currentView, onViewChange }: ActionButtonsProps) {
  const buttons = [
    { id: 'home' as const, icon: Home, label: 'Inicio' },
    { id: 'balance' as const, icon: Wallet, label: 'Saldo' },
    { id: 'history' as const, icon: History, label: 'Historial' },
    { id: 'help' as const, icon: HelpCircle, label: 'Ayuda' },
  ];

  return (
    <div className="w-full grid grid-cols-2 gap-4 mt-8">
      {buttons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className="flex flex-col items-center justify-center gap-3 rounded-3xl border-4 transition-all p-6 touch-manipulation"
          style={{
            minHeight: '120px',
            backgroundColor: currentView === id ? '#0D3B66' : '#FDFBF7',
            borderColor: '#0D3B66',
            color: currentView === id ? '#FDFBF7' : '#0D3B66',
          }}
        >
          <Icon style={{ width: '48px', height: '48px' }} strokeWidth={3} />
          <span className="font-bold" style={{ fontSize: '24px', lineHeight: '1.2' }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
