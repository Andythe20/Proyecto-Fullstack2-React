import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useCarrito } from "../../hooks/useCarrito";
import useProductos from "../../hooks/useProductos";
import Button from "../Button/Button";
import formatCurrency from "../../utils/formatCurrency";
import "./ProdSugeridos.css";

function ProdSugeridos() {
  const { productos, isLoading, error } = useProductos();
  const { carrito: items, addProduct } = useCarrito();

  const [productosSugeridos, setProductosSugeridos] = useState<Product[]>([]);

  useEffect(() => {
    if (!isLoading && productos.length > 0) {
      // Filtrar los productos que no están en el carrito
      const disponibles = productos.filter(
        (p) => !items.some((item: Product) => item.codigo === p.codigo)
      );

      // Mezclar aleatoriamente y tomar 4
      const sugeridos = [...disponibles]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      setProductosSugeridos(sugeridos);
    }
  }, [productos, items, isLoading]); // React está pendiente de cambios en productos, items e isLoading

  // Muestra un spinner mientras carga
  if (isLoading) return <LoadingSpinner />;

  // Muestra error si algo falla
  if (error)
    return (
      <main className="container my-5 text-center">
        <h3 className="text-danger">Error: {error}</h3>
      </main>
    );
  return (

      <div className="row" id="product-list">
        {productosSugeridos.map((producto, index) => (
          <div
            key={producto.codigo}
            className="col-12 col-md-6 mb-4 d-flex fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="card h-100 shadow-sm flex-fill">
              <img
                src={producto.url}
                alt={producto.nombre}
                className="card-img-top product-image"
              />
              <div className="card-body text-center">
                <h6 className="card-title">{producto.nombre}</h6>
                <p className="card-text small text-muted">
                  {producto.descripcion}
                </p>
                <p className="product-price mb-3 fw-bold">
                  {formatCurrency(producto.precio)} c/u
                </p>
                <Button
                  text="Agregar al Carrito"
                  icon="fas fa-plus"
                  className="btn btnBrown btn-sm w-100"
                  onClick={() => addProduct({ ...producto, quantity: 1 })}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Si no hay productos sugeridos */}
        {productosSugeridos.length === 0 && (
          <div className="text-center text-muted my-5">
            <h2>Felicidades</h2>
            <p className="my-5">
              Ya tienes todos los productos en tu carrito 🎉
            </p>
            <h3 className="my-5">Muchas gracias!!!</h3>
          </div>
        )}
      </div>
  );
}

export default ProdSugeridos;
