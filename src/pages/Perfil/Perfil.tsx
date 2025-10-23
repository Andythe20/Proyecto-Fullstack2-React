import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/user";

const Perfil = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>No hay usuario autenticado</p>;
  }

  const perfil: User = user;

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      <p>
        <strong>Email:</strong> {perfil.email}
      </p>
      <p>
        <strong>Nombres:</strong> {perfil.nombres}
      </p>
      <p>
        <strong>Apellidos:</strong> {perfil.apellidos}
      </p>
      <p>
        <strong>RUT:</strong> {perfil.rut}
      </p>
      <p>
        <strong>Fecha nacimiento:</strong> {perfil.fechaNacimiento}
      </p>
    </div>
  );
};

export default Perfil;
