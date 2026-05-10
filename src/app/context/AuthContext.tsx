import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUser {
  name: string;
  dni: string;
  afp: string;
  phone: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (dni: string) => void;
  register: (data: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: AuthUser = {
  name: 'Rosa Mamani',
  dni: '45218834',
  afp: 'AFP Integra',
  phone: '987654321',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('molly_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (dni: string) => {
    // Mock: accept any 8-digit DNI
    const loggedUser = { ...MOCK_USER, dni };
    setUser(loggedUser);
    localStorage.setItem('molly_user', JSON.stringify(loggedUser));
  };

  const register = (data: AuthUser) => {
    setUser(data);
    localStorage.setItem('molly_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('molly_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
