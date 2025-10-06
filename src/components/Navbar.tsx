import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary barra-navegacion fixed-top shadow">
        <div className="container-fluid">
            
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-auto ">
                        <Link className='nav-link' to="/">Inicio</Link>
                        <Link className='nav-link' to="/nosotros">Nosotros</Link>
                        <Link className='nav-link' to="/productos">Productos</Link>
                        <Link className='nav-link' to="/contacto">Contacto</Link>
                </div>
            </div>
        </div>
    </nav>
  );
}


export default Navbar;