import { useState } from "react";

const HOneFormBlock = ({ title, setTitle }: { title: string, setTitle: (title: string) => void }) => {

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div className="w-full border-dashed border-2 border-gray-800 p-3 rounded-lg">
            <p className="mb-1 text-xs">Title Block</p>
            <input className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg p-4" value={title} onChange={handleTextChange} />
        </div>
    );
};

export default HOneFormBlock;
