import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import OnlyFlans_logo from "../../assets/Imagenes/OnlyFlans_logo.png";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/user";

type StoredUser = {
  email?: string;
  correo?: string;
  password?: string;
  contrasenna?: string;
  [key: string]: unknown;
};

const Login = () => {
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    const newErrors = { email: "", password: "" };
    if (!values.email) newErrors.email = "El correo es requerido";
    if (!values.password) newErrors.password = "La contraseña es requerida";
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    // Intentar leer usuario desde las posibles claves en localStorage
    const rawUser =
      localStorage.getItem("user") ?? localStorage.getItem("registeredUser");
    if (!rawUser) {
      setErrors({
        email: "No hay usuario registrado",
        password: "",
      });
      return;
    }

    // Intentar parsear JSON; si falla, intentar claves individuales
    let storedUser: StoredUser | null = null;
    try {
      storedUser = JSON.parse(rawUser) as StoredUser;
    } catch {
      // Fallback: claves separadas en localStorage (legacy)
      const storedEmail =
        localStorage.getItem("email") ?? localStorage.getItem("correo");
      const storedPassword =
        localStorage.getItem("password") ?? localStorage.getItem("contrasenna");
      if (!storedEmail || !storedPassword) {
        setErrors({
          email: "No hay usuario registrado",
          password: "",
        });
        return;
      }
      if (
        values.email.trim().toLowerCase() ===
          storedEmail.trim().toLowerCase() &&
        values.password === storedPassword
      ) {
        const userObj: User = {
          // Ajusta campos según src/types/user si difieren
          nombres: "",
          apellidos: "",
          rut: "",
          fechaNacimiento: "",
          email: storedEmail,
          password: storedPassword,
        };
        login(userObj);
        navigate("/");
        return;
      } else {
        setErrors({
          email: "Correo o contraseña incorrectos",
          password: "Correo o contraseña incorrectos",
        });
        return;
      }
    }

    // Si parseó correctamente, comparar campos posibles
    const storedEmail = storedUser?.email ?? storedUser?.correo ?? "";
    const storedPassword =
      storedUser?.password ??
      storedUser?.contrasenna ??
      storedUser?.contrasena ??
      "";

    if (
      values.email.trim().toLowerCase() ===
        String(storedEmail).trim().toLowerCase() &&
      values.password === String(storedPassword)
    ) {
      // extraer storedUser de forma segura como un record genérico
      const su = (storedUser ?? {}) as Record<string, unknown>;
      const getString = (v: unknown) =>
        typeof v === "string" ? v : v == null ? "" : String(v);

      const userObj: User = {
        nombres: getString(su["nombres"] ?? su["firstName"]),
        apellidos: getString(su["apellidos"] ?? su["lastName"]),
        rut: getString(su["rut"]),
        fechaNacimiento: getString(su["fechaNacimiento"] ?? su["birthDate"]),
        email: String(storedEmail),
        password: String(storedPassword),
      };

      login(userObj);
      navigate("/");
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
            style={{ maxWidth: "200px", maxHeight: "200px" }}
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
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
