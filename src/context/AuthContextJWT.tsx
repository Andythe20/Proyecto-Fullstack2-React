import { createContext, useState, useEffect } from "react";
import type { User } from "../types/user";

// --- DECODIFICAR TOKEN JWT ---
function decodeJWT(token: string) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading?: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- FUNCION AUXILIAR ---
  async function fetchUserData(email: string, token: string) {
    const res = await fetch(`/api/v1/users/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;

    return await res.json();
  }

  // Restaurar sesión
  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");

    if (storedTokens) {
      const { accessToken, refreshToken } = JSON.parse(storedTokens);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      const payload = decodeJWT(accessToken);
      if (!payload) {
        setLoading(false);
        return;
      }

      const email = payload.sub; // <-- AQUÍ VIENE EL EMAIL REAL

      // Traer datos reales del backend
      fetchUserData(email, accessToken).then((data) => {
        if (data) setUser(data);
        setLoading(false);
      });
    }else {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const { accessToken, refreshToken } = await response.json();

      // Guardar tokens
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ accessToken, refreshToken })
      );

      // Sacar email desde el token
      const payload = decodeJWT(accessToken);
      const emailFromToken = payload.sub;

      // Llamar backend para obtener datos reales
      const userData = await fetchUserData(emailFromToken, accessToken);
      if (!userData) return false;

      setUser(userData);

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
        isAdmin: user?.userRole === "ADMIN",
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
