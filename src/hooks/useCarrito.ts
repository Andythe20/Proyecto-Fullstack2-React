import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  return context;
};
