import { Link } from "react-router-dom";
import CardProduct from "../../components/CardProduct/CardProduct";
import ProductSkeleton from "../../components/ProductSkeleton/ProductSkeleton";
import useProductos from "../../hooks/useProductos";
import './Productos.css';

function Products() {
  const { productos, isLoading, error } = useProductos();

  // Render condicional mientras carga o hay error
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <main className="container">
      <h1 className="h1titlePage text-center">Repostería : Only Flans</h1>

      {/* Sección de testimonios y beneficios */}
      <section className="mt-5 mb-5">
        <div className="row">
          <div className="col-sm-6 text-center">
            <h3 className="mb-3">
              <i className="fa-solid fa-star text-warning"></i> Testimonios
            </h3>
            <blockquote className="blockquote">
              <p className="productos__testimonio">
                "¡El mejor flan que he probado! Sabor casero y entrega rápida."
              </p>
              <footer className="blockquote-footer text-end">Andrés O.</footer>
            </blockquote>
            <blockquote className="blockquote">
              <p className="productos__testimonio">
                "Variedad increíble y atención personalizada. ¡Repetiré sin
                duda!"
              </p>
              <footer className="blockquote-footer text-end">Luis M.</footer>
            </blockquote>
          </div>
          <div className="col-sm-6">
            <h3 className="mb-3">
              <i className="fa-solid fa-gift text-danger"></i> ¿Por qué
              elegirnos?
            </h3>
            <ul className="list-group mb-3">
              <li className="list-group-item productos__testimonio">
                <i className="fa-solid fa-leaf text-success"></i> Ingredientes
                frescos y naturales
              </li>
              <li className="list-group-item productos__testimonio">
                <i className="fa-solid fa-truck-fast"></i> Entrega rápida y
                segura
              </li>
              <li className="list-group-item productos__testimonio">
                <i className="fa-solid fa-heart text-danger"></i> Recetas
                artesanales
              </li>
            </ul>
            <div className="text-end">
              <Link to="/contacto" className="btn btnBrown mt-auto fs-5">
                <i className="fa-solid fa-cake-candles"></i> ¡Contáctanos!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de productos */}
      <section>
        <p className="h2 text-center my-5 fs-1">Nuestros productos</p>
        <div className="row g-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : productos.map((producto) => (
                <CardProduct key={producto.codigo} product={producto} />
              ))}
        </div>
      </section>
    </main>
  );
}

export default Products;
