import { useState } from "react";
import Button from "../components/Button/Button";
import { Image, TextT, TextHTwo, TextHOne, Trash, Code } from "@phosphor-icons/react";
import ImageFormBlock from "../components/Blocks/Form/ImageFormBlock";
import TextFormBlock from "../components/Blocks/Form/TextFormBlock";
import HOneFormBlock from "../components/Blocks/Form/HOneFormBlock";
import HTwoFormBlock from "../components/Blocks/Form/HTwoFormBlock";
import CodeFormBlock from "../components/Blocks/Form/CodeFormBlock";
import React from "react";

const CreateRessource = () => {
    const [blocks, setBlocks] = useState<any[]>([]);
    const [nextId, setNextId] = useState(1);

    const handleCreateBlock = (type: string) => {
        const newBlock = {
            id: nextId,
            type: type,
            value: ""
        };
        setBlocks([...blocks, newBlock]);
        setNextId(nextId + 1);
    };

    const handleValueChange = (id: number, value: string) => {
        const updatedBlocks = blocks.map(block => 
            block.id === id ? { ...block, value: value } : block
        );
        setBlocks(updatedBlocks);
    };

    const handleGetValues = () => {
        console.log(blocks);
    }

    const handleDeleteBlock = (id: number) => {
        const updatedBlocks = blocks.filter(block => block.id !== id);
        setBlocks(updatedBlocks);
    };

    return (
        <div className="container mx-auto dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-10">Create a resource</h1>
            <Button text="Get values" onClick={handleGetValues} />
            <div className="flex flex-row gap-10">
                <div className="w-1/5 flex flex-col gap-2">
                    <p>Choose the type of resource</p>
                    <Button text="Add Image" icon={<Image />} color="gray" onClick={() => { handleCreateBlock('image') }} />
                    <Button text="Add Text" icon={<TextT />} color="gray" onClick={() => { handleCreateBlock('text') }} />
                    <Button text="Add Title" icon={<TextHOne />} color="gray" onClick={() => { handleCreateBlock('title') }} />
                    <Button text="Add Subtitle" icon={<TextHTwo />} color="gray" onClick={() => { handleCreateBlock('subtitle') }} />
                    <Button text="Add Code" icon={<Code />} color="gray" onClick={() => { handleCreateBlock('code') }} />
                </div>
                <div className="w-full">
                    {blocks.map((block, index) => {
                       return (
                            <div key={index} className="flex flex-row items-start gap-3 mb-5">
                                 {block.type === 'image' && <ImageFormBlock image={block.value} setImage={(value: string) => { handleValueChange(block.id, value) }} />}
                                 {block.type === 'text' && <TextFormBlock text={block.value} setText={(value: string) => { handleValueChange(block.id, value) }} />}
                                 {block.type === 'title' && <HOneFormBlock title={block.value} setTitle={(value: string) => { handleValueChange(block.id, value) }} />}
                                 {block.type === 'subtitle' && <HTwoFormBlock title={block.value} setTitle={(value: string) => { handleValueChange(block.id, value) }} />}
                                 {block.type === 'code' && <CodeFormBlock code={block.value} setCode={(value: string) => { handleValueChange(block.id, value) }} />}
                                 <Button icon={<Trash />}  color="neutral" onClick={() => { handleDeleteBlock(block.id) }} />
                            </div>
                       )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateRessource;
