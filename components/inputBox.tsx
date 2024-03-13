import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { PiWarningCircle } from "react-icons/pi";

interface InputProps {
    inputValue : string,
    onChangeFn : ChangeEventHandler,
    labelText : string,
    inputName : string,
    keyDownHandler : KeyboardEventHandler,
    paddingRight? : number,
    fieldName : string
};

export default function InputHandler(
    {
        inputValue,
        onChangeFn,
        labelText,
        inputName,
        keyDownHandler,
        fieldName,
        paddingRight = 16
    } : InputProps
) {
    const [isFormEmpty, updateFormEmpty] = useState(false);
    const customFormUpdate = (dependency : string) => {
        updateFormEmpty(dependency ? false : true);
    }
    const formEmptyHandler = () => customFormUpdate(inputValue);

    return (
        <div className="relative">
            <input
                onBlur={formEmptyHandler}
                name={inputName}
                type="text"
                value={inputValue}
                onChange={
                    (event) => {
                        customFormUpdate(event.target.value);
                        onChangeFn(event);
                    }
                }
                placeholder=' '
                className="
                    bg-slate-300
                    bg-opacity-40
                    text-white
                    pb-5 pt-9 px-4
                    h-14 w-60
                    rounded
                    outline-none
                    peer
                    placeholder-shown:pt-5
                    focus:pt-9
                "
                style={
                    {
                        paddingRight : paddingRight
                    }
                }
                onKeyDown={keyDownHandler}
            />
            <label
                className="text-white text-opacity-75
                absolute
                top-1 left-2 -z-10 
                scale-90
                peer-placeholder-shown:top-4
                peer-placeholder-shown:left-4
                peer-placeholder-shown:scale-100
                peer-focus:scale-90
                peer-focus:top-1
                peer-focus:left-2
                transition-all duration-150"
                htmlFor={inputName}
            >
                {labelText}
            </label>

            {
                isFormEmpty &&
                <div className="flex items-center text-red-500 select-none">
                    <PiWarningCircle size={20} className="mr-1"/>
                    <span className="">
                        {fieldName} can't be empty
                    </span>
                </div>
            }
        </div>
    );
};