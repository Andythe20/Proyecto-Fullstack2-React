import { useEffect, useState, type ReactNode } from "react";
import { CarritoContext } from "./CarritoContext";
import type { Product } from "../types/product";

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider = ({ children }: CarritoProviderProps) => {
  const [items, setItems] = useState<Product[]>([]);

  // Cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) setItems(JSON.parse(data));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  // --- Funciones para manipular el carrito --- //
  // Agregar producto
  const addProduct = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.codigo === product.codigo);
      if (existing) {
        return prev.map((p) =>
          p.codigo === product.codigo
            ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // Remover producto
  const removeProduct = (code: string, qty: number = 1) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.codigo === code ? { ...p, quantity: (p.quantity || 1) - qty } : p
        )
        .filter((p) => (p.quantity || 0) > 0)
    );
  };

  // Limpiar carrito
  const clearCart = () => setItems([]);

  // Cantidad total de items
  const totalQuantity = items.reduce((sum, p) => sum + (p.quantity || 0), 0);

  return (
    <CarritoContext.Provider value={{ items, totalQuantity, addProduct, removeProduct, clearCart }}>
      {children}
    </CarritoContext.Provider>
  );
};