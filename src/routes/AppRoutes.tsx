import { Routes, Route } from "react-router-dom";

import Contacto from "../pages/Contacto/Contacto";
import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Sobre-nosotros/Nosotros.tsx";
import Productos from "../pages/Productos/Productos.tsx";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
