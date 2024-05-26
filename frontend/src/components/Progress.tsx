import { useEffect, useState } from "react";

const Progress = ({ progress }: { progress: number }) => {

    const [color, setColor] = useState('bg-blue-600 dark:bg-blue-500');

    useEffect(() => {
        if(progress < 30) {
            setColor('bg-red-600 dark:bg-red-500');
        } else if(progress < 60) {
            setColor('bg-yellow-600 dark:bg-yellow-500');
        } else {
            setColor('bg-green-600 dark:bg-green-500');
        }
    }, [progress]);

    return (
        (color && 
            <div className="flex w-full h-3.2  bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                <div className={`flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 ${color}`} style={{width: `${progress}%`}}>
                    <p className="text-xs">{progress}%</p>
                </div>
            </div>
        )
    );
}

export default Progress;