import "./Register.css";

const Register = () => {
  return (
    <div className="container">
      <div className="register-container">
        <h2 className="register-title">Crear Cuenta</h2>
        <hr />

        <form
          id="registerForm"
          className="needs-validation"
          noValidate
          // action y method ya no se usan en React, se maneja con estado y submit handler
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                minLength={1}
                maxLength={30}
                placeholder="Ingrese su nombre"
                required
              />
              <div className="invalid-feedback">Ingrese su nombre.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                minLength={1}
                maxLength={30}
                placeholder="Ingresa tus apellidos"
                required
              />
              <div className="invalid-feedback">Ingrese sus apellidos.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="rut" className="form-label">
                RUT (sin puntos ni guión)
              </label>
              <input
                type="text"
                className="form-control"
                id="rut"
                placeholder="12345678K"
                minLength={9}
                maxLength={10}
                required
              />
              <div className="form-text">Ejemplo: 12345678K</div>
              <div className="invalid-feedback">Ingrese un RUT válido.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="birthDate" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                placeholder="mm/dd/yyyy"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="nombre@dominio.com"
              required
              autoComplete="new-password"
              minLength={3}
              maxLength={30}
            />
            <div className="invalid-feedback">
              Ingrese un correo electrónico válido.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="new-password"
              required
              autoComplete="new-password"
              minLength={1}
              maxLength={30}
              placeholder="Contraseña"
            />
            <div className="form-text">
              Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y números
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirm-password"
              required
              autoComplete="new-password"
              minLength={1}
              maxLength={30}
              placeholder="Confirma tu contraseña"
            />
            <span id="passwordMatch" className="password-match">
              ✓ Las contraseñas coinciden
            </span>
            <span id="passwordMismatch" className="password-mismatch">
              ✗ Las contraseñas no coinciden
            </span>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label" htmlFor="terms">
              Acepto los términos y condiciones
            </label>
          </div>

          <button type="submit" className="btn w-100">
            Registrarse
          </button>

          <div className="text-center mt-3">
            <p>
              ¿Ya tienes una cuenta? <a href="../login/login.html">Inicia sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;