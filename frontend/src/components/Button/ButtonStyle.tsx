
const ButtonColorClass = (color: string, active:boolean) => {
    
    if(active !== true) {
        switch(color) {
            case 'primary':
                return 'bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800';
            
            case 'secondary':
                return 'bg-gray-200 text-gray-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800';
            
            case 'success':
                return 'bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800';
            
            case 'danger':
                return 'bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800';
            
            case 'warning':
                return 'bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800';
    
            case 'neutral':
                return 'bg-gray-200 text-gray-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800';
            
            case 'gray':
                return 'bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700';
                 
            default:
                return 'bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800';
            
        } 
        
        } else {
            switch(color) {
                case 'primary':
                    return 'bg-blue-700 text-white dark:bg-blue-800';
                
                case 'secondary':
                    return 'bg-gray-300 text-gray-800 dark:bg-neutral-800 dark:text-white';
                
                case 'success':
                    return 'bg-green-700 text-white dark:bg-green-800';
                
                case 'danger':
                    return 'bg-red-700 text-white dark:bg-red-800';
                
                case 'warning':
                    return 'bg-yellow-700 text-white dark:bg-yellow-800';
        
                case 'neutral':
                    return 'bg-gray-300 text-gray-800 dark:bg-neutral-800 dark:text-white';
                     
                default:
                    return 'bg-blue-700 text-white dark:bg-blue-800';
                
            }
    }
}

const ButtonSizeClass = (size: string) => {
    switch(size) {
        case 'sm':
            return 'py-2 px-3 text-sm';
        
        case 'md':
            return 'py-3 px-4 text-base';
        
        case 'lg':
            return 'py-4 px-5 text-lg';
        
        default:
            return 'py-3 px-4 text-base';
        
    }
}

const ButtonWidthClass = (width: string) => {
    switch(width) {
        case 'full':
            return 'w-full';
        
        case 'auto':
            return 'w-auto';
        
        case '50':
            return 'w-50';
        
        default:
            return 'w-auto';
        
    }
}

export { ButtonColorClass, ButtonSizeClass, ButtonWidthClass };