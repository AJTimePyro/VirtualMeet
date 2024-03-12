import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
    inputValue : string,
    onChangeFn : ChangeEventHandler,
    labelText : string,
    inputName : string,
    keyDownHandler? : KeyboardEventHandler
};

export default function InputHandler(
    {
        inputValue,
        onChangeFn,
        labelText,
        inputName,
        keyDownHandler
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
                    py-5 px-4
                    h-14 w-60
                    rounded
                    outline-none
                    peer
                    focus:pt-9
                "
                onKeyDown={keyDownHandler}
            />
            <label
                className="text-white text-opacity-75
                absolute
                top-4 left-4 -z-10
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