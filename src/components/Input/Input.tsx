interface InputProps {
  title: string;
  className: string;
  txt: string;
  required?: boolean;
  autoComplete?: string;
  id: string;
  htmlFor: string;
  type: string;
}

function Input({
  type,
  title,
  className,
  txt,
  required,
  autoComplete,
  id,
  htmlFor,
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="form-label">
        {title}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={txt}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default Input;
