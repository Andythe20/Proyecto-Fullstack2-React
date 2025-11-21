/*
export interface User {
  email: string;
  password?: string;
  nombres?: string;
  apellidos?: string;
  rut?: string;
  fechaNacimiento?: string;
}
  */

export interface User {
  rut: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  email: string;
  contrasenna: string;
}