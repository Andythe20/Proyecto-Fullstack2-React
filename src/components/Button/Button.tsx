interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    icon?: string;
}


function Button({
    text,
    onClick,
    className = "btn btnBrown mt-auto fs-5",
    icon
}: ButtonProps) {
    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
        >
            {icon && <i className={`${icon} me-2`}></i>}
            {text}
        </button>
    );
};

export default Button;