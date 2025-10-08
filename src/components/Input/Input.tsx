interface InputProps {
  title: string;
  className: string;
  txt: string;
  required?: boolean;
  id: string;
  htmlFor: string;
  type: string;
  onBlurFunction?: () => void;
}

function Input({
  className,
  htmlFor,
  title,
  id,
  type,
  txt,
  required,
  onBlurFunction,
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
        onBlur={onBlurFunction}
      />
      <div className="invalid-feedback">El {htmlFor} es inválido</div>
    </div>
  );
}

export default Input;
