import { Fragment, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input';
import { Category } from '../../types/Category';
import Slider from '../Slider';

const CreateRessourceStepOne = ({ressource, setRessource} : any) => {
    
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data));
        
    }, [])

    const handleAddCategory = (category: Category) => {
        if (ressource.categories.includes(category)) {
            const updatedCategories = ressource.categories.filter((cat: { id: number; }) => cat.id !== category.id);
            setRessource({ ...ressource, categories: updatedCategories });
        } else {
            setRessource({ ...ressource, categories: [...ressource.categories, category] });
        }
    }

    const handleFileUpload = (e: any) => {
        // check if the file is an image, if not delete it
        console.log(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] !== 'image'){
            e.target.value = null;
            return;
        }
        const file = e.target.files[0];
        setRessource({ ...ressource, image: file });
       
    }

    return (
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
            <label htmlFor="file-input">Choose file</label>
            <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                file:bg-gray-50 file:border-0
                file:me-4
                file:py-3 file:px-4
                dark:file:bg-neutral-700 dark:file:text-neutral-400"
                onChange={handleFileUpload} />
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
            <Slider
                label="Progress"
                min={0}
                max={100}
                value={ressource.progress.toString()} 
                onChange={(e:any) => { setRessource({ ...ressource, progress: parseInt(e.target.value) }) }}
            />
                
        </Fragment>
    )
}

export default CreateRessourceStepOne;