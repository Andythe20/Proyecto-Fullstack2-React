import type { User } from "../types/user";

const USER_KEY = "registeredUser";

export const registerUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getRegisteredUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const authenticateUser = (
  email: string,
  password: string
): User | null => {
  const user = getRegisteredUser();
  if (!user) return null;

  return user.correo === email && user.contrasenna === password ? user : null;
};
