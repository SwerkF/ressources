import { useState, useEffect } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";

export interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    name?: string;
    icon?: JSX.Element; // Change this to JSX.Element to allow React elements
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string | { message: string };
    className?: string;
}

const Input = ({ label, type, placeholder, value, name, icon, onChange, required, disabled, error, className }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        console.log(error);
    }, [error]);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="flex flex-col items-start w-full dark:text-white text-black">
            {label && <label className="dark:text-white mb-1" htmlFor={label}>{label}</label>}
            <div className="relative flex items-center w-full">
                {icon && <div className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                <input
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    id={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`py-3 px-4 block w-full border ${error ? "border-red-200 dark:border-red-500" : "border-gray-200 dark:border-neutral-700 "} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${icon ? "pl-10" : ""} ${className}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                        {showPassword ? <EyeClosed size={24} /> : <Eye size={24} />}
                    </button>
                )}
            </div>
            {error && <p className="text-sm text-red-600">{typeof error === 'string' ? error : error.message}</p>}
        </div>
    );
};

export default Input;
