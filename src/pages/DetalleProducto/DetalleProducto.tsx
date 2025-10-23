import { useSearchParams } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import { useCarrito } from "../../hooks/useCarrito";
import Button from "../../components/Button/Button";
import formatCurrency from "../../utils/formatCurrency";
import showToastAlert from "../../utils/showToastAlert";
import "./DetalleProducto.css";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function DetalleProducto() {
  // Obtener código del parámetro de búsqueda
  const [searchParams] = useSearchParams();
  const cod = searchParams.get("cod");

  const { isLoading, getProductoByCode, error } = useProductos();
  const { addProduct } = useCarrito();

  const producto = cod ? getProductoByCode(cod) : null;

  // Manejar el estado de la cantidad
  const CANTIDAD_MIN = 1;
  const CANTIDAD_MAX = 10;
  const [cantidad, setCantidad] = useState(1);
  // Estado para mensaje de error por cantidad inválida
  const [errorCantidad, setErrorCantidad] = useState("");

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!cod) {
    return (
      <main className="container my-5 text-center">
        <h3 className="text-danger">No se proporcionó código de producto.</h3>
      </main>
    );
  }
  if (!producto) {
    return (
      <main className="container my-5 text-center">
        <h3 className="text-danger">No se encontró el producto.</h3>
        <p>
          Por favor, regresa a la página de{" "}
          <a href="/productos" className="text-decoration-none fw-bold">
            productos
          </a>{" "}
          y selecciona otro artículo.
        </p>
      </main>
    );
  }

  // Función para agregar al carrito el producto con la cantidad especificada
  const handleAddToCart = () => {
    if (cantidad < CANTIDAD_MIN || cantidad > CANTIDAD_MAX) {
      setErrorCantidad(
        `La cantidad debe ser entre ${CANTIDAD_MIN} y ${CANTIDAD_MAX}`
      );
      return;
    }
    addProduct({ ...producto, quantity: cantidad });
    showToastAlert(`¡${cantidad} ${producto.nombre} agregado!`);
    setErrorCantidad(""); // Limpiar mensaje si todo está bien
  };

  // Validar y limitar la cantidad entre 1 y 10
  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < CANTIDAD_MIN) value = CANTIDAD_MIN;
    if (value > CANTIDAD_MAX) value = CANTIDAD_MAX;
    // Setear la cantidad validada
    setCantidad(value);
  };

  return (
    <main className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Repostería : OnlyFlans</h1>
        <hr />
      </div>

      <div className="row" id="product-details">
        {/* Columna izquierda - Imagen del producto */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="text-center">
            <img
              src={producto.url}
              alt={producto.nombre}
              className="product-image img-fluid shadow-sm rounded"
              id="product-image"
            />
          </div>
        </div>

        {/* Columna derecha - Información del producto */}
        <div className="col-lg-6 col-md-6 col-12">
          <div className="product-info">
            <h2 className="product-title h2 mb-3" id="product-title">
              {producto.nombre}
            </h2>
            <hr />

            <p className="product-code mb-3">
              <strong>Código:</strong>{" "}
              <span id="product-code">{producto.codigo}</span>
            </p>

            <div className="product-description mb-4">
              <h5>Descripción del producto</h5>
              <p className="text-muted" id="product-description">
                {producto.descripcion}
              </p>

              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-check text-success me-2"></i>100%
                  Artesanal
                </li>
                <li>
                  <i className="fas fa-check text-success me-2"></i>Receta
                  Familiar
                </li>
                <li>
                  <i className="fas fa-check text-success me-2"></i>Mantener
                  2-8°C
                </li>
                <li>
                  <i className="fas fa-check text-success me-2"></i>4-5 días
                  vigencia
                </li>
                <li>
                  <i className="fas fa-check text-success me-2"></i>Calidad
                  Premium
                </li>
              </ul>
            </div>

            {/* Precio */}
            <div className="product-price mb-4">
              <span className="price fs-2 fw-bold" id="product-price">
                {formatCurrency(producto.precio)}
              </span>
              <small className="text-muted ms-2">c/u IVA incluido</small>
            </div>

            {/* Cantidad y botón agregar al carrito */}
            <div className="product-actions">
              <div className="row align-items-end">
                <div className="col-4 col-sm-3">
                  <label htmlFor="quantity" className="form-label">
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    min={1}
                    max={10}
                    value={cantidad}
                    onChange={handleCantidadChange} // Función para validar la cantidad
                  />
                  {errorCantidad && (
                    <small className="text-danger">{errorCantidad}</small>
                  )}
                </div>
                <div className="col-8 col-sm-9">
                  <div style={{ marginTop: "31px" }}>
                    <Button
                      id="add-to-cart-button"
                      text="Agregar"
                      className="btn btnBrown mt-auto fs-5"
                      icon="fas fa-shopping-cart"
                      onClick={handleAddToCart}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Información de envío */}
            <div className="shipping-info mt-4 p-3 bg-light rounded">
              <h6>
                <i className="fas fa-truck me-2"></i>Información de envío
              </h6>
              <small className="text-muted">
                Envío gratis en pedidos superiores a $50.000. <br />
                Entrega estimada: 2-5 días hábiles. <br />
                Envíos refrigerados garantizados.
              </small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
