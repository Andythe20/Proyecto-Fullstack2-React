import { useEffect, useState, useMemo, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Login: guarda en localStorage y en el estado
  const login = (u: User) => {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  // Logout: elimina y limpia estado
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
