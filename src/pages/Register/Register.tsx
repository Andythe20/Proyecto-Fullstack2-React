import { useState } from "react";
import "./Register.css";
import {
  passwordValidator,
  type PasswordValidationResult,
} from "./passwordValidator";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Field/Field";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estado para los valores de los campos
  const [values, setValues] = useState({
    nombres: "",
    apellidos: "",
    rut: "",
    fechaNacimiento: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({
    nombres: "",
    apellidos: "",
    rut: "",
    fechaNacimiento: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  // Estado para el checkbox de términos
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  // Estado para la validación de contraseña
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);

  // validar rut
  const validateRut = (rutCompleto: string) => {
    // 1. Elimina puntos y guiones, y convierte a mayúsculas
    rutCompleto = rutCompleto
      .replace(/\./g, "")
      .replace(/-/g, "")
      .toUpperCase();

    // 2. Verifica el formato: 7 u 8 dígitos seguidos de un dígito verificador (número o K)
    if (!/^\d{7,8}[0-9K]$/.test(rutCompleto)) return false;

    // 3. Separa el RUT en la parte numérica y el dígito verificador
    const rut = rutCompleto.slice(0, -1); // Todos menos el último carácter
    const dv = rutCompleto.slice(-1); // Último carácter (dígito verificador)

    // 4. Calcula el dígito verificador esperado usando el algoritmo oficial
    let suma = 0,
      multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = (11 - (suma % 11)).toString();
    dvEsperado =
      dvEsperado === "11" ? "0" : dvEsperado === "10" ? "K" : dvEsperado;

    // 5. Compara el dígito verificador ingresado con el calculado
    return dv === dvEsperado;
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    if (field === "nombres" && value.trim().length < 3) {
      error = "El nombre debe tener al menos 3 carácteres";
    }

    if (field === "apellidos" && value.trim().length < 3) {
      error = "El apellido debe tener al menos 3 carácteres";
    }

    if (field === "rut" && !validateRut(value)) {
      error = "Rut no válido";
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

    if (field === "contraseña") {
      const result = passwordValidator.validatePassword(value);
      setPasswordValidation(result);

      // Actualizar errores
      error = result.feedback.length > 0 ? result.feedback.join(" ") : "";
    }

    if (field === "confirmarContraseña" && value !== values.contraseña) {
      error = "Las contraseñas no coinciden";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // usar un target como HTMLInputElement para acceder a checked cuando sea checkbox
    const target = e.target as HTMLInputElement;
    const { id, value, checked } = target;

    if (id === "terms") {
      setTermsAccepted(checked);
      setTermsError(checked ? "" : "Debes aceptar los términos y condiciones");
      return;
    }

    // Mapear IDs del formulario a los nombres del estado
    const fieldMap: { [key: string]: string } = {
      firstName: "nombres",
      lastName: "apellidos",
      rut: "rut",
      birthDate: "fechaNacimiento",
      email: "correo",
      password: "contraseña",
      confirmPassword: "confirmarContraseña",
    };

    const fieldName = fieldMap[id] || id;

    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    validateField(fieldName, value);
  };

  // Función para validar todo el formulario antes del envío
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validar cada campo
    if (values.nombres.trim().length < 3) {
      newErrors.nombres = "El nombre debe tener al menos 3 carácteres";
      isValid = false;
    }

    if (values.apellidos.trim().length < 3) {
      newErrors.apellidos = "El apellido debe tener al menos 3 carácteres";
      isValid = false;
    }

    if (!validateRut(values.rut)) {
      newErrors.rut = "Rut no válido";
      isValid = false;
    }

    if (!values.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      isValid = false;
    }

    // Validar correo
    if (values.correo) {
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
        isValid = false;
      } else {
        const dominio = values.correo.trim().split("@")[1].toLowerCase();
        if (!allowedDomains.includes(dominio)) {
          newErrors.correo = "El dominio del correo no es válido.";
          isValid = false;
        }
      }
    } else {
      newErrors.correo = "El correo es requerido";
      isValid = false;
    }

    // Validar contraseña
    if (values.contraseña) {
      const result = passwordValidator.validatePassword(values.contraseña);
      if (!result.meetsMinimum) {
        newErrors.contraseña =
          "La contraseña no cumple con los requisitos mínimos";
        isValid = false;
      }
    } else {
      newErrors.contraseña = "La contraseña es requerida";
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (values.confirmarContraseña !== values.contraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden";
      isValid = false;
    }

    // Validar términos
    if (!termsAccepted) {
      setTermsError("Debes aceptar los términos y condiciones");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError("");

    if (validateForm()) {
      // Construir objeto usuario para guardar
      const user = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        rut: values.rut,
        fechaNacimiento: values.fechaNacimiento,
        // propiedades esperadas por el tipo User
        correo: values.correo,
        contrasenna: values.contraseña,
        // mantener también las claves originales si se usan en otros lugares/localStorage
        email: values.correo,
        password: values.contraseña,
      };

      // Guardar en Local Storage
      localStorage.setItem("user", JSON.stringify(user));

      // Loguear automáticamente
      login(user);

      // Redirigir al home o donde prefieras
      navigate("/");

      // Limpiar si quieres
      setValues({
        nombres: "",
        apellidos: "",
        rut: "",
        fechaNacimiento: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
      });
      setPasswordValidation(null);
      setTermsAccepted(false);
    } else {
      // Aquí podrías mostrar un toast más adelante
    }
  };

  const getStrengthColor = () => {
    if (!passwordValidation) return "#d9d9d9";

    switch (passwordValidation.strength) {
      case "Muy Fuerte":
        return "#52c41a";
      case "Fuerte":
        return "#73d13d";
      case "Regular":
        return "#faad14";
      case "Débil":
        return "#ffa940";
      case "Muy Débil":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <h2 className="register-title">Crear Cuenta</h2>
        <hr />

        <form
          id="registerForm"
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
          // action y method ya no se usan en React, se maneja con estado y submit handler
        >
          <div className="row">
            <Field
              className="col-md-6 mb-3"
              titleText="Nombres"
              id="firstName"
              type="text"
              placeholder="Ingrese sus nombres"
              required
              value={values.nombres}
              onChange={handleChange}
              error={errors.nombres}
            />

            <Field
              className="col-md-6 mb-3"
              titleText="Apellidos"
              id="lastName"
              type="text"
              placeholder="Ingrese sus apellidos"
              required
              value={values.apellidos}
              onChange={handleChange}
              error={errors.apellidos}
            />

            <Field
              className="col-md-6 mb-3"
              titleText="Rut (sin puntos ni guión)"
              id="rut"
              type="text"
              placeholder="12345678K"
              required
              value={values.rut}
              onChange={handleChange}
              error={errors.rut}
            />

            <Field
              className="col-md-6 mb-3"
              titleText="Fecha de Nacimiento"
              id="birthDate"
              type="date"
              required
              value={values.fechaNacimiento}
              onChange={handleChange}
              error={errors.fechaNacimiento}
            />
          </div>

          <Field
            className="mb-3"
            titleText="Correo Electrónico"
            id="email"
            type="email"
            placeholder="nombre@dominio.com"
            required
            value={values.correo}
            onChange={handleChange}
            error={errors.correo}
          />

          <Field
            className="mb-3"
            titleText="Contraseña"
            id="password"
            type="password"
            placeholder="Contraseña"
            required
            value={values.contraseña}
            onChange={handleChange}
            error={errors.contraseña}
          />

          {passwordValidation && (
            <div className="password-feedback mt-2">
              <div
                className="strength-bar-container"
                style={{
                  height: "4px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "2px",
                  marginBottom: "8px",
                }}
              >
                <div
                  className="strength-bar"
                  style={{
                    width: `${passwordValidation.score}%`,
                    height: "100%",
                    backgroundColor: getStrengthColor(),
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <p className="strength-text small mb-1">
                Fuerza: <strong>{passwordValidation.strength}</strong>
              </p>
              {passwordValidation.feedback.length > 0 && (
                <ul className="feedback-list small text-muted mb-0">
                  {passwordValidation.feedback.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Field
            className="mb-3"
            titleText="Confirmar Contraseña"
            id="confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
            required
            value={values.confirmarContraseña}
            onChange={handleChange}
            error={errors.confirmarContraseña}
          />

          {values.confirmarContraseña &&
            values.contraseña === values.confirmarContraseña &&
            !errors.confirmarContraseña && (
              <div className="valid-feedback">✓ Las contraseñas coinciden</div>
            )}

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${termsError ? "is-invalid" : ""}`}
              id="terms"
              checked={termsAccepted}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="terms">
              Acepto los términos y condiciones
            </label>
            {termsError && (
              <div className="invalid-feedback d-block">{termsError}</div>
            )}
          </div>

          <button type="submit" className="btn w-100">
            Registrarse
          </button>

          <div className="text-center mt-3">
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
