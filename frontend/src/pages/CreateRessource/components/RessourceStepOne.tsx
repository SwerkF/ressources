import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import zodRessourceSchema from "../../../schemas/zodRessourceSchema";
import { z } from "zod";

const RessourceStepOne = ({ form, nextStep } : { form: UseFormReturn<z.infer<typeof zodRessourceSchema>>, nextStep: () => void }) => {

    const [progress, setProgress] = useState(0)
    const [step, setStep] = useState(1)

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value;
        if (event.target.checked) {
            form.setValue('categories', [...form.getValues('categories'), category]);
        } else {
            form.setValue('categories', form.getValues('categories').filter((c: string) => c !== category));
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
             <p className="mb-4 text-2xl font-bold md:text-2xl text-center">
                Commençons par les informations de bases.
            </p>
            <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full mb-8 mt-4">
                <div className="absolute top-0 left-0 h-1 bg-gray-300 w-full"></div>
                <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{width: `${(step - 1) * 33.3}%`}}></div>
            </div>
                {step === 1 ? (
                    <div className="flex flex-col justify-center w-full">
                        <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-700">
                            1. Titre de la ressource
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            {...form.register('name')}
                        />
                    </div>
                ) : step === 2 ? (
                    <div className="flex flex-col justify-center w-full">
                        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">
                            2. Description de la ressource
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            {...form.register('description')}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center w-full">
                        <label htmlFor="categories" className="mb-2 text-sm font-medium text-gray-700">
                            3. A quelles catégories appartient votre ressource ?
                        </label>
                        <div className="flex flex-row gap-5 flex-wrap">
                            {
                                ['Développement web', 'Développement mobile', 'Développement logiciel', 'Design', 'Marketing', 'Autre'].map((category, index) => (
                                    <div key={index} className="flex items-center relative">
                                        <input
                                            id={category}
                                            type="checkbox"
                                            value={category}
                                            className="w-4 h-4"
                                            onChange={handleCategoryChange}
                                        />
                                        <label htmlFor={category} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {category}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between w-full mt-8">
                {step !== 1 && (
                    <button
                        className="rounded-lg bg-gray-200 px-8 py-4 cursor-pointer text-center text-black hover:bg-gray-300"
                        onClick={() => setStep(step - 1)}
                    >
                        Précédent
                    </button>
                )}
                <button
                    className="rounded-lg bg-black px-8 py-4 cursor-pointer text-center text-white hover:bg-gray-800"
                    onClick={() => {
                        if (step < 3) {
                            setStep(step + 1)
                        } else {
                            nextStep()
                        }
                    }}
                >
                    Suivant
                </button>
            </div>
        </div>
    )
}

export default RessourceStepOne;