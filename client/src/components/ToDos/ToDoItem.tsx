import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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
            {isAuthenticated && item._id === undefined && (
                <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.unsavedItemIcon}
                    size={"xs"}
                    title={"This item is unsaved!"}
                />
            )}
            <input
                type="checkbox"
                name="isComplete"
                checked={isComplete}
                onChange={() => setIsComplete(!isComplete)}
            />
            {!isEditing ? (
                <>
                    <span className={isComplete ? styles.complete : ""}>
                        {item.text}
                    </span>
                    <button onClick={handleTextEdit}>Edit</button>
                    <button onClick={() => handleDeleteOnClick(index)}>
                        Delete
                    </button>
                </>
            ) : (
                <>
                    <span>
                        <input
                            type="text"
                            placeholder={item.text}
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                        />
                    </span>
                    <button onClick={handleTextEdit}>Done</button>
                </>
            )}
        </div>
    );
};

export default ToDoItem;
