import { createContext } from "react";
import type { CartProduct, Product } from "../types/product";

interface CarritoContextProps {
  carrito: CartProduct[];
  totalQuantity: number;
  addProduct: (product: CartProduct | Product) => void;
  removeProduct: (codigo: string, cantidad?: number) => void;
  clearCart: () => void;
}

export const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);