import { useCarrito } from "../../hooks/useCarrito";
import Button from "../../components/Button/Button";
import ProdSugeridos from "../../components/ProdSugeridos/ProdSugeridos";
import formatCurrency from "../../utils/formatCurrency";
import "./CarritoPage.css";
import { handleCheckout } from "../../utils/handleCheckout";

function CarritoPage() {
  const { carrito: items, addProduct, removeProduct, clearCart } = useCarrito();

  // Calcula el total del carrito
  const total = items.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  // Incrementa la cantidad del producto en el carrito
  const handleIncrement = (codigo: string) => {
    const product = items.find((p) => p.codigo === codigo);
    if (product) addProduct({ ...product, quantity: 1 });
  };

  // Decrementa la cantidad o elimina el producto si la cantidad llega a 0
  const handleDecrement = (codigo: string) => {
    removeProduct(codigo, 1);
  };

  // Elimina completamente el producto del carrito
  const handleRemove = (codigo: string) => {
    removeProduct(codigo, Infinity); // Elimina completamente el producto
  };

  // Verifica si el carrito está vacío
  const isEmpty = items.length === 0;

  return (
    <main className="container-fluid my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Repostería : OnlyFlans</h1>
      </div>

      <div className="row">
        {/* Carrito de Compras */}
        <div className="col-12 col-lg-7 mb-4">
          <h2 className="section-title">
            <i className="fas fa-shopping-cart me-2"></i>Carrito de Compras
          </h2>

          {/* Tabla */}
          {!isEmpty && (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Precio Unit.</th>
                    <th className="text-center">Sub total</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const descripcionCorta =
                      item.descripcion.length > 30
                        ? item.descripcion.slice(0, 30) + "..."
                        : item.descripcion;

                    return (
                      <tr key={item.codigo}>
                        <td>
                          <div className="d-flex align-items-center">
                            <a
                              href={`/detalleProducto?cod=${item.codigo}`}
                              title={`Ver detalle de ${item.nombre}`}
                            >
                              <img
                                src={item.url}
                                alt={item.nombre}
                                className="me-3"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                            <div>
                              <h6 className="mb-1">{item.nombre}</h6>
                              <small className="text-muted">
                                {descripcionCorta}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="quantity-control d-flex justify-content-center align-items-center gap-2">
                            <button
                              className="quantity-btn btn btn-light btn-sm"
                              onClick={() => handleDecrement(item.codigo)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="quantity-display fs-6">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn btn btn-light btn-sm"
                              onClick={() => handleIncrement(item.codigo)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </td>

                        <td className="text-center">
                          {formatCurrency(item.precio)}
                        </td>

                        <td className="text-center fw-bold">
                          {formatCurrency(item.precio * item.quantity)}
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar producto"
                            onClick={() => handleRemove(item.codigo)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Carrito vacío */}
          {isEmpty && (
            <div className="empty-cart text-center py-5">
              <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
              <h4>Tu carrito está vacío</h4>
              <p className="carrito__parrafo">
                Agrega algunos deliciosos productos para comenzar
              </p>
              <a href="/productos" className="btn btnBrown">
                Ver Productos
              </a>
              <hr />
            </div>
          )}

          {/* Total y acciones */}
          {!isEmpty && (
            <div
              className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-light rounded shadow-sm mt-4"
              id="total-section"
            >
              <div className="mb-3 mb-md-0">
                <h3 className="mb-0 fw-bold text-success">
                  <i className="fas fa-money-bill-wave me-2"></i>Total:{" "}
                  {formatCurrency(total)}
                </h3>
              </div>
              <div className="d-flex gap-2">
                <Button
                  text="Vaciar Carrito"
                  className="btn btn-outline-danger btn-lg px-4"
                  icon="fas fa-trash"
                  onClick={clearCart}
                />
                <Button
                  text="Proceder al Pago"
                  className="btn btnBrown btn-lg px-4"
                  icon="fas fa-credit-card"
                  onClick={
                    () => handleCheckout(clearCart) // Vacía el carrito tras el pago
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Productos sugeridos */}
        <div className="col-12 col-lg-5">
          <h2 className="section-title">
            <i className="fas fa-cake me-2"></i>Podría gustarte
          </h2>
          <div className="row">
            <ProdSugeridos />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CarritoPage;
