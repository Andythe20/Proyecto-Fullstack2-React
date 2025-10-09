import Pasteleria_logo from "../../assets/Imagenes/hero.jpg"
import "./Nosotros.css"

function Nosotros() {
    return (
        <>
            <h1 className="text-center my-5">Sobre Nosotros: Pastelería OnlyFlans</h1>

            <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 mb-4 py-5 h-100 d-flex">

                        <div className="rounded-3 tex bg-white shadow text-start mx-5 fs-5 px-3 py-3 font-lato">
                            <div className="py-3">
                                <p>
                                    En Pastelería OnlyFlans, celebramos la dulzura de la vida. Con 50 años de trayectoria, nos
                                    hemos consolidado como un referente de la repostería chilena, combinando tradición con un
                                    toque moderno y creativo.
                                </p>
                            </div>
                            <div className="py-3">
                                <p>
                                    Nuestra historia es un testimonio de nuestra pasión. En 1995, colaboramos en la creación de
                                    la torta más grande del mundo, un hito que nos valió un Récord Guinness y que marca el
                                    espíritu innovador que nos caracteriza.
                                </p>
                            </div>
                            <div className="py-3">
                                <p>
                                    Nuestra misión es sencilla pero profunda: ofrecer una experiencia dulce y memorable a
                                    nuestros clientes. Cada torta y cada producto que creamos están pensados para acompañarte en
                                    tus momentos más especiales, desde un cumpleaños hasta una boda.
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-4 d-flex align-items-center justify-content-center">
                        <img src={Pasteleria_logo} className="img-fluid rounded-3 shadow-lg" alt="Imagen pastelería"/>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="rounded-3 bg-white shadow mt-5 col-12 fs-5 text-center px-3 py-3 font-lato">
                    <p>
                        Buscamos ser la tienda online líder en repostería en Chile, y para lograrlo, nos enfocamos en la
                        innovación, la calidad y el impacto positivo en la comunidad. Nos enorgullece especialmente apoyar y
                        formar a nuevos talentos de la gastronomía, integrando sus ideas y recetas en nuestra comunidad.
                    </p>
                    <p>
                        Te invitamos a descubrir nuestro catálogo, donde encontrarás desde clásicos chilenos hasta opciones sin
                        azúcar, sin gluten y veganas. ¡Únete a nuestra dulce historia y crea momentos inolvidables con nosotros!
                    </p>
                </div>
            </div>

            <div className="container text-center my-5">
                <p className="texto-comunidad">Comunidad y Educación</p>
                <p className="mb-4 texto-bajo-comunidad bg-white shadow fs-5 rounded-3 py-2">
                    Conoce nuestro espacio de aprendizaje y colaboración, donde estudiantes y amantes de la repostería comparten
                    recetas, consejos y novedades.
                </p>
            </div>

            <div className="container mb-5">

                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body">
                                <h5 className="card-title">Blog de Repostería</h5>
                                <p className="card-text">
                                    Descubre historias, consejos y curiosidades sobre la repostería chilena y mundial.
                                </p>
                                <a href="https://dulcemisu.com/blog" target="_blank"
                                    className="btn btnBrown rounded-pill px-4 font-lato">Descubrir</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body">
                                <h5 className="card-title">Recetas de Estudiantes</h5>
                                <p className="card-text">
                                    Recetas y tips de los estudiantes de gastronomía de Duoc, ¡aprende y comparte!
                                </p>
                                <a href="https://www.duoc.cl/sedes/valparaiso/recetario" target="_blank"
                                    className="btn btnBrown rounded-pill px-4 font-lato">Ver recetas</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body">
                                <h5 className="card-title">Noticias y Eventos</h5>
                                <p className="card-text">
                                    Mantente al día con nuestras actividades, concursos y colaboraciones.
                                </p>
                                <a href="https://www.duoc.cl/vida-estudiantil" target="_blank"
                                    className="btn btnBrown rounded-pill px-4 font-lato">Ver noticias</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Nosotros;