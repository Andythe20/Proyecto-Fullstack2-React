import { BlinkBlur } from "react-loading-indicators";
export default function LoadingSpinner() {
  return (
   <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",          // Ocupa toda la pantalla
        width: "100vw",
        backgroundColor: "var(--color-cream-pastel)", // Fondo acorde a la web
        flexDirection: "column",
      }}
      role="status"
      aria-label="Cargando"
    >
      <BlinkBlur
        size="medium" // Ajusta el tamaño del spinner
        color={[
          "var(--color-chocolate)",
          "var(--color-soft-pink)",
          "var(--color-rosa-pastel)",
          "var(--color-cream-pastel)",
        ]}
      />
      <p style={{ color: "var(--color-text-primary)", marginTop: "1rem", fontFamily: "var(--font-primary-lato)" }}>
        Cargando producto...
      </p>
    </div>
  );
}