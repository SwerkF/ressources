
import { ButtonColorClass, ButtonWidthClass, ButtonSizeClass } from './ButtonStyle';

const Button = (props:any) => {
    // props: color, size, width, text, icon, onClick

    const colorClass = ButtonColorClass(props.color);
    const sizeClass = ButtonSizeClass(props.size);
    const widthClass = ButtonWidthClass(props.width);

    // icon is a @phosphor-icons/react component
    return (
        <button type="button" className={`flex justify-center items-center gap-x-2 ${sizeClass} ${widthClass} ${colorClass} rounded-lg border border-transparent shadow-sm hover:shadow disabled:opacity-50 disabled:pointer-events-none`} onClick={props.onClick} >
            {props.icon}
            {props.text}
        </button>
    );
}

export default Button;