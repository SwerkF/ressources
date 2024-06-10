import { useState } from "react";
import Button from "../components/Button/Button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import RessourcePreviewModal from "../components/Modal/RessourcePreviewModal";
import { Ressource } from "../types/Ressource";
import Alert from "../components/Alert/Alert";
import CreateRessourceStepOne from "../components/CreateRessource/CreateRessourceStepOne";
import CreateRessourceStepTwo from "../components/CreateRessource/CreateRessourceStepTwo";
import Steps from "../components/Steps";

const CreateRessource = () => {

    const [ressource, setRessource] = useState<Ressource>({
        url: "",
        categories: [],
        createdAt: "",
        updatedAt: "",
        title: "",
        description: "",
        image: "",
        progress: 0,
        content: []
    });

    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState({ message: "", type: "" });
   
    const handleCheckForm = () => {
        if (ressource.title === "" || ressource.description === "" || ressource.url === "" || ressource.image === "" || ressource.categories.length === 0 || ressource.progress === 0) {
            setAlert({ message: "Please fill all fields", type: "danger" });
            return false;
        }
        return true;
    }

    const handleCheckContent = () => {
        if (ressource.content.length === 0) {
            setAlert({ message: "Please add content to your ressource", type: "danger" });
            return false;
        }
        return true;
    }

    const handleResetAlert = () => {
        setAlert({ message: "", type: "" });
    }

    const handleCheckStep = () => {
        handleResetAlert();
        if (step === 1) {
            if (handleCheckForm()) {
                setStep(step + 1);
            }
        } else if (step === 2) {
            if (handleCheckContent()) {
                setStep(step + 1);
            }
        } else {
            setShowModal(true);
        }
    }

    return (
        <div className="container mx-auto dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-10">Create a ressource</h1>
            <div className="flex flex-row gap-3 justify-center">
                <Steps currentStep={step} steps={[{ id: 1, label: "Informations" }, { id: 2, label: "Content" }, { id: 3, label: "Preview" }]} onStepClick={(stepId: number) => { setStep(stepId) }} />
            </div>
            <div className={`flex gap-10 flex-col items-center `}>
                <div className={`flex flex-col gap-4 ${step == 1 ? "w-1/2" : "w-full"}`}>
                    <div className="mt-3"> 
                        {alert.message && <Alert message={alert.message} type={alert.type} />}
                    </div>
                    {step === 1 ? (
                        <CreateRessourceStepOne ressource={ressource} setRessource={setRessource} />
                    ) : step === 2 ? (
                        <CreateRessourceStepTwo ressource={ressource} setRessource={setRessource} />
                    ) : step === 3 && (
                        <p>f</p>
                    )}

                </div>
                <div className="w-1/2 flex flex-row gap-3 justify-between align-center mt-3">
                   <Button text="Previous" icon={<CaretLeft />} color="gray" onClick={() => { setStep(step - 1) }} />
                     <Button text={step === 3 ? "Finish" : "Next"} icon={<CaretRight />} color="primary" onClick={handleCheckStep} />
                </div>
            </div>
           
            {showModal && (
                <RessourcePreviewModal ressource={ressource} show={showModal} handleClose={() => { setShowModal(false) }} />
            )}
        </div>
    );
};

export default CreateRessource;
