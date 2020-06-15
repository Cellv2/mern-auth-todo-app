import React, { useState, useEffect } from "react";
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
        <div className={styles.flexContainer}>
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
                    <span
                        className={`${styles.itemText} ${
                            isComplete ? styles.complete : ""
                        }`}
                    >
                        {item.text}
                    </span>
                    <button
                        onClick={handleTextEdit}
                        className={styles.itemButton}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className={styles.editIcon}
                            title="Edit Item"
                        />
                    </button>
                    <button
                        onClick={() => handleDeleteOnClick(index)}
                        className={styles.itemButton}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className={styles.deleteIcon}
                            title="Delete Item"
                        />
                    </button>
                </>
            ) : (
                <>
                    <span className={styles.itemText}>
                        <input
                            type="text"
                            placeholder={item.text}
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            className={styles.itemEditInput}
                        />
                    </span>
                    <button
                        onClick={handleTextEdit}
                        className={styles.itemButton}
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={styles.saveEditsIcon}
                            title="Save Item Edits"
                        />
                    </button>
                </>
            )}
        </div>
    );
};

export default ToDoItem;
