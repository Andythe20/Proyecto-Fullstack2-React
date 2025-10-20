import Swal, { type SweetAlertOptions, type SweetAlertIcon } from "sweetalert2";

/**
 * Muestra un toast o alerta en pantalla usando SweetAlert2.
 *
 * @param message - Mensaje a mostrar.
 * @param icon - Tipo de icono a mostrar. Valores: `"success" | "error" | "warning" | "info" | "question"`. Por defecto `"success"`.
 * @param timerProgressBar - Determina si se muestra la barra de progreso del temporizador. Por defecto `true`.
 * @param isToast - Determina si se muestra como toast (true) o alerta modal (false). Por defecto `true`.
 *
 * @example
 * showToastAlert("¡Producto agregado al carrito!");
 * showToastAlert("No se pudo agregar el producto", "error", false, true);
 * showToastAlert("Este producto está agotado", "info", true, false);
 */
const showToastAlert = (
  message: string,
  icon: SweetAlertIcon = "success",
  timerProgressBar: boolean = true,
  isToast: boolean = true
): void => {
  const options: SweetAlertOptions = {
    title: message,
    icon,
    toast: isToast,
    position: isToast ? "top-start" : "center",
    showConfirmButton: !isToast, // Si es toast, no mostrar botón de confirmación
    timer: isToast ? 1800 : undefined, // Solo los toasts tienen temporizador
    timerProgressBar: isToast ? timerProgressBar : undefined,
    customClass: {
      title: "swal-title-custom",
      htmlContainer: "swal-text-custom",
      confirmButton: "swal-btn-custom",
    },
    didOpen: (toastElement) => {
      toastElement.addEventListener("click", (e) => e.stopPropagation());
    },
    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
  };

  Swal.fire(options);
};

export default showToastAlert;
