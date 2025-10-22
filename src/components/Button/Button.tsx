import "./Button.css";

interface ButtonProps {
  id: string;
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  id,
  text,
  onClick,
  className = "btn btnBrown mt-auto fs-5",
  icon,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick} id={id}>
      {icon && <i className={`${icon} me-2`}></i>}
      {text}
    </button>
  );
}

export default Button;
