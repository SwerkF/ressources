import { useEffect, useState } from "react";

const ImageFormBlock = ({ image, file, setImage }: { image?: File, file?: File, setImage: (image: File) => void }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [imageId, setImageId] = useState<string | null>(null);

    useEffect(() => {
        // Generate a hash for the image ID
        const hash = Math.floor(Math.random() * 0xfffffff).toString(16);
        setImageId(hash || "0");

        const imageFile = image || file;
        if (imageFile && imageFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(imageFile);
        }
    }, [image, file]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full border-dashed border-2 border-gray-800 p-3 rounded-lg">
            <p className="mb-1 text-xs">Image Block</p>
            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor={imageId || "image-upload"} className="w-full max-h-96 min-h-32 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center cursor-pointer">
                    {preview ? (
                        <div className="img-fluid">
                            <img src={preview} className="w-full h-auto max-h-96 object-cover rounded-lg" />
                        </div>
                    ) : (
                        <p className="text-gray-400 dark:text-neutral-400">Click to upload an image</p>
                    )}
                </label>
                <input type="file" id={imageId || "image-upload"} accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
        </div>
    );
};

export default ImageFormBlock;
