import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OnlyFlans_logo from '../../assets/Imagenes/OnlyFlans_logo.png';
import { IoCartOutline } from 'react-icons/io5';

function Navbar() {
  // userLoggedIn guarda si el usuario esta logueado o no
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)

  // userFirstName guarda el nombre del usuario para mostrarlo en el navbar
  const [userFirstName, setUserFirstName] = useState<string | null>(null);

  // cartCount guarda la cantidad de productos en el carrito para el badge
  const [cartCount, setCartCount] = useState<number>(0);

  //

  const [menuOpen, setMenuOpen] = useState(false); // <-- estado para menú hamburguesa


  // === Hook para efectos secundarios ===
  useEffect(() => {
    // Revisamos en localStorage si el usuario está guardado (logueado)
    const userEmail = localStorage.getItem('currentUserEmail');
    const storedUserFirstName = localStorage.getItem('currentUserFirstName');

    // Si encontramos al usuario, actualizamos el estado para mostrar el menú de usuario
    if (userEmail && storedUserFirstName) {
      setUserLoggedIn(true);
      setUserFirstName(storedUserFirstName);
    }

    // También cargamos el carrito, por ejemplo si está guardado en localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []); // El array vacío significa que esto corre solo una vez, al montar el componente

  // === Función para cerrar sesión ===
  const handleLogout = () => {
    // Limpiamos la info del usuario en localStorage
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserFirstName');
    setUserLoggedIn(false);
    setUserFirstName(null);
    // Redirigimos a la página de inicio o la que prefieras
    window.location.href = '/';
  };


  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary barra-navegacion fixed-top shadow">
      <div className="container-fluid">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          OnlyFlans
          <img src={OnlyFlans_logo} alt="Logo epIk0" width="50" height="50"
            className="d-inline-block align-text-top ms-2 rounded-circle p-1 border border-1"></img>
        </Link>

        {/* Botón toggler para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)} // toggle estado
          aria-controls="navbarNavAltMarkup"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto ">
            <Link className='nav-link' to="/">Inicio</Link>
            <Link className='nav-link' to="/nosotros">Nosotros</Link>
            <Link className='nav-link' to="/productos">Productos</Link>
            <Link className='nav-link' to="/contacto">Contacto</Link>
          </div>

          <div className='navbar-nav ms-auto'>
            {/* Si NO está logueado, mostrar botón para iniciar sesión */}
            <div id="loginSection" style={{ display: userLoggedIn ? 'none' : 'block' }}>
              <Link className="nav-link" to="/login">
                Iniciar sesión
              </Link>
            </div>
          </div>

          {/* Icono del carrito con cantidad de productos */}
          <Link className="nav-link position-relative d-flex align-items-center" to="/carrito">
            <div className="position-relative d-inline-block">
              <IoCartOutline
                style={{ fontSize: '1.8rem', verticalAlign: 'middle' }}
                aria-label="Carrito de compras"
              />
              <span
                id="cart-count"
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {cartCount}
              </span>
            </div>
          </Link>

        </div>
      </div>
    </nav>
  );
}


export default Navbar;