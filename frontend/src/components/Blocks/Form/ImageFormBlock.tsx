import { useEffect, useState } from "react";

const ImageFormBlock = ({ image, setImage }: any) => {
    const [preview, setPreview] = useState(image);

    useEffect(() => {
        setPreview(image);
    }, [image]);

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                console.log('Image loaded:', result); // Ajout d'un log
                setPreview(result);
                setImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full border-dashed border-2 border-gray-800 p-3 rounded-lg">
            <p className="mb-1 text-xs">Image Block</p>
            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="image" className="w-full max-h-96 min-h-32 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center cursor-pointer">
                    {preview ?
                        <div className="img-fluid">
                            <img src={preview} className="w-full h-auto max-h-96 object-cover rounded-lg" />
                        </div>
                        :
                        <p className="text-gray-400 dark:text-neutral-400">Click to upload an image</p>
                    }
                </label>
                <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
        </div>
    );
};

export default ImageFormBlock;
