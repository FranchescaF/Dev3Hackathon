import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { useAuth } from './context/AuthContext';

const pageTitles: Record<string, string> = {
  '/': 'Tu asistente de pensiones',
  '/seguimiento': 'Mi AFP',
  '/historial': 'Historial',
  '/aprender': 'Aprender',
  '/ayuda': 'Centro de Ayuda',
};

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const subtitle = pageTitles[location.pathname] ?? 'Molly';
  const isHelpScreen = location.pathname === '/ayuda';

  // Redirect to welcome if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/welcome', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

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
        boxShadow: '0 0 80px rgba(0,0,0,0.2)',
      }}
    >
      {/* Header - fixed height */}
      <div style={{ flexShrink: 0 }}>
        <Header subtitle={subtitle} />
      </div>

      {/* Main content - scrollable for most screens, flex for chat */}
      <div
        style={{
          flex: 1,
          overflow: isHelpScreen ? 'hidden' : 'auto',
          overflowX: 'hidden',
          display: isHelpScreen ? 'flex' : 'block',
          flexDirection: isHelpScreen ? 'column' : undefined,
        }}
      >
        <Outlet />
      </div>

      {/* Bottom nav - fixed height */}
      <div style={{ flexShrink: 0 }}>
        <BottomNav />
      </div>
    </div>
  );
}
