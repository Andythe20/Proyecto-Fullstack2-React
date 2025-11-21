import React from "react";
import "./DownloadPage.css";

const DownloadApp: React.FC = () => {
  const apkDownloadUrl =
    "https://backery-onlyflans-s3bucket.s3.us-east-1.amazonaws.com/assets/apk/release/app-release.apk";

  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(apkDownloadUrl);

  return (
    <div className="container py-5">
      <div className="row align-items-center justify-content-center min-vh-75">
        {/* ============================ */}
        {/* DESKTOP VIEW (XL ≥ 1200px) */}
        {/* ============================ */}
        <div className="col-12 d-none d-xl-block">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Descarga OnlyFlans</h1>
            <p className="lead text-muted mb-5">
              Escanea el código QR para descargar la aplicación
            </p>

            <div
              className="card shadow-lg border-0 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="card-body p-5">
                <img
                  src={qrCodeUrl}
                  alt="QR Code para descargar OnlyFlans"
                  className="img-fluid rounded mb-4"
                  style={{ maxWidth: "280px" }}
                />

                <h3
                  className="mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Escanea con la cámara de tu móvil
                </h3>

                <p className="text-muted">
                  Apunta la cámara hacia el código para iniciar la descarga.
                </p>

                <div className="alert alert-soft mt-4 mb-0">
                  <small>
                    <strong>Disponible solo para Android <i className="fa-brands fa-android text-success"></i></strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ */}
        {/* TABLET VIEW (MD–LG) */}
        {/* ============================ */}
        <div className="col-12 d-none d-md-block d-xl-none">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-4">Descarga OnlyFlans</h1>
            <p className="lead text-muted mb-4">Elige cómo descargar</p>

            <div
              className="card shadow-lg border-0 mx-auto p-4"
              style={{ maxWidth: "650px" }}
            >
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <img
                    src={qrCodeUrl}
                    alt="QR descarga OnlyFlans"
                    className="img-fluid rounded"
                  />
                  <p className="mt-3 text-muted small">Escanea con tu cámara</p>
                </div>

                <div className="col-md-6 text-center">
                  <h5 className="mb-3">Descarga directa (Android <i className="fa-brands fa-android text-success"></i>)</h5>

                  <a
                    href={apkDownloadUrl}
                    className="btnBrown px-4 py-3 mb-3 rounded-3 d-inline-flex align-items-center"
                    download
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      className="me-2"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    Descargar App
                  </a>

                  <p className="text-muted small">
                    Puede requerir habilitar instalaciones externas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ */}
        {/* MOBILE VIEW (XS–SM) */}
        {/* ============================ */}
        <div className="col-12 d-block d-md-none">
          <div className="text-center">
            <h1 className="display-6 fw-bold mb-3">Descarga OnlyFlans</h1>
            <p className="lead text-muted mb-4">Instala la app en tu Android <i className="fa-brands fa-android text-success"></i></p>

            <div
              className="card shadow-lg border-0 mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <div className="card-body p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-phone"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>

                <h5 className="mb-3">Descarga directa</h5>

                <a
                  href={apkDownloadUrl}
                  className="btnBrown px-4 py-3 mb-3 rounded-3 d-inline-flex align-items-center"
                  download
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    className="me-2"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  Descargar App
                </a>

                <div className="alert alert-soft mt-4 mb-0">
                  <small>
                    <strong>Puede requerir permisos de instalación</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* ============================ */}
        {/* INSTRUCCIONES CENTRADAS */}
        {/* ============================ */}
        <div className="mt-4 px-3 d-flex justify-content-center">
          <div style={{ maxWidth: "450px", width: "100%" }}>
            <div className="row g-1">
              <div className="col-12">
                <div className="d-flex align-items-center bg-light p-3 rounded">
                  <span className="badge-chocolate me-3" style={{ flexShrink: 0 }}>1</span>
                  <small className="text-start">Descarga la App</small>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center bg-light p-3 rounded">
                  <span className="badge-chocolate me-3" style={{ flexShrink: 0 }}>2</span>
                  <small className="text-start">Abre el archivo APK</small>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center bg-light p-3 rounded">
                  <span className="badge-chocolate me-3" style={{ flexShrink: 0 }}>3</span>
                  <small className="text-start">Instala y disfruta en tu dispositivo android</small>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DownloadApp;
