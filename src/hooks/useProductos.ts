import { useState, useEffect } from "react";
import type { Product } from "../types/product";

function useProductos() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "/api/v1/products"; // Ruta relativa para que Netlify haga de proxy

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        console.log("Iniciando fetch a:", API_URL);

        const res = await fetch(API_URL);

        console.log("Fetch completado");
        console.log("Response URL:", res.url);
        console.log("Status:", res.status);
        console.log("Headers:", Array.from(res.headers.entries()));

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error HTTP:", res.status, errorText);
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log("Datos recibidos:", data);

        setProductos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error detallado al obtener productos:", err.message);
          setError(err.message);
        } else {
          console.error("Error desconocido al obtener productos:", err);
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  function getProductoByCode(codigo: string) {
    return productos.find((p) => p.codigo === codigo) || null;
  }

  return { productos, isLoading, error, getProductoByCode };
}

export default useProductos;