import React, {useState} from 'react';
import InputComponent from "./InputComponent";
import OutputComponent from "./OutputComponent";
import {Template, TemplateInput} from "../constants/templates";

// @ts-ignore
const InputOutputComponent = ({template, installed, model}) => {
    const [output, setOutput] = useState("");


    const handleClearOutput = () => {
        setOutput("")
    }

    type InputsData = {
        [key: string]: string;
    };

    type ChatMessage = {
        role: "system" | "user" | "assistant", 
        content: string 
    }

    const createInstruction = (inputs: TemplateInput[], inputsData: InputsData): string => {
        return inputs.map((input) => `${input.label}: ${inputsData[input.id]}`).join("\n");
    };

    const generateOutputHandler = async (template: Template, inputsData: { [key: string]: string }) => {
        if (!window || !(window as any).ai) return;
        const instruction = createInstruction(template.inputs, inputsData);
        const messages : ChatMessage[] = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Your task is: "${template.command}".\n\nHere are the details:\n${instruction}. 
            Please suggest 3 outputs. number them 1,2,3` },
        ];
        try {
            
            const result = await (window as any).ai.getCompletion(
                {
                    messages,
                },
                {
                    temperature: 1,
                    maxTokens: 1000,
                },
            );
            console.log(result);
            setOutput(result.message.content || '');
        } catch (err) {
            console.error("Error while making the API call:", err);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row w-full h-full">

            <InputComponent
                template={template}
                generateOutput={generateOutputHandler}
                installed={installed}
            />
            <OutputComponent
                onClearOutput={handleClearOutput}
                generatedOutput={output}
                model={model}
            />
                
        </div>
    );
};

export default InputOutputComponent;
