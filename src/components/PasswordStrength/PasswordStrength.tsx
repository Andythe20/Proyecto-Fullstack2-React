import type { PasswordValidationResult } from "../../utils/passwordValidator";

interface PasswordStrengthProps {
  passwordValidation: PasswordValidationResult | null;
}

const PasswordStrength = ({ passwordValidation }: PasswordStrengthProps) => {
  const getStrengthColor = () => {
    if (!passwordValidation) return "#d9d9d9";

    switch (passwordValidation.strength) {
      case "Muy Fuerte":
        return "#52c41a";
      case "Fuerte":
        return "#73d13d";
      case "Regular":
        return "#faad14";
      case "Débil":
        return "#ffa940";
      case "Muy Débil":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  if (!passwordValidation) return null;

  return (
    <div className="password-feedback mt-2">
      <div
        className="strength-bar-container"
        style={{
          height: "4px",
          backgroundColor: "#f0f0f0",
          borderRadius: "2px",
          marginBottom: "8px",
        }}
      >
        <div
          className="strength-bar"
          style={{
            width: `${passwordValidation.score}%`,
            height: "100%",
            backgroundColor: getStrengthColor(),
            borderRadius: "2px",
            transition: "all 0.3s ease",
          }}
        />
      </div>
      <p className="strength-text small mb-1">
        Fuerza: <strong>{passwordValidation.strength}</strong>
      </p>
      {passwordValidation.feedback.length > 0 && (
        <ul className="feedback-list small text-muted mb-0">
          {passwordValidation.feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrength;
