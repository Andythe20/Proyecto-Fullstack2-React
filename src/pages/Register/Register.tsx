import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Field/Field";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import { useAuth } from "../../hooks/useAuth";
import { useRegisterForm } from "../../hooks/useRegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    values,
    errors,
    termsAccepted,
    termsError,
    passwordValidation,
    handleChange,
    validateForm,
    resetForm,
    setTermsError,
  } = useRegisterForm();

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
        email: values.correo,
        contrasenna: values.contraseña,
        userRole: "user",
      };

      // Guardar en Local Storage
      localStorage.setItem("user", JSON.stringify(user));

      // Loguear automáticamente
      login(user.email, user.contrasenna);

      // Resetear formulario
      resetForm();

      // Redirigir al home
      navigate("/");
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

          <PasswordStrength passwordValidation={passwordValidation} />

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
