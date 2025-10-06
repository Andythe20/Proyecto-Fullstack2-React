import Swal from "sweetalert2";

/**
 * Muestra un toast en pantalla usando SweetAlert2.
 *
 * @param {string} message - Mensaje a mostrar en el toast.
 * @param {string} [icon="success"] - Tipo de icono que se mostrará. 
 *    Puede ser: "success", "error", "warning", "info" o "question".
 * @param {boolean} [timerProgressBar=true] - Determina si se muestra la barra de progreso del temporizador.
 *
 * @returns {void}
 *
 * @example
 * // Mostrar un toast de éxito por defecto
 * showToastAlert("¡Producto agregado al carrito!");
 *
 * @example
 * // Mostrar un toast de error sin barra de progreso
 * showToastAlert("No se pudo agregar el producto", "error", false);
 *
 * @example
 * // Mostrar un toast de advertencia
 * showToastAlert("Cuidado con esta acción", "warning");
 */
const showToastAlert = (message, icon = "success", timerProgressBar = true) => {
    Swal.fire({
      position: "top-start",
      icon, // 'success' por defecto, 'error', 'warning', 'info', 'question'
      title: message,
      // Prevents the click event from propagating to elements behind the toast
      didOpen: (toast) => {
        toast.addEventListener("click", (e) => e.stopPropagation());
      },
      customClass: {
        title: "swal-title-custom",
        content: "swal-text-custom",
      },
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar, // true por defecto
      toast: true,
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
    });
  };

  export default showToastAlert;