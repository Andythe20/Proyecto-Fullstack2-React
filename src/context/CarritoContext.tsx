import { createContext } from "react";
import type { Product } from "../types/product";

interface CarritoContextProps {
  items: Product[];
  totalQuantity: number;
  addProduct: (product: Product) => void;
  removeProduct: (code: string, qty?: number) => void;
  clearCart: () => void;
}

export const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);