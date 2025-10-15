import { useEffect, useState, type ReactNode } from "react";
import { CarritoContext } from "./CarritoContext";
import type { CartProduct, Product } from "../types/product";

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider = ({ children }: CarritoProviderProps) => {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar desde localStorage una sola vez al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("carrito");
      if (stored) setItems(JSON.parse(stored));
    } catch (err) {
      console.error("Error al cargar carrito:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar carrito (solo después de cargar)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("carrito", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // --- Funciones para manipular el carrito --- //
  // Agregar producto
  const addProduct = (product: CartProduct | Product) => {
    // Normalizar a CartProduct (asegurar quantity)
    const cartProduct: CartProduct = {
      ...product,
      quantity: (product as any).quantity ?? 1,
    };

    setItems((prev) => {
      const existing = prev.find((p) => p.codigo === cartProduct.codigo);
      if (existing) {
        return prev.map((p) =>
          p.codigo === cartProduct.codigo
            ? { ...p, quantity: p.quantity + (cartProduct.quantity || 1) }
            : p
        );
      }
      return [...prev, cartProduct];
    });
  };

  // Remover producto
  const removeProduct = (code: string, qty: number = 1) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.codigo === code ? { ...p, quantity: p.quantity - qty } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // Limpiar carrito
  const clearCart = () => setItems([]);

  // Cantidad total de items
  const totalQuantity = items.reduce((sum, p) => sum + (p.quantity || 0), 0);


  return (
    <CarritoContext.Provider
      value={{ carrito: items, totalQuantity, addProduct, removeProduct, clearCart }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
