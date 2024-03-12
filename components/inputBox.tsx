import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
    inputValue : string,
    onChangeFn : ChangeEventHandler,
    labelText : string,
    inputName : string,
    keyDownHandler : KeyboardEventHandler,
    paddingRight? : number
};

export default function InputHandler(
    {
        inputValue,
        onChangeFn,
        labelText,
        inputName,
        keyDownHandler,
        paddingRight = 16
    } : InputProps
) {
    return (
        <div className="relative">
            <input
                name={inputName}
                type="text"
                value={inputValue}
                onChange={onChangeFn}
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
        </div>
    );
};