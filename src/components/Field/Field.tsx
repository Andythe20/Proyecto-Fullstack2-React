interface FieldProps {
  title: string;
  className: string;
  txt: string;
  required?: boolean;
  id: string;
  htmlFor: string;
  type?: string;
  as?: "input" | "textarea";
  onBlurFunction?: () => void;
}

function Field({
  className,
  htmlFor,
  title,
  id,
  type = "text",
  txt,
  required,
  as = "input",
  onBlurFunction,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="form-label">
        {title}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className="form-control"
          placeholder={txt}
          required={required}
          onBlur={onBlurFunction}
          rows={5}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="form-control"
          placeholder={txt}
          required={required}
          onBlur={onBlurFunction}
        />
      )}
      <div className="invalid-feedback">El {htmlFor} es inválido</div>
    </div>
  );
}

export default Field;
