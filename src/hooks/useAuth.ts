import { useContext } from "react";
import { AuthContext } from "../context/AuthContextJWT"; // Acá se llama al nuevo useContext

export const useAuth = () => useContext(AuthContext);
