
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
            {props.label && <label htmlFor={props.label}>{props.label}</label>}
            <input
                type={props.type}
                id={props.label}
                name={props.label}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"            />
        </div>
    );

}

export default Input;