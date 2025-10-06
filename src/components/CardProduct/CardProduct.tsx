import formatCurrency from "../../utils/formatCurrency";
import showToastAlert from "../../utils/showToastAlert";
import Button from "../Button/Button";
import './CardProduct.css'

interface Product {
    code: string;
    category: string;
    name: string;
    description: string;
    price: number;
    url: string
}

interface CardProductProps{
    product: Product
}

function CardProduct ({product}: CardProductProps){
return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="card mx-auto shadow-sm btnConcavo d-flex flex-column w-100">
        <form className="formulario__producto d-flex flex-column h-100">
          <a href={`./detalleProducto.html?cod=${product.code}`}>
            <img
              src={product.url}
              className="card-img-top shadow"
              alt={product.name}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`Click para ver detalle de ${product.name}`}
            />
          </a>
          <div className="card-body d-flex flex-column flex-grow-1 text-center">
            <h5 className="card-title fs-3">{product.name}</h5>
            <p className="card-text fs-2 fw-bold producto__precio">
              Precio:
              <span id="producto__precio--moneda">
                {formatCurrency(product.price)}
              </span>
            </p>
            <small>Código: {product.code}</small>
            <p className="flex-grow-1 producto__descripcion">
              {product.description || ""}
            </p>
            <Button 
              text="Agregar"
              className="btn btnBrown mt-auto fs-5"
              icon="fas fa-shopping-cart"
              onClick={ () => showToastAlert(`¡${product.name} agregado!`)}         
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardProduct;