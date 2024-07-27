import { Ressource } from "../../types/Ressource";
import CodeBlock from "../Blocks/CodeBlock";
import ImageBlock from "../Blocks/ImageBlock";
import Progress from "../Progress";

const RessourcePreviewModal = ({ show, handleClose, ressource, handleSave }: { show: boolean, handleClose: () => void, handleSave: () => void, ressource: Ressource }) => {

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'block' : 'hidden'}`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={(handleClose)}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white dark:bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex justify-center sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div className="img-fluid">
                                    <img src={ressource.image} alt={ressource.title} className="w-full h-60 object-cover rounded-lg" />
                                </div>
                                <div className="progress mt-3">
                                    <Progress progress={ressource.progress} />
                                </div>
                                <h3 className="text-3xl mt-5 leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline mt-4">
                                    {ressource.title}
                                </h3>
                                <p className="text-sm mt-3 text-gray-500 dark:text-neutral-400">
                                    {ressource.description}
                                </p>
                                {ressource.content && (
                                    <div className="mt-4">
                                        {ressource.content.map((content, index) => (
                                            content.type === 'text' ? (
                                                <p key={index} className="text-gray-600 dark:text-neutral-400">
                                                    {content.value}
                                                </p>
                                            ) : content.type === 'title' ? (
                                                <h4 key={index} className="text-lg mt-4 font-semibold text-gray-900 dark:text-white">
                                                    {content.value}
                                                </h4>
                                            ) : content.type === 'subtitle' ? (
                                                <h5 key={index} className="text-md mt-4 font-semibold text-gray-900 dark:text-white">
                                                    {content.value}
                                                </h5>
                                            ) : content.type === 'code' ? (
                                                <div key={index} className="mt-5">
                                                    <CodeBlock language={content.value.split('+')[0]} code={content.value.split('+')[1]} />
                                                </div>
                                            ) : content.type === 'image' ? (
                                            <div key={index} className="mt-5">
                                                    <ImageBlock src={content.value} />
                                                </div>
                                            ) : content.type === 'link' ? (
                                                <div key={index} className="mt-5">
                                                    <a href={content.value} className="text-blue-600 hover:underline dark:text-blue-400">{content.value}</a>
                                                </div>
                                            ) : content.type === 'button' ? (
                                                <div key={index} className="mt-5">
                                                    <a href={content.value} className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">{content.value}</a>
                                                </div>
                                            ) : (
                                                <p key={index} className="text-gray-600 dark:text-neutral-400">
                                                    {content.value}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-neutral-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                        </button>
                        <button onClick={handleClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
       
    );


}

export default RessourcePreviewModal;