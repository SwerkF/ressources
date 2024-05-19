const BadgeColorClass = (color: string) => {
    switch(color) {
        case 'primary':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white';
        
        case 'secondary':
            return 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white';
        
        case 'success':
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-white';
        
        case 'danger':
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-white';
        
        case 'warning':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-white';

        default:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white';
        
    }
}

const BadgeSizeClass = (size: string) => {
    switch(size) {
        case 'sm':
            return 'py-1.5 px-3 text-xs';
        
        case 'md':
            return 'py-2 px-4 text-sm';
        
        case 'lg':
            return 'py-3 px-5 text-base';
        
        default:
            return 'py-2 px-4 text-sm';
        
    }
}

export { BadgeColorClass, BadgeSizeClass };