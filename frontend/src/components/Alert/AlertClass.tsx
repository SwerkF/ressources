const AlertColor = (type: any) => {
    switch(type) {
        case 'primary':
            return 'bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500';
        
        case 'secondary':
            return 'bg-gray-50 border border-gray-200 text-sm text-gray-600 rounded-lg p-4 dark:bg-white/10 dark:border-white/10 dark:text-neutral-400';
        
        case 'success':
            return 'bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500';
        
        case 'danger':
            return 'bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500';
        
        case 'warning':
            return 'bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500';
    
        case 'neutral':
            return 'bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-white/10 dark:border-white/20 dark:text-white';
            
        case 'gray':
            return 'bg-white/10 border border-white/10 text-sm text-white rounded-lg p-4';
             
        default:
            return 'bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500';
    }
}

const AlertType = (type: any) => {
    switch(type) {
        case 'primary':
            return 'Info';
        
        case 'secondary':
            return 'Info';
        
        case 'success':
            return 'Success';
        
        case 'danger':
            return 'Error';
        
        case 'warning':
            return 'Warning';
        
        case 'neutral':
            return 'Info';
    }
}

export { AlertColor, AlertType };