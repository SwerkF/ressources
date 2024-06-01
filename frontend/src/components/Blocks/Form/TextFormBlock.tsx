import { useState } from "react";

const TextFormBlock = ({ text, setText }: { text: string, setText: (text: string) => void }) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="w-full">
            <textarea className="w-full h-40 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4" value={text} onChange={handleTextChange}></textarea>
        </div>
    );
};

export default TextFormBlock;
