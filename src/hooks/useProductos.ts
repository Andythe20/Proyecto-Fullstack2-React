import { useState, useEffect } from "react";
import type { Product } from "../types/product";

// Hook personalizado para manejar productos
function useProductos() {
  // Aquí iría la lógica para manejar productos
  const [productos, setProductos] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch de productos desde un JSON local o API
  useEffect(() => {
    const API_URL = "/data/db.json"; // Reemplazar con API REST definitiva

    // Función asíncrona para obtener productos
    const fetchProductos = async () => {
      try {
        const res = await fetch(API_URL);

        // Manejo de errores HTTP
        if (!res.ok) throw new Error("Error al obtener los productos");

        // Simular espera de 0.8 segundos
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Transformar la respuesta a JSON
        const data = await res.json();

        // Actualizar estado
        setProductos(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []); // Solo se ejecuta una vez al montar

  // Función para obtener un producto por su código
  function getProductoByCode(codigo: string) {
    return productos.find((p) => p.codigo === codigo) || null;
  }

  //
  return { productos, isLoading, error, getProductoByCode };
}

export default useProductos;
