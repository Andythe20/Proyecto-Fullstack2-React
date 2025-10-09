/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";
import "./Contacto.css";

function Contacto() {
  const setOk = (element: HTMLElement) => {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  };

  const setErrorElement = (element: HTMLElement, msg: string) => {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");

    const fb = element.parentElement?.querySelector(".invalid-feedback");

    if (fb && msg) fb.textContent = msg;
  };

  const validateName = () => {
    const nombre = document.getElementById("nombre") as HTMLInputElement | null;
    if (!nombre) return false;
    const name = nombre.value.trim();
    if (name.length < 3) {
      setErrorElement(nombre, "El nombre debe tener al menos 3 carácteres");
      return false;
    }
    setOk(nombre);
    return true;
  };

  const validateEmail = () => {
    const correo = document.getElementById("correo") as HTMLInputElement | null;
    if (!correo) return false;
    const allowedDomains = [
      "gmail.com",
      "hotmail.com",
      "yahoo.com",
      "outlook.com",
      "icloud.com",
    ];
    const emailTrimed = correo.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimed)) {
      setErrorElement(
        correo,
        "Ingrese un correo válido (ej: example@gmail.com)."
      );
      return false;
    }

    const dominio = emailTrimed.split("@")[1];
    if (!allowedDomains.includes(dominio)) {
      setErrorElement(correo, "El dominio del correo no es válido.");
      return false;
    }
    setOk(correo);
    return true;
  };

  const validateMessage = () => {
    const mensaje = document.getElementById(
      "mensaje"
    ) as HTMLTextAreaElement | null;
    if (!mensaje) return false;

    const v = mensaje.value.trim();

    if (v.length < 10) {
      setErrorElement(mensaje, "El mensaje debe tener más de 10 carácteres.");
      return false;
    }

    if (v.length > 50) {
      setErrorElement(mensaje, "El mensaje debe tener menos de 50 carácteres.");
      return false;
    }

    setOk(mensaje);
    return true;
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center py-5"
      style={{ minHeight: "auto", maxHeight: "900px" }}
      id="formulario-contacto"
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-4 rounded shadow">
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
          <Field
            className="row mb-3"
            htmlFor="nombre"
            title="Nombre"
            id="nombre"
            type="text"
            txt="Tu nombre"
            required
            onBlurFunction={validateName}
          />

          <Field
            className="row mb-3"
            htmlFor="correo"
            title="Correo Electrónico"
            id="correo"
            type="email"
            txt="Tu correo electrónico"
            required
            onBlurFunction={validateEmail}
          />

          <Field
            className="row mb-3"
            htmlFor="mensaje"
            title="Correo Electrónico"
            id="mensaje"
            type="email"
            as="textarea"
            txt="Escribe tu mensaje"
            required
            onBlurFunction={validateMessage}
          />
          <div className="row pt-4 mb-3">
            <Button text="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
