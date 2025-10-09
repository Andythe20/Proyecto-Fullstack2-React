/**
 * Formatea un número a una cadena de moneda según la configuración regional y el tipo de moneda.
 *
 * @param amount - La cantidad a formatear.
 * @param locale - (Opcional) El código de idioma y región (locale) que determina el formato. Ej: "es-CL", "en-US".
 * @param currency - (Opcional) El código de la moneda a utilizar. Ej: "CLP", "USD", "EUR".
 * @returns La cantidad formateada como cadena de moneda según la configuración especificada.
 *
 * @example
 * formatCurrency(45000); // "$45.000"
 * formatCurrency(1000, "en-US", "USD"); // "$1,000"
 * formatCurrency(500, "ja-JP", "JPY"); // "￥500"
 */
function formatCurrency(
  amount: number,
  locale: string = "es-CL",
  currency: string = "CLP"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export default formatCurrency;
