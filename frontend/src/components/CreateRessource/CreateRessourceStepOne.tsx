import { Fragment, useEffect, useState } from 'react';
import { z } from 'zod';
import Button from '../Button/Button';
import Input from '../Input';
import InputFile from '../InputFile';  // Importer le nouveau composant InputFile
import { Category } from '../../types/Category';

// Définir le schéma de validation
const ressourceSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    url: z.string().url({ message: "Invalid URL" }),
    file: z.instanceof(File).optional(),  // Validation pour le fichier
    categories: z.array(z.any()).optional(),
});

const CreateRessourceStepOne = ({ ressource, setRessource } : any) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [errors, setErrors] = useState<any>({});
    const [fileError, setFileError] = useState<any>();

    useEffect(() => {
        fetch("http://localhost:3000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    const validate = (data: any) => {
        try {
            ressourceSchema.parse(data);
            setErrors({});
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = error.errors.reduce((acc:any, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {});
                setErrors(formattedErrors);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newRessource = { ...ressource, [name]: value };
        setRessource(newRessource);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate the file
            if (file.size > 5000000) {  // Example: max 5MB
                setFileError('File size exceeds 5MB');
            } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setFileError('Only JPEG and PNG files are allowed');
            } else {
                setFileError(null);
                setRessource({ ...ressource, file });
            }
        }
    };

    const handleAddCategory = (category: Category) => {
        // Handle category addition
        const newCategories = ressource.categories ? [...ressource.categories] : [];
        if (newCategories.includes(category)) {
            newCategories.splice(newCategories.indexOf(category), 1);
        } else {
            newCategories.push(category);
        }
        setRessource({ ...ressource, categories: newCategories });
    };

    return (
        <Fragment>
            <Input 
                label="Title" 
                type="text" 
                placeholder="Title" 
                name="title"
                value={ressource.title} 
                onChange={handleChange}
                error={errors.title}
            />
            <Input 
                label="Description" 
                type="text" 
                placeholder="Description" 
                name="description"
                value={ressource.description} 
                onChange={handleChange}
                error={errors.description}
            />
            <Input 
                label="Main Url" 
                type="text" 
                placeholder="URL" 
                name="url"
                value={ressource.url} 
                onChange={handleChange}
                error={errors.url}
            />
            <InputFile 
                label="Choose file" 
                onChange={handleFileUpload}
                error={fileError}
            />
            <label className="text-gray-700 dark:text-neutral-300" htmlFor="categories">Categories</label>
            <div className="flex flex-row gap-3">
                {categories.map((category, index) => (
                    <Button 
                        key={index} 
                        text={category.name} 
                        color={ressource.categories?.includes(category) ? "primary" : "gray"} 
                        onClick={() => { handleAddCategory(category) }} 
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default CreateRessourceStepOne;
