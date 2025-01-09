import { useField } from "formik";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  icon,
  className,
  disabled,
  required,
  onChange,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`relative mb-4 ${className}`}>
      <div className="absolute left-5 top-3 inline-block">{icon}</div>
      <input
        {...field}
        type={type}
        className={`mb-1 block h-9 w-full rounded-md border border-solid px-3 py-6 pl-14 text-sm placeholder:text-black ${
          meta.touched && meta.error ? "border-red-500" : "border-black"
        }`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          field.onChange(e);
          if (onChange) onChange(e);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-left text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
