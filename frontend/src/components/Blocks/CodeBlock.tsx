import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Vous pouvez changer le thème ici

const CodeBlock = ({ code, language } : { code:string, language:string }) => {
    const highlightedCode = hljs.highlight(code, { language }).value;
    return (
        <pre className="rounded-lg p-4 bg-gray-800 dark:bg-gray-900 text-white">
            <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
        </pre>
    );
};

export default CodeBlock;