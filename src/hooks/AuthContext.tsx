import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import supabase from "../supabase";

export interface AuthContextValue {
  user: User | null;
  profile: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // 1. Получаем текущего пользователя сразу при монтировании
    supabase.auth.getUser().then((data) => {
      if (!data.error?.message) {
        setIsAuthenticated(true);
        setUser(data.data.user);
      };
    });
    // 2. Подписываемся на изменения сессии (вход/выход/истечение токена)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        setUser(session?.user ?? null);
        // isLoading можно не менять здесь — он уже false после первого запроса
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    isAuthenticated: isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};