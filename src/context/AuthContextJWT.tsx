// src/context/AuthContextJWT.tsx
import { createContext, useState, useEffect } from "react";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

//const API_URL = ""; // Esto se define en vite.config.ts para desarrollo y public/_redirects en producción

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Restaurar sesión si hay tokens en localStorage
  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    const storedUser = localStorage.getItem("authUser");

    if (storedTokens) {
      const { accessToken, refreshToken } = JSON.parse(storedTokens);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN usando JWT
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const { accessToken, refreshToken } = await response.json();

      // Guardamos tokens en estado y localStorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ accessToken, refreshToken })
      );

      // Crear usuario temporal mínimo
      const userData: User = {
        email,
        nombres: "",
        apellidos: "",
        rut: "",
        fechaNacimiento: "",
        password, // opcional
      };

      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));

      return true;
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
