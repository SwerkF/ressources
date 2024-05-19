import { Link } from 'react-router-dom';


const NavbarLink = (props:any) => {
    // props: text, to, icon, current, onClick

    return (
        (props.current) ? (
            <Link to={props.link} onClick={props.onClick} className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-blue-400 dark:text-white">
                {props.text}
            </Link>

        ) : (
            <Link to={props.link} onClick={props.onClick} className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300">
                {props.text}
            </Link>
        )
    )
}

export default NavbarLink;