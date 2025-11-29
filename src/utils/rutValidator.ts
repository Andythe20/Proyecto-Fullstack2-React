class RutValidator {
  public validateRut(rutCompleto: string) {
    // 1. Elimina puntos y guiones, y convierte a mayúsculas
    rutCompleto = rutCompleto.replace(/\./g, "").replace("-", "").toUpperCase();

    // 2. Verifica el formato: 7 u 8 dígitos seguidos de un dígito verificador (número o K)
    if (!/^\d{7,8}[0-9K]$/.test(rutCompleto)) return false;

    // 3. Separa el RUT en la parte numérica y el dígito verificador
    const rut = rutCompleto.slice(0, -1); // Todos menos el último carácter
    const dv = rutCompleto.slice(-1); // Último carácter (dígito verificador)

    // 4. Calcula el dígito verificador esperado usando el algoritmo oficial
    let suma = 0,
      multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = (11 - (suma % 11)).toString();
    dvEsperado =
      dvEsperado === "11" ? "0" : dvEsperado === "10" ? "K" : dvEsperado;

    // 5. Compara el dígito verificador ingresado con el calculado
    return dv === dvEsperado;
  }
}

export const rutValidator = new RutValidator();
