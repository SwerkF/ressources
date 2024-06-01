import { useState } from "react";
import Button from "../components/Button/Button";
import { Image, TextT } from "@phosphor-icons/react";
import ImageFormBlock from "../components/Blocks/Form/ImageFormBlock";
import TextFormBlock from "../components/Blocks/Form/TextFormBlock";
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


    return (
        <div className="container mx-auto dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-10">Create a resource</h1>
            <Button text="Get values" onClick={handleGetValues} />
            <div className="flex flex-row gap-10">
                <div className="w-1/5 flex flex-col gap-2">
                    <p>Choose the type of resource</p>
                    <Button text="Add Image" icon={<Image />} color="gray" onClick={() => { handleCreateBlock('image') }} />
                    <Button text="Add Text" icon={<TextT />} color="gray" onClick={() => { handleCreateBlock('text') }} />
                </div>
                <div className="w-full">
                    {blocks.map(block => {
                        return (
                            <div className="mb-5">
                                {block.type === 'image' ? (
                                    <ImageFormBlock image={block.value} setImage={(value: string) => handleValueChange(block.id, value)} />
                                ) : block.type === 'text' ? (
                                    <TextFormBlock text={block.value} setText={(value: string) => handleValueChange(block.id, value)} />
                                ) : (
                                    <p>Block not found</p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateRessource;
