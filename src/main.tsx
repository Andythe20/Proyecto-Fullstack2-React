import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { AuthProvider } from "./context/AuthContextJWT.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { CarritoProvider } from "./context/CarritoProvider.tsx";


createRoot(document.getElementById("root")!).render(
<AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
);
