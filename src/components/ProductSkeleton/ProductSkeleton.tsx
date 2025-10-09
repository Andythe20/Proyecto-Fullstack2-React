function ProductSkeleton(){
  return (
    <div className="col-sm-6 col-md-4 mb-3">
      <div className="card" aria-hidden="true">
        <div
          className="card-img-top bg-secondary"
          style={{ height: "200px" }}
        ></div>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
          </p>
          <a
            href="#"
            tabIndex={-1}
            className="btn btnBrown disabled placeholder col-6"
          ></a>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
