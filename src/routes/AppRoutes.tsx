import { Routes, Route } from "react-router-dom";

import Contacto from "../pages/Contacto/Contacto";
import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Sobre-nosotros/Nosotros.tsx";
import Productos from "../pages/Productos/Productos.tsx";
import DetalleProducto from "../pages/DetalleProducto/DetalleProducto.tsx";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detalleProducto" element={<DetalleProducto />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
