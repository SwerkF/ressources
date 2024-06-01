import { Fragment, useState } from "react";

const ImageFormBlock = ({ image, setImage }: { image: string, setImage: (image: string) => void }) => {
    const [preview, setPreview] = useState<string | null>(image ? image : null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                setImage(result);  // Using the base64 string as the image value
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <p className="mb-1 text-xs">Image Block</p>
            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="image" className="w-full max-h-96 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center cursor-pointer">
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
        </Fragment>
    );
};

export default ImageFormBlock;
