export function NotFound() {
    return (
    <div className="container text-center py-5">
      <h1>🍮 ¡Ups! Flan no encontrado</h1>
      <p>La página que buscas no existe o el producto no fue encontrado.</p>
      <a href="/" className="btn btnBrown mt-auto fs-5">
        Volver al Inicio
      </a>
    </div>
  );
}