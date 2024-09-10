import { useEffect, useState } from "react";

interface ImageBlockProps {
    src?: string;     // URL of the image
    alt?: string;     // Alt text for the image
    file?: File;      // Image file
}

const ImageBlock = ({ src, alt = "Image", file }: ImageBlockProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(src || null);

    useEffect(() => {
        // If a file is provided, read it and set it as the image source
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (src) {
            // If no file but a src URL is provided, use the src directly
            setImageSrc(src);
        } else {
            // Reset image source if neither file nor src is provided
            setImageSrc(null);
        }
    }, [file, src]);

    return (
        <div className="img-fluid">
            {imageSrc ? (
                <img src={imageSrc} alt={alt} className="w-full h-60 object-cover rounded-lg" />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
};

export default ImageBlock;
