interface FieldProps {
  title: string;
  className: string;
  txt: string;
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
  title,
  id,
  type = "text",
  txt,
  required,
  as = "input",
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {title}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={txt}
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
          placeholder={txt}
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
