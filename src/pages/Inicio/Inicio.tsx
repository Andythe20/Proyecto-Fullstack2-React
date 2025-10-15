import "./inicio.css";

import OnlyFlans_logo from "../../assets/Imagenes/OnlyFlans_logo.png"
import Alfajores_avif from "../../assets/Imagenes/alfajores.avif"
import Cafe_y_queque from "../../assets/Imagenes/cafe_y_queque.jpg"
import Galletas_y_brownies from "../../assets/Imagenes/galletas_donas_brownies.jpg"
import Cafe_y_muffin from "../../assets/Imagenes/cafe_y_muffin.jpg"
import Alfajores_2 from "../../assets/Imagenes/alfajores2.jpg"
import Tortas_variedades from "../../assets/Imagenes/tortas_variedades.jpg"
import "./inicio.css"

const Inicio = () => {
  return (
    <>
      <main className="container-fluid">
        <div
          id="logo-container"
          className="row align-items-center justify-content-center text-center flex-column flex-md-row"
        >
          <div className="col-12 col-md-auto mb-3 mb-md-0 d-flex justify-content-center">
            <img
              src={OnlyFlans_logo}
              alt="OnlyFlans Logo"
              className="img-fluid"
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
          </div>
          <div className="col-12 col-md-auto d-flex align-items-center justify-content-center mb-4 mb-md-0">
            <h1 className="text-center m-0">Repostería : Only Flans</h1>
          </div>
        </div>

        <br />

        <div
          id="carouselExampleSlidesOnly"
          className="carousel carousel-dark slide carousel-fade mb-5"
          data-bs-ride="carousel"
          style={{ maxWidth: '850px', margin: 'auto' }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Alfajores_avif} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
                <h5>Alfajores artesanales</h5>
                <p>Deliciosos alfajores rellenos de manjar y cubiertos de chocolate.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Cafe_y_queque} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
                <h5>Tu desayuno ideal</h5>
                <p>El acompañamiento perfecto para tus tardes: café recién hecho y queque casero.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Galletas_y_brownies} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
                <h5>Galletas, Donas y Brownies</h5>
                <p>Deliciosas galletas, donas esponjosas y brownies de chocolate.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Tortas_variedades} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
                <h5>Tortas de Variedades</h5>
                <p>Deliciosas tortas de diferentes sabores y decoraciones.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={Alfajores_2} className="card-img-top" alt="Promoción 1" />
              <div className="card-body">
                <h5 className="card-title">Promoción 1: Descuento en Alfajores</h5>
                <p className="card-text">Compra 6 alfajores y obtén un 10% de descuento en tu compra total.</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={Cafe_y_muffin} className="card-img-top" alt="Promoción 2" />
              <div className="card-body">
                <h5 className="card-title">Promoción 2: Combo Café y Queque</h5>
                <p className="card-text">Disfruta de un café y un queque por solo $3.000 (precio regular $4.000).</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inicio;
