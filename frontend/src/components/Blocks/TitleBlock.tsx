
const TitleBlock = ({title}:{title:string}) => {

    return (
        <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {title}
            </h1>
        </div>
    );

}

export default TitleBlock;