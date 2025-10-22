import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import OnlyFlans_logo from "../../assets/Imagenes/OnlyFlans_logo.png";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import { useState } from "react";

const Login = () => {
  // Estado para los valores de los campos
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Maneja cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Maneja envío del formulario y valida contra Local Storage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones simples de presencia
    const newErrors = { email: "", password: "" };

    if (!values.email) newErrors.email = "El correo es requerido";
    if (!values.password) newErrors.password = "La contraseña es requerida";
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    // Intentar leer credenciales del Local Storage
    let storedEmail: string | null = null;
    let storedPassword: string | null = null;

    const rawUser = localStorage.getItem("user"); // posible almacenamiento como objeto JSON
    if (rawUser) {
      try {
        const userObj = JSON.parse(rawUser);
        storedEmail = userObj.email ?? null;
        storedPassword = userObj.password ?? null;
      } catch {
        // si no es JSON, ignorar
      }
    }

    // Si no vino como objeto, buscar claves individuales
    if (!storedEmail) storedEmail = localStorage.getItem("email");
    if (!storedPassword) storedPassword = localStorage.getItem("password");

    if (!storedEmail || !storedPassword) {
      setErrors({
        email: "No hay usuario registrado en Local Storage",
        password: "",
      });
      return;
    }

    // Comparar credenciales
    if (
      values.email.trim().toLowerCase() === storedEmail.trim().toLowerCase() &&
      values.password === storedPassword
    ) {
      // Login exitoso: marcar sesión y redirigir
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // ajustar ruta de destino según tu app
    } else {
      setErrors({
        email: "Correo o contraseña incorrectos",
        password: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <div className="container" style={{ marginTop: "-70px" }}>
      <div className="login-container">
        <div className="rounded p-2 d-flex justify-content-center">
          <img
            src={OnlyFlans_logo}
            className="logo-container img-fluid rounded-5 shadow"
            style={{ maxWidth: "200px;", maxHeight: "200px" }}
          />
        </div>

        <hr />
        <h1 className="login-title py-4">Iniciar Sesión</h1>

        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <Field
            className="mb-3"
            titleText="Correo Electrónico"
            id="email"
            type="email"
            placeholder="nombre@dominio.com"
            required
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Field
            className="mb-3"
            titleText="Contraseña"
            id="password"
            type="password"
            placeholder="Contraseña"
            required
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Recordarme
            </label>
          </div>

          <Button
            id="login-button"
            text="Ingresar"
            className="btn btnBrown w-100"
            type="submit"
          />

          <div className="text-center mt-3">
            <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="text-center mt-3">
            <p>
              ¿No tienes cuenta?
              <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
