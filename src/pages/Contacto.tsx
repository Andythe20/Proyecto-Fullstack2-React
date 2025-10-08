//import Input from "../../components/Input/Input";
import "./Contacto.css";

function Contacto() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "100vh" }}
      id="formulario-contacto"
    >
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 p-4 rounded shadow mx-auto">
        <h2 className="text-center">Formulario de Contacto</h2>
        <p className="text-center">
          Déjanos tus datos y nos pondremos en contacto
        </p>

        {/* contenedor para alertas */}
        <div id="alerta" className="mb-3"></div>

        <form
          className="mx-2"
          action="#"
          method="post"
          id="contactForm"
          noValidate
        >
          <div
            className="row mb-3"
            style={{ minWidth: "auto", margin: "auto" }}
          >
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              placeholder="Tu nombre"
              required
            />
            <div className="invalid-feedback">
              El nombre debe tener al menos 3 caracteres.
            </div>
          </div>

          <div
            className="row mb-3"
            style={{ minWidth: "auto", margin: "auto" }}
          >
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="form-control"
              placeholder="Tu correo electrónico"
              required
            />
            <div className="invalid-feedback">
              Ingrese un correo válido (ej: example@gmail.com).
            </div>
          </div>

          <div
            className="row mb-3"
            style={{ minWidth: "auto", margin: "auto" }}
          >
            <label htmlFor="mensaje" className="form-label">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              id="mensaje"
              className="form-control"
              rows={5}
              placeholder="Ingrese su mensaje"
              style={{ resize: "none" }}
            ></textarea>
            <div className="invalid-feedback">
              El mensaje debe tener entre 10 y 50 caracteres.
            </div>
          </div>

          <div
            className="row pt-4 mb-3"
            style={{ minWidth: "auto", margin: "auto", textAlign: "center" }}
          >
            <button className="btn" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
