import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar/Navbar.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'
import Footer from "./components/Footer/Footer.tsx";
import { CarritoProvider } from "./context/CarritoProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarritoProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
      <Footer/>
    </CarritoProvider>
  </StrictMode>
);
