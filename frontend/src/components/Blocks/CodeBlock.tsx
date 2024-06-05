import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from 'react';

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
    console.log(code);
    return (
        <SyntaxHighlighter language={language} style={darcula}>
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
