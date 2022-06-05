import React from 'react';

import CloseIcon from '../../../components/icons/closeIcon';

export default function StepForm({
    steps,
    setSteps,
    tempStep,
    setTempStep
}: {
    steps: string[];
    setSteps: React.Dispatch<React.SetStateAction<string[]>>;
    tempStep: string;
    setTempStep: React.Dispatch<React.SetStateAction<string>>;
}) {
    const tempStepIsValid = () => !!tempStep;
    const addNewStep = () => {
        if (tempStepIsValid()) setSteps([...steps, tempStep]);
        setTempStep('');
    };
    return (
        <fieldset id='steps' className='cb-form'>
            <legend>Steps</legend>
            {steps.length > 0 && (
                <div className='cb-form-field'>
                    <ol>
                        {steps.map((step, index) => (
                            <li key={index}>
                                {step}{' '}
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        setSteps(
                                            steps.filter((s, i) => i !== index)
                                        );
                                    }}
                                >
                                    <CloseIcon
                                        style={{
                                            height: '1em',
                                            width: '1em'
                                        }}
                                    />
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
            <div className='cb-form-field'>
                <textarea
                    onChange={e =>
                        setTempStep(e.target.value ? e.target.value : '')
                    }
                    value={tempStep}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addNewStep();
                        }
                    }}
                />
                {tempStepIsValid() && (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            addNewStep();
                        }}
                    >
                        Add step
                    </button>
                )}
            </div>
        </fieldset>
    );
}
