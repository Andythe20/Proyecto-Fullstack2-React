import { useState, useCallback } from "react";
import {
  passwordValidator,
  type PasswordValidationResult,
} from "../utils/passwordValidator";
import { rutValidator } from "../utils/rutValidator";
import { emailValidator } from "../utils/emailValidator";

interface FormValues {
  nombres: string;
  apellidos: string;
  rut: string;
  fechaNacimiento: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
}

interface FormErrors {
  nombres: string;
  apellidos: string;
  rut: string;
  fechaNacimiento: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
}

const initialValues: FormValues = {
  nombres: "",
  apellidos: "",
  rut: "",
  fechaNacimiento: "",
  correo: "",
  contraseña: "",
  confirmarContraseña: "",
};

const initialErrors: FormErrors = {
  nombres: "",
  apellidos: "",
  rut: "",
  fechaNacimiento: "",
  correo: "",
  contraseña: "",
  confirmarContraseña: "",
};

export const useRegisterForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);

  // Mapear IDs del formulario a los nombres del estado
  const fieldMap: { [key: string]: keyof FormValues } = {
    firstName: "nombres",
    lastName: "apellidos",
    rut: "rut",
    birthDate: "fechaNacimiento",
    email: "correo",
    password: "contraseña",
    confirmPassword: "confirmarContraseña",
  };

  /**
   * Valida un campo individual y actualiza el estado de errores
   * También actualiza passwordValidation en vivo para el indicador
   */
  const validateField = useCallback(
    (field: keyof FormValues, value: string) => {
      let error = "";

      if (field === "nombres" && value.trim().length < 3) {
        error = "El nombre debe tener al menos 3 carácteres";
      }

      if (field === "apellidos" && value.trim().length < 3) {
        error = "El apellido debe tener al menos 3 carácteres";
      }

      if (field === "rut") {
        if (!rutValidator.validateRut(value)) {
          error = "Rut no válido";
        }
      }

      if (field === "correo") {
        if (value && !emailValidator.validateEmail(value.trim())) {
          error = "Ingrese un correo válido (ej: example@gmail.com).";
        }
      }

      if (field === "contraseña") {
        const result = passwordValidator.validatePassword(value);
        setPasswordValidation(result);
        // No establecemos error aquí, el indicador visual lo maneja
      }

      if (field === "confirmarContraseña") {
        if (value && value !== values.contraseña) {
          error = "Las contraseñas no coinciden";
        }
      }

      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [values.contraseña]
  );

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      const { id, value, checked } = target;

      if (id === "terms") {
        setTermsAccepted(checked);
        setTermsError(
          checked ? "" : "Debes aceptar los términos y condiciones"
        );
        return;
      }

      const fieldName = fieldMap[id] || (id as keyof FormValues);

      setValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      validateField(fieldName, value);
    },
    [fieldMap, validateField]
  );

  /**
   * Valida el formulario completo antes del envío
   */
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validar nombres
    if (values.nombres.trim().length < 3) {
      newErrors.nombres = "El nombre debe tener al menos 3 carácteres";
      isValid = false;
    }

    // Validar apellidos
    if (values.apellidos.trim().length < 3) {
      newErrors.apellidos = "El apellido debe tener al menos 3 carácteres";
      isValid = false;
    }

    // Validar RUT
    if (!rutValidator.validateRut(values.rut)) {
      newErrors.rut = "Rut no válido";
      isValid = false;
    }

    // Validar fecha de nacimiento
    if (!values.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      isValid = false;
    }

    // Validar correo
    if (values.correo) {
      if (!emailValidator.validateEmail(values.correo.trim())) {
        newErrors.correo = "Ingrese un correo válido (ej: example@gmail.com).";
        isValid = false;
      }
    } else {
      newErrors.correo = "El correo es requerido";
      isValid = false;
    }

    // Validar contraseña
    if (values.contraseña) {
      const result = passwordValidator.validatePassword(values.contraseña);
      if (!result.meetsMinimum) {
        newErrors.contraseña =
          "La contraseña no cumple con los requisitos mínimos";
        isValid = false;
      }
    } else {
      newErrors.contraseña = "La contraseña es requerida";
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (values.confirmarContraseña !== values.contraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden";
      isValid = false;
    }

    // Validar términos
    if (!termsAccepted) {
      setTermsError("Debes aceptar los términos y condiciones");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [values, termsAccepted]);

  /**
   * Resetea el formulario a su estado inicial
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTermsAccepted(false);
    setTermsError("");
    setPasswordValidation(null);
  }, []);

  return {
    values,
    errors,
    termsAccepted,
    termsError,
    passwordValidation,
    handleChange,
    validateForm,
    resetForm,
    setTermsError,
    setErrors,
  };
};
