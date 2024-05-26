
const ImageBlock = ({src}:{src:string}) => {
    return (
        <div className="flex justify-center">
            <img className="w-full h-auto rounded-lg" src={src} alt="Image" />
        </div>
    );
}

export default ImageBlock;
