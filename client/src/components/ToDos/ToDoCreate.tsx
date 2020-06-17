import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./ToDoCreate.module.scss";

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
        <InputGroup className="my-3">
            <FormControl
                aria-label="Text for a new to do item"
                className={styles.createInput}
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={"Enter something to do!"}
            />
            <InputGroup.Append>
                <Button
                    variant="outline-primary"
                    onClick={handleSubmit}
                    className={styles.actionButtons}
                >
                    <FontAwesomeIcon icon={faPlusCircle} size={"sm"} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default ToDoCreate;
