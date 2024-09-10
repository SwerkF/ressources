import { useEffect } from "react";

export interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string | { message: string };
    className?: string;
}

const Input = ({ label, type, placeholder, value, name, onChange, required, disabled, error, className }: InputProps) => {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="flex flex-col items-start">
            {label && <label className="dark:text-white mb-1" htmlFor={label}>{label}</label>}
            <input
                type={type}
                id={label}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`py-3 px-4 block w-full border ${error ? "border-red-200 dark:border-red-500" : "border-gray-200 dark:border-neutral-700 "} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${className}`}
            />
            {error && <p className="text-red-600">{typeof error === 'string' ? error : error.message}</p>}
        </div>
    );
};

export default Input;
