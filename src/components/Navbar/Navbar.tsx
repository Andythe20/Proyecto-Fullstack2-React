import { Link } from 'react-router-dom';
import OnlyFlans_logo from '../../assets/Imagenes/OnlyFlans_logo.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary barra-navegacion fixed-top shadow">
        <div className="container-fluid">

            <Link className="navbar-brand d-flex align-items-center" to="/">
                OnlyFlans
                <img src={OnlyFlans_logo} alt="Logo epIk0" width="50" height="50"
                className="d-inline-block align-text-top ms-2 rounded-circle p-1 border border-1"></img>
            </Link>

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