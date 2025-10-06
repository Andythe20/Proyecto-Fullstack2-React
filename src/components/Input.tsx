interface InputProps {
  title: string;
  className?: string;
  txt: string;
}

function Input({ title, className, txt }: InputProps) {
  return (
    <div className={className}>
      <label className="form-label">{title}</label>
      <input type="text" className="form-control" placeholder={txt} />
    </div>
  );
}

export default Input;
