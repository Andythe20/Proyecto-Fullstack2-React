import Input from "../components/Input/Input";

const Login = () => {
  return (
    <div className="container" style={{ marginTop: "-70px" }}>
      <div className="login-container">
        <div className="rounded p-2 d-flex justify-content-center">
          <img
            src="../assets/img/OnlyFlans_logo.png"
            className="img-fluid rounded-5 shadow"
            style={{ maxWidth: "200px; max-height: 200px" }}
          />
        </div>

        <hr />
        <h1 className="login-title py-4">Iniciar Sesión</h1>

        <form className="needs-validation" noValidate>
          <Input
            id="email"
            htmlFor="email"
            type="email"
            className="mb-3"
            title="Correo Electrónico"
            txt="nombre@dominio.com"
            required
          />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="nombre@dominio.com"
              required
              autoComplete="off"
            />
            <div className="invalid-feedback">
              Correo Electrónico es obligatorio.
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
              required
              autoComplete="off"
              placeholder="Contraseña"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <div className="invalid-feedback">Contraseña es obligatoria.</div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Recordarme
            </label>
          </div>
          <button type="submit" className="btn btnBrown w-100" id="login">
            Ingresar
          </button>
          <div className="text-center mt-3">
            <a href="../forgotPassword/forgotPassword.html">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="text-center mt-3">
            <p>
              ¿No tienes cuenta?
              <a href="../register/register.html">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
