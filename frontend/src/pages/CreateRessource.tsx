import { useState, useEffect, Fragment } from "react";
import Button from "../components/Button/Button";
import { Image, TextT, TextHTwo, TextHOne, Trash, Code, CaretLeft, CaretRight } from "@phosphor-icons/react";
import ImageFormBlock from "../components/Blocks/Form/ImageFormBlock";
import TextFormBlock from "../components/Blocks/Form/TextFormBlock";
import HOneFormBlock from "../components/Blocks/Form/HOneFormBlock";
import HTwoFormBlock from "../components/Blocks/Form/HTwoFormBlock";
import CodeFormBlock from "../components/Blocks/Form/CodeFormBlock";
import RessourcePreviewModal from "../components/Modal/RessourcePreviewModal";
import { Ressource } from "../types/Ressource";
import { Category } from "../types/Category";
import Input from "../components/Input";

const CreateRessource = () => {

    const [ressource, setRessource] = useState<Ressource>({
        url: "",
        categories: [],
        createdAt: "",
        updatedAt: "",
        title: "",
        description: "",
        image: "",
        progress: 0,
        content: []
    });

    const [blocks, setBlocks] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [nextId, setNextId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    console.log("Categories", categories)

    useEffect(() => {
        setRessource((prevRessource) => ({
            ...prevRessource,
            content: blocks
        }));
    }, [blocks]);

    useEffect(() => {
        fetch("http://localhost:3000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data));
        
    }, [])

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
        console.log(ressource);
    };

    const handleDeleteBlock = (id: number) => {
        const updatedBlocks = blocks.filter(block => block.id !== id);
        setBlocks(updatedBlocks);
    };
    
    const handleAddCategory = (category: Category) => {
        if (ressource.categories.includes(category)) {
            const updatedCategories = ressource.categories.filter(cat => cat.id !== category.id);
            setRessource({ ...ressource, categories: updatedCategories });
        } else {
            setRessource({ ...ressource, categories: [...ressource.categories, category] });
        }
    }

    return (
        <div className="container mx-auto dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-10">Create a ressource</h1>
            <div className="flex flex-row gap-3 justify-center">
               <div className="flex flex-row gap-3 items-center">
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex flex-col items-center">
                            <div className={"w-10 h-10 text-white flex items-center justify-center rounded-full " + (1 <= step ? "bg-blue-600" : "bg-neutral-500")}>1</div>
                            <p className="text-xs text-gray-700 dark:text-white">General Info</p>
                        </div>
                        <div className={"w-[10rem] h-1 rounded " + (2 <= step ? "bg-blue-600" : "bg-neutral-500")}></div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex flex-col items-center">
                            <div className={"w-10 h-10 text-white flex items-center justify-center rounded-full " + (2 <= step ? "bg-blue-600" : "bg-neutral-500")}>2</div>
                            <p className="text-xs text-gray-700 dark:text-white">Content</p>
                        </div>
                        <div className={"w-[10rem] h-1 rounded " + (3 <= step ? "bg-blue-600" : "bg-neutral-500")}></div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex flex-col items-center">
                            <div className={"w-10 h-10 text-white flex items-center justify-center rounded-full " + (3 <= step ? "bg-blue-600" : "bg-neutral-500")}>3</div>
                            <p className="text-xs text-gray-700 dark:text-white">Review</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex gap-10 flex-col items-center `}>

                <div className={`flex flex-col gap-4 ${step == 1 ? "w-1/2" : "w-full"}`}>
                    {step === 1 && (
                        <Fragment>
                            <Input 
                                label="Title" 
                                type="text" 
                                placeholder="Title" 
                                value={ressource.title} 
                                onChange={(e) => { setRessource({ ...ressource, title: e.target.value }) }}
                            />
                            <Input 
                                label="Description" 
                                type="text" 
                                placeholder="Description" 
                                value={ressource.description} 
                                onChange={(e) => { setRessource({ ...ressource, description: e.target.value }) }}
                            />
                            <Input 
                                label="Url" 
                                type="text" 
                                placeholder="URL" 
                                value={ressource.url} 
                                onChange={(e) => { setRessource({ ...ressource, url: e.target.value }) }}
                            />
                            <Input 
                                label="Image" 
                                type="text" 
                                placeholder="Image" 
                                value={ressource.image} 
                                onChange={(e) => { setRessource({ ...ressource, image: e.target.value }) }}
                            />
                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="categories">Categories</label>
                            <div className="flex flex-row gap-3">
                                {categories.map((category, index) => (
                                    <Button 
                                        key={index} 
                                        text={category.name} 
                                        color={ressource.categories.includes(category) ? "primary" : "gray"} 
                                        onClick={() => { handleAddCategory(category) }} 
                                    />
                                ))}
                            </div>
                            <Input 
                                label="Progress" 
                                type="number" 
                                placeholder="Progress" 
                                value={ressource.progress.toString()} 
                                onChange={(e) => { setRessource({ ...ressource, progress: parseInt(e.target.value) }) }}
                            />
                        </Fragment>
                    )}
                    {step === 2 && (
                        <div className="w-full flex flex-row gap-3">
                            <div className="w-1/5 flex flex-col gap-2">
                                <p>Choose the type of block</p>
                                <Button text="Add Image" icon={<Image />} color="gray" onClick={() => { handleCreateBlock('image') }} />
                                <Button text="Add Text" icon={<TextT />} color="gray" onClick={() => { handleCreateBlock('text') }} />
                                <Button text="Add Title" icon={<TextHOne />} color="gray" onClick={() => { handleCreateBlock('title') }} />
                                <Button text="Add Subtitle" icon={<TextHTwo />} color="gray" onClick={() => { handleCreateBlock('subtitle') }} />
                                <Button text="Add Code" icon={<Code />} color="gray" onClick={() => { handleCreateBlock('code') }} />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                            {blocks.map((block, index) => {
                                return (
                                    <div key={index} className="flex flex-row items-start gap-3 mb-5">
                                        {block.type === 'image' && <ImageFormBlock image={block.value} setImage={(value: string) => { handleValueChange(block.id, value) }} />}
                                        {block.type === 'text' && <TextFormBlock text={block.value} setText={(value: string) => { handleValueChange(block.id, value) }} />}
                                        {block.type === 'title' && <HOneFormBlock title={block.value} setTitle={(value: string) => { handleValueChange(block.id, value) }} />}
                                        {block.type === 'subtitle' && <HTwoFormBlock title={block.value} setTitle={(value: string) => { handleValueChange(block.id, value) }} />}
                                        {block.type === 'code' && <CodeFormBlock code={block.value} setCode={(value: string) => { handleValueChange(block.id, value) }} />}
                                        <Button icon={<Trash />} color="neutral" onClick={() => { handleDeleteBlock(block.id) }} />
                                    </div>
                                )
                            })}    
                            </div>
                        </div>

                    )}
                </div>
                <div className="w-1/2 flex flex-row gap-3 justify-between align-center mt-3">
                <Button icon={<CaretLeft size={16} />} text="Previous" onClick={() => { setStep(step - 1 < 1 ? 1 : step - 1) }} />
                <Button icon={<CaretRight size={16} />} text="Next" onClick={() => { setStep(step + 1 > 3 ? 3 : step + 1) }} />
            </div>
            </div>
           
            {showModal && (
                <RessourcePreviewModal ressource={ressource} show={showModal} handleClose={() => { setShowModal(false) }} />
            )}
        </div>
    );
};

export default CreateRessource;
