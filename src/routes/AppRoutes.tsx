import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // 👈 importar
import CarritoPage from "../pages/CarritoPage/CarritoPage";
import DetalleProducto from "../pages/DetalleProducto/DetalleProducto";
import Inicio from "../pages/Inicio/Inicio";
import Nosotros from "../pages/Sobre-nosotros/Nosotros";
import Contacto from "../pages/Contacto/Contacto";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Login from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import Productos from "../pages/Productos/Productos";
import Register from "../pages/Register/Register";
import Perfil from "../pages/Perfil/Perfil";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/carrito" element={<CarritoPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detalleProducto"
        element={
          <ProtectedRoute>
            <DetalleProducto />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
