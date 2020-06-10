import React, { useState } from "react";

type Props = {
    handleCreateOnClick: (inText: string) => void;
};

const ToDoCreate = (props: Props) => {
    const { handleCreateOnClick } = props;
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === "Enter" && inputValue !== "") {
            handleCreateOnClick(inputValue);
            setInputValue("");
        }
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: Set up hook into a global error state manager so errors can be shown elsewhere?
        if (inputValue !== "") {
            handleCreateOnClick(inputValue);
            setInputValue("");
        } else {
            console.log("Woah there, you don't have anything in the input!");
        }
    };

    return (
        <div>
            Create an item
            <input
                type="text"
                placeholder="Please enter your item text here"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Click this to create</button>
        </div>
    );
};

export default ToDoCreate;
