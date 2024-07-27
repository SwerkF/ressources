import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { Image, TextT, TextHTwo, TextHOne, Trash, Code } from '@phosphor-icons/react';
import ImageFormBlock from '../Blocks/Form/ImageFormBlock';
import TextFormBlock from '../Blocks/Form/TextFormBlock';
import HOneFormBlock from '../Blocks/Form/HOneFormBlock';
import HTwoFormBlock from '../Blocks/Form/HTwoFormBlock';
import CodeFormBlock from '../Blocks/Form/CodeFormBlock';

const CreateRessourceStepTwo = ({ ressource, setRessource } : any) => {

    const [blocks, setBlocks] = useState<any>([]);
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        if (ressource.content) {
            setBlocks(ressource.content);
            console.log('Initial blocks set from ressource content:', ressource.content);
        }
    }, [ressource.content]);

    const handleCreateBlock = (type:string) => {
        const newBlock = {
            id: nextId.toString(),
            type: type,
            value: ""
        };
        console.log('Creating new block:', newBlock);
        setBlocks([...blocks, newBlock]);
        setNextId(nextId + 1);
        setRessource({ ...ressource, content: [...ressource.content, newBlock] });
    };

    const handleValueChange = (id:string, value:any) => {
        console.log('Changing value of block with id:', id, 'to:', value);
        const updatedBlocks = blocks.map((block:any) => {
            console.log(`Checking block with id: ${block.id}`);
            return block.id === id ? { ...block, value: value } : block;
        });
        console.log('Updated blocks after value change:', updatedBlocks);
        setBlocks(updatedBlocks);
        setRessource({ ...ressource, content: updatedBlocks });
    };

    const handleDeleteBlock = (id:string) => {
        console.log('Deleting block with id:', id);
        const updatedBlocks = blocks.filter((block:any) => block.id !== id);
        console.log('Updated blocks after deletion:', updatedBlocks);
        setBlocks(updatedBlocks);
        setRessource({ ...ressource, content: updatedBlocks });
    };

    return (
        <div className="w-full flex flex-row gap-3">
            <div className="w-[20%] flex flex-col gap-2">
                <p>Choose the type of block</p>
                <Button text="Add Image" icon={<Image />} color="gray" onClick={() => { handleCreateBlock('image') }} />
                <Button text="Add Text" icon={<TextT />} color="gray" onClick={() => { handleCreateBlock('text') }} />
                <Button text="Add Title" icon={<TextHOne />} color="gray" onClick={() => { handleCreateBlock('title') }} />
                <Button text="Add Subtitle" icon={<TextHTwo />} color="gray" onClick={() => { handleCreateBlock('subtitle') }} />
                <Button text="Add Code" icon={<Code />} color="gray" onClick={() => { handleCreateBlock('code') }} />
            </div>
            <div className={`${blocks.length > 0 ? "w-[70%]" : "w-[60%]"} flex flex-col gap-3`}>
                {blocks.length > 0 ? blocks.map((block:any) => (
                    <div key={block.id} className="flex flex-row items-start gap-3 mb-5">
                        {block.type === 'image' &&
                            <ImageFormBlock
                                image={block.value}
                                setImage={(value:any) => { handleValueChange(block.id, value) }}
                            />}
                        {block.type === 'text' &&
                            <TextFormBlock
                                text={block.value}
                                setText={(value) => handleValueChange(block.id, value)}
                            />}
                        {block.type === 'title' &&
                            <HOneFormBlock
                                title={block.value}
                                setTitle={(value) => handleValueChange(block.id, value)}
                            />}
                        {block.type === 'subtitle' &&
                            <HTwoFormBlock
                                title={block.value}
                                setTitle={(value) => handleValueChange(block.id, value)}
                            />}
                        {block.type === 'code' &&
                            <CodeFormBlock
                                code={block.value}
                                setCode={(value) => handleValueChange(block.id, value)}
                            />}
                        <Button icon={<Trash />} color="neutral" onClick={() => { handleDeleteBlock(block.id) }} />
                    </div>
                )) : <p className='text-center'>No blocks added</p>}
            </div>
        </div>
    )
}

export default CreateRessourceStepTwo;
