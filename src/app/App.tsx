import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div
        style={{
          minHeight: '100dvh',
          backgroundColor: '#1a1a2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}
