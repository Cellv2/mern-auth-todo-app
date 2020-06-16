import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faEdit,
    faTrashAlt,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ToDoItem.module.scss";

import { Item } from "../../types/to-do.types";

type Props = {
    item: Item;
    index: number;
    isAuthenticated: boolean;
    handleDeleteOnClick: (index: number) => void;
    handleItemUpdate: (item: Item, index: number) => void;
};

const ToDoItem = (props: Props) => {
    const {
        item,
        index,
        isAuthenticated,
        handleDeleteOnClick,
        handleItemUpdate,
    } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.item.text);
    const [isComplete, setIsComplete] = useState<boolean>(
        props.item.isComplete
    );

    useEffect(() => {
        setInputValue(props.item.text);
        setIsComplete(props.item.isComplete);
    }, [props.item]);

    // we have to ensure the update is done after the state is updated (hook update is async)
    useEffect(() => {
        updateItem();
    }, [isComplete]);

    const handleTextEdit = (): void => {
        if (isEditing === true) {
            updateItem();
        }

        setIsEditing(!isEditing);
    };

    const updateItem = (): void => {
        let updatedItem = props.item;
        updatedItem.text = inputValue;
        updatedItem.isComplete = isComplete;

        handleItemUpdate(updatedItem, index);
    };

    return (
        <div>
            <InputGroup className="my-2" size="sm">
                <InputGroup.Prepend>
                    <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        checked={isComplete}
                        onChange={() => setIsComplete(!isComplete)}
                    />
                </InputGroup.Prepend>
                {isAuthenticated && item._id === undefined && (
                    <InputGroup.Prepend>
                        <InputGroup.Text id={`unsaved-item-${index}`}>
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                className={styles.unsavedItemIcon}
                                size={"xs"}
                                title={"This item is unsaved!"}
                            />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                )}
                <FormControl
                    aria-label="Text input with checkbox"
                    value={inputValue}
                    readOnly={!isEditing}
                    className={`${styles.inputText} ${
                        isComplete ? styles.complete : ""
                    }`}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-secondary"
                        onClick={handleTextEdit}
                    >
                        {isEditing ? (
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                                title="Save Item Edits"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-primary"
                                title="Edit Item"
                            />
                        )}
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => handleDeleteOnClick(index)}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className={styles.deleteIcon}
                            title="Delete Item"
                        />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default ToDoItem;
