import React from "react";
import "./DownloadPage.css";

const DownloadApp: React.FC = () => {
  // URL de descarga de tu APK
  const apkDownloadUrl =
    "https://backery-onlyflans-s3bucket.s3.us-east-1.amazonaws.com/assets/apk/release/release/app-release.apk";

  // URL del QR code generado para la descarga
  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(apkDownloadUrl);

  return (
    <div className="container py-5">
      <div className="row align-items-center justify-content-center min-vh-75">
        {/* Vista Desktop - Enlace de descarga */}
        <div className="col-12 d-none d-md-block">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Descarga OnlyFlans</h1>
            <p className="lead text-muted mb-5">
              Lleva los mejores flanes y pasteles artesanales siempre contigo
            </p>

            <div
              className="card shadow-lg border-0 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="card-body p-5">
                <div className="mb-4">
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
                </div>

                <h3
                  className="mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Descarga directa para Android
                </h3>
                <p className="text-muted mb-4">
                  Haz clic en el botón para descargar la aplicación OnlyFlans en
                  tu dispositivo
                </p>

                <a
                  href={apkDownloadUrl}
                  className="btnBrown px-5 py-3 mb-3 rounded-3 d-inline-flex align-items-center"
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
                  Descargar APK
                </a>

                <div className="alert alert-soft mt-4 mb-0" role="alert">
                  <small>
                    <strong>Nota:</strong> Luego de descargar, es posible que tu
                    dispositivo te pida permitir la instalación.
                  </small>
                </div>
              </div>
            </div>

            <div className="row mt-5 text-start">
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <span className="badge-chocolate rounded-circle p-2 me-3">
                    1
                  </span>
                  <div>
                    <h6 className="fw-bold">Descarga</h6>
                    <small className="text-muted">
                      Haz clic en el botón de descarga
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <span className="badge-chocolate rounded-circle p-2 me-3">
                    2
                  </span>
                  <div>
                    <h6 className="fw-bold">Instala</h6>
                    <small className="text-muted">
                      Abre el archivo APK descargado
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <span className="badge-chocolate rounded-circle p-2 me-3">
                    3
                  </span>
                  <div>
                    <h6 className="fw-bold">Disfruta</h6>
                    <small className="text-muted">
                      Explora nuestros deliciosos productos
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vista Mobile y Tablet - Código QR */}
        <div className="col-12 d-md-none">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">Descarga OnlyFlans</h1>
            <p className="lead text-muted mb-4">
              Escanea el código QR para descargar
            </p>

            <div
              className="card shadow-lg border-0 mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <div className="card-body p-4">
                <div className="mb-3">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code para descargar OnlyFlans"
                    className="img-fluid rounded"
                    style={{ maxWidth: "250px" }}
                  />
                </div>

                <h5 className="mb-3">Escanea con tu cámara</h5>
                <p className="text-muted small mb-4">
                  Apunta la cámara de tu dispositivo al código QR para comenzar
                  la descarga de OnlyFlans
                </p>

                <div className="alert alert-soft mt-4 mb-0" role="alert">
                  <small>
                    <strong>
                      Sólo está disponible para dispositivos Android
                    </strong>
                  </small>
                </div>
              </div>
            </div>

            <div className="mt-4 px-3">
              <div className="row g-1 text-start">
                <div className="col-12">
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <span className="badge-chocolate me-3">1</span>
                    <small>Abre la cámara de tu dispositivo</small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <span className="badge-chocolate me-3">2</span>
                    <small>Apunta hacia el código QR</small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <span className="badge-chocolate me-3">3</span>
                    <small>Toca la notificación para descargar</small>
                  </div>
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
