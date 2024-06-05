import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeFormBlock = ({ code, setCode }: { code: string, setCode: (code: string) => void }) => {
    const initialLanguage = code.split('+')[0] || "javascript";
    const initialCode = code.split('+')[1] || "";

    const [language, setLanguage] = useState(initialLanguage);
    const [text, setText] = useState(initialCode);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setCode(`${language}+${e.target.value}`);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        setCode(`${e.target.value}+${text}`);
    };

    return (
        <div className="w-full border-dashed border-2 border-gray-800 p-3 rounded-lg">
            <select 
                value={language} 
                onChange={handleLanguageChange} 
                className="mb-2 p-2 bg-gray-100 dark:bg-neutral-800 rounded-lg"
            >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="php">PHP</option>
                <option value="sql">SQL</option>
                <option value="jsx">JSX</option>
                <option value="tsx">TSX</option>
            </select>
            <textarea 
                className="w-full h-40 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4" 
                value={text} 
                onChange={handleCodeChange} 
                placeholder="Enter your code here"
            />
            <SyntaxHighlighter language={language} style={darcula}>
                {text}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeFormBlock;
