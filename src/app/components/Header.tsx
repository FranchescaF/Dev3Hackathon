import { Shield, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  subtitle?: string;
}

export function Header({ subtitle = 'Tu asistente de pensiones' }: HeaderProps) {
  const [hasNotif] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/welcome', { replace: true });
  };

  return (
    <header
      className="w-full shadow-lg flex-shrink-0"
      style={{ backgroundColor: '#0D3B66' }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#06D6A0',
              flexShrink: 0,
            }}
          >
            <Shield
              style={{ width: '32px', height: '32px', color: '#FDFBF7' }}
              strokeWidth={3}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="font-black tracking-tight"
                style={{ fontSize: '28px', lineHeight: '1.1', color: '#FDFBF7' }}
              >
                Molly
              </h1>
              <span
                className="rounded-full px-2 py-0.5 font-bold"
                style={{
                  fontSize: '12px',
                  backgroundColor: '#06D6A0',
                  color: '#0D3B66',
                  lineHeight: '1.4',
                }}
              >
                AFP
              </span>
            </div>
            <p
              className="font-bold"
              style={{ fontSize: '14px', lineHeight: '1.2', color: 'rgba(253,251,247,0.80)' }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Notification Bell + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            className="relative flex items-center justify-center rounded-2xl transition-all"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
            aria-label="Notificaciones"
          >
            <Bell
              style={{ width: '28px', height: '28px', color: '#FDFBF7' }}
              strokeWidth={3}
            />
            {hasNotif && (
              <span
                className="absolute rounded-full"
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#06D6A0',
                  border: '2px solid #0D3B66',
                  top: '10px',
                  right: '10px',
                }}
              />
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center rounded-2xl transition-all"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255,255,255,0.10)',
              border: '2px solid rgba(255,255,255,0.15)',
            }}
            aria-label="Salir"
          >
            <LogOut style={{ width: '26px', height: '26px', color: 'rgba(253,251,247,0.75)' }} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
}