import React from 'react';

const Steps = ({ currentStep, steps, onStepClick } : any) => {
    return (
        <div className="flex flex-row gap-3 items-center">
            {steps.map((step: {id: number, label: string}, index: number) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex flex-col items-center">
                            <div 
                                className={`w-10 h-10 text-white flex items-center justify-center rounded-full cursor-pointer ${currentStep >= step.id ? 'bg-blue-600' : 'bg-neutral-500'}`} 
                                onClick={() => onStepClick(step.id)}
                            >
                                {step.id}
                            </div>
                            <p className="text-xs text-gray-700 dark:text-white">{step.label}</p>
                        </div>
                        
                    </div>
                        {index < steps.length - 1 && (
                            <div className={`w-full h-1 rounded ${currentStep > step.id ? 'bg-blue-600' : 'bg-neutral-500'}`}></div>
                        )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Steps;
