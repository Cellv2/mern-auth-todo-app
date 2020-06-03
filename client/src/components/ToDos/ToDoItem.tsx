import React, { useState, useEffect } from "react";

import styles from "./ToDoItem.module.scss";

import { Item } from "../../types/to-do.types";

type Props = {
    item: Item;
    index: number;
    handleIsCompleteChange: (index: number) => void;
    handleDeleteOnClick: (index: number) => void;
};

const ToDoItem = (props: Props) => {
    const { item, index, handleIsCompleteChange, handleDeleteOnClick } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    useEffect(() => {
        setInputValue(props.item.text);
    }, []);

    // TODO: Pass this up
    const handleIsEditingOnClick = (): void => {
        if (isEditing === true) {
            const newText = inputValue;
        }

        setIsEditing(!isEditing);
    };

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.persist();
        setInputValue(event.target.value);
    };

    return (
        <div>
            <input
                type="checkbox"
                name="isComplete"
                checked={item.isComplete}
                onChange={() => handleIsCompleteChange(index)}
            />
            {!isEditing ? (
                <>
                    <span className={item.isComplete ? styles.complete : ""}>
                        {item.text}
                    </span>
                    <button onClick={handleIsEditingOnClick}>Edit</button>
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
                            onChange={handleInputOnChange}
                            value={inputValue}
                        />
                    </span>
                    <button onClick={handleIsEditingOnClick}>Done</button>
                </>
            )}
        </div>
    );
};

export default ToDoItem;
