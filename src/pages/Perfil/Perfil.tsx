import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/user";
import { FaUser, FaEnvelope, FaIdCard, FaBirthdayCake, FaShieldAlt } from "react-icons/fa";
import "./Perfil.css"

const Perfil = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>No hay usuario autenticado</p>;
  }

  const perfil: User = user;

  return (
    <div className="perfil-container">
      <div className="container">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
          <p>Información personal de tu cuenta</p>
          {isAdmin && <div className="admin-badge">Administrador</div>}
        </div>

        <div className="perfil-card">
          {/* EMAIL */}
          <div className="perfil-item">
            <div className="perfil-icon">
              <FaEnvelope />
            </div>
            <div className="perfil-content">
              <div className="perfil-label">Correo Electrónico</div>
              <div className="perfil-value">{perfil.email}</div>
            </div>
          </div>

          {/* NOMBRES */}
          <div className="perfil-item">
            <div className="perfil-icon">
              <FaUser />
            </div>
            <div className="perfil-content">
              <div className="perfil-label">Nombres</div>
              <div className="perfil-value">{perfil.nombres}</div>
            </div>
          </div>

          {/* APELLIDOS */}
          <div className="perfil-item">
            <div className="perfil-icon">
              <FaUser />
            </div>
            <div className="perfil-content">
              <div className="perfil-label">Apellidos</div>
              <div className="perfil-value">{perfil.apellidos}</div>
            </div>
          </div>

          {/* RUT */}
          <div className="perfil-item">
            <div className="perfil-icon">
              <FaIdCard />
            </div>
            <div className="perfil-content">
              <div className="perfil-label">RUT</div>
              <div className="perfil-value">{perfil.rut}</div>
            </div>
          </div>

          {/* FECHA NACIMIENTO */}
          <div className="perfil-item">
            <div className="perfil-icon">
              <FaBirthdayCake />
            </div>
            <div className="perfil-content">
              <div className="perfil-label">Fecha de Nacimiento</div>
              <div className="perfil-value">
                {new Date(perfil.fechaNacimiento).toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="perfil-actions">
            {isAdmin && (
              <button
                className="btn-admin"
                onClick={() => navigate("/admin")}
              >
                <FaShieldAlt style={{ marginRight: "8px" }} />
                Panel de Administración
              </button>
            )}
            <button
              className="btn-secondary-action"
              onClick={() => navigate("/")}
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
