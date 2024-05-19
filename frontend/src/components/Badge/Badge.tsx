import { BadgeColorClass, BadgeSizeClass } from './BadgeStyle';

const Badge = (props:any) => {
    // props: text, color, icon

    const colorClass = BadgeColorClass(props.color);
    const sizeClass = BadgeSizeClass(props.size);

    return (
        <span className={`inline-block ${sizeClass} ${colorClass} rounded-full`}>
            {props.icon}
            {props.text}
        </span>
    );
}

export default Badge;