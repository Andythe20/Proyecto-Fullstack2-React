// src/utils/api.ts
import { useAuth } from "../hooks/useAuth";

export const useApi = () => {
  const { accessToken } = useAuth();

  const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
  ) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return res.json();
  };

  return { fetchWithAuth };
};
