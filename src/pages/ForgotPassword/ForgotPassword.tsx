import "./ForgotPassword.css"

const ForgotPassword = () => {
  return (
    <div className="container">
      <div className="forgot-container">
        <h2 className="forgot-title">Recuperar contraseña</h2>
        <hr />

        <form id="forgotPasswordForm" className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="recoveryEmail" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="recoveryEmail"
              name="email"
              placeholder="nombre@dominio.com"
              required
              autoComplete="off"
            />
            <div className="invalid-feedback">
              Ingrese un correo electrónico válido.
            </div>
          </div>
          <button type="submit" className="btn" id="BtnSendMessageRecover">
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
