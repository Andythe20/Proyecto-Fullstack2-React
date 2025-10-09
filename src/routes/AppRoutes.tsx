import { Routes, Route } from "react-router-dom";

import Contacto from "../pages/Contacto/Contacto";
import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Nosotros";
import Productos from "../pages/Productos/Productos";

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
