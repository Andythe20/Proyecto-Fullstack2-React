import Swal from "sweetalert2";

/**
 * Simula un proceso de pago con SweetAlert2.
 * @param onSuccess Callback opcional para ejecutar tras el pago exitoso.
 */
export const handleCheckout = async (onSuccess?: () => void) => {
  const exitoPago = Math.random() < 0.4; // 40% de éxito

  //let timerInterval: number | undefined;

  await Swal.fire({
    title: "Procesando pago...",
    html: "Espere un momento...",
    customClass: {
      title: "swal-title-custom",
      htmlContainer: "swal-text-custom",
      confirmButton: "swal-btn-custom",
    },
    timer: 1800,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    // Esto hace que NO se pueda cerrar con click fuera ni con Esc
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });

  if (!exitoPago) {
    await Swal.fire({
      icon: "error",
      title: "Error en el pago",
      customClass: {
        title: "swal-title-custom",
        htmlContainer: "swal-text-custom",
        confirmButton: "swal-btn-custom",
      },
      text: "Hubo un problema al procesar su pago. Por favor, intente nuevamente.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#8B4513",
    });
    return;
  }

  await Swal.fire({
    icon: "success",
    title: "¡Pago exitoso!",
    text: "Gracias por su compra.",
    customClass: {
      title: "swal-title-custom",
      htmlContainer: "swal-text-custom",
      confirmButton: "swal-btn-custom",
    },
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#8B4513",
  });

  // Vacía el carrito
  localStorage.removeItem("carrito");

  if (onSuccess) {
    onSuccess(); // Por ejemplo, limpiar el estado React del carrito
  } else {
    location.reload();
  }
};
