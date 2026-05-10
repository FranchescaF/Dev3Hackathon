import { useLocation, useNavigate } from 'react-router';
import { Home, TrendingUp, ClipboardList, BookOpen, MessageCircle } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/seguimiento', icon: TrendingUp, label: 'Mi AFP' },
  { path: '/historial', icon: ClipboardList, label: 'Historial' },
  { path: '/aprender', icon: BookOpen, label: 'Aprender' },
  { path: '/ayuda', icon: MessageCircle, label: 'Ayuda' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="flex-shrink-0 w-full"
      style={{
        backgroundColor: '#0D3B66',
        borderTop: '3px solid rgba(6,214,160,0.3)',
        zIndex: 50,
      }}
    >
      <div className="flex items-stretch" style={{ height: '88px' }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-all touch-manipulation relative"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-2 right-2 rounded-b-full"
                  style={{ height: '4px', backgroundColor: '#06D6A0' }}
                />
              )}
              <div
                className="flex items-center justify-center rounded-2xl transition-all"
                style={{
                  width: '48px',
                  height: '40px',
                  backgroundColor: isActive ? 'rgba(6,214,160,0.2)' : 'transparent',
                }}
              >
                <Icon
                  style={{
                    width: '28px',
                    height: '28px',
                    color: isActive ? '#06D6A0' : 'rgba(253,251,247,0.55)',
                  }}
                  strokeWidth={isActive ? 3 : 2.5}
                />
              </div>
              <span
                className="font-bold"
                style={{
                  fontSize: '11px',
                  lineHeight: '1.2',
                  color: isActive ? '#06D6A0' : 'rgba(253,251,247,0.55)',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}