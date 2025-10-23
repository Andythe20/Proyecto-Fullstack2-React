import { Link } from "react-router-dom";
import { useState } from "react";
import OnlyFlans_logo from "../../assets/Imagenes/OnlyFlans_logo.png";
import { IoCartOutline } from "react-icons/io5";

import { useAuth } from "../../hooks/useAuth";
import { useCarrito } from "../../hooks/useCarrito";

function Navbar() {
  const { user, logout } = useAuth(); // <-- usar AuthContext
  const { totalQuantity } = useCarrito();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // <-- limpia el user del contexto y del localStorage
    window.location.href = "/"; // redirigir
  };

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary barra-navegacion fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          OnlyFlans
          <img
            src={OnlyFlans_logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top ms-2 rounded-circle p-1 border border-1"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNavAltMarkup"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
            <Link className="nav-link" to="/nosotros">
              Nosotros
            </Link>
            <Link className="nav-link" to="/productos">
              Productos
            </Link>
            <Link className="nav-link" to="/contacto">
              Contacto
            </Link>
          </div>

          <div className="navbar-nav ms-auto">
            {!user ? (
              <Link className="nav-link" to="/login">
                Iniciar sesión
              </Link>
            ) : (
              <div className="dropdown" id="userMenu">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="ms-2">
                    ¡Hola, {user.nombres || user.email}!
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <Link
              className="nav-link position-relative d-flex align-items-center me-3"
              to="/carrito"
            >
              <div className="position-relative d-inline-block">
                <IoCartOutline
                  style={{ fontSize: "1.8rem", verticalAlign: "middle" }}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
