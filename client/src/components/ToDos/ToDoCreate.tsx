import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from './ToDoCreate.module.scss'

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
        <div className={styles.flexContainer}>
            <input
                type="text"
                className={styles.createInput}
                placeholder="Create an item"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={styles.createButton} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </button>
        </div>
    );
};

export default ToDoCreate;
