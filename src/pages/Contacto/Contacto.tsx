/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";
import "./Contacto.css";

function Contacto() {
  // Estado para los valores de los campos
  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  // Validar un solo campo en tiempo real
  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "nombre" && value.trim().length < 3) {
      error = "El nombre debe tener al menos 3 carácteres";
    }
    if (field === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "yahoo.com",
        "outlook.com",
        "icloud.com",
        "protonmail.com",
        "mailbox.org",
        "zoho.com",
        "hubspot.com",
        "tutanota.com",
        "posteo.net",
        "thexyz.com",
      ];
      if (!emailRegex.test(value.trim())) {
        error = "Ingrese un correo válido (ej: example@gmail.com).";
      } else {
        const dominio = value.trim().split("@")[1].toLowerCase();
        if (!allowedDomains.includes(dominio)) {
          error = "El dominio del correo no es válido.";
        }
      }
    }
    if (field === "mensaje") {
      if (value.trim().length < 10) {
        error = "El mensaje debe tener más de 10 carácteres.";
      } else if (value.trim().length > 50) {
        error = "El mensaje debe tener menos de 50 carácteres.";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Maneja el cambio de cualquier campo y valida en tiempo real
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // evento ChangeEvent que genera React cuando detecta un cambio
  ) => {
    const { id, value } = e.target; // destructura el id y value del campo que genero el evento

    setValues((prev) => ({
      // prev es el estado anterior
      ...prev,
      [id]: value, // actualiza el campo que genero el evento
    }));

    //validar en tiempo real
    validateField(id, value);
  };

  // Validación completa al enviar
  const validate = () => {
    let valid = true;
    let newErrors = { nombre: "", correo: "", mensaje: "" };

    if (values.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 carácteres";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = [
      "gmail.com",
      "hotmail.com",
      "yahoo.com",
      "outlook.com",
      "icloud.com",
      "protonmail.com",
      "mailbox.org",
      "zoho.com",
      "hubspot.com",
      "tutanota.com",
      "posteo.net",
      "thexyz.com",
    ];

    if (!emailRegex.test(values.correo.trim())) {
      newErrors.correo = "Ingrese un correo válido (ej: example@gmail.com).";
      valid = false;
    } else {
      const dominio = values.correo.trim().split("@")[1];
      if (!allowedDomains.includes(dominio)) {
        newErrors.correo = "El dominio del correo no es válido.";
        valid = false;
      }
    }

    if (values.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener más de 10 carácteres.";
      valid = false;
    } else if (values.mensaje.trim().length > 50) {
      newErrors.mensaje = "El mensaje debe tener menos de 50 carácteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        title: "¡Formulario enviado!",
        text: "Tu mensaje fue enviado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      // limpiar los campos
      setValues({ nombre: "", correo: "", mensaje: "" });
      setErrors({ nombre: "", correo: "", mensaje: "" });
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor corrige los errores en el formulario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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
        <form
          className="mx-2"
          id="contactForm"
          onSubmit={handleSubmit}
          noValidate
        >
          <Field
            className="row mb-3"
            title="Nombre"
            id="nombre"
            type="text"
            txt="Tu nombre"
            required
            value={values.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />

          <Field
            className="row mb-3"
            title="Correo Electrónico"
            id="correo"
            type="email"
            txt="Tu correo electrónico"
            required
            value={values.correo}
            onChange={handleChange}
            error={errors.correo}
          />

          <Field
            className="row mb-3"
            title="Mensaje"
            id="mensaje"
            type="text"
            as="textarea"
            txt="Escribe tu mensaje"
            required
            value={values.mensaje}
            onChange={handleChange}
            error={errors.mensaje}
          />
          <div className="row pt-4 mb-3">
            <Button text="Enviar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
