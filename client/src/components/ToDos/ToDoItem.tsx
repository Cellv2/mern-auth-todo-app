import React, { useState, useEffect } from "react";

import styles from "./ToDoItem.module.scss";

import { Item } from "../../types/to-do.types";

type Props = {
    item: Item;
    index: number;
    handleDeleteOnClick: (index: number) => void;
    handleItemUpdate: (item: Item, index: number) => void;
};

const ToDoItem = (props: Props) => {
    const { item, index, handleDeleteOnClick, handleItemUpdate } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false);
    useEffect(() => {
        setInputValue(props.item.text);
        setIsComplete(props.item.isComplete);
    }, []);

    const handleTextEdit = (): void => {
        if (isEditing === true) {
            updateItem();
        }

        setIsEditing(!isEditing);
    };

    // this is its own function because we want this to trigger immediately every time
    const handleIsComplete = (): void => {
        setIsComplete(!isComplete);
        updateItem();
    };

    const updateItem = (): void => {
        let updatedItem = props.item;
        updatedItem.text = inputValue;
        updatedItem.isComplete = isComplete;

        handleItemUpdate(updatedItem, index);
    };

    return (
        <div>
            <input
                type="checkbox"
                name="isComplete"
                checked={isComplete}
                onChange={handleIsComplete}
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
