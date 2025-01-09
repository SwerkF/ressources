import { useState } from "react";
import RessourceStepOne from "./components/RessourceStepOne";
import RessourceStepTwo from "./components/RessourceStepTwo";
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import zodRessourceSchema from "../../schemas/zodRessourceSchema";

const CreateRessource = () => {

    const [step, setStep] = useState(1);

    const ressourceForm = useForm<z.infer<typeof zodRessourceSchema>>({
        resolver: zodResolver(zodRessourceSchema),
        mode: 'onSubmit',
    })

    return (
        <div className="w-full bg-white">
           <header>
                <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
                    <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16">
                        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                            Partagez votre ressource
                        </h1>
                        <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-6 lg:mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum
                        </p>
                    </div>
                    <div className="mx-auto w-full min-h-[512px] max-w-3xl">
                        {step === 1 && <RessourceStepOne form={ressourceForm} />}
                        {step === 2 && <RessourceStepTwo form={ressourceForm} />}
                    </div>
                </div>
            </header>
        </div>
    )

}

export default CreateRessource;