interface FieldProps {
  titleText: string;
  className: string;
  placeholder: string;
  required?: boolean;
  id: string;
  type?: string;
  as?: "input" | "textarea";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

function Field({
  className,
  titleText,
  id,
  type = "text",
  placeholder,
  required,
  as = "input",
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {titleText}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          required={required}
          rows={5}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`form-control${error ? " is-invalid" : ""}`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
      <div className="invalid-feedback">
        {error ? error : `El ${id} es inválido`}
      </div>
    </div>
  );
}

export default Field;
