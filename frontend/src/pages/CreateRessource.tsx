import { useState } from "react";
import Button from "../components/Button/Button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import RessourcePreviewModal from "../components/Modal/RessourcePreviewModal";
import Alert from "../components/Alert/Alert";
import CreateRessourceStepOne from "../components/CreateRessource/CreateRessourceStepOne";
import CreateRessourceStepTwo from "../components/CreateRessource/CreateRessourceStepTwo";
import Steps from "../components/Steps";
import { z } from "zod";

const ressourceSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    url: z.string().url({ message: "Invalid URL" }),
    file: z.instanceof(File).optional(),
    categories: z.array(z.any()).min(1, { message: "Please select at least one category" }).default([]),
    content: z.array(z.any()).optional(),
});

const CreateRessource = () => {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [ressourceForm, setRessourceForm] = useState({
        title: "",
        description: "",
        url: "",
        file: null,
        categories: [],
        content: []
    });

    const handleCheckForm = () => {
        try {
            ressourceSchema.parse(ressourceForm);
            return true;
        } catch (error: any) {
            setAlert({ message: error.errors[0].message, type: "danger" });
            return false;
        }
    }

    const handleCheckContent = () => {
        // Implement content-specific validation if needed
        return true;
    }

    const handleResetAlert = () => {
        setAlert({ message: "", type: "" });
    }

    const handleCheckStep = () => {
        handleResetAlert();
        if (step === 1) {
                setStep(step + 1);
        } else if (step === 2) {
            if (handleCheckContent()) {
                setStep(step + 1);
                setShowModal(true);
            }
        } else {
            setShowModal(true);
        }
    }

    return (
        <div className="container mx-auto dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-10">Create a resource</h1>
            <div className="flex flex-row gap-3 justify-center">
                <Steps currentStep={step} steps={[
                    { id: 1, label: "Informations" },
                    { id: 2, label: "Content" },
                    { id: 3, label: "Preview" }
                ]} onStepClick={(stepId: number) => { setStep(stepId) }} />
            </div>
            <div className={`flex gap-10 flex-col items-center `}>
                <div className={`flex flex-col gap-4 ${step == 1 ? "w-1/2" : "w-full"}`}>
                    <div className="mt-3"> 
                        {alert.message && <Alert message={alert.message} type={alert.type} />}
                    </div>
                    {step === 1 ? (
                        <CreateRessourceStepOne ressourceForm={ressourceForm} setRessourceForm={setRessourceForm}/>
                    ) : step === 2 ? (
                        <CreateRessourceStepTwo ressourceForm={ressourceForm}/>
                    ) : step === 3 && (
                        <RessourcePreviewModal ressourceForm={ressourceForm} handleSave={() => { }} show={showModal} handleClose={() => { setShowModal(false); setStep(2) }} />
                    )}

                </div>
                <div className="w-1/2 flex flex-row gap-3 justify-between align-center mt-3">
                   <Button text="Previous" icon={<CaretLeft />} color="gray" onClick={() => { setStep(step - 1) }} />
                     <Button text={step === 3 ? "Finish" : "Next"} icon={<CaretRight />} color="primary" onClick={handleCheckStep} />
                </div>
            </div>
        </div>
    );
};

export default CreateRessource;
