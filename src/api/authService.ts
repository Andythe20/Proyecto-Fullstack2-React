import type { User } from "../types/user";

const USER_KEY = "registeredUser";
const TOKEN_KEY = "token";

// ---------- Local Storage Utilities ----------
export const registerUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getRegisteredUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Usar 'contrasenna' en lugar de 'password'
export const authenticateUser = (email: string, contrasenna: string): User | null => {
  const user = getRegisteredUser();
  if (!user) return null;
  return user.email === email && user.contrasenna === contrasenna ? user : null;
};

// ---------- Token Utilities ----------
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ---------- Logout desde backend ----------
export const logout = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) {
    console.error("No hay token disponible para cerrar sesión");
    return false;
  }

  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cerrar sesión");
    }

    // Si todo va bien, borramos token y usuario local
    removeToken();
    localStorage.removeItem(USER_KEY);
    return true;
  } catch (error: any) {
    console.error("Error en logout:", error.message);
    return false;
  }
};
