import React , { useState } from "react";
import "./ForgotPassword.css"
import showToastAlert from "../../utils/showToastAlert";
import Button from "../../components/Button/Button";

const ForgotPassword = () => {
 // Estados para controlar el campo y el error
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

// Función de validación simple
  const validateEmail = (value: string) => {
    // Regex simple para asegurar el formato básico de un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return "Ingrese un correo electrónico válido.";
    }
    return ""; // Retorna cadena vacía si no hay error
  };

// Captura y actualiza el estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Limpia el error mientras el usuario escribe
    if (error) {
        // Validación ligera en tiempo real para feedback inmediato
        setError(validateEmail(newEmail));
    }
  };

// Manejador de envio: Procesa el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Detiene la recarga de la página

    // Validar el campo antes de intentar el envío
    const validationError = validateEmail(email);
    
    if (validationError) {
      setError(validationError);
      showToastAlert("Ingresa un correo electrónico válido.", "error", false, false);
      return; // Detiene la ejecución si hay error
    }

    // **LÓGICA DE RECUPERACIÓN (SIMULACIÓN)**
    // Aquí se haría la llamada a la API de tu servidor
    console.log(`Solicitando recuperación para: ${email}`);
    
    // Simulamos el éxito y mostramos feedback
    showToastAlert(`Enlace enviado a ${email}. Revisa tu bandeja.`, "success", false, false);
    
    // limpiar el campo después de un envío exitoso
    setEmail('');
    setError('');
  };

  return (
    <div className="container">
      <div className="forgot-container">
        <h2 className="forgot-title">Recuperar contraseña</h2>
        <hr />

        <form id="forgotPasswordForm" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="recoveryEmail" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className={`form-control ${error ? "is-invalid" : ""}`} // Clase dinámica para error
              id="recoveryEmail"
              name="email"
              placeholder="nombre@dominio.com"
              required
              autoComplete="off"
              value={email} // Valor enlazado al estado
              onChange={handleChange} // Manejador de cambios
            />

            {/* Mostrar mensaje de error dinámicamente */}
            <div className="invalid-feedback">
                {error || "Ingrese un correo electrónico válido."} 
            </div>

          </div>

        <Button
            id="BtnSendMessageRecover"
            text="Enviar enlace de recuperación"
            type="submit" // Mantiene la funcionalidad de envío del formulario
            className="btn"
            // El onClick no es estrictamente necesario aquí porque el form tiene onSubmit={handleSubmit}
          />



        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;