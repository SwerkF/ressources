
export interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}


const Input = ({ label, type, placeholder, value, name, onChange, required, disabled, error, className }: InputProps) => {

    return (
        <div className="flex flex-col items-start">
            {label && <label htmlFor={label}>{label}</label>}
            <input
                type={type}
                id={label}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`py-3 px-4 block w-full border ${error ? "border-red-200" : "border-gray-200"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${className}`}
            />
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default Input;