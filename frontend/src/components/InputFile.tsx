import React, { ChangeEvent } from 'react';

interface InputFileProps {
    label?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const InputFile: React.FC<InputFileProps> = ({ label, onChange, error, required, disabled, className }) => {
    return (
        <div className="flex flex-col items-start">
            {label && <label htmlFor="file-input">{label}</label>}
            <input
                type="file"
                id="file-input"
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400 ${className}`}
            />
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default InputFile;
