import { Routes, Route } from "react-router-dom";

import Contacto from "../pages/Contacto/Contacto";
import Inicio from "../pages/Inicio/Inicio.tsx";
import Nosotros from "../pages/Sobre-nosotros/Nosotros.tsx";
import Productos from "../pages/Productos/Productos.tsx";
import DetalleProducto from "../pages/DetalleProducto/DetalleProducto.tsx";
import CarritoPage from "../pages/CarritoPage/CarritoPage.tsx";
import Login from "../pages/Login/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.tsx";
import Register from "../pages/Register/Register.tsx";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detalleProducto" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
