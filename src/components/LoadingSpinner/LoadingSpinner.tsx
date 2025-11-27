import { BlinkBlur } from "react-loading-indicators";

export default function LoadingSpinner({
  text = "Cargando producto...",
}: {
  text?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "var(--color-cream-pastel)",
        flexDirection: "column",
      }}
      role="status"
      aria-label={text}
    >
      <BlinkBlur
        size="medium"
        color={[
          "var(--color-chocolate)",
          "var(--color-soft-pink)",
          "var(--color-rosa-pastel)",
          "var(--color-cream-pastel)",
        ]}
      />

      <p
        style={{
          color: "var(--color-text-primary)",
          marginTop: "1rem",
          fontFamily: "var(--font-primary-lato)",
        }}
      >
        {text}
      </p>
    </div>
  );
}
