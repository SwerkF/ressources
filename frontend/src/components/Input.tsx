
export interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}


const Input = (props:InputProps) => {

    return (
        <div className="flex flex-col items-start">
            {props.label && <label className="text-gray-700 dark:text-neutral-300" htmlFor={props.label}>{props.label}</label>}
            <input
                type={props.type}
                id={props.label}
                name={props.label}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring ${props.className}`}
            />
        </div>
    );

}

export default Input;