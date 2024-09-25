
import { ButtonColorClass, ButtonWidthClass, ButtonSizeClass } from './ButtonStyle';

const Button = (props:any) => {
    // props: children, size, width, text, icon, onClick, active, class, type

    const colorClass = ButtonColorClass(props.color, props.active ? true : false);
    const sizeClass = ButtonSizeClass(props.size);
    const widthClass = ButtonWidthClass(props.width);

    // icon is a @phosphor-icons/react component
    return (
        <button type={props.type ? props.type : "button"} className={`flex justify-center items-center gap-x-2 ${sizeClass} ${widthClass} ${colorClass} rounded-lg border border-transparent shadow-sm hover:shadow disabled:opacity-50 disabled:pointer-events-none`} onClick={props.onClick} >
            {props.icon}
            {props.children}
        </button>
    );
}

export default Button;