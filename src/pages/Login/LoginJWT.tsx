import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import OnlyFlans_logo from "../../assets/Imagenes/OnlyFlans_logo.png";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import { validateEmail } from "../../utils/validateEmail";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !values.email
        ? "El correo es requerido"
        : !validateEmail(values.email)
        ? "El correo no es válido"
        : "",
      password: values.password ? "" : "La contraseña es requerida",
    };

    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    // LLAMA AL BACKEND
    setLoading(true);
    const success = await login(values.email, values.password);
    setLoading(false);

    if (!success) {
      setErrors({
        email: "Credenciales incorrectas",
        password: "Credenciales incorrectas",
      });
      return;
    }

    navigate("/");
  };

  if (loading) {
    return <LoadingSpinner text="Iniciando sesión..." />;
  }

  return (
    <div className="container" style={{ marginTop: "-70px" }}>
      <div className="login-container">
        <div className="rounded p-2 d-flex justify-content-center">
          <img
            src={OnlyFlans_logo}
            className="logo-container img-fluid rounded-5 shadow"
            style={{ maxWidth: "200px" }}
            alt="OnlyFlans logo"
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
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Field
            className="mb-3"
            titleText="Contraseña"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

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
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
